"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { DEFAULT_CONTENT, deepMergeDefaults } from "./brand";

export function useSiteContent() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await supabase.from("site_content").select("section, data");
    if (err) {
      setError("Não foi possível carregar o conteúdo do site.");
      setLoading(false);
      return;
    }
    const saved = {};
    (data || []).forEach((row) => { saved[row.section] = row.data; });
    setContent(deepMergeDefaults(DEFAULT_CONTENT, saved));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateSection = async (section, patch) => {
    const nextData = { ...content[section], ...patch };
    const { error: err } = await supabase
      .from("site_content")
      .upsert({ section, data: nextData }, { onConflict: "section" });
    if (err) {
      setError("Falha ao salvar. Tente novamente.");
      return false;
    }
    setContent((c) => ({ ...c, [section]: nextData }));
    return true;
  };

  const updateEngenharia = async (index, patch) => {
    const nextList = content.engenharias.map((e, i) => (i === index ? { ...e, ...patch } : e));
    const { error: err } = await supabase
      .from("site_content")
      .upsert({ section: "engenharias", data: nextList }, { onConflict: "section" });
    if (err) {
      setError("Falha ao salvar. Tente novamente.");
      return false;
    }
    setContent((c) => ({ ...c, engenharias: nextList }));
    return true;
  };

  return { content, loading, error, updateSection, updateEngenharia, reload: load };
}

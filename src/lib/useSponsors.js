"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

// onlyActive=true -> site público (RLS já filtra, reforçamos aqui também).
// onlyActive=false -> painel admin (exige usuário autenticado).
export function useSponsors({ onlyActive = false } = {}) {
  const [sponsors, setSponsors] = useState(null); // null = carregando
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    let query = supabase.from("sponsors").select("*").order("position", { ascending: true }).order("created_at", { ascending: true });
    if (onlyActive) query = query.eq("status", "active");
    const { data, error: err } = await query;
    if (err) {
      setError("Não foi possível carregar os patrocinadores.");
      setSponsors([]);
      return;
    }
    setSponsors(data || []);
  }, [onlyActive]);

  useEffect(() => { load(); }, [load]);

  const createSponsor = async (form) => {
    const { data, error: err } = await supabase
      .from("sponsors")
      .insert(form)
      .select()
      .single();
    if (err) {
      setError("Falha ao criar o patrocinador.");
      return { ok: false };
    }
    setSponsors((s) => [...(s || []), data]);
    return { ok: true, sponsor: data };
  };

  const updateSponsor = async (id, form) => {
    const { data, error: err } = await supabase
      .from("sponsors")
      .update(form)
      .eq("id", id)
      .select()
      .single();
    if (err) {
      setError("Falha ao salvar o patrocinador.");
      return false;
    }
    setSponsors((s) => (s || []).map((sp) => (sp.id === id ? data : sp)));
    return true;
  };

  const deleteSponsor = async (id) => {
    const { error: err } = await supabase.from("sponsors").delete().eq("id", id);
    if (err) {
      setError("Falha ao excluir o patrocinador.");
      return false;
    }
    setSponsors((s) => (s || []).filter((sp) => sp.id !== id));
    return true;
  };

  return { sponsors, error, createSponsor, updateSponsor, deleteSponsor, reload: load };
}

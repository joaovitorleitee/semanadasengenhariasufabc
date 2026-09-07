"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

// onlyPublished=true -> site público (RLS já filtra, reforçamos aqui também).
// onlyPublished=false -> painel admin (exige usuário autenticado; a RLS
// libera leitura de todos os eventos apenas para usuários logados).
export function useEventos({ onlyPublished = false } = {}) {
  const [eventos, setEventos] = useState(null); // null = carregando
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    let query = supabase
      .from("eventos")
      .select("*")
      .order("data_inicio", { ascending: true, nullsFirst: false })
      .order("horario_inicio", { ascending: true, nullsFirst: false })
      .order("position", { ascending: true });
    if (onlyPublished) query = query.eq("status", "published");
    const { data, error: err } = await query;
    if (err) {
      setError("Não foi possível carregar a programação.");
      setEventos([]);
      return;
    }
    setEventos(data || []);
  }, [onlyPublished]);

  useEffect(() => { load(); }, [load]);

  const createEvento = async (form) => {
    const { data, error: err } = await supabase
      .from("eventos")
      .insert(form)
      .select()
      .single();
    if (err) {
      setError("Falha ao criar o evento.");
      return { ok: false };
    }
    setEventos((e) => [...(e || []), data]);
    return { ok: true, evento: data };
  };

  const updateEvento = async (id, form) => {
    const { data, error: err } = await supabase
      .from("eventos")
      .update(form)
      .eq("id", id)
      .select()
      .single();
    if (err) {
      setError("Falha ao salvar o evento.");
      return false;
    }
    setEventos((e) => (e || []).map((ev) => (ev.id === id ? data : ev)));
    return true;
  };

  const deleteEvento = async (id) => {
    const { error: err } = await supabase.from("eventos").delete().eq("id", id);
    if (err) {
      setError("Falha ao excluir o evento.");
      return false;
    }
    setEventos((e) => (e || []).filter((ev) => ev.id !== id));
    return true;
  };

  return { eventos, error, createEvento, updateEvento, deleteEvento, reload: load };
}

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
    // Antes, isso encadeava .select().single() na mesma chamada para já
    // devolver a linha criada. Só que, se essa releitura falhasse por
    // qualquer motivo (RLS, timing etc.), o Supabase retornava erro AQUI
    // mesmo o evento já tendo sido gravado com sucesso — daí o evento
    // "salvava" no banco mas a tela de admin achava que tinha falhado
    // (não fechava, não avisava nada). Agora: o resultado da gravação em
    // si é o que decide sucesso/erro; a releitura da lista é uma etapa à
    // parte (load), que não tem esse ponto de falha.
    const { error: err } = await supabase.from("eventos").insert(form);
    if (err) {
      const msg = err.message || "Falha ao criar o evento.";
      setError(msg);
      return { ok: false, message: msg };
    }
    await load();
    return { ok: true };
  };

  const updateEvento = async (id, form) => {
    const { error: err } = await supabase.from("eventos").update(form).eq("id", id);
    if (err) {
      const msg = err.message || "Falha ao salvar o evento.";
      setError(msg);
      return { ok: false, message: msg };
    }
    await load();
    return { ok: true };
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

"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { slugify } from "./brand";

// onlyPublished=true -> site público (RLS já filtra, mas reforçamos aqui).
// onlyPublished=false -> painel admin (exige usuário autenticado; a RLS
// libera leitura de todos os posts apenas para usuários logados).
export function usePosts({ onlyPublished = false } = {}) {
  const [posts, setPosts] = useState(null); // null = carregando
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    let query = supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (onlyPublished) query = query.eq("status", "published");
    const { data, error: err } = await query;
    if (err) {
      setError("Não foi possível carregar os posts.");
      setPosts([]);
      return;
    }
    setPosts(data || []);
  }, [onlyPublished]);

  useEffect(() => { load(); }, [load]);

  const uniqueSlug = async (title, ignoreId) => {
    const base = slugify(title) || "post";
    let candidate = base;
    let n = 2;
    // Confere unicidade contra o que já carregamos; em caso de corrida,
    // a constraint UNIQUE do banco ainda protege.
    while ((posts || []).some((p) => p.slug === candidate && p.id !== ignoreId)) {
      candidate = `${base}-${n}`;
      n += 1;
    }
    return candidate;
  };

  const createPost = async (form) => {
    const slug = await uniqueSlug(form.title);
    const { data, error: err } = await supabase
      .from("posts")
      .insert({ ...form, slug })
      .select()
      .single();
    if (err) {
      setError("Falha ao criar o post.");
      return { ok: false };
    }
    setPosts((p) => [data, ...(p || [])]);
    return { ok: true, post: data };
  };

  const updatePost = async (id, form) => {
    const { data, error: err } = await supabase
      .from("posts")
      .update(form)
      .eq("id", id)
      .select()
      .single();
    if (err) {
      setError("Falha ao salvar o post.");
      return false;
    }
    setPosts((p) => (p || []).map((post) => (post.id === id ? data : post)));
    return true;
  };

  const deletePost = async (id) => {
    const { error: err } = await supabase.from("posts").delete().eq("id", id);
    if (err) {
      setError("Falha ao excluir o post.");
      return false;
    }
    setPosts((p) => (p || []).filter((post) => post.id !== id));
    return true;
  };

  return { posts, error, createPost, updatePost, deletePost, reload: load };
}

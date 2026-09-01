"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export function useAuth() {
  const [session, setSession] = useState(undefined); // undefined = carregando, null = deslogado

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  // Login por senha única: a senha digitada nunca é comparada no navegador.
  // Vai para /api/admin-login, que confere no servidor e devolve uma sessão
  // real do Supabase, que aplicamos aqui no cliente.
  const signInWithSharedPassword = async (password) => {
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) return { ok: false, message: data.error || "Não foi possível entrar." };

      const { error } = await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });
      if (error) return { ok: false, message: error.message };
      return { ok: true };
    } catch (e) {
      return { ok: false, message: "Erro de conexão. Tente novamente." };
    }
  };

  const signOut = () => supabase.auth.signOut();

  return {
    session,
    loading: session === undefined,
    authed: !!session,
    signInWithSharedPassword,
    signOut,
  };
}

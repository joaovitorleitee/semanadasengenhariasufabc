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

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { ok: !error, message: error?.message };
  };

  const signOut = () => supabase.auth.signOut();

  return {
    session,
    loading: session === undefined,
    authed: !!session,
    signIn,
    signOut,
  };
}

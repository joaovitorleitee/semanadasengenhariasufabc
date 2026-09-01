"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Loader2 } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useAuth } from "@/lib/useAuth";

export default function AdminLogin() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email || !pwd) return;
    setLoading(true);
    setErr("");
    const { ok, message } = await signIn(email, pwd);
    setLoading(false);
    if (!ok) setErr(message === "Invalid login credentials" ? "E-mail ou senha incorretos." : message);
    // se ok, o listener de auth em useAuth atualiza a sessão e a página admin re-renderiza sozinha
  };

  return (
    <section style={{ maxWidth: 420, margin: "0 auto", padding: "80px 20px" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 6, color: BRAND.green, fontWeight: 700, marginBottom: 20, textDecoration: "none" }}>
        <ArrowLeft size={16} /> Voltar ao site
      </Link>
      <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderTop: `4px solid ${BRAND.green}`, borderRadius: 10, padding: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <Lock size={20} color={BRAND.green} />
          <h1 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 22, color: BRAND.greenDark, margin: 0 }}>Área administrativa</h1>
        </div>
        <p style={{ color: "#5c655e", fontSize: 13.5, marginBottom: 22 }}>Entre com sua conta de administrador para editar o site.</p>

        <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: BRAND.greenDark, marginBottom: 6 }}>E-mail</label>
        <input
          type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErr(""); }} autoFocus
          style={{ width: "100%", padding: "11px 12px", borderRadius: 6, border: `1.5px solid ${BRAND.border}`, fontSize: 15, outline: "none", marginBottom: 14 }}
          placeholder="seuemail@ufabc.edu.br"
        />

        <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: BRAND.greenDark, marginBottom: 6 }}>Senha</label>
        <input
          type="password" value={pwd}
          onChange={(e) => { setPwd(e.target.value); setErr(""); }}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          style={{ width: "100%", padding: "11px 12px", borderRadius: 6, border: `1.5px solid ${err ? "#B3261E" : BRAND.border}`, fontSize: 15, outline: "none" }}
          placeholder="••••••••"
        />
        {err && <span style={{ display: "block", color: "#B3261E", fontSize: 12.5, marginTop: 6 }}>{err}</span>}

        <button
          type="button" onClick={submit} disabled={loading}
          style={{ width: "100%", marginTop: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: BRAND.green, color: "#fff", border: "none", padding: "12px", borderRadius: 6, fontWeight: 700, fontSize: 15, cursor: "pointer" }}
        >
          {loading ? <Loader2 className="spin" size={16} /> : null} Entrar
        </button>

        <p style={{ fontSize: 12, color: "#9aa39c", marginTop: 18 }}>
          Ainda não tem uma conta de administrador? Crie uma em Supabase → Authentication → Users, no painel do projeto.
        </p>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useAuth } from "@/lib/useAuth";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminArea from "@/components/admin/AdminArea";
import Toast from "@/components/Toast";

export default function AdminPage() {
  const { authed, loading, signOut } = useAuth();
  const [toast, setToast] = useState(null);
  const notify = (message, kind = "success") => setToast({ message, kind });

  return (
    <div style={{ fontFamily: "var(--font-metropolis), 'Segoe UI', sans-serif", background: BRAND.bg, minHeight: "100vh", color: BRAND.ink }}>
      <div style={{ background: BRAND.greenDark, padding: "14px 20px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", gap: 10, color: "#fff" }}>
          <Lock size={16} color={BRAND.yellow} />
          <strong style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 15 }}>Painel administrativo · SEUFABC</strong>
        </div>
      </div>

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#5c655e", padding: "60px 20px", justifyContent: "center" }}>
          <Loader2 className="spin" size={18} /> Verificando sessão…
        </div>
      ) : authed ? (
        <AdminArea onLogout={signOut} notify={notify} />
      ) : (
        <AdminLogin />
      )}

      {toast && <Toast message={toast.message} kind={toast.kind} onClose={() => setToast(null)} />}
    </div>
  );
}

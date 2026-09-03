"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Building2 } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useSponsors } from "@/lib/useSponsors";
import SponsorForm from "./SponsorForm";
import { iconBtn } from "./adminStyles";

export default function SponsorsManager({ notify }) {
  const { sponsors, error, createSponsor, updateSponsor, deleteSponsor } = useSponsors({ onlyActive: false });
  const [editing, setEditing] = useState(null); // null | 'new' | sponsor
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const handleSave = async (form) => {
    setSaving(true);
    let ok;
    if (editing === "new") {
      const res = await createSponsor(form);
      ok = res.ok;
      if (ok) notify("Patrocinador cadastrado.");
    } else {
      ok = await updateSponsor(editing.id, form);
      if (ok) notify("Patrocinador atualizado.");
    }
    setSaving(false);
    if (ok) setEditing(null);
  };

  const toggleActive = async (sponsor) => {
    const ok = await updateSponsor(sponsor.id, { status: sponsor.status === "active" ? "inactive" : "active" });
    if (ok) notify(sponsor.status === "active" ? "Patrocinador ocultado." : "Patrocinador ativado.");
  };

  const confirmDelete = async (id) => {
    const ok = await deleteSponsor(id);
    setConfirmId(null);
    if (ok) notify("Patrocinador excluído.", "success");
  };

  if (editing) {
    return (
      <div style={{ maxWidth: 640 }}>
        <SponsorForm
          initial={editing === "new" ? null : editing}
          saving={saving}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 24, color: BRAND.greenDark, margin: 0 }}>Patrocinadores</h1>
          <p style={{ color: "#5c655e", fontSize: 13.5, margin: "4px 0 0" }}>Cadastre empresas, logo, categoria e status de exibição.</p>
        </div>
        <button onClick={() => setEditing("new")} style={{ display: "flex", alignItems: "center", gap: 8, background: BRAND.green, color: "#fff", border: "none", padding: "11px 18px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
          <Plus size={16} /> Novo patrocinador
        </button>
      </div>

      {sponsors === null ? (
        <p style={{ color: "#5c655e" }}>Carregando…</p>
      ) : error ? (
        <p style={{ color: "#B3261E" }}>{error}</p>
      ) : sponsors.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", border: `1.5px dashed ${BRAND.border}`, borderRadius: 10, color: "#5c655e" }}>
          Nenhum patrocinador ainda. Clique em <strong>Novo patrocinador</strong> para cadastrar o primeiro.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {sponsors.map((s) => (
            <div key={s.id} style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: "14px 18px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div style={{ width: 44, height: 44, minWidth: 44, borderRadius: 6, border: `1px solid ${BRAND.border}`, display: "grid", placeItems: "center", overflow: "hidden", background: "#fafbfa" }}>
                {s.logo_url ? <img src={s.logo_url} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} /> : <Building2 size={18} color={BRAND.border} />}
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <strong style={{ color: BRAND.greenDark, fontSize: 15 }}>{s.name}</strong>
                  <span
                    style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: s.status === "active" ? "#E7F5EC" : "#F1F1F1", color: s.status === "active" ? BRAND.green : "#666", border: `1px solid ${s.status === "active" ? "#BFE3CC" : "#DADADA"}` }}
                  >
                    {s.status === "active" ? "Ativo" : "Inativo"}
                  </span>
                </div>
                <span style={{ fontSize: 12.5, color: "#8a938c" }}>{s.tier} · posição {s.position}</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => toggleActive(s)} title={s.status === "active" ? "Ocultar" : "Ativar"} style={iconBtn}>
                  {s.status === "active" ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button onClick={() => setEditing(s)} title="Editar" style={iconBtn}><Pencil size={16} /></button>
                {confirmId === s.id ? (
                  <>
                    <button onClick={() => confirmDelete(s.id)} style={{ ...iconBtn, borderColor: "#B3261E", color: "#B3261E" }}>Confirmar</button>
                    <button onClick={() => setConfirmId(null)} style={iconBtn}>Cancelar</button>
                  </>
                ) : (
                  <button onClick={() => setConfirmId(s.id)} title="Excluir" style={{ ...iconBtn, color: "#B3261E" }}><Trash2 size={16} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

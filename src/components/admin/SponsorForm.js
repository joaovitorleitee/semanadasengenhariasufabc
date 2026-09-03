"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { BRAND, SPONSOR_TIERS } from "@/lib/brand";
import { fieldInput, fieldLabel } from "./adminStyles";

const emptyForm = { name: "", logo_url: "", website_url: "", tier: SPONSOR_TIERS[SPONSOR_TIERS.length - 1], description: "", position: 0, status: "active" };

export default function SponsorForm({ initial, onCancel, onSave, saving }) {
  const [form, setForm] = useState(initial || emptyForm);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.name.trim();

  return (
    <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 10, padding: 26 }}>
      <h3 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 19, color: BRAND.greenDark, margin: "0 0 18px" }}>
        {initial ? "Editar patrocinador" : "Novo patrocinador"}
      </h3>

      <div style={{ display: "grid", gap: 16 }}>
        <div>
          <label style={fieldLabel}>Nome da empresa</label>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} style={fieldInput} placeholder="Ex.: Acme Engenharia" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row">
          <div>
            <label style={fieldLabel}>Categoria (cota)</label>
            <select value={form.tier} onChange={(e) => set("tier", e.target.value)} style={fieldInput}>
              {SPONSOR_TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={fieldLabel}>Ordem de exibição (menor aparece primeiro)</label>
            <input type="number" value={form.position} onChange={(e) => set("position", Number(e.target.value) || 0)} style={fieldInput} />
          </div>
        </div>

        <div>
          <label style={fieldLabel}>URL do logo (imagem)</label>
          <input value={form.logo_url} onChange={(e) => set("logo_url", e.target.value)} style={fieldInput} placeholder="https://..." />
          {form.logo_url && (
            <div style={{ marginTop: 10, padding: 14, border: `1px dashed ${BRAND.border}`, borderRadius: 8, display: "flex", justifyContent: "center" }}>
              <img src={form.logo_url} alt="Pré-visualização" style={{ maxHeight: 60, maxWidth: "100%", objectFit: "contain" }} />
            </div>
          )}
        </div>

        <div>
          <label style={fieldLabel}>Site da empresa (opcional)</label>
          <input value={form.website_url} onChange={(e) => set("website_url", e.target.value)} style={fieldInput} placeholder="https://..." />
        </div>

        <div>
          <label style={fieldLabel}>Descrição curta (opcional)</label>
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} style={{ ...fieldInput, resize: "vertical", minHeight: 60 }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <label style={fieldLabel}>Status</label>
          <div style={{ display: "flex", gap: 8 }}>
            {["active", "inactive"].map((s) => (
              <button
                key={s} type="button" onClick={() => set("status", s)}
                style={{
                  padding: "7px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 700,
                  border: `1.5px solid ${form.status === s ? BRAND.green : BRAND.border}`,
                  background: form.status === s ? BRAND.green : "#fff",
                  color: form.status === s ? "#fff" : "#5c655e",
                }}
              >
                {s === "active" ? "Ativo (visível no site)" : "Inativo (oculto)"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        <button
          disabled={!valid || saving}
          onClick={() => onSave(form)}
          style={{ display: "flex", alignItems: "center", gap: 8, background: valid ? BRAND.green : "#B9C6BE", color: "#fff", border: "none", padding: "11px 20px", borderRadius: 6, fontWeight: 700, cursor: valid ? "pointer" : "not-allowed", fontSize: 14 }}
        >
          {saving ? <Loader2 className="spin" size={16} /> : <Save size={16} />} Salvar patrocinador
        </button>
        <button onClick={onCancel} style={{ background: "none", border: `1.5px solid ${BRAND.border}`, padding: "11px 20px", borderRadius: 6, cursor: "pointer", fontWeight: 700, color: "#5c655e", fontSize: 14 }}>
          Cancelar
        </button>
      </div>
      <style>{`@media (max-width: 620px){ .form-row{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

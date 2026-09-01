"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { BRAND, CATEGORIES } from "@/lib/brand";
import { fieldInput, fieldLabel } from "./adminStyles";

const emptyForm = { title: "", category: CATEGORIES[0], excerpt: "", content: "", cover: "", status: "draft" };

export default function PostForm({ initial, onCancel, onSave, saving }) {
  const [form, setForm] = useState(initial || emptyForm);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.title.trim() && form.excerpt.trim() && form.content.trim();

  return (
    <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 10, padding: 26 }}>
      <h3 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 19, color: BRAND.greenDark, margin: "0 0 18px" }}>
        {initial ? "Editar post" : "Novo post"}
      </h3>

      <div style={{ display: "grid", gap: 16 }}>
        <div>
          <label style={fieldLabel}>Título</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} style={fieldInput} placeholder="Ex.: Inscrições abertas para minicursos" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row">
          <div>
            <label style={fieldLabel}>Categoria</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)} style={fieldInput}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={fieldLabel}>Imagem de capa (URL, opcional)</label>
            <input value={form.cover} onChange={(e) => set("cover", e.target.value)} style={fieldInput} placeholder="https://..." />
          </div>
        </div>

        <div>
          <label style={fieldLabel}>Resumo (aparece nos cards)</label>
          <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} style={{ ...fieldInput, resize: "vertical", minHeight: 60 }} placeholder="Uma ou duas frases sobre o post" />
        </div>

        <div>
          <label style={fieldLabel}>Conteúdo</label>
          <textarea value={form.content} onChange={(e) => set("content", e.target.value)} style={{ ...fieldInput, resize: "vertical", minHeight: 180 }} placeholder="Texto completo do post" />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <label style={fieldLabel}>Status</label>
          <div style={{ display: "flex", gap: 8 }}>
            {["draft", "published"].map((s) => (
              <button
                key={s} type="button" onClick={() => set("status", s)}
                style={{
                  padding: "7px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 700,
                  border: `1.5px solid ${form.status === s ? BRAND.green : BRAND.border}`,
                  background: form.status === s ? BRAND.green : "#fff",
                  color: form.status === s ? "#fff" : "#5c655e",
                }}
              >
                {s === "draft" ? "Rascunho" : "Publicado"}
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
          {saving ? <Loader2 className="spin" size={16} /> : <Save size={16} />} Salvar post
        </button>
        <button onClick={onCancel} style={{ background: "none", border: `1.5px solid ${BRAND.border}`, padding: "11px 20px", borderRadius: 6, cursor: "pointer", fontWeight: 700, color: "#5c655e", fontSize: 14 }}>
          Cancelar
        </button>
      </div>
      <style>{`@media (max-width: 620px){ .form-row{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

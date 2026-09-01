"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { fieldInput, fieldLabel } from "./adminStyles";

export default function CourseForm({ course, onCancel, onSave, saving }) {
  const [form, setForm] = useState({
    nome: course.nome,
    campus: course.campus,
    perfil: course.perfil.join("\n"),
    areas: course.areas.join("\n"),
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    onSave({
      nome: form.nome.trim(),
      campus: form.campus.trim(),
      perfil: form.perfil.split("\n").map((s) => s.trim()).filter(Boolean),
      areas: form.areas.split("\n").map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 10, padding: 26, maxWidth: 640 }}>
      <h3 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 18, color: BRAND.greenDark, margin: "0 0 18px" }}>Editar curso {course.n}</h3>
      <div style={{ display: "grid", gap: 16 }}>
        <div>
          <label style={fieldLabel}>Nome do curso</label>
          <input value={form.nome} onChange={(e) => set("nome", e.target.value)} style={fieldInput} />
        </div>
        <div>
          <label style={fieldLabel}>Campus</label>
          <input value={form.campus} onChange={(e) => set("campus", e.target.value)} style={fieldInput} />
        </div>
        <div>
          <label style={fieldLabel}>Perfil do curso (um item por linha)</label>
          <textarea value={form.perfil} onChange={(e) => set("perfil", e.target.value)} style={{ ...fieldInput, resize: "vertical", minHeight: 100 }} />
        </div>
        <div>
          <label style={fieldLabel}>Áreas de atuação (um item por linha)</label>
          <textarea value={form.areas} onChange={(e) => set("areas", e.target.value)} style={{ ...fieldInput, resize: "vertical", minHeight: 100 }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
        <button
          disabled={saving} onClick={save}
          style={{ display: "flex", alignItems: "center", gap: 8, background: BRAND.green, color: "#fff", border: "none", padding: "11px 20px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: 14 }}
        >
          {saving ? <Loader2 className="spin" size={16} /> : <Save size={16} />} Salvar curso
        </button>
        <button onClick={onCancel} style={{ background: "none", border: `1.5px solid ${BRAND.border}`, padding: "11px 20px", borderRadius: 6, cursor: "pointer", fontWeight: 700, color: "#5c655e", fontSize: 14 }}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

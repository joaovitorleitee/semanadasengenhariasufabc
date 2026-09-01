"use client";

import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { fieldInput, fieldLabel } from "./adminStyles";

export default function SectionEditor({ title, description, fields, values, onSave, notify }) {
  const [form, setForm] = useState(values);
  const [saving, setSaving] = useState(false);
  useEffect(() => { setForm(values); }, [values]);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    const ok = await onSave(form);
    setSaving(false);
    if (ok) notify("Alterações salvas.");
  };

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 24, color: BRAND.greenDark, margin: "0 0 4px" }}>{title}</h1>
      <p style={{ color: "#5c655e", fontSize: 13.5, margin: "0 0 22px" }}>{description}</p>
      <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 10, padding: 26, display: "grid", gap: 16, maxWidth: 640 }}>
        {fields.map((f) => (
          <div key={f.key}>
            <label style={fieldLabel}>{f.label}</label>
            {f.type === "textarea" ? (
              <textarea value={form[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} style={{ ...fieldInput, resize: "vertical", minHeight: 90 }} />
            ) : (
              <input value={form[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} style={fieldInput} />
            )}
          </div>
        ))}
        <div>
          <button
            onClick={save} disabled={saving}
            style={{ display: "flex", alignItems: "center", gap: 8, background: BRAND.green, color: "#fff", border: "none", padding: "11px 20px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: 14 }}
          >
            {saving ? <Loader2 className="spin" size={16} /> : <Save size={16} />} Salvar alterações
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { BRAND } from "@/lib/brand";

export default function EventoSection({ content }) {
  const c = content.evento;
  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="evento-grid">
        <div>
          <span style={{ color: BRAND.green, fontWeight: 800, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif" }}>{c.eyebrow}</span>
          <h2 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 30, color: BRAND.greenDark, margin: "8px 0 16px" }}>{c.title}</h2>
          <p style={{ color: "#4a544d", lineHeight: 1.7, marginBottom: 14 }}>{c.paragraph1}</p>
          <p style={{ color: "#4a544d", lineHeight: 1.7 }}>{c.paragraph2}</p>
        </div>
        <div style={{ background: BRAND.bg, border: `1px solid ${BRAND.border}`, borderLeft: `6px solid ${BRAND.yellow}`, borderRadius: 8, padding: 26 }}>
          <span style={{ color: BRAND.green, fontWeight: 800, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif" }}>{c.socialTitle}</span>
          <p style={{ color: "#3d443f", lineHeight: 1.7, marginTop: 10 }}>{c.socialText}</p>
        </div>
      </div>
      <style>{`@media (max-width: 860px){ .evento-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

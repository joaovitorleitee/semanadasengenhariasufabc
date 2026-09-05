"use client";

import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function Hero({ content }) {
  const c = content.hero;
  return (
    <section style={{ background: `linear-gradient(120deg, ${BRAND.greenDark}, ${BRAND.green})`, color: "#fff" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "70px 20px 60px", display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 40, alignItems: "center" }} className="hero-grid">
        <div>
          <span style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontWeight: 800, color: BRAND.yellow, fontSize: 13, letterSpacing: ".08em" }}>{c.badge}</span>
          <h1 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontWeight: 800, fontSize: "clamp(34px, 5vw, 54px)", lineHeight: 1.08, margin: "10px 0 18px" }}>
            {c.title}
          </h1>
          <p style={{ fontSize: 17, color: "#DCEFE2", maxWidth: 560, lineHeight: 1.6 }}>{c.subtitle}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <Link href="/engenharias" className="btn-hover" style={{ background: BRAND.yellow, color: BRAND.greenDark, border: "none", padding: "13px 24px", borderRadius: 6, fontWeight: 800, fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 15, textDecoration: "none" }}>
              {c.ctaPrimary}
            </Link>
            <Link href="/noticias" className="btn-hover" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,.5)", padding: "13px 24px", borderRadius: 6, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              {c.ctaSecondary}
            </Link>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 12, padding: 26 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 18 }}>
            <Calendar size={20} color={BRAND.yellow} />
            <div>
              <strong style={{ display: "block", fontSize: 14 }}>Data</strong>
              <span style={{ fontSize: 14, color: "#CFE6D7" }}>{c.date}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <MapPin size={20} color={BRAND.yellow} />
            <div>
              <strong style={{ display: "block", fontSize: 14 }}>Local</strong>
              <span style={{ fontSize: 14, color: "#CFE6D7" }}>{c.local}</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 860px){ .hero-grid{ grid-template-columns: 1fr !important; } }`}</style>
      <style>{`
          .btn-hover:hover {
          filter: brightness(0.95); /* Escurece levemente o botão */
          transform: translateY(-2px); /* Eleva o botão suavemente */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Adiciona uma sombra leve */
          transition: transform 0.25s ease-in-out;
        }
      `}</style>
    </section>
  );
  
}


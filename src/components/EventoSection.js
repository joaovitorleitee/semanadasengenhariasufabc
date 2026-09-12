"use client";

import { BRAND } from "@/lib/brand";

// ============================================================================
// EventoSection.js — Seção "O Evento" da home: explica o que é a Semana das
// Engenharias (2 parágrafos) e destaca a responsabilidade social em um
// cartão ao lado. Recebe "content" (Supabase + fallback) via prop.
//
// MODO ESCURO: diferente do Hero/Footer (que têm fundo verde fixo), esta
// seção fica sobre o fundo NORMAL da página — que muda de claro para
// escuro. Por isso os textos e o cartão aqui usam tokens adaptáveis
// (BRAND.heading, BRAND.accentText, var(--text-...), BRAND.bg, BRAND.border)
// em vez de cores fixas, garantindo contraste correto nos dois temas.
// ============================================================================
export default function EventoSection({ content }) {
  const c = content.evento; // Atalho para o objeto de conteúdo desta seção

  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 20px", marginBottom: 150 }}>
      {/* Grade de 2 colunas: texto explicativo à esquerda, cartão de
          responsabilidade social à direita. Em telas estreitas vira 1
          coluna (ver media query abaixo). */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="evento-grid">

        {/* --- Coluna esquerda: eyebrow (rótulo pequeno), título e texto --- */}
        <div>
          {/* Rótulo pequeno acima do título (ex: "O EVENTO") — verde
              adaptável, pois é texto sobre o fundo da página. */}
          <span style={{ color: BRAND.accentText, fontWeight: 800, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif" }}>{c.eyebrow}</span>
          {/* Título da seção — também usa a cor de título adaptável ao tema */}
          <h2 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 30, color: BRAND.heading, margin: "8px 0 16px" }}>{c.title}</h2>
          <p style={{ color: "var(--text-softer)", lineHeight: 1.7, marginBottom: 14 }}>{c.paragraph1}</p>
          <p style={{ color: "var(--text-softer)", lineHeight: 1.7 }}>{c.paragraph2}</p>
        </div>

        {/* --- Coluna direita: cartão de destaque com borda amarela --- */}
        <div style={{ background: BRAND.bg, border: `1px solid ${BRAND.border}`, borderLeft: `6px solid ${BRAND.yellow}`, borderRadius: 8, padding: 26 }}>
          <span style={{ color: BRAND.accentText, fontWeight: 800, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif" }}>{c.socialTitle}</span>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.7, marginTop: 10 }}>{c.socialText}</p>
        </div>
      </div>

      {/* Em telas estreitas (até 860px), a grade de 2 colunas vira 1
          coluna só, empilhando texto e cartão. */}
      <style>{`@media (max-width: 860px){ .evento-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Calendar, MapPin } from "lucide-react"; // Ícones usados no card de data/local
import { BRAND } from "@/lib/brand";
import { DEFAULT_CONTENT } from "@/lib/brand";

// ============================================================================
// Hero.js — Seção de destaque no topo da página inicial (título, chamada
// para ação e um cartão com data/local do evento).
// Recebe "content" (do Supabase, com fallback em DEFAULT_CONTENT) via prop.
//
// MODO ESCURO: o fundo desta seção é um gradiente fixo entre
// BRAND.greenDark e BRAND.green (cores que NÃO mudam entre os temas — ver
// brand.js), com texto branco/verde-claro. Por isso a seção já nasce
// "escura" nos dois temas e nenhuma cor aqui precisou virar variável
// adaptável: o contraste permanece correto independente do tema escolhido.
// ============================================================================
export default function Hero({ content }) {
  const c = content.hero; // Atalho para o objeto de conteúdo do Hero

  return (
    // Fundo em gradiente diagonal (120°) entre verde-escuro e verde da marca.
    <section style={{ background: `linear-gradient(120deg, ${BRAND.greenDark}, ${BRAND.green})`, color: "#fff" }}>

      {/* Grade de 2 colunas: texto/CTA à esquerda, card de data/local à
          direita. Em telas estreitas vira 1 coluna (ver media query abaixo). */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "70px 20px 60px", display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 40, alignItems: "center" }} className="hero-grid">

        {/* --- Coluna esquerda: selo, título, subtítulo e botões --- */}
        <div>
          {/* Selo pequeno acima do título (ex: "UFABC · 2026") */}
          <span style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontWeight: 800, color: BRAND.yellow, fontSize: 13, letterSpacing: ".08em" }}>{c.badge}</span>
          {/* Título principal — fontSize usa clamp() para ser responsivo:
              nunca menor que 34px, nunca maior que 54px, escalando com a
              largura da tela (5vw) entre esses limites. */}
          <h1 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontWeight: 800, fontSize: "clamp(34px, 5vw, 54px)", lineHeight: 1.08, margin: "10px 0 18px" }}>
            {c.title}
          </h1>
          <p style={{ fontSize: 17, color: "#DCEFE2", maxWidth: 560, lineHeight: 1.6 }}>{c.subtitle}</p>

          {/* Botões de ação: um preenchido (amarelo) e um contornado
              (transparente com borda branca semitransparente). */}
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <Link href="/engenharias" className="btn-hover" style={{ background: BRAND.yellow, color: BRAND.greenDark, border: "none", padding: "13px 24px", borderRadius: 6, fontWeight: 800, fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 15, textDecoration: "none" }}>
              {c.ctaPrimary}
            </Link>
            <Link href="/noticias" className="btn-hover" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,.5)", padding: "13px 24px", borderRadius: 6, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              {c.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* --- Coluna direita: card "vidro fosco" com data e local ---
            rgba(255,255,255,.08) cria o efeito de vidro semitransparente
            sobre o gradiente verde de fundo. */}
        <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 12, padding: 26 }}>
          {/* Linha "Data" */}
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 18 }}>
            <Calendar size={20} color={BRAND.yellow} />
            <div>
              <strong style={{ display: "block", fontSize: 14 }}>Data</strong>
              <span style={{ fontSize: 14, color: "#CFE6D7" }}>{c.date}</span>
            </div>
          </div>
          {/* Linha "Local" */}
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <MapPin size={20} color={BRAND.yellow} />
            <div>
              <strong style={{ display: "block", fontSize: 14 }}>Local</strong>
              <span style={{ fontSize: 14, color: "#CFE6D7" }}>{c.local}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Em telas estreitas (até 860px), a grade de 2 colunas vira 1
          coluna só, empilhando texto e card de data/local. */}
      <style>{`@media (max-width: 860px){ .hero-grid{ grid-template-columns: 1fr !important; } }`}</style>

      {/* Efeito de hover dos botões: escurece, levanta e adiciona sombra
          suave — mesmo padrão usado em outros botões do site. */}
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

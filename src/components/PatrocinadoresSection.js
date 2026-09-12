"use client";

import { useState } from "react";
import { Loader2, Building2, ChevronDown, ChevronUp } from "lucide-react";
import { BRAND, SPONSOR_TIERS } from "@/lib/brand";
import { useSponsors } from "@/lib/useSponsors"; // Hook que busca os patrocinadores ativos no Supabase

// ============================================================================
// SponsorCard — Cartão individual de um patrocinador: logo, nome e (se
// houver) uma descrição que pode ser expandida/recolhida.
//
// MODO ESCURO: o fundo deste cartão usa "var(--logo-chip)", que é BRANCO
// FIXO nos dois temas (não muda no escuro). Isso é proposital: muitas logos
// de patrocinador são PNGs com fundo transparente, desenhadas para ficar
// sobre um fundo claro — se o cartão escurecesse junto com o resto do site,
// essas logos poderiam ficar ilegíveis. Por isso o nome do patrocinador
// (BRAND.greenDark) e a descrição (cinza fixo) também continuam com cores
// fixas aqui: como o fundo do cartão nunca muda, o contraste correto já
// está garantido nos dois temas.
// ============================================================================
function SponsorCard({ sponsor }) {
  // Controla se a descrição do patrocinador está expandida ou recolhida.
  const [expanded, setExpanded] = useState(false);

  const inner = (
    <div
      className="sponsor-card" // Usado no CSS abaixo para o efeito de hover
      style={{
        background: "var(--logo-chip)", // Fundo branco fixo (ver explicação acima)
        border: `1px solid ${BRAND.border}`,
        borderRadius: 12,
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        textAlign: "center",
        height: "100%",
        boxSizing: "border-box",
        transition: "all 0.3s ease"
      }}
    >
      {/* Container da Logo: altura fixa para alinhar todos os cartões,
          mesmo com logos de tamanhos diferentes. */}
      <div style={{ height: 100, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {sponsor.logo_url ? (
          <img
            src={sponsor.logo_url}
            alt={sponsor.name}
            className="sponsor-logo" // Efeito de zoom leve no hover (CSS abaixo)
            style={{
              maxHeight: 95,
              maxWidth: "100%",
              objectFit: "contain", // Mantém a proporção da imagem, sem distorcer
              transition: "transform 0.3s ease"
            }}
          />
        ) : (
          // Sem logo cadastrada: mostra um ícone de prédio como placeholder
          <Building2 color={BRAND.border} size={48} />
        )}
      </div>

      {/* Nome do patrocinador, centralizado */}
      <strong style={{ color: BRAND.greenDark, fontSize: 15, textAlign: "center" }}>
        {sponsor.name}
      </strong>

      {/* Descrição expansível (só aparece se o patrocinador tiver uma) */}
      {sponsor.description && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: "100%" }}>
          <button
            onClick={(e) => {
              // preventDefault + stopPropagation: como este botão pode estar
              // dentro de um link (<a> para o site do patrocinador), evita
              // que o clique também acione a navegação do link.
              e.preventDefault();
              e.stopPropagation();
              setExpanded(!expanded); // Alterna entre expandido/recolhido
            }}
            style={{
              background: "transparent",
              border: "none",
              color: BRAND.green,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 6px"
            }}
          >
            {expanded ? "Ocultar" : "Ver mais"}
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {/* Container com animação de abertura/fechamento via CSS Grid
              (grid-template-rows de 0fr para 1fr — ver estilo abaixo). */}
          <div className={`sponsor-desc-wrapper ${expanded ? "is-expanded" : ""}`}>
            <div style={{ overflow: "hidden" }}>
              <p style={{ color: "#5c655e", fontSize: 12.5, margin: "6px 0 0", lineHeight: 1.5, textAlign: "justify" }}>
                {sponsor.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Se o patrocinador tem site cadastrado, o cartão inteiro vira um link
  // (abre em nova aba); senão, mostra só o cartão sem link.
  if (sponsor.website_url) {
    return (
      <a href={sponsor.website_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", height: "100%" }}>
        {inner}
      </a>
    );
  }
  return inner;
}

// ============================================================================
// PatrocinadoresSection.js — Seção que lista os patrocinadores, agrupados
// por nível (Diamante, Ouro, Prata...). Recebe "content" (Supabase +
// fallback) via prop.
//
// MODO ESCURO: título, rótulo e mensagens de estado usam tokens adaptáveis
// (BRAND.accentText, BRAND.heading, var(--text-muted), var(--error)), pois
// ficam sobre o fundo normal da página (que muda de tema). Já os cartões
// de patrocinador (SponsorCard, acima) têm fundo branco fixo — ver
// explicação no início do arquivo.
// ============================================================================
export default function PatrocinadoresSection({ content }) {
  // Busca os patrocinadores ativos. "sponsors" começa null (carregando).
  const { sponsors, error } = useSponsors({ onlyActive: true });
  const c = content.patrocinadores; // Atalho para o conteúdo textual da seção

  // Agrupa os patrocinadores por nível (tier), na ordem definida em
  // SPONSOR_TIERS, descartando níveis sem nenhum patrocinador.
  const grouped = SPONSOR_TIERS.map((tier) => ({
    tier,
    items: (sponsors || []).filter((s) => s.tier === tier),
  })).filter((g) => g.items.length > 0);

  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "50px 20px 90px", textAlign: "center" }}>
      {/* Rótulo pequeno acima do título (ex: "PARCEIROS") */}
      <span style={{ color: BRAND.accentText, fontWeight: 800, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif", display: "block" }}>
        {c.eyebrow}
      </span>
      <h2 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 30, color: BRAND.heading, margin: "8px 0 6px" }}>
        {c.title}
      </h2>
      <p style={{ color: "var(--text-muted)", marginBottom: 30, maxWidth: 600, margin: "0 auto 30px" }}>
        {c.subtitle}
      </p>

      {/* Três estados possíveis: carregando / erro / lista vazia / lista
          de grupos de patrocinadores (mesmo padrão usado em NoticiasSection). */}
      {sponsors === null ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, color: "var(--text-muted)" }}>
          <Loader2 className="spin" size={18} /> Carregando patrocinadores…
        </div>
      ) : error ? (
        <p style={{ color: "var(--error)" }}>{error}</p>
      ) : grouped.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>Ainda não há patrocinadores cadastrados.</p>
      ) : (
        // Um bloco por nível de patrocínio, cada um com seu próprio título
        // e uma grade de cartões (SponsorCard).
        grouped.map((g) => (
          <div key={g.tier} style={{ marginBottom: 44 }}>
            <h3 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 16, color: BRAND.accentText, letterSpacing: ".04em", marginBottom: 20, textTransform: "uppercase" }}>
              {g.tier}
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 280px))", // Colunas flexíveis, entre 240 e 280px cada
                justifyContent: "center",
                gap: 20
              }}
              className="sponsors-grid"
            >
              {g.items.map((s) => <SponsorCard key={s.id} sponsor={s} />)}
            </div>
          </div>
        ))
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        /* Ao passar o mouse no cartão: a logo cresce levemente e a borda
           do cartão fica verde, com uma sombra suave — dá feedback de
           que o cartão é clicável (quando tem site cadastrado). */
        .sponsor-card:hover .sponsor-logo {
          transform: scale(1.08);
        }

        .sponsor-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          border-color: ${BRAND.green} !important;
        }

        /* Transição suave de abertura/fechamento da descrição: anima a
           altura da linha da grade (grid-template-rows) de "0fr" (fechado)
           para "1fr" (aberto), junto com a opacidade. */
        .sponsor-desc-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease-in-out, opacity 0.3s ease-in-out;
          opacity: 0;
          width: 100%;
        }

        .sponsor-desc-wrapper.is-expanded {
          grid-template-rows: 1fr;
          opacity: 1;
        }

        /* Em telas pequenas (até 620px), cada cartão ocupa 100% da
           largura disponível, um por linha. */
        @media (max-width: 620px) {
          .sponsors-grid {
            grid-template-columns: repeat(auto-fit, minmax(100%, 1fr)) !important;
          }
        }
      ` }} />
    </section>
  );
}

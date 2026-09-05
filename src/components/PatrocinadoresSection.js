"use client";

import { useState } from "react";
import { Loader2, Building2, ChevronDown, ChevronUp } from "lucide-react";
import { BRAND, SPONSOR_TIERS } from "@/lib/brand";
import { useSponsors } from "@/lib/useSponsors";

function SponsorCard({ sponsor }) {
  const [expanded, setExpanded] = useState(false);

  const inner = (
    <div 
      className="sponsor-card"
      style={{ 
        background: "#fff", 
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
      {/* Container da Logo */}
      <div style={{ height: 100, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {sponsor.logo_url ? (
          <img 
            src={sponsor.logo_url} 
            alt={sponsor.name} 
            className="sponsor-logo"
            style={{ 
              maxHeight: 95, 
              maxWidth: "100%", 
              objectFit: "contain",
              transition: "transform 0.3s ease" 
            }} 
          />
        ) : (
          <Building2 color={BRAND.border} size={48} />
        )}
      </div>

      {/* Nome centralizado */}
      <strong style={{ color: BRAND.greenDark, fontSize: 15, textAlign: "center" }}>
        {sponsor.name}
      </strong>

      {/* Descrição expansível com animação de transição */}
      {sponsor.description && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: "100%" }}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExpanded(!expanded);
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

          {/* Container animado utilizando CSS Grid Rows */}
          <div className={`sponsor-desc-wrapper ${expanded ? "is-expanded" : ""}`}>
            <div style={{ overflow: "hidden" }}>
              <p style={{ color: "#5c655e", fontSize: 12.5, margin: "6px 0 0", lineHeight: 1.5, textAlign: "center" }}>
                {sponsor.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (sponsor.website_url) {
    return (
      <a href={sponsor.website_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", height: "100%" }}>
        {inner}
      </a>
    );
  }
  return inner;
}

export default function PatrocinadoresSection({ content }) {
  const { sponsors, error } = useSponsors({ onlyActive: true });
  const c = content.patrocinadores;

  const grouped = SPONSOR_TIERS.map((tier) => ({
    tier,
    items: (sponsors || []).filter((s) => s.tier === tier),
  })).filter((g) => g.items.length > 0);

  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "50px 20px 90px", textAlign: "center" }}>
      <span style={{ color: BRAND.green, fontWeight: 800, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif", display: "block" }}>
        {c.eyebrow}
      </span>
      <h2 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 30, color: BRAND.greenDark, margin: "8px 0 6px" }}>
        {c.title}
      </h2>
      <p style={{ color: "#5c655e", marginBottom: 30, maxWidth: 600, margin: "0 auto 30px" }}>
        {c.subtitle}
      </p>

      {sponsors === null ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, color: "#5c655e" }}>
          <Loader2 className="spin" size={18} /> Carregando patrocinadores…
        </div>
      ) : error ? (
        <p style={{ color: "#B3261E" }}>{error}</p>
      ) : grouped.length === 0 ? (
        <p style={{ color: "#5c655e" }}>Ainda não há patrocinadores cadastrados.</p>
      ) : (
        grouped.map((g) => (
          <div key={g.tier} style={{ marginBottom: 44 }}>
            <h3 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 16, color: BRAND.green, letterSpacing: ".04em", marginBottom: 20, textTransform: "uppercase" }}>
              {g.tier}
            </h3>
            
            <div 
              style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 280px))", 
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
        /* Efeito Hover na Logo e no Card */
        .sponsor-card:hover .sponsor-logo {
          transform: scale(1.08);
        }

        .sponsor-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          border-color: ${BRAND.green} !important;
        }

        /* Transição Suave de Abertura/Fechamento da Descrição */
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

        @media (max-width: 620px) { 
          .sponsors-grid { 
            grid-template-columns: repeat(auto-fit, minmax(100%, 1fr)) !important; 
          } 
        }
      ` }} />
    </section>
  );
}
"use client";

import { Loader2, Building2 } from "lucide-react";
import { BRAND, SPONSOR_TIERS } from "@/lib/brand";
import { useSponsors } from "@/lib/useSponsors";

function SponsorCard({ sponsor }) {
  const inner = (
    <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 10, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center", height: "100%" }}>
      <div style={{ height: 70, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {sponsor.logo_url ? (
          <img src={sponsor.logo_url} alt={sponsor.name} style={{ maxHeight: 70, maxWidth: "100%", objectFit: "contain" }} />
        ) : (
          <Building2 color={BRAND.border} size={36} />
        )}
      </div>
      <strong style={{ color: BRAND.greenDark, fontSize: 14 }}>{sponsor.name}</strong>
      {sponsor.description && <p style={{ color: "#5c655e", fontSize: 12.5, margin: 0, lineHeight: 1.5 }}>{sponsor.description}</p>}
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
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "50px 20px 90px" }}>
      <span style={{ color: BRAND.green, fontWeight: 800, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif" }}>{c.eyebrow}</span>
      <h2 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 30, color: BRAND.greenDark, margin: "8px 0 6px" }}>{c.title}</h2>
      <p style={{ color: "#5c655e", marginBottom: 30 }}>{c.subtitle}</p>

      {sponsors === null ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#5c655e" }}><Loader2 className="spin" size={18} /> Carregando patrocinadores…</div>
      ) : error ? (
        <p style={{ color: "#B3261E" }}>{error}</p>
      ) : grouped.length === 0 ? (
        <p style={{ color: "#5c655e" }}>Ainda não há patrocinadores cadastrados.</p>
      ) : (
        grouped.map((g) => (
          <div key={g.tier} style={{ marginBottom: 34 }}>
            <h3 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 16, color: BRAND.green, letterSpacing: ".04em", marginBottom: 14, textTransform: "uppercase" }}>{g.tier}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="sponsors-grid">
              {g.items.map((s) => <SponsorCard key={s.id} sponsor={s} />)}
            </div>
          </div>
        ))
      )}
      <style>{`
        @media (max-width: 900px){ .sponsors-grid{ grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 620px){ .sponsors-grid{ grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  );
}

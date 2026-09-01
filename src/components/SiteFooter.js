"use client";

import Link from "next/link";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function SiteFooter({ content }) {
  const c = content.footer;
  return (
    <footer style={{ background: BRAND.greenDark, color: "#fff", marginTop: 60 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 20px 26px", display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gap: 32 }} className="footer-grid">
        <div>
          <strong style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 18, letterSpacing: ".02em" }}>{c.title}</strong>
          <p style={{ color: "#CFE6D7", fontSize: 14, marginTop: 10, maxWidth: 360 }}>{c.description}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <Instagram size={18} /> <Linkedin size={18} /> <Facebook size={18} />
          </div>
        </div>
        <div>
          <strong style={{ display: "block", marginBottom: 10, fontSize: 14, color: BRAND.yellow }}>Navegação</strong>
          {[["/", "Início"], ["/evento", "O Evento"], ["/engenharias", "Engenharias"], ["/noticias", "Notícias"]].map(([href, label]) => (
            <Link key={href} href={href} style={{ display: "block", color: "#CFE6D7", padding: "4px 0", fontSize: 14, textDecoration: "none" }}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <strong style={{ display: "block", marginBottom: 10, fontSize: 14, color: BRAND.yellow }}>Contato</strong>
          <p style={{ color: "#CFE6D7", fontSize: 14, margin: "4px 0" }}>{c.email}</p>
          <p style={{ color: "#CFE6D7", fontSize: 14, margin: "4px 0" }}>{c.address}</p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.12)", padding: "16px 20px", textAlign: "center", fontSize: 12, color: "#9FC4AE" }}>
        © {new Date().getFullYear()} Semana das Engenharias UFABC — ufabc.edu.br
      </div>
      <style>{`@media (max-width: 760px){ .footer-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { DEFAULT_CONTENT } from "@/lib/brand";

export default function SiteFooter({ content }) {
  const c = content.footer;
  return (
    <footer style={{ background: BRAND.greenDark, color: "#fff", marginTop: 60 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 20px 26px", display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gap: 32 }} className="footer-grid">
        <div>
          <strong style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 18, letterSpacing: ".02em" }}>{c.title}</strong>
          <p style={{ color: "#CFE6D7", fontSize: 14, marginTop: 10, maxWidth: 360 }}>{c.description}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <Link 
    href="https://www.instagram.com/seufabc?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
    target="_blank" 
    rel="noopener noreferrer"
    style={{ color: "inherit", display: "inline-flex", alignItems: "center" }}
  >
    <Instagram size={18} />
  </Link> <Link 
    href="https://www.linkedin.com/in/semana-das-engenharias-ufabc"
    target="_blank" 
    rel="noopener noreferrer"
    style={{ color: "inherit", display: "inline-flex", alignItems: "center" }}
  >
    <Linkedin size={18} /> </Link>

   
          </div>
        </div>

        <div>
          <strong style={{ display: "block", marginBottom: 12, fontSize: 14, color: BRAND.yellow }}>Navegação</strong>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[["/", "Início"], ["/evento", "O Evento"], ["/engenharias", "Engenharias"], ["/noticias", "Notícias"], ["/patrocinadores", "Patrocinadores"]].map(([href, label]) => (
              <Link 
                key={href} 
                className="footer-nav-link" 
                href={href} 
                style={{ 
                  color: "#CFE6D7", 
                  fontSize: 14, 
                  textDecoration: "none", 
                  width: "fit-content",
                  position: "relative", // ✅ Necessário para ancorar o ::after
                  paddingBottom: "2px"
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <strong style={{ display: "block", marginBottom: 12, fontSize: 14, color: BRAND.yellow }}>Contato</strong>
          <p style={{ color: "#CFE6D7", fontSize: 14, margin: "4px 0" }}>{c.email}</p>
          <p style={{ color: "#CFE6D7", fontSize: 14, margin: "4px 0" }}>Campus Santo André</p>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,.12)", padding: "16px 20px", textAlign: "center", fontSize: 12, color: "#9FC4AE" }}>
        © {new Date().getFullYear()} Semana das Engenharias UFABC — ufabc.edu.br
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
          /* Estilo da linha animada para os links do Footer */
          .footer-nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: ${BRAND.yellow};
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.25s ease-in-out;
          }

          /* Expande a linha ao passar o mouse */
          .footer-nav-link:hover::after {
            transform: scaleX(1);
          }

          /* Mudança suave na cor do texto no hover */
          .footer-nav-link:hover {
            color: ${BRAND.yellow} !important;
            transition: color 0.2s ease-in-out;
          }

          @media (max-width: 760px) { 
            .footer-grid { 
              grid-template-columns: 1fr !important; 
            } 
          }
        ` }} />
    </footer>
  );
}
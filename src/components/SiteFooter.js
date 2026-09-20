"use client";

import Link from "next/link";
import { Instagram, Linkedin, ExternalLink, Lock } from "lucide-react";
import { BRAND, INSCRICAO_URL } from "@/lib/brand";
import { useSponsors } from "@/lib/useSponsors";

export default function SiteFooter({ content }) {
  const c = content.footer;
  const { sponsors } = useSponsors({ onlyActive: true });
  
  return (
    <footer style={{ background: BRAND.greenDark, color: "#fff", marginTop: 60 }}>
      {/* Grade principal com 3 colunas organizadas */}
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "44px 20px 26px",
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr 1fr",
          gap: 32,
          minWidth: 0,
        }}
        className="footer-grid"
      >
        {/* --- Coluna 1: Sobre o evento e Redes Sociais --- */}
        <div>
          <strong
            style={{
              fontFamily: "var(--font-league-spartan), sans-serif",
              fontSize: 18,
              letterSpacing: ".02em",
            }}
          >
            {c.title}
          </strong>
          <p style={{ color: "#CFE6D7", fontSize: 14, marginTop: 10, maxWidth: 360 }}>
            {c.description}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <Link
              href="https://www.instagram.com/seufabc?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", display: "inline-flex", alignItems: "center" }}
            >
              <Instagram size={18} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/semana-das-engenharias-ufabc"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", display: "inline-flex", alignItems: "center" }}
            >
              <Linkedin size={18} />
            </Link>
          </div>
        </div>

        {/* --- Coluna 2: Navegação --- */}
        <div>
          <strong style={{ display: "block", marginBottom: 12, fontSize: 14, color: BRAND.yellow }}>
            Navegação
          </strong>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              ["/", "Início"],
              ["/programacao", "Programação"],
              ["/evento", "O Evento"],
              ["/engenharias", "Engenharias"],
              ["/noticias", "Notícias"],
              ["/patrocinadores", "Patrocinadores"],
              ["/contato", "Fale Conosco"],
            ].map(([href, label]) => (
              <Link
                key={href}
                className="footer-nav-link"
                href={href}
                style={{
                  color: "#CFE6D7",
                  fontSize: 14,
                  textDecoration: "none",
                  width: "fit-content",
                  position: "relative",
                  paddingBottom: "2px",
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              href={INSCRICAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: BRAND.yellow,
                fontSize: 14,
                fontWeight: 800,
                textDecoration: "none",
                width: "fit-content",
                marginTop: 4,
              }}
            >
              Inscreva-se <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* --- Coluna 3: Contato --- */}
        <div>
          <strong style={{ display: "block", marginBottom: 12, fontSize: 14, color: BRAND.yellow }}>
            Contato
          </strong>
          <p style={{ color: "#CFE6D7", fontSize: 14, margin: "4px 0", overflowWrap: "anywhere" }}>{c.email}</p>
          <p style={{ color: "#CFE6D7", fontSize: 14, margin: "4px 0", overflowWrap: "anywhere" }}>{c.address}</p>
        </div>
      </div>
      
      {/* ======================================================= */}
      {/* ↓↓↓ NOVO: bloco de ícones dos patrocinadores ↓↓↓          */}
      {/* Inserido AQUI, entre a grade de 3 colunas e o copyright  */}
      {/* Nada abaixo foi removido — só empurrado pra depois dele  */}
      {/* ======================================================= */}
      {sponsors && sponsors.length > 0 && (
  <div style={{ borderTop: "1px solid rgba(255,255,255,.12)" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "24px 20px", textAlign: "center" }}>
      <strong
        style={{
          display: "block",
          marginBottom: 16,
          fontSize: 13,
          color: BRAND.yellow,
          letterSpacing: ".04em",
          textTransform: "uppercase",
        }}
      >
        Patrocinadores
      </strong>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 16 }}>
        {sponsors.map((s) => (
          <Link
            key={s.id}
            href={s.website_url || "/patrocinadores"}
            target="_blank"
            rel="noopener noreferrer"
            title={s.name}
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 60,
            }}
          >
            <img
              src={s.logo_url}
              alt={s.name}
              style={{ height: 36, maxWidth: 110, objectFit: "contain" }}
            />
          </Link>
        ))}
      </div>
    </div>
  </div>
)}
      {/* ↑↑↑ FIM DO BLOCO NOVO ↑↑↑ */}


      {/* --- Linha de rodapé inferior: Copyright + Link Discreto para Admin --- */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,.12)" }}>
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 12,
            color: "#9FC4AE",
          }}
        >
          <span>
            © {new Date().getFullYear()} Semana das Engenharias UFABC — ufabc.edu.br
          </span>

          <Link
            href="/admin"
            className="footer-admin-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 10px",
              borderRadius: 6,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#CFE6D7",
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            <Lock size={12} /> Área Administrativa
          </Link>
        </div>
      </div>

      <style>{`
        .footer-admin-link:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          color: #fff !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
        }

        /* Em telas estreitas, as 3 colunas do rodapé (Sobre / Navegação /
           Contato) viram 1 coluna só, empilhadas — igual já acontece em
           outras grades do site (ex: .evento-grid, .curso-grid). Essa regra
           estava faltando e era a causa da faixa branca no celular: sem
           ela, o e-mail de contato (texto sem espaço, não quebra linha)
           forçava a 3ª coluna a ficar mais larga que a tela. */
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { Instagram, Linkedin, Facebook } from "lucide-react"; // Ícones das redes sociais
import { BRAND } from "@/lib/brand";
import { DEFAULT_CONTENT } from "@/lib/brand";

// ============================================================================
// SiteFooter.js — Rodapé exibido no final de todas as páginas públicas.
// Recebe "content" (o conteúdo salvo no Supabase, com fallback em
// DEFAULT_CONTENT) via prop, vindo do PublicLayout.
//
// MODO ESCURO: este componente usa BRAND.greenDark como fundo, que é uma
// cor FIXA (não muda entre tema claro/escuro — ver brand.js). Por isso o
// rodapé já nasce "escuro" nos dois temas e nenhuma cor aqui precisou ser
// trocada por uma variável adaptável: o contraste entre o fundo verde-escuro
// e o texto claro (#fff, #CFE6D7) continua correto independente do tema
// escolhido pelo usuário.
// ============================================================================
export default function SiteFooter({ content }) {
  const c = content.footer; // Atalho para o objeto de conteúdo do rodapé

  return (
    // Fundo verde-escuro fixo da marca + texto branco.
    <footer style={{ background: BRAND.greenDark, color: "#fff", marginTop: 60 }}>

      {/* Grade com 3 colunas: sobre o evento / navegação / contato.
          Em telas estreitas vira 1 coluna só (ver media query no final). */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 20px 26px", display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gap: 32 }} className="footer-grid">

        {/* --- Coluna 1: título, descrição e redes sociais --- */}
        <div>
          <strong style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 18, letterSpacing: ".02em" }}>{c.title}</strong>
          <p style={{ color: "#CFE6D7", fontSize: 14, marginTop: 10, maxWidth: 360 }}>{c.description}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            {/* Ícone do Instagram: abre em nova aba (target="_blank"),
                rel="noopener noreferrer" evita brechas de segurança comuns
                em links que abrem em nova aba. */}
            <Link
              href="https://www.instagram.com/seufabc?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", display: "inline-flex", alignItems: "center" }}
            >
              <Instagram size={18} />
            </Link>
            {/* Ícone do LinkedIn, mesmo padrão do Instagram acima */}
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

        {/* --- Coluna 2: links de navegação (atalho para as páginas) --- */}
        <div>
          <strong style={{ display: "block", marginBottom: 12, fontSize: 14, color: BRAND.yellow }}>Navegação</strong>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {/* Lista de pares [url, texto] percorrida para gerar cada link */}
            {[["/", "Início"], ["/evento", "O Evento"], ["/engenharias", "Engenharias"], ["/noticias", "Notícias"], ["/patrocinadores", "Patrocinadores"]].map(([href, label]) => (
              <Link
                key={href}
                className="footer-nav-link" // Ativa o sublinhado animado no hover (CSS abaixo)
                href={href}
                style={{
                  color: "#CFE6D7",
                  fontSize: 14,
                  textDecoration: "none",
                  width: "fit-content",
                  position: "relative", // Necessário para ancorar a linha (::after) do hover
                  paddingBottom: "2px"
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* --- Coluna 3: informações de contato --- */}
        <div>
          <strong style={{ display: "block", marginBottom: 12, fontSize: 14, color: BRAND.yellow }}>Contato</strong>
          <p style={{ color: "#CFE6D7", fontSize: 14, margin: "4px 0" }}>{c.email}</p>
          <p style={{ color: "#CFE6D7", fontSize: 14, margin: "4px 0" }}>{c.address}</p>
        </div>
      </div>

      {/* Linha de copyright, com uma borda sutil separando do restante */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,.12)", padding: "16px 20px", textAlign: "center", fontSize: 12, color: "#9FC4AE" }}>
        © {new Date().getFullYear()} Semana das Engenharias UFABC — ufabc.edu.br
      </div>

      {/* Bloco de CSS puro: efeito de sublinhado animado dos links de
          navegação e a regra responsiva que empilha as colunas em telas
          estreitas. */}
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

          /* Em telas estreitas (até 760px), a grade de 3 colunas vira
             1 coluna só, empilhando os blocos verticalmente. */
          @media (max-width: 760px) {
            .footer-grid {
              grid-template-columns: 1fr !important;
            }
          }
        ` }} />
    </footer>
  );
}

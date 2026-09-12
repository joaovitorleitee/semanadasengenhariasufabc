"use client";
// Roda no navegador: usa estado (useState) e o hook de rota (usePathname)
// para saber em qual página o usuário está e destacar o link ativo.

import { useState } from "react"; // Guarda se o menu mobile está aberto ou fechado
import Link from "next/link"; // Componente de link do Next.js (navegação sem recarregar a página)
import { usePathname } from "next/navigation"; // Hook que retorna a URL atual
import { Menu, X, Lock } from "lucide-react"; // Ícones: hambúrguer, "X" de fechar, cadeado (Admin)
import { BRAND } from "@/lib/brand"; // Cores/tokens da marca (verde, amarelo, bordas etc.)
import Image from "next/image"; // Componente de imagem otimizada do Next.js (logo)
import ThemeToggle from "./ThemeToggle"; // Botão de alternância entre tema claro/escuro

// ============================================================================
// SiteHeader.js — Cabeçalho fixo exibido em todas as páginas públicas.
// Contém: logo + nome do evento, menu de navegação (desktop e mobile),
// botão de tema claro/escuro e o link para a área administrativa.
// ============================================================================

// Lista de links do menu principal. Cada item tem a URL (href) e o texto
// exibido (label). O menu desktop e o menu mobile são montados a partir
// desta MESMA lista, então para adicionar/remover uma página do menu
// basta editar este array — não precisa mexer em mais nenhum lugar.
const LINKS = [
  { href: "/", label: "Início" },
  { href: "/programacao", label: "Programação" },
  { href: "/evento", label: "O Evento" },
  { href: "/engenharias", label: "Engenharias" },
  { href: "/noticias", label: "Notícias" },
  { href: "/patrocinadores", label: "Patrocinadores" },
];

export default function SiteHeader() {
  // URL atual (ex: "/programacao"), usada para saber qual link do menu
  // deve aparecer destacado como "ativo" (fundo amarelo).
  const pathname = usePathname();

  // Controla se o menu mobile (lista vertical que abre em telas pequenas)
  // está visível. Começa fechado.
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // --------------------------------------------------------------------
    // <header>: barra fixa no topo da página (position: sticky + top: 0),
    // sempre visível ao rolar. Fundo e borda usam tokens que se adaptam ao
    // tema claro/escuro (ver globals.css e brand.js).
    // --------------------------------------------------------------------
    <header style={{ background: "var(--surface)", borderBottom: `4px solid ${BRAND.green}`, position: "sticky", top: 0, zIndex: 50 }}>

      {/* Container interno: centraliza o conteúdo (máx. 1180px) e organiza
          logo à esquerda, menu/botões à direita, usando flexbox. */}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>

        {/* ------------------------------------------------------------
            Bloco da logo: link para a home, com a imagem da logo e o
            nome do evento lado a lado.
           ------------------------------------------------------------ */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <Image
            src="/icones/logo.png" // Arquivo da logo dentro de /public/icones
            alt="Logo Semana das Engenharias" // Texto alternativo (acessibilidade/SEO)
            width={46}
            height={46}
            style={{ borderRadius: 8, objectFit: "contain" }} // Mantém a proporção da imagem, sem distorcer
            priority // Carrega com prioridade, pois aparece "acima da dobra" em toda página
          />
          <div style={{ textAlign: "left", lineHeight: 1.15 }}>
            {/* Nome do evento em destaque — cor adaptável ao tema (BRAND.heading) */}
            <strong style={{ display: "block", color: BRAND.heading, fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 15, letterSpacing: ".02em" }}>SEMANA DAS ENGENHARIAS</strong>
            {/* Subtítulo pequeno — cor de texto secundária (também adaptável) */}
            <span style={{ color: "var(--text-muted)", fontSize: 12 }}>UFABC · 2026</span>
          </div>
        </Link>

        {/* ------------------------------------------------------------
            Menu de navegação para telas grandes (desktop). Some em
            telas pequenas via CSS (classe "nav-desktop", ver media
            query no final do arquivo), dando lugar ao menu mobile.
           ------------------------------------------------------------ */}
        <nav style={{ alignItems: "center", gap: 4, display: "flex" }} className="nav-desktop">

          {/* Percorre a lista LINKS e cria um <Link> para cada página do menu */}
          {LINKS.map((l) => (
            <Link
              key={l.href} // Chave única exigida pelo React em listas
              href={l.href}
              className="nav-link" // Ativa o efeito de sublinhado animado no hover (CSS abaixo)
              style={{
                padding: "9px 16px", borderRadius: 6, textDecoration: "none",
                fontFamily: "var(--font-league-spartan), sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: ".02em",
                // Link da página atual: fundo amarelo. Os demais: fundo transparente.
                background: pathname === l.href ? BRAND.yellow : "transparent",
                // Ativo: verde-escuro fixo (alto contraste sobre o amarelo).
                // Inativo: cor de título adaptável ao tema (clara no escuro, escura no claro).
                color: pathname === l.href ? BRAND.greenDark : BRAND.heading,
                position: "relative" // Necessário para posicionar a linha (::after) do hover
              }}
            >
              {l.label}
            </Link>
          ))}

          {/* Botão de alternância de tema — fica ANTES do link "Admin",
              conforme pedido. */}
          <ThemeToggle style={{ marginLeft: 6 }} />

          {/* Link para a área administrativa (fica por último no menu) */}
          <Link
            href="/admin"
            className="btn-hover" // Efeito de "levantar" no hover (CSS abaixo)
            style={{ marginLeft: 6, padding: "9px 14px", borderRadius: 6, border: `1.5px solid ${BRAND.green}`, background: "var(--surface)", color: BRAND.accentText, fontWeight: 700, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}
          >
            <Lock size={14} /> Admin
          </Link>
        </nav>

        {/* ------------------------------------------------------------
            Grupo de botões exclusivo para telas pequenas (mobile):
            botão de tema + botão hambúrguer que abre/fecha o menu.
            Escondido em telas grandes; aparece via CSS (media query
            no final do arquivo) quando a tela é estreita.
           ------------------------------------------------------------ */}
        <div className="nav-toggle-group" style={{ display: "none", alignItems: "center", gap: 10 }}>
          {/* Mesmo botão de tema do menu desktop, reaproveitado aqui para
              ficar acessível sem precisar abrir o menu mobile. */}
          <ThemeToggle />
          {/* Botão hambúrguer: alterna menuOpen entre true/false a cada
              clique, usando o valor anterior (v) para inverter. */}
          <button className="nav-toggle" onClick={() => setMenuOpen((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: BRAND.heading }}>
            {/* Menu aberto: mostra "X" (fechar). Menu fechado: mostra ☰ (abrir). */}
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------
          Menu mobile expansível: só é renderizado quando menuOpen é
          true. Lista vertical de links, exibida abaixo do cabeçalho.
         ------------------------------------------------------------ */}
      {menuOpen && (
        <div className="nav-mobile" style={{ borderTop: `1px solid ${BRAND.border}`, background: "var(--surface)" }}>
          {/* Mesma lista LINKS, agora em formato de coluna */}
          {LINKS.map((l) => (
            <Link
              key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)} // Fecha o menu ao clicar em um link
              style={{
                display: "block", width: "100%", textAlign: "left", padding: "14px 20px",
                borderBottom: `1px solid ${BRAND.border}`,
                // Destaca com fundo amarelo-claro (adaptável ao tema) o link
                // da página em que o usuário já está.
                background: pathname === l.href ? "var(--nav-active-bg)" : "var(--surface)",
                color: BRAND.heading, // Cor de texto adaptável ao tema
                fontWeight: 700, fontFamily: "var(--font-league-spartan), sans-serif", textDecoration: "none"
              }}
            >
              {l.label}
            </Link>
          ))}
          {/* Link para a área administrativa, também disponível no menu mobile */}
          <Link
            href="/admin" onClick={() => setMenuOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", padding: "14px 20px", color: BRAND.accentText, fontWeight: 700, textDecoration: "none" }}
          >
            <Lock size={14} /> Área administrativa
          </Link>
        </div>
      )}

      {/* ------------------------------------------------------------
          Bloco de CSS "puro" injetado no HTML: aqui ficam os efeitos
          de hover e as media queries (regras que mudam o layout
          conforme o tamanho da tela) — coisas que não dá para fazer
          só com o "style" inline do React.
         ------------------------------------------------------------ */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Cria a "linha" verde que aparece embaixo do link ao passar o
           mouse. Começa com largura zero (scaleX(0) = invisível). */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 16px;
          right: 16px;
          height: 2px;
          background-color: ${BRAND.green};
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s ease-in-out;
        }

        /* Ao passar o mouse (.nav-link:hover), a linha cresce até a
           largura total (scaleX(1)), criando uma animação suave. */
        .nav-link:hover::after {
          transform: scaleX(1);
        }

        /* Efeito de hover do botão "Admin": escurece levemente, levanta
           o botão e adiciona uma sombra suave. */
        .btn-hover:hover {
          filter: brightness(0.95); /* Escurece levemente o botão */
          transform: translateY(-2px); /* Eleva o botão suavemente */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Adiciona uma sombra leve */
          transition: transform 0.25s ease-in-out;
        }

        /* Em telas largas (a partir de 861px): o menu mobile expansível
           fica sempre escondido — usamos o menu desktop. */
        @media (min-width: 861px) { .nav-mobile { display: none; } }

        /* Em telas estreitas (até 860px, celulares/tablets):
           - esconde o menu desktop (.nav-desktop)
           - mostra o grupo com botão de tema + hambúrguer (.nav-toggle-group) */
        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .nav-toggle-group { display: flex !important; }
        }
      `}} />
    </header>
  );
}

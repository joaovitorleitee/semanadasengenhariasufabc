"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink } from "lucide-react";
import { BRAND, INSCRICAO_URL } from "@/lib/brand";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/programacao", label: "Programação" },
  { href: "/evento", label: "O Evento" },
  { href: "/engenharias", label: "Engenharias" },
  { href: "/noticias", label: "Notícias" },
  { href: "/patrocinadores", label: "Patrocinadores" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        background: "var(--surface)",
        borderBottom: `4px solid ${BRAND.green}`,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Logo e Nome */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}
        >
          <Image
            src="/icones/logo2.png"
            alt="Logo Semana das Engenharias"
            width={44}
            height={44}
            style={{ borderRadius: 8, objectFit: "contain" }}
            priority
          />
          <div style={{ textAlign: "left", lineHeight: 1.15 }}>
            <strong
              style={{
                display: "block",
                color: BRAND.heading,
                fontFamily: "var(--font-league-spartan), sans-serif",
                fontSize: 15,
                letterSpacing: ".02em",
                whiteSpace: "nowrap",
              }}
            >
              SEMANA DAS ENGENHARIAS
            </strong>
            <span style={{ color: "var(--text-muted)", fontSize: 12 }}>
              UFABC · 2026
            </span>
          </div>
        </Link>

        {/* Menu Desktop */}
        <nav className="nav-desktop" style={{ alignItems: "center", gap: 4, display: "flex", flexShrink: 0 }}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link"
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                textDecoration: "none",
                fontFamily: "var(--font-league-spartan), sans-serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: ".02em",
                whiteSpace: "nowrap",
                background: pathname === l.href ? BRAND.yellow : "transparent",
                color: pathname === l.href ? BRAND.greenDark : BRAND.heading,
                position: "relative",
              }}
            >
              {l.label}
            </Link>
          ))}

          {/* Botão Inscreva-se forçado em uma linha só */}
          <Link
            href={INSCRICAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-inscricao-cta"
            style={{
              marginLeft: 6,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "9px 18px",
              borderRadius: 8,
              background: BRAND.yellow,
              color: BRAND.greenDark,
              fontFamily: "var(--font-league-spartan), sans-serif",
              fontWeight: 800,
              fontSize: 14,
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(234, 179, 8, 0.4)",
              transition: "all 0.2s ease-in-out",
            }}
          >
            Inscreva-se <ExternalLink size={15} style={{ flexShrink: 0 }} />
          </Link>

          <ThemeToggle style={{ marginLeft: 6 }} />
        </nav>

        {/* Botão Mobile */}
        <div className="nav-toggle-group" style={{ display: "none", alignItems: "center", gap: 12 }}>
          <ThemeToggle />
          <button
            className="nav-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", color: BRAND.heading }}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="nav-mobile" style={{ borderTop: `1px solid ${BRAND.border}`, background: "var(--surface)" }}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "16px 24px",
                borderBottom: `1px solid ${BRAND.border}`,
                background: pathname === l.href ? "var(--nav-active-bg)" : "var(--surface)",
                color: BRAND.heading,
                fontWeight: 700,
                fontSize: 15,
                fontFamily: "var(--font-league-spartan), sans-serif",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}

          <Link
            href={INSCRICAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: "calc(100% - 48px)",
              margin: "16px 24px",
              padding: "14px",
              borderRadius: 8,
              background: BRAND.yellow,
              color: BRAND.greenDark,
              fontWeight: 800,
              fontSize: 15,
              fontFamily: "var(--font-league-spartan), sans-serif",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Inscreva-se <ExternalLink size={16} />
          </Link>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 12px;
          right: 12px;
          height: 2px;
          background-color: ${BRAND.green};
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s ease-in-out;
        }

        .nav-link:hover::after {
          transform: scaleX(1);
        }

        .btn-inscricao-cta:hover {
          filter: brightness(1.05);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(234, 179, 8, 0.5) !important;
        }

        @media (min-width: 1081px) { .nav-mobile { display: none; } }

        @media (max-width: 1080px) {
          .nav-desktop { display: none !important; }
          .nav-toggle-group { display: flex !important; }
        }
      `,
        }}
      />
    </header>
  );
}
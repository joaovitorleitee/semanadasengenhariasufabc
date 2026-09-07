"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Lock } from "lucide-react";
import { BRAND } from "@/lib/brand";

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
    <header style={{ background: "#fff", borderBottom: `4px solid ${BRAND.green}`, position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div style={{ width: 46, height: 46, borderRadius: 8, background: BRAND.green, border: `2px solid ${BRAND.yellow}`, display: "grid", placeItems: "center", color: BRAND.yellow, fontFamily: "var(--font-league-spartan), sans-serif", fontWeight: 800, fontSize: 22 }}>
            U
          </div>
          <div style={{ textAlign: "left", lineHeight: 1.15 }}>
            <strong style={{ display: "block", color: BRAND.greenDark, fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 15, letterSpacing: ".02em" }}>SEMANA DAS ENGENHARIAS</strong>
            <span style={{ color: "#5c655e", fontSize: 12 }}>UFABC · 2026</span>
          </div>
        </Link>

        <nav style={{ alignItems: "center", gap: 4, display: "flex" }} className="nav-desktop">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link" // Adicionada a classe para controlar o hover
              style={{
                padding: "9px 16px", borderRadius: 6, textDecoration: "none",
                fontFamily: "var(--font-league-spartan), sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: ".02em",
                background: pathname === l.href ? BRAND.yellow : "transparent",
                color: BRAND.greenDark,
                position: "relative" // Necessário para posicionar a linha
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="btn-hover"
            style={{ marginLeft: 6, padding: "9px 14px", borderRadius: 6, border: `1.5px solid ${BRAND.green}`, background: "#fff", color: BRAND.green, fontWeight: 700, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}
          >
            <Lock size={14} /> Admin
          </Link>
        </nav>

        <button className="nav-toggle" onClick={() => setMenuOpen((v) => !v)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: BRAND.greenDark }}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {menuOpen && (
        <div className="nav-mobile" style={{ borderTop: `1px solid ${BRAND.border}`, background: "#fff" }}>
          {LINKS.map((l) => (
            <Link
              key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 20px", borderBottom: `1px solid ${BRAND.border}`, background: pathname === l.href ? "#FBF6DC" : "#fff", color: BRAND.greenDark, fontWeight: 700, fontFamily: "var(--font-league-spartan), sans-serif", textDecoration: "none" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/admin" onClick={() => setMenuOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", padding: "14px 20px", color: BRAND.green, fontWeight: 700, textDecoration: "none" }}
          >
            <Lock size={14} /> Área administrativa
          </Link>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        /* Configuração do pseudo-elemento para criar a linha inferior */
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

        /* Expande a linha ao passar o mouse */
        .nav-link:hover::after {
          transform: scaleX(1);
        }

        .btn-hover:hover {
          filter: brightness(0.95); /* Escurece levemente o botão */
          transform: translateY(-2px); /* Eleva o botão suavemente */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Adiciona uma sombra leve */
          transition: transform 0.25s ease-in-out;
        }

        @media (min-width: 861px) { .nav-mobile { display: none; } }
        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .nav-toggle { display: block !important; }
        }
      `}} />
    </header>
  );
}
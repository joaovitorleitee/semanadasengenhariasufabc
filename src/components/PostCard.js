"use client";

import Link from "next/link";
import { Newspaper } from "lucide-react"; // Ícone usado quando o post não tem imagem de capa
import { BRAND, fmtDate } from "@/lib/brand";

// ============================================================================
// PostCard.js — Cartão de uma notícia/post, usado dentro da grade em
// NoticiasSection.js. O cartão inteiro é um link para a página do post.
//
// MODO ESCURO: o fundo do cartão (antes "#fff" fixo) agora usa
// "var(--surface)", que é branco no tema claro e quase-preto no tema
// escuro. Os textos usam tokens adaptáveis (BRAND.accentText,
// BRAND.heading, var(--text-muted), var(--text-faint)) para manter contraste
// correto sobre esse fundo, seja qual for o tema.
// ============================================================================
export default function PostCard({ post }) {
  return (
    <Link
      href={`/noticias/${post.slug}`}
      className="noticia-hover" // Efeito de escala no hover, definido em NoticiasSection.js
      style={{ textAlign: "left", background: "var(--surface)", border: `1px solid ${BRAND.border}`, borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit"}}
    >
      {/* Imagem de capa: se o post tem "cover", usa a imagem; senão, mostra
          um gradiente verde da marca (fixo, funciona igual nos dois temas)
          com um ícone de jornal no centro. */}
      <div style={{ height: 150, background: post.cover ? `url(${post.cover}) center/cover` : `linear-gradient(135deg, ${BRAND.green}, ${BRAND.greenDark})`, display: "grid", placeItems: "center" }}>
        {!post.cover && <Newspaper color="rgba(255,255,255,.5)" size={34} />}
      </div>
      <div style={{ padding: 18 }}>
        {/* Categoria do post em maiúsculas (ex: "COMUNICADO") */}
        <span style={{ fontSize: 11, fontWeight: 800, color: BRAND.accentText, letterSpacing: ".04em" }}>{post.category?.toUpperCase()}</span>
        {/* Título do post */}
        <h3 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 17, color: BRAND.heading, margin: "8px 0" }}>{post.title}</h3>
        {/* Resumo/trecho do post */}
        <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{post.excerpt}</p>
        {/* Data de publicação, formatada por fmtDate() (ex: "23 set 2026") */}
        <span style={{ display: "block", marginTop: 14, fontSize: 12, color: "var(--text-faint)" }}>{fmtDate(post.created_at)}</span>
      </div>
    </Link>
  );
}

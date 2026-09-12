"use client";

import { Loader2 } from "lucide-react"; // Ícone giratório de "carregando"
import { BRAND } from "@/lib/brand";
import { usePosts } from "@/lib/usePosts"; // Hook que busca os posts publicados no Supabase
import PostCard from "./PostCard";

// ============================================================================
// NoticiasSection.js — Lista de notícias/posts publicados.
// Usada tanto na página "/noticias" (lista completa) quanto, em versão
// resumida (compact=true), na home (mostrando só os 3 mais recentes).
//
// MODO ESCURO: título, rótulo e mensagens de estado (carregando/erro/vazio)
// usam tokens adaptáveis (BRAND.accentText, BRAND.heading, var(--text-...),
// var(--error)) para continuarem legíveis nos dois temas — os cartões de
// post em si (PostCard.js) já cuidam da própria adaptação.
// ============================================================================
export default function NoticiasSection({ content, compact = false }) {
  // Busca os posts já publicados. "posts" começa como null (carregando),
  // depois vira a lista real (ou fica com erro preenchido em caso de falha).
  const { posts, error } = usePosts({ onlyPublished: true });

  // Na versão resumida (home), mostra só os 3 primeiros; na página cheia,
  // mostra todos.
  const list = compact ? (posts || []).slice(0, 3) : posts;

  const c = content.noticias; // Atalho para o conteúdo textual desta seção

  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: compact ? "10px 20px 70px" : "50px 20px 80px" }}>
      {/* Rótulo pequeno acima do título (ex: "ACOMPANHE") */}
      <span style={{ color: BRAND.accentText, fontWeight: 800, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif" }}>{c.eyebrow}</span>
      <h2 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 30, color: BRAND.heading, margin: "8px 0 26px" }}>{c.title}</h2>

      {/* Três estados possíveis, nesta ordem de prioridade:
          1) posts === null  → ainda carregando (mostra spinner)
          2) error           → falha ao buscar os posts (mostra mensagem de erro)
          3) list.length===0 → carregou, mas não há posts publicados ainda
          4) (senão)         → mostra a grade de cartões de post */}
      {posts === null ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)" }}><Loader2 className="spin" size={18} /> Carregando posts…</div>
      ) : error ? (
        <p style={{ color: "var(--error)" }}>{error}</p>
      ) : list.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>Ainda não há posts publicados. Assim que a organização publicar novidades, elas aparecem aqui.</p>
      ) : (
        // Grade de 3 colunas com um PostCard para cada post (ver media
        // queries abaixo para o comportamento em telas menores).
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="posts-grid">
          {list.map((p) => <PostCard key={p.id} post={p} className="noticia-hover"/>)}
        </div>
      )}

      <style>{`
        /* Efeito de hover nos cartões de notícia: aumenta levemente
           (scale) com uma transição suave. */
        .noticia-hover {
          transition: transform 0.25s ease-in-out;
          display: block; /* Garante que elementos inline respondam ao transform */
        }

        .noticia-hover:hover {
          transform: scale(1.04); /* Escala reduzida para um efeito mais elegante */
        }

        /* Responsividade da grade: 3 colunas no desktop, 2 em telas
           médias (até 900px) e 1 coluna em telas pequenas (até 620px). */
        @media (max-width: 900px){ .posts-grid{ grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 620px){ .posts-grid{ grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

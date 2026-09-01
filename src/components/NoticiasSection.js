"use client";

import { Loader2 } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { usePosts } from "@/lib/usePosts";
import PostCard from "./PostCard";

export default function NoticiasSection({ content, compact = false }) {
  const { posts, error } = usePosts({ onlyPublished: true });
  const list = compact ? (posts || []).slice(0, 3) : posts;
  const c = content.noticias;

  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: compact ? "10px 20px 70px" : "50px 20px 80px" }}>
      <span style={{ color: BRAND.green, fontWeight: 800, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif" }}>{c.eyebrow}</span>
      <h2 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 30, color: BRAND.greenDark, margin: "8px 0 26px" }}>{c.title}</h2>

      {posts === null ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#5c655e" }}><Loader2 className="spin" size={18} /> Carregando posts…</div>
      ) : error ? (
        <p style={{ color: "#B3261E" }}>{error}</p>
      ) : list.length === 0 ? (
        <p style={{ color: "#5c655e" }}>Ainda não há posts publicados. Assim que a organização publicar novidades, elas aparecem aqui.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="posts-grid">
          {list.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      )}
      <style>{`
        @media (max-width: 900px){ .posts-grid{ grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 620px){ .posts-grid{ grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Newspaper } from "lucide-react";
import { BRAND, fmtDate } from "@/lib/brand";

export default function PostCard({ post }) {
  return (
    <Link href={`/noticias/${post.slug}`} className="noticia-hover" style={{ textAlign: "left", background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit"}}>
      <div style={{ height: 150, background: post.cover ? `url(${post.cover}) center/cover` : `linear-gradient(135deg, ${BRAND.green}, ${BRAND.greenDark})`, display: "grid", placeItems: "center" }}>
        {!post.cover && <Newspaper color="rgba(255,255,255,.5)" size={34} />}
      </div>
      <div style={{ padding: 18 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: BRAND.green, letterSpacing: ".04em" }}>{post.category?.toUpperCase()}</span>
        <h3 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 17, color: BRAND.greenDark, margin: "8px 0" }}>{post.title}</h3>
        <p style={{ color: "#5c655e", fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{post.excerpt}</p>
        <span style={{ display: "block", marginTop: 14, fontSize: 12, color: "#8a938c" }}>{fmtDate(post.created_at)}</span>
      </div>
    </Link>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { BRAND, fmtDate } from "@/lib/brand";
import { supabase } from "@/lib/supabaseClient";
import PublicLayout from "@/components/PublicLayout";

export default function PostDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(undefined); // undefined = carregando, null = não encontrado

  useEffect(() => {
    let active = true;
    supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle()
      .then(({ data }) => { if (active) setPost(data || null); });
    return () => { active = false; };
  }, [slug]);

  return (
    <PublicLayout>
      {() => (
        <section style={{ maxWidth: 820, margin: "0 auto", padding: "50px 20px 90px" }}>
          <button onClick={() => router.push("/noticias")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: BRAND.green, fontWeight: 700, cursor: "pointer", marginBottom: 24, padding: 0 }}>
            <ArrowLeft size={16} /> Voltar para notícias
          </button>

          {post === undefined ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#5c655e" }}><Loader2 className="spin" size={18} /> Carregando…</div>
          ) : post === null ? (
            <p style={{ color: "#5c655e" }}>Post não encontrado ou ainda não publicado.</p>
          ) : (
            <>
              {post.cover && <img src={post.cover} alt="" style={{ width: "100%", maxHeight: 340, objectFit: "cover", borderRadius: 10, marginBottom: 24 }} />}
              <span style={{ fontSize: 12, fontWeight: 800, color: BRAND.green, letterSpacing: ".05em" }}>{post.category?.toUpperCase()} · {fmtDate(post.created_at)}</span>
              <h1 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: "clamp(26px, 4vw, 38px)", color: BRAND.greenDark, margin: "10px 0 22px" }}>{post.title}</h1>
              <div style={{ color: "#3d443f", fontSize: 16.5, lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{post.content}</div>
            </>
          )}
        </section>
      )}
    </PublicLayout>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // useParams lê o "slug" da URL; useRouter navega entre páginas
import { ArrowLeft, Loader2 } from "lucide-react";
import { BRAND, fmtDate } from "@/lib/brand";
import { supabase } from "@/lib/supabaseClient"; // Cliente do Supabase, usado para buscar o post direto no banco
import PublicLayout from "@/components/PublicLayout";

// ============================================================================
// page.js (src/app/noticias/[slug]/page.js) — Página de detalhe de um post
// específico. O "[slug]" na pasta indica que essa é uma rota dinâmica: a
// URL "/noticias/minha-noticia" faz slug = "minha-noticia".
//
// MODO ESCURO: título, rótulo e mensagens de estado usam tokens adaptáveis
// (BRAND.accentText, BRAND.heading, var(--text-muted), var(--text-soft))
// para manter contraste correto sobre o fundo da página, que muda entre
// os temas.
// ============================================================================
export default function PostDetailPage() {
  const { slug } = useParams(); // Pega o "slug" atual da URL
  const router = useRouter(); // Usado para voltar programaticamente para "/noticias"

  // Estado do post:
  //   undefined → ainda buscando no Supabase
  //   null      → busca terminou, mas não achou nenhum post publicado com esse slug
  //   objeto    → post encontrado, com todos os dados
  const [post, setPost] = useState(undefined);

  // Busca o post no Supabase sempre que o "slug" da URL mudar.
  useEffect(() => {
    let active = true; // Evita atualizar o estado se o componente já foi desmontado
    // (ex: usuário navegou para outra página antes da busca terminar)
    // enquanto a consulta ainda estava em andamento.
    supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published") // Só busca posts já publicados (rascunhos não aparecem aqui)
      .maybeSingle() // Espera 0 ou 1 resultado (não uma lista)
      .then(({ data }) => { if (active) setPost(data || null); });
    return () => { active = false; }; // Função de limpeza: roda ao desmontar/trocar de slug
  }, [slug]);

  return (
    // PublicLayout desenha o cabeçalho e rodapé ao redor deste conteúdo.
    <PublicLayout>
      {() => (
        <section style={{ maxWidth: 820, margin: "0 auto", padding: "50px 20px 90px" }}>
          {/* Botão "Voltar para notícias" — navega de volta para a listagem */}
          <button onClick={() => router.push("/noticias")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: BRAND.accentText, fontWeight: 700, cursor: "pointer", marginBottom: 24, padding: 0 }}>
            <ArrowLeft size={16} /> Voltar para notícias
          </button>

          {/* Três estados possíveis: carregando / não encontrado / post
              carregado com sucesso (mesmo padrão usado nas outras seções
              que buscam dados assíncronos). */}
          {post === undefined ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)" }}><Loader2 className="spin" size={18} /> Carregando…</div>
          ) : post === null ? (
            <p style={{ color: "var(--text-muted)" }}>Post não encontrado ou ainda não publicado.</p>
          ) : (
            <>
              {/* Imagem de capa, se o post tiver uma */}
              {post.cover && <img src={post.cover} alt="" style={{ width: "100%", maxHeight: 340, objectFit: "cover", borderRadius: 10, marginBottom: 24 }} />}
              {/* Categoria + data de publicação */}
              <span style={{ fontSize: 12, fontWeight: 800, color: BRAND.accentText, letterSpacing: ".05em" }}>{post.category?.toUpperCase()} · {fmtDate(post.created_at)}</span>
              {/* Título do post */}
              <h1 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: "clamp(26px, 4vw, 38px)", color: BRAND.heading, margin: "10px 0 22px" }}>{post.title}</h1>
              {/* Corpo do post. whiteSpace: "pre-wrap" preserva quebras de
                  linha digitadas no editor do painel admin. */}
              <div style={{ color: "var(--text-soft)", fontSize: 16.5, lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{post.content}</div>
            </>
          )}
        </section>
      )}
    </PublicLayout>
  );
}

"use client";

import PublicLayout from "@/components/PublicLayout";
import Hero from "@/components/Hero";
import EventoSection from "@/components/EventoSection";
import NoticiasSection from "@/components/NoticiasSection";
import Maps from "@/components/maps";
import { DEFAULT_CONTENT } from "@/lib/brand";

// ============================================================================
// page.js (src/app/page.js) — Página inicial (Home) do site.
// No Next.js App Router, o arquivo "page.js" dentro de uma pasta define a
// rota daquele caminho; este arquivo, na raiz de src/app, é a rota "/".
//
// Este componente não define nenhuma cor/estilo diretamente — ele só
// "monta" a página combinando as seções (Hero, EventoSection etc.), cada
// uma já responsável por sua própria adaptação ao tema claro/escuro.
// ============================================================================
export default function HomePage() {
  return (
    // PublicLayout desenha o cabeçalho (SiteHeader) e rodapé (SiteFooter)
    // ao redor do conteúdo, e busca o conteúdo salvo no Supabase (com
    // fallback em DEFAULT_CONTENT), repassando-o via "content" para a
    // função filha abaixo.
    <PublicLayout>
      {({ content }) => (
        <>
          {/* Hero recebe DEFAULT_CONTENT fixo (não o "content" vindo do
              Supabase) — ou seja, o topo da home sempre usa os textos
              padrão definidos em brand.js, independente do que estiver
              salvo no painel admin. */}
          <Hero content={DEFAULT_CONTENT} />
          {/* Seção "O Evento": usa o conteúdo real (Supabase + fallback) */}
          <EventoSection content={content} />
          {/* Lista resumida de notícias: "compact" limita a 3 posts */}
          <NoticiasSection content={content} compact />
          {/* Bloco de localização/mapa, no final da home */}
          <Maps/>
        </>
      )}
    </PublicLayout>
  );
}

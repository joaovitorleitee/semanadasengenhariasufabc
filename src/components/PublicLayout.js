"use client";

import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { useSiteContent } from "@/lib/useSiteContent"; // Hook que busca o conteúdo salvo no Supabase (com fallback em DEFAULT_CONTENT)

// ============================================================================
// PublicLayout.js — Estrutura comum a todas as páginas públicas do site:
// cabeçalho (SiteHeader) no topo, rodapé (SiteFooter) embaixo, e o conteúdo
// específico de cada página no meio ("children").
//
// Também é responsável por buscar o conteúdo textual do site UMA ÚNICA VEZ
// (useSiteContent) e compartilhá-lo entre cabeçalho, página e rodapé — em
// vez de cada um buscar separadamente no Supabase.
// ============================================================================
export default function PublicLayout({ children }) {
  // { content, ...outrosCampos } — o conteúdo salvo (títulos, textos etc.)
  // já mesclado com os valores padrão de DEFAULT_CONTENT.
  const contentStore = useSiteContent();

  return (
    <div style={{ minHeight: "100%" }}>
      <SiteHeader />
      {/* Se "children" foi passado como uma função (padrão usado pelas
          páginas deste site: `<PublicLayout>{({content}) => (...)}</PublicLayout>`),
          ela é chamada aqui, recebendo o contentStore — assim cada página
          decide quais campos do conteúdo usar. Se "children" for um
          elemento comum (não função), ele é renderizado direto. */}
      {typeof children === "function" ? children(contentStore) : children}
      <SiteFooter content={contentStore.content} />
    </div>
  );
}
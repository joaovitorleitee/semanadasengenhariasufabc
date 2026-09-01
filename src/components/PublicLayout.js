"use client";

import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { useSiteContent } from "@/lib/useSiteContent";

// Compartilha uma única leitura do site_content entre o cabeçalho, o
// conteúdo da página e o rodapé, via prop `content` passada ao children.
export default function PublicLayout({ children }) {
  const contentStore = useSiteContent();

  return (
    <div style={{ minHeight: "100%" }}>
      <SiteHeader />
      {typeof children === "function" ? children(contentStore) : children}
      <SiteFooter content={contentStore.content} />
    </div>
  );
}

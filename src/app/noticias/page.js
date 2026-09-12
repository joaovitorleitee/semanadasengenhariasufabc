"use client";

import PublicLayout from "@/components/PublicLayout";
import NoticiasSection from "@/components/NoticiasSection";

// Rota "/noticias": lista COMPLETA de posts publicados (sem o "compact"
// usado na home, que mostra só os 3 mais recentes).
export default function NoticiasPage() {
  return (
    <PublicLayout>
      {({ content }) => <NoticiasSection content={content} />}
    </PublicLayout>
  );
}

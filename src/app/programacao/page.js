"use client";

import PublicLayout from "@/components/PublicLayout";
import ProgramacaoSection from "@/components/ProgramacaoSection";

// Rota "/programacao": página dedicada à agenda completa de eventos, com
// filtros por engenharia e por nível.
export default function ProgramacaoPage() {
  return (
    <PublicLayout>
      {({ content }) => <ProgramacaoSection content={content} />}
    </PublicLayout>
  );
}

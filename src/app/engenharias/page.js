"use client";

import PublicLayout from "@/components/PublicLayout";
import EngenhariasSection from "@/components/EngenhariasSection";

// Rota "/engenharias": página dedicada, mostrando só a seção com o
// acordeão das 8 engenharias (mesmo componente usado, de forma resumida,
// em outras partes do site).
export default function EngenhariasPage() {
  return (
    <PublicLayout>
      {({ content }) => <EngenhariasSection content={content} />}
    </PublicLayout>
  );
}

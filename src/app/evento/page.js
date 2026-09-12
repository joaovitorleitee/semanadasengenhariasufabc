"use client";

import PublicLayout from "@/components/PublicLayout";
import EventoSection from "@/components/EventoSection";

// Rota "/evento": página dedicada à seção "O Evento" (texto explicativo +
// bloco de responsabilidade social).
export default function EventoPage() {
  return (
    <PublicLayout>
      {({ content }) => <EventoSection content={content} />}
    </PublicLayout>
  );
}

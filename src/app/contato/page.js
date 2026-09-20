"use client";

import PublicLayout from "@/components/PublicLayout";
import ContatoSection from "@/components/ContatoSection";

// Rota "/contato": página "Fale Conosco", com o link para o grupo do
// WhatsApp do evento.
export default function ContatoPage() {
  return (
    <PublicLayout>
      <ContatoSection />
    </PublicLayout>
  );
}

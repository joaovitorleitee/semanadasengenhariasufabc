"use client";

import PublicLayout from "@/components/PublicLayout";
import PatrocinadoresSection from "@/components/PatrocinadoresSection";

// Rota "/patrocinadores": página dedicada à lista de patrocinadores,
// agrupados por nível.
export default function PatrocinadoresPage() {
  return (
    <PublicLayout>
      {({ content }) => <PatrocinadoresSection content={content} />}
    </PublicLayout>
  );
}

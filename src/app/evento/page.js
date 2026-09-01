"use client";

import PublicLayout from "@/components/PublicLayout";
import EventoSection from "@/components/EventoSection";

export default function EventoPage() {
  return (
    <PublicLayout>
      {({ content }) => <EventoSection content={content} />}
    </PublicLayout>
  );
}

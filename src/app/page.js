"use client";

import PublicLayout from "@/components/PublicLayout";
import Hero from "@/components/Hero";
import EventoSection from "@/components/EventoSection";
import NoticiasSection from "@/components/NoticiasSection";

export default function HomePage() {
  return (
    <PublicLayout>
      {({ content }) => (
        <>
          <Hero content={content} />
          <EventoSection content={content} />
          <NoticiasSection content={content} compact />
        </>
      )}
    </PublicLayout>
  );
}

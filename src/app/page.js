"use client";

import PublicLayout from "@/components/PublicLayout";
import Hero from "@/components/Hero";
import EventoSection from "@/components/EventoSection";
import NoticiasSection from "@/components/NoticiasSection";
import Maps from "@/components/maps";
import { DEFAULT_CONTENT } from "@/lib/brand";

export default function HomePage() {
  return (
    <PublicLayout>
      {({ content }) => (
        <>
          <Hero content={DEFAULT_CONTENT} />
          <EventoSection content={content} />
          <NoticiasSection content={content} compact />
          <Maps/>
        </>
      )}
    </PublicLayout>
  );
}

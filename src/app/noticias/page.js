"use client";

import PublicLayout from "@/components/PublicLayout";
import NoticiasSection from "@/components/NoticiasSection";

export default function NoticiasPage() {
  return (
    <PublicLayout>
      {({ content }) => <NoticiasSection content={content} />}
    </PublicLayout>
  );
}

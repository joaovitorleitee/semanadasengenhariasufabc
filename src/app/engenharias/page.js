"use client";

import PublicLayout from "@/components/PublicLayout";
import EngenhariasSection from "@/components/EngenhariasSection";

export default function EngenhariasPage() {
  return (
    <PublicLayout>
      {({ content }) => <EngenhariasSection content={content} />}
    </PublicLayout>
  );
}

"use client";

import PublicLayout from "@/components/PublicLayout";
import ProgramacaoSection from "@/components/ProgramacaoSection";

export default function ProgramacaoPage() {
  return (
    <PublicLayout>
      {({ content }) => <ProgramacaoSection content={content} />}
    </PublicLayout>
  );
}

"use client";

import PublicLayout from "@/components/PublicLayout";
import PatrocinadoresSection from "@/components/PatrocinadoresSection";

export default function PatrocinadoresPage() {
  return (
    <PublicLayout>
      {({ content }) => <PatrocinadoresSection content={content} />}
    </PublicLayout>
  );
}

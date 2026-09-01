"use client";

import { Eye, EyeOff } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function StatusPill({ status }) {
  const published = status === "published";
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
        background: published ? "#E7F5EC" : "#F1F1F1",
        color: published ? BRAND.green : "#666",
        border: `1px solid ${published ? "#BFE3CC" : "#DADADA"}`,
      }}
    >
      {published ? <Eye size={12} /> : <EyeOff size={12} />}
      {published ? "Publicado" : "Rascunho"}
    </span>
  );
}

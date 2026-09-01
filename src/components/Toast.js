"use client";

import { useEffect } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function Toast({ message, kind = "success", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [onClose]);
  const good = kind === "success";
  return (
    <div
      style={{
        position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
        background: good ? BRAND.green : "#B3261E", color: "#fff",
        padding: "12px 18px", borderRadius: 10, display: "flex", alignItems: "center",
        gap: 8, fontSize: 14, fontWeight: 600, zIndex: 200, boxShadow: "0 8px 24px rgba(0,0,0,.25)",
      }}
    >
      {good ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      {message}
    </div>
  );
}

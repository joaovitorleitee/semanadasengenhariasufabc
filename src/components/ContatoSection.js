"use client";

import { MessageCircle, ExternalLink } from "lucide-react";
import { BRAND } from "@/lib/brand";

// Link do grupo oficial do WhatsApp da Semana das Engenharias UFABC 2026.
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/GLDM00ClNtN7FqZddmktB4";

// ============================================================================
// ContatoSection.js — Seção da página "/contato" ("Fale Conosco"): texto
// curto explicando como entrar em contato, mais um botão de destaque que
// leva direto para o grupo do WhatsApp do evento.
//
// Segue o mesmo padrão visual das outras seções (ver EventoSection.js):
// eyebrow + título usando BRAND.accentText/heading, texto em
// var(--text-softer) e um cartão com borda esquerda amarela.
// ============================================================================
export default function ContatoSection() {
  return (
    <section style={{ maxWidth: 780, margin: "0 auto", padding: "60px 20px 120px", textAlign: "center" }}>
      <span
        style={{
          color: BRAND.accentText,
          fontWeight: 800,
          fontSize: 13,
          fontFamily: "var(--font-league-spartan), sans-serif",
          letterSpacing: ".04em",
        }}
      >
        FALE CONOSCO
      </span>

      <h1
        style={{
          fontFamily: "var(--font-league-spartan), sans-serif",
          fontSize: 32,
          color: BRAND.heading,
          margin: "10px 0 18px",
        }}
      >
        Ficou com alguma dúvida?
      </h1>

      <p style={{ color: "var(--text-softer)", lineHeight: 1.7, fontSize: 16, maxWidth: 560, margin: "0 auto" }}>
        Para tirar dúvidas sobre inscrições, palestras, horários ou qualquer outra
        informação sobre a Semana das Engenharias UFABC 2026, entre no grupo
        oficial do WhatsApp do evento — nossa equipe está por lá para ajudar.
      </p>

      <div
        style={{
          background: BRAND.bg,
          border: `1px solid ${BRAND.border}`,
          borderLeft: `6px solid ${BRAND.yellow}`,
          borderRadius: 8,
          padding: 32,
          marginTop: 36,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: BRAND.green,
            color: BRAND.yellow,
            display: "grid",
            placeItems: "center",
          }}
        >
          <MessageCircle size={28} />
        </div>

        <div>
          <strong style={{ display: "block", color: BRAND.heading, fontSize: 16, marginBottom: 4 }}>
            Grupo oficial no WhatsApp
          </strong>
          <span style={{ color: "var(--text-soft)", fontSize: 14 }}>
            Respostas rápidas com a equipe organizadora
          </span>
        </div>

        <a
          href={WHATSAPP_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp-cta"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "13px 26px",
            borderRadius: 8,
            background: BRAND.yellow,
            color: BRAND.greenDark,
            fontFamily: "var(--font-league-spartan), sans-serif",
            fontWeight: 800,
            fontSize: 15,
            textDecoration: "none",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(234, 179, 8, 0.4)",
            transition: "all 0.2s ease-in-out",
          }}
        >
          Entrar no grupo do WhatsApp <ExternalLink size={16} style={{ flexShrink: 0 }} />
        </a>
      </div>

      <style>{`
        .btn-whatsapp-cta:hover {
          filter: brightness(1.05);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(234, 179, 8, 0.5) !important;
        }
      `}</style>
    </section>
  );
}

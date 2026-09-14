"use client";

import Link from "next/link";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { BRAND, INSCRICAO_URL } from "@/lib/brand";

export default function Hero({ content }) {
  const c = content.hero;

  return (
    <section
      style={{
        position: "relative",
        /* Gradiente principal mantendo a mescla perfeita com o corpo do site */
        background: BRAND.green,
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Container Dinâmico da Malha Mesh */}
      <div className="mesh-container">
        <div className="mesh-blob blob-1" />
        <div className="mesh-blob blob-2" />
        <div className="mesh-blob blob-3" />
        <div className="mesh-blob blob-4" />
      </div>

      {/* Conteúdo Principal */}
      <div
        className="hero-grid"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1180,
          margin: "0 auto",
          padding: "50px 20px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 32,
          alignItems: "center",
        }}
      >
        {/* Coluna Esquerda: Textos e Botões */}
        <div>
          <span
            style={{
              fontFamily: "var(--font-league-spartan), sans-serif",
              fontWeight: 800,
              color: BRAND.yellow,
              fontSize: 13,
              letterSpacing: ".08em",
            }}
          >
            {c.badge}
          </span>

          <h1
            style={{
              fontFamily: "var(--font-league-spartan), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 5vw, 54px)",
              lineHeight: 1.08,
              margin: "10px 0 18px",
            }}
          >
            {c.title}
          </h1>

          <p
            style={{
              fontSize: 17,
              color: "#DCEFE2",
              maxWidth: 560,
              lineHeight: 1.6,
            }}
          >
            {c.subtitle}
          </p>

          {/* Botões */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 28,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Link
              href={INSCRICAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hover btn-inscreva-pulse"
              style={{
                background: BRAND.yellow,
                color: BRAND.greenDark,
                border: "none",
                padding: "12px 22px",
                borderRadius: 6,
                fontWeight: 800,
                fontFamily: "var(--font-league-spartan), sans-serif",
                fontSize: 18,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s ease-in-out",
              }}
            >
              Inscreva-se <ExternalLink size={16} />
            </Link>

            <Link href="/engenharias" className="btn-hover btn-secondary">
              {c.ctaPrimary}
            </Link>

            <Link href="/noticias" className="btn-hover btn-secondary">
              {c.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Coluna Direita: Card de Data/Local com Glassmorphism */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            backdropFilter: "blur(14px)",
            borderRadius: 12,
            padding: 26,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              marginBottom: 18,
            }}
          >
            <Calendar size={20} color={BRAND.yellow} />
            <div>
              <strong style={{ display: "block", fontSize: 14 }}>Data</strong>
              <span style={{ fontSize: 14, color: "#CFE6D7" }}>{c.date}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <MapPin size={20} color={BRAND.yellow} />
            <div>
              <strong style={{ display: "block", fontSize: 14 }}>Local</strong>
              <span style={{ fontSize: 14, color: "#CFE6D7" }}>{c.local}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos CSS da Malha Mesh Dinâmica Corrigidos */}
      <style>{`
        .mesh-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .mesh-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.85;
          mix-blend-mode: screen;
        }

        /* Blob 1: Amarelo Vivaz topo/esquerda */
        .blob-1 {
          top: -10%;
          left: 10%;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, #FFD300 0%, transparent 70%);
          animation: float1 3.5s ease-in-out infinite alternate;
        }

        /* Blob 2: Verde Neon centro/direita */
        .blob-2 {
          top: 20%;
          right: -5%;
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, #009B01 0%, transparent 70%);
          animation: float2 4s ease-in-out infinite alternate;
        }

        /* Blob 3: Verde Esmeralda no fundo */
        .blob-3 {
          bottom: -10%;
          left: 25%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #009B01 0%, transparent 70%);
          animation: float3 5s ease-in-out infinite alternate;
        }

        /* Blob 4: Amarelo Secundário */
        .blob-4 {
          top: 40%;
          left: -5%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #FFD300 0%, transparent 70%);
          animation: float4 3.8s ease-in-out infinite alternate;
        }

        /* Keyframes de Movimento Dinâmico */
        @keyframes float1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(120px, 60px) scale(1.25); }
          100% { transform: translate(-40px, 90px) scale(0.9); }
        }

        @keyframes float2 {
          0% { transform: translate(0, 0) scale(1.1); }
          50% { transform: translate(-140px, -50px) scale(0.85); }
          100% { transform: translate(-60px, 80px) scale(1.2); }
        }

        @keyframes float3 {
          0% { transform: translate(0, 0) scale(0.9); }
          50% { transform: translate(-90px, -80px) scale(1.3); }
          100% { transform: translate(70px, -40px) scale(1); }
        }

        @keyframes float4 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(100px, -60px) scale(1.15); }
          100% { transform: translate(40px, 50px) scale(0.85); }
        }

        .btn-secondary {
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          padding: 12px 20px;
          border-radius: 6px;
          font-family: var(--font-league-spartan), sans-serif;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          backdrop-filter: blur(8px);
          display: inline-flex;
          align-items: center;
          transition: all 0.2s ease;
        }

        .btn-hover:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .btn-inscreva-pulse {
          animation: pulseInscreva 2.2s ease-in-out infinite;
        }

        @keyframes pulseInscreva {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 211, 0, 0.55); }
          50% { box-shadow: 0 0 0 10px rgba(255, 211, 0, 0); }
        }

        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding-bottom: 60px !important;
          }
        }
      `}</style>
    </section>
  );
}
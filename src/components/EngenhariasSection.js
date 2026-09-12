"use client";

import { useState } from "react";
import Image from "next/image"; // Componente de imagem otimizada do Next.js (ícones de cada engenharia)
import { ChevronDown, ChevronUp, UserCheck, Briefcase } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { motion, AnimatePresence } from "framer-motion"; // Biblioteca de animação (abre/fecha o painel suavemente)

// ============================================================================
// EngenhariasSection.js — Seção "acordeão" com as 8 engenharias da UFABC:
// clicando em uma, expande um painel com o perfil do curso e as áreas de
// atuação do profissional formado.
//
// MODO ESCURO: fundo dos itens (antes "#fff"/"#fafbfa" fixos) agora usa
// "var(--surface)"/"var(--surface-alt)"; textos usam tokens adaptáveis
// (BRAND.heading, BRAND.accentText, var(--text-muted), var(--text-soft)).
// O quadradinho numerado (fundo verde + número amarelo) continua com cores
// fixas, pois é um elemento decorativo, não texto corrido.
// ============================================================================
export default function EngenhariasSection({ content }) {
  const list = content.engenharias; // As 8 engenharias, vindas do conteúdo (Supabase + fallback)

  // Guarda qual engenharia está expandida no momento (pelo número "n").
  // Começa com a primeira da lista já aberta.
  const [open, setOpen] = useState(list[0]?.n);

  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "20px 20px 70px" }}>
      {/* Rótulo pequeno acima do título */}
      <span style={{ color: BRAND.accentText, fontWeight: 800, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif" }}>CURSOS</span>
      <h2 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 30, color: BRAND.heading, margin: "8px 0 6px" }}>As oito engenharias da UFABC</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: 26 }}>Selecione um curso para ver o perfil e as áreas de atuação do profissional formado.</p>

      {/* Percorre a lista de engenharias, criando um item de acordeão para
          cada uma. "index" é usado para montar o caminho do ícone
          (engenharia-1.png, engenharia-2.png, ...). */}
      {list.map((e, index) => {
            const isOpen = open === e.n; // Esta engenharia está expandida?
            return (
              <div key={e.n} style={{ border: `1px solid ${BRAND.border}`, borderRadius: 8, marginBottom: 12, overflow: "hidden", background: "var(--surface)" }}>

                {/* Cabeçalho clicável do item: número, ícone, nome+campus e seta */}
                <button
                  onClick={() => setOpen(isOpen ? null : e.n)} // Clicar na já aberta fecha; senão, abre esta
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 18, padding: "16px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  {/* Quadradinho com o número da engenharia (ex: "01") —
                      cores fixas (fundo verde, texto amarelo), decorativo. */}
                  <span style={{ width: 40, height: 40, minWidth: 40, borderRadius: 6, background: BRAND.green, color: BRAND.yellow, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13 }}>{e.n}</span>

                  {/* Ícone dinâmico apontando diretamente para
                      public/icones/engenharia-1.png até engenharia-8.png */}
                  <div style={{ width: 32, height: 32, position: "relative", flexShrink: 0 }}>
                    <Image
                      src={`/icones/engenharia-${index + 1}.png`}
                      alt={`Ícone ${e.nome}`}
                      width={32}
                      height={32}
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  {/* Nome da engenharia + campus */}
                  <span style={{ flex: 1 }}>
                    <strong style={{ display: "block", color: BRAND.heading, fontSize: 16, fontFamily: "var(--font-league-spartan), sans-serif" }}>{e.nome}</strong>
                    <span style={{ color: "var(--text-muted)", fontSize: 12 }}>Campus {e.campus}</span>
                  </span>
                  {/* Seta indicando se o painel está aberto (para cima) ou
                      fechado (para baixo) */}
                  {isOpen ? <ChevronUp color={BRAND.accentText} /> : <ChevronDown color={BRAND.accentText} />}
            </button>

            {/* AnimatePresence + motion.div (framer-motion): anima a
                abertura/fechamento do painel de detalhes, variando a
                altura (height) e a opacidade suavemente. */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  {/* Painel de detalhes: duas colunas — perfil do curso e
                      áreas de atuação (empilha em telas estreitas, ver
                      media query no final do componente). */}
                  <div
                    style={{
                      borderTop: `1px solid ${BRAND.border}`,
                      background: "var(--surface-alt)",
                      padding: "22px 24px 26px 80px",
                      display: "grid",
                      gridTemplateColumns: ".8fr 1.2fr",
                      gap: 40
                    }}
                    className="curso-grid"
                  >
                    {/* Coluna: perfil do curso (lista de bullets) */}
                    <div>
                      <h4 style={{ color: BRAND.heading, margin: "0 0 10px", fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                        <UserCheck size={18} color={BRAND.accentText} />
                        Perfil do curso
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-soft)", fontSize: 14, lineHeight: 1.7 }}>
                        {e.perfil.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                    {/* Coluna: áreas de atuação (lista numerada) */}
                    <div>
                      <h4 style={{ color: BRAND.heading, margin: "0 0 10px", fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                        <Briefcase size={18} color={BRAND.accentText} />
                        Áreas de atuação
                      </h4>
                      <ol style={{ margin: 0, paddingLeft: 18, color: "var(--text-soft)", fontSize: 14, lineHeight: 1.7 }}>
                        {e.areas.map((a, i) => <li key={i}>{a}</li>)}
                      </ol>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Em telas estreitas (até 700px), as duas colunas do painel viram
          uma só, e reduz o recuo esquerdo (que existia para alinhar com o
          ícone/número do cabeçalho). */}
      <style>{`@media (max-width: 700px){ .curso-grid{ grid-template-columns: 1fr !important; padding-left: 24px !important; } }`}</style>
    </section>
  );
}

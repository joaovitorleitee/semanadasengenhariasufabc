"use client";

import { useState } from "react";
import Image from "next/image"; // Importante para otimização no Next.js
import { ChevronDown, ChevronUp, UserCheck, Briefcase } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { motion, AnimatePresence } from "framer-motion";

export default function EngenhariasSection({ content }) {
  const list = content.engenharias;
  const [open, setOpen] = useState(list[0]?.n);

  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "20px 20px 70px" }}>
      <span style={{ color: BRAND.green, fontWeight: 800, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif" }}>CURSOS</span>
      <h2 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 30, color: BRAND.greenDark, margin: "8px 0 6px" }}>As oito engenharias da UFABC</h2>
      <p style={{ color: "#5c655e", marginBottom: 26 }}>Selecione um curso para ver o perfil e as áreas de atuação do profissional formado.</p>

      {list.map((e, index) => {
            const isOpen = open === e.n;
            return (
              <div key={e.n} style={{ border: `1px solid ${BRAND.border}`, borderRadius: 8, marginBottom: 12, overflow: "hidden", background: "#fff" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : e.n)}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 18, padding: "16px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ width: 40, height: 40, minWidth: 40, borderRadius: 6, background: BRAND.green, color: BRAND.yellow, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13 }}>{e.n}</span>
                  
                  {/* Ícone dinâmico apontando diretamente para public/icones/engenharia-1.png até 8 */}
                  <div style={{ width: 32, height: 32, position: "relative", flexShrink: 0 }}>
                    <Image
                      src={`/icones/engenharia-${index + 1}.png`} 
                      alt={`Ícone ${e.nome}`}
                      width={32}
                      height={32}
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  <span style={{ flex: 1 }}>
                    <strong style={{ display: "block", color: BRAND.greenDark, fontSize: 16, fontFamily: "var(--font-league-spartan), sans-serif" }}>{e.nome}</strong>
                    <span style={{ color: "#5c655e", fontSize: 12 }}>Campus {e.campus}</span>
                  </span>
                  {isOpen ? <ChevronUp color={BRAND.green} /> : <ChevronDown color={BRAND.green} />}
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div 
                    style={{ 
                      borderTop: `1px solid ${BRAND.border}`, 
                      background: "#fafbfa", 
                      padding: "22px 24px 26px 80px", 
                      display: "grid", 
                      gridTemplateColumns: ".8fr 1.2fr", 
                      gap: 40 
                    }} 
                    className="curso-grid"
                  >
                    <div>
                      <h4 style={{ color: BRAND.greenDark, margin: "0 0 10px", fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                        <UserCheck size={18} color={BRAND.green} />
                        Perfil do curso
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: 18, color: "#3d443f", fontSize: 14, lineHeight: 1.7 }}>
                        {e.perfil.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 style={{ color: BRAND.greenDark, margin: "0 0 10px", fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                        <Briefcase size={18} color={BRAND.green} />
                        Áreas de atuação
                      </h4>
                      <ol style={{ margin: 0, paddingLeft: 18, color: "#3d443f", fontSize: 14, lineHeight: 1.7 }}>
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
      <style>{`@media (max-width: 700px){ .curso-grid{ grid-template-columns: 1fr !important; padding-left: 24px !important; } }`}</style>
    </section>
  );
}
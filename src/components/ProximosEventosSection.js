"use client";

// ============================================================================
// ProximosEventosSection.js — Bloco de destaque na Home com os próximos
// eventos da Programação (palestras, minicursos etc.), para quem só entra na
// página inicial também descobrir que essa parte do site existe.
//
// Não substitui a página completa /programacao — é só uma "vitrine" com os
// eventos mais próximos, sempre com um botão levando para a lista inteira.
//
// MODO ESCURO: usa os mesmos tokens (BRAND.*, var(--...)) já usados no
// restante do site, então já nasce compatível com os dois temas.
// ============================================================================

import { useMemo } from "react";
import Link from "next/link";
import { CalendarDays, Clock, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { BRAND, EVENT_CATEGORY_COLORS, fmtTime, fmtDateRange } from "@/lib/brand";
import { useEventos } from "@/lib/useEventos";

// Quantos eventos mostrar no máximo na vitrine da home.
const MAX_EVENTOS = 4;

function CategoryPill({ categoria }) {
  const c = EVENT_CATEGORY_COLORS[categoria] || EVENT_CATEGORY_COLORS["Outro"];
  return (
    <span style={{ fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: 999, background: c.bg, color: c.fg, border: `1px solid ${c.border}`, letterSpacing: ".02em" }}>
      {categoria}
    </span>
  );
}

// Cartão compacto de um evento — versão resumida do card usado em
// ProgramacaoSection.js, só com o essencial (não repete descrição/vagas/
// patrocinador aqui, pois é uma prévia, não a página completa).
function EventoMiniCard({ ev }) {
  return (
    <div
      style={{
        background: "var(--surface)", border: `1px solid ${BRAND.border}`, borderRadius: 12,
        padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8,
        // height: "100%" garante que o card ocupe toda a altura da célula
        // do grid (que já fica igual entre os 4 cards, do tamanho do mais
        // alto). Sem isso, cards com menos conteúdo "encolhiam" e o botão
        // de cada um ficava numa altura diferente — a causa do desalinhamento.
        height: "100%",
        transition: "box-shadow .15s, transform .15s",
      }}
      className="proximo-evento-card"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <CategoryPill categoria={ev.categoria} />
        {ev.data_inicio && (
          <span style={{ fontSize: 11.5, fontWeight: 700, color: BRAND.accentText, whiteSpace: "nowrap" }}>
            {fmtDateRange(ev.data_inicio, ev.data_fim)}
          </span>
        )}
      </div>

      <h3 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 15.5, color: BRAND.heading, margin: 0, lineHeight: 1.3 }}>
        {ev.titulo}
      </h3>

      <div style={{ display: "grid", gap: 5, marginTop: 2 }}>
        {ev.horario_inicio && (
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "var(--text-soft)" }}>
            <Clock size={13} color={BRAND.accentText} />
            <span>{fmtTime(ev.horario_inicio)}{ev.horario_fim ? ` – ${fmtTime(ev.horario_fim)}` : ""}</span>
          </div>
        )}
        {ev.local && (
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "var(--text-soft)" }}>
            <MapPin size={13} color={BRAND.accentText} /> <span>{ev.local}</span>
          </div>
        )}
      </div>

      {/* Mesmo botão "Inscreva-se" da página /programacao — sem ele, a
          vitrine da home só mostrava a informação mas não deixava a pessoa
          já se inscrever com um clique, obrigando a ir até a página
          completa por nada. Só aparece se o evento tiver link cadastrado.
          marginTop: "auto" gruda o botão sempre no rodapé do card, na MESMA
          altura em todos os cards da fileira — independente de quanto
          texto cada um tem acima (título mais curto/longo, com ou sem
          local etc.). */}
      {ev.link_inscricao && (
        <a
          href={ev.link_inscricao} target="_blank" rel="noopener noreferrer"
          style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: BRAND.green, color: "#fff", borderRadius: 6, padding: "8px 12px", fontSize: 12.5, fontWeight: 700, textDecoration: "none" }}
        >
          Inscreva-se <ExternalLink size={12} />
        </a>
      )}

      <style>{`.proximo-evento-card:hover{ box-shadow: 0 10px 22px rgba(0,89,59,.10); transform: translateY(-2px); }`}</style>
    </div>
  );
}

export default function ProximosEventosSection() {
  // Reaproveita o mesmo hook da página /programacao — só eventos publicados.
  const { eventos } = useEventos({ onlyPublished: true });

  // Seleciona os próximos eventos: ignora os que já terminaram (data_fim ou
  // data_inicio antes de hoje) e pega os MAX_EVENTOS mais próximos. Eventos
  // sem data cadastrada (ainda em rascunho de informação) entram no fim da
  // lista, para não "furar a fila" de quem já tem data marcada.
  const proximos = useMemo(() => {
    if (!eventos) return null;
    const hojeISO = new Date().toISOString().slice(0, 10);
    return eventos
      .filter((e) => !e.data_inicio || (e.data_fim || e.data_inicio) >= hojeISO)
      .sort((a, b) => {
        if (!a.data_inicio) return 1;
        if (!b.data_inicio) return -1;
        const da = a.data_inicio + (a.horario_inicio || "");
        const db = b.data_inicio + (b.horario_inicio || "");
        return da < db ? -1 : da > db ? 1 : 0;
      })
      .slice(0, MAX_EVENTOS);
  }, [eventos]);

  // Enquanto carrega ou se não há nenhum evento próximo publicado, a seção
  // simplesmente não aparece na home — evita um bloco vazio/"em breve" antes
  // de a organização começar a cadastrar a programação de verdade.
  if (!proximos || proximos.length === 0) return null;

  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
        <div>
          <span style={{ color: BRAND.accentText, fontWeight: 800, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif" }}>PROGRAMAÇÃO</span>
          <h2 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 26, color: BRAND.heading, margin: "6px 0 0" }}>
            Próximos eventos
          </h2>
        </div>
        <Link
          href="/programacao"
          style={{ display: "flex", alignItems: "center", gap: 6, color: BRAND.accentText, fontWeight: 700, fontSize: 13.5, textDecoration: "none" }}
        >
          Ver programação completa <ArrowRight size={15} />
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14, alignItems: "stretch" }}>
        {proximos.map((ev) => <EventoMiniCard key={ev.id} ev={ev} />)}
      </div>
    </section>
  );
}

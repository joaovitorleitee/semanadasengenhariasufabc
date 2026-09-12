"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock, MapPin, User, Layers, Users, ExternalLink } from "lucide-react";
import { BRAND, EVENT_CATEGORY_COLORS, EVENT_LEVELS, fmtTime, fmtDateRange } from "@/lib/brand";
import { useEventos } from "@/lib/useEventos"; // Hook que busca os eventos da agenda no Supabase
import { useSponsors } from "@/lib/useSponsors"; // Hook que busca os patrocinadores (para exibir no card do evento)

// ============================================================================
// CategoryPill — Selo colorido com o nome da categoria do evento (ex:
// "Palestra", "Workshop"). A cor vem de EVENT_CATEGORY_COLORS (brand.js),
// que já usa variáveis CSS adaptáveis ao tema claro/escuro — por isso este
// componente não precisa de nenhuma lógica extra para o modo escuro.
// ============================================================================
function CategoryPill({ categoria }) {
  const c = EVENT_CATEGORY_COLORS[categoria] || EVENT_CATEGORY_COLORS["Outro"];
  return (
    <span style={{ fontSize: 11.5, fontWeight: 800, padding: "3px 10px", borderRadius: 999, background: c.bg, color: c.fg, border: `1px solid ${c.border}`, letterSpacing: ".02em" }}>
      {categoria}
    </span>
  );
}

// ============================================================================
// EventCard — Cartão de um evento da programação: categoria, data, título,
// descrição, patrocinador (se houver), palestrante/horário/local/vagas e um
// botão de inscrição (se houver link).
//
// MODO ESCURO: fundo do cartão (antes "#fff") agora usa "var(--surface)";
// textos usam tokens adaptáveis (BRAND.heading, BRAND.accentText,
// var(--text-muted), var(--text-soft)) para manter contraste nos dois temas.
// O botão "Inscreva-se" continua com fundo verde fixo (BRAND.green) — é um
// elemento decorativo/de ação, não texto corrido, então mantém a cor cheia
// da marca conforme pedido.
// ============================================================================
function EventCard({ ev, sponsor }) {
  return (
    <div
      style={{
        background: "var(--surface)", border: `1px solid ${BRAND.border}`, borderRadius: 12, overflow: "hidden",
        display: "flex", flexDirection: "column", transition: "box-shadow .15s, transform .15s",
      }}
      className="evento-card" // Efeito de hover (sombra + leve elevação), CSS no final do componente
    >
      {/* Imagem do evento, se cadastrada */}
      {ev.imagem_url && (
        <div style={{ height: 140, background: `${BRAND.bg}` }}>
          <img src={ev.imagem_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      )}
      <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {/* Linha superior: selo de categoria + data (alinhados nas pontas) */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
          <CategoryPill categoria={ev.categoria} />
          {ev.data_inicio && (
            <span style={{ fontSize: 12, fontWeight: 700, color: BRAND.accentText, whiteSpace: "nowrap" }}>
              {fmtDateRange(ev.data_inicio, ev.data_fim)}
            </span>
          )}
        </div>

        {/* Título do evento */}
        <h3 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 17, color: BRAND.heading, margin: 0, lineHeight: 1.3 }}>
          {ev.titulo}
        </h3>

        {/* Descrição (opcional) */}
        {ev.descricao && (
          <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.55, margin: 0 }}>{ev.descricao}</p>
        )}

        {/* Patrocinador do evento (opcional): mostra logo + nome */}
        {sponsor && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: BRAND.bg, borderRadius: 8, padding: "6px 10px" }}>
            {sponsor.logo_url ? (
              <img src={sponsor.logo_url} alt={sponsor.name} style={{ height: 20, maxWidth: 70, objectFit: "contain" }} />
            ) : null}
            <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>Com <strong style={{ color: BRAND.heading }}>{sponsor.name}</strong></span>
          </div>
        )}

        {/* Bloco de detalhes: palestrante, horário, local, vagas — cada um
            só aparece se o dado existir. marginTop: "auto" empurra este
            bloco para o fim do cartão, mesmo com descrições de tamanhos
            diferentes entre cartões vizinhos. */}
        <div style={{ marginTop: "auto", paddingTop: 8, display: "grid", gap: 6, borderTop: `1px dashed ${BRAND.border}` }}>
          {ev.palestrante && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-soft)" }}>
              <User size={14} color={BRAND.accentText} /> <span>{ev.palestrante}</span>
            </div>
          )}
          {ev.horario_inicio && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-soft)" }}>
              <Clock size={14} color={BRAND.accentText} />
              <span>{fmtTime(ev.horario_inicio)}{ev.horario_fim ? ` – ${fmtTime(ev.horario_fim)}` : ""}</span>
            </div>
          )}
          {ev.local && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-soft)" }}>
              <MapPin size={14} color={BRAND.accentText} /> <span>{ev.local}</span>
            </div>
          )}
          {ev.vagas != null && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-soft)" }}>
              <Users size={14} color={BRAND.accentText} /> <span>{ev.vagas} vaga{ev.vagas === 1 ? "" : "s"}</span>
            </div>
          )}
        </div>

        {/* Botão de inscrição (só aparece se houver link cadastrado) */}
        {ev.link_inscricao && (
          <a
            href={ev.link_inscricao} target="_blank" rel="noopener noreferrer"
            style={{ marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: BRAND.green, color: "#fff", borderRadius: 6, padding: "9px 12px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}
          >
            Inscreva-se <ExternalLink size={13} />
          </a>
        )}
      </div>
      {/* Efeito de hover do cartão: sombra esverdeada + leve elevação */}
      <style>{`.evento-card:hover{ box-shadow: 0 10px 24px rgba(0,89,59,.10); transform: translateY(-2px); }`}</style>
    </div>
  );
}

// ============================================================================
// ProgramacaoSection.js — Seção principal da Programação: filtros (por
// engenharia e por nível) + grade de EventCard com os eventos filtrados.
// ============================================================================
export default function ProgramacaoSection({ content }) {
  const engenharias = content.engenharias; // Lista das 8 engenharias (para montar as abas)

  // Busca os eventos publicados e os patrocinadores ativos no Supabase.
  const { eventos, error } = useEventos({ onlyPublished: true });
  const { sponsors } = useSponsors({ onlyActive: true });

  // Aba de engenharia selecionada: "todos", "geral" (eventos sem engenharia
  // específica) ou o número da engenharia (ex: "01").
  const [tab, setTab] = useState("todos");
  // Filtro de nível selecionado: "todos", "Graduação", "Pós-Graduação" ou "Geral".
  const [filtroNivel, setFiltroNivel] = useState("todos");

  // Monta um "dicionário" { id_do_patrocinador: dadosDoPatrocinador } para
  // conseguir achar rapidamente o patrocinador de cada evento pelo ID.
  // useMemo evita recalcular esse dicionário a cada renderização — só
  // refaz quando a lista de patrocinadores muda.
  const sponsorById = useMemo(() => {
    const map = {};
    (sponsors || []).forEach((s) => { map[s.id] = s; });
    return map;
  }, [sponsors]);

  // Monta a lista de abas de engenharia: "Todos", "Geral" + uma aba para
  // cada engenharia cadastrada.
  const tabs = useMemo(
    () => [
      { id: "todos", label: "Todos", n: null },
      { id: "geral", label: "Geral", n: null },
      ...engenharias.map((e) => ({ id: e.n, label: e.nome, n: e.n })),
    ],
    [engenharias]
  );

  // Lista de eventos já filtrada pela aba de engenharia + pelo nível
  // selecionado. Recalculada sempre que eventos, tab, filtroNivel ou
  // engenharias mudam.
  const filtrados = useMemo(() => {
    if (!eventos) return [];

    return eventos.filter((e) => {
      // 1. Filtro por Engenharia
      let bateEngenharia = true;
      if (tab === "geral") {
        bateEngenharia = !e.engenharia_n; // "Geral" = eventos sem engenharia associada
      } else if (tab !== "todos") {
        const engObj = engenharias.find((eng) => String(eng.n) === String(tab));
        const val = e.engenharia_n ? String(e.engenharia_n).trim() : "";
        // Aceita tanto o número da engenharia quanto o nome completo
        // (compatibilidade com eventos cadastrados de formas diferentes).
        bateEngenharia = val === String(tab) || (engObj && val === engObj.nome);
      }

      // 2. Filtro por Nível — se o evento não tem "nivel" definido
      // explicitamente, tenta adivinhar pelo texto (título/categoria/
      // descrição contendo "pós"/"pos"), assumindo Graduação como padrão.
      const textoCompleto = `${e.titulo || ""} ${e.categoria || ""} ${e.descricao || ""}`.toLowerCase();
      const ehPos = textoCompleto.includes("pós") || textoCompleto.includes("pos");
      const nivelDoEvento = e.nivel ? e.nivel : (ehPos ? "Pós-Graduação" : "Graduação");

      const bateNivel = filtroNivel === "todos" || nivelDoEvento === filtroNivel;

      return bateEngenharia && bateNivel;
    });
  }, [eventos, tab, filtroNivel, engenharias]);

  // Conta quantos eventos existem por aba (para mostrar o número entre
  // parênteses ao lado do nome da aba, ex: "Todos (24)").
  const contagemPorTab = useMemo(() => {
    const map = {};
    (eventos || []).forEach((e) => {
      const key = e.engenharia_n ? String(e.engenharia_n).trim() : "geral";
      map[key] = (map[key] || 0) + 1;
    });
    return map;
  }, [eventos]);

  // Abas de nível: "Todos os níveis" + uma aba para cada valor de EVENT_LEVELS.
  const niveisTabs = [
    { id: "todos", label: "Todos os níveis" },
    ...EVENT_LEVELS.map((n) => ({ id: n, label: n }))
  ];

  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "20px 20px 80px" }}>
      {/* Rótulo pequeno acima do título */}
      <span style={{ color: BRAND.accentText, fontWeight: 800, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif" }}>PROGRAMAÇÃO</span>
      <h2 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 30, color: BRAND.heading, margin: "8px 0 6px" }}>
        Palestras, minicursos e eventos por engenharia
      </h2>
      <p style={{ color: "var(--text-muted)", marginBottom: 26, maxWidth: 680 }}>
        Escolha uma engenharia para ver só a programação dela, ou veja tudo em um só lugar.
      </p>

      {/* ---------------------------------------------------------------
          Abas por Engenharia: "Todos", "Geral" e uma por engenharia.
          A aba ativa fica com fundo verde sólido (fixo); as inativas usam
          fundo/texto adaptáveis ao tema.
         --------------------------------------------------------------- */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }} className="prog-tabs">
        {tabs.map((t) => {
          const active = tab === t.id;
          // Número de eventos desta aba, para mostrar entre parênteses
          const count = t.id === "todos" ? (eventos || []).length : contagemPorTab[t.id === "geral" ? "geral" : t.n] || 0;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "9px 15px", borderRadius: 999, cursor: "pointer",
                border: `1.5px solid ${active ? BRAND.green : BRAND.border}`,
                // Ativa: fundo verde sólido fixo. Inativa: fundo de
                // superfície adaptável ao tema.
                background: active ? BRAND.green : "var(--surface)",
                // Ativa: texto branco (alto contraste sobre o verde).
                // Inativa: cor de título adaptável ao tema.
                color: active ? "#fff" : BRAND.heading,
                fontWeight: 700, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif",
              }}
            >
              {/* Ícone/numeração à esquerda do rótulo:
                  - se a aba tem número de engenharia (t.n), mostra um
                    quadradinho com o número;
                  - se é a aba "Geral", mostra o ícone de camadas (Layers);
                  - senão ("Todos"), mostra o ícone de calendário. */}
              {t.n ? (
                <span style={{ width: 20, height: 20, borderRadius: 5, background: active ? BRAND.yellow : BRAND.green, color: active ? BRAND.greenDark : BRAND.yellow, display: "grid", placeItems: "center", fontSize: 10.5, fontWeight: 800 }}>
                  {t.n}
                </span>
              ) : t.id === "geral" ? (
                <Layers size={14} color={active ? "#fff" : BRAND.accentText} />
              ) : (
                <CalendarDays size={14} color={active ? "#fff" : BRAND.accentText} />
              )}
              {t.label}
              <span style={{ opacity: 0.75, fontWeight: 600 }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* ---------------------------------------------------------------
          Abas por Nível (Graduação / Pós-Graduação / Geral): mesmo
          padrão visual das abas de engenharia, em versão mais compacta.
         --------------------------------------------------------------- */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 30 }}>
        {niveisTabs.map((t) => {
          const active = filtroNivel === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setFiltroNivel(t.id)}
              style={{
                padding: "7px 13px", borderRadius: 999, cursor: "pointer",
                border: `1.5px solid ${active ? BRAND.green : BRAND.border}`,
                background: active ? BRAND.green : "var(--surface)",
                color: active ? "#fff" : "var(--text-muted)",
                fontWeight: 700, fontSize: 12.5, fontFamily: "var(--font-league-spartan), sans-serif",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ---------------------------------------------------------------
          Conteúdo principal: carregando / erro / lista vazia / grade de
          eventos filtrados (mesmo padrão de estados usado nas outras
          seções que buscam dados do Supabase).
         --------------------------------------------------------------- */}
      {eventos === null ? (
        <p style={{ color: "var(--text-muted)" }}>Carregando programação…</p>
      ) : error ? (
        <p style={{ color: "var(--error)" }}>{error}</p>
      ) : filtrados.length === 0 ? (
        <div style={{ textAlign: "center", padding: "70px 20px", border: `1.5px dashed ${BRAND.border}`, borderRadius: 12, color: "var(--text-muted)", background: "var(--surface)" }}>
          Nenhum evento publicado ainda para esse filtro. Volte em breve — a programação está sendo atualizada.
        </div>
      ) : (
        // Grade responsiva: cada coluna tem no mínimo 280px, e o número de
        // colunas se ajusta automaticamente ao espaço disponível.
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
          {filtrados.map((ev) => <EventCard key={ev.id} ev={ev} sponsor={ev.patrocinador_id ? sponsorById[ev.patrocinador_id] : null} />)}
        </div>
      )}

      {/* Em telas estreitas (até 700px), as abas de engenharia viram uma
          lista horizontal com rolagem (em vez de quebrar linha), para
          não ocupar espaço vertical demais. */}
      <style>{`
        @media (max-width: 700px) {
          .prog-tabs { overflow-x: auto; flex-wrap: nowrap !important; padding-bottom: 6px; }
        }
      `}</style>
    </section>
  );
}

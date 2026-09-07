"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock, MapPin, User, Layers, Users, ExternalLink } from "lucide-react";
import { BRAND, EVENT_CATEGORY_COLORS, fmtTime, fmtDateRange } from "@/lib/brand";
import { useEventos } from "@/lib/useEventos";
import { useSponsors } from "@/lib/useSponsors";

function CategoryPill({ categoria }) {
  const c = EVENT_CATEGORY_COLORS[categoria] || EVENT_CATEGORY_COLORS["Outro"];
  return (
    <span style={{ fontSize: 11.5, fontWeight: 800, padding: "3px 10px", borderRadius: 999, background: c.bg, color: c.fg, border: `1px solid ${c.border}`, letterSpacing: ".02em" }}>
      {categoria}
    </span>
  );
}

function EventCard({ ev, sponsor }) {
  return (
    <div
      style={{
        background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 12, overflow: "hidden",
        display: "flex", flexDirection: "column", transition: "box-shadow .15s, transform .15s",
      }}
      className="evento-card"
    >
      {ev.imagem_url && (
        <div style={{ height: 140, background: `${BRAND.bg}` }}>
          <img src={ev.imagem_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      )}
      <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
          <CategoryPill categoria={ev.categoria} />
          {ev.data_inicio && (
            <span style={{ fontSize: 12, fontWeight: 700, color: BRAND.green, whiteSpace: "nowrap" }}>
              {fmtDateRange(ev.data_inicio, ev.data_fim)}
            </span>
          )}
        </div>

        <h3 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 17, color: BRAND.greenDark, margin: 0, lineHeight: 1.3 }}>
          {ev.titulo}
        </h3>

        {ev.descricao && (
          <p style={{ color: "#5c655e", fontSize: 13.5, lineHeight: 1.55, margin: 0 }}>{ev.descricao}</p>
        )}

        {sponsor && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: BRAND.bg, borderRadius: 8, padding: "6px 10px" }}>
            {sponsor.logo_url ? (
              <img src={sponsor.logo_url} alt={sponsor.name} style={{ height: 20, maxWidth: 70, objectFit: "contain" }} />
            ) : null}
            <span style={{ fontSize: 11.5, color: "#5c655e" }}>Com <strong style={{ color: BRAND.greenDark }}>{sponsor.name}</strong></span>
          </div>
        )}

        <div style={{ marginTop: "auto", paddingTop: 8, display: "grid", gap: 6, borderTop: `1px dashed ${BRAND.border}` }}>
          {ev.palestrante && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3d443f" }}>
              <User size={14} color={BRAND.green} /> <span>{ev.palestrante}</span>
            </div>
          )}
          {ev.horario_inicio && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3d443f" }}>
              <Clock size={14} color={BRAND.green} />
              <span>{fmtTime(ev.horario_inicio)}{ev.horario_fim ? ` – ${fmtTime(ev.horario_fim)}` : ""}</span>
            </div>
          )}
          {ev.local && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3d443f" }}>
              <MapPin size={14} color={BRAND.green} /> <span>{ev.local}</span>
            </div>
          )}
          {ev.vagas != null && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3d443f" }}>
              <Users size={14} color={BRAND.green} /> <span>{ev.vagas} vaga{ev.vagas === 1 ? "" : "s"}</span>
            </div>
          )}
        </div>

        {ev.link_inscricao && (
          <a
            href={ev.link_inscricao} target="_blank" rel="noopener noreferrer"
            style={{ marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: BRAND.green, color: "#fff", borderRadius: 6, padding: "9px 12px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}
          >
            Inscreva-se <ExternalLink size={13} />
          </a>
        )}
      </div>
      <style>{`.evento-card:hover{ box-shadow: 0 10px 24px rgba(0,89,59,.10); transform: translateY(-2px); }`}</style>
    </div>
  );
}

export default function ProgramacaoSection({ content }) {
  const engenharias = content.engenharias;
  const { eventos, error } = useEventos({ onlyPublished: true });
  const { sponsors } = useSponsors({ onlyActive: true });
  const [tab, setTab] = useState("todos"); // 'todos' | 'geral' | engenharia_n

  const sponsorById = useMemo(() => {
    const map = {};
    (sponsors || []).forEach((s) => { map[s.id] = s; });
    return map;
  }, [sponsors]);

  const tabs = useMemo(
    () => [
      { id: "todos", label: "Todos", n: null },
      { id: "geral", label: "Geral", n: null },
      ...engenharias.map((e) => ({ id: e.n, label: e.nome, n: e.n })),
    ],
    [engenharias]
  );

  const filtrados = useMemo(() => {
    if (!eventos) return [];
    let list = eventos;
    if (tab === "geral") list = list.filter((e) => !e.engenharia_n);
    else if (tab !== "todos") list = list.filter((e) => e.engenharia_n === tab);
    return list;
  }, [eventos, tab]);

  const contagemPorTab = useMemo(() => {
    const map = {};
    (eventos || []).forEach((e) => {
      const key = e.engenharia_n || "geral";
      map[key] = (map[key] || 0) + 1;
    });
    return map;
  }, [eventos]);

  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "20px 20px 80px" }}>
      <span style={{ color: BRAND.green, fontWeight: 800, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif" }}>PROGRAMAÇÃO</span>
      <h2 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 30, color: BRAND.greenDark, margin: "8px 0 6px" }}>
        Palestras, minicursos e eventos por engenharia
      </h2>
      <p style={{ color: "#5c655e", marginBottom: 26, maxWidth: 680 }}>
        Escolha uma engenharia para ver só a programação dela, ou veja tudo em um só lugar.
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 30 }} className="prog-tabs">
        {tabs.map((t) => {
          const active = tab === t.id;
          const count = t.id === "todos" ? (eventos || []).length : contagemPorTab[t.id === "geral" ? "geral" : t.n] || 0;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "9px 15px", borderRadius: 999, cursor: "pointer",
                border: `1.5px solid ${active ? BRAND.green : BRAND.border}`,
                background: active ? BRAND.green : "#fff",
                color: active ? "#fff" : BRAND.greenDark,
                fontWeight: 700, fontSize: 13, fontFamily: "var(--font-league-spartan), sans-serif",
              }}
            >
              {t.n ? (
                <span style={{ width: 20, height: 20, borderRadius: 5, background: active ? BRAND.yellow : BRAND.green, color: active ? BRAND.greenDark : BRAND.yellow, display: "grid", placeItems: "center", fontSize: 10.5, fontWeight: 800 }}>
                  {t.n}
                </span>
              ) : t.id === "geral" ? (
                <Layers size={14} color={active ? "#fff" : BRAND.green} />
              ) : (
                <CalendarDays size={14} color={active ? "#fff" : BRAND.green} />
              )}
              {t.label}
              <span style={{ opacity: 0.75, fontWeight: 600 }}>({count})</span>
            </button>
          );
        })}
      </div>

      {eventos === null ? (
        <p style={{ color: "#5c655e" }}>Carregando programação…</p>
      ) : error ? (
        <p style={{ color: "#B3261E" }}>{error}</p>
      ) : filtrados.length === 0 ? (
        <div style={{ textAlign: "center", padding: "70px 20px", border: `1.5px dashed ${BRAND.border}`, borderRadius: 12, color: "#5c655e", background: "#fff" }}>
          Nenhum evento publicado ainda para esse filtro. Volte em breve — a programação está sendo atualizada.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
          {filtrados.map((ev) => <EventCard key={ev.id} ev={ev} sponsor={ev.patrocinador_id ? sponsorById[ev.patrocinador_id] : null} />)}
        </div>
      )}

      <style>{`
        @media (max-width: 700px) {
          .prog-tabs { overflow-x: auto; flex-wrap: nowrap !important; padding-bottom: 6px; }
        }
      `}</style>
    </section>
  );
}

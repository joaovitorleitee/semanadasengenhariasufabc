"use client";

import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, CalendarDays } from "lucide-react";
import { BRAND, fmtTime, fmtDateRange, EVENT_LEVELS } from "@/lib/brand";
import { useEventos } from "@/lib/useEventos";
import { useSponsors } from "@/lib/useSponsors";
import StatusPill from "../StatusPill";
import EventForm from "./EventForm";
import { iconBtn } from "./adminStyles";

export default function EventsManager({ engenharias, notify }) {
  const { eventos, error, createEvento, updateEvento, deleteEvento } = useEventos({ onlyPublished: false });
  const { sponsors } = useSponsors({ onlyActive: false });
  const [editing, setEditing] = useState(null); // null | 'new' | evento
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const [filtro, setFiltro] = useState("todos"); // 'todos' | engenharia_n | 'geral'
  const [filtroNivel, setFiltroNivel] = useState("todos");

  const nomeCurso = (n) => engenharias.find((e) => e.n === n)?.nome || n;
  const nomeSponsor = (id) => (sponsors || []).find((s) => s.id === id)?.name;
 
 
  const filtrados = useMemo(() => {
    if (!eventos) return [];

    return eventos.filter((evento) => {
      // 1. Valida Engenharia
      const bateEngenharia =
        filtro === "todos" ? true :
        filtro === "geral" ? !evento.engenharia_n :
        String(evento.engenharia_n) === String(filtro);

      // 2. Valida Nível diretamente do banco
      const nivelDoEvento = evento.nivel || "Graduação";
      const bateNivel = filtroNivel === "todos" || nivelDoEvento === filtroNivel;

      return bateEngenharia && bateNivel;
    });
  }, [eventos, filtro, filtroNivel]);

  const handleSave = async (form) => {
    setSaving(true);
    let ok;
    if (editing === "new") {
      const res = await createEvento(form);
      ok = res.ok;
      if (ok) notify(`Evento ${form.status === "published" ? "publicado" : "salvo como rascunho"}.`);
    } else {
      ok = await updateEvento(editing.id, form);
      if (ok) notify(`Evento atualizado${form.status === "published" ? " e publicado" : ""}.`);
    }
    setSaving(false);
    if (ok) setEditing(null);
  };

  const togglePublish = async (ev) => {
    const ok = await updateEvento(ev.id, { status: ev.status === "published" ? "draft" : "published" });
    if (ok) notify(ev.status === "published" ? "Evento despublicado." : "Evento publicado.");
  };

  const confirmDelete = async (id) => {
    const ok = await deleteEvento(id);
    setConfirmId(null);
    if (ok) notify("Evento excluído.", "success");
  };

  if (editing) {
    return (
      <div style={{ maxWidth: 780 }}>
        <EventForm
          initial={editing === "new" ? null : editing}
          engenharias={engenharias}
          sponsors={sponsors || []}
          saving={saving}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 24, color: BRAND.greenDark, margin: 0 }}>Programação</h1>
          <p style={{ color: "#5c655e", fontSize: 13.5, margin: "4px 0 0" }}>Palestras, minicursos e demais eventos, organizados por engenharia. Aparecem em <strong>/programacao</strong> assim que publicados.</p>
        </div>
        <button onClick={() => setEditing("new")} style={{ display: "flex", alignItems: "center", gap: 8, background: BRAND.green, color: "#fff", border: "none", padding: "11px 18px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
          <Plus size={16} /> Novo evento
        </button>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {[{ id: "todos", label: "Todos" }, { id: "geral", label: "Geral" }, ...engenharias.map((e) => ({ id: e.n, label: e.n }))].map((t) => (
          <button
            key={t.id} onClick={() => setFiltro(t.id)}
            title={t.id !== "todos" && t.id !== "geral" ? nomeCurso(t.id) : undefined}
            style={{
              padding: "7px 13px", borderRadius: 999, border: `1.5px solid ${filtro === t.id ? BRAND.green : BRAND.border}`,
              background: filtro === t.id ? BRAND.green : "#fff", color: filtro === t.id ? "#fff" : "#5c655e",
              fontWeight: 700, fontSize: 12.5, cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
  {[{ id: "todos", label: "Todos os níveis" }, ...EVENT_LEVELS.map((n) => ({ id: n, label: n }))].map((t) => (
    <button
      key={t.id} onClick={() => setFiltroNivel(t.id)}
      style={{
        padding: "7px 13px", borderRadius: 999, border: `1.5px solid ${filtroNivel === t.id ? BRAND.green : BRAND.border}`,
        background: filtroNivel === t.id ? BRAND.green : "#fff", color: filtroNivel === t.id ? "#fff" : "#5c655e",
        fontWeight: 700, fontSize: 12.5, cursor: "pointer",
      }}
    >
      {t.label}
    </button>
  ))}
</div> 

      {eventos === null ? (
        <p style={{ color: "#5c655e" }}>Carregando…</p>
      ) : error ? (
        <p style={{ color: "#B3261E" }}>{error}</p>
      ) : filtrados.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", border: `1.5px dashed ${BRAND.border}`, borderRadius: 10, color: "#5c655e" }}>
          Nenhum evento cadastrado {filtro === "todos" ? "ainda" : "nesse filtro"}. Clique em <strong>Novo evento</strong> para cadastrar.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {filtrados.map((ev) => (
            <div key={ev.id} style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: "14px 18px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div style={{ width: 40, height: 40, minWidth: 40, borderRadius: 6, background: ev.engenharia_n ? BRAND.green : BRAND.bg, color: ev.engenharia_n ? BRAND.yellow : BRAND.green, border: ev.engenharia_n ? "none" : `1.5px solid ${BRAND.border}`, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 12 }}>
                {ev.engenharia_n || <CalendarDays size={16} />}
              </div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                  <strong style={{ color: BRAND.greenDark, fontSize: 15 }}>{ev.titulo}</strong>
                  <StatusPill status={ev.status} />
                </div>
                <span style={{ fontSize: 12.5, color: "#8a938c" }}>
                  {ev.categoria}
                  {ev.nivel ? ` · ${ev.nivel}` : ""}
                  {ev.engenharia_n ? ` · ${nomeCurso(ev.engenharia_n)}` : " · Geral"}
                  {ev.data_inicio ? ` · ${fmtDateRange(ev.data_inicio, ev.data_fim)}` : ""}
                  {ev.horario_inicio ? ` às ${fmtTime(ev.horario_inicio)}` : ""}
                  {ev.palestrante ? ` · ${ev.palestrante}` : ""}
                  {ev.patrocinador_id && nomeSponsor(ev.patrocinador_id) ? ` · ${nomeSponsor(ev.patrocinador_id)}` : ""}
                  {ev.vagas != null ? ` · ${ev.vagas} vagas` : ""}
                </span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => togglePublish(ev)} title={ev.status === "published" ? "Despublicar" : "Publicar"} style={iconBtn}>
                  {ev.status === "published" ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button onClick={() => setEditing(ev)} title="Editar" style={iconBtn}><Pencil size={16} /></button>
                {confirmId === ev.id ? (
                  <>
                    <button onClick={() => confirmDelete(ev.id)} style={{ ...iconBtn, borderColor: "#B3261E", color: "#B3261E" }}>Confirmar</button>
                    <button onClick={() => setConfirmId(null)} style={iconBtn}>Cancelar</button>
                  </>
                ) : (
                  <button onClick={() => setConfirmId(ev.id)} title="Excluir" style={{ ...iconBtn, color: "#B3261E" }}><Trash2 size={16} /></button>
                )}
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { BRAND, EVENT_CATEGORIES, EVENT_LEVELS } from "@/lib/brand";
import { fieldInput, fieldLabel } from "./adminStyles";

const emptyForm = {
  titulo: "",
  categoria: EVENT_CATEGORIES[0] || "Sem tipo definido",
  nivel: EVENT_LEVELS[0] || "Graduação",
  engenharia_n: "",
  palestrante: "",
  patrocinador_id: "",
  data_inicio: "",
  data_fim: "",
  horario_inicio: "",
  horario_fim: "",
  local: "",
  vagas: "",
  link_inscricao: "",
  descricao: "",
  imagem_url: "",
  status: "draft",
};

// "nivel" não é uma coluna de verdade no banco — fica guardado como texto
// dentro de "local" (ver submit() abaixo). Por isso, ao editar um evento já
// existente, precisamos adivinhar o nível pelo texto salvo em vez de ler um
// campo "nivel" que nunca existiu na linha vinda do Supabase — senão o menu
// sempre volta pro valor padrão ("Graduação"), mesmo em eventos do Carlos Chagas.
function inferirNivel(ev) {
  if (!ev) return EVENT_LEVELS[0] || "Graduação";
  const texto = `${ev.titulo || ""} ${ev.local || ""} ${ev.categoria || ""} ${ev.descricao || ""}`.toLowerCase();
  if (texto.includes("carlos chagas")) return "Auditório Carlos Chagas";
  return EVENT_LEVELS[0] || "Graduação";
}

export default function EventForm({ initial, engenharias = [], sponsors = [], onCancel, onSave, saving }) {
  const [form, setForm] = useState(
    initial
      ? {
          ...emptyForm,
          ...initial,
          nivel: inferirNivel(initial),
          engenharia_n: initial.engenharia_n || "",
          patrocinador_id: initial.patrocinador_id || "",
          data_fim: initial.data_fim || "",
          vagas: initial.vagas ?? "",
          link_inscricao: initial.link_inscricao || "",
        }
      : emptyForm
  );

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.titulo.trim() && form.data_inicio && form.horario_inicio && form.horario_fim;

   const submit = () => {
    const { nivel, ...dadosEventos } = form;
    // "categoria" tem uma restrição no banco (check constraint) que só
    // aceita um conjunto fixo de valores (Palestra, Workshop etc.) — por
    // isso NÃO pode receber texto extra. A marcação de "Auditório Carlos
    // Chagas" vai para o campo "local" (texto livre), não para "categoria".
    let localAjustado = form.local?.trim() || "";
    if (nivel === "Auditório Carlos Chagas" && !localAjustado.toLowerCase().includes("carlos chagas")) {
      localAjustado = localAjustado ? `${localAjustado} — Auditório Carlos Chagas` : "Auditório Carlos Chagas";
    }
    onSave({
      ...dadosEventos,
    engenharia_n: form.engenharia_n || null,
    patrocinador_id: form.patrocinador_id || null,
    data_fim: form.data_fim || form.data_inicio || null,
    vagas: form.vagas === "" || form.vagas === null ? null : Number(form.vagas),
    link_inscricao: form.link_inscricao?.trim() || null,
    imagem_url: form.imagem_url?.trim() || null,
    palestrante: form.palestrante?.trim() || null,
    local: localAjustado || null,
    });
  };

  return (
    <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 10, padding: 26 }}>
      <h3 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 19, color: BRAND.greenDark, margin: "0 0 18px" }}>
        {initial ? "Editar evento da programação" : "Novo evento da programação"}
      </h3>

      <div style={{ display: "grid", gap: 16 }}>
        <div>
          <label style={fieldLabel}>Título</label>
          <input value={form.titulo} onChange={(e) => set("titulo", e.target.value)} style={fieldInput} placeholder="Ex.: Introdução a Machine Learning" />
        </div>

        <div>
          <label style={fieldLabel}>Descrição (opcional)</label>
          <textarea value={form.descricao} onChange={(e) => set("descricao", e.target.value)} style={{ ...fieldInput, resize: "vertical", minHeight: 80 }} placeholder="Resumo da atividade, proposta, pré-requisitos..." />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }} className="form-row">
  <div>
    <label style={fieldLabel}>Categoria</label>
    <select value={form.categoria} onChange={(e) => set("categoria", e.target.value)} style={fieldInput}>
      <option value="Sem tipo definido">Sem tipo definido</option>
      <option value="Palestra">Palestra</option>
      <option value="Workshop">Workshop</option>
      <option value="Painel">Painel</option>
      <option value="Roda de conversa">Roda de conversa</option>
      <option value="Processo seletivo ao vivo">Processo seletivo ao vivo</option>
      <option value="Networking">Networking</option>
      <option value="Geral">Geral</option>
      
    </select>
  </div>

  <div>
    <label style={fieldLabel}>Nível / Público</label>
    <select value={form.nivel || "Graduação"} onChange={(e) => set("nivel", e.target.value)} style={fieldInput}>
      <option value="Graduação">Graduação</option>
      <option value="Auditório Carlos Chagas">Auditório Carlos Chagas</option>
      <option value="Geral">Geral (Todos)</option>
    </select>
  </div>

  <div>
    <label style={fieldLabel}>Engenharia</label>
    <select value={form.engenharia_n} onChange={(e) => set("engenharia_n", e.target.value)} style={fieldInput}>
      <option value="">Geral (não vinculado a um curso específico)</option>
      {engenharias.map((eng) => (
        <option key={eng.n} value={eng.n}>{eng.n} — {eng.nome}</option>
      ))}
    </select>
  </div>
</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row">
          <div>
            <label style={fieldLabel}>Palestrante / responsável</label>
            <input value={form.palestrante} onChange={(e) => set("palestrante", e.target.value)} style={fieldInput} placeholder="Ex.: Profa. Dra. Maria Silva (USP)" />
          </div>
          <div>
            <label style={fieldLabel}>Empresa vinculada (opcional)</label>
            <select value={form.patrocinador_id} onChange={(e) => set("patrocinador_id", e.target.value)} style={fieldInput}>
              <option value="">Sem empresa vinculada</option>
              {sponsors.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row">
          <div>
            <label style={fieldLabel}>Data início</label>
            <input type="date" required value={form.data_inicio || ""} onChange={(e) => set("data_inicio", e.target.value)} style={fieldInput} />
          </div>
          <div>
            <label style={fieldLabel}>Data fim (opcional — deixe em branco se for só 1 dia)</label>
            <input type="date" value={form.data_fim || ""} onChange={(e) => set("data_fim", e.target.value)} style={fieldInput} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row">
          <div>
            <label style={fieldLabel}>Horário de início</label>
            <input type="time" required value={form.horario_inicio || ""} onChange={(e) => set("horario_inicio", e.target.value)} style={fieldInput} />
          </div>
          <div>
            <label style={fieldLabel}>Horário de término</label>
            <input type="time" required value={form.horario_fim || ""} onChange={(e) => set("horario_fim", e.target.value)} style={fieldInput} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }} className="form-row">
          <div>
            <label style={fieldLabel}>Local (opcional)</label>
            <input value={form.local} onChange={(e) => set("local", e.target.value)} style={fieldInput} placeholder="Ex.: Bloco A, Auditório 1 — Santo André" />
          </div>
          <div>
            <label style={fieldLabel}>Limite de vagas (opcional)</label>
            <input type="number" min="0" value={form.vagas} onChange={(e) => set("vagas", e.target.value)} style={fieldInput} placeholder="Sem limite" />
          </div>
        </div>

        <div>
          <label style={fieldLabel}>Link de inscrição na Blumie (opcional)</label>
          <input value={form.link_inscricao} onChange={(e) => set("link_inscricao", e.target.value)} style={fieldInput} placeholder="https://blumie.com.br/..." />
        </div>

        <div>
          <label style={fieldLabel}>Imagem de capa (URL, opcional)</label>
          <input value={form.imagem_url} onChange={(e) => set("imagem_url", e.target.value)} style={fieldInput} placeholder="https://..." />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <label style={fieldLabel}>Status</label>
          <div style={{ display: "flex", gap: 8 }}>
            {["draft", "published"].map((s) => (
              <button
                key={s} type="button" onClick={() => set("status", s)}
                style={{
                  padding: "7px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 700,
                  border: `1.5px solid ${form.status === s ? BRAND.green : BRAND.border}`,
                  background: form.status === s ? BRAND.green : "#fff",
                  color: form.status === s ? "#fff" : "#5c655e",
                }}
              >
                {s === "draft" ? "Rascunho" : "Publicado"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        <button
          disabled={!valid || saving}
          onClick={submit}
          style={{ display: "flex", alignItems: "center", gap: 8, background: valid ? BRAND.green : "#B9C6BE", color: "#fff", border: "none", padding: "11px 20px", borderRadius: 6, fontWeight: 700, cursor: valid ? "pointer" : "not-allowed", fontSize: 14 }}
        >
          {saving ? <Loader2 className="spin" size={16} /> : <Save size={16} />} Salvar evento
        </button>
        <button onClick={onCancel} style={{ background: "none", border: `1.5px solid ${BRAND.border}`, padding: "11px 20px", borderRadius: 6, cursor: "pointer", fontWeight: 700, color: "#5c655e", fontSize: 14 }}>
          Cancelar
        </button>
      </div>
      <style>{`@media (max-width: 620px){ .form-row{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

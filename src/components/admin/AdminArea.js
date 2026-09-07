"use client";

import { useState } from "react";
import { LogOut, Pencil } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useSiteContent } from "@/lib/useSiteContent";
import PostsManager from "./PostsManager";
import SectionEditor from "./SectionEditor";
import CourseForm from "./CourseForm";
import SponsorsManager from "./SponsorsManager";
import EventsManager from "./EventsManager";
import { iconBtn } from "./adminStyles";

function EngenhariasEditor({ contentStore, notify }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [saving, setSaving] = useState(false);
  const list = contentStore.content.engenharias;

  const save = async (patch) => {
    setSaving(true);
    const ok = await contentStore.updateEngenharia(editingIndex, patch);
    setSaving(false);
    if (ok) {
      notify("Curso atualizado.");
      setEditingIndex(null);
    }
  };

  if (editingIndex !== null) {
    return <CourseForm course={list[editingIndex]} saving={saving} onCancel={() => setEditingIndex(null)} onSave={save} />;
  }

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 24, color: BRAND.greenDark, margin: "0 0 4px" }}>Engenharias</h1>
      <p style={{ color: "#5c655e", fontSize: 13.5, margin: "0 0 22px" }}>Edite o perfil e as áreas de atuação de cada um dos 8 cursos.</p>
      <div style={{ display: "grid", gap: 10, maxWidth: 720 }}>
        {list.map((e, i) => (
          <div key={e.n} style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: "14px 18px", display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ width: 34, height: 34, minWidth: 34, borderRadius: 6, background: BRAND.green, color: BRAND.yellow, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 12 }}>{e.n}</span>
            <div style={{ flex: 1 }}>
              <strong style={{ color: BRAND.greenDark, fontSize: 14.5 }}>{e.nome}</strong>
              <span style={{ display: "block", fontSize: 12.5, color: "#8a938c" }}>Campus {e.campus}</span>
            </div>
            <button onClick={() => setEditingIndex(i)} style={iconBtn}><Pencil size={16} /> Editar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminArea({ onLogout, notify }) {
  const [tab, setTab] = useState("posts");
  const contentStore = useSiteContent();
  const tabs = [
    { id: "programacao", label: "Programação" },
    { id: "posts", label: "Notícias" },
    { id: "patrocinadores", label: "Patrocinadores" },
    { id: "home", label: "Início" },
    { id: "evento", label: "O Evento" },
    { id: "engenharias", label: "Engenharias" },
    { id: "footer", label: "Rodapé" },
  ];

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "26px 20px 90px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tabs.map((t) => (
            <button
              key={t.id} onClick={() => setTab(t.id)}
              style={{
                padding: "9px 16px", borderRadius: 6, border: `1.5px solid ${tab === t.id ? BRAND.green : BRAND.border}`,
                background: tab === t.id ? BRAND.green : "#fff", color: tab === t.id ? "#fff" : "#5c655e",
                fontWeight: 700, fontSize: 13.5, cursor: "pointer",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: `1.5px solid ${BRAND.border}`, padding: "9px 16px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: 13.5, color: "#5c655e" }}>
          <LogOut size={15} /> Sair
        </button>
      </div>

      {contentStore.error && <p style={{ color: "#B3261E", marginBottom: 16 }}>{contentStore.error}</p>}

      {tab === "programacao" && (
        <EventsManager engenharias={contentStore.content.engenharias} notify={notify} />
      )}

      {tab === "posts" && (
        <>
          <div style={{ marginBottom: 30, paddingBottom: 26, borderBottom: `1px solid ${BRAND.border}` }}>
            <SectionEditor
              title="Cabeçalho da seção de notícias" description="Etiqueta e título mostrados acima da lista de posts."
              values={contentStore.content.noticias}
              onSave={(form) => contentStore.updateSection("noticias", form)}
              notify={notify}
              fields={[
                { key: "eyebrow", label: "Etiqueta", type: "text" },
                { key: "title", label: "Título da seção", type: "text" },
              ]}
            />
          </div>
          <PostsManager notify={notify} />
        </>
      )}

      {tab === "home" && (
        <SectionEditor
          title="Início" description="Textos do topo da página inicial (hero)."
          values={contentStore.content.hero}
          onSave={(form) => contentStore.updateSection("hero", form)}
          notify={notify}
          fields={[
            { key: "badge", label: "Selo acima do título", type: "text" },
            { key: "title", label: "Título principal", type: "text" },
            { key: "subtitle", label: "Texto de apoio", type: "textarea" },
            { key: "ctaPrimary", label: "Botão principal", type: "text" },
            { key: "ctaSecondary", label: "Botão secundário", type: "text" },
            { key: "date", label: "Data do evento", type: "text" },
            { key: "local", label: "Local do evento", type: "text" },
          ]}
        />
      )}

      {tab === "evento" && (
        <SectionEditor
          title="O Evento" description="Textos das seções “O Evento” e “Responsabilidade Social”."
          values={contentStore.content.evento}
          onSave={(form) => contentStore.updateSection("evento", form)}
          notify={notify}
          fields={[
            { key: "eyebrow", label: "Etiqueta", type: "text" },
            { key: "title", label: "Título da seção", type: "text" },
            { key: "paragraph1", label: "Parágrafo 1", type: "textarea" },
            { key: "paragraph2", label: "Parágrafo 2", type: "textarea" },
            { key: "socialTitle", label: "Título — Responsabilidade Social", type: "text" },
            { key: "socialText", label: "Texto — Responsabilidade Social", type: "textarea" },
          ]}
        />
      )}

      {tab === "engenharias" && <EngenhariasEditor contentStore={contentStore} notify={notify} />}

      {tab === "patrocinadores" && (
        <>
          <div style={{ marginBottom: 30, paddingBottom: 26, borderBottom: `1px solid ${BRAND.border}` }}>
            <SectionEditor
              title="Cabeçalho da seção de patrocinadores" description="Etiqueta, título e subtítulo mostrados acima da lista de patrocinadores."
              values={contentStore.content.patrocinadores}
              onSave={(form) => contentStore.updateSection("patrocinadores", form)}
              notify={notify}
              fields={[
                { key: "eyebrow", label: "Etiqueta", type: "text" },
                { key: "title", label: "Título da seção", type: "text" },
                { key: "subtitle", label: "Subtítulo", type: "text" },
              ]}
            />
          </div>
          <SponsorsManager notify={notify} />
        </>
      )}

      {tab === "footer" && (
        <SectionEditor
          title="Rodapé" description="Textos exibidos no rodapé de todas as páginas."
          values={contentStore.content.footer}
          onSave={(form) => contentStore.updateSection("footer", form)}
          notify={notify}
          fields={[
            { key: "title", label: "Nome exibido", type: "text" },
            { key: "description", label: "Descrição", type: "textarea" },
            { key: "email", label: "E-mail de contato", type: "text" },
            { key: "address", label: "Endereço / campus", type: "text" },
          ]}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { BRAND, fmtDate } from "@/lib/brand";
import { usePosts } from "@/lib/usePosts";
import StatusPill from "../StatusPill";
import PostForm from "./PostForm";
import { iconBtn } from "./adminStyles";

export default function PostsManager({ notify }) {
  const { posts, error, createPost, updatePost, deletePost } = usePosts({ onlyPublished: false });
  const [editing, setEditing] = useState(null); // null | 'new' | post
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const handleSave = async (form) => {
    setSaving(true);
    let ok;
    if (editing === "new") {
      const res = await createPost(form);
      ok = res.ok;
      if (ok) notify(`Post ${form.status === "published" ? "publicado" : "salvo como rascunho"}.`);
    } else {
      ok = await updatePost(editing.id, form);
      if (ok) notify(`Post atualizado${form.status === "published" ? " e publicado" : ""}.`);
    }
    setSaving(false);
    if (ok) setEditing(null);
  };

  const togglePublish = async (post) => {
    const ok = await updatePost(post.id, { status: post.status === "published" ? "draft" : "published" });
    if (ok) notify(post.status === "published" ? "Post despublicado." : "Post publicado.");
  };

  const confirmDelete = async (id) => {
    const ok = await deletePost(id);
    setConfirmId(null);
    if (ok) notify("Post excluído.", "success");
  };

  if (editing) {
    return (
      <div style={{ maxWidth: 780 }}>
        <PostForm
          initial={editing === "new" ? null : editing}
          saving={saving}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 24, color: BRAND.greenDark, margin: 0 }}>Notícias / Posts</h1>
          <p style={{ color: "#5c655e", fontSize: 13.5, margin: "4px 0 0" }}>Crie, edite e publique notícias do site.</p>
        </div>
        <button onClick={() => setEditing("new")} style={{ display: "flex", alignItems: "center", gap: 8, background: BRAND.green, color: "#fff", border: "none", padding: "11px 18px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
          <Plus size={16} /> Novo post
        </button>
      </div>

      {posts === null ? (
        <p style={{ color: "#5c655e" }}>Carregando…</p>
      ) : error ? (
        <p style={{ color: "#B3261E" }}>{error}</p>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", border: `1.5px dashed ${BRAND.border}`, borderRadius: 10, color: "#5c655e" }}>
          Nenhum post ainda. Clique em <strong>Novo post</strong> para criar o primeiro.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {posts.map((p) => (
            <div key={p.id} style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: "14px 18px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <strong style={{ color: BRAND.greenDark, fontSize: 15 }}>{p.title}</strong>
                  <StatusPill status={p.status} />
                </div>
                <span style={{ fontSize: 12.5, color: "#8a938c" }}>{p.category} · atualizado {fmtDate(p.updated_at)}</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => togglePublish(p)} title={p.status === "published" ? "Despublicar" : "Publicar"} style={iconBtn}>
                  {p.status === "published" ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button onClick={() => setEditing(p)} title="Editar" style={iconBtn}><Pencil size={16} /></button>
                {confirmId === p.id ? (
                  <>
                    <button onClick={() => confirmDelete(p.id)} style={{ ...iconBtn, borderColor: "#B3261E", color: "#B3261E" }}>Confirmar</button>
                    <button onClick={() => setConfirmId(null)} style={iconBtn}>Cancelar</button>
                  </>
                ) : (
                  <button onClick={() => setConfirmId(p.id)} title="Excluir" style={{ ...iconBtn, color: "#B3261E" }}><Trash2 size={16} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

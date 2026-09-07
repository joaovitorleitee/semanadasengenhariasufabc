-- ============================================================================
-- Schema completo do site "Semana das Engenharias UFABC 2026"
-- Rode isto no SQL Editor de um projeto Supabase NOVO (ou vazio) para deixar
-- tudo igual ao README: tabelas posts, site_content, sponsors, eventos + RLS.
-- Pode colar o arquivo inteiro de uma vez e rodar (Run).
-- ============================================================================

-- Função compartilhada que mantém "updated_at" em dia em qualquer UPDATE.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ----------------------------------------------------------------------------
-- posts (notícias)
-- ----------------------------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null default 'Geral',
  excerpt text not null default '',
  content text not null default '',
  cover text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_posts_updated_at on public.posts;
create trigger trg_posts_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

alter table public.posts enable row level security;

drop policy if exists "posts_select" on public.posts;
create policy "posts_select" on public.posts
  for select using (status = 'published' or auth.role() = 'authenticated');

drop policy if exists "posts_insert" on public.posts;
create policy "posts_insert" on public.posts
  for insert to authenticated with check (true);

drop policy if exists "posts_update" on public.posts;
create policy "posts_update" on public.posts
  for update to authenticated using (true) with check (true);

drop policy if exists "posts_delete" on public.posts;
create policy "posts_delete" on public.posts
  for delete to authenticated using (true);

create index if not exists idx_posts_status on public.posts (status);

-- ----------------------------------------------------------------------------
-- site_content (uma linha por seção editável do site, conteúdo em JSON)
-- ----------------------------------------------------------------------------
create table if not exists public.site_content (
  section text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_site_content_updated_at on public.site_content;
create trigger trg_site_content_updated_at
before update on public.site_content
for each row execute function public.set_updated_at();

alter table public.site_content enable row level security;

-- Leitura 100% pública (o site precisa disso pra renderizar sem estar logado).
drop policy if exists "site_content_select" on public.site_content;
create policy "site_content_select" on public.site_content
  for select using (true);

drop policy if exists "site_content_upsert_insert" on public.site_content;
create policy "site_content_upsert_insert" on public.site_content
  for insert to authenticated with check (true);

drop policy if exists "site_content_upsert_update" on public.site_content;
create policy "site_content_upsert_update" on public.site_content
  for update to authenticated using (true) with check (true);

-- ----------------------------------------------------------------------------
-- sponsors (patrocinadores)
-- ----------------------------------------------------------------------------
create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  tier text not null default 'Apoio',
  description text,
  "position" integer not null default 0,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_sponsors_updated_at on public.sponsors;
create trigger trg_sponsors_updated_at
before update on public.sponsors
for each row execute function public.set_updated_at();

alter table public.sponsors enable row level security;

drop policy if exists "sponsors_select" on public.sponsors;
create policy "sponsors_select" on public.sponsors
  for select using (status = 'active' or auth.role() = 'authenticated');

drop policy if exists "sponsors_insert" on public.sponsors;
create policy "sponsors_insert" on public.sponsors
  for insert to authenticated with check (true);

drop policy if exists "sponsors_update" on public.sponsors;
create policy "sponsors_update" on public.sponsors
  for update to authenticated using (true) with check (true);

drop policy if exists "sponsors_delete" on public.sponsors;
create policy "sponsors_delete" on public.sponsors
  for delete to authenticated using (true);

-- ----------------------------------------------------------------------------
-- eventos (Programação: palestras, minicursos e demais eventos por engenharia)
-- Campos revistos a partir do formulário de atividades da Blumie.
-- ----------------------------------------------------------------------------
create table if not exists public.eventos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  categoria text not null default 'Palestra',
  -- '01'..'08' (mesmo código de site_content.engenharias); null = evento geral
  engenharia_n text,
  palestrante text,
  -- empresa vinculada (equivalente ao campo "Empresa vinculada" da Blumie)
  patrocinador_id uuid references public.sponsors (id) on delete set null,
  data_inicio date,
  data_fim date,
  horario_inicio time,
  horario_fim time,
  local text,
  vagas integer,
  link_inscricao text,
  imagem_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  "position" integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_eventos_updated_at on public.eventos;
create trigger trg_eventos_updated_at
before update on public.eventos
for each row execute function public.set_updated_at();

alter table public.eventos enable row level security;

drop policy if exists "eventos_select" on public.eventos;
create policy "eventos_select" on public.eventos
  for select using (status = 'published' or auth.role() = 'authenticated');

drop policy if exists "eventos_insert" on public.eventos;
create policy "eventos_insert" on public.eventos
  for insert to authenticated with check (true);

drop policy if exists "eventos_update" on public.eventos;
create policy "eventos_update" on public.eventos
  for update to authenticated using (true) with check (true);

drop policy if exists "eventos_delete" on public.eventos;
create policy "eventos_delete" on public.eventos
  for delete to authenticated using (true);

create index if not exists idx_eventos_engenharia on public.eventos (engenharia_n);
create index if not exists idx_eventos_status on public.eventos (status);
create index if not exists idx_eventos_data on public.eventos (data_inicio, horario_inicio);
create index if not exists idx_eventos_patrocinador on public.eventos (patrocinador_id);

-- ============================================================================
-- Fim do schema. Depois de rodar isto, rode também seed_site_content.sql
-- (mesma pasta) para popular os textos padrão do site — sem isso o site ainda
-- funciona (usa os textos de fallback do brand.js), mas fica mais fácil editar
-- pelo admin já com algo preenchido.
-- ============================================================================

-- Migration incremental: adiciona SÓ a tabela "eventos" (Programação) a um
-- projeto Supabase que já existe e já tem posts/site_content/sponsors — por
-- exemplo, o projeto de produção do site. Não mexe em nenhuma tabela ou
-- conteúdo existente. Idempotente (pode rodar mais de uma vez sem duplicar).
--
-- v2: campos revistos a partir do formulário de atividades da Blumie —
-- separa data início/fim (para eventos de mais de um dia), adiciona limite
-- de vagas, link de inscrição (aponta pra Blumie) e empresa vinculada
-- (referencia a tabela sponsors já existente).
--
-- Se você já rodou a v1 desta tabela (só com a coluna "data", sem
-- "data_inicio"/"data_fim"/"vagas"/"link_inscricao"/"patrocinador_id") em
-- algum projeto de teste, é mais simples rodar `drop table public.eventos;`
-- antes disto do que migrar os dados — normalmente não tem nada de valor
-- ainda cadastrado lá.
--
-- Se em vez disso você está criando um projeto Supabase DO ZERO para testar,
-- use supabase/schema.sql (já inclui esta tabela) + supabase/seed_site_content.sql.

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

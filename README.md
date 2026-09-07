# Semana das Engenharias UFABC 2026 — site + admin

Site institucional da Semana das Engenharias da UFABC, com painel administrativo
para editar todas as seções do site (Início, O Evento, Engenharias, Notícias,
Rodapé) e publicar posts. Construído em **Next.js 14** (App Router) com
**Supabase** como banco de dados e autenticação, pronto para deploy na **Vercel**.

## Stack

- **Next.js 14** (App Router, React 18)
- **Supabase** — Postgres (tabelas `posts` e `site_content`) + Auth (login do admin)
- **Vercel** — hospedagem/deploy
- Fontes: **League Spartan** (títulos, Google Fonts) e **Metropolis** (corpo de
  texto, alternativa livre — licença SIL OFL — à Gotham pedida no manual de marca)

## Estrutura

```
src/
  app/                  # rotas (App Router)
    page.js             # Início
    evento/page.js
    engenharias/page.js
    noticias/page.js
    noticias/[slug]/page.js
    admin/page.js        # login + painel admin
  components/            # componentes públicos
    admin/                # componentes exclusivos do painel admin
  lib/
    supabaseClient.js     # cliente Supabase (browser)
    useSiteContent.js     # hook: conteúdo editável do site
    usePosts.js           # hook: posts
    useAuth.js             # hook: sessão/login do admin
    brand.js               # cores da marca + conteúdo padrão (fallback)
  fonts/                   # arquivos .otf da fonte Metropolis
```

## Banco de dados (Supabase)

Já existe um projeto Supabase criado para este site:

- **Nome do projeto:** `seufabc-2026`
- **Região:** São Paulo (`sa-east-1`)
- **URL / chave pública:** ver `.env.local.example`

As tabelas já foram criadas e populadas com o conteúdo atual do site:

- **`posts`** — título, slug, categoria, resumo, conteúdo, capa, status
  (`draft`/`published`), datas. Leitura pública liberada apenas para posts
  `published`; criar/editar/excluir exige estar autenticado.
- **`site_content`** — uma linha por seção (`hero`, `evento`, `noticias`,
  `patrocinadores`, `footer`, `engenharias`), com o conteúdo em JSON. Leitura
  pública liberada para todo mundo; escrita exige estar autenticado.
- **`sponsors`** — patrocinadores: nome, logo (URL), site, categoria/cota,
  descrição, ordem de exibição e status (`active`/`inactive`). Mesma regra de
  permissão: público só vê os `active`; autenticado vê e edita todos.
- **`eventos`** — a Programação (palestras, minicursos, workshops etc.):
  título, descrição, categoria, engenharia vinculada (ou "Geral"), palestrante,
  empresa vinculada (referencia `sponsors`), data início/fim, horário, local,
  limite de vagas, link de inscrição (aponta pra Blumie) e capa. Mesma regra
  de permissão das outras tabelas. Veja "Programação" mais abaixo.

Tudo isso é reforçado por **Row Level Security (RLS)** no Postgres — não é uma
regra só no front-end.

Se precisar recriar o schema em outro projeto Supabase do zero, rode nesta ordem
no SQL Editor: `supabase/schema.sql` (cria as 4 tabelas + RLS) e depois
`supabase/seed_site_content.sql` (popula os textos padrão do site). Ambos os
arquivos estão prontos e são seguros de rodar mais de uma vez (idempotentes).
Se um projeto já tem `posts`/`site_content`/`sponsors` e só falta a
Programação, rode apenas `supabase/eventos.sql`.

### Login do admin — senha única

O `/admin` usa uma **senha única e compartilhada**: qualquer pessoa que souber
essa senha consegue entrar e editar o site — não é preciso e-mail nem criar
uma conta por pessoa.

Por trás dos panos, essa senha aciona uma conta "de serviço" real no Supabase
Auth (assim o banco continua protegido por autenticação de verdade, via RLS —
só o login ficou mais simples). Isso é resolvido inteiramente no servidor
(`src/app/api/admin-login/route.js`); a senha digitada nunca é comparada no
navegador nem aparece no código enviado ao usuário.

Para configurar:

1. Acesse [supabase.com/dashboard](https://supabase.com/dashboard) → projeto `seufabc-2026`
2. **Authentication → Users → Add user**
3. Use exatamente o e-mail e a senha que estão em `ADMIN_ACCOUNT_EMAIL` /
   `ADMIN_ACCOUNT_PASSWORD` no `.env.local.example` (ou gere os seus e ajuste
   as variáveis de ambiente para combinar) — marque **Auto Confirm User**
4. Defina `ADMIN_SHARED_PASSWORD` com a senha que a equipe vai efetivamente
   digitar em `/admin` — essa é a única que precisa ser divulgada ao time
5. Cadastre as três variáveis (`ADMIN_SHARED_PASSWORD`,
   `ADMIN_ACCOUNT_EMAIL`, `ADMIN_ACCOUNT_PASSWORD`) também nas Environment
   Variables da Vercel — **sem** o prefixo `NEXT_PUBLIC_`, então marque como
   **Secret** lá (diferente das duas variáveis do Supabase, que são públicas)

Se um dia quiser trocar a senha da equipe, basta atualizar
`ADMIN_SHARED_PASSWORD` na Vercel e fazer um redeploy — não precisa mexer na
conta de serviço nem no Supabase.

## Rodando localmente

```bash
npm install
cp .env.local.example .env.local   # já vem com URL e chave do projeto Supabase
npm run dev
```

Abra `http://localhost:3000`.

## Publicando no GitHub

```bash
git init
git add .
git commit -m "Site Semana das Engenharias UFABC 2026"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

(Crie o repositório vazio no GitHub antes do último passo, sem README/gitignore
para não conflitar.)

## Publicando na Vercel

1. Em [vercel.com](https://vercel.com), **Add New → Project** e importe o
   repositório do GitHub que você acabou de criar
2. Em **Environment Variables**, adicione as duas variáveis do
   `.env.local.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy — a Vercel detecta Next.js automaticamente, não precisa configurar
   build command nem output directory

Depois do primeiro deploy, todo `git push` na branch principal publica uma
nova versão automaticamente.

## Programação (palestras, minicursos e eventos por engenharia)

Página pública em `/programacao`: uma agenda com abas — "Todos", "Geral" e uma
para cada uma das 8 engenharias — mostrando cartões com título, categoria,
palestrante, data/horário, local, vagas, empresa vinculada (se houver) e um
botão "Inscreva-se" (se houver link de inscrição). Resolve o problema de 20+
palestras cadastradas como posts e "sumindo" lá embaixo na página.

Os campos foram revisados a partir do formulário de atividades da Blumie
(plataforma de inscrições que a equipe já usa):

| Campo (site)          | Equivalente na Blumie          | Observação |
|-----------------------|---------------------------------|------------|
| Título                | Título                          | igual |
| Descrição             | Descrição                       | igual |
| Categoria             | Tipo                             | lista fixa (Palestra, Minicurso, Workshop, Mesa-redonda, Visita técnica, Outro) em vez de texto livre |
| Data início / fim     | Data início / Data fim          | igual |
| Horário início / fim  | Hora início / Hora fim          | igual |
| Local                 | Local                           | igual |
| Limite de vagas       | Limite de vagas                | igual |
| Empresa vinculada     | Empresa vinculada               | reaproveita a tabela `sponsors` já existente (mostra logo no card) |
| Imagem de capa        | Logo da atividade                | igual |
| Engenharia            | —                                | campo próprio do site, não existe na Blumie |
| Palestrante           | —                                | campo próprio do site, não existe na Blumie |
| Link de inscrição     | —                                | URL da página do evento na Blumie, vira o botão "Inscreva-se" |

Ficaram de fora por não fazer sentido fora da Blumie: **Modo de check-in**,
**Inscrição automática ao inscrever no evento pai** (específicos do fluxo de
check-in/venda de ingresso da Blumie).

Por trás, cada evento fica na tabela `eventos` (schema em `supabase/eventos.sql`
— migration incremental, não mexe nas outras tabelas) e é gerenciado pela aba
**Programação** do `/admin` (criar, editar, publicar, despublicar e excluir —
igual às outras seções).

**Configuração (uma vez só):**

1. No [dashboard do Supabase](https://supabase.com/dashboard), abra o projeto
   do site → **SQL Editor** → **New query**
2. Cole o conteúdo de `supabase/eventos.sql` e rode (`Run`) — se você já rodou
   `supabase/schema.sql` inteiro (por exemplo, criando o projeto do zero), pode
   pular este passo: a tabela `eventos` já vem incluída nele.
3. Pronto — a aba **Programação** no `/admin` e a página `/programacao` já
   funcionam, sem precisar mexer em variável de ambiente nenhuma

## Criando um projeto Supabase do zero (para testar localmente sem mexer no site publicado)

Se você não tem as credenciais do Supabase já usado em produção, é mais simples
(e mais seguro) criar seu próprio projeto Supabase gratuito só para testes:

1. Crie uma conta em [supabase.com](https://supabase.com) e clique em
   **New project** (região São Paulo `sa-east-1` deixa tudo mais rápido, mas
   qualquer região funciona)
2. Depois que o projeto for criado, vá em **SQL Editor → New query**, cole o
   conteúdo de `supabase/schema.sql` e rode (`Run`) — cria as 4 tabelas
   (`posts`, `site_content`, `sponsors`, `eventos`) já com RLS configurado
3. Ainda no SQL Editor, rode `supabase/seed_site_content.sql` — popula os
   textos padrão do site (hero, evento, notícias, patrocinadores, rodapé e as
   8 engenharias), para não começar com tudo em branco. ⚠️ Só rode isso em um
   projeto **novo/vazio** — em um projeto que já tem conteúdo editado pelo
   admin, esse script sobrescreve tudo de volta pro texto padrão.
4. Em **Project Settings → API**, copie a **Project URL** e a chave pública
   (pode aparecer como **anon public** ou **publishable key**, dependendo de
   quando o projeto foi criado — são a mesma coisa)
5. Crie o usuário do admin: **Authentication → Users → Add user**, com um
   e-mail e senha à sua escolha, marcando **Auto Confirm User**
6. Copie `.env.local.example` para `.env.local` e preencha:
   - `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` (passo 4 —
     use o valor da chave pública ali, mesmo que o dashboard chame de
     "publishable key")
   - `ADMIN_ACCOUNT_EMAIL` / `ADMIN_ACCOUNT_PASSWORD` (o usuário do passo 5)
   - `ADMIN_SHARED_PASSWORD` (a senha que você vai digitar em `/admin` — pode
     ser qualquer uma, ela não precisa ser igual à senha real da conta)
7. `npm install && npm run dev`, abra `http://localhost:3000/admin` e entre
   com a `ADMIN_SHARED_PASSWORD` que você definiu

A partir daqui esse projeto Supabase é totalmente seu e independente do site
publicado — pode testar a programação, posts etc. à vontade. Quando quiser
levar as mudanças pro site real, é só rodar o mesmo SQL (ou só a parte nova)
no Supabase de produção e fazer o `git push` de costume.

## O que é editável pelo admin

Em `/admin`, depois de logar:

- **Programação** — criar/editar/publicar/despublicar/excluir palestras, minicursos e eventos, com engenharia, palestrante, empresa vinculada, data/horário, local, vagas e link de inscrição
- **Notícias** — cabeçalho da seção + criar/editar/publicar/despublicar/excluir posts
- **Início** — selo, título, subtítulo, textos dos botões, data e local
- **O Evento** — textos de "O Evento" e "Responsabilidade Social"
- **Engenharias** — nome, campus, perfil do curso e áreas de atuação de cada um dos 8 cursos
- **Patrocinadores** — cabeçalho da seção + cadastrar/editar/ativar-ocultar/excluir empresas patrocinadoras (nome, logo, site, categoria)
- **Rodapé** — nome exibido, descrição, e-mail e endereço

## Notas

- A fonte Metropolis está incluída em `src/fonts/` sob licença SIL Open Font
  License (arquivo `LICENSE.txt` na mesma pasta) — pode ser usada comercialmente.
- As imagens de capa dos posts e os logos dos patrocinadores são informados
  por URL (não há upload de arquivo neste momento). Se quiser upload direto
  pelo admin, dá para adicionar Supabase Storage depois.

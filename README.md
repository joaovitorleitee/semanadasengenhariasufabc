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
  `footer`, `engenharias`), com o conteúdo em JSON. Leitura pública liberada
  para todo mundo; escrita exige estar autenticado.

Tudo isso é reforçado por **Row Level Security (RLS)** no Postgres — não é uma
regra só no front-end.

Se precisar recriar o schema em outro projeto Supabase do zero, as migrations
aplicadas foram (nesta ordem): criação das tabelas + RLS, seed de conteúdo e
correção de `search_path` da função de trigger. Peça para o Claude regenerar
o SQL caso precise.

### Criar o usuário administrador

Não existe mais senha fixa no código — o login do `/admin` usa e-mail e senha
reais via Supabase Auth. Para criar o primeiro administrador:

1. Acesse [supabase.com/dashboard](https://supabase.com/dashboard) → projeto `seufabc-2026`
2. **Authentication → Users → Add user**
3. Preencha e-mail e senha, marque **Auto Confirm User**
4. Pronto — essa conta já consegue entrar em `/admin`

Repita para cada pessoa que for administrar o site. Não há tela de
autocadastro pública (por segurança), então só quem tiver conta criada assim
consegue editar o conteúdo.

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

## O que é editável pelo admin

Em `/admin`, depois de logar:

- **Notícias** — cabeçalho da seção + criar/editar/publicar/despublicar/excluir posts
- **Início** — selo, título, subtítulo, textos dos botões, data e local
- **O Evento** — textos de "O Evento" e "Responsabilidade Social"
- **Engenharias** — nome, campus, perfil do curso e áreas de atuação de cada um dos 8 cursos
- **Rodapé** — nome exibido, descrição, e-mail e endereço

## Notas

- A fonte Metropolis está incluída em `src/fonts/` sob licença SIL Open Font
  License (arquivo `LICENSE.txt` na mesma pasta) — pode ser usada comercialmente.
- As imagens de capa dos posts são informadas por URL (não há upload de
  arquivo neste momento). Se quiser upload direto, dá para adicionar
  Supabase Storage depois.

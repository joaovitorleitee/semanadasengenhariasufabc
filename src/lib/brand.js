// ============================================================================
// brand.js — Tokens visuais e conteúdo padrão do site (Manual de Marca SEUFABC 2026)
// ============================================================================
// Este arquivo centraliza:
//  1) BRAND            → as cores/tokens usados em todo o site.
//  2) CATEGORIES, SPONSOR_TIERS, EVENT_CATEGORIES, EVENT_LEVELS → listas fixas
//     usadas em formulários e filtros.
//  3) EVENT_CATEGORY_COLORS → cor de cada selo de categoria na Programação.
//  4) DEFAULT_CONTENT → textos padrão exibidos enquanto os dados reais não
//     chegam do Supabase (ou quando ainda não foram cadastrados).
//  5) Funções utilitárias de formatação de data/hora e slug.
//
// MODO ESCURO: para que o site inteiro reaja à alternância de tema sem
// precisar editar cor por cor em cada componente, boa parte dos valores
// abaixo não é mais um HEX fixo, e sim uma referência a uma "CSS variable"
// (ex: "var(--text)"). Essas variáveis são definidas em globals.css, com um
// valor para o tema claro (:root) e outro para o tema escuro
// ([data-theme="dark"]) — o navegador troca o valor sozinho, sem precisar
// de nenhum JavaScript.
// ============================================================================

export const BRAND = {
  // --- Cores "de marca" (verde e amarelo do manual) ------------------------
  // Estas cores permanecem EXATAMENTE as mesmas nos dois temas, de propósito:
  // são usadas em fundos sólidos, botões, ícones e emblemas — elementos
  // decorativos — então não faz sentido (e o usuário pediu para não) suavizar
  // ou trocar o verde/amarelo da marca.
  green: "#00593B",        // Verde principal (fundos, botões, bordas de destaque)
  greenDark: "#013D28",     // Verde mais escuro (fundo do rodapé, do hero, gradientes)
  greenAccent: "#009B01",   // Verde de apoio, usado em alguns detalhes
  yellow: "#FFD300",        // Amarelo da marca (badges, destaques, hover)

  // --- Cores "neutras" da interface -----------------------------------------
  // Estas SIM mudam de valor entre tema claro/escuro (a troca acontece via
  // CSS, olhando globals.css). Usadas para texto comum, fundo de página,
  // fundo de cartões e bordas.
  ink: "var(--text)",       // Cor de texto padrão do corpo do site
  white: "var(--surface)",  // Fundo de cartões/superfícies (branco no claro, quase-preto no escuro)
  bg: "var(--bg)",          // Fundo geral da página
  border: "var(--border)",  // Cor de borda padrão (divisórias, contornos de card)

  // --- Tokens adaptativos para TEXTO sobre fundo da página -------------------
  // Diferente de "green"/"greenDark" acima (que são fundos fixos), estes dois
  // tokens são usados quando o VERDE aparece como cor de TEXTO (títulos,
  // ícones, links, rótulos) em cima do fundo da página, que muda de claro
  // para escuro. Por isso eles precisam se ajustar: no tema escuro viram um
  // verde mais claro/suave (nunca neon), garantindo leitura confortável.
  accentText: "var(--accent-text)", // Verde usado como cor de texto/ícone (rótulos, links, ícones)
  heading: "var(--heading)",        // Verde usado em títulos (h2, h3, nomes de card)
};

// Categorias usadas no formulário de posts/notícias do painel admin.
export const CATEGORIES = ["Comunicado", "Palestra", "Minicurso", "Patrocínio", "Ação Social", "Geral"];

// Níveis de patrocínio, do maior para o menor.
export const SPONSOR_TIERS = ["Diamante", "Ouro", "Prata", "Bronze", "Apoio", "Cobre"];

// Categorias usadas na Programação (agenda de palestras/minicursos/eventos).
export const EVENT_CATEGORIES = ["Palestra", "Minicurso", "Workshop", "Mesa-redonda", "Visita técnica", "Outro"];

// Público-alvo de cada evento da programação.
export const EVENT_LEVELS = ["Graduação", "Pós-Graduação", "Geral"];

// ----------------------------------------------------------------------------
// Cor de cada selo de categoria de evento (usado nos cards da Programação).
// Cada categoria tem 3 cores: "bg" (fundo do selo), "fg" (cor do texto) e
// "border" (contorno). Assim como em BRAND, os valores agora são variáveis
// CSS (ex: "var(--cat-palestra-bg)") em vez de HEX fixo, para que cada selo
// tenha uma versão clara e uma versão escura definidas em globals.css — no
// tema escuro os tons ficam mais fechados/escuros (em vez de pastéis bem
// claros), o que evita um selo muito claro "brilhando" sobre o fundo escuro.
// ----------------------------------------------------------------------------
export const EVENT_CATEGORY_COLORS = {
  "Palestra": { bg: "var(--cat-palestra-bg)", fg: "var(--cat-palestra-fg)", border: "var(--cat-palestra-border)" },
  "Minicurso": { bg: "var(--cat-minicurso-bg)", fg: "var(--cat-minicurso-fg)", border: "var(--cat-minicurso-border)" },
  "Workshop": { bg: "var(--cat-workshop-bg)", fg: "var(--cat-workshop-fg)", border: "var(--cat-workshop-border)" },
  "Mesa-redonda": { bg: "var(--cat-mesa-bg)", fg: "var(--cat-mesa-fg)", border: "var(--cat-mesa-border)" },
  "Visita técnica": { bg: "var(--cat-visita-bg)", fg: "var(--cat-visita-fg)", border: "var(--cat-visita-border)" },
  "Outro": { bg: "var(--cat-outro-bg)", fg: "var(--cat-outro-fg)", border: "var(--cat-outro-border)" },
};

// ----------------------------------------------------------------------------
// DEFAULT_CONTENT
// Conteúdo de "fallback": o que aparece na tela ANTES dos dados reais
// chegarem do Supabase (enquanto carrega) ou quando uma seção ainda não foi
// preenchida na tabela site_content pelo painel admin. Isso evita que a
// página fique com espaços em branco ou "undefined" durante o carregamento.
// Nenhuma cor aqui — é só texto — por isso não precisou de nenhum ajuste
// para o modo escuro.
// ----------------------------------------------------------------------------
export const DEFAULT_CONTENT = {
  hero: {
    badge: "UFABC · 2026",
    title: "Semana das Engenharias",
    subtitle:
      "Cinco dias de palestras, minicursos e trocas entre estudantes, pesquisadores, profissionais e empresas nas oito engenharias da UFABC — do ensino médio ao mercado de trabalho.",
    ctaPrimary: "Conheça as engenharias",
    ctaSecondary: "Ver notícias",
    date: "Dia 21 a 25 de setembro de 2026",
    local: "Campus Santo André",
  },
  evento: {
    eyebrow: "O EVENTO",
    title: "Integração entre academia, mercado e comunidade",
    paragraph1:
      "A Semana das Engenharias (SEUFABC) ocorre anualmente, organizada pelo Diretório das Engenharias com apoio do CECS. O evento tem caráter acadêmico e extensionista, aproximando estudantes, profissionais e pesquisadores de diferentes áreas e níveis, além da comunidade externa.",
    paragraph2:
      "A programação reúne palestras, minicursos e atividades específicas para cada uma das oito engenharias da UFABC, além de palestras gerais abertas a todo o público.",
    socialTitle: "RESPONSABILIDADE SOCIAL",
    socialText:
      "Por tradição, a Semana das Engenharias realiza ações sociais que colocam em prática seu caráter de extensão universitária — ao longo das edições, parcerias já apoiaram instituições beneficentes com doações a orfanatos e asilos.",
  },
  noticias: {
    eyebrow: "ACOMPANHE",
    title: "Notícias e comunicados",
  },
  patrocinadores: {
    eyebrow: "PARCEIROS",
    title: "Quem apoia a Semana das Engenharias",
    subtitle: "Empresas e instituições que tornam o evento possível.",
  },
  footer: {
    title: "SEMANA DAS ENGENHARIAS DA UFABC",
    description:
      "Evento acadêmico e extensionista que conecta estudantes, pesquisadores, profissionais e empresas nas oito engenharias da UFABC.",
    email: "seufabc@ufabc.edu.br",
    address: "Campus Santo André",
  },
  // Lista com as 8 engenharias da UFABC, cada uma com número, nome, campus,
  // um resumo do perfil do curso e as áreas de atuação do profissional
  // formado. Usada pela seção "Engenharias" da home.
  engenharias: [
    {
      n: "01", nome: "Engenharia Aeroespacial", campus: "São Bernardo do Campo (SBC)",
      perfil: ["Formação em física, matemática, materiais e mecânica dos fluidos", "Base em aerodinâmica, termodinâmica e instrumentação", "Ingresso via Bacharelado em Ciência e Tecnologia (BC&T)"],
      areas: ["Projeto, construção e manutenção de aeronaves e veículos espaciais", "Operação de satélites e foguetes", "Gerenciamento de tráfego aéreo e atividades espaciais", "Setores automobilístico, eletrônico e de comunicações"],
    },
    {
      n: "02", nome: "Engenharia Ambiental e Urbana", campus: "Santo André (SA)",
      perfil: ["Diagnóstico e projetos para sistemas ambientais e urbanos", "Avaliações técnicas, socioeconômicas e de impacto", "Ingresso via Bacharelado em Ciência e Tecnologia (BC&T)"],
      areas: ["Órgãos públicos federais, estaduais e municipais", "Agências reguladoras e concessionárias de serviços públicos", "Organizações não governamentais e agências de cooperação", "Consultoria ambiental e atuação autônoma"],
    },
    {
      n: "03", nome: "Engenharia Biomédica", campus: "São Bernardo do Campo (SBC)",
      perfil: ["Desenvolvimento de tecnologias para a área da saúde", "Instrumentação biomédica e dispositivos médico-hospitalares", "Ingresso via Bacharelado em Ciência e Tecnologia (BC&T)"],
      areas: ["Indústria de equipamentos de diagnóstico e terapia", "Órteses, próteses e órgãos artificiais", "Tecnologias de reabilitação", "Engenharia clínica e gestão de tecnologia em saúde"],
    },
    {
      n: "04", nome: "Engenharia de Energia", campus: "Santo André (SA)",
      perfil: ["Fontes de energia renováveis e não renováveis", "Conversão energética e planejamento do setor", "Ingresso via Bacharelado em Ciência e Tecnologia (BC&T)"],
      areas: ["Empresas de geração, transmissão e distribuição de energia", "Instituições governamentais e centros de pesquisa", "Indústrias siderúrgicas, alimentícias e agroindustriais", "Gestão de sistemas energéticos e uso racional de energia"],
    },
    {
      n: "05", nome: "Engenharia de Gestão", campus: "São Bernardo do Campo (SBC)",
      perfil: ["Gestão de sistemas de produção e operações", "Integração de pessoas, materiais, informações e energia", "Ingresso via Bacharelado em Ciência e Tecnologia (BC&T)"],
      areas: ["Gestão e melhoria de processos produtivos", "Empresas e organizações de diversos segmentos", "Projetos de implantação e tomada de decisão", "Consultoria empresarial e corporativa"],
    },
    {
      n: "06", nome: "Engenharia de Informação", campus: "Santo André (SA)",
      perfil: ["Processamento, transmissão e segurança da informação", "Redes de comunicação e sistemas multimídia", "Ingresso via Bacharelado em Ciência e Tecnologia (BC&T)"],
      areas: ["Projeto e análise de sistemas de informação", "Redes de computadores e telecomunicações", "Segurança da informação", "Empresas de tecnologia e infraestrutura de TI"],
    },
    {
      n: "07", nome: "Engenharia de Instrumentação, Automação e Robótica", campus: "Santo André (SA)",
      perfil: ["Projeto e dimensionamento de sistemas de controle", "Automação de processos industriais e robótica", "Ingresso via Bacharelado em Ciência e Tecnologia (BC&T)"],
      areas: ["Desenvolvimento de equipamentos e sistemas de produção", "Manutenção de sistemas de controle e automação", "Configuração e análise de processos industriais", "Indústrias que exigem mão de obra especializada em automação"],
    },
    {
      n: "08", nome: "Engenharia de Materiais", campus: "Santo André (SA)",
      perfil: ["Materiais poliméricos, cerâmicos e metálicos", "Processamento, caracterização e reciclagem de materiais", "Ingresso via Bacharelado em Ciência e Tecnologia (BC&T)"],
      areas: ["Pesquisa e desenvolvimento de novos materiais", "Produção, inspeção e controle de qualidade", "Seleção e avaliação de desempenho de materiais", "Indústrias de materiais avançados e compósitos"],
    },
  ],
};

// ----------------------------------------------------------------------------
// deepMergeDefaults(base, saved)
// Combina o conteúdo padrão (DEFAULT_CONTENT) com o conteúdo salvo pelo
// usuário no painel admin (vindo do Supabase). Para cada campo:
//  - se for uma lista (array) e "saved" tiver itens, usa a lista salva;
//    senão mantém a lista padrão.
//  - se for um objeto, mescla campo a campo (o que estiver salvo sobrescreve
//    o padrão, o que não estiver salvo mantém o padrão).
//  - se for um valor simples (texto), usa o salvo se existir, senão o padrão.
// Isso garante que a página nunca fique "quebrada" por falta de algum campo.
// ----------------------------------------------------------------------------
export function deepMergeDefaults(base, saved) {
  if (!saved || typeof saved !== "object") return base; // Sem dados salvos: usa só o padrão
  const out = { ...base };
  for (const key of Object.keys(base)) {
    if (Array.isArray(base[key])) {
      // Lista: usa a salva só se ela existir e não estiver vazia
      out[key] = Array.isArray(saved[key]) && saved[key].length > 0 ? saved[key] : base[key];
    } else if (typeof base[key] === "object" && base[key] !== null) {
      // Objeto: mescla campo a campo (padrão + salvo, salvo tem prioridade)
      out[key] = { ...base[key], ...(saved[key] || {}) };
    } else {
      // Valor simples: usa o salvo se a chave existir em "saved"
      out[key] = key in saved ? saved[key] : base[key];
    }
  }
  return out;
}

// Formata uma data ISO (ex: "2026-09-23T00:00:00") para "23 set 2026".
export function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return ""; // Data inválida/ausente: não quebra a página, só mostra vazio
  }
}

// Formata "14:30:00" (como vem do Postgres) para "14:30".
export function fmtTime(t) {
  if (!t) return "";
  return t.slice(0, 5);
}

// "2026-09-23" -> "qua, 23 set". Usado nos cards da Programação.
export function fmtDateShort(iso) {
  if (!iso) return "";
  try {
    const d = new Date(`${iso}T00:00:00`);
    return d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" });
  } catch {
    return "";
  }
}

// Mostra "23 set" ou, se o evento passa de um dia, "23–25 set".
export function fmtDateRange(inicio, fim) {
  if (!inicio) return "";
  const a = fmtDateShort(inicio);
  if (!fim || fim === inicio) return a; // Evento de um dia só: mostra uma data
  const b = fmtDateShort(fim);
  return `${a} – ${b}`; // Evento de vários dias: mostra o intervalo
}

// Transforma um texto (ex: título de post) em "slug" para URL amigável,
// removendo acentos, espaços e caracteres especiais.
// Ex: "Notícia Importante!" -> "noticia-importante"
export function slugify(text) {
  return text
    .toString()
    .normalize("NFD")                  // Separa letras de seus acentos (é -> e + ́)
    .replace(/[\u0300-\u036f]/g, "")    // Remove os acentos já separados
    .toLowerCase()                      // Tudo minúsculo
    .trim()                             // Remove espaços nas pontas
    .replace(/[^a-z0-9]+/g, "-")        // Troca qualquer coisa que não seja letra/número por "-"
    .replace(/(^-|-$)+/g, "");          // Remove "-" sobrando no início/fim
}

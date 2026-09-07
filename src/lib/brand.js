// Tokens visuais — Manual de Marca SEUFABC 2026
export const BRAND = {
  green: "#00593B",
  greenDark: "#013D28",
  greenAccent: "#009B01",
  yellow: "#FFD300",
  ink: "#202020",
  white: "#FFFFFF",
  bg: "#F6F8F6",
  border: "#DDE6E0",
};

export const CATEGORIES = ["Comunicado", "Palestra", "Minicurso", "Patrocínio", "Ação Social", "Geral"];
export const SPONSOR_TIERS = ["Diamante", "Ouro", "Prata", "Bronze", "Apoio", "Cobre"];

// Categorias usadas na Programação (agenda de palestras/minicursos/eventos).
export const EVENT_CATEGORIES = ["Palestra", "Minicurso", "Workshop", "Mesa-redonda", "Visita técnica", "Outro"];

// Cor de cada categoria de evento, usada nos selos da agenda.
export const EVENT_CATEGORY_COLORS = {
  "Palestra": { bg: "#E7F5EC", fg: "#00593B", border: "#BFE3CC" },
  "Minicurso": { bg: "#FFF7D6", fg: "#7A6400", border: "#F0E1A0" },
  "Workshop": { bg: "#E7F0FF", fg: "#1D4C9B", border: "#C3D8FA" },
  "Mesa-redonda": { bg: "#F3E8FF", fg: "#6B21A8", border: "#E1C9FB" },
  "Visita técnica": { bg: "#FFE9DC", fg: "#9A4A11", border: "#F6CBAA" },
  "Outro": { bg: "#F1F1F1", fg: "#555", border: "#DADADA" },
};

// Usado apenas como fallback enquanto os dados carregam do Supabase ou caso
// uma seção ainda não exista na tabela site_content.
export const DEFAULT_CONTENT = {
  hero: {
    badge: "UFABC · 2026",
    title: "Semana das Engenharias",
    subtitle:
      "Cinco dias de palestras, minicursos e trocas entre estudantes, pesquisadores, profissionais e empresas nas oito engenharias da UFABC — do ensino médio ao mercado de trabalho.",
    ctaPrimary: "Conheça as engenharias",
    ctaSecondary: "Ver notícias",
    date: "Dia 21 a 25 de setembro de 2026",
    local: "Campus somente de Santo André",
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
    address: "Campus Santo André e São Bernardo do Campo",
  },
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

export function deepMergeDefaults(base, saved) {
  if (!saved || typeof saved !== "object") return base;
  const out = { ...base };
  for (const key of Object.keys(base)) {
    if (Array.isArray(base[key])) {
      out[key] = Array.isArray(saved[key]) && saved[key].length > 0 ? saved[key] : base[key];
    } else if (typeof base[key] === "object" && base[key] !== null) {
      out[key] = { ...base[key], ...(saved[key] || {}) };
    } else {
      out[key] = key in saved ? saved[key] : base[key];
    }
  }
  return out;
}

export function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return "";
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
  if (!fim || fim === inicio) return a;
  const b = fmtDateShort(fim);
  return `${a} – ${b}`;
}

export function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

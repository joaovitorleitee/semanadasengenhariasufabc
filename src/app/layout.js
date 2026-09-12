import localFont from "next/font/local";
import { League_Spartan } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import ThemeProvider from "@/components/ThemeProvider"; // Provedor do tema claro/escuro (contexto React)
import "./globals.css"; // Estilos globais + variáveis de cor dos dois temas

// ============================================================================
// layout.js — Layout raiz do site (Next.js App Router)
// Este componente envolve TODAS as páginas do site. É o lugar certo para:
//   - carregar fontes (aplicadas via CSS variables no <html>)
//   - definir metadados globais (título/descrição usados por buscadores)
//   - colocar providers que precisam envolver a aplicação inteira, como o
//     ThemeProvider (tema claro/escuro) e o Analytics.
// ============================================================================

// Corpo: Metropolis (SIL OFL) — alternativa livre à Gotham pedida no manual de marca.
// localFont carrega arquivos de fonte que ficam dentro do próprio projeto
// (src/fonts), sem depender de conexão com a internet em produção.
const metropolis = localFont({
  src: [
    { path: "../fonts/Metropolis-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/Metropolis-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/Metropolis-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/Metropolis-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../fonts/Metropolis-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-metropolis", // Fica disponível em todo o CSS como var(--font-metropolis)
  display: "swap",
});

// Títulos: League Spartan, conforme o Manual de Marca. Esta vem do Google
// Fonts (next/font/google baixa e otimiza a fonte automaticamente).
const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-league-spartan",
  display: "swap",
});

// Metadados usados pelo Next.js para preencher a tag <title> e a meta
// "description" do HTML — importante para SEO e para o preview ao
// compartilhar o link em redes sociais.
export const metadata = {
  title: "Semana das Engenharias UFABC 2026",
  description:
    "Cinco dias de palestras, minicursos e trocas entre estudantes, pesquisadores, profissionais e empresas nas oito engenharias da UFABC.",
};

// Componente de layout raiz: recebe "children", que é o conteúdo da página
// atual (ex: a Home, a página de Programação etc.), e o envolve com a
// estrutura HTML base (html/body), fontes, tema e analytics.
export default function RootLayout({ children }) {
  return (
    // As classes com .variable disponibilizam as CSS variables das fontes
    // (--font-metropolis, --font-league-spartan) para todo o site.
    <html lang="pt-BR" className={`${metropolis.variable} ${leagueSpartan.variable}`}>
      <head>
        {/* Script "anti-flash de tema": roda ANTES da página ser pintada
            na tela (por isso fica no <head>, fora do fluxo normal do
            React). Sem ele, a página sempre nasceria no tema claro por
            uma fração de segundo antes do ThemeProvider (React) aplicar o
            tema escuro salvo — um "flash" branco incômodo. Aqui a lógica
            é a mesma do ThemeProvider: usa o tema salvo no localStorage,
            ou a preferência do sistema, e já aplica direto no <html>. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem("seufabc-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                document.documentElement.setAttribute("data-theme", t);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        {/* ThemeProvider envolve todo o conteúdo do site, para que
            qualquer página/componente consiga ler e alternar o tema
            através do hook useTheme(). */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {/* Componente da Vercel que coleta métricas de uso (visitas),
            sem relação com o conteúdo visual da página. */}
        <Analytics />
      </body>
    </html>
  );
}

"use client";
// Roda no navegador: usa o hook useTheme() (que por sua vez usa useContext)
// e responde a cliques do usuário.

import { Sun, Moon } from "lucide-react"; // Ícones de sol (tema claro) e lua (tema escuro)
import { useTheme } from "./ThemeProvider"; // Hook que dá acesso ao tema atual e à função de troca

// ============================================================================
// ThemeToggle.js — Botão redondo que alterna entre tema claro e escuro.
// É usado dentro do SiteHeader.js (tanto no menu desktop quanto no mobile).
// ============================================================================
export default function ThemeToggle({ style }) {
  // Lê do contexto global (ThemeProvider) o tema atual e a função para
  // trocá-lo. Assim, não importa em qual página o botão apareça: ele
  // sempre reflete e controla o MESMO tema do site inteiro.
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme} // Ao clicar, chama a função que inverte o tema
      className="theme-toggle" // Estilo (tamanho, borda, cores) definido em globals.css
      style={style} // Permite ajustes pontuais de posição (ex: margem) vindos de quem usa o componente
      // aria-label/title: texto lido por leitores de tela e exibido como
      // dica ao passar o mouse — sempre descrevem a AÇÃO do botão (para
      // onde ele vai mudar), não o estado atual.
      aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
      title={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
    >
      {/* Se o tema atual é escuro, mostra o ícone de sol (convidando a
          voltar para o claro); senão, mostra a lua (convidando a ir para
          o escuro). */}
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

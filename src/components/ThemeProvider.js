"use client";
// Diretiva do Next.js: este arquivo roda no navegador, pois usa hooks de
// estado/efeito (useState, useEffect) e acessa APIs do navegador
// (localStorage, matchMedia, document) que não existem no servidor.

import { createContext, useContext, useEffect, useState } from "react";

// ============================================================================
// ThemeProvider.js — Contexto React responsável por controlar o tema
// claro/escuro do site inteiro.
//
// Como funciona, em resumo:
//   1) Ao carregar a página, decide o tema inicial (o que estava salvo no
//      navegador, ou a preferência do sistema operacional, ou "light").
//   2) Guarda esse tema em um "data-theme" no elemento <html> — é esse
//      atributo que o globals.css usa para escolher a paleta de cores certa.
//   3) Expõe uma função toggleTheme() que qualquer componente da árvore
//      pode chamar (via o hook useTheme()) para trocar entre claro/escuro.
//   4) Salva a escolha no localStorage, para lembrar na próxima visita.
// ============================================================================

// Cria o "contexto" do React: um jeito de compartilhar dados (aqui, o tema
// atual e a função de troca) entre componentes sem precisar passar props
// manualmente por cada nível da árvore. Valor padrão usado só se algum
// componente tentar ler o contexto fora do <ThemeProvider>.
const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

// Hook de conveniência: em vez de todo componente importar useContext +
// ThemeContext, ele só chama useTheme() e recebe { theme, toggleTheme }.
export function useTheme() {
  return useContext(ThemeContext);
}

// Componente "provedor": deve envolver toda a aplicação (feito em
// src/app/layout.js), para que qualquer página/componente filho consiga
// acessar o tema atual.
export default function ThemeProvider({ children }) {
  // Estado local com o tema atual ("light" ou "dark"). Começa em "light"
  // apenas como valor inicial "seguro" para a primeira renderização no
  // servidor — o valor real é definido logo em seguida, no useEffect.
  const [theme, setTheme] = useState("light");

  // Executa uma única vez, assim que o componente é montado no navegador
  // (array de dependências vazio: []). Aqui é onde descobrimos o tema
  // "de verdade" a ser usado:
  //   - Se o usuário já escolheu um tema antes, ele fica salvo em
  //     localStorage sob a chave "seufabc-theme" — usamos esse valor.
  //   - Senão, perguntamos ao sistema operacional/navegador se ele prefere
  //     tema escuro (window.matchMedia) e seguimos essa preferência.
  useEffect(() => {
    const saved = window.localStorage.getItem("seufabc-theme");
    const initial = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial); // Atualiza o estado do React
    document.documentElement.setAttribute("data-theme", initial); // Atualiza o <html data-theme="...">
  }, []);

  // Função chamada pelo botão de alternância (ThemeToggle.js). Inverte o
  // tema atual, atualiza o atributo no <html> (para o CSS reagir na hora)
  // e salva a escolha no localStorage (para lembrar na próxima visita).
  function toggleTheme() {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      window.localStorage.setItem("seufabc-theme", next);
      return next; // Vira o novo valor de "theme" no estado do React
    });
  }

  // Disponibiliza { theme, toggleTheme } para todos os componentes dentro
  // de <ThemeProvider>...</ThemeProvider> (ou seja, o site inteiro).
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

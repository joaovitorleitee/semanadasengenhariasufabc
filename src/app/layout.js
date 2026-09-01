import localFont from "next/font/local";
import { League_Spartan } from "next/font/google";
import "./globals.css";

// Corpo: Metropolis (SIL OFL) — alternativa livre à Gotham pedida no manual de marca.
const metropolis = localFont({
  src: [
    { path: "../fonts/Metropolis-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/Metropolis-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/Metropolis-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/Metropolis-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../fonts/Metropolis-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-metropolis",
  display: "swap",
});

// Títulos: League Spartan, conforme o Manual de Marca.
const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-league-spartan",
  display: "swap",
});

export const metadata = {
  title: "Semana das Engenharias UFABC 2026",
  description:
    "Cinco dias de palestras, minicursos e trocas entre estudantes, pesquisadores, profissionais e empresas nas oito engenharias da UFABC.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${metropolis.variable} ${leagueSpartan.variable}`}>
      <body>{children}</body>
    </html>
  );
}

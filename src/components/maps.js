import { BRAND } from "@/lib/brand";

// ============================================================================
// maps.js — Bloco de localização exibido na home: título, endereço e um
// mapa do Google Maps incorporado (iframe) mostrando o campus da UFABC.
//
// MODO ESCURO: os títulos usam BRAND.heading (verde adaptável — claro no
// tema claro, mais suave no escuro), em vez do BRAND.greenDark fixo de
// antes, pois são texto sobre o fundo normal da página. A borda do iframe
// continua com BRAND.greenDark fixo: é um contorno decorativo ao redor do
// próprio mapa do Google (que sempre tem fundo claro), então não precisa
// se adaptar.
// ============================================================================
export default function Maps() {
  return (
    <>
      <h3 style={{ textAlign: 'center', fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 30, color: BRAND.heading, margin: "8px 0 26px" }}>Localização</h3>
      <p style={{ textAlign: 'center', fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 25, color: BRAND.heading, margin: "8px 0 26px"}}>UFABC - Campus Santo André </p>
      <p style={{ textAlign: 'center', fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 20, color: BRAND.heading, margin: "8px 0 26px"}}>R. Abolição, S/N - Vila São Pedro, Santo André - SP, 09210-180</p>

      {/* Centraliza o mapa horizontalmente */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {/* Mapa do Google Maps incorporado via iframe. Usa o formato
            "?q=ENDEREÇO&output=embed" (em vez do formato "pb=..." anterior,
            que apontava fixo pras coordenadas de um pino específico do
            Google): assim o Google geocodifica o endereço em texto acima
            diretamente, então texto e mapa nunca ficam desencontrados —
            se o endereço mudar de novo no futuro, basta trocar a string
            abaixo, sem precisar gerar um novo link "pb=" no Google Maps. */}
        <iframe
          src="https://www.google.com/maps?q=R.%20Aboli%C3%A7%C3%A3o%2C%20S/N%20-%20Vila%20Sao%20Pedro%2C%20Santo%20Andr%C3%A9%20-%20SP%2C%2009210-180&output=embed"
          width="600"
          height="450"
          // Borda decorativa verde-escura fixa ao redor do mapa — o
          // conteúdo do próprio mapa (renderizado pelo Google) sempre tem
          // fundo claro, então a borda não precisa se adaptar ao tema.
          style={{ borderWidth: 7, borderStyle: "solid", borderColor: BRAND.greenDark, borderRadius: 25 }}
          allowFullScreen={true}
          loading="lazy" // Só carrega o mapa quando ele estiver perto de aparecer na tela
          referrerPolicy="strict-origin-when-cross-origin" // Boa prática de privacidade ao carregar conteúdo externo
        >
        </iframe>
      </div>
    </>
  );
}

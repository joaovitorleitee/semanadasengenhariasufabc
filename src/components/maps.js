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
      <p style={{ textAlign: 'center', fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 20, color: BRAND.heading, margin: "8px 0 26px"}}>Av. dos Estados, 5001 </p>

      {/* Centraliza o mapa horizontalmente */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {/* Mapa do Google Maps incorporado via iframe, apontando para as
            coordenadas do campus Santo André da UFABC. */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58479.61457264557!2d-46.576052249467566!3d-23.64103371850036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce4297b7880d57%3A0xaeddba2a824280b6!2sUFABC%20-%20Universidade%20Federal%20do%20ABC!5e0!3m2!1spt-BR!2sbr!4v1788548634181!5m2!1spt-BR!2sbr"
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

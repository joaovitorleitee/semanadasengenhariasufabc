import { BRAND } from "@/lib/brand";

export default function Maps() {
  return (<>
<h3 style={{ textAlign: 'center', fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 30, color: BRAND.greenDark, margin: "8px 0 26px" }}>Localização</h3>
<p style={{ textAlign: 'center', fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 25, color: BRAND.greenDark, margin: "8px 0 26px"}}>UFABC - Campus Santo André </p>
<p style={{ textAlign: 'center', fontFamily: "var(--font-league-spartan), sans-serif", fontSize: 20, color: BRAND.greenDark, margin: "8px 0 26px"}}>Av. dos Estados, 5001 </p>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58479.61457264557!2d-46.576052249467566!3d-23.64103371850036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce4297b7880d57%3A0xaeddba2a824280b6!2sUFABC%20-%20Universidade%20Federal%20do%20ABC!5e0!3m2!1spt-BR!2sbr!4v1788548634181!5m2!1spt-BR!2sbr" 
        width="600" 
        height="450" 
        style={{ borderWidth: 7, borderStyle: "solid", borderColor: BRAND.greenDark, borderRadius: 25 }} 
        allowFullScreen={true} 
        loading="lazy" 
        referrerPolicy="strict-origin-when-cross-origin"
        >
        </iframe>
    </div>
    </>
  );
}
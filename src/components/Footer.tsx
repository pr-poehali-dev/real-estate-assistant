const GOLD   = 'hsl(43 58% 55%)';
const GOLD20 = 'hsl(43 58% 55% / 0.2)';
const MUTED  = 'hsl(220 10% 48%)';
const FG     = 'hsl(45 20% 94%)';

const Footer = () => (
  <footer style={{ borderTop:`1px solid ${GOLD20}`, background:'hsl(222 28% 7%)', padding:'clamp(24px,3.5vw,44px) clamp(20px,5vw,56px)' }}>
    <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:16 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ display:'flex', flexDirection:'column', lineHeight:1 }}>
          <span style={{ fontFamily:'Playfair Display, serif', fontSize:17, fontWeight:700, letterSpacing:'0.16em', color:FG, textTransform:'uppercase' }}>APEX</span>
          <span style={{ fontFamily:'Inter, sans-serif', fontSize:7, fontWeight:500, letterSpacing:'0.44em', textTransform:'uppercase', color:GOLD, marginTop:1 }}>SOLUTIONS</span>
        </div>
        <div style={{ width:1, height:26, background:`linear-gradient(to bottom, transparent, ${GOLD20}, transparent)` }} />
        <span style={{ fontFamily:'Inter, sans-serif', fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:MUTED }}>Недвижимость · Москва и МО</span>
      </div>
      <span style={{ fontFamily:'Inter, sans-serif', fontSize:11, letterSpacing:'0.1em', color:MUTED }}>
        © 2015 Apex Solutions. Бесплатный подбор недвижимости.
      </span>
    </div>
  </footer>
);

export default Footer;
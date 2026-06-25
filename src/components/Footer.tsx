const GOLD   = '#C9A84C';
const GOLD20 = 'rgba(201,168,76,0.20)';

const Footer = () => (
  <footer style={{ borderTop:`1px solid ${GOLD20}`, background:'#0D0D0D', padding:'clamp(28px,4vw,48px) clamp(20px,5vw,60px)' }}>
    <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:20 }}>
      <div style={{ display:'flex', alignItems:'center', gap:14 }}>
        <div style={{ display:'flex', flexDirection:'column', lineHeight:1 }}>
          <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:18, fontWeight:600, letterSpacing:'0.18em', color:'#E5DDD0', textTransform:'uppercase' }}>APEX</span>
          <span style={{ fontFamily:'Jost, sans-serif', fontSize:7, fontWeight:500, letterSpacing:'0.45em', textTransform:'uppercase', color:GOLD, marginTop:2 }}>SOLUTIONS</span>
        </div>
        <div style={{ width:1, height:28, background:`linear-gradient(to bottom, transparent, ${GOLD20}, transparent)` }} />
        <span style={{ fontFamily:'Jost, sans-serif', fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(229,221,208,0.35)' }}>Недвижимость · Москва и МО</span>
      </div>
      <span style={{ fontFamily:'Jost, sans-serif', fontSize:10, letterSpacing:'0.15em', color:'rgba(229,221,208,0.3)' }}>
        © 2026 Apex Solutions. Бесплатный подбор недвижимости.
      </span>
    </div>
  </footer>
);

export default Footer;
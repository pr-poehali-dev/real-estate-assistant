import { GOLD, MUTED, FG } from './constants';

const SectionTitle = ({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) => (
  <div style={{ textAlign:'center', marginBottom:'clamp(36px,5vw,64px)' }}>
    <span style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:GOLD }}>
      {eyebrow}
    </span>
    <h2 className="font-display" style={{ fontSize:'clamp(28px,4.5vw,58px)', fontWeight:300, lineHeight:1.1, marginTop:12, letterSpacing:'-0.02em', color:FG }}>
      {title}
    </h2>
    {sub && (
      <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:14, lineHeight:1.75, color:MUTED, maxWidth:560, margin:'16px auto 0' }}>{sub}</p>
    )}
    <div style={{ width:44, height:1, background:GOLD, margin:'20px auto 0' }} />
  </div>
);

export default SectionTitle;

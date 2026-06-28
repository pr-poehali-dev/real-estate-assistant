import Icon from '@/components/ui/icon';
import { GOLD, GOLD20, GOLD40, MUTED, FG } from './constants';

interface HeroSectionProps {
  onOpenRequest: (mode: 'social' | 'meeting') => void;
}

const HeroSection = ({ onOpenRequest }: HeroSectionProps) => (
  <section style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', overflow:'hidden', background:'hsl(222 28% 8%)' }}>

    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${GOLD40}, transparent)` }} />

    <div style={{ position:'relative', zIndex:2, width:'100%', maxWidth:1200, margin:'0 auto', padding:'clamp(100px,14vh,140px) clamp(24px,6vw,80px) clamp(60px,8vh,100px)' }}>

      <div className="animate-fade-up" style={{ display:'flex', alignItems:'center', gap:14, marginBottom:40, animationDelay:'80ms' }}>
        <div style={{ width:36, height:1, background:GOLD }} />
        <span style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:GOLD }}>
          Real Estate · Club
        </span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:'clamp(32px,5vw,72px)', alignItems:'start' }} className="hero-grid">

        <div className="animate-fade-up" style={{ display:'flex', flexDirection:'column', gap:12, paddingTop:8, animationDelay:'200ms' }}>
          {[
            { icon:'Shield', label:'Спокойствие сделки' },
            { icon:'Home',   label:'Подбор недвижимости — бесплатно' },
            { icon:'Star',   label:'Вы принимаете ключевое решение' },
          ].map(b => (
            <span key={b.label} className="hero-badge" style={{ display:'flex', alignItems:'center', gap:10, fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:400, letterSpacing:'0.12em', textTransform:'uppercase', color:MUTED, padding:'10px 18px', border:`1px solid ${GOLD20}`, borderRadius:100, background:'hsl(222 30% 10%)' }}>
              <Icon name={b.icon} size={13} style={{ color:GOLD, flexShrink:0 }} /> {b.label}
            </span>
          ))}
        </div>

        <div className="hero-text-col" style={{ minWidth:0 }}>
          <h1 className="animate-fade-up font-display" style={{ animationDelay:'320ms', fontSize:'clamp(34px,5vw,72px)', fontWeight:300, lineHeight:1.15, letterSpacing:'-0.02em', margin:'0 0 24px', color:FG }}>
            <span style={{ display:'block', WebkitTextFillColor:FG }}>Пространство для</span>
            <span style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap', WebkitTextFillColor:FG }}>
              <em style={{ fontStyle:'italic', fontWeight:600, background:'linear-gradient(90deg, hsl(43 50% 44%) 0%, hsl(43 75% 70%) 30%, hsl(36 60% 55%) 50%, hsl(43 75% 70%) 70%, hsl(43 50% 44%) 100%)', backgroundSize:'250% auto', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent', animation:'goldShimmer 5s ease-in-out infinite' }}>Вашего</em>
              {' '}
              <em style={{ fontStyle:'italic', fontWeight:600, background:'linear-gradient(90deg, hsl(43 50% 44%) 0%, hsl(43 75% 70%) 30%, hsl(36 60% 55%) 50%, hsl(43 75% 70%) 70%, hsl(43 50% 44%) 100%)', backgroundSize:'250% auto', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent', animation:'goldShimmer 5s ease-in-out infinite' }}>комфорта</em>
              <div className="hero-gold-line" style={{ width:36, height:1, background:GOLD, flexShrink:0 }} />
            </span>
            <span style={{ display:'block', WebkitTextFillColor:FG }}>найдём то,</span>
            <span style={{ display:'block', WebkitTextFillColor:FG }}>
              что нужно{' '}
              <em style={{ fontStyle:'italic', fontWeight:600, background:'linear-gradient(90deg, hsl(43 50% 44%) 0%, hsl(43 75% 70%) 30%, hsl(36 60% 55%) 50%, hsl(43 75% 70%) 70%, hsl(43 50% 44%) 100%)', backgroundSize:'250% auto', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent', animation:'goldShimmer 5s ease-in-out infinite' }}>Вам</em>
            </span>
          </h1>

          <p className="animate-fade-up font-light mx-0 my-[35px] px-[5px] py-0.5" style={{ animationDelay:'440ms', fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.85, color:MUTED, maxWidth:480, marginBottom:36, textAlign:'center' }}>
            <span style={{ display:'block' }}>Профессионально подберем недвижимость.</span>
            <span style={{ display:'block' }}>Вам не нужно никуда ехать — просто оставьте запрос</span>
            <span style={{ display:'block' }}>и получите готовый результат.</span>
          </p>

          <div className="animate-fade-up" style={{ animationDelay:'540ms', display:'flex', gap:12, flexWrap:'wrap' }}>
            <button className="btn-apex btn-apex-gold" onClick={() => onOpenRequest('social')}>
              <Icon name="MessageCircle" size={14} /> Написать запрос
            </button>
            <button className="btn-apex btn-apex-outline" onClick={() => onOpenRequest('meeting')}>
              <Icon name="Phone" size={14} /> Обратный звонок
            </button>
          </div>
        </div>
      </div>
    </div>

    <div style={{ position:'absolute', bottom:0, left:0, right:0, borderTop:`1px solid ${GOLD20}`, background:'hsl(222 30% 6% / 0.85)', backdropFilter:'blur(8px)', padding:'12px 0', overflow:'hidden' }}>
      <div className="animate-marquee" style={{ display:'flex', whiteSpace:'nowrap', width:'max-content' }}>
        {[...Array(2)].map((_, k) => (
          <div key={k} style={{ display:'flex' }}>
            {['Комплексный сервис','Недвижимость, где Ваши интересы – приоритет','Все виды финансовых услуг для Вас и Вашего бизнеса'].map(t => (
              <span key={t+k} style={{ display:'inline-flex', alignItems:'center', gap:22, padding:'0 22px', fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:GOLD }}>
                {t} <span style={{ fontSize:5, opacity:0.5 }}>◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeroSection;
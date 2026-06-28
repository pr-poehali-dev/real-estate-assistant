import PhoneInput from '@/components/PhoneInput';
import Icon from '@/components/ui/icon';
import ScrollToTop from '@/components/ScrollToTop';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { GOLD, GOLD20, GOLD40, NAVYD, MUTED, FG, SEND_LEAD_URL, type FS, emptyForm } from './constants';

interface CtaSectionProps {
  open: boolean;
  mode: 'social' | 'meeting';
  forms: Record<string, FS>;
  onOpenRequest: (m: 'social' | 'meeting') => void;
  onClose: () => void;
  setForms: React.Dispatch<React.SetStateAction<Record<string, FS>>>;
}

const CtaSection = ({ open, mode, forms, onOpenRequest, onClose, setForms }: CtaSectionProps) => {
  const f = forms[mode];
  const setF = (p: Partial<FS>) => setForms(prev => ({ ...prev, [mode]: { ...prev[mode], ...p } }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim()) return;
    setF({ sending: true });
    try {
      await fetch(SEND_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name:f.name, phone:f.phone, social:f.social, request:f.request, callback:f.callback, source: mode==='social'?'Написать в соцсетях':'Обратный звонок' })
      });
      setF({ sent:true, name:'', phone:'', social:'', request:'', callback:false });
    } finally { setF({ sending:false }); }
  };

  return (
    <>
      <section id="contacts" style={{ padding:'clamp(48px,7vw,96px) 0', background:'hsl(222 25% 8%)' }}>
        <div style={{ maxWidth:960, margin:'0 auto', padding:'0 clamp(20px,5vw,60px)' }}>
          <div style={{
            border:`1px solid ${GOLD20}`,
            borderRadius:24,
            padding:'clamp(48px,6vw,80px) clamp(28px,5vw,72px)',
            textAlign:'center',
            position:'relative',
            background:NAVYD,
          }}>
            <span style={{ position:'absolute', top:-1, left:-1, width:94, height:94, borderTop:`0.5px solid ${GOLD}`, borderLeft:`0.5px solid ${GOLD}`, borderRadius:'24px 0 0 0', display:'block' }} />
            <span style={{ position:'absolute', bottom:-1, right:-1, width:94, height:94, borderBottom:`0.5px solid ${GOLD}`, borderRight:`0.5px solid ${GOLD}`, borderRadius:'0 0 24px 0', display:'block' }} />
            <h2 className="font-display" style={{ fontSize:'clamp(22px,5vw,68px)', fontWeight:700, lineHeight:1.08, letterSpacing:'-0.02em', marginBottom:20, color:FG, wordBreak:'keep-all', overflowWrap:'normal' }}>
              Поиск недвижимости<br />начинается <em className="gold-shimmer" style={{ fontStyle:'italic' }}>здесь</em>
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:14, lineHeight:1.85, color:MUTED, maxWidth:480, margin:'0 auto 36px' }}>
              Выберите комфортный способ связи: напишите нам в социальных сетях или закажите бесплатный обратный звонок от нашего агента.
            </p>
            <div style={{ display:'flex', justifyContent:'center', gap:14, flexWrap:'wrap', marginBottom:32 }}>
              <button className="btn-apex btn-apex-gold" onClick={() => onOpenRequest('social')}
                style={{ height:56, fontSize:11, letterSpacing:'0.28em' }}>
                <Icon name="MessageCircle" size={15} /> Написать
              </button>
              <button className="btn-apex btn-apex-outline" onClick={() => onOpenRequest('meeting')}
                style={{ height:56, fontSize:11, letterSpacing:'0.28em' }}>
                <Icon name="Phone" size={15} /> Обратный звонок
              </button>
            </div>
            <div style={{ display:'flex', justifyContent:'center', gap:'clamp(16px,3vw,36px)', flexWrap:'wrap' }}>
              {[
                { icon:'AtSign', label:'Mail.ru' },
                { icon:'Send',   label:'Telegram' },
                { icon:'Phone',  label:'WhatsApp' },
                { icon:'Mail',   label:'MAX' },
              ].map(c => (
                <span key={c.label} style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.28em', textTransform:'uppercase', color:MUTED }} translate="no">
                  <Icon name={c.icon} size={13} style={{ color:GOLD }} /> {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={v => { if (!v) onClose(); }}>
        <DialogContent className="max-w-md w-[calc(100%-2rem)] max-h-[90dvh] overflow-y-auto" style={{ background:'hsl(222 25% 7%)', border:`1px solid ${GOLD20}`, borderRadius:20 }}>
          {!f.sent && (
            <DialogHeader>
              <DialogTitle className="font-display" style={{ fontSize:28, fontWeight:600, color:FG }}>
                {mode==='social' ? 'Запрос на подбор' : 'Обратный звонок'}
              </DialogTitle>
              <DialogDescription style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, color:MUTED, marginTop:6 }}>
                {mode==='social' ? 'Опишите, что Вы ищете — мы подберём объекты бесплатно.' : 'Оставьте номер — агент перезвонит и проконсультирует бесплатно.'}
              </DialogDescription>
            </DialogHeader>
          )}
          {f.sent ? (
            <div style={{ padding:'48px 0', textAlign:'center' }}>
              <div style={{ width:52, height:52, border:`1px solid ${GOLD40}`, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
                <Icon name="Check" size={22} style={{ color:GOLD }} />
              </div>
              <div className="font-display" style={{ fontSize:22, fontWeight:600, color:FG, marginBottom:8 }}>Заявка отправлена!</div>
              <div style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, color:MUTED }}>Мы свяжемся с Вами в ближайшее время.</div>
            </div>
          ) : (
            <form style={{ display:'flex', flexDirection:'column', gap:24, marginTop:22 }} onSubmit={handleSubmit}
              onKeyDown={e => { if (e.key==='Enter' && (e.target as HTMLElement).tagName!=='TEXTAREA') { e.preventDefault(); const fields = Array.from((e.currentTarget as HTMLFormElement).querySelectorAll<HTMLElement>('input:not([type=checkbox]),textarea')); const idx = fields.indexOf(e.target as HTMLElement); if (idx>=0 && idx<fields.length-1) fields[idx+1].focus(); } }}>
              <div>
                <label style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:GOLD40 }}>Ваше имя</label>
                <input type="text" placeholder="Как Вас представить?" value={f.name} onChange={e=>setF({name:e.target.value})} required className="apex-input" />
              </div>
              <div>
                <label style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:GOLD40 }}>Телефон</label>
                <PhoneInput value={f.phone} onChange={v=>setF({phone:v})} className="apex-input" />
              </div>
              {mode==='social' && (
                <div>
                  <label style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:GOLD40 }}>Соцсеть для связи</label>
                  <input type="text" placeholder="Наименование онлайн-платформы" value={f.social} onChange={e=>setF({social:e.target.value})} className="apex-input" />
                </div>
              )}
              <div>
                <label style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:GOLD40 }}>Ваш запрос</label>
                <textarea placeholder="Что вы ищете? Квартира, коммерция, загородная недвижимость. Расскажите подробнее..." rows={3} value={f.request} onChange={e=>setF({request:e.target.value})} className="apex-input" style={{ resize:'none' }} />
              </div>
              {mode==='social' && (
                <label style={{ display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
                  <input type="checkbox" checked={f.callback} onChange={e=>setF({callback:e.target.checked})} style={{ width:16, height:16, accentColor:GOLD, cursor:'pointer' }} />
                  <span style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, color:MUTED }}>Хочу обратный звонок</span>
                </label>
              )}
              <button type="submit" disabled={f.sending} className="btn-apex btn-apex-gold" style={{ width:'100%', marginTop:4 }}>
                {f.sending ? 'Отправляем…' : 'Отправить запрос'}
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <ScrollToTop />
    </>
  );
};

export default CtaSection;
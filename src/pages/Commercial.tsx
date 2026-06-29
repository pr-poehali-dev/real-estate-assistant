import { useState } from 'react';
import ScrollToTop from '@/components/ScrollToTop';
import PhoneInput from '@/components/PhoneInput';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { GOLD, GOLD20, GOLD40, NAVYD, MUTED, FG, SEND_LEAD_URL } from './home/constants';

const NAVY  = 'hsl(222 25% 8%)';
const NAVYC = 'hsl(222 22% 11%)';

const TYPES = [
  { icon: 'Store',       title: 'Торговые',                    sub: 'Магазины, ТЦ, павильоны, площади для розничной торговли.' },
  { icon: 'Building',    title: 'Офисные',                     sub: 'Офисы и бизнес-центры любого класса — аренда или покупка.' },
  { icon: 'Warehouse',   title: 'Индустриальные',              sub: 'Производственные помещения, склады, логистические комплексы.' },
  { icon: 'Landmark',    title: 'Социальные',                  sub: 'Медицинские, образовательные и иные объекты инфраструктуры.' },
  { icon: 'BedDouble',   title: 'Гостиничные',                 sub: 'Отели, апарт-отели, хостелы, курортные комплексы, гостевые дома.' },
  { icon: 'LayoutGrid',  title: 'Свободного назначения',       sub: 'Помещения под магазин, офис, салон, кафе или иной бизнес — без ограничений по профилю.' },
  { icon: 'Map',         title: 'Земельные участки',           sub: 'Участки под строительство магазинов, офисов, складов, заводов, гостиниц и других объектов.' },
];

const INVEST = [
  { icon: 'TrendingDown', label: 'Ниже рынка',     text: 'Находим объекты, которые другие агентства не предлагают' },
  { icon: 'BarChart2',    label: 'Доход на старте', text: 'Перепродажа или аренда — потенциал заложен уже в цене входа' },
  { icon: 'RefreshCw',   label: 'Долгосрочно',     text: 'Сопровождаем клиентов и при повторных сделках' },
];

type FS = { name: string; phone: string; social: string; request: string; callback: boolean; sending: boolean; sent: boolean };
const empty = (): FS => ({ name: '', phone: '', social: '', request: '', callback: false, sending: false, sent: false });

const Commercial = () => {
  const [open, setOpen] = useState(false);
  const [f, setFRaw] = useState<FS>(empty());
  const setF = (p: Partial<FS>) => setFRaw(prev => ({ ...prev, ...p }));

  const handleClose = () => { setOpen(false); setTimeout(() => setFRaw(empty()), 300); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim()) return;
    setF({ sending: true });
    try {
      await fetch(SEND_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: f.name, phone: f.phone, social: f.social, request: f.request, callback: f.callback, source: 'Коммерческая недвижимость' }),
      });
      setF({ sent: true, sending: false });
    } finally {
      setF({ sending: false });
    }
  };

  return (
    <div style={{ background: NAVY, color: FG, minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── Hero ──────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,5vw,60px) clamp(48px,6vw,80px)', maxWidth: 960, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(38px,6vw,72px)', fontWeight: 600, lineHeight: 1.08, marginBottom: 20, color: FG }}>
          Коммерческая недвижимость —{' '}
          <span style={{ color: GOLD, fontStyle: 'italic' }}>готовые решения под ключ</span>
        </h1>
        <p style={{ fontFamily: 'Inter,sans-serif', fontWeight: 300, fontSize: 'clamp(14px,1.5vw,17px)', color: MUTED, maxWidth: 580, lineHeight: 1.7, marginBottom: 36 }}>
          Находим объекты по ценам ниже рынка — для развития Вашего бизнеса, сдачи в аренду или как выгодное инвестиционное вложение. Полное сопровождение сделки включено.
        </p>
        <button
          onClick={() => setOpen(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: GOLD, color: NAVYD, border: 'none', borderRadius: 40, padding: '0 32px', height: 52, fontFamily: 'Inter,sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer' }}
        >
          <Icon name="MessageCircle" size={15} /> Оставить запрос
        </button>
      </section>

      {/* ── Типы объектов ─────────────────────────── */}
      <section style={{ background: NAVYC, padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 10, fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 14 }}>Что мы находим</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, color: FG, marginBottom: 40 }}>Типы объектов</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20 }}>
            {TYPES.map(t => (
              <div key={t.title} style={{ border: `1px solid ${GOLD20}`, borderRadius: 20, padding: '28px 24px', background: NAVY, textAlign: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, border: `1px solid ${GOLD40}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, margin: '0 auto 18px' }}>
                  <Icon name={t.icon} size={20} style={{ color: GOLD }} />
                </div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: FG, marginBottom: 8 }}>{t.title}</div>
                <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 300, fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Инвестиционный потенциал ───────────────── */}
      <section style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,5vw,60px)', maxWidth: 960, margin: '0 auto' }}>
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 10, fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 14 }}>Инвестиции</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, color: FG, marginBottom: 16 }}>Зарабатывайте на недвижимости</h2>
        <p style={{ fontFamily: 'Inter,sans-serif', fontWeight: 300, fontSize: 'clamp(14px,1.4vw,16px)', color: MUTED, maxWidth: 600, lineHeight: 1.75, marginBottom: 40 }}>
          Часть наших клиентов приобретают объекты для перепродажи или сдачи в аренду. Мы ищем там, где другие не смотрят — доход заложен уже в цене входа.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
          {INVEST.map(item => (
            <div key={item.label} style={{ borderTop: `2px solid ${GOLD40}`, paddingTop: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Icon name={item.icon} size={18} style={{ color: GOLD }} />
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600, color: FG }}>{item.label}</span>
              </div>
              <p style={{ fontFamily: 'Inter,sans-serif', fontWeight: 300, fontSize: 13, color: MUTED, lineHeight: 1.65 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA полоса ────────────────────────────── */}
      <section style={{ background: NAVYC, padding: 'clamp(48px,6vw,72px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20 }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(26px,4vw,48px)', fontWeight: 600, color: FG, maxWidth: 600 }}>
            Нужен коммерческий объект?
          </h2>
          <p style={{ fontFamily: 'Inter,sans-serif', fontWeight: 300, fontSize: 14, color: MUTED, maxWidth: 460, lineHeight: 1.7 }}>
            Оставьте запрос — подберём варианты по выгодной цене и проведём сделку от начала до конца.
          </p>
          <button
            onClick={() => setOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'transparent', color: GOLD, border: `1px solid ${GOLD40}`, borderRadius: 40, padding: '0 32px', height: 50, fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase', cursor: 'pointer', transition: 'border-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = GOLD)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = GOLD40)}
          >
            <Icon name="MessageCircle" size={14} /> Написать нам
          </button>
        </div>
      </section>

      {/* ── Dialog ────────────────────────────────── */}
      <Dialog open={open} onOpenChange={v => { if (!v) handleClose(); }}>
        <DialogContent className="max-w-md w-[calc(100%-2rem)] max-h-[90dvh] overflow-y-auto" style={{ background: 'hsl(222 25% 7%)', border: `1px solid ${GOLD20}`, borderRadius: 20 }}>
          {!f.sent && (
            <DialogHeader>
              <DialogTitle className="font-display" style={{ fontSize: 28, fontWeight: 600, color: FG }}>Запрос на коммерцию</DialogTitle>
              <DialogDescription style={{ fontFamily: 'Inter,sans-serif', fontWeight: 300, fontSize: 13, color: MUTED, marginTop: 6 }}>
                Опишите объект — подберём варианты и свяжемся с Вами бесплатно.
              </DialogDescription>
            </DialogHeader>
          )}
          {f.sent ? (
            <div style={{ padding: '48px 0', textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, border: `1px solid ${GOLD40}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Icon name="Check" size={22} style={{ color: GOLD }} />
              </div>
              <div className="font-display" style={{ fontSize: 22, fontWeight: 600, color: FG, marginBottom: 8 }}>Заявка отправлена!</div>
              <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 300, fontSize: 13, color: MUTED }}>Мы свяжемся с Вами в ближайшее время.</div>
            </div>
          ) : (
            <form
              style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 22 }}
              onSubmit={handleSubmit}
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
                  e.preventDefault();
                  const fields = Array.from((e.currentTarget as HTMLFormElement).querySelectorAll<HTMLElement>('input:not([type=checkbox]),textarea'));
                  const idx = fields.indexOf(e.target as HTMLElement);
                  if (idx >= 0 && idx < fields.length - 1) fields[idx + 1].focus();
                }
              }}
            >
              <div>
                <label style={{ fontFamily: 'Inter,sans-serif', fontSize: 9, fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD }}>Ваше имя</label>
                <input type="text" placeholder="Как Вас представить?" value={f.name} onChange={e => setF({ name: e.target.value })} required className="apex-input" />
              </div>
              <div>
                <label style={{ fontFamily: 'Inter,sans-serif', fontSize: 9, fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD }}>Телефон</label>
                <PhoneInput value={f.phone} onChange={v => setF({ phone: v })} className="apex-input" />
              </div>
              <div>
                <label style={{ fontFamily: 'Inter,sans-serif', fontSize: 9, fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD }}>Соцсеть для связи</label>
                <input type="text" placeholder="Наименование онлайн-платформы" value={f.social} onChange={e => setF({ social: e.target.value })} className="apex-input" />
              </div>
              <div>
                <label style={{ fontFamily: 'Inter,sans-serif', fontSize: 9, fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD }}>Ваш запрос</label>
                <textarea placeholder="Что Вы ищете? Тип объекта, площадь, бюджет, цель покупки..." rows={3} value={f.request} onChange={e => setF({ request: e.target.value })} className="apex-input" style={{ resize: 'none' }} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input type="checkbox" checked={f.callback} onChange={e => setF({ callback: e.target.checked })} style={{ width: 16, height: 16, accentColor: GOLD, cursor: 'pointer' }} />
                <span style={{ fontFamily: 'Inter,sans-serif', fontWeight: 300, fontSize: 13, color: MUTED }}>Хочу обратный звонок</span>
              </label>
              <button type="submit" disabled={f.sending} style={{ height: 52, background: GOLD, color: NAVYD, border: 'none', borderRadius: 40, fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', cursor: f.sending ? 'not-allowed' : 'pointer', opacity: f.sending ? 0.7 : 1 }}>
                {f.sending ? 'Отправляем…' : 'Отправить запрос'}
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <ScrollToTop />
    </div>
  );
};

export default Commercial;
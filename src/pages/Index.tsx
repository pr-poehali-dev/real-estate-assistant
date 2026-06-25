import { useState } from 'react';
import ScrollToTop from '@/components/ScrollToTop';
import PhoneInput from '@/components/PhoneInput';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

/* ─── HERO фото ─── */
const HERO_IMG = 'https://cdn.poehali.dev/projects/ab7a83ba-e182-427f-8219-a315e20c4c4a/files/0531d703-0186-48bc-b44b-e0b7573ffa6e.jpg';

/* ─── ДАННЫЕ ─── */
const SERVICES = [
  { icon: 'MessageSquare', title: 'Бесплатная консультация', text: 'Отвечаем на все вопросы по покупке, продаже и юридическим нюансам — без скрытых условий.' },
  { icon: 'Search',        title: 'Подбор объектов',         text: 'Жилая и коммерческая недвижимость по преимущественно низким ценам под ваши требования.' },
  { icon: 'Handshake',     title: 'Сопровождение сделки',    text: 'Покупка, продажа, переговоры и безопасная передача средств — контролируем каждый этап.' },
  { icon: 'FileCheck',     title: 'Юридическая экспертиза',  text: 'Проверим юридическую чистоту объекта, составим договор и соберём все необходимые документы.' },
];

const CAPABILITIES = [
  { icon: 'MapPin',      text: 'Помощь в поиске недвижимости, подходящей под требования покупателя' },
  { icon: 'Users',       text: 'Посредничество в переговорах между сторонами сделки' },
  { icon: 'ShieldCheck', text: 'Проверка юридической чистоты помещений' },
  { icon: 'FileText',    text: 'Сбор и подготовка документов для заключения договора купли-продажи' },
  { icon: 'Banknote',    text: 'Помощь во взаимных расчётах — безопасная передача денег при сделке' },
];

const DIRECTIONS = [
  { icon: 'Home',          title: 'Жилая недвижимость',        text: 'Квартиры в новостройках и на вторичном рынке — для себя или под инвестицию.' },
  { icon: 'Building2',     title: 'Коммерческая недвижимость',  text: 'Офисные, торговые, индустриальные и социальные объекты для аренды или ведения бизнеса.' },
  { icon: 'ClipboardList', title: 'Экспертная оценка',          text: 'Профессиональная оценка объектов недвижимости перед принятием решения о покупке.' },
  { icon: 'Hammer',        title: 'Ремонт под ключ',            text: 'Подберём проверенного подрядчика из числа наших партнёров, который реализует лучший дизайн вашей новой квартиры — персонально для вас.' },
];

const STEPS = [
  { num: '01', title: 'Оставляете запрос',   text: 'Напишите нам или закажите обратный звонок — как удобно вам.' },
  { num: '02', title: 'Подбираем объекты',   text: 'Агент с многолетним опытом готовит варианты под вас.' },
  { num: '03', title: 'Получаете результат', text: 'Никуда не ехать. Готовая подборка и сопровождение — бесплатно.' },
];

const GOLD    = 'hsl(43 58% 55%)';
const GOLD20  = 'hsl(43 58% 55% / 0.2)';
const GOLD40  = 'hsl(43 58% 55% / 0.4)';
const NAVY    = 'hsl(222 25% 8%)';
const NAVYC   = 'hsl(222 22% 11%)';
const MUTED   = 'hsl(220 10% 58%)';
const FG      = 'hsl(45 20% 94%)';

const SEND_LEAD_URL = 'https://functions.poehali.dev/0951d9ac-cb20-4a66-865c-901b256f6154';
type FS = { name:string; phone:string; social:string; request:string; callback:boolean; sending:boolean; sent:boolean };
const emptyForm = (): FS => ({ name:'', phone:'', social:'', request:'', callback:false, sending:false, sent:false });

const Index = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'social'|'meeting'>('social');
  const [forms, setForms] = useState<Record<string,FS>>({ social: emptyForm(), meeting: emptyForm() });

  const f = forms[mode];
  const setF = (p: Partial<FS>) => setForms(prev => ({ ...prev, [mode]: { ...prev[mode], ...p } }));
  const openRequest = (m:'social'|'meeting'='social') => { setMode(m); setOpen(true); };

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
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ══════════════════════════════════
          HERO — фото на весь экран
      ══════════════════════════════════ */}
      <section id="hero" style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column' }}>
        {/* Фото */}
        <img
          src={HERO_IMG}
          alt="Apex Solutions"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }}
        />
        {/* Тёмно-синяя вуаль */}
        <div style={{ position:'absolute', inset:0, zIndex:1,
          background:'linear-gradient(110deg, hsl(222 35% 6% / 0.95) 0%, hsl(222 28% 10% / 0.7) 45%, hsl(222 22% 12% / 0.35) 100%)'
        }} />

        {/* Вертикальная подпись слева */}
        <div className="hidden md:flex vertical-text"
          style={{ position:'absolute', top:0, bottom:0, left:'clamp(16px,3vw,44px)', zIndex:2, alignItems:'center' }}>
          <span style={{ fontFamily:'Inter,sans-serif', fontSize:9, letterSpacing:'0.5em', textTransform:'uppercase', color:GOLD40 }}>
            Private Real Estate Club · Est. 2025
          </span>
        </div>

        {/* Контент */}
        <div style={{ position:'relative', zIndex:2, flex:1, display:'flex', alignItems:'center',
          maxWidth:1280, width:'100%', margin:'0 auto', padding:'120px clamp(28px,7vw,100px) 48px' }}>
          <div style={{ maxWidth:860 }}>

            {/* Надзаголовок */}
            <div className="animate-fade-up" style={{ display:'flex', alignItems:'center', gap:14, marginBottom:32, animationDelay:'100ms' }}>
              <div style={{ width:44, height:1, background:GOLD }} />
              <span style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:GOLD }}>
                Apex Solutions · Москва и МО
              </span>
            </div>

            {/* H1 */}
            <h1 className="animate-fade-up font-display"
              style={{ animationDelay:'250ms', fontSize:'clamp(44px,8vw,110px)', fontWeight:300, lineHeight:1, letterSpacing:'-0.025em', margin:'0 0 32px', color:FG }}>
              Найдём дом, <br />
              где вам будет{' '}
              <em className="gold-shimmer" style={{ fontStyle:'italic', fontWeight:600 }}>тепло</em>
            </h1>

            {/* Подпись + кнопки */}
            <div className="animate-fade-up" style={{ animationDelay:'400ms', display:'flex', flexWrap:'wrap', gap:'clamp(20px,4vw,60px)', alignItems:'flex-end' }}>
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.85, color:MUTED, maxWidth:380 }}>
                Бесплатно подберём квартиру, ипотеку и рассрочку. Вам не нужно никуда ехать — просто оставьте запрос и получите готовый результат.
              </p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <button className="btn-apex btn-apex-gold" onClick={() => openRequest('social')}>
                  <Icon name="MessageCircle" size={14} /> Написать запрос
                </button>
                <button className="btn-apex btn-apex-outline" onClick={() => openRequest('meeting')}>
                  <Icon name="Phone" size={14} /> Обратный звонок
                </button>
              </div>
            </div>

            {/* Бейджи */}
            <div className="animate-fade-up" style={{ animationDelay:'560ms', display:'flex', flexWrap:'wrap', gap:24, marginTop:32 }}>
              {[
                { icon:'Check', label:'Без условий' },
                { icon:'Check', label:'Вы ничего не платите' },
                { icon:'MapPin', label:'Москва и МО' },
              ].map(b => (
                <span key={b.label} style={{ display:'flex', alignItems:'center', gap:7, fontFamily:'Inter,sans-serif', fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', color:MUTED }}>
                  <Icon name={b.icon} size={12} style={{ color:GOLD }} /> {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Статистика снизу */}
        <div style={{ position:'relative', zIndex:2, borderTop:`1px solid ${GOLD20}` }}>
          <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(28px,7vw,100px)',
            display:'grid', gridTemplateColumns:'repeat(3,1fr)' }}>
            {[
              { n:'С 2025', l:'На рынке' },
              { n:'100%',   l:'Бесплатный подбор' },
              { n:'24/7',   l:'На связи для вас' },
            ].map((s, i) => (
              <div key={s.l} style={{
                padding:'clamp(18px,2.5vw,32px) 0',
                borderLeft: i > 0 ? `1px solid ${GOLD20}` : 'none',
                paddingLeft: i > 0 ? 'clamp(18px,3vw,40px)' : 0,
              }}>
                <div className="font-display" style={{ fontSize:'clamp(22px,3vw,40px)', fontWeight:300, color:GOLD, letterSpacing:'-0.02em', lineHeight:1 }}>{s.n}</div>
                <div style={{ fontFamily:'Inter,sans-serif', fontSize:9, letterSpacing:'0.28em', textTransform:'uppercase', color:MUTED, marginTop:8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          БЕГУЩАЯ СТРОКА
      ══════════════════════════════════ */}
      <div style={{ background:'hsl(222 30% 6%)', borderTop:`1px solid ${GOLD20}`, borderBottom:`1px solid ${GOLD20}`, padding:'13px 0', overflow:'hidden' }}>
        <div className="animate-marquee" style={{ display:'flex', whiteSpace:'nowrap', width:'max-content' }}>
          {[...Array(2)].map((_, k) => (
            <div key={k} style={{ display:'flex' }}>
              {['Жилая недвижимость','Коммерция','Бесплатный подбор','Юридическое сопровождение','Москва и МО','Инвестиции в недвижимость'].map(t => (
                <span key={t+k} style={{ display:'inline-flex', alignItems:'center', gap:24, padding:'0 24px',
                  fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:GOLD }}>
                  {t} <span style={{ fontSize:5, opacity:0.6 }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════
          SERVICES
      ══════════════════════════════════ */}
      <section id="services" className="py-16 md:py-24 px-4">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16">
            <span style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:GOLD }}>Что мы делаем</span>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold mt-3" style={{ color:FG }}>Услуги под ключ</h2>
            <div style={{ width:44, height:1, background:GOLD, marginTop:16 }} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap:1, background:GOLD20 }}>
            {SERVICES.map((s, i) => (
              <div key={s.title} className="apex-card animate-fade-up" style={{ padding:'clamp(22px,2.5vw,38px)', borderRadius:0, animationDelay:`${i*80}ms` }}>
                <div style={{ width:42, height:42, border:`1px solid ${GOLD40}`, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                  <Icon name={s.icon} size={18} style={{ color:GOLD }} />
                </div>
                <h3 className="font-display text-lg md:text-xl font-semibold mb-3" style={{ color:FG }}>{s.title}</h3>
                <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.8, color:MUTED }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          WHY US
      ══════════════════════════════════ */}
      <section id="why" className="py-16 md:py-24 px-4" style={{ background:'hsl(222 22% 10%)' }}>
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16">
            <span style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:GOLD }}>Зачем мы нужны</span>
            <h2 className="font-display text-2xl md:text-5xl lg:text-6xl font-semibold mt-3 max-w-3xl leading-tight" style={{ color:FG }}>
              Рынок недвижимости должен служить{' '}
              <em style={{ color:GOLD, fontStyle:'italic' }}>покупателю</em>
              {' — '}а не тем, кто продаёт.
            </h2>
            <div style={{ width:44, height:1, background:GOLD, marginTop:16 }} />
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,80px)' }} className="why-grid">
            <div className="animate-fade-up">
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:GOLD40, marginBottom:20 }}>Вам больше не нужно:</p>
              {[
                'Тратить время на самостоятельный поиск квартиры и сталкиваться с фейковыми объявлениями',
                'Часами искать надёжного агента среди сотен предложений',
                'Разбираться в бесконечном потоке рекламы и платных услуг на сторонних сайтах',
              ].map((text, i) => (
                <div key={i} style={{ display:'flex', gap:18, padding:'20px 0', borderBottom:`1px solid ${GOLD20}` }}>
                  <div style={{ width:28, height:28, border:`1px solid ${GOLD20}`, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>
                    <Icon name="X" size={12} style={{ color:MUTED }} />
                  </div>
                  <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13.5, lineHeight:1.75, color:MUTED }}>{text}</p>
                </div>
              ))}
            </div>

            <div className="animate-fade-up" style={{ animationDelay:'200ms' }}>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:GOLD40, marginBottom:20 }}>Вы можете:</p>
              <div style={{ borderLeft:`2px solid ${GOLD}`, paddingLeft:20, marginBottom:24 }}>
                <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:'clamp(14px,1.3vw,16px)', lineHeight:1.75, color:FG }}>
                  Доверить всю эту работу нам — и использовать сэкономленное время для себя.
                </p>
              </div>
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13.5, lineHeight:1.85, color:MUTED, marginBottom:22 }}>
                Мы выполним всё именно так, как вы задумали. С полной уверенностью в качестве каждого этапа — от первого звонка до получения ключей.
              </p>
              {[
                { icon:'ShieldCheck', label:'Надёжно',        text:'Прозрачные условия, тщательная проработка сделки и выявление всех возможных рисков' },
                { icon:'Zap',         label:'Быстро',          text:'Заявки клиентов рассматриваются в приоритетном порядке' },
                { icon:'Star',        label:'Профессионально', text:'Составим договор и соберём полный пакет необходимых документов' },
              ].map(item => (
                <div key={item.label} className="apex-card" style={{ display:'flex', gap:14, padding:'14px 18px', marginBottom:10 }}>
                  <div style={{ width:36, height:36, border:`1px solid ${GOLD40}`, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon name={item.icon} size={15} style={{ color:GOLD }} />
                  </div>
                  <div>
                    <div style={{ fontFamily:'Inter,sans-serif', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:GOLD, marginBottom:4 }}>{item.label}</div>
                    <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.75, color:MUTED }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ABOUT + STEPS
      ══════════════════════════════════ */}
      <section id="about">
        <div style={{ display:'grid', gridTemplateColumns:'0.9fr 1.1fr' }} className="about-grid">
          {/* Левая — акцентная панель */}
          <div style={{ position:'relative', minHeight:400, background:'hsl(222 30% 12%)', padding:'clamp(44px,6vw,80px)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg, ${GOLD}, transparent)` }} />
            <span style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:GOLD }}>О компании</span>
            <h2 className="font-display animate-fade-up" style={{ fontSize:'clamp(32px,4vw,60px)', fontWeight:300, lineHeight:1.05, marginTop:12, letterSpacing:'-0.02em', color:FG }}>
              История и команда<br /><em style={{ color:GOLD }}>«Дом Мечты»</em>
            </h2>
            <div style={{ marginTop:32, padding:'22px 26px', border:`1px solid ${GOLD20}`, borderRadius:14, position:'relative' }} className="corners">
              <p className="font-display" style={{ fontSize:'clamp(16px,1.7vw,21px)', fontStyle:'italic', fontWeight:300, lineHeight:1.6, color:FG }}>
                «Результат гарантирован. Наша команда работает на него, а не на видимость работы.»
              </p>
            </div>
          </div>

          {/* Правая */}
          <div style={{ padding:'clamp(44px,6vw,80px) clamp(24px,5vw,72px)', background:NAVY }}>
            <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:'clamp(32px,4vw,52px)' }} className="animate-fade-up">
              {[
                'Мы — динамично развивающаяся организация, работающая на рынке услуг по подбору недвижимости с 2025 года. За это время мы успешно реализовали множество проектов разного масштаба и уровня сложности.',
                'Образование компании стало логическим продолжением успешного завершения финансовых сделок группой специалистов, составивших основу нашей профессиональной деятельности.',
                '«Дом Мечты» — команда, поставившая своей целью решать все ваши вопросы, связанные с приобретением недвижимости. Мы готовы помочь принять верное решение и подобрать наилучшие условия именно для вас.',
              ].map((t, i) => (
                <p key={i} style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13.5, lineHeight:1.85, color:MUTED }}>{t}</p>
              ))}
            </div>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:GOLD, marginBottom:28 }}>Как это работает</p>
            <div>
              {STEPS.map((step, i) => (
                <div key={step.num} style={{ display:'flex', gap:22, padding:'22px 0', borderTop:`1px solid ${GOLD20}`, borderBottom: i===STEPS.length-1 ? `1px solid ${GOLD20}` : 'none' }}>
                  <div className="font-display" style={{ fontSize:'clamp(36px,4vw,56px)', fontWeight:300, color:GOLD20, lineHeight:1, width:'1.8ch', flexShrink:0 }}>{step.num}</div>
                  <div style={{ paddingTop:4 }}>
                    <h3 className="font-display" style={{ fontSize:'clamp(18px,1.8vw,24px)', fontWeight:400, marginBottom:6, color:FG }}>{step.title}</h3>
                    <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.75, color:MUTED }}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-apex btn-apex-gold" onClick={() => openRequest('social')} style={{ width:'100%', marginTop:32 }}>
              Начать прямо сейчас
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          DIRECTIONS
      ══════════════════════════════════ */}
      <section className="py-16 md:py-24 px-4" style={{ background:'hsl(222 22% 10%)' }}>
        <div className="container max-w-6xl">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'clamp(40px,5vw,64px)', flexWrap:'wrap', gap:20 }}>
            <div className="animate-fade-up">
              <span style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:GOLD }}>Направления</span>
              <h2 className="font-display" style={{ fontSize:'clamp(32px,4.5vw,66px)', fontWeight:300, lineHeight:1, marginTop:12, letterSpacing:'-0.02em', color:FG }}>
                Основные<br /><em style={{ color:GOLD, fontStyle:'italic' }}>направления</em>
              </h2>
            </div>
            <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.8, color:MUTED, maxWidth:280 }}>
              Четыре ключевых вектора работы — от жилья до инвестиционной коммерции и ремонта.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:GOLD20 }} className="dir-grid">
            {DIRECTIONS.map((d, i) => (
              <div key={d.title} className="apex-card animate-fade-up" style={{ display:'flex', minHeight:170, borderRadius:0, animationDelay:`${i*100}ms` }}>
                <div style={{ width:'28%', minWidth:70, flexShrink:0, background:`hsl(222 ${22+i*4}% ${8+i*2}%)`, display:'flex', alignItems:'flex-end', padding:14, position:'relative' }}>
                  <div style={{ position:'absolute', inset:0, background:`linear-gradient(135deg, ${GOLD20}, transparent)` }} />
                  <Icon name={d.icon} size={22} style={{ color:GOLD40, position:'relative' }} />
                </div>
                <div style={{ padding:'clamp(18px,2.5vw,30px)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                  <h3 className="font-display" style={{ fontSize:'clamp(15px,1.5vw,21px)', fontWeight:400, marginBottom:8, color:FG }}>{d.title}</h3>
                  <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.75, color:MUTED }}>{d.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Возможности */}
          <div style={{ marginTop:2, background:NAVYC, border:`1px solid ${GOLD20}`, borderRadius:20, padding:'clamp(28px,4vw,52px)', marginTop:24 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(24px,4vw,56px)', alignItems:'start' }} className="cap-grid">
              <div>
                <span style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:GOLD }}>Наши возможности</span>
                <p className="font-display" style={{ fontSize:'clamp(18px,2vw,26px)', fontStyle:'italic', fontWeight:300, lineHeight:1.55, color:FG, margin:'16px 0 14px' }}>
                  Некоторые из наших постоянных клиентов зарабатывают на объектах, которые мы находим для них — за счёт покупки и дальнейшей перепродажи по выгодной цене.
                </p>
                <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.8, color:MUTED }}>
                  Наша цель — поиск наилучших условий при покупке недвижимости. Мы не просто подбираем варианты, мы находим их по преимущественно низким ценам.
                </p>
                <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.8, color:MUTED, marginTop:10 }}>
                  После покупки мы готовы помочь с ремонтом: подберём проверенного партнёра-подрядчика, который воплотит лучший дизайн вашей квартиры — под ваш вкус и бюджет.
                </p>
              </div>
              <div>
                {CAPABILITIES.map((c, i) => (
                  <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start', padding:'13px 0', borderBottom: i<CAPABILITIES.length-1 ? `1px solid ${GOLD20}` : 'none' }}>
                    <Icon name={c.icon} size={14} style={{ color:GOLD, flexShrink:0, marginTop:2 }} />
                    <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.7, color:MUTED }}>{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA / CONTACTS
      ══════════════════════════════════ */}
      <section id="contacts" style={{ position:'relative', overflow:'hidden' }}>
        <div style={{
          background:`linear-gradient(135deg, hsl(222 35% 7%) 0%, hsl(222 28% 12%) 50%, hsl(222 35% 8%) 100%)`,
          padding:'clamp(72px,10vw,150px) clamp(28px,6vw,80px)',
          position:'relative',
        }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${GOLD40}, transparent)` }} />
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${GOLD20}, transparent)` }} />
          <div style={{ position:'absolute', top:'40%', left:'50%', transform:'translateX(-50%)', width:'60%', height:'50%',
            background:`radial-gradient(ellipse, ${GOLD20} 0%, transparent 70%)`, pointerEvents:'none' }} />

          <div style={{ maxWidth:760, margin:'0 auto', textAlign:'center', position:'relative' }}>
            <div className="animate-fade-up" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:28 }}>
              <div style={{ width:40, height:1, background:GOLD }} />
              <span style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:GOLD }}>Начать сейчас</span>
              <div style={{ width:40, height:1, background:GOLD }} />
            </div>
            <h2 className="font-display animate-fade-up" style={{ fontSize:'clamp(40px,6.5vw,88px)', fontWeight:300, lineHeight:1.02, letterSpacing:'-0.025em', marginBottom:24, animationDelay:'150ms', color:FG }}>
              Поиск недвижимости<br />начинается <em className="gold-shimmer">здесь</em>
            </h2>
            <p className="animate-fade-up" style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:14, lineHeight:1.9, color:MUTED, marginBottom:44, letterSpacing:'0.04em', animationDelay:'280ms' }}>
              Выберите комфортный способ связи: напишите нам в социальных сетях или закажите бесплатный обратный звонок от нашего агента.
            </p>
            <div className="animate-fade-up" style={{ display:'flex', justifyContent:'center', gap:14, flexWrap:'wrap', marginBottom:44, animationDelay:'400ms' }}>
              <button className="btn-apex btn-apex-gold" onClick={() => openRequest('social')} style={{ minWidth:196 }}>
                <Icon name="MessageCircle" size={14} /> Написать
              </button>
              <button className="btn-apex btn-apex-outline" onClick={() => openRequest('meeting')} style={{ minWidth:196 }}>
                <Icon name="Phone" size={14} /> Обратный звонок
              </button>
            </div>
            <div className="animate-fade-up" style={{ display:'flex', justifyContent:'center', gap:'clamp(16px,3vw,40px)', flexWrap:'wrap', animationDelay:'520ms' }}>
              {[
                { icon:'AtSign', label:'Mail.ru' },
                { icon:'Send',   label:'Telegram' },
                { icon:'Phone',  label:'WhatsApp' },
                { icon:'Mail',   label:'MAX' },
              ].map(c => (
                <span key={c.label} style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'Inter,sans-serif', fontSize:10, letterSpacing:'0.28em', textTransform:'uppercase', color:MUTED }} translate="no">
                  <Icon name={c.icon} size={13} style={{ color:GOLD }} /> {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          DIALOG
      ══════════════════════════════════ */}
      <Dialog open={open} onOpenChange={v => { if (!v) setForms(prev => ({ ...prev, [mode]: emptyForm() })); setOpen(v); }}>
        <DialogContent className="max-w-md w-[calc(100%-2rem)] max-h-[90dvh] overflow-y-auto" style={{ background:'hsl(222 25% 7%)', border:`1px solid ${GOLD20}`, borderRadius:20 }}>
          {!f.sent && (
            <DialogHeader>
              <DialogTitle className="font-display" style={{ fontSize:28, fontWeight:600, color:FG }}>
                {mode==='social' ? 'Запрос на подбор' : 'Обратный звонок'}
              </DialogTitle>
              <DialogDescription style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, color:MUTED, marginTop:6 }}>
                {mode==='social'
                  ? 'Опишите, что вы ищете — мы подберём объекты бесплатно.'
                  : 'Оставьте номер — агент перезвонит и проконсультирует бесплатно.'}
              </DialogDescription>
            </DialogHeader>
          )}
          {f.sent ? (
            <div style={{ padding:'48px 0', textAlign:'center' }}>
              <div style={{ width:52, height:52, border:`1px solid ${GOLD40}`, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
                <Icon name="Check" size={22} style={{ color:GOLD }} />
              </div>
              <div className="font-display" style={{ fontSize:22, fontWeight:600, color:FG, marginBottom:8 }}>Заявка отправлена!</div>
              <div style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, color:MUTED }}>Мы свяжемся с вами в ближайшее время.</div>
            </div>
          ) : (
            <form style={{ display:'flex', flexDirection:'column', gap:24, marginTop:22 }} onSubmit={handleSubmit}
              onKeyDown={e => { if (e.key==='Enter' && (e.target as HTMLElement).tagName!=='TEXTAREA') { e.preventDefault(); const fields = Array.from((e.currentTarget as HTMLFormElement).querySelectorAll<HTMLElement>('input:not([type=checkbox]),textarea')); const idx = fields.indexOf(e.target as HTMLElement); if (idx>=0 && idx<fields.length-1) fields[idx+1].focus(); } }}>
              <div>
                <label style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:GOLD40 }}>Ваше имя</label>
                <input type="text" placeholder="Ваше имя" value={f.name} onChange={e=>setF({name:e.target.value})} required className="apex-input" />
              </div>
              <div>
                <label style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:GOLD40 }}>Телефон</label>
                <PhoneInput value={f.phone} onChange={v=>setF({phone:v})} className="apex-input" />
              </div>
              {mode==='social' && (
                <div>
                  <label style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:GOLD40 }}>Соцсеть для связи</label>
                  <input type="text" placeholder="Соцсеть для связи" value={f.social} onChange={e=>setF({social:e.target.value})} className="apex-input" />
                </div>
              )}
              <div>
                <label style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:GOLD40 }}>Ваш запрос</label>
                <textarea placeholder="Что вы ищете? Бюджет, район, количество комнат…" rows={3} value={f.request} onChange={e=>setF({request:e.target.value})} className="apex-input" style={{ resize:'none' }} />
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
    </div>
  );
};

export default Index;

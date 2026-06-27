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

/* ─── ДАННЫЕ ─── */
const SERVICES = [
  { icon: 'MessageSquare', title: 'Бесплатная консультация', text: 'Отвечаем на все вопросы по покупке, продаже и юридическим нюансам — без скрытых условий.' },
  { icon: 'Search',        title: 'Подбор объектов',         text: 'Жилая, коммерческая и загородная недвижимость по преимущественно низким ценам под ваши требования.' },
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
  { icon: 'Home',          title: 'Жилая недвижимость',       text: 'Квартиры в новостройках и на вторичном рынке — для себя или под инвестицию.' },
  { icon: 'Building2',     title: 'Коммерческая недвижимость', text: 'Офисные, торговые, индустриальные и социальные объекты для аренды или ведения бизнеса.' },
  { icon: 'Trees',         title: 'Загородная недвижимость',   text: 'Дома, коттеджи, особняки, усадьбы, резиденции, таунхаусы, дуплексы — подберём лучший вариант за городом.' },
  { icon: 'Hammer',        title: 'Ремонт под ключ',           text: 'Подберём проверенного подрядчика из числа наших партнёров, который реализует лучший дизайн вашей новой квартиры — персонально для вас.' },
];

const STEPS = [
  { num: '01', title: 'Оставляете запрос',   text: 'Напишите нам или закажите обратный звонок — как удобно вам.' },
  { num: '02', title: 'Подбираем объекты',   text: 'Агент с многолетним опытом готовит варианты под вас.' },
  { num: '03', title: 'Получаете результат', text: 'Никуда не ехать. Готовая подборка и сопровождение — бесплатно.' },
];

/* ─── ПАЛИТРА ─── */
const GOLD   = 'hsl(43 58% 55%)';
const GOLD20 = 'hsl(43 58% 55% / 0.2)';
const GOLD40 = 'hsl(43 58% 55% / 0.4)';
const NAVY   = 'hsl(222 25% 8%)';
const NAVYC  = 'hsl(222 22% 11%)';
const NAVYD  = 'hsl(222 30% 6%)';
const MUTED  = 'hsl(220 10% 58%)';
const FG     = 'hsl(45 20% 94%)';

const SEND_LEAD_URL = 'https://functions.poehali.dev/0951d9ac-cb20-4a66-865c-901b256f6154';
type FS = { name:string; phone:string; social:string; request:string; callback:boolean; sending:boolean; sent:boolean };
const emptyForm = (): FS => ({ name:'', phone:'', social:'', request:'', callback:false, sending:false, sent:false });

/* ─── Переиспользуемый заголовок секции по центру ─── */
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
          HERO — стиль "Дом Мечты": бейджи слева, заголовок справа
      ══════════════════════════════════ */}
      <section style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', overflow:'hidden', background:'hsl(222 28% 8%)' }}>

        {/* Тонкая золотая линия снизу блока */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${GOLD40}, transparent)` }} />

        {/* Основной контент */}
        <div style={{ position:'relative', zIndex:2, width:'100%', maxWidth:1200, margin:'0 auto', padding:'clamp(100px,14vh,140px) clamp(24px,6vw,80px) clamp(60px,8vh,100px)' }}>

          {/* Надзаголовок */}
          <div className="animate-fade-up" style={{ display:'flex', alignItems:'center', gap:14, marginBottom:40, animationDelay:'80ms' }}>
            <div style={{ width:36, height:1, background:GOLD }} />
            <span style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.38em', textTransform:'uppercase', color:GOLD }}>
              Real Estate · Club
            </span>
          </div>

          {/* Двухколоночная раскладка: бейджи | заголовок */}
          <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:'clamp(32px,5vw,72px)', alignItems:'start' }} className="hero-grid">

            {/* Левая колонка — бейджи столбиком */}
            <div className="animate-fade-up" style={{ display:'flex', flexDirection:'column', gap:12, paddingTop:8, animationDelay:'200ms' }}>
              {[
                { icon:'Shield', label:'Спокойствие сделки' },
                { icon:'Home',   label:'Подбор недвижимости — бесплатно' },
                { icon:'Star',   label:'Вы принимаете ключевое решение' },
              ].map(b => (
                <span key={b.label} style={{ display:'flex', alignItems:'center', gap:10, fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:400, letterSpacing:'0.12em', textTransform:'uppercase', color:MUTED, padding:'10px 18px', border:`1px solid ${GOLD20}`, borderRadius:100, whiteSpace:'nowrap', background:'hsl(222 30% 10%)' }}>
                  <Icon name={b.icon} size={13} style={{ color:GOLD, flexShrink:0 }} /> {b.label}
                </span>
              ))}
            </div>

            {/* Правая колонка — заголовок, подпись, кнопки */}
            <div>
              <h1 className="animate-fade-up font-display" style={{ animationDelay:'320ms', fontSize:'clamp(34px,5vw,72px)', fontWeight:300, lineHeight:1.15, letterSpacing:'-0.02em', margin:'0 0 24px', color:FG }}>
                <span style={{ display:'block', whiteSpace:'nowrap', WebkitTextFillColor:FG }}>Пространство для</span>
                <span style={{ display:'flex', alignItems:'center', gap:16, whiteSpace:'nowrap', WebkitTextFillColor:FG }}>
                  <em style={{ fontStyle:'italic', fontWeight:600, background:'linear-gradient(90deg, hsl(43 50% 44%) 0%, hsl(43 75% 70%) 30%, hsl(36 60% 55%) 50%, hsl(43 75% 70%) 70%, hsl(43 50% 44%) 100%)', backgroundSize:'250% auto', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent', animation:'goldShimmer 5s ease-in-out infinite' }}>Вашего</em>
                  {' '}
                  <em style={{ fontStyle:'italic', fontWeight:600, background:'linear-gradient(90deg, hsl(43 50% 44%) 0%, hsl(43 75% 70%) 30%, hsl(36 60% 55%) 50%, hsl(43 75% 70%) 70%, hsl(43 50% 44%) 100%)', backgroundSize:'250% auto', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent', animation:'goldShimmer 5s ease-in-out infinite' }}>комфорта</em>
                  <div style={{ width:36, height:1, background:GOLD, flexShrink:0 }} />
                </span>
                <span style={{ display:'block', whiteSpace:'nowrap', WebkitTextFillColor:FG }}>найдём то,</span>
                <span style={{ display:'block', whiteSpace:'nowrap', WebkitTextFillColor:FG }}>
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
                <button className="btn-apex btn-apex-gold" onClick={() => openRequest('social')}>
                  <Icon name="MessageCircle" size={14} /> Написать запрос
                </button>
                <button className="btn-apex btn-apex-outline" onClick={() => openRequest('meeting')}>
                  <Icon name="Phone" size={14} /> Обратный звонок
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Бегущая строка — внутри hero, прилипает к низу блока */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, borderTop:`1px solid ${GOLD20}`, background:'hsl(222 30% 6% / 0.85)', backdropFilter:'blur(8px)', padding:'12px 0', overflow:'hidden' }}>
          <div className="animate-marquee" style={{ display:'flex', whiteSpace:'nowrap', width:'max-content' }}>
            {[...Array(2)].map((_, k) => (
              <div key={k} style={{ display:'flex' }}>
                {['Жилая недвижимость','Коммерция','Бесплатный подбор','Юридическое сопровождение','Москва и МО','Инвестиции в недвижимость'].map(t => (
                  <span key={t+k} style={{ display:'inline-flex', alignItems:'center', gap:22, padding:'0 22px', fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:GOLD }}>
                    {t} <span style={{ fontSize:5, opacity:0.5 }}>◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SERVICES — карточки по центру
      ══════════════════════════════════ */}
      <section id="services" style={{ padding:'clamp(56px,8vw,112px) clamp(20px,5vw,60px)', background:NAVY }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionTitle
            eyebrow="Что мы делаем"
            title={<>Услуги <em style={{ color:GOLD, fontStyle:'italic' }}>под ключ</em></>}
            sub="Полный цикл работы с недвижимостью — от первого звонка до регистрации права собственности."
          />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16 }}>
            {SERVICES.map((s, i) => (
              <div key={s.title} className="apex-card animate-fade-up" style={{ padding:'clamp(22px,3vw,36px)', textAlign:'center', animationDelay:`${i*80}ms` }}>
                <div style={{ width:52, height:52, border:`1px solid ${GOLD40}`, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 18px' }}>
                  <Icon name={s.icon} size={22} style={{ color:GOLD }} />
                </div>
                <h3 className="font-display" style={{ fontSize:'clamp(16px,1.6vw,20px)', fontWeight:600, marginBottom:10, color:FG }}>{s.title}</h3>
                <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.8, color:MUTED }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          WHY US
      ══════════════════════════════════ */}
      <section id="why" style={{ padding:'clamp(56px,8vw,112px) clamp(20px,5vw,60px) 0', background:NAVYC }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionTitle
            eyebrow="Зачем мы нужны"
            title={<>Мы строим <em style={{ fontStyle:'italic', background:'linear-gradient(90deg, hsl(43 58% 45%), hsl(43 80% 70%), hsl(36 60% 50%))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>справедливый рынок</em> недвижимости, ориентированный на клиента — как покупателя, так и продавца</>}
          />

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }} className="why-grid">
            {/* Минусы */}
            <div style={{ background:NAVYD, borderRadius:20, padding:'clamp(24px,3vw,40px)', border:`1px solid ${GOLD20}` }}>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.28em', textTransform:'uppercase', color:MUTED, marginBottom:20 }}>Больше не нужно:</p>
              {[
                'Самостоятельно исследовать рынок недвижимости, сопряженный с присущими ему рисками и противоречиями',
                'Испытывать трудности в поиске действительно квалифицированного специалиста, чья надёжность требует тщательной проверки',
                'Продираться сквозь навязчивую рекламу, поток скрытых комиссий и неоднозначные платные опции на сторонних платформах',
              ].map((text, i) => (
                <div key={i} style={{ display:'flex', gap:14, padding:'16px 0', borderBottom: i < 2 ? `1px solid ${GOLD20}` : 'none' }}>
                  <div style={{ width:26, height:26, border:`1px solid ${GOLD20}`, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                    <Icon name="X" size={11} style={{ color:MUTED }} />
                  </div>
                  <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.75, color:MUTED }}>{text}</p>
                </div>
              ))}
            </div>

            {/* Плюсы */}
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div style={{ background:NAVYD, borderRadius:20, padding:'clamp(20px,2.5vw,32px)', border:`1px solid ${GOLD20}`, flex:1 }}>
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.28em', textTransform:'uppercase', color:MUTED, marginBottom:14 }}>Вы можете:</p>
                <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.8, color:FG, marginBottom:20, borderLeft:`2px solid ${GOLD}`, paddingLeft:14 }}>
                  Передать нам полный контроль над процессом и довериться нашим экспертам, пока вы располагаете свободным от этих обязательств временем, проводя его с пользой для себя.
                </p>
                <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.8, color:MUTED, marginBottom:20 }}>
                  Мы сделаем всё строго так, как вы изначально задумали. Ваш опыт на рынке недвижимости — без стресса и компромиссов.
                </p>
                {[
                  { icon:'ShieldCheck', label:'Надёжно',        text:'Прозрачные условия, тщательная проработка сделки и выявление всех потенциальных рисков.' },
                  { icon:'Zap',         label:'Оперативно',      text:'Заявки клиентов рассматриваются в приоритетном порядке.' },
                  { icon:'Award',       label:'Профессионально', text:'Подготовим договор и соберём полный комплект необходимых документов.' },
                ].map((item, i) => (
                  <div key={item.label} style={{ display:'flex', gap:14, padding:'14px 0', borderBottom: i < 2 ? `1px solid ${GOLD20}` : 'none' }}>
                    <div style={{ width:36, height:36, border:`1px solid ${GOLD40}`, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <Icon name={item.icon} size={15} style={{ color:GOLD }} />
                    </div>
                    <div>
                      <div style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.22em', textTransform:'uppercase', color:GOLD, marginBottom:3 }}>{item.label}</div>
                      <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.7, color:MUTED }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          DIRECTIONS
      ══════════════════════════════════ */}
      <section style={{ padding:'clamp(56px,8vw,112px) clamp(20px,5vw,60px)', background:NAVYC }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionTitle
            eyebrow="Направления"
            title={<><em style={{ fontStyle:'italic', background:'linear-gradient(90deg, hsl(43 58% 45%), hsl(43 80% 70%), hsl(36 60% 50%))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Четыре ключевых</em> вектора работы — от <em style={{ fontStyle:'italic', background:'linear-gradient(90deg, hsl(43 58% 45%), hsl(43 80% 70%), hsl(36 60% 50%))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>жилья</em> до <em style={{ fontStyle:'italic', background:'linear-gradient(90deg, hsl(43 58% 45%), hsl(43 80% 70%), hsl(36 60% 50%))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>инвестиционной коммерции</em> и <em style={{ fontStyle:'italic', background:'linear-gradient(90deg, hsl(43 58% 45%), hsl(43 80% 70%), hsl(36 60% 50%))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>ремонта</em>.</>}
            sub=""
          />

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16 }}>
            {DIRECTIONS.map((d, i) => (
              <div key={d.title} className="apex-card animate-fade-up" style={{ padding:'clamp(22px,3vw,36px)', animationDelay:`${i*80}ms` }}>
                <div style={{ width:48, height:48, border:`1px solid ${GOLD40}`, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                  <Icon name={d.icon} size={20} style={{ color:GOLD }} />
                </div>
                <h3 className="font-display" style={{ fontSize:'clamp(16px,1.6vw,20px)', fontWeight:600, marginBottom:10, color:FG }}>{d.title}</h3>
                <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.8, color:MUTED }}>{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ABOUT + STEPS
      ══════════════════════════════════ */}
      <section id="about" style={{ padding:'clamp(56px,8vw,112px) clamp(20px,5vw,60px)', background:NAVY }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionTitle
            eyebrow="О нас"
            title={<>О компании{' '}
              <span style={{ display:'inline-flex', flexDirection:'column', lineHeight:1, verticalAlign:'middle', margin:'0 6px' }}>
                <span style={{ fontFamily:'Playfair Display, serif', fontSize:'0.85em', fontWeight:700, letterSpacing:'0.16em', color:FG, textTransform:'uppercase', fontStyle:'normal' }}>APEX</span>
                <span style={{ fontFamily:'Inter, sans-serif', fontSize:'0.28em', fontWeight:500, letterSpacing:'0.44em', textTransform:'uppercase', color:GOLD, marginTop:2, fontStyle:'normal' }}>SOLUTIONS</span>
              </span>
            </>}
          />

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, alignItems:'stretch' }} className="about-grid">

            {/* Левая колонка — на фоне */}
            <div style={{ background:NAVYC, padding:'clamp(28px,4vw,52px)', display:'flex', flexDirection:'column', gap:24, borderRadius:'24px 0 0 24px' }}>
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:14, lineHeight:1.9, color:MUTED }}>
                Мы — <strong style={{ color:FG, fontWeight:500 }}>динамично развивающаяся организация</strong>, работающая на рынке услуг по подбору недвижимости с <strong style={{ color:GOLD, fontWeight:500 }}>2015 года</strong>. За это время мы успешно реализовали множество проектов разного масштаба и уровня сложности.
              </p>
              <div style={{ width:40, height:1, background:`linear-gradient(to right, ${GOLD}, transparent)` }} />
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:14, lineHeight:1.9, color:MUTED }}>
                Образование компании стало логическим продолжением успешного завершения <strong style={{ color:FG, fontWeight:500 }}>финансовых сделок группой специалистов</strong>, составивших основу нашей профессиональной деятельности.
              </p>
              <div style={{ width:40, height:1, background:`linear-gradient(to right, ${GOLD}, transparent)` }} />
              {/* Ключевое заявление */}
              <div style={{ marginTop:8, background:`linear-gradient(135deg, ${GOLD20}, hsl(43 58% 55% / 0.05))`, borderRadius:16, padding:'22px 26px', borderLeft:`3px solid ${GOLD}` }}>
                <p className="font-display" style={{ fontSize:'clamp(14px,1.4vw,18px)', fontStyle:'italic', fontWeight:300, lineHeight:1.75, color:FG, margin:0 }}>
                  «Apex Solutions — команда, поставившая своей целью решать все ваши вопросы, связанные с приобретением недвижимости. Мы готовы помочь принять верное решение и подобрать для Вас наилучшие условия.»
                </p>
              </div>
            </div>

            {/* Правая колонка — в рамке */}
            <div style={{ border:`1px solid ${GOLD20}`, borderRadius:'0 24px 24px 0', padding:'clamp(28px,4vw,52px)', display:'flex', flexDirection:'column', gap:24 }}>

              {/* Блок: Команда */}
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                  <Icon name="Users" size={14} style={{ color:GOLD }} />
                  <span style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:600, letterSpacing:'0.28em', textTransform:'uppercase', color:GOLD }}>Наша команда</span>
                </div>
                <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13.5, lineHeight:1.85, color:MUTED }}>
                  Опытные профессионалы, увлечённые своим делом. Наша цель — не просто подобрать объект, а помочь сделать <strong style={{ color:FG, fontWeight:500 }}>осознанный выбор</strong> с индивидуальным подходом к каждому клиенту.
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:4 }}>
                  {['Индивидуальный подход', 'Актуальная аналитика', 'Прозрачность'].map(b => (
                    <span key={b} style={{ fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:400, padding:'4px 12px', borderRadius:20, border:`1px solid ${GOLD40}`, color:GOLD, whiteSpace:'nowrap' }}>{b}</span>
                  ))}
                </div>
              </div>

              <div style={{ width:'100%', height:1, background:`linear-gradient(to right, transparent, ${GOLD20}, transparent)` }} />

              {/* Блок: Финансовые решения */}
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                  <Icon name="Landmark" size={14} style={{ color:GOLD }} />
                  <span style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:600, letterSpacing:'0.28em', textTransform:'uppercase', color:GOLD }}>Финансовые решения</span>
                </div>
                <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13.5, lineHeight:1.85, color:MUTED }}>
                  Ипотека, рефинансирование, потребительский кредит и поддержка бизнеса. Сотрудничаем с <strong style={{ color:FG, fontWeight:500 }}>ведущими банками</strong> для выгодных ставок и удобных условий.
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:4 }}>
                  {['Ипотека', 'Рефинансирование', 'Бизнес-кредит', 'Партнёрские ставки'].map(b => (
                    <span key={b} style={{ fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:400, padding:'4px 12px', borderRadius:20, border:`1px solid ${GOLD40}`, color:GOLD, whiteSpace:'nowrap' }}>{b}</span>
                  ))}
                </div>
              </div>

              <div style={{ width:'100%', height:1, background:`linear-gradient(to right, transparent, ${GOLD20}, transparent)` }} />

              {/* Блок: Сервис */}
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                  <Icon name="LayoutDashboard" size={14} style={{ color:GOLD }} />
                  <span style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:600, letterSpacing:'0.28em', textTransform:'uppercase', color:GOLD }}>Комплексный сервис</span>
                </div>
                <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13.5, lineHeight:1.85, color:MUTED }}>
                  Всё необходимое в одном месте. Экономим ваше время и обеспечиваем <strong style={{ color:FG, fontWeight:500 }}>лучший опыт</strong> взаимодействия с миром недвижимости.
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:4 }}>
                  {['Всё в одном месте', 'Экономия времени', 'Лучший опыт'].map(b => (
                    <span key={b} style={{ fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:400, padding:'4px 12px', borderRadius:20, border:`1px solid ${GOLD40}`, color:GOLD, whiteSpace:'nowrap' }}>{b}</span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA
      ══════════════════════════════════ */}
      <section id="contacts" style={{ padding:'clamp(48px,7vw,96px) clamp(20px,5vw,60px)', background:'hsl(222 25% 8%)' }}>
        <div style={{ maxWidth:960, margin:'0 auto' }}>
          {/* Рамка с акцентными уголками */}
          <div style={{
            border:`1px solid ${GOLD20}`,
            borderRadius:4,
            padding:'clamp(48px,6vw,80px) clamp(28px,5vw,72px)',
            textAlign:'center',
            position:'relative',
            background:NAVYD,
          }}>
            {/* Уголок — левый верхний */}
            <span style={{ position:'absolute', top:-1, left:-1, width:94, height:94, borderTop:`0.5px solid ${GOLD}`, borderLeft:`0.5px solid ${GOLD}`, display:'block' }} />
            {/* Уголок — правый нижний */}
            <span style={{ position:'absolute', bottom:-1, right:-1, width:94, height:94, borderBottom:`0.5px solid ${GOLD}`, borderRight:`0.5px solid ${GOLD}`, display:'block' }} />
            {/* Заголовок */}
            <h2 className="font-display" style={{ fontSize:'clamp(32px,5vw,68px)', fontWeight:700, lineHeight:1.08, letterSpacing:'-0.02em', marginBottom:20, color:FG }}>
              Поиск недвижимости<br />начинается <em className="gold-shimmer" style={{ fontStyle:'italic' }}>здесь</em>
            </h2>

            {/* Подпись */}
            <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:14, lineHeight:1.85, color:MUTED, maxWidth:480, margin:'0 auto 36px' }}>
              Выберите комфортный способ связи: напишите нам в социальных сетях или закажите бесплатный обратный звонок от нашего агента.
            </p>

            {/* Кнопки — широкие, одинаковой высоты */}
            <div style={{ display:'flex', justifyContent:'center', gap:14, flexWrap:'wrap', marginBottom:32 }}>
              <button className="btn-apex btn-apex-gold" onClick={() => openRequest('social')}
                style={{ minWidth:200, height:56, fontSize:11, letterSpacing:'0.28em' }}>
                <Icon name="MessageCircle" size={15} /> Написать
              </button>
              <button className="btn-apex btn-apex-outline" onClick={() => openRequest('meeting')}
                style={{ minWidth:200, height:56, fontSize:11, letterSpacing:'0.28em' }}>
                <Icon name="Phone" size={15} /> Обратный звонок
              </button>
            </div>

            {/* Соцсети */}
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
                {mode==='social' ? 'Опишите, что вы ищете — мы подберём объекты бесплатно.' : 'Оставьте номер — агент перезвонит и проконсультирует бесплатно.'}
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
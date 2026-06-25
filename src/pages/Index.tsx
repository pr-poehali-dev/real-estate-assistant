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

/* ════════ ИЗОБРАЖЕНИЕ HERO ════════ */
const HERO_IMG = 'https://cdn.poehali.dev/projects/ab7a83ba-e182-427f-8219-a315e20c4c4a/files/0531d703-0186-48bc-b44b-e0b7573ffa6e.jpg';

/* ════════ ДАННЫЕ — оригинальный текст ════════ */
const SERVICES = [
  { num:'01', icon:'MessageSquare', title:'Бесплатная консультация',  text:'Отвечаем на все вопросы по покупке, продаже и юридическим нюансам — без скрытых условий.' },
  { num:'02', icon:'Search',        title:'Подбор объектов',           text:'Жилая и коммерческая недвижимость по преимущественно низким ценам под ваши требования.' },
  { num:'03', icon:'Handshake',     title:'Сопровождение сделки',      text:'Покупка, продажа, переговоры и безопасная передача средств — контролируем каждый этап.' },
  { num:'04', icon:'FileCheck',     title:'Юридическая экспертиза',    text:'Проверим юридическую чистоту объекта, составим договор и соберём все необходимые документы.' },
];

const DIRECTIONS = [
  { label:'I',   icon:'Home',          title:'Жилая недвижимость',        text:'Квартиры в новостройках и на вторичном рынке — для себя или под инвестицию.' },
  { label:'II',  icon:'Building2',     title:'Коммерческая недвижимость',  text:'Офисные, торговые и индустриальные объекты для аренды или ведения бизнеса.' },
  { label:'III', icon:'ClipboardList', title:'Экспертная оценка',          text:'Профессиональная оценка объектов недвижимости перед принятием решения о покупке.' },
  { label:'IV',  icon:'Hammer',        title:'Ремонт под ключ',            text:'Подберём проверенного подрядчика из числа наших партнёров, который реализует лучший дизайн вашей новой квартиры — персонально для вас.' },
];

const STEPS = [
  { num:'01', title:'Оставляете запрос',   text:'Напишите нам или закажите обратный звонок — как удобно вам.' },
  { num:'02', title:'Подбираем объекты',   text:'Агент с многолетним опытом готовит варианты под вас.' },
  { num:'03', title:'Получаете результат', text:'Никуда не ехать. Готовая подборка и сопровождение — бесплатно.' },
];

const CAPABILITIES = [
  { icon:'MapPin',      text:'Помощь в поиске недвижимости, подходящей под требования покупателя' },
  { icon:'Users',       text:'Посредничество в переговорах между сторонами сделки' },
  { icon:'ShieldCheck', text:'Проверка юридической чистоты помещений' },
  { icon:'FileText',    text:'Сбор и подготовка документов для заключения договора купли-продажи' },
  { icon:'Banknote',    text:'Помощь во взаимных расчётах — безопасная передача денег при сделке' },
];

/* ════════ ЦВЕТА ════════ */
const C = {
  gold:      '#C9A84C',
  gold10:    'rgba(201,168,76,0.10)',
  gold20:    'rgba(201,168,76,0.20)',
  gold40:    'rgba(201,168,76,0.40)',
  gold60:    'rgba(201,168,76,0.60)',
  cherry:    '#390517',
  emerald:   '#16302B',
  charcoal:  '#0A0A0A',
  cream:     '#E0D9CC',
  creamDim:  'rgba(224,217,204,0.52)',
};

/* Фоны секций без фото — чистые цвета */
const BG_CHERRY  = `linear-gradient(135deg, #200209 0%, #390517 50%, #1a0210 100%)`;
const BG_EMERALD = `linear-gradient(135deg, #0d1e1a 0%, #16302B 60%, #0a1814 100%)`;
const BG_DARK    = `linear-gradient(160deg, #0e0e0e 0%, #141414 100%)`;

const SEND_LEAD_URL = 'https://functions.poehali.dev/0951d9ac-cb20-4a66-865c-901b256f6154';
type FS = { name:string; phone:string; social:string; request:string; callback:boolean; sending:boolean; sent:boolean };
const emptyForm = (): FS => ({ name:'', phone:'', social:'', request:'', callback:false, sending:false, sent:false });

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily:'Jost,sans-serif', fontSize:10, fontWeight:400, letterSpacing:'0.4em', textTransform:'uppercase', color:C.gold }}>{children}</span>
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
    setF({ sending:true });
    try {
      await fetch(SEND_LEAD_URL, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name:f.name, phone:f.phone, social:f.social, request:f.request, callback:f.callback, source: mode==='social'?'Соцсети':'Звонок' })
      });
      setF({ sent:true, name:'', phone:'', social:'', request:'', callback:false });
    } finally { setF({ sending:false }); }
  };

  return (
    <div style={{ background:C.charcoal, color:C.cream, minHeight:'100vh', overflowX:'hidden' }}>

      {/* ═══════════════ HERO ═══════════════ */}
      <section id="hero" style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column' }}>
        <img src={HERO_IMG} alt="Apex Solutions" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }} />
        <div style={{ position:'absolute', inset:0, zIndex:1, background:`linear-gradient(105deg, rgba(10,10,10,0.93) 0%, rgba(10,10,10,0.62) 45%, rgba(57,5,23,0.28) 100%)` }} />

        {/* Вертикальная клубная подпись */}
        <div style={{ position:'absolute', top:0, bottom:0, left:'clamp(16px,3vw,44px)', zIndex:2, display:'flex', alignItems:'center' }} className="hidden md:flex">
          <span className="vertical-text" style={{ fontFamily:'Jost,sans-serif', fontSize:10, letterSpacing:'0.5em', textTransform:'uppercase', color:C.gold60 }}>
            Private Real Estate Club · Est. 2025
          </span>
        </div>

        <div style={{ position:'relative', zIndex:2, flex:1, display:'flex', alignItems:'center', maxWidth:1280, width:'100%', margin:'0 auto', padding:'120px clamp(28px,7vw,110px) 60px' }}>
          <div>
            <div className="animate-fade-up" style={{ display:'flex', alignItems:'center', gap:16, marginBottom:36, animationDelay:'150ms' }}>
              <div style={{ width:48, height:1, background:C.gold }} />
              <Eyebrow>Apex Solutions · Москва и МО</Eyebrow>
            </div>

            <h1 className="animate-fade-up font-display" style={{ animationDelay:'300ms', fontSize:'clamp(48px,8.5vw,118px)', fontWeight:300, lineHeight:0.98, letterSpacing:'-0.025em', margin:0, maxWidth:900 }}>
              Найдём дом, <br />
              <span style={{ display:'inline-flex', alignItems:'baseline', gap:'0.25em', flexWrap:'wrap' }}>
                где вам будет{' '}
                <em className="gold-shimmer" style={{ fontStyle:'italic', fontWeight:500 }}>тепло</em>
              </span>
            </h1>

            <div className="animate-fade-up" style={{ animationDelay:'460ms', display:'flex', flexWrap:'wrap', gap:'clamp(28px,5vw,72px)', alignItems:'flex-end', marginTop:'clamp(36px,5vw,60px)' }}>
              <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.85, letterSpacing:'0.05em', color:C.creamDim, maxWidth:400 }}>
                Бесплатно подберём квартиру, ипотеку и рассрочку. Вам не нужно никуда ехать — просто оставьте запрос и получите готовый результат.
              </p>
              <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
                <button className="btn-lux btn-lux-gold" onClick={() => openRequest('social')}>
                  <Icon name="MessageCircle" size={14} /> Написать запрос
                </button>
                <button className="btn-lux btn-lux-ghost" onClick={() => openRequest('meeting')}>
                  <Icon name="Phone" size={14} /> Обратный звонок
                </button>
              </div>
            </div>

            <div className="animate-fade-up" style={{ animationDelay:'620ms', display:'flex', flexWrap:'wrap', gap:28, marginTop:36 }}>
              {[
                { icon:'Check', label:'Без условий' },
                { icon:'Check', label:'Вы ничего не платите' },
                { icon:'MapPin', label:'Москва и МО' },
              ].map(b => (
                <span key={b.label} style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'Jost,sans-serif', fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:C.creamDim }}>
                  <Icon name={b.icon} size={12} style={{ color:C.gold }} /> {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Строка статистики снизу */}
        <div style={{ position:'relative', zIndex:2, borderTop:`1px solid ${C.gold20}` }}>
          <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(28px,7vw,110px)', display:'grid', gridTemplateColumns:'repeat(3,1fr)' }}>
            {[
              { n:'С 2025', l:'На рынке' },
              { n:'100%',   l:'Бесплатный подбор' },
              { n:'24/7',   l:'На связи для вас' },
            ].map((s, i) => (
              <div key={s.l} style={{ padding:'clamp(20px,3vw,34px) 0', borderLeft: i>0 ? `1px solid ${C.gold10}` : 'none', paddingLeft: i>0 ? 'clamp(20px,3vw,40px)' : 0 }}>
                <div className="font-display" style={{ fontSize:'clamp(24px,3.2vw,42px)', fontWeight:300, color:C.gold, letterSpacing:'-0.02em', lineHeight:1 }}>{s.n}</div>
                <div style={{ fontFamily:'Jost,sans-serif', fontSize:9, letterSpacing:'0.28em', textTransform:'uppercase', color:C.creamDim, marginTop:8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ MARQUEE — золотой акцент без фото ═══════════════ */}
      <div style={{ position:'relative', overflow:'hidden', padding:'14px 0', background:C.cherry }}>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(90deg, ${C.cherry}, rgba(57,5,23,0.85) 50%, ${C.cherry})` }} />
        <div className="animate-marquee" style={{ position:'relative', display:'flex', whiteSpace:'nowrap', width:'max-content' }}>
          {[...Array(2)].map((_, k) => (
            <div key={k} style={{ display:'flex' }}>
              {['Жилая недвижимость','Коммерция','Бесплатный подбор','Юридическое сопровождение','Москва и МО','Инвестиции'].map(t => (
                <span key={t+k} style={{ display:'inline-flex', alignItems:'center', gap:28, padding:'0 28px', fontFamily:'Jost,sans-serif', fontSize:11, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold }}>
                  {t} <span style={{ fontSize:6 }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section id="services" style={{ padding:'clamp(70px,9vw,140px) clamp(28px,6vw,90px)', background:C.charcoal }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'minmax(260px,0.85fr) 1.15fr', gap:'clamp(40px,6vw,110px)', alignItems:'start' }} className="services-grid">
            <div className="animate-fade-up">
              <Eyebrow>Что мы делаем</Eyebrow>
              <h2 className="font-display" style={{ fontSize:'clamp(40px,5.5vw,82px)', fontWeight:300, lineHeight:1, marginTop:18, letterSpacing:'-0.025em' }}>
                Услуги<br /><em style={{ color:C.gold, fontStyle:'italic' }}>под ключ</em>
              </h2>
              <div style={{ marginTop:'clamp(28px,4vw,48px)', paddingLeft:24, borderLeft:`2px solid ${C.gold40}` }}>
                <p className="font-display" style={{ fontSize:'clamp(18px,2vw,24px)', fontStyle:'italic', fontWeight:300, lineHeight:1.6, color:C.cream }}>
                  «Мы не просто подбираем варианты. Мы находим <em style={{ color:C.gold }}>ваш</em> дом.»
                </p>
              </div>
            </div>

            {/* Витрины 2×2 без фото-фона */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:C.gold20 }}>
              {SERVICES.map((s, i) => (
                <div key={s.title} className="vitrine vitrine-corner animate-fade-up" style={{ padding:'clamp(24px,3vw,42px)', animationDelay:`${i*100}ms` }}>
                  <div className="monogram" style={{ fontSize:'clamp(36px,4vw,56px)' }}>{s.num}</div>
                  <Icon name={s.icon} size={20} style={{ color:C.gold, margin:'16px 0 14px' }} />
                  <h3 className="font-display" style={{ fontSize:'clamp(17px,1.7vw,23px)', fontWeight:400, marginBottom:10, letterSpacing:'-0.01em' }}>{s.title}</h3>
                  <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.8, color:C.creamDim }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY — вишнёвый градиент ═══════════════ */}
      <section id="why" style={{ position:'relative', overflow:'hidden' }}>
        <div style={{ background:BG_CHERRY, padding:'clamp(70px,9vw,140px) clamp(28px,6vw,90px)' }}>
          <div style={{ maxWidth:1280, margin:'0 auto' }}>
            <div className="animate-fade-up" style={{ marginBottom:'clamp(48px,6vw,80px)' }}>
              <Eyebrow>Зачем мы нужны</Eyebrow>
              <h2 className="font-display" style={{ fontSize:'clamp(32px,5vw,70px)', fontWeight:300, lineHeight:1.08, marginTop:14, letterSpacing:'-0.025em', maxWidth:900 }}>
                Рынок недвижимости должен служить <em style={{ color:C.gold }}>покупателю</em>,<br />а не тем, кто продаёт
              </h2>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,80px)' }} className="why-grid">
              <div className="animate-fade-up">
                <p style={{ fontFamily:'Jost,sans-serif', fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40, marginBottom:20 }}>Вам больше не нужно:</p>
                {[
                  'Тратить время на самостоятельный поиск квартиры и сталкиваться с фейковыми объявлениями',
                  'Часами искать надёжного агента среди сотен предложений',
                  'Разбираться в бесконечном потоке рекламы и платных услуг на сторонних сайтах',
                ].map((text, i) => (
                  <div key={i} style={{ display:'flex', gap:20, padding:'22px 0', borderBottom:`1px solid ${C.gold10}` }}>
                    <span className="font-display" style={{ fontSize:22, color:C.gold40, lineHeight:1, fontStyle:'italic', flexShrink:0 }}>—</span>
                    <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:13.5, lineHeight:1.75, color:C.creamDim }}>{text}</p>
                  </div>
                ))}
              </div>

              <div className="animate-fade-up" style={{ animationDelay:'180ms' }}>
                <p style={{ fontFamily:'Jost,sans-serif', fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40, marginBottom:20 }}>Вы можете:</p>
                <div style={{ borderLeft:`2px solid ${C.gold}`, paddingLeft:24, marginBottom:28 }}>
                  <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:'clamp(14px,1.4vw,17px)', lineHeight:1.75, color:C.cream }}>
                    Доверить всю эту работу нам — и использовать сэкономленное время для себя.
                  </p>
                </div>
                <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:13.5, lineHeight:1.85, color:C.creamDim, marginBottom:24 }}>
                  Мы выполним всё именно так, как вы задумали. С полной уверенностью в качестве каждого этапа — от первого звонка до получения ключей.
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {[
                    { icon:'ShieldCheck', label:'Надёжно',         text:'Прозрачные условия, тщательная проработка сделки и выявление всех возможных рисков' },
                    { icon:'Zap',         label:'Быстро',           text:'Заявки клиентов рассматриваются в приоритетном порядке' },
                    { icon:'Star',        label:'Профессионально',  text:'Составим договор и соберём полный пакет необходимых документов' },
                  ].map(item => (
                    <div key={item.label} className="gold-frame" style={{ display:'flex', gap:16, padding:'16px 20px', background:'rgba(10,10,10,0.35)', borderRadius:12 }}>
                      <Icon name={item.icon} size={18} style={{ color:C.gold, flexShrink:0, marginTop:2 }} />
                      <div>
                        <div style={{ fontFamily:'Jost,sans-serif', fontSize:9, letterSpacing:'0.25em', textTransform:'uppercase', color:C.gold, marginBottom:5 }}>{item.label}</div>
                        <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.75, color:C.creamDim }}>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT — изумрудный градиент ═══════════════ */}
      <section id="about">
        <div style={{ display:'grid', gridTemplateColumns:'0.9fr 1.1fr' }} className="about-grid">
          {/* Левая — изумрудная панель */}
          <div style={{ position:'relative', minHeight:420, background:BG_EMERALD, padding:'clamp(48px,6vw,90px)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
            {/* Золотой декор-линия */}
            <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg, ${C.gold}, transparent)` }} />
            <Eyebrow>О компании</Eyebrow>
            <h2 className="font-display animate-fade-up" style={{ fontSize:'clamp(34px,4.5vw,66px)', fontWeight:300, lineHeight:1.04, marginTop:14, letterSpacing:'-0.025em' }}>
              История и команда<br /><em style={{ color:C.gold }}>«Дом Мечты»</em>
            </h2>
            <div style={{ marginTop:'clamp(28px,4vw,44px)', padding:'24px 28px', border:`1px solid ${C.gold20}`, borderRadius:16, position:'relative' }}>
              <div style={{ position:'absolute', top:0, left:0, width:32, height:1, background:C.gold }} />
              <div style={{ position:'absolute', top:0, left:0, width:1, height:32, background:C.gold }} />
              <div style={{ position:'absolute', bottom:0, right:0, width:32, height:1, background:C.gold }} />
              <div style={{ position:'absolute', bottom:0, right:0, width:1, height:32, background:C.gold }} />
              <p className="font-display" style={{ fontSize:'clamp(17px,1.8vw,22px)', fontStyle:'italic', fontWeight:300, lineHeight:1.6, color:C.cream }}>
                «Результат гарантирован. Наша команда работает на него, а не на видимость работы.»
              </p>
            </div>
          </div>

          {/* Правая — тёмная с текстом */}
          <div style={{ padding:'clamp(48px,6vw,90px) clamp(28px,5vw,80px)', background:C.charcoal }}>
            <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:'clamp(40px,5vw,60px)' }} className="animate-fade-up">
              {[
                'Мы — динамично развивающаяся организация, работающая на рынке услуг по подбору недвижимости с 2025 года. За это время мы успешно реализовали множество проектов разного масштаба и уровня сложности.',
                'Образование компании стало логическим продолжением успешного завершения финансовых сделок группой специалистов, составивших основу нашей профессиональной деятельности.',
                '«Дом Мечты» — команда, поставившая своей целью решать все ваши вопросы, связанные с приобретением недвижимости. Мы готовы помочь принять верное решение и подобрать наилучшие условия именно для вас.',
              ].map((t, i) => (
                <p key={i} style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:13.5, lineHeight:1.85, color:C.creamDim }}>{t}</p>
              ))}
            </div>

            <p style={{ fontFamily:'Jost,sans-serif', fontSize:10, letterSpacing:'0.4em', textTransform:'uppercase', color:C.gold, marginBottom:32 }}>Как это работает</p>
            <div className="animate-slide-left">
              {STEPS.map((step, i) => (
                <div key={step.num} style={{ display:'flex', gap:24, padding:'24px 0', borderTop:`1px solid ${C.gold10}`, borderBottom: i===STEPS.length-1 ? `1px solid ${C.gold10}` : 'none' }}>
                  <div className="monogram" style={{ fontSize:'clamp(40px,4.5vw,64px)', width:'2ch', flexShrink:0 }}>{step.num}</div>
                  <div style={{ paddingTop:6 }}>
                    <h3 className="font-display" style={{ fontSize:'clamp(20px,2vw,28px)', fontWeight:400, marginBottom:6, letterSpacing:'-0.01em' }}>{step.title}</h3>
                    <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.75, color:C.creamDim }}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-lux btn-lux-gold" onClick={() => openRequest('social')} style={{ width:'100%', marginTop:40 }}>
              Начать прямо сейчас
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════ DIRECTIONS ═══════════════ */}
      <section style={{ padding:'clamp(70px,9vw,140px) clamp(28px,6vw,90px)', background:BG_DARK }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'clamp(44px,5vw,72px)', flexWrap:'wrap', gap:24 }}>
            <div className="animate-fade-up">
              <Eyebrow>Направления</Eyebrow>
              <h2 className="font-display" style={{ fontSize:'clamp(36px,5vw,74px)', fontWeight:300, lineHeight:1, marginTop:16, letterSpacing:'-0.025em' }}>
                Основные<br /><em style={{ color:C.gold, fontStyle:'italic' }}>направления</em>
              </h2>
            </div>
            <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.8, color:C.creamDim, maxWidth:300 }}>
              Четыре ключевых вектора работы — от жилья до инвестиционной коммерции и ремонта.
            </p>
          </div>

          {/* Карточки направлений — цветной левый акцент вместо фото */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:C.gold20 }} className="dir-grid">
            {DIRECTIONS.map((d, i) => {
              const accents = [C.emerald, '#0e0e0e', '#2a1f05', C.cherry];
              return (
                <div key={d.title} className="vitrine animate-fade-up" style={{ display:'flex', minHeight:180, animationDelay:`${i*110}ms` }}>
                  {/* Цветная плашка вместо фото */}
                  <div style={{ width:'28%', minWidth:72, flexShrink:0, position:'relative', background:accents[i], display:'flex', alignItems:'flex-end', padding:14 }}>
                    <div style={{ position:'absolute', inset:0, background:`linear-gradient(135deg, rgba(201,168,76,0.08), transparent)` }} />
                    <div className="font-display" style={{ fontSize:'clamp(28px,3.5vw,52px)', fontWeight:300, color:C.gold20, lineHeight:1, letterSpacing:'-0.04em', position:'relative' }}>{d.label}</div>
                  </div>
                  <div style={{ padding:'clamp(20px,2.5vw,34px)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
                      <Icon name={d.icon} size={16} style={{ color:C.gold }} />
                      <h3 className="font-display" style={{ fontSize:'clamp(16px,1.6vw,22px)', fontWeight:400, letterSpacing:'-0.01em' }}>{d.title}</h3>
                    </div>
                    <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.75, color:C.creamDim }}>{d.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Возможности */}
          <div className="gold-frame" style={{ marginTop:'clamp(28px,4vw,52px)', padding:'clamp(28px,4vw,52px)', borderRadius:20 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(24px,4vw,60px)', alignItems:'center' }} className="cap-grid">
              <div>
                <Eyebrow>Наши возможности</Eyebrow>
                <p className="font-display" style={{ fontSize:'clamp(19px,2.2vw,28px)', fontStyle:'italic', fontWeight:300, lineHeight:1.55, color:C.cream, margin:'18px 0 16px' }}>
                  Некоторые из наших постоянных клиентов зарабатывают на объектах, которые мы находим — за счёт покупки и перепродажи по выгодной цене.
                </p>
                <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.8, color:C.creamDim }}>
                  Наша цель — поиск наилучших условий при покупке. Мы не просто подбираем варианты — мы находим их по преимущественно низким ценам.
                </p>
                <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.8, color:C.creamDim, marginTop:12 }}>
                  После покупки готовы помочь с ремонтом: подберём проверенного подрядчика, который воплотит лучший дизайн вашей квартиры — под ваш вкус и бюджет.
                </p>
              </div>
              <div>
                {CAPABILITIES.map((c, i) => (
                  <div key={i} style={{ display:'flex', gap:16, alignItems:'flex-start', padding:'14px 0', borderBottom: i<CAPABILITIES.length-1 ? `1px solid ${C.gold10}` : 'none' }}>
                    <Icon name={c.icon} size={15} style={{ color:C.gold, flexShrink:0, marginTop:2 }} />
                    <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.7, color:C.creamDim }}>{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA — глубокий cherry+emerald без фото ═══════════════ */}
      <section id="contacts" style={{ position:'relative', overflow:'hidden' }}>
        <div style={{
          background:`linear-gradient(135deg, #1a0209 0%, ${C.cherry} 30%, #120d08 60%, ${C.emerald} 100%)`,
          padding:'clamp(80px,11vw,170px) clamp(28px,6vw,90px)',
          position:'relative',
        }}>
          {/* Декоративные золотые линии */}
          <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${C.gold40}, transparent)` }} />
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${C.gold20}, transparent)` }} />
          {/* Радиальный свет в центре */}
          <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translateX(-50%)', width:'70%', height:'60%', background:`radial-gradient(ellipse, ${C.gold10} 0%, transparent 70%)`, pointerEvents:'none' }} />

          <div style={{ maxWidth:820, margin:'0 auto', textAlign:'center', position:'relative' }}>
            <div className="animate-fade-up" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:18, marginBottom:32 }}>
              <div style={{ width:44, height:1, background:C.gold }} />
              <Eyebrow>Начать сейчас</Eyebrow>
              <div style={{ width:44, height:1, background:C.gold }} />
            </div>
            <h2 className="font-display animate-fade-up" style={{ fontSize:'clamp(44px,7vw,96px)', fontWeight:300, lineHeight:1, letterSpacing:'-0.025em', marginBottom:28, animationDelay:'150ms' }}>
              Поиск недвижимости<br />начинается <em className="gold-shimmer">здесь</em>
            </h2>
            <p className="animate-fade-up" style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:14, lineHeight:1.9, color:C.creamDim, marginBottom:52, letterSpacing:'0.05em', animationDelay:'280ms' }}>
              Выберите комфортный способ связи: напишите нам в социальных сетях или закажите бесплатный обратный звонок от нашего агента.
            </p>
            <div className="animate-fade-up" style={{ display:'flex', justifyContent:'center', gap:16, flexWrap:'wrap', marginBottom:52, animationDelay:'400ms' }}>
              <button className="btn-lux btn-lux-gold" onClick={() => openRequest('social')} style={{ minWidth:210 }}>
                <Icon name="MessageCircle" size={14} /> Написать
              </button>
              <button className="btn-lux btn-lux-ghost" onClick={() => openRequest('meeting')} style={{ minWidth:210 }}>
                <Icon name="Phone" size={14} /> Обратный звонок
              </button>
            </div>
            <div className="animate-fade-up" style={{ display:'flex', justifyContent:'center', gap:'clamp(18px,3vw,44px)', flexWrap:'wrap', animationDelay:'520ms' }}>
              {[
                { icon:'AtSign', label:'Mail.ru' },
                { icon:'Send',   label:'Telegram' },
                { icon:'Phone',  label:'WhatsApp' },
                { icon:'Mail',   label:'MAX' },
              ].map(c => (
                <span key={c.label} style={{ display:'flex', alignItems:'center', gap:9, fontFamily:'Jost,sans-serif', fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:C.creamDim }} translate="no">
                  <Icon name={c.icon} size={13} style={{ color:C.gold }} /> {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ DIALOG ═══════════════ */}
      <Dialog open={open} onOpenChange={v => { if (!v) setForms(prev => ({ ...prev, [mode]: emptyForm() })); setOpen(v); }}>
        <DialogContent className="max-w-md w-[calc(100%-2rem)] max-h-[90dvh] overflow-y-auto" style={{ background:'hsl(0 0% 6%)', border:`1px solid ${C.gold20}`, borderRadius:20 }}>
          {!f.sent && (
            <DialogHeader>
              <DialogTitle className="font-display" style={{ fontSize:30, fontWeight:400, letterSpacing:'-0.01em' }}>
                {mode==='social' ? 'Запрос на подбор' : 'Обратный звонок'}
              </DialogTitle>
              <DialogDescription style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:12.5, letterSpacing:'0.05em', color:C.creamDim, marginTop:6 }}>
                {mode==='social'
                  ? 'Опишите, что вы ищете — мы подберём объекты бесплатно.'
                  : 'Оставьте номер — агент перезвонит и проконсультирует бесплатно.'}
              </DialogDescription>
            </DialogHeader>
          )}
          {f.sent ? (
            <div style={{ padding:'52px 0', textAlign:'center' }}>
              <div style={{ width:54, height:54, border:`1px solid ${C.gold40}`, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 22px' }}>
                <Icon name="Check" size={22} style={{ color:C.gold }} />
              </div>
              <div className="font-display" style={{ fontSize:24, fontWeight:400, marginBottom:8 }}>Заявка отправлена!</div>
              <div style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:12.5, color:C.creamDim }}>Мы свяжемся с вами в ближайшее время.</div>
            </div>
          ) : (
            <form style={{ display:'flex', flexDirection:'column', gap:26, marginTop:26 }} onSubmit={handleSubmit}
              onKeyDown={e => { if (e.key==='Enter' && (e.target as HTMLElement).tagName!=='TEXTAREA') { e.preventDefault(); const fields = Array.from((e.currentTarget as HTMLFormElement).querySelectorAll<HTMLElement>('input:not([type=checkbox]),textarea')); const idx = fields.indexOf(e.target as HTMLElement); if (idx>=0 && idx<fields.length-1) fields[idx+1].focus(); } }}>
              <div>
                <label style={{ fontFamily:'Jost,sans-serif', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40 }}>Ваше имя</label>
                <input type="text" placeholder="Ваше имя" value={f.name} onChange={e=>setF({name:e.target.value})} required className="lux-input" />
              </div>
              <div>
                <label style={{ fontFamily:'Jost,sans-serif', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40 }}>Телефон</label>
                <PhoneInput value={f.phone} onChange={v=>setF({phone:v})} className="lux-input" />
              </div>
              {mode==='social' && (
                <div>
                  <label style={{ fontFamily:'Jost,sans-serif', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40 }}>Соцсеть для связи</label>
                  <input type="text" placeholder="Соцсеть для связи" value={f.social} onChange={e=>setF({social:e.target.value})} className="lux-input" />
                </div>
              )}
              <div>
                <label style={{ fontFamily:'Jost,sans-serif', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40 }}>Ваш запрос</label>
                <textarea placeholder="Что вы ищете? Бюджет, район, количество комнат…" rows={3} value={f.request} onChange={e=>setF({request:e.target.value})} className="lux-input" style={{ resize:'none' }} />
              </div>
              {mode==='social' && (
                <label style={{ display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
                  <input type="checkbox" checked={f.callback} onChange={e=>setF({callback:e.target.checked})} style={{ width:16, height:16, accentColor:C.gold, cursor:'pointer' }} />
                  <span style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:12.5, color:C.creamDim }}>Хочу обратный звонок</span>
                </label>
              )}
              <button type="submit" disabled={f.sending} className="btn-lux btn-lux-gold" style={{ width:'100%', marginTop:6 }}>
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

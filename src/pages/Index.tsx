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

/* ════════ ИЗОБРАЖЕНИЯ ════════ */
const HERO_IMG     = 'https://cdn.poehali.dev/projects/ab7a83ba-e182-427f-8219-a315e20c4c4a/files/0531d703-0186-48bc-b44b-e0b7573ffa6e.jpg';
const TEX_EMERALD  = 'https://cdn.poehali.dev/projects/ab7a83ba-e182-427f-8219-a315e20c4c4a/files/f38e4d92-5878-45d9-8a43-d41a0cb74af3.jpg';
const TEX_CHERRY   = 'https://cdn.poehali.dev/projects/ab7a83ba-e182-427f-8219-a315e20c4c4a/files/b1f48e54-740a-44ef-a52c-8dca034dc795.jpg';
const TEX_BLACK    = 'https://cdn.poehali.dev/projects/ab7a83ba-e182-427f-8219-a315e20c4c4a/files/8bc24024-07ee-476e-b154-327ca22ae168.jpg';
const TEX_GOLD     = 'https://cdn.poehali.dev/projects/ab7a83ba-e182-427f-8219-a315e20c4c4a/files/33f35fa6-db4f-44cd-b0c2-7fb33a321330.jpg';

/* ════════ ДАННЫЕ ════════ */
const SERVICES = [
  { num:'01', icon:'MessageSquare', title:'Консультация',        text:'Отвечаем на все вопросы по покупке, продаже и юридическим нюансам — без скрытых условий.' },
  { num:'02', icon:'Search',        title:'Подбор объектов',     text:'Жилая и коммерческая недвижимость по исключительным ценам, точно под ваши требования.' },
  { num:'03', icon:'Handshake',     title:'Сопровождение',       text:'Покупка, продажа, переговоры и безопасная передача средств — контролируем каждый этап.' },
  { num:'04', icon:'FileCheck',     title:'Юридическая чистота', text:'Проверим объект, составим договор и соберём все необходимые документы для сделки.' },
];

const DIRECTIONS = [
  { label:'I',   icon:'Home',          title:'Жилая недвижимость',         text:'Квартиры в новостройках и на вторичном рынке — для себя или под инвестицию.', tex: TEX_EMERALD },
  { label:'II',  icon:'Building2',     title:'Коммерческая недвижимость',  text:'Офисы, торговые и индустриальные объекты для аренды или ведения бизнеса.',    tex: TEX_BLACK },
  { label:'III', icon:'ClipboardList', title:'Экспертная оценка',          text:'Профессиональная оценка объектов перед принятием решения о покупке.',          tex: TEX_GOLD },
  { label:'IV',  icon:'Hammer',        title:'Ремонт под ключ',            text:'Подберём проверенного подрядчика, который реализует лучший дизайн для вас.',   tex: TEX_CHERRY },
];

const STEPS = [
  { num:'01', title:'Запрос',    text:'Напишите нам или закажите звонок — как удобно вам.' },
  { num:'02', title:'Подбор',    text:'Агент с многолетним опытом готовит варианты именно под вас.' },
  { num:'03', title:'Результат', text:'Готовая подборка, сопровождение сделки — бесплатно.' },
];

const CAPABILITIES = [
  { icon:'MapPin',      text:'Поиск недвижимости под требования покупателя' },
  { icon:'Users',       text:'Посредничество в переговорах между сторонами' },
  { icon:'ShieldCheck', text:'Проверка юридической чистоты помещений' },
  { icon:'FileText',    text:'Подготовка документов для договора купли-продажи' },
  { icon:'Banknote',    text:'Безопасная передача денег при сделке' },
];

/* ════════ ЦВЕТА ════════ */
const C = {
  gold:'#C9A84C', gold10:'rgba(201,168,76,0.10)', gold20:'rgba(201,168,76,0.20)',
  gold40:'rgba(201,168,76,0.40)', gold60:'rgba(201,168,76,0.60)',
  cherry:'#390517', emerald:'#16302B', charcoal:'#0A0A0A',
  cream:'#E0D9CC', creamDim:'rgba(224,217,204,0.52)',
};

const SEND_LEAD_URL = 'https://functions.poehali.dev/0951d9ac-cb20-4a66-865c-901b256f6154';
type FS = { name:string; phone:string; social:string; request:string; callback:boolean; sending:boolean; sent:boolean };
const emptyForm = (): FS => ({ name:'', phone:'', social:'', request:'', callback:false, sending:false, sent:false });

/* ─── Переиспользуемый заголовок секции ─── */
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
        <div style={{ position:'absolute', inset:0, zIndex:1, background:`linear-gradient(105deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.6) 45%, rgba(57,5,23,0.25) 100%)` }} />

        {/* Боковая вертикальная подпись */}
        <div style={{ position:'absolute', top:0, bottom:0, left:'clamp(16px,3vw,44px)', zIndex:2, display:'flex', alignItems:'center' }} className="hidden md:flex">
          <span className="vertical-text" style={{ fontFamily:'Jost,sans-serif', fontSize:10, letterSpacing:'0.5em', textTransform:'uppercase', color:C.gold60 }}>
            Private Real Estate Club · Est. 2025
          </span>
        </div>

        {/* Контент */}
        <div style={{ position:'relative', zIndex:2, flex:1, display:'flex', alignItems:'center', maxWidth:1280, width:'100%', margin:'0 auto', padding:'120px clamp(28px,7vw,110px) 60px' }}>
          <div>
            <div className="animate-fade-up" style={{ display:'flex', alignItems:'center', gap:16, marginBottom:36, animationDelay:'150ms' }}>
              <div style={{ width:48, height:1, background:C.gold }} />
              <Eyebrow>Apex Solutions · Москва и МО</Eyebrow>
            </div>

            <h1 className="animate-fade-up font-display" style={{ animationDelay:'300ms', fontSize:'clamp(48px,8.5vw,118px)', fontWeight:300, lineHeight:0.98, letterSpacing:'-0.025em', margin:0, maxWidth:900 }}>
              Найдём дом,<br />
              <span style={{ display:'inline-flex', alignItems:'baseline', gap:'0.25em', flexWrap:'wrap' }}>
                где вам будет{' '}
                <em className="gold-shimmer" style={{ fontStyle:'italic', fontWeight:500 }}>тепло</em>
              </span>
            </h1>

            <div className="animate-fade-up" style={{ animationDelay:'460ms', display:'flex', flexWrap:'wrap', gap:'clamp(28px,5vw,72px)', alignItems:'flex-end', marginTop:'clamp(36px,5vw,60px)' }}>
              <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.85, letterSpacing:'0.05em', color:C.creamDim, maxWidth:380 }}>
                Закрытый сервис подбора недвижимости. Бесплатно. От первого запроса — до ключей в вашей руке.
              </p>
              <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
                <button className="btn-lux btn-lux-gold" onClick={() => openRequest('social')}>
                  <Icon name="MessageCircle" size={14} /> Оставить запрос
                </button>
                <button className="btn-lux btn-lux-ghost" onClick={() => openRequest('meeting')}>
                  <Icon name="Phone" size={14} /> Звонок
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя строка статистики */}
        <div style={{ position:'relative', zIndex:2, borderTop:`1px solid ${C.gold20}` }}>
          <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(28px,7vw,110px)', display:'grid', gridTemplateColumns:'repeat(3,1fr)' }}>
            {[
              { n:'2025', l:'Год основания' },
              { n:'100%', l:'Бесплатный подбор' },
              { n:'24/7', l:'На связи для клиента' },
            ].map((s, i) => (
              <div key={s.l} style={{ padding:'clamp(20px,3vw,34px) 0', borderLeft: i>0 ? `1px solid ${C.gold10}` : 'none', paddingLeft: i>0 ? 'clamp(20px,3vw,40px)' : 0 }}>
                <div className="font-display" style={{ fontSize:'clamp(26px,3.5vw,44px)', fontWeight:300, color:C.gold, letterSpacing:'-0.02em', lineHeight:1 }}>{s.n}</div>
                <div style={{ fontFamily:'Jost,sans-serif', fontSize:9, letterSpacing:'0.28em', textTransform:'uppercase', color:C.creamDim, marginTop:8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ MARQUEE на золотом атласе ═══════════════ */}
      <div style={{ position:'relative', overflow:'hidden', padding:'13px 0', backgroundImage:`url(${TEX_GOLD})`, backgroundSize:'cover', backgroundPosition:'center' }}>
        <div style={{ position:'absolute', inset:0, background:'rgba(10,10,10,0.72)' }} />
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
      <section id="services" style={{ padding:'clamp(70px,9vw,140px) clamp(28px,6vw,90px)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'minmax(280px,0.85fr) 1.15fr', gap:'clamp(40px,6vw,110px)', alignItems:'start' }} className="services-grid">
            {/* Заголовок */}
            <div className="animate-fade-up">
              <Eyebrow>Что мы делаем</Eyebrow>
              <h2 className="font-display" style={{ fontSize:'clamp(40px,5.5vw,82px)', fontWeight:300, lineHeight:1, marginTop:18, letterSpacing:'-0.025em' }}>
                Услуги<br /><em style={{ color:C.gold, fontStyle:'italic' }}>под ключ</em>
              </h2>
              <div style={{ marginTop:'clamp(28px,4vw,48px)', paddingLeft:24, borderLeft:`1px solid ${C.gold40}` }}>
                <p className="font-display" style={{ fontSize:'clamp(18px,2vw,24px)', fontStyle:'italic', fontWeight:300, lineHeight:1.6, color:C.cream }}>
                  «Мы не подбираем варианты.<br />Мы находим <em style={{ color:C.gold }}>ваш</em> дом.»
                </p>
              </div>
            </div>

            {/* Карточки-витрины */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:C.gold20 }}>
              {SERVICES.map((s, i) => (
                <div key={s.title} className="vitrine vitrine-corner animate-fade-up" style={{ padding:'clamp(24px,3vw,42px)', animationDelay:`${i*100}ms` }}>
                  <div className="monogram" style={{ fontSize:'clamp(36px,4vw,56px)' }}>{s.num}</div>
                  <Icon name={s.icon} size={20} style={{ color:C.gold, margin:'18px 0 16px' }} />
                  <h3 className="font-display" style={{ fontSize:'clamp(18px,1.7vw,24px)', fontWeight:400, marginBottom:12, letterSpacing:'-0.01em' }}>{s.title}</h3>
                  <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.8, color:C.creamDim }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY — вишнёвый велюр ═══════════════ */}
      <section id="why" style={{ position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:`url(${TEX_CHERRY})`, backgroundSize:'cover', backgroundPosition:'center', zIndex:0 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(20,3,9,0.92), rgba(57,5,23,0.78))', zIndex:1 }} />
        <div style={{ position:'relative', zIndex:2, padding:'clamp(70px,9vw,140px) clamp(28px,6vw,90px)' }}>
          <div style={{ maxWidth:1280, margin:'0 auto' }}>
            <div className="animate-fade-up" style={{ marginBottom:'clamp(48px,6vw,80px)' }}>
              <Eyebrow>Наша позиция</Eyebrow>
              <h2 className="font-display" style={{ fontSize:'clamp(34px,5vw,72px)', fontWeight:300, lineHeight:1.08, marginTop:14, letterSpacing:'-0.025em', maxWidth:900 }}>
                Рынок должен служить <em style={{ color:C.gold }}>покупателю</em>,<br />а не тем, кто продаёт
              </h2>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,80px)' }} className="why-grid">
              <div className="animate-fade-up">
                <p style={{ fontFamily:'Jost,sans-serif', fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40, marginBottom:8 }}>Вам больше не нужно</p>
                {[
                  'Тратить время на поиск и сталкиваться с фейковыми объявлениями',
                  'Часами искать надёжного агента среди сотен предложений',
                  'Разбираться в потоке рекламы и платных услуг на сторонних сайтах',
                ].map((text, i) => (
                  <div key={i} style={{ display:'flex', gap:20, padding:'22px 0', borderBottom:`1px solid ${C.gold10}` }}>
                    <span className="font-display" style={{ fontSize:22, color:C.gold40, lineHeight:1, fontStyle:'italic' }}>—</span>
                    <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:13.5, lineHeight:1.75, color:C.creamDim }}>{text}</p>
                  </div>
                ))}
              </div>

              <div className="animate-fade-up" style={{ animationDelay:'180ms' }}>
                <p style={{ fontFamily:'Jost,sans-serif', fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40, marginBottom:8 }}>Вы получаете</p>
                <div style={{ display:'flex', flexDirection:'column', gap:14, marginTop:14 }}>
                  {[
                    { icon:'ShieldCheck', label:'Надёжно',         text:'Тщательная проработка каждого этапа и выявление рисков' },
                    { icon:'Zap',         label:'Оперативно',      text:'Заявки клиентов рассматриваются в приоритетном порядке' },
                    { icon:'Award',       label:'Профессионально', text:'Составим договор и соберём полный пакет документов' },
                  ].map(item => (
                    <div key={item.label} className="gold-frame" style={{ display:'flex', gap:18, padding:'18px 22px', background:'rgba(10,10,10,0.4)' }}>
                      <Icon name={item.icon} size={18} style={{ color:C.gold, flexShrink:0, marginTop:2 }} />
                      <div>
                        <div style={{ fontFamily:'Jost,sans-serif', fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:C.gold, marginBottom:6 }}>{item.label}</div>
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

      {/* ═══════════════ ABOUT — зелёный мрамор слева ═══════════════ */}
      <section id="about" style={{ position:'relative' }}>
        <div style={{ display:'grid', gridTemplateColumns:'0.9fr 1.1fr' }} className="about-grid">
          {/* Левая колонка — мраморная панель */}
          <div style={{ position:'relative', minHeight:400, overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, backgroundImage:`url(${TEX_EMERALD})`, backgroundSize:'cover', backgroundPosition:'center' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, rgba(10,10,10,0.55), rgba(22,48,43,0.7))' }} />
            <div style={{ position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', padding:'clamp(48px,6vw,90px)' }}>
              <Eyebrow>О компании</Eyebrow>
              <h2 className="font-display animate-fade-up" style={{ fontSize:'clamp(36px,4.5vw,68px)', fontWeight:300, lineHeight:1.04, marginTop:14, letterSpacing:'-0.025em' }}>
                История<br /><em style={{ color:C.gold }}>Apex&nbsp;Solutions</em>
              </h2>
              <div className="gold-frame" style={{ marginTop:'clamp(32px,4vw,48px)', padding:'26px 30px', background:'rgba(10,10,10,0.35)' }}>
                <p className="font-display" style={{ fontSize:'clamp(18px,2vw,24px)', fontStyle:'italic', fontWeight:300, lineHeight:1.55, color:C.cream }}>
                  «Результат гарантирован. Мы работаем на него, а не на видимость работы.»
                </p>
              </div>
            </div>
          </div>

          {/* Правая колонка — текст + шаги */}
          <div style={{ padding:'clamp(48px,6vw,90px) clamp(28px,5vw,80px)', background:C.charcoal }}>
            <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:'clamp(40px,5vw,64px)' }} className="animate-fade-up">
              {[
                'Мы — динамично развивающаяся организация, работающая на рынке недвижимости с 2025 года.',
                'Образование компании стало логическим продолжением успешных сделок группой специалистов, составивших основу нашей команды.',
                'Apex Solutions решает все вопросы, связанные с приобретением недвижимости. Мы помогаем принять верное решение и подобрать лучшие условия именно для вас.',
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
      <section style={{ padding:'clamp(70px,9vw,140px) clamp(28px,6vw,90px)', background:C.charcoal }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'clamp(44px,5vw,72px)', flexWrap:'wrap', gap:24 }}>
            <div className="animate-fade-up">
              <Eyebrow>Направления</Eyebrow>
              <h2 className="font-display" style={{ fontSize:'clamp(38px,5vw,76px)', fontWeight:300, lineHeight:1, marginTop:16, letterSpacing:'-0.025em' }}>
                Основные<br /><em style={{ color:C.gold, fontStyle:'italic' }}>направления</em>
              </h2>
            </div>
            <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.8, color:C.creamDim, maxWidth:300 }}>
              Четыре ключевых вектора работы — от жилья до инвестиционной коммерции и ремонта.
            </p>
          </div>

          {/* Витрины с текстурным превью */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:C.gold20 }} className="dir-grid">
            {DIRECTIONS.map((d, i) => (
              <div key={d.title} className="vitrine animate-fade-up" style={{ display:'flex', minHeight:200, animationDelay:`${i*110}ms` }}>
                {/* Текстурная плашка */}
                <div style={{ position:'relative', width:'34%', minWidth:90, overflow:'hidden', flexShrink:0 }}>
                  <div style={{ position:'absolute', inset:0, backgroundImage:`url(${d.tex})`, backgroundSize:'cover', backgroundPosition:'center' }} />
                  <div style={{ position:'absolute', inset:0, background:'rgba(10,10,10,0.35)' }} />
                  <div className="font-display" style={{ position:'absolute', bottom:14, left:16, fontSize:'clamp(32px,3.5vw,52px)', fontWeight:300, color:C.cream, lineHeight:1, letterSpacing:'-0.04em', textShadow:'0 2px 12px rgba(0,0,0,0.6)' }}>{d.label}</div>
                </div>
                {/* Текст */}
                <div style={{ padding:'clamp(22px,2.5vw,36px)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
                    <Icon name={d.icon} size={16} style={{ color:C.gold }} />
                    <h3 className="font-display" style={{ fontSize:'clamp(17px,1.7vw,23px)', fontWeight:400, letterSpacing:'-0.01em' }}>{d.title}</h3>
                  </div>
                  <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.75, color:C.creamDim }}>{d.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Возможности */}
          <div className="gold-frame" style={{ marginTop:'clamp(32px,4vw,56px)', padding:'clamp(32px,4vw,56px)' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(28px,4vw,64px)', alignItems:'center' }} className="cap-grid">
              <div>
                <Eyebrow>Наши возможности</Eyebrow>
                <p className="font-display" style={{ fontSize:'clamp(20px,2.2vw,30px)', fontStyle:'italic', fontWeight:300, lineHeight:1.5, color:C.cream, margin:'18px 0 16px' }}>
                  Клиенты зарабатывают на объектах, которые мы находим — за счёт перепродажи по выгодной цене.
                </p>
                <p style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.8, color:C.creamDim }}>
                  После покупки готовы помочь с ремонтом: подберём подрядчика под ваш вкус и бюджет.
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

      {/* ═══════════════ CTA — чёрный мрамор ═══════════════ */}
      <section id="contacts" style={{ position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:`url(${TEX_BLACK})`, backgroundSize:'cover', backgroundPosition:'center', zIndex:0 }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 40%, rgba(57,5,23,0.5), rgba(10,10,10,0.92) 70%)', zIndex:1 }} />
        <div style={{ position:'relative', zIndex:2, padding:'clamp(80px,11vw,170px) clamp(28px,6vw,90px)' }}>
          <div style={{ maxWidth:820, margin:'0 auto', textAlign:'center' }}>
            <div className="animate-fade-up" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:18, marginBottom:32 }}>
              <div style={{ width:44, height:1, background:C.gold }} />
              <Eyebrow>Начать сейчас</Eyebrow>
              <div style={{ width:44, height:1, background:C.gold }} />
            </div>
            <h2 className="font-display animate-fade-up" style={{ fontSize:'clamp(44px,7vw,96px)', fontWeight:300, lineHeight:1, letterSpacing:'-0.025em', marginBottom:28, animationDelay:'150ms' }}>
              Поиск недвижимости<br />начинается <em className="gold-shimmer">здесь</em>
            </h2>
            <p className="animate-fade-up" style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:14, lineHeight:1.9, color:C.creamDim, marginBottom:48, letterSpacing:'0.05em', animationDelay:'280ms' }}>
              Выберите удобный способ связи. Мы перезвоним в течение часа<br />или ответим в вашей социальной сети.
            </p>
            <div className="animate-fade-up" style={{ display:'flex', justifyContent:'center', gap:16, flexWrap:'wrap', marginBottom:52, animationDelay:'400ms' }}>
              <button className="btn-lux btn-lux-gold" onClick={() => openRequest('social')} style={{ minWidth:210 }}>
                <Icon name="MessageCircle" size={14} /> Написать нам
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
        <DialogContent className="max-w-md w-[calc(100%-2rem)] max-h-[90dvh] overflow-y-auto rounded-none" style={{ background:'hsl(0 0% 5%)', border:`1px solid ${C.gold20}` }}>
          {!f.sent && (
            <DialogHeader>
              <DialogTitle className="font-display" style={{ fontSize:30, fontWeight:400, letterSpacing:'-0.01em' }}>
                {mode==='social' ? 'Запрос на подбор' : 'Обратный звонок'}
              </DialogTitle>
              <DialogDescription style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:12.5, letterSpacing:'0.05em', color:C.creamDim, marginTop:6 }}>
                {mode==='social' ? 'Опишите, что вы ищете — мы подберём бесплатно.' : 'Оставьте номер — агент перезвонит и проконсультирует бесплатно.'}
              </DialogDescription>
            </DialogHeader>
          )}
          {f.sent ? (
            <div style={{ padding:'52px 0', textAlign:'center' }}>
              <div className="gold-frame" style={{ width:54, height:54, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 22px' }}>
                <Icon name="Check" size={22} style={{ color:C.gold }} />
              </div>
              <div className="font-display" style={{ fontSize:24, fontWeight:400, marginBottom:8 }}>Заявка принята</div>
              <div style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:12.5, color:C.creamDim, letterSpacing:'0.05em' }}>Свяжемся с вами в ближайшее время</div>
            </div>
          ) : (
            <form style={{ display:'flex', flexDirection:'column', gap:26, marginTop:26 }} onSubmit={handleSubmit}
              onKeyDown={e => { if (e.key==='Enter' && (e.target as HTMLElement).tagName!=='TEXTAREA') { e.preventDefault(); const fields = Array.from((e.currentTarget as HTMLFormElement).querySelectorAll<HTMLElement>('input:not([type=checkbox]),textarea')); const idx = fields.indexOf(e.target as HTMLElement); if (idx>=0 && idx<fields.length-1) fields[idx+1].focus(); } }}>
              <div>
                <label style={{ fontFamily:'Jost,sans-serif', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40 }}>Ваше имя</label>
                <input type="text" placeholder="Александра" value={f.name} onChange={e=>setF({name:e.target.value})} required className="lux-input" />
              </div>
              <div>
                <label style={{ fontFamily:'Jost,sans-serif', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40 }}>Телефон</label>
                <PhoneInput value={f.phone} onChange={v=>setF({phone:v})} className="lux-input" />
              </div>
              {mode==='social' && (
                <div>
                  <label style={{ fontFamily:'Jost,sans-serif', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40 }}>Соцсеть для связи</label>
                  <input type="text" placeholder="Telegram / WhatsApp" value={f.social} onChange={e=>setF({social:e.target.value})} className="lux-input" />
                </div>
              )}
              <div>
                <label style={{ fontFamily:'Jost,sans-serif', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40 }}>Ваш запрос</label>
                <textarea placeholder="Бюджет, район, количество комнат…" rows={3} value={f.request} onChange={e=>setF({request:e.target.value})} className="lux-input" style={{ resize:'none' }} />
              </div>
              {mode==='social' && (
                <label style={{ display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
                  <input type="checkbox" checked={f.callback} onChange={e=>setF({callback:e.target.checked})} style={{ width:16, height:16, accentColor:C.gold, cursor:'pointer' }} />
                  <span style={{ fontFamily:'Jost,sans-serif', fontWeight:300, fontSize:12.5, color:C.creamDim, letterSpacing:'0.05em' }}>Хочу обратный звонок</span>
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

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

/* ─── ИЗОБРАЖЕНИЯ ─── */
const HERO_IMG = 'https://cdn.poehali.dev/projects/ab7a83ba-e182-427f-8219-a315e20c4c4a/files/9d0f841d-703b-4d36-9295-6c64d339b0b0.jpg';

/* ─── ДАННЫЕ ─── */
const SERVICES = [
  { icon: 'MessageSquare', title: 'Консультация',         text: 'Отвечаем на все вопросы по покупке, продаже и юридическим нюансам — без скрытых условий.' },
  { icon: 'Search',        title: 'Подбор объектов',      text: 'Жилая и коммерческая недвижимость по исключительным ценам, точно под ваши требования.' },
  { icon: 'Handshake',     title: 'Сопровождение',        text: 'Покупка, продажа, переговоры и безопасная передача средств — контролируем каждый этап.' },
  { icon: 'FileCheck',     title: 'Юридическая чистота',  text: 'Проверим объект, составим договор и соберём все необходимые документы для сделки.' },
];

const DIRECTIONS = [
  { icon: 'Home',          label: 'I',   title: 'Жилая недвижимость',        text: 'Квартиры в новостройках и на вторичном рынке — для себя или под инвестицию.' },
  { icon: 'Building2',     label: 'II',  title: 'Коммерческая недвижимость',  text: 'Офисы, торговые и индустриальные объекты для аренды или ведения бизнеса.' },
  { icon: 'ClipboardList', label: 'III', title: 'Экспертная оценка',          text: 'Профессиональная оценка объектов перед принятием решения о покупке.' },
  { icon: 'Hammer',        label: 'IV',  title: 'Ремонт под ключ',            text: 'Подберём проверенного подрядчика, который реализует лучший дизайн для вас.' },
];

const STEPS = [
  { num: '01', title: 'Запрос',    text: 'Напишите нам или закажите звонок — как удобно вам.' },
  { num: '02', title: 'Подбор',    text: 'Агент с многолетним опытом готовит варианты именно под вас.' },
  { num: '03', title: 'Результат', text: 'Готовая подборка, сопровождение сделки — бесплатно.' },
];

const CAPABILITIES = [
  { icon: 'MapPin',      text: 'Поиск недвижимости под требования покупателя' },
  { icon: 'Users',       text: 'Посредничество в переговорах между сторонами' },
  { icon: 'ShieldCheck', text: 'Проверка юридической чистоты помещений' },
  { icon: 'FileText',    text: 'Подготовка документов для договора купли-продажи' },
  { icon: 'Banknote',    text: 'Безопасная передача денег при сделке' },
];

/* ─── ЦВЕТА ─── */
const C = {
  gold:      '#C9A84C',
  gold10:    'rgba(201,168,76,0.10)',
  gold20:    'rgba(201,168,76,0.20)',
  gold40:    'rgba(201,168,76,0.40)',
  gold70:    'rgba(201,168,76,0.70)',
  cherry:    '#390517',
  cherryRgb: '57,5,23',
  emerald:   '#16302B',
  emeraldRgb:'22,48,43',
  charcoal:  '#0D0D0D',
  cream:     '#E5DDD0',
  creamDim:  'rgba(229,221,208,0.55)',
};

const SEND_LEAD_URL = 'https://functions.poehali.dev/0951d9ac-cb20-4a66-865c-901b256f6154';
type FS = { name:string; phone:string; social:string; request:string; callback:boolean; sending:boolean; sent:boolean };
const emptyForm = (): FS => ({ name:'', phone:'', social:'', request:'', callback:false, sending:false, sent:false });

/* ─── КОМПОНЕНТ ─── */
const Index = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'social'|'meeting'>('social');
  const [forms, setForms] = useState<Record<string,FS>>({ social: emptyForm(), meeting: emptyForm() });

  const f = forms[mode];
  const setF = (p: Partial<FS>) => setForms(prev => ({ ...prev, [mode]: { ...prev[mode], ...p } }));
  const openRequest = (m: 'social'|'meeting' = 'social') => { setMode(m); setOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim()) return;
    setF({ sending: true });
    try {
      await fetch(SEND_LEAD_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name:f.name, phone:f.phone, social:f.social, request:f.request, callback:f.callback, source: mode==='social'?'Соцсети':'Звонок' })
      });
      setF({ sent:true, name:'', phone:'', social:'', request:'', callback:false });
    } finally { setF({ sending:false }); }
  };

  return (
    <div style={{ background: C.charcoal, color: C.cream, minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ════════════════════════════════════════
          HERO — FULLSCREEN, ФОТО НА ВЕСЬ ЭКРАН
      ════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: 640,
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {/* Фото */}
        <img
          src={HERO_IMG}
          alt="Luxury interior"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            zIndex: 0,
          }}
        />
        {/* Градиентная вуаль */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `linear-gradient(to top,
            rgba(13,13,13,0.97) 0%,
            rgba(13,13,13,0.55) 40%,
            rgba(${C.cherryRgb},0.15) 70%,
            rgba(13,13,13,0.2) 100%
          )`,
        }} />

        {/* Вертикальная золотая линия слева */}
        <div style={{
          position:'absolute', top:0, left:'clamp(20px,4vw,60px)',
          width:1, height:'45%', zIndex:2,
          background:`linear-gradient(to bottom, transparent, ${C.gold}, transparent)`,
        }} />

        {/* Контент */}
        <div style={{
          position:'relative', zIndex:2,
          width:'100%', maxWidth:1200,
          margin:'0 auto',
          padding:'0 clamp(20px,5vw,80px) clamp(48px,7vh,90px)',
        }}>
          {/* Над-заголовок */}
          <div className="animate-fade-up" style={{ animationDelay:'200ms', display:'flex', alignItems:'center', gap:16, marginBottom:24 }}>
            <div style={{ width:40, height:1, background:C.gold }} />
            <span style={{ fontFamily:'Montserrat', fontSize:10, letterSpacing:'0.35em', textTransform:'uppercase', color:C.gold }}>
              Москва · Недвижимость · Apex Solutions
            </span>
          </div>

          {/* H1 */}
          <h1 className="animate-fade-up font-display" style={{
            animationDelay:'350ms',
            fontSize:'clamp(42px, 7vw, 96px)',
            fontWeight:300,
            lineHeight:1.02,
            letterSpacing:'-0.02em',
            marginBottom:32,
            maxWidth:720,
          }}>
            Найдём дом,<br />
            где вам будет{' '}
            <em className="gold-shimmer" style={{ fontStyle:'italic', fontWeight:400 }}>тепло</em>
          </h1>

          {/* Подзаголовок + кнопки */}
          <div className="animate-fade-up" style={{ animationDelay:'500ms', display:'flex', flexWrap:'wrap', alignItems:'flex-end', gap:40 }}>
            <p style={{
              fontFamily:'Montserrat', fontWeight:300, fontSize:'clamp(13px,1.3vw,15px)',
              lineHeight:1.8, letterSpacing:'0.06em', color:C.creamDim, maxWidth:400,
            }}>
              Бесплатный подбор квартиры, ипотеки и рассрочки.<br />
              От запроса до ключей — полное сопровождение.
            </p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <button className="btn-luxury btn-luxury-gold" onClick={() => openRequest('social')}>
                <Icon name="MessageCircle" size={14} /> Написать запрос
              </button>
              <button className="btn-luxury btn-luxury-outline" onClick={() => openRequest('meeting')}>
                <Icon name="Phone" size={14} /> Обратный звонок
              </button>
            </div>
          </div>

          {/* Статистика */}
          <div className="animate-fade-up" style={{
            animationDelay:'700ms',
            display:'flex', flexWrap:'wrap', gap:'clamp(24px,4vw,56px)',
            marginTop:48, paddingTop:48,
            borderTop:`1px solid ${C.gold20}`,
          }}>
            {[
              { n: 'С 2025', l: 'На рынке' },
              { n: '100%', l: 'Бесплатный подбор' },
              { n: '24/7', l: 'На связи для вас' },
            ].map(s => (
              <div key={s.l}>
                <div className="font-display" style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:300, color:C.gold, letterSpacing:'-0.02em' }}>{s.n}</div>
                <div style={{ fontFamily:'Montserrat', fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:C.creamDim, marginTop:4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Стрелка вниз */}
        <div style={{ position:'absolute', bottom:32, right:'clamp(20px,4vw,60px)', zIndex:2 }} className="animate-fade-in">
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, opacity:0.4 }}>
            <span style={{ fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase' }}>scroll</span>
            <div style={{ width:1, height:32, background:`linear-gradient(to bottom, ${C.gold}, transparent)` }} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          MARQUEE — БЕГУЩАЯ СТРОКА
      ════════════════════════════════════════ */}
      <div style={{ background:C.cherry, padding:'14px 0', overflow:'hidden', position:'relative' }}>
        <div style={{ display:'flex', gap:40, whiteSpace:'nowrap' }}>
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{ display:'flex', alignItems:'center', gap:32, fontFamily:'Montserrat', fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold, flexShrink:0 }}>
              <span>Жилая недвижимость</span>
              <span style={{ fontSize:6, color:C.gold70 }}>◆</span>
              <span>Коммерция</span>
              <span style={{ fontSize:6, color:C.gold70 }}>◆</span>
              <span>Бесплатный подбор</span>
              <span style={{ fontSize:6, color:C.gold70 }}>◆</span>
              <span>Москва и МО</span>
              <span style={{ fontSize:6, color:C.gold70 }}>◆</span>
              <span>Юридическое сопровождение</span>
              <span style={{ fontSize:6, color:C.gold70 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          SERVICES — СЕТКА 2×2 + ТЕКСТ
      ════════════════════════════════════════ */}
      <section id="services" style={{ padding:'clamp(64px,8vw,120px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(40px,6vw,100px)', alignItems:'start' }}>

            {/* Левый блок — заголовок */}
            <div className="animate-fade-up">
              <span style={{ fontFamily:'Montserrat', fontSize:9, letterSpacing:'0.4em', textTransform:'uppercase', color:C.gold }}>Что мы делаем</span>
              <h2 className="font-display" style={{ fontSize:'clamp(36px,5vw,72px)', fontWeight:300, lineHeight:1.05, marginTop:16, marginBottom:0, letterSpacing:'-0.02em' }}>
                Услуги<br /><em style={{ color:C.gold, fontStyle:'italic' }}>под ключ</em>
              </h2>
              <div style={{ marginTop:32, width:60, height:1, background:C.gold }} />
              <p style={{ fontFamily:'Montserrat', fontWeight:300, fontSize:13, lineHeight:1.9, letterSpacing:'0.05em', color:C.creamDim, marginTop:24, maxWidth:340 }}>
                Полный цикл работы с недвижимостью — от первого звонка до регистрации права собственности. Мы берём на себя всё.
              </p>

              {/* Доп. тег */}
              <div style={{ marginTop:40, display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:1, height:60, background:`linear-gradient(to bottom, ${C.gold}, transparent)` }} />
                <div className="font-display" style={{ fontSize:13, lineHeight:1.7, color:C.creamDim, fontStyle:'italic' }}>
                  «Мы не подбираем варианты.<br />Мы находим <em style={{ color:C.gold }}>ваш</em> дом.»
                </div>
              </div>
            </div>

            {/* Правый блок — карточки 2×2 */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:C.gold20 }}>
              {SERVICES.map((s, i) => (
                <div
                  key={s.title}
                  className="luxury-card animate-fade-up"
                  style={{ padding:'clamp(20px,2.5vw,36px)', animationDelay:`${i*100}ms` }}
                >
                  <div className="diamond-icon" style={{ marginBottom:20 }}>
                    <Icon name={s.icon} size={16} style={{ color:C.gold }} />
                  </div>
                  <h3 className="font-display" style={{ fontSize:'clamp(15px,1.5vw,20px)', fontWeight:400, marginBottom:10, letterSpacing:'-0.01em' }}>{s.title}</h3>
                  <p style={{ fontFamily:'Montserrat', fontWeight:300, fontSize:12, lineHeight:1.8, color:C.creamDim, letterSpacing:'0.04em' }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY — ПОЛНОШИРИННАЯ CHERRY-СЕКЦИЯ
      ════════════════════════════════════════ */}
      <section id="why" style={{ position:'relative', overflow:'hidden' }}>
        <div className="velvet-cherry" style={{ padding:'clamp(64px,8vw,120px) clamp(20px,5vw,80px)' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>

            {/* Заголовок */}
            <div style={{ marginBottom:'clamp(48px,6vw,80px)', display:'grid', gridTemplateColumns:'1fr auto', alignItems:'end', gap:40 }}>
              <div className="animate-fade-up">
                <span style={{ fontFamily:'Montserrat', fontSize:9, letterSpacing:'0.4em', textTransform:'uppercase', color:C.gold }}>Наша позиция</span>
                <h2 className="font-display" style={{ fontSize:'clamp(32px,4.5vw,64px)', fontWeight:300, lineHeight:1.1, marginTop:12, letterSpacing:'-0.02em' }}>
                  Рынок должен служить <em style={{ color:C.gold }}>покупателю</em>,<br />а не тем, кто продаёт
                </h2>
              </div>
              <div style={{ width:1, height:80, background:`linear-gradient(to bottom, transparent, ${C.gold40})`, display:'none' }} />
            </div>

            {/* Два столбца */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(32px,5vw,80px)' }}>

              {/* Левый — что не нужно */}
              <div className="animate-fade-up">
                <p style={{ fontFamily:'Montserrat', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40, marginBottom:24 }}>Вам больше не нужно:</p>
                <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                  {[
                    'Тратить время на поиск и сталкиваться с фейковыми объявлениями',
                    'Часами искать надёжного агента среди сотен предложений',
                    'Разбираться в потоке рекламы и платных услуг на сторонних сайтах',
                  ].map((text, i) => (
                    <div key={i} style={{ display:'flex', gap:20, padding:'20px 0', borderBottom:`1px solid rgba(${C.cherryRgb},0.0) border-top` }}>
                      <div style={{
                        width:24, height:24, border:`1px solid ${C.gold20}`,
                        display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                      }}>
                        <Icon name="Minus" size={10} style={{ color:C.gold40 }} />
                      </div>
                      <p style={{ fontFamily:'Montserrat', fontWeight:300, fontSize:13, lineHeight:1.8, color:C.creamDim }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Правый — преимущества */}
              <div className="animate-fade-up" style={{ animationDelay:'200ms' }}>
                <p style={{ fontFamily:'Montserrat', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40, marginBottom:24 }}>Вы получаете:</p>
                <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  {[
                    { icon:'ShieldCheck', label:'Надёжно',        text:'Тщательная проработка каждого этапа и выявление рисков' },
                    { icon:'Zap',         label:'Оперативно',     text:'Заявки клиентов рассматриваются в приоритетном порядке' },
                    { icon:'Award',       label:'Профессионально',text:'Составим договор и соберём полный пакет документов' },
                  ].map(item => (
                    <div key={item.label} style={{
                      display:'flex', gap:16, padding:'16px 20px',
                      background:`rgba(${C.cherryRgb},0.4)`,
                      border:`1px solid ${C.gold10}`,
                    }}>
                      <div style={{ width:36, height:36, border:`1px solid ${C.gold40}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <Icon name={item.icon} size={14} style={{ color:C.gold }} />
                      </div>
                      <div>
                        <div style={{ fontFamily:'Montserrat', fontSize:9, letterSpacing:'0.25em', textTransform:'uppercase', color:C.gold, marginBottom:6 }}>{item.label}</div>
                        <p style={{ fontFamily:'Montserrat', fontWeight:300, fontSize:12, lineHeight:1.8, color:C.creamDim }}>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ABOUT — EMERALD + STEPS
      ════════════════════════════════════════ */}
      <section id="about">
        <div className="velvet-emerald" style={{ padding:'clamp(64px,8vw,120px) clamp(20px,5vw,80px)' }}>
          <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(40px,6vw,100px)', alignItems:'start' }}>

            {/* Левый — О компании */}
            <div className="animate-fade-up">
              <span style={{ fontFamily:'Montserrat', fontSize:9, letterSpacing:'0.4em', textTransform:'uppercase', color:C.gold }}>О компании</span>
              <h2 className="font-display" style={{ fontSize:'clamp(32px,4vw,60px)', fontWeight:300, lineHeight:1.1, marginTop:12, marginBottom:0, letterSpacing:'-0.02em' }}>
                История<br /><em style={{ color:C.gold }}>Apex Solutions</em>
              </h2>
              <div style={{ width:60, height:1, background:C.gold, margin:'28px 0' }} />

              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {[
                  'Мы — динамично развивающаяся организация, работающая на рынке недвижимости с 2025 года.',
                  'Образование компании стало логическим продолжением успешных сделок группой специалистов, составивших основу нашей команды.',
                  'Apex Solutions — команда, которая решает все вопросы, связанные с приобретением недвижимости. Мы помогаем принять верное решение и подобрать лучшие условия именно для вас.',
                ].map((t, i) => (
                  <p key={i} style={{ fontFamily:'Montserrat', fontWeight:300, fontSize:13, lineHeight:1.9, color:C.creamDim }}>{t}</p>
                ))}
              </div>

              {/* Цитата-блок */}
              <div style={{ marginTop:40, padding:'24px 28px', border:`1px solid ${C.gold20}`, position:'relative' }}>
                <div style={{ position:'absolute', top:0, left:0, width:32, height:32 }}>
                  <div style={{ position:'absolute', top:0, left:0, width:'100%', height:1, background:C.gold }} />
                  <div style={{ position:'absolute', top:0, left:0, width:1, height:'100%', background:C.gold }} />
                </div>
                <div style={{ position:'absolute', bottom:0, right:0, width:32, height:32 }}>
                  <div style={{ position:'absolute', bottom:0, right:0, width:'100%', height:1, background:C.gold }} />
                  <div style={{ position:'absolute', bottom:0, right:0, width:1, height:'100%', background:C.gold }} />
                </div>
                <p className="font-display" style={{ fontSize:18, fontStyle:'italic', fontWeight:300, lineHeight:1.6, color:C.cream }}>
                  «Результат гарантирован. Мы работаем на него, а не на видимость работы.»
                </p>
              </div>
            </div>

            {/* Правый — Шаги */}
            <div className="animate-slide-left">
              <p style={{ fontFamily:'Montserrat', fontSize:9, letterSpacing:'0.4em', textTransform:'uppercase', color:C.gold, marginBottom:40 }}>Как это работает</p>
              <div style={{ display:'flex', flexDirection:'column' }}>
                {STEPS.map((step, i) => (
                  <div key={step.num} style={{ display:'flex', gap:24, paddingBottom:i < STEPS.length-1 ? 40 : 0, marginBottom:i < STEPS.length-1 ? 40 : 0, borderBottom: i < STEPS.length-1 ? `1px solid ${C.gold10}` : 'none', position:'relative' }}>
                    {/* Линия соединения */}
                    {i < STEPS.length-1 && (
                      <div style={{ position:'absolute', left:20, top:48, width:1, height:'calc(100% - 8px)', background:`linear-gradient(to bottom, ${C.gold30??C.gold40}, transparent)` }} />
                    )}
                    <div className="step-number" style={{ fontSize:'clamp(48px,5vw,72px)', color:C.gold20, flexShrink:0, width:48 }}>{step.num}</div>
                    <div style={{ paddingTop:8 }}>
                      <h3 className="font-display" style={{ fontSize:'clamp(18px,2vw,26px)', fontWeight:400, marginBottom:8, letterSpacing:'-0.01em' }}>{step.title}</h3>
                      <p style={{ fontFamily:'Montserrat', fontWeight:300, fontSize:13, lineHeight:1.8, color:C.creamDim }}>{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA под шагами */}
              <div style={{ marginTop:48 }}>
                <button className="btn-luxury btn-luxury-gold" onClick={() => openRequest('social')} style={{ width:'100%' }}>
                  Начать прямо сейчас
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          DIRECTIONS — ГОРИЗОНТАЛЬНЫЕ КАРТОЧКИ
      ════════════════════════════════════════ */}
      <section style={{ padding:'clamp(64px,8vw,120px) clamp(20px,5vw,80px)', background:C.charcoal }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'clamp(40px,5vw,72px)' }}>
            <div className="animate-fade-up">
              <span style={{ fontFamily:'Montserrat', fontSize:9, letterSpacing:'0.4em', textTransform:'uppercase', color:C.gold }}>Направления</span>
              <h2 className="font-display" style={{ fontSize:'clamp(32px,4vw,60px)', fontWeight:300, lineHeight:1.05, marginTop:12, letterSpacing:'-0.02em' }}>
                Основные<br /><em style={{ color:C.gold }}>направления</em>
              </h2>
            </div>
            <div style={{ width:1, height:80, background:`linear-gradient(to bottom, transparent, ${C.gold40}, transparent)` }} />
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:1, background:C.gold20 }}>
            {DIRECTIONS.map((d, i) => (
              <div
                key={d.title}
                className="luxury-card animate-fade-up"
                style={{ padding:'clamp(28px,3vw,48px)', display:'flex', gap:28, alignItems:'flex-start', animationDelay:`${i*120}ms` }}
              >
                <div className="font-display" style={{ fontSize:'clamp(36px,4vw,56px)', fontWeight:300, color:C.gold20, lineHeight:1, flexShrink:0, letterSpacing:'-0.04em', width:'2.2ch' }}>{d.label}</div>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
                    <Icon name={d.icon} size={16} style={{ color:C.gold }} />
                    <h3 className="font-display" style={{ fontSize:'clamp(16px,1.6vw,22px)', fontWeight:400, letterSpacing:'-0.01em' }}>{d.title}</h3>
                  </div>
                  <p style={{ fontFamily:'Montserrat', fontWeight:300, fontSize:12, lineHeight:1.8, color:C.creamDim }}>{d.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Возможности под сеткой */}
          <div style={{ marginTop:1, background:'hsl(0 0% 7%)', border:`1px solid ${C.gold10}`, borderTop:'none', padding:'clamp(28px,3vw,48px)' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(24px,3vw,48px)', alignItems:'start' }}>
              <div>
                <p className="font-display" style={{ fontSize:'clamp(18px,2vw,28px)', fontStyle:'italic', fontWeight:300, lineHeight:1.5, color:C.cream, marginBottom:16 }}>
                  Некоторые клиенты зарабатывают на объектах, которые мы находим для них — за счёт перепродажи по выгодной цене.
                </p>
                <p style={{ fontFamily:'Montserrat', fontWeight:300, fontSize:12, lineHeight:1.8, color:C.creamDim }}>
                  После покупки готовы помочь с ремонтом: подберём подрядчика под ваш вкус и бюджет.
                </p>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {CAPABILITIES.map((c, i) => (
                  <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start', padding:'12px 0', borderBottom:`1px solid ${C.gold10}` }}>
                    <Icon name={c.icon} size={14} style={{ color:C.gold, flexShrink:0, marginTop:2 }} />
                    <p style={{ fontFamily:'Montserrat', fontWeight:300, fontSize:12, lineHeight:1.7, color:C.creamDim }}>{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA — ФИНАЛЬНЫЙ РОСКОШНЫЙ БЛОК
      ════════════════════════════════════════ */}
      <section id="contacts" style={{ position:'relative', overflow:'hidden' }}>
        <div style={{
          background:`linear-gradient(135deg, ${C.cherry} 0%, #1a0309 35%, ${C.emerald} 100%)`,
          padding:'clamp(64px,9vw,140px) clamp(20px,5vw,80px)',
          position:'relative',
        }}>
          {/* Декоративная золотая сетка */}
          <div style={{
            position:'absolute', inset:0, pointerEvents:'none',
            backgroundImage:`
              linear-gradient(${C.gold10} 1px, transparent 1px),
              linear-gradient(90deg, ${C.gold10} 1px, transparent 1px)
            `,
            backgroundSize:'80px 80px',
          }} />
          {/* Центральный свет */}
          <div style={{
            position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
            width:'60%', height:'60%', borderRadius:'50%', pointerEvents:'none',
            background:`radial-gradient(ellipse, ${C.gold10} 0%, transparent 70%)`,
          }} />

          <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
            <div className="animate-fade-up" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:32 }}>
              <div style={{ height:1, width:40, background:C.gold }} />
              <span style={{ fontFamily:'Montserrat', fontSize:9, letterSpacing:'0.4em', textTransform:'uppercase', color:C.gold }}>Начать сейчас</span>
              <div style={{ height:1, width:40, background:C.gold }} />
            </div>

            <h2 className="font-display animate-fade-up" style={{ fontSize:'clamp(38px,6vw,80px)', fontWeight:300, lineHeight:1.05, letterSpacing:'-0.02em', marginBottom:24, animationDelay:'150ms' }}>
              Поиск недвижимости<br />начинается <em className="gold-shimmer">здесь</em>
            </h2>

            <p className="animate-fade-up" style={{ fontFamily:'Montserrat', fontWeight:300, fontSize:14, lineHeight:1.9, color:C.creamDim, marginBottom:48, letterSpacing:'0.06em', animationDelay:'300ms' }}>
              Выберите удобный способ связи. Мы перезвоним в течение часа<br />или ответим в вашей социальной сети.
            </p>

            <div className="animate-fade-up" style={{ display:'flex', justifyContent:'center', gap:16, flexWrap:'wrap', marginBottom:48, animationDelay:'450ms' }}>
              <button className="btn-luxury btn-luxury-gold" onClick={() => openRequest('social')} style={{ minWidth:200 }}>
                <Icon name="MessageCircle" size={14} /> Написать нам
              </button>
              <button className="btn-luxury btn-luxury-outline" onClick={() => openRequest('meeting')} style={{ minWidth:200 }}>
                <Icon name="Phone" size={14} /> Обратный звонок
              </button>
            </div>

            {/* Соцсети */}
            <div className="animate-fade-up" style={{ display:'flex', justifyContent:'center', gap:'clamp(16px,3vw,40px)', flexWrap:'wrap', animationDelay:'600ms' }}>
              {[
                { icon:'AtSign', label:'Mail.ru' },
                { icon:'Send',   label:'Telegram' },
                { icon:'Phone',  label:'WhatsApp' },
                { icon:'Mail',   label:'MAX' },
              ].map(c => (
                <span key={c.label} style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'Montserrat', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:C.creamDim }} translate="no">
                  <Icon name={c.icon} size={12} style={{ color:C.gold }} /> {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          DIALOG — ФОРМА ЗАЯВКИ
      ════════════════════════════════════════ */}
      <Dialog open={open} onOpenChange={v => { if (!v) setForms(prev => ({ ...prev, [mode]: emptyForm() })); setOpen(v); }}>
        <DialogContent
          className="max-w-md w-[calc(100%-2rem)] max-h-[90dvh] overflow-y-auto rounded-none"
          style={{ background:'hsl(0 0% 6%)', border:`1px solid ${C.gold20}` }}
        >
          {!f.sent && (
            <DialogHeader>
              <DialogTitle className="font-display" style={{ fontSize:28, fontWeight:400, letterSpacing:'-0.01em' }}>
                {mode==='social' ? 'Запрос на подбор' : 'Обратный звонок'}
              </DialogTitle>
              <DialogDescription style={{ fontFamily:'Montserrat', fontWeight:300, fontSize:12, letterSpacing:'0.06em', color:C.creamDim, marginTop:4 }}>
                {mode==='social'
                  ? 'Опишите, что вы ищете — мы подберём бесплатно.'
                  : 'Оставьте номер — агент перезвонит и проконсультирует бесплатно.'}
              </DialogDescription>
            </DialogHeader>
          )}

          {f.sent ? (
            <div style={{ padding:'48px 0', textAlign:'center' }}>
              <div style={{ width:48, height:48, border:`1px solid ${C.gold40}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
                <Icon name="Check" size={20} style={{ color:C.gold }} />
              </div>
              <div className="font-display" style={{ fontSize:22, fontWeight:400, marginBottom:8 }}>Заявка принята</div>
              <div style={{ fontFamily:'Montserrat', fontWeight:300, fontSize:12, color:C.creamDim, letterSpacing:'0.06em' }}>Свяжемся с вами в ближайшее время</div>
            </div>
          ) : (
            <form
              style={{ display:'flex', flexDirection:'column', gap:24, marginTop:24 }}
              onSubmit={handleSubmit}
              onKeyDown={e => {
                if (e.key==='Enter' && (e.target as HTMLElement).tagName!=='TEXTAREA') {
                  e.preventDefault();
                  const fields = Array.from((e.currentTarget as HTMLFormElement).querySelectorAll<HTMLElement>('input:not([type=checkbox]),textarea'));
                  const idx = fields.indexOf(e.target as HTMLElement);
                  if (idx>=0 && idx<fields.length-1) fields[idx+1].focus();
                }
              }}
            >
              <div>
                <label style={{ fontFamily:'Montserrat', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40 }}>Ваше имя</label>
                <input type="text" placeholder="Александра" value={f.name} onChange={e=>setF({name:e.target.value})} required className="luxury-input" />
              </div>
              <div>
                <label style={{ fontFamily:'Montserrat', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40 }}>Телефон</label>
                <PhoneInput value={f.phone} onChange={v=>setF({phone:v})} className="luxury-input" />
              </div>
              {mode==='social' && (
                <div>
                  <label style={{ fontFamily:'Montserrat', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40 }}>Соцсеть для связи</label>
                  <input type="text" placeholder="Telegram / WhatsApp" value={f.social} onChange={e=>setF({social:e.target.value})} className="luxury-input" />
                </div>
              )}
              <div>
                <label style={{ fontFamily:'Montserrat', fontSize:9, letterSpacing:'0.3em', textTransform:'uppercase', color:C.gold40 }}>Ваш запрос</label>
                <textarea placeholder="Бюджет, район, количество комнат…" rows={3} value={f.request} onChange={e=>setF({request:e.target.value})}
                  className="luxury-input" style={{ resize:'none', height:'auto' }} />
              </div>
              {mode==='social' && (
                <label style={{ display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
                  <input type="checkbox" checked={f.callback} onChange={e=>setF({callback:e.target.checked})}
                    style={{ width:16, height:16, accentColor:C.gold, cursor:'pointer' }} />
                  <span style={{ fontFamily:'Montserrat', fontWeight:300, fontSize:12, color:C.creamDim, letterSpacing:'0.06em' }}>Хочу обратный звонок</span>
                </label>
              )}
              <button type="submit" disabled={f.sending} className="btn-luxury btn-luxury-gold" style={{ width:'100%', marginTop:8 }}>
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

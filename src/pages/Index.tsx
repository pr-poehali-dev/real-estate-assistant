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

const HERO_IMG =
  'https://cdn.poehali.dev/projects/ab7a83ba-e182-427f-8219-a315e20c4c4a/files/c2e2e8e1-8b4a-453f-b641-886131fa7479.jpg';

const SERVICES = [
  { icon: 'MessageSquare', title: 'Бесплатная консультация', text: 'Отвечаем на все вопросы по покупке, продаже и юридическим нюансам — без скрытых условий.' },
  { icon: 'Search',        title: 'Подбор объектов',         text: 'Жилая и коммерческая недвижимость по преимущественно низким ценам под ваши требования.' },
  { icon: 'Handshake',     title: 'Сопровождение сделки',    text: 'Покупка, продажа, переговоры и безопасная передача средств — контролируем каждый этап.' },
  { icon: 'FileCheck',     title: 'Юридическая экспертиза',  text: 'Проверим юридическую чистоту объекта, составим договор и соберём все необходимые документы.' },
];

const CAPABILITIES = [
  { icon: 'MapPin',       text: 'Помощь в поиске недвижимости, подходящей под требования покупателя' },
  { icon: 'Users',        text: 'Посредничество в переговорах между сторонами сделки' },
  { icon: 'ShieldCheck',  text: 'Проверка юридической чистоты помещений' },
  { icon: 'FileText',     text: 'Сбор и подготовка документов для заключения договора купли-продажи' },
  { icon: 'Banknote',     text: 'Помощь во взаимных расчётах — безопасная передача денег при сделке' },
];

const DIRECTIONS = [
  { icon: 'Home',          title: 'Жилая недвижимость',       text: 'Квартиры в новостройках и на вторичном рынке — для себя или под инвестицию.' },
  { icon: 'Building2',     title: 'Коммерческая недвижимость', text: 'Офисные, торговые, индустриальные и социальные объекты для аренды или ведения бизнеса.' },
  { icon: 'ClipboardList', title: 'Экспертная оценка',         text: 'Профессиональная оценка объектов недвижимости перед принятием решения о покупке.' },
  { icon: 'Hammer',        title: 'Ремонт под ключ',           text: 'Подберём проверенного подрядчика из числа наших партнёров, который реализует лучший дизайн вашей новой квартиры.' },
];

const STEPS = [
  { num: '01', title: 'Оставляете запрос',   text: 'Напишите нам или закажите обратный звонок — как удобно вам.' },
  { num: '02', title: 'Подбираем объекты',   text: 'Агент с многолетним опытом готовит варианты под вас.' },
  { num: '03', title: 'Получаете результат', text: 'Никуда не ехать. Готовая подборка и сопровождение — бесплатно.' },
];

/* Цвета палитры (inline-style, чтобы не зависеть от purge) */
const GOLD   = 'hsl(42 52% 55%)';
const GOLD20 = 'hsl(42 52% 55% / 0.2)';
const GOLD40 = 'hsl(42 52% 55% / 0.4)';
const CHERRY = 'hsl(340 78% 11%)';
const EMERALD= 'hsl(162 35% 13%)';

const SEND_LEAD_URL = 'https://functions.poehali.dev/0951d9ac-cb20-4a66-865c-901b256f6154';

type FormState = { name: string; phone: string; social: string; request: string; callback: boolean; sending: boolean; sent: boolean };
const emptyForm = (): FormState => ({ name: '', phone: '', social: '', request: '', callback: false, sending: false, sent: false });

const Index = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'social' | 'meeting'>('social');
  const [forms, setForms] = useState<Record<string, FormState>>({ social: emptyForm(), meeting: emptyForm() });

  const f = forms[mode];
  const setF = (patch: Partial<FormState>) => setForms(prev => ({ ...prev, [mode]: { ...prev[mode], ...patch } }));

  const openRequest = (m: 'social' | 'meeting' = 'social') => { setMode(m); setOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim()) return;
    setF({ sending: true });
    try {
      await fetch(SEND_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: f.name, phone: f.phone, social: f.social, request: f.request, callback: f.callback, source: mode === 'social' ? 'Написать в соцсетях' : 'Обратный звонок' })
      });
      setF({ sent: true, name: '', phone: '', social: '', request: '', callback: false });
    } finally {
      setF({ sending: false });
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section id="hero" className="relative pt-28 md:pt-40 pb-16 md:pb-28 px-4 overflow-hidden">
        {/* Фоновые цветовые акценты */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 90% 10%, ${CHERRY}, transparent 65%)` }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-8 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 10% 90%, ${EMERALD}, transparent 65%)` }} />

        <div className="container max-w-6xl relative z-10 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="animate-fade-up">
            {/* Бейджи */}
            <div className="flex flex-wrap items-center gap-2 mb-7 md:mb-9">
              {[
                { icon: 'Shield',   label: 'Спокойствие сделки', cherry: true },
                { icon: 'Sparkles', label: 'Подбор — бесплатно' },
                { icon: 'Key',      label: 'Решение за вами' },
              ].map(b => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border text-[10px] tracking-widest uppercase font-medium"
                  style={b.cherry
                    ? { borderColor: GOLD40, color: GOLD, background: `${CHERRY}88` }
                    : { borderColor: 'hsl(40 12% 18%)', color: 'hsl(40 8% 52%)' }
                  }
                >
                  <Icon name={b.icon} size={11} /> {b.label}
                </span>
              ))}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 md:mb-8">
              Найдём дом, <br />где вам будет{' '}
              <span className="italic gold-shimmer">тепло</span>
            </h1>

            <p className="text-sm md:text-base text-muted-foreground mb-8 md:mb-10 max-w-md leading-relaxed font-light">
              Бесплатно подберём квартиру, ипотеку и рассрочку. Вам не нужно никуда ехать — просто оставьте запрос и получите готовый результат.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => openRequest('social')}
                className="inline-flex items-center justify-center gap-2 px-7 md:px-10 h-12 md:h-14 text-[10px] tracking-[0.25em] uppercase font-medium transition-opacity hover:opacity-85"
                style={{ background: GOLD, color: 'hsl(0 0% 5%)' }}
              >
                <Icon name="MessageCircle" size={14} /> Написать запрос
              </button>
              <button
                onClick={() => openRequest('meeting')}
                className="inline-flex items-center justify-center gap-2 px-7 md:px-10 h-12 md:h-14 text-[10px] tracking-[0.25em] uppercase font-medium border transition-all hover:border-opacity-70"
                style={{ borderColor: GOLD40, color: GOLD, background: 'transparent' }}
              >
                <Icon name="Phone" size={14} /> Обратный звонок
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-5 mt-7 text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
              <span className="flex items-center gap-1.5"><Icon name="Check" size={11} style={{ color: GOLD }} /> Без условий</span>
              <span className="flex items-center gap-1.5"><Icon name="Check" size={11} style={{ color: GOLD }} /> Вы ничего не платите</span>
              <span className="flex items-center gap-1.5"><Icon name="MapPin" size={11} style={{ color: GOLD }} /> Москва и МО</span>
            </div>
          </div>

          {/* Фото */}
          <div className="relative animate-fade-up hidden lg:block" style={{ animationDelay: '160ms' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ border: `1px solid ${GOLD20}`, transform: 'translate(14px, 14px)' }} />
            <img src={HERO_IMG} alt="Современный дом" className="w-full h-[520px] object-cover relative z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 z-20 pointer-events-none"
              style={{ background: 'linear-gradient(to top, hsl(0 0% 6% / 0.7), transparent)' }} />
          </div>
        </div>

        <div className="container max-w-6xl mt-16 md:mt-24">
          <div className="gold-divider" />
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-12 md:py-20 px-4">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: GOLD }}>Что мы делаем</span>
            <h2 className="font-display text-2xl md:text-5xl lg:text-6xl font-semibold mt-3">Услуги под ключ</h2>
            <div className="mt-4 w-10 h-px" style={{ background: GOLD }} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '1px', background: 'hsl(40 12% 16%)' }}>
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className="p-6 md:p-8 transition-colors duration-300 animate-fade-up group cursor-default"
                style={{ background: 'hsl(0 0% 6%)', animationDelay: `${i * 80}ms` }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = CHERRY}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'hsl(0 0% 6%)'}
              >
                <div className="w-10 h-10 border flex items-center justify-center mb-6 transition-colors" style={{ borderColor: GOLD40 }}>
                  <Icon name={s.icon} size={18} style={{ color: GOLD }} />
                </div>
                <h3 className="font-display text-base md:text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container max-w-6xl px-4"><div className="gold-divider" /></div>

      {/* ═══ WHY US ═══ */}
      <section id="why" className="py-12 md:py-20 px-4">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: GOLD }}>Зачем мы нужны</span>
            <h2 className="font-display text-2xl md:text-5xl lg:text-6xl font-semibold mt-3 max-w-3xl leading-tight">
              Рынок недвижимости должен служить{' '}
              <span className="italic" style={{ color: GOLD }}>покупателю</span>
              {' — '}а не тем, кто продаёт.
            </h2>
            <div className="mt-4 w-10 h-px" style={{ background: GOLD }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Левая — что не нужно */}
            <div className="space-y-3">
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Вам больше не нужно:</p>
              {[
                'Тратить время на самостоятельный поиск квартиры и сталкиваться с фейковыми объявлениями',
                'Часами искать надёжного агента среди сотен предложений',
                'Разбираться в бесконечном потоке рекламы и платных услуг на сторонних сайтах',
              ].map((text, i) => (
                <div key={i} className="flex gap-4 p-4 md:p-5 border border-border/40" style={{ background: `${CHERRY}55` }}>
                  <div className="w-6 h-6 border border-border/60 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="X" size={11} className="text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm font-light">{text}</p>
                </div>
              ))}
            </div>

            {/* Правая — что можно */}
            <div className="space-y-4">
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Вы можете:</p>
              <div className="border-l-2 pl-5 mb-6" style={{ borderColor: GOLD }}>
                <p className="text-base md:text-lg font-medium leading-snug">Доверить всю эту работу нам — и использовать сэкономленное время для себя.</p>
              </div>
              <p className="leading-relaxed text-sm text-muted-foreground font-light">Мы выполним всё именно так, как вы задумали. С полной уверенностью в качестве каждого этапа — от первого звонка до получения ключей.</p>
              {[
                { icon: 'ShieldCheck', label: 'Надёжно',          text: 'Прозрачные условия, тщательная проработка сделки и выявление всех возможных рисков' },
                { icon: 'Zap',         label: 'Быстро',            text: 'Заявки клиентов рассматриваются в приоритетном порядке' },
                { icon: 'Star',        label: 'Профессионально',   text: 'Составим договор и соберём полный пакет необходимых документов' },
              ].map(item => (
                <div key={item.label} className="flex gap-4 border border-border/40 p-4 md:p-5 transition-colors hover:border-opacity-60"
                  style={{ background: `${EMERALD}55` }}
                >
                  <div className="w-8 h-8 border flex items-center justify-center shrink-0" style={{ borderColor: GOLD40 }}>
                    <Icon name={item.icon} size={15} style={{ color: GOLD }} />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-widest uppercase font-medium mb-1" style={{ color: GOLD }}>{item.label}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed font-light">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-6xl px-4"><div className="gold-divider" /></div>

      {/* ═══ ABOUT + STEPS ═══ */}
      <section id="about" className="py-12 md:py-20 px-4">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: GOLD }}>О компании</span>
              <h2 className="font-display text-2xl md:text-5xl lg:text-6xl font-semibold mt-3 mb-4 leading-tight">
                История и команда<br /><span className="italic" style={{ color: GOLD }}>Apex Solutions</span>
              </h2>
              <div className="w-10 h-px mb-8" style={{ background: GOLD }} />
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-light">Мы — динамично развивающаяся организация, работающая на рынке услуг по подбору недвижимости с 2025 года. За это время мы успешно реализовали множество проектов разного масштаба и уровня сложности.</p>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-light">Образование компании стало логическим продолжением успешного завершения финансовых сделок группой специалистов, составивших основу нашей профессиональной деятельности.</p>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed font-light">Apex Solutions — команда, поставившая своей целью решать все ваши вопросы, связанные с приобретением недвижимости. Мы готовы помочь принять верное решение и подобрать наилучшие условия именно для вас.</p>
              <div className="border p-6 relative corners" style={{ borderColor: GOLD20, background: `${CHERRY}66` }}>
                <p className="font-display text-lg md:text-xl font-semibold mb-2">Результат гарантирован</p>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">Наша команда — опытные профессионалы, которые полностью контролируют сделку на всех этапах. Мы всегда работаем на результат.</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-8">Как это работает</p>
              <div className="space-y-0">
                {STEPS.map((step, i) => (
                  <div
                    key={step.num}
                    className="flex gap-6 py-6 border-b border-border/40 first:border-t animate-fade-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="font-display text-3xl md:text-4xl font-bold w-12 shrink-0" style={{ color: GOLD40 }}>{step.num}</div>
                    <div className="pt-1">
                      <h3 className="font-display text-base md:text-xl font-semibold mb-1">{step.title}</h3>
                      <p className="text-muted-foreground text-sm font-light">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-6xl px-4"><div className="gold-divider" /></div>

      {/* ═══ DIRECTIONS ═══ */}
      <section className="py-12 md:py-20 px-4">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: GOLD }}>Направления</span>
            <h2 className="font-display text-2xl md:text-5xl lg:text-6xl font-semibold mt-3">Основные направления</h2>
            <div className="mt-4 w-10 h-px" style={{ background: GOLD }} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 mb-16" style={{ gap: '1px', background: 'hsl(40 12% 16%)' }}>
            {DIRECTIONS.map((d, i) => (
              <div
                key={d.title}
                className="p-6 md:p-8 transition-colors duration-300 animate-fade-up group cursor-default"
                style={{ background: 'hsl(0 0% 6%)', animationDelay: `${i * 80}ms` }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = EMERALD}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'hsl(0 0% 6%)'}
              >
                <div className="w-10 h-10 border flex items-center justify-center mb-6" style={{ borderColor: GOLD40 }}>
                  <Icon name={d.icon} size={18} style={{ color: GOLD }} />
                </div>
                <h3 className="font-display text-base md:text-xl font-semibold mb-3">{d.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">{d.text}</p>
              </div>
            ))}
          </div>

          {/* Возможности */}
          <div className="border border-border/40 p-6 md:p-14 relative corners" style={{ borderColor: GOLD20 }}>
            <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-start">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-4" style={{ color: GOLD }}>Наши возможности</p>
                <h3 className="font-display text-xl md:text-3xl font-semibold mb-6">Работаем на ваш результат</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed font-light">Некоторые из наших постоянных клиентов зарабатывают на объектах недвижимости, которые мы находим для них, за счёт покупки и дальнейшей перепродажи по выгодной цене.</p>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">Наша цель — поиск наилучших условий при покупке недвижимости. Мы не просто подбираем варианты, мы находим их по преимущественно низким ценам.</p>
                <p className="text-muted-foreground text-sm leading-relaxed mt-4 font-light">После покупки мы готовы помочь с ремонтом: подберём проверенного партнёра-подрядчика, который воплотит лучший дизайн вашей квартиры — под ваш вкус и бюджет.</p>
              </div>
              <div className="space-y-2">
                {CAPABILITIES.map((c, i) => (
                  <div key={i} className="flex gap-4 items-start border border-border/40 p-4 transition-colors hover:border-opacity-60" style={{ background: `${EMERALD}33` }}>
                    <div className="w-7 h-7 border flex items-center justify-center shrink-0" style={{ borderColor: GOLD40 }}>
                      <Icon name={c.icon} size={13} style={{ color: GOLD }} />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed pt-0.5 font-light">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACTS / CTA ═══ */}
      <section id="contacts" className="py-10 md:py-20 px-4">
        <div className="container max-w-5xl">
          <div className="relative text-center overflow-hidden py-12 md:py-20 px-6 md:px-16 md:mx-12 corners"
            style={{ background: `linear-gradient(135deg, ${CHERRY} 0%, hsl(340 78% 8%) 50%, ${EMERALD} 100%)`, border: `1px solid ${GOLD20}` }}
          >
            {/* Декоративный золотой свет */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 0%, ${GOLD}18, transparent 60%)` }} />

            <div className="relative z-10">
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: GOLD }}>Начать сейчас</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-center mt-3 mb-2 md:mb-3 text-foreground">
                Поиск недвижимости<br />начинается <span className="italic gold-shimmer">здесь</span>
              </h2>
              <p className="text-muted-foreground text-xs md:text-sm max-w-xl mx-auto mt-4 mb-8 md:mt-6 md:mb-8 font-light tracking-wide">
                Выберите комфортный способ связи: напишите нам в социальных сетях или закажите бесплатный обратный звонок от нашего агента.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
                <button
                  onClick={() => openRequest('social')}
                  className="inline-flex items-center justify-center gap-2 px-8 md:px-10 h-12 md:h-14 text-[10px] tracking-[0.25em] uppercase font-medium transition-opacity hover:opacity-85 w-full sm:w-auto"
                  style={{ background: GOLD, color: 'hsl(0 0% 5%)' }}
                >
                  <Icon name="MessageCircle" size={14} /> Написать
                </button>
                <button
                  onClick={() => openRequest('meeting')}
                  className="inline-flex items-center justify-center gap-2 px-8 md:px-10 h-12 md:h-14 text-[10px] tracking-[0.25em] uppercase font-medium border transition-all w-full sm:w-auto"
                  style={{ borderColor: GOLD40, color: GOLD, background: 'transparent' }}
                >
                  <Icon name="Phone" size={14} /> Обратный звонок
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-5 md:gap-8">
                {[
                  { icon: 'AtSign', label: 'Mail.ru' },
                  { icon: 'Send',   label: 'Telegram' },
                  { icon: 'Phone',  label: 'WhatsApp' },
                  { icon: 'Mail',   label: 'MAX' },
                ].map(c => (
                  <span key={c.label} className="flex items-center gap-2 text-[10px] tracking-widest uppercase" style={{ color: 'hsl(40 8% 60%)' }} translate="no">
                    <Icon name={c.icon} size={12} style={{ color: GOLD }} /> {c.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DIALOG ═══ */}
      <Dialog open={open} onOpenChange={(v) => { if (!v) setForms(prev => ({ ...prev, [mode]: emptyForm() })); setOpen(v); }}>
        <DialogContent className="max-w-md w-[calc(100%-2rem)] max-h-[90dvh] overflow-y-auto rounded-none" style={{ background: 'hsl(0 0% 7%)', borderColor: GOLD20 }}>
          {!f.sent && (
            <DialogHeader>
              <DialogTitle className="font-display text-2xl md:text-3xl font-semibold">
                {mode === 'social' ? 'Запрос на подбор' : 'Обратный звонок'}
              </DialogTitle>
              <DialogDescription className="text-xs tracking-wide font-light">
                {mode === 'social'
                  ? 'Опишите, что вы ищете — мы подберём объекты бесплатно.'
                  : 'Оставьте номер — агент перезвонит и проконсультирует бесплатно.'}
              </DialogDescription>
            </DialogHeader>
          )}
          {f.sent ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-12 h-12 border flex items-center justify-center mx-auto" style={{ borderColor: GOLD40 }}>
                <Icon name="Check" size={20} style={{ color: GOLD }} />
              </div>
              <div className="font-display text-xl font-semibold">Заявка отправлена</div>
              <div className="text-muted-foreground text-sm font-light">Мы свяжемся с вами в ближайшее время.</div>
            </div>
          ) : (
            <form className="space-y-3 mt-2" onSubmit={handleSubmit} onKeyDown={e => { if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') { e.preventDefault(); const fields = Array.from((e.currentTarget as HTMLFormElement).querySelectorAll<HTMLElement>('input:not([type=checkbox]),textarea')); const idx = fields.indexOf(e.target as HTMLElement); if (idx >= 0 && idx < fields.length - 1) fields[idx + 1].focus(); } }}>
              <input type="text" placeholder="Ваше имя" value={f.name} onChange={e => setF({ name: e.target.value })} required
                className="w-full px-4 py-3 border text-sm font-light focus:outline-none transition-colors"
                style={{ background: 'hsl(0 0% 10%)', borderColor: 'hsl(40 12% 18%)', color: 'hsl(40 10% 88%)' }}
              />
              <PhoneInput value={f.phone} onChange={v => setF({ phone: v })}
                className="w-full px-4 py-3 border text-sm font-light focus:outline-none rounded-none"
                style={{ background: 'hsl(0 0% 10%)', borderColor: 'hsl(40 12% 18%)', color: 'hsl(40 10% 88%)' }}
              />
              {mode === 'social' && (
                <input type="text" placeholder="Соцсеть для связи" value={f.social} onChange={e => setF({ social: e.target.value })}
                  className="w-full px-4 py-3 border text-sm font-light focus:outline-none"
                  style={{ background: 'hsl(0 0% 10%)', borderColor: 'hsl(40 12% 18%)', color: 'hsl(40 10% 88%)' }}
                />
              )}
              <textarea placeholder="Что вы ищете? Бюджет, район, количество комнат…" rows={3} value={f.request} onChange={e => setF({ request: e.target.value })}
                className="w-full px-4 py-3 border text-sm font-light focus:outline-none resize-none"
                style={{ background: 'hsl(0 0% 10%)', borderColor: 'hsl(40 12% 18%)', color: 'hsl(40 10% 88%)' }}
              />
              {mode === 'social' && (
                <label className="flex items-center gap-3 px-1 cursor-pointer select-none">
                  <input type="checkbox" checked={f.callback} onChange={e => setF({ callback: e.target.checked })} className="w-4 h-4 cursor-pointer" style={{ accentColor: GOLD }} />
                  <span className="text-xs text-muted-foreground tracking-wide font-light">Хочу обратный звонок</span>
                </label>
              )}
              <button type="submit" disabled={f.sending}
                className="w-full h-12 text-[10px] tracking-[0.25em] uppercase font-medium transition-opacity hover:opacity-85 disabled:opacity-50"
                style={{ background: GOLD, color: 'hsl(0 0% 5%)' }}
              >
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

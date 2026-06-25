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
  { icon: 'Search', title: 'Подбор объектов', text: 'Жилая и коммерческая недвижимость по преимущественно низким ценам под ваши требования.' },
  { icon: 'Handshake', title: 'Сопровождение сделки', text: 'Покупка, продажа, переговоры и безопасная передача средств — контролируем каждый этап.' },
  { icon: 'FileCheck', title: 'Юридическая экспертиза', text: 'Проверим юридическую чистоту объекта, составим договор и соберём все необходимые документы.' },
];

const CAPABILITIES = [
  { icon: 'MapPin', text: 'Помощь в поиске недвижимости, подходящей под требования покупателя' },
  { icon: 'Users', text: 'Посредничество в переговорах между сторонами сделки' },
  { icon: 'ShieldCheck', text: 'Проверка юридической чистоты помещений' },
  { icon: 'FileText', text: 'Сбор и подготовка документов для заключения договора купли-продажи' },
  { icon: 'Banknote', text: 'Помощь во взаимных расчётах — безопасная передача денег при сделке' },
];

const DIRECTIONS = [
  { icon: 'Home', title: 'Жилая недвижимость', text: 'Квартиры в новостройках и на вторичном рынке — для себя или под инвестицию.' },
  { icon: 'Building2', title: 'Коммерческая недвижимость', text: 'Офисные, торговые, индустриальные и социальные объекты для аренды или ведения бизнеса.' },
  { icon: 'ClipboardList', title: 'Экспертная оценка', text: 'Профессиональная оценка объектов недвижимости перед принятием решения о покупке.' },
  { icon: 'Hammer', title: 'Ремонт под ключ', text: 'Подберём проверенного подрядчика из числа наших партнёров, который реализует лучший дизайн вашей новой квартиры — персонально для вас.' },
];

const STEPS = [
  { num: '01', title: 'Оставляете запрос', text: 'Напишите нам или закажите обратный звонок — как удобно вам.' },
  { num: '02', title: 'Подбираем объекты', text: 'Агент с многолетним опытом готовит варианты под вас.' },
  { num: '03', title: 'Получаете результат', text: 'Никуда не ехать. Готовая подборка и сопровождение — бесплатно.' },
];

const SEND_LEAD_URL = 'https://functions.poehali.dev/0951d9ac-cb20-4a66-865c-901b256f6154';

type FormState = { name: string; phone: string; social: string; request: string; callback: boolean; sending: boolean; sent: boolean };
const emptyForm = (): FormState => ({ name: '', phone: '', social: '', request: '', callback: false, sending: false, sent: false });

const Index = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'social' | 'meeting'>('social');
  const [forms, setForms] = useState<Record<string, FormState>>({ social: emptyForm(), meeting: emptyForm() });

  const f = forms[mode];
  const setF = (patch: Partial<FormState>) => setForms(prev => ({ ...prev, [mode]: { ...prev[mode], ...patch } }));

  const openRequest = (m: 'social' | 'meeting' = 'social') => {
    setMode(m);
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim()) return;
    setF({ sending: true });
    try {
      await fetch(SEND_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.name, phone: f.phone, social: f.social, request: f.request, callback: f.callback,
          source: mode === 'social' ? 'Написать в соцсетях' : 'Обратный звонок'
        })
      });
      setF({ sent: true, name: '', phone: '', social: '', request: '', callback: false });
    } finally {
      setF({ sending: false });
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* Hero */}
      <section id="hero" className="relative pt-28 md:pt-40 pb-16 md:pb-28 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 80% 20%, hsl(43 58% 55%), transparent 60%)' }} />
        <div className="container max-w-6xl relative z-10 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="animate-fade-up">
            <div className="flex flex-wrap items-center gap-2 mb-6 md:mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-terracotta/30 text-terracotta text-[10px] md:text-xs tracking-widest uppercase font-medium">
                <Icon name="Shield" size={11} /> Спокойствие сделки
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-border/60 text-muted-foreground text-[10px] md:text-xs tracking-widest uppercase font-medium">
                <Icon name="Sparkles" size={11} /> Подбор — бесплатно
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-border/60 text-muted-foreground text-[10px] md:text-xs tracking-widest uppercase font-medium">
                <Icon name="Key" size={11} /> Решение за вами
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5 md:mb-7">
              Найдём дом, <br />где вам будет <span className="text-terracotta italic">тепло</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mb-7 md:mb-9 max-w-md leading-relaxed font-light">
              Бесплатно подберём квартиру, ипотеку и рассрочку. Вам не нужно никуда ехать — просто оставьте запрос и получите готовый результат.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => openRequest('social')}
                className="bg-terracotta hover:bg-terracotta/90 text-background px-6 md:px-10 h-11 md:h-14 text-xs tracking-widest uppercase font-medium w-full sm:w-auto rounded-none"
              >
                <Icon name="MessageCircle" size={14} className="mr-2" /> Написать запрос
              </Button>
              <Button
                onClick={() => openRequest('meeting')}
                variant="outline"
                className="border border-border/60 text-muted-foreground hover:text-foreground hover:border-terracotta/40 px-6 md:px-10 h-11 md:h-14 text-xs tracking-widest uppercase font-medium w-full sm:w-auto rounded-none bg-transparent"
              >
                <Icon name="Phone" size={14} className="mr-2" /> Обратный звонок
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-[11px] text-muted-foreground tracking-wider uppercase">
              <span className="flex items-center gap-1.5"><Icon name="Check" size={12} className="text-terracotta" /> Без условий</span>
              <span className="flex items-center gap-1.5"><Icon name="Check" size={12} className="text-terracotta" /> Вы ничего не платите</span>
              <span className="flex items-center gap-1.5"><Icon name="MapPin" size={12} className="text-terracotta" /> Москва и МО</span>
            </div>
          </div>
          <div className="relative animate-fade-up hidden lg:block" style={{ animationDelay: '150ms' }}>
            <div className="absolute inset-0 border border-terracotta/20" style={{ transform: 'translate(12px, 12px)' }} />
            <img src={HERO_IMG} alt="Современный дом" className="w-full h-[520px] object-cover relative z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background/60 to-transparent z-20" />
          </div>
        </div>

        {/* Divider line */}
        <div className="container max-w-6xl mt-14 md:mt-20">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-12 md:py-20 px-4">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16">
            <span className="text-terracotta text-[10px] tracking-[0.3em] uppercase font-medium">Что мы делаем</span>
            <h2 className="font-display text-2xl md:text-5xl lg:text-6xl font-semibold mt-3">Услуги под ключ</h2>
            <div className="w-10 h-px bg-terracotta mt-4" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className="bg-background p-6 md:p-8 hover:bg-muted/30 transition-colors duration-300 animate-fade-up group"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 border border-terracotta/30 flex items-center justify-center mb-6 group-hover:border-terracotta/60 transition-colors">
                  <Icon name={s.icon} size={18} className="text-terracotta" />
                </div>
                <h3 className="font-display text-base md:text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container max-w-6xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Why Us */}
      <section id="why" className="py-12 md:py-20 px-4">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16">
            <span className="text-terracotta text-[10px] tracking-[0.3em] uppercase font-medium">Зачем мы нужны</span>
            <h2 className="font-display text-2xl md:text-5xl lg:text-6xl font-semibold mt-3 max-w-3xl leading-tight">
              Рынок недвижимости должен служить{' '}
              <span className="text-terracotta italic">покупателю</span>
              {' — '}а не тем, кто продаёт.
            </h2>
            <div className="w-10 h-px bg-terracotta mt-4" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="space-y-3">
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Вам больше не нужно:</p>
              {[
                'Тратить время на самостоятельный поиск квартиры и сталкиваться с фейковыми объявлениями',
                'Часами искать надёжного агента среди сотен предложений',
                'Разбираться в бесконечном потоке рекламы и платных услуг на сторонних сайтах',
              ].map((text, i) => (
                <div key={i} className="flex gap-4 border border-border/40 p-4 md:p-5">
                  <div className="w-6 h-6 border border-border/60 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="X" size={12} className="text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm font-light">{text}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Вы можете:</p>
              <div className="border-l-2 border-terracotta pl-5 mb-6">
                <p className="text-base md:text-lg font-medium leading-snug">Доверить всю эту работу нам — и использовать сэкономленное время для себя.</p>
              </div>
              <p className="leading-relaxed text-sm text-muted-foreground font-light">Мы выполним всё именно так, как вы задумали. С полной уверенностью в качестве каждого этапа — от первого звонка до получения ключей.</p>
              {[
                { icon: 'ShieldCheck', label: 'Надёжно', text: 'Прозрачные условия, тщательная проработка сделки и выявление всех возможных рисков' },
                { icon: 'Zap', label: 'Быстро', text: 'Заявки клиентов рассматриваются в приоритетном порядке' },
                { icon: 'Star', label: 'Профессионально', text: 'Составим договор и соберём полный пакет необходимых документов' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 border border-border/40 p-4 md:p-5 hover:border-terracotta/30 transition-colors">
                  <div className="w-8 h-8 border border-terracotta/30 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} size={16} className="text-terracotta" />
                  </div>
                  <div>
                    <div className="text-xs tracking-widest uppercase font-medium mb-1">{item.label}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed font-light">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container max-w-6xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* About + Steps */}
      <section id="about" className="py-12 md:py-20 px-4">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <span className="text-terracotta text-[10px] tracking-[0.3em] uppercase font-medium">О компании</span>
              <h2 className="font-display text-2xl md:text-5xl lg:text-6xl font-semibold mt-3 mb-4 leading-tight">
                История и команда<br /><span className="text-terracotta italic">Apex Solutions</span>
              </h2>
              <div className="w-10 h-px bg-terracotta mb-8" />
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-light">Мы — динамично развивающаяся организация, работающая на рынке услуг по подбору недвижимости с 2025 года. За это время мы успешно реализовали множество проектов разного масштаба и уровня сложности.</p>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-light">Образование компании стало логическим продолжением успешного завершения финансовых сделок группой специалистов, составивших основу нашей профессиональной деятельности.</p>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed font-light">Apex Solutions — команда, поставившая своей целью решать все ваши вопросы, связанные с приобретением недвижимости. Мы готовы помочь принять верное решение и подобрать наилучшие условия именно для вас.</p>
              <div className="border border-terracotta/30 p-6 bg-muted/20">
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
                    className="flex gap-6 border-b border-border/40 py-6 first:border-t animate-fade-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="font-display text-3xl md:text-4xl font-bold text-terracotta/25 w-12 shrink-0">{step.num}</div>
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

      {/* Divider */}
      <div className="container max-w-6xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Directions */}
      <section className="py-12 md:py-20 px-4">
        <div className="container max-w-6xl">
          <div className="mb-10 md:mb-16">
            <span className="text-terracotta text-[10px] tracking-[0.3em] uppercase font-medium">Направления</span>
            <h2 className="font-display text-2xl md:text-5xl lg:text-6xl font-semibold mt-3">Основные направления</h2>
            <div className="w-10 h-px bg-terracotta mt-4" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40 mb-16">
            {DIRECTIONS.map((d, i) => (
              <div key={d.title} className="bg-background p-6 md:p-8 hover:bg-muted/30 transition-colors duration-300 animate-fade-up group" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-10 h-10 border border-terracotta/30 flex items-center justify-center mb-6 group-hover:border-terracotta/60 transition-colors">
                  <Icon name={d.icon} size={18} className="text-terracotta" />
                </div>
                <h3 className="font-display text-base md:text-xl font-semibold mb-3">{d.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">{d.text}</p>
              </div>
            ))}
          </div>

          <div className="border border-border/40 p-6 md:p-14">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-start">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Наши возможности</p>
                <h3 className="font-display text-xl md:text-3xl font-semibold mb-6">Работаем на ваш результат</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed font-light">Некоторые из наших постоянных клиентов зарабатывают на объектах недвижимости, которые мы находим для них, за счёт покупки и дальнейшей перепродажи по выгодной цене.</p>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">Наша цель — поиск наилучших условий при покупке недвижимости. Мы не просто подбираем варианты, мы находим их по преимущественно низким ценам.</p>
                <p className="text-muted-foreground text-sm leading-relaxed mt-4 font-light">После покупки мы готовы помочь с ремонтом: подберём проверенного партнёра-подрядчика, который воплотит лучший дизайн вашей квартиры — под ваш вкус и бюджет.</p>
              </div>
              <div className="space-y-2">
                {CAPABILITIES.map((c, i) => (
                  <div key={i} className="flex gap-4 items-start border border-border/40 p-4 hover:border-terracotta/20 transition-colors">
                    <div className="w-7 h-7 border border-terracotta/30 flex items-center justify-center shrink-0">
                      <Icon name={c.icon} size={14} className="text-terracotta" />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed pt-0.5 font-light">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts / CTA */}
      <section id="contacts" className="py-10 md:py-20 px-4">
        <div className="container max-w-5xl">
          <div className="relative text-center overflow-hidden py-12 md:py-20 px-6 md:px-16 bg-muted/20 border border-border/60 md:mx-12">
            <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-terracotta/30 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-terracotta/30 pointer-events-none" />
            <div className="relative z-10">
              <span className="text-terracotta text-[10px] tracking-[0.3em] uppercase font-medium">Начать сейчас</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-center mt-3 mb-2 md:mb-3">
                Поиск недвижимости<br />начинается <span className="italic text-terracotta">здесь</span>
              </h2>
              <p className="text-muted-foreground text-xs md:text-sm max-w-xl mx-auto mt-4 mb-8 md:mt-6 md:mb-8 font-light tracking-wide">Выберите комфортный способ связи: напишите нам в социальных сетях или закажите бесплатный обратный звонок от нашего агента.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6 md:mb-8">
                <Button
                  onClick={() => openRequest('social')}
                  className="bg-terracotta hover:bg-terracotta/90 text-background px-8 md:px-10 h-11 md:h-14 text-xs tracking-widest uppercase font-medium w-full sm:w-auto rounded-none"
                >
                  <Icon name="MessageCircle" size={14} className="mr-2" /> Написать
                </Button>
                <Button
                  onClick={() => openRequest('meeting')}
                  variant="outline"
                  className="border border-border/60 text-muted-foreground hover:text-foreground hover:border-terracotta/40 px-8 md:px-10 h-11 md:h-14 text-xs tracking-widest uppercase font-medium w-full sm:w-auto rounded-none bg-transparent"
                >
                  <Icon name="Phone" size={14} className="mr-2" /> Обратный звонок
                </Button>
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {[
                  { icon: 'AtSign', label: 'Mail.ru' },
                  { icon: 'Send', label: 'Telegram' },
                  { icon: 'Phone', label: 'WhatsApp' },
                  { icon: 'Mail', label: 'MAX' },
                ].map((c) => (
                  <span key={c.label} className="flex items-center gap-2 text-muted-foreground text-[11px] tracking-widest uppercase" translate="no">
                    <Icon name={c.icon} size={13} className="text-terracotta" /> {c.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request dialog */}
      <Dialog open={open} onOpenChange={(v) => { if (!v) setForms(prev => ({ ...prev, [mode]: emptyForm() })); setOpen(v); }}>
        <DialogContent className="max-w-md w-[calc(100%-2rem)] max-h-[90dvh] overflow-y-auto rounded-none border border-border/60">
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
              <div className="w-12 h-12 border border-terracotta/40 flex items-center justify-center mx-auto">
                <Icon name="Check" size={20} className="text-terracotta" />
              </div>
              <div className="font-display text-xl font-semibold">Заявка отправлена</div>
              <div className="text-muted-foreground text-sm font-light">Мы свяжемся с вами в ближайшее время.</div>
            </div>
          ) : (
            <form className="space-y-3 mt-2" onSubmit={handleSubmit} onKeyDown={e => { if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') { e.preventDefault(); const fields = Array.from((e.currentTarget as HTMLFormElement).querySelectorAll<HTMLElement>('input:not([type=checkbox]),textarea')); const idx = fields.indexOf(e.target as HTMLElement); if (idx >= 0 && idx < fields.length - 1) fields[idx + 1].focus(); } }}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={f.name}
                onChange={e => setF({ name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-muted/40 border border-border/60 focus:outline-none focus:border-terracotta/60 text-sm font-light rounded-none"
              />
              <PhoneInput
                value={f.phone}
                onChange={v => setF({ phone: v })}
                className="w-full px-4 py-3 bg-muted/40 border border-border/60 focus:outline-none focus:border-terracotta/60 text-sm font-light rounded-none"
              />
              {mode === 'social' && (
                <input
                  type="text"
                  placeholder="Соцсеть для связи"
                  value={f.social}
                  onChange={e => setF({ social: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/40 border border-border/60 focus:outline-none focus:border-terracotta/60 text-sm font-light rounded-none"
                />
              )}
              <textarea
                placeholder="Что вы ищете? Бюджет, район, количество комнат…"
                rows={3}
                value={f.request}
                onChange={e => setF({ request: e.target.value })}
                className="w-full px-4 py-3 bg-muted/40 border border-border/60 focus:outline-none focus:border-terracotta/60 text-sm font-light resize-none rounded-none"
              />
              {mode === 'social' && (
                <label className="flex items-center gap-3 px-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={f.callback}
                    onChange={e => setF({ callback: e.target.checked })}
                    className="w-4 h-4 accent-terracotta cursor-pointer rounded-none"
                  />
                  <span className="text-xs text-muted-foreground tracking-wide font-light">Хочу обратный звонок</span>
                </label>
              )}
              <Button
                type="submit"
                disabled={f.sending}
                className="w-full bg-terracotta hover:bg-terracotta/90 text-background h-12 text-xs tracking-widest uppercase font-medium rounded-none"
              >
                {f.sending ? 'Отправляем…' : 'Отправить запрос'}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <ScrollToTop />
    </div>
  );
};

export default Index;

import { useState } from 'react';
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

const LOGO =
  'https://cdn.poehali.dev/projects/ab7a83ba-e182-427f-8219-a315e20c4c4a/bucket/86de0f04-c250-4a9c-8dc9-af7909de41a2.png';

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
];

const STEPS = [
  { num: '01', title: 'Оставляете запрос', text: 'В соцсетях или на онлайн-встрече — как удобно вам.' },
  { num: '02', title: 'Подбираем объекты', text: 'Агент с многолетним опытом готовит варианты под вас.' },
  { num: '03', title: 'Получаете результат', text: 'Никуда не ехать. Готовая подборка и сопровождение — бесплатно.' },
];

const Index = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'social' | 'meeting'>('social');

  const openRequest = (m: 'social' | 'meeting' = 'social') => {
    setMode(m);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container max-w-6xl flex items-center justify-between py-4">
          <a href="#" className="flex items-center">
            <img src={LOGO} alt="Дом Мечты" className="h-16 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
            <a href="#services" className="px-4 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/70 transition-colors">Услуги</a>

            <a href="#about" className="px-4 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/70 transition-colors">О нас</a>
            <a href="#contacts" className="px-4 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/70 transition-colors">Контакты</a>
            <a href="/commercial" className="px-4 py-2 rounded-full bg-terracotta/15 text-terracotta hover:bg-terracotta/25 transition-colors font-semibold">Коммерция</a>
          </nav>
          <a href="/for-client" className="w-11 h-11 rounded-full bg-terracotta hover:bg-terracotta/90 flex items-center justify-center transition-colors">
            <Icon name="Heart" size={20} className="text-white fill-white" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-4">
        <div className="absolute top-24 -right-24 w-96 h-96 bg-sage/30 blob-shape animate-float-slow -z-0" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 bg-terracotta/10 blob-shape-2 animate-float-slow -z-0" style={{ animationDelay: '2s' }} />
        <div className="container max-w-6xl relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="flex flex-col items-start gap-2 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/12 text-terracotta text-sm font-medium">
                <Icon name="Shield" size={16} /> Спокойствие сделки
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                <Icon name="Sparkles" size={16} /> Подбор недвижимости — бесплатно
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                <Icon name="Key" size={16} /> Вы принимаете ключевое решение
              </span>
            </div>
            <h1 className="font-display text-6xl md:text-7xl font-bold leading-[0.95] mb-6 text-balance">
              Найдём дом,<br />где вам будет <span className="text-terracotta italic">тепло</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Бесплатно подберём квартиру, ипотеку и рассрочку. Вам не нужно никуда ехать — просто оставьте запрос и получите готовый результат.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => openRequest('social')} size="lg" className="rounded-full bg-terracotta hover:bg-terracotta/90 text-white px-8 h-14 text-base">
                <Icon name="MessageCircle" size={20} /> Написать запрос
              </Button>
              <Button onClick={() => openRequest('meeting')} size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-2 border-terracotta text-terracotta hover:bg-accent">
                <Icon name="Video" size={20} /> Онлайн-встреча
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Icon name="Check" size={18} className="text-terracotta" /> Без условий</span>
              <span className="flex items-center gap-2"><Icon name="Check" size={18} className="text-terracotta" /> Вы ничего не платите</span>
            </div>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: '150ms' }}>
            <img src={HERO_IMG} alt="Современный дом" className="w-full h-[480px] object-cover blob-shape shadow-2xl" />

          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-4 bg-muted/40">
        <div className="container max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-terracotta font-medium tracking-widest uppercase text-sm">Что мы делаем</span>
            <h2 className="font-display text-5xl md:text-6xl font-semibold mt-3">Услуги под ключ</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className="bg-card rounded-[2rem] p-8 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-terracotta/12 flex items-center justify-center mb-5">
                  <Icon name={s.icon} size={26} className="text-terracotta" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 px-4">
        <div className="container max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-terracotta font-medium tracking-widest uppercase text-sm">Зачем мы нужны</span>
            <h2 className="font-display text-5xl md:text-6xl font-semibold mt-3 text-balance">
              Рынок недвижимости должен служить{' '}
              <span className="text-terracotta italic">покупателю</span>
              {' —'}
              <br className="hidden md:block" />
              {' '}а не тем, кто{' '}
              <span className="relative inline-block">
                продаёт
                <span className="absolute bottom-1 left-0 w-full h-[3px] bg-terracotta/30 rounded-full" />
              </span>
              .
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start bg-transparent">
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-semibold mb-6 text-muted-foreground">Вам больше не нужно:</h3>
              {[
                'Тратить время на самостоятельный поиск квартиры и сталкиваться с фейковыми объявлениями',
                'Часами искать надёжного агента среди сотен предложений',
                'Разбираться в бесконечном потоке рекламы и платных услуг на сторонних сайтах',
              ].map((text, i) => (
                <div key={i} className="flex gap-4 bg-muted/60 rounded-2xl p-5">
                  <div className="w-8 h-8 rounded-full bg-terracotta/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="X" size={16} className="text-terracotta" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-semibold mb-6">Вы можете:</h3>
              <div className="bg-accent rounded-2xl p-6 mb-4">
                <p className="text-lg font-medium">Доверить всю эту работу нам — и использовать сэкономленное время для себя.</p>
              </div>
              <p className="leading-relaxed text-base text-muted-foreground">Мы выполним всё именно так, как вы задумали. С полной уверенностью в качестве каждого этапа — от первого звонка до получения ключей.</p>
              {[
                { icon: 'ShieldCheck', label: 'Надёжно', text: 'Прозрачные условия, тщательная проработка сделки и выявление всех возможных рисков' },
                { icon: 'Zap', label: 'Быстро', text: 'Заявки клиентов рассматриваются в приоритетном порядке' },
                { icon: 'Star', label: 'Профессионально', text: 'Составим договор и соберём полный пакет необходимых документов' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 bg-card rounded-2xl p-5 border border-border">
                  <div className="w-10 h-10 rounded-2xl bg-terracotta/12 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} size={20} className="text-terracotta" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{item.label}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About + Steps */}
      <section id="about" className="py-24 px-4 bg-muted/40">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-terracotta font-medium tracking-widest uppercase text-sm">О компании</span>
              <h2 className="font-display text-5xl md:text-6xl font-semibold mt-3 mb-6 text-balance">
                История и команда «Дом Мечты»
              </h2>
              <p className="text-lg text-muted-foreground mb-4">Мы — динамично развивающаяся организация, работающая на рынке услуг по подбору недвижимости с 2025 года. За это время мы успешно реализовали множество проектов разного масштаба и уровня сложности.</p>
              <p className="text-lg text-muted-foreground mb-4">Образование компании стало логическим продолжением успешного завершения финансовых сделок группой специалистов, составивших основу нашей профессиональной деятельности.</p>
              <p className="text-lg text-muted-foreground mb-6">«Дом Мечты» — команда, поставившая своей целью решать все ваши вопросы, связанные с приобретением недвижимости. Мы готовы помочь принять верное решение и подобрать наилучшие условия именно для вас.
</p>
              <div className="bg-card rounded-2xl p-6 border border-border">
                <p className="font-display text-xl font-semibold mb-2">Результат гарантирован</p>
                <p className="text-muted-foreground">Наша команда — опытные профессионалы, которые полностью контролируют сделку на всех этапах. Мы всегда работаем на результат.</p>
              </div>
            </div>
            <div className="space-y-5">
              <h3 className="font-display text-3xl font-semibold mb-2">Как это работает</h3>
              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className="flex gap-5 bg-card rounded-[2rem] p-6 border border-border animate-fade-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="font-display text-4xl font-bold text-terracotta/40">{step.num}</div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold mb-1">{step.title}</h3>
                    <p className="text-muted-foreground">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="py-24 px-4">
        <div className="container max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-terracotta font-medium tracking-widest uppercase text-sm">Направления</span>
            <h2 className="font-display text-5xl md:text-6xl font-semibold mt-3">Основные направления</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            {DIRECTIONS.map((d, i) => (
              <div key={d.title} className="bg-card rounded-[2rem] p-8 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-14 h-14 rounded-2xl bg-terracotta/12 flex items-center justify-center mb-5">
                  <Icon name={d.icon} size={26} className="text-terracotta" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{d.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-muted/60 rounded-[2rem] p-10 md:p-14">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="font-display text-3xl font-semibold mb-4">Наши возможности</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Некоторые из наших постоянных клиентов зарабатывают на объектах недвижимости, которые мы находим для них, за счёт покупки и дальнейшей перепродажи по выгодной цене.</p>
                <p className="text-muted-foreground leading-relaxed">Наша цель — поиск наилучших условий при покупке недвижимости. Мы не просто подбираем варианты, мы находим их по преимущественно низким ценам.</p>
              </div>
              <div className="space-y-3">
                {CAPABILITIES.map((c, i) => (
                  <div key={i} className="flex gap-4 items-start bg-card rounded-2xl p-4 border border-border">
                    <div className="w-9 h-9 rounded-xl bg-terracotta/12 flex items-center justify-center shrink-0">
                      <Icon name={c.icon} size={18} className="text-terracotta" />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed pt-1">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts / CTA */}
      <section id="contacts" className="py-24 px-4">
        <div className="container max-w-5xl">
          <div className="relative bg-terracotta rounded-[3rem] p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 blob-shape" />
            <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-white/5 blob-shape-2" />
            <div className="relative z-10 mx-0 py-[30px]">
              <h2 className="font-display md:text-6xl mb-4 text-center text-6xl text-[#33291f] font-semibold">Поиск недвижимости 
начинается здесь
</h2>
              <p className="text-white/90 text-lg max-w-xl px-0 mx-32 my-[30px]">Выберите комфортный способ связи: напишите нам в социальных сетях или запланируйте бесплатную онлайн-встречу с нашим агентом.</p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button onClick={() => openRequest('social')} size="lg" className="rounded-full bg-white text-terracotta hover:bg-white/90 px-8 h-14 text-base">
                  <Icon name="MessageCircle" size={20} /> Написать в соцсетях
                </Button>
                <Button onClick={() => openRequest('meeting')} size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-8 h-14 text-base">
                  <Icon name="Video" size={20} /> Записаться на встречу
                </Button>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { icon: 'Send', label: 'Telegram' },
                  { icon: 'Phone', label: 'WhatsApp' },
                  { icon: 'AtSign', label: 'VK' },
                ].map((c) => (
                  <button key={c.label} onClick={() => openRequest('social')} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                    <Icon name={c.icon} size={20} /> {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-border">
        <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
          <img src={LOGO} alt="Дом Мечты" className="h-16 w-auto" />
          <span>© 2026 Дом Мечты. Бесплатный подбор недвижимости.</span>
        </div>
      </footer>

      {/* Request dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-[2rem] max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl font-semibold">
              {mode === 'social' ? 'Запрос на подбор' : 'Онлайн-встреча'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'social'
                ? 'Опишите, что вы ищете — мы подберём объекты бесплатно.'
                : 'Оставьте контакты — агент свяжется и проконсультирует бесплатно.'}
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4 mt-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full px-5 py-3 rounded-full bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
            <input
              type="tel"
              placeholder="Телефон или ник в соцсети"
              className="w-full px-5 py-3 rounded-full bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
            <textarea
              placeholder="Что вы ищете? Бюджет, район, количество комнат…"
              rows={3}
              className="w-full px-5 py-3 rounded-3xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-terracotta resize-none"
            />
            <Button type="submit" className="w-full rounded-full bg-terracotta hover:bg-terracotta/90 text-white h-12 text-base">
              Отправить запрос
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
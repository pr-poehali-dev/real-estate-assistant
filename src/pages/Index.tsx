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
import PropertyCatalog from '@/components/PropertyCatalog';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/ab7a83ba-e182-427f-8219-a315e20c4c4a/files/c2e2e8e1-8b4a-453f-b641-886131fa7479.jpg';

const LOGO =
  'https://cdn.poehali.dev/projects/ab7a83ba-e182-427f-8219-a315e20c4c4a/bucket/86de0f04-c250-4a9c-8dc9-af7909de41a2.png';

const SERVICES = [
  { icon: 'Home', title: 'Подбор квартир', text: 'Новостройки, вторичка и коммерция под ваш запрос. Полностью бесплатно.' },
  { icon: 'Percent', title: 'Ипотека и рассрочка', text: 'Подберём самые актуальные условия по каждому жилому комплексу.' },
  { icon: 'Hammer', title: 'Ремонт под ключ', text: 'Поможем выбрать надёжного подрядчика — серьёзный шаг с заботой о вас.' },
  { icon: 'Handshake', title: 'Сопровождение сделки', text: 'Организуем показ с застройщиком и проведём вас на всех этапах.' },
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
        <div className="container max-w-6xl flex items-center justify-between py-6">
          <a href="#" className="flex items-center">
            <img src={LOGO} alt="Дом Мечты" className="h-16 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
            <a href="#services" className="px-4 py-2 rounded-full bg-sage/20 hover:bg-sage/40 text-foreground transition-colors backdrop-blur-sm">Услуги</a>
            <a href="#catalog" className="px-4 py-2 rounded-full bg-sage/20 hover:bg-sage/40 text-foreground transition-colors backdrop-blur-sm">Каталог</a>
            <a href="#about" className="px-4 py-2 rounded-full bg-sage/20 hover:bg-sage/40 text-foreground transition-colors backdrop-blur-sm">О нас</a>
            <a href="#contacts" className="px-4 py-2 rounded-full bg-sage/20 hover:bg-sage/40 text-foreground transition-colors backdrop-blur-sm">Контакты</a>
          </nav>
          <Button onClick={() => openRequest('social')} className="rounded-full bg-terracotta hover:bg-terracotta/90 text-white">
            Оставить запрос
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-28 pb-24 px-4">
        <div className="absolute top-24 -right-24 w-96 h-96 bg-sage/30 blob-shape animate-float-slow -z-0" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 bg-terracotta/10 blob-shape-2 animate-float-slow -z-0" style={{ animationDelay: '2s' }} />
        <div className="container max-w-6xl relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              <Icon name="Sparkles" size={16} /> Подбор недвижимости — бесплатно
            </span>
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
            <div className="absolute -bottom-6 -left-6 bg-card rounded-3xl shadow-xl p-5 border border-border hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-terracotta/15 flex items-center justify-center text-2xl">🤝</div>
                <div>
                  <div className="font-display text-2xl font-bold leading-none">12 лет</div>
                  <div className="text-sm text-muted-foreground">опыта агентов</div>
                </div>
              </div>
            </div>
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

      {/* Catalog */}
      <PropertyCatalog onRequest={() => openRequest('social')} />

      {/* About + Steps */}
      <section id="about" className="py-24 px-4 bg-muted/40">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-terracotta font-medium tracking-widest uppercase text-sm">О нас</span>
              <h2 className="font-display text-5xl md:text-6xl font-semibold mt-3 mb-6 text-balance">
                Заботимся о каждом шаге к вашему дому
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Мы не просто подбираем лучшие объекты недвижимости — мы сопровождаем вас на всех этапах сделки: от первого запроса до получения ключей.
              </p>
              <p className="text-lg text-muted-foreground">
                Всё интуитивно прозрачно и понятно. Никаких скрытых условий — и, главное, вы ничего не платите.
              </p>
            </div>
            <div className="space-y-5">
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

      {/* Contacts / CTA */}
      <section id="contacts" className="py-24 px-4">
        <div className="container max-w-5xl">
          <div className="relative bg-terracotta rounded-[3rem] p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 blob-shape" />
            <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-white/5 blob-shape-2" />
            <div className="relative z-10">
              <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
                Готовы найти свой дом?
              </h2>
              <p className="text-white/90 text-lg max-w-xl mx-auto mb-10">
                Выберите удобный формат: напишите запрос в соцсетях или запишитесь на бесплатную онлайн-встречу с агентом.
              </p>
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
          <img src={LOGO} alt="Дом Мечты" className="h-28 w-auto" />
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
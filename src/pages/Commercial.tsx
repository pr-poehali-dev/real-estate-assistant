import { useState } from 'react';
import ScrollToTop from '@/components/ScrollToTop';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const LOGO =
  'https://cdn.poehali.dev/projects/ab7a83ba-e182-427f-8219-a315e20c4c4a/bucket/86de0f04-c250-4a9c-8dc9-af7909de41a2.png';

const TYPES = [
  { icon: 'Store', title: 'Торговые помещения', text: 'Магазины, торговые центры, павильоны и площади для розничной торговли.' },
  { icon: 'Building', title: 'Офисные объекты', text: 'Офисы и бизнес-центры различного класса под аренду или покупку.' },
  { icon: 'Warehouse', title: 'Индустриальные', text: 'Склады, производственные помещения, логистические комплексы.' },
  { icon: 'Landmark', title: 'Социальные', text: 'Медицинские, образовательные и иные объекты социальной инфраструктуры.' },
];

const ADVANTAGES = [
  { icon: 'TrendingDown', title: 'Низкие цены', text: 'Находим объекты по преимущественно низким ценам — ниже рынка.' },
  { icon: 'BarChart2', title: 'Инвестиционный потенциал', text: 'Помогаем выбрать объекты, пригодные для последующей перепродажи с прибылью.' },
  { icon: 'ShieldCheck', title: 'Юридическая чистота', text: 'Проверяем каждый объект и готовим полный пакет документов для сделки.' },
  { icon: 'Banknote', title: 'Безопасный расчёт', text: 'Сопровождаем передачу средств между сторонами — без рисков для обеих сторон.' },
];

const CAPABILITIES = [
  'Помощь в поиске объекта, подходящего под требования и бюджет покупателя',
  'Посредничество в переговорах между покупателем и продавцом',
  'Проверка юридической чистоты помещения',
  'Сбор и подготовка документов для заключения договора купли-продажи',
  'Экспертная оценка объекта перед принятием решения',
  'Консультирование по правовым и финансовым вопросам сделки',
];

const SEND_LEAD_URL = 'https://functions.poehali.dev/0951d9ac-cb20-4a66-865c-901b256f6154';

const Commercial = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [request, setRequest] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setSending(true);
    try {
      await fetch(SEND_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, request, source: 'Коммерческая недвижимость' })
      });
      setSent(true);
      setName(''); setContact(''); setRequest('');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero */}
      <section id="hero" className="relative pt-36 pb-24 px-4">
        <div className="absolute top-24 -right-24 w-96 h-96 bg-sage/25 blob-shape animate-float-slow -z-0" />
        <div className="absolute top-48 -left-20 w-72 h-72 blob-shape-2 animate-float-slow -z-0 bg-[#c4855a22]" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-0 right-1/3 w-56 h-56 blob-shape animate-float-slow -z-0 bg-[#a8c4a220]" style={{ animationDelay: '3s' }} />
        <div className="container max-w-6xl relative z-10">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              <Icon name="Building2" size={16} /> Дополнительная услуга
            </span>
            <h1 className="font-display text-6xl md:text-7xl font-bold leading-[0.95] mb-6 text-balance">
              Коммерческая<br />
              <span className="text-terracotta italic">недвижимость</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Находим офисные, торговые, индустриальные и социальные объекты по преимущественно низким ценам — для аренды, ведения бизнеса или выгодной перепродажи. Полное сопровождение сделки включено.
            </p>
            <Button onClick={() => setOpen(true)} size="lg" className="rounded-full bg-terracotta hover:bg-terracotta/90 text-white px-8 h-14 text-base">
              <Icon name="MessageCircle" size={20} /> Получить консультацию
            </Button>
          </div>
        </div>
      </section>

      {/* Types */}
      <section id="types" className="py-20 px-4 bg-muted/40">
        <div className="container max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-terracotta font-medium tracking-widest uppercase text-sm">Что мы находим</span>
            <h2 className="font-display text-5xl font-semibold mt-3">Типы объектов</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TYPES.map((t, i) => (
              <div
                key={t.title}
                className="bg-card rounded-[2rem] p-8 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-terracotta/12 flex items-center justify-center mb-5">
                  <Icon name={t.icon} size={26} className="text-terracotta" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{t.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="py-20 px-4">
        <div className="container max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-terracotta font-medium tracking-widest uppercase text-sm">Наши преимущества</span>
            <h2 className="font-display text-5xl font-semibold mt-3">Почему выбирают нас</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {ADVANTAGES.map((a, i) => (
              <div key={a.title} className="flex gap-5 bg-card rounded-[2rem] p-8 border border-border animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-14 h-14 rounded-2xl bg-terracotta/12 flex items-center justify-center shrink-0">
                  <Icon name={a.icon} size={26} className="text-terracotta" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">{a.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities + Investment */}
      <section id="capabilities" className="py-20 px-4 bg-muted/40">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-terracotta font-medium tracking-widest uppercase text-sm">Возможности</span>
              <h2 className="font-display text-4xl font-semibold mt-3 mb-8">Что мы делаем для вас</h2>
              <div className="space-y-3">
                {CAPABILITIES.map((c, i) => (
                  <div key={i} className="flex gap-4 items-start bg-card rounded-2xl p-4 border border-border">
                    <div className="w-8 h-8 rounded-xl bg-terracotta/12 flex items-center justify-center shrink-0">
                      <Icon name="Check" size={16} className="text-terracotta" />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed pt-0.5">{c}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-terracotta font-medium tracking-widest uppercase text-sm">Инвестиции</span>
              <h2 className="font-display text-4xl font-semibold mt-3 mb-6">Зарабатывайте на недвижимости</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Часть наших постоянных клиентов приобретают коммерческие объекты для последующей перепродажи или сдачи в аренду. Мы находим объекты по ценам ниже рынка — это открывает возможность получить доход уже на старте.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Наша цель — найти для вас наилучшие условия покупки. Мы не просто подбираем объекты — мы ищем там, где другие не смотрят.
              </p>
              <div className="bg-terracotta/10 border border-terracotta/20 rounded-2xl p-6">
                <p className="font-semibold text-terracotta mb-1">Результат гарантирован</p>
                <p className="text-muted-foreground text-sm">Каждую сделку ведут опытные специалисты с полным контролем на всех этапах.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-20 px-4">
        <div className="container max-w-5xl">
          <div className="relative bg-terracotta rounded-[3rem] p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 blob-shape" />
            <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-white/5 blob-shape-2" />
            <div className="relative z-10">
              <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
                Нужен коммерческий объект?
              </h2>
              <p className="text-white/90 text-lg max-w-xl mx-auto mb-10">
                Оставьте запрос — подберём подходящие варианты по выгодной цене и проведём сделку под ключ.
              </p>
              <Button onClick={() => setOpen(true)} size="lg" className="rounded-full bg-white text-terracotta hover:bg-white/90 px-8 h-14 text-base">
                <Icon name="MessageCircle" size={20} /> Оставить запрос
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-border">
        <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">


        </div>
      </footer>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-[2rem] max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl font-semibold">Запрос на коммерцию</DialogTitle>
            <DialogDescription>
              Опишите объект — мы подберём варианты и свяжемся с вами бесплатно.
            </DialogDescription>
          </DialogHeader>
          {sent ? (
            <div className="py-8 text-center space-y-2">
              <div className="text-4xl">✓</div>
              <div className="font-display text-xl font-semibold">Заявка отправлена!</div>
              <div className="text-muted-foreground text-sm">Мы свяжемся с вами в ближайшее время.</div>
            </div>
          ) : (
            <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-5 py-3 rounded-full bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-terracotta"
              />
              <input
                type="tel"
                placeholder="Телефон или ник в соцсети"
                value={contact}
                onChange={e => setContact(e.target.value)}
                required
                className="w-full px-5 py-3 rounded-full bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-terracotta"
              />
              <textarea
                placeholder="Тип объекта, площадь, бюджет, цель покупки…"
                rows={3}
                value={request}
                onChange={e => setRequest(e.target.value)}
                className="w-full px-5 py-3 rounded-3xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-terracotta resize-none"
              />
              <Button type="submit" disabled={sending} className="w-full rounded-full bg-terracotta hover:bg-terracotta/90 text-white h-12 text-base">
                {sending ? 'Отправляем…' : 'Отправить запрос'}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <ScrollToTop />
    </div>
  );
};

export default Commercial;
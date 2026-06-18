import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Property {
  id: number;
  title: string;
  district: string;
  type: 'Новостройка' | 'Вторичка' | 'Коммерция';
  rooms: number;
  area: number;
  price: number;
  emoji: string;
}

const PROPERTIES: Property[] = [
  { id: 1, title: 'ЖК «Сосновый берег»', district: 'Приморский р-н', type: 'Новостройка', rooms: 2, area: 64, price: 8900000, emoji: '🌲' },
  { id: 2, title: 'Светлая студия у парка', district: 'Центральный р-н', type: 'Вторичка', rooms: 1, area: 32, price: 5400000, emoji: '🪴' },
  { id: 3, title: 'ЖК «Зелёные холмы»', district: 'Зелёный квартал', type: 'Новостройка', rooms: 3, area: 88, price: 12300000, emoji: '🏡' },
  { id: 4, title: 'Офис в бизнес-центре', district: 'Деловой район', type: 'Коммерция', rooms: 4, area: 120, price: 18500000, emoji: '🏢' },
  { id: 5, title: 'Семейная квартира', district: 'Тихий бульвар', type: 'Вторичка', rooms: 3, area: 76, price: 9700000, emoji: '🌿' },
  { id: 6, title: 'ЖК «Тёплый дом»', district: 'Солнечный р-н', type: 'Новостройка', rooms: 1, area: 41, price: 6200000, emoji: '☀️' },
  { id: 7, title: 'Торговое помещение', district: 'Центральный р-н', type: 'Коммерция', rooms: 2, area: 85, price: 14800000, emoji: '🛍️' },
  { id: 8, title: 'Квартира с террасой', district: 'Зелёный квартал', type: 'Новостройка', rooms: 2, area: 58, price: 7800000, emoji: '🌅' },
];

const TYPES = ['Все', 'Новостройка', 'Вторичка', 'Коммерция'] as const;
const ROOM_OPTIONS = ['Любые', '1', '2', '3+'] as const;

const formatPrice = (p: number) => `${(p / 1000000).toFixed(1)} млн ₽`;

const PropertyCatalog = ({ onRequest }: { onRequest: () => void }) => {
  const [typeFilter, setTypeFilter] = useState<string>('Все');
  const [roomFilter, setRoomFilter] = useState<string>('Любые');
  const [maxPrice, setMaxPrice] = useState<number>(20000000);

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (typeFilter !== 'Все' && p.type !== typeFilter) return false;
      if (roomFilter === '1' && p.rooms !== 1) return false;
      if (roomFilter === '2' && p.rooms !== 2) return false;
      if (roomFilter === '3+' && p.rooms < 3) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
  }, [typeFilter, roomFilter, maxPrice]);

  return (
    <section id="catalog" className="py-24 px-4 bg-background">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-terracotta font-medium tracking-widest uppercase text-sm">Каталог объектов</span>
          <h2 className="font-display text-5xl md:text-6xl font-semibold mt-3 mb-4">Найдите свой дом</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Подберите объекты по параметрам — а мы бесплатно покажем ещё больше под ваш запрос
          </p>
        </div>

        <div className="bg-card rounded-[2rem] p-6 md:p-8 shadow-sm border border-border mb-10">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-3 block">Тип недвижимости</label>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      typeFilter === t ? 'bg-terracotta text-white' : 'bg-muted text-foreground hover:bg-accent'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-3 block">Комнаты</label>
              <div className="flex flex-wrap gap-2">
                {ROOM_OPTIONS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRoomFilter(r)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      roomFilter === r ? 'bg-terracotta text-white' : 'bg-muted text-foreground hover:bg-accent'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-3 block">
                Цена до <span className="text-terracotta font-semibold">{formatPrice(maxPrice)}</span>
              </label>
              <input
                type="range"
                min={5000000}
                max={20000000}
                step={500000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full mt-4 accent-terracotta cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="group bg-card rounded-[2rem] overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="h-44 bg-gradient-to-br from-sage/40 to-sand flex items-center justify-center text-6xl">
                {p.emoji}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent text-accent-foreground">{p.type}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold leading-tight mb-1">{p.title}</h3>
                <p className="text-muted-foreground text-sm flex items-center gap-1 mb-4">
                  <Icon name="MapPin" size={14} /> {p.district}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Icon name="DoorOpen" size={15} /> {p.rooms} комн.</span>
                  <span className="flex items-center gap-1"><Icon name="Ruler" size={15} /> {p.area} м²</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-bold text-terracotta">{formatPrice(p.price)}</span>
                  <Button size="sm" variant="ghost" className="rounded-full text-terracotta hover:bg-accent" onClick={onRequest}>
                    Подробнее <Icon name="ArrowRight" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg text-muted-foreground mb-6">По этим параметрам ничего не нашлось — но мы подберём лично!</p>
            <Button onClick={onRequest} className="rounded-full bg-terracotta hover:bg-terracotta/90 text-white px-8">
              Оставить запрос на подбор
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyCatalog;

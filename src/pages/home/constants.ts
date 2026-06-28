export const SERVICES = [
  { icon: 'MessageSquare', title: 'Бесплатная консультация', text: 'Отвечаем на все вопросы по покупке, продаже и юридическим нюансам — без скрытых условий.' },
  { icon: 'Search',        title: 'Подбор объектов',         text: 'Жилая, коммерческая и загородная недвижимость по преимущественно низким ценам под ваши требования.' },
  { icon: 'Handshake',     title: 'Сопровождение сделки',    text: 'Покупка, продажа, переговоры и безопасная передача средств — контролируем каждый этап.' },
  { icon: 'FileCheck',     title: 'Юридическая экспертиза',  text: 'Проверим юридическую чистоту объекта, составим договор и соберём все необходимые документы.' },
];

export const CAPABILITIES = [
  { icon: 'MapPin',      text: 'Помощь в поиске недвижимости, подходящей под требования покупателя' },
  { icon: 'Users',       text: 'Посредничество в переговорах между сторонами сделки' },
  { icon: 'ShieldCheck', text: 'Проверка юридической чистоты помещений' },
  { icon: 'FileText',    text: 'Сбор и подготовка документов для заключения договора купли-продажи' },
  { icon: 'Banknote',    text: 'Помощь во взаимных расчётах — безопасная передача денег при сделке' },
];

export const DIRECTIONS = [
  { icon: 'Home',          title: 'Жилая недвижимость',       text: 'Квартиры в новостройках и на вторичном рынке — для себя или под инвестицию.' },
  { icon: 'Building2',     title: 'Коммерческая недвижимость', text: 'Офисные, торговые, индустриальные и социальные объекты для аренды или ведения бизнеса.' },
  { icon: 'Trees',         title: 'Загородная недвижимость',   text: 'Дома, коттеджи, особняки, усадьбы, резиденции, таунхаусы, дуплексы — подберём лучший вариант за городом.' },
  { icon: 'Hammer',        title: 'Ремонт под ключ',           text: 'Подберём проверенного подрядчика из числа наших партнёров, который реализует лучший дизайн эксклюзивно для вас.' },
];

export const STEPS = [
  { num: '01', title: 'Оставляете запрос',   text: 'Напишите нам или закажите обратный звонок — как удобно вам.' },
  { num: '02', title: 'Подбираем объекты',   text: 'Агент с многолетним опытом готовит варианты под вас.' },
  { num: '03', title: 'Получаете результат', text: 'Никуда не ехать. Готовая подборка и сопровождение — бесплатно.' },
];

export const GOLD   = 'hsl(43 58% 55%)';
export const GOLD20 = 'hsl(43 58% 55% / 0.2)';
export const GOLD40 = 'hsl(43 58% 55% / 0.4)';
export const NAVY   = 'hsl(222 25% 8%)';
export const NAVYC  = 'hsl(222 22% 11%)';
export const NAVYD  = 'hsl(222 30% 6%)';
export const MUTED  = 'hsl(220 10% 58%)';
export const FG     = 'hsl(45 20% 94%)';

export const SEND_LEAD_URL = 'https://functions.poehali.dev/0951d9ac-cb20-4a66-865c-901b256f6154';

export type FS = { name:string; phone:string; social:string; request:string; callback:boolean; sending:boolean; sent:boolean };
export const emptyForm = (): FS => ({ name:'', phone:'', social:'', request:'', callback:false, sending:false, sent:false });
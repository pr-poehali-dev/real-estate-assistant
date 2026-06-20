import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const ForClient = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container max-w-6xl flex items-center py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="rounded-full gap-2 text-muted-foreground hover:text-foreground"
          >
            <Icon name="ArrowLeft" size={18} />
            Назад
          </Button>
        </div>
      </header>

      <main className="flex-1 container max-w-3xl px-4 pt-36 pb-24">
        <h1 className="font-display text-4xl md:text-5xl font-semibold mb-10 leading-tight">
          Клиент — в центре внимания
        </h1>

        <div className="space-y-6 text-[17px] leading-relaxed text-foreground/80">
          <p>
            Важно понять, что рынок жилья существует в первую очередь для удовлетворения потребностей покупателей, а не для выгоды тех, кто участвует в процессе продажи. Это означает, что все решения, принимаемые в сфере недвижимости, должны быть ориентированы на конечного потребителя, на того, кто ищет дом или инвестирует в недвижимость.
          </p>
          <p>
            Главное назначение сферы недвижимости — ориентироваться на интересы частных лиц и семей, которые стремятся приобрести жилье. Именно для них создаются объекты, формируется инфраструктура, а профессионалы рынка, риелторы и застройщики, выступают в роли посредников и исполнителей. Их роль заключается в том, чтобы сделать процесс приобретения или продажи максимально удобным, прозрачным и выгодным именно для клиента.
          </p>
          <p>
            Таким образом, фокус внимания должен быть смещен с интересов продавцов или посредников на нужды и ожидания покупателей. Рынок недвижимости — это инструмент, созданный для решения жилищных вопросов людей, а не площадка для максимизации прибыли застройщиков или агентов. Успех в этой сфере определяется тем, насколько эффективно удается удовлетворить запросы тех, кто в конечном итоге становится владельцем недвижимого имущества.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ForClient;

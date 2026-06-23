const ForClient = () => {

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
        <div className="absolute top-20 -right-16 w-80 h-80 blob-shape animate-float-slow bg-[#a8c4a228]" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 blob-shape-2 animate-float-slow bg-[#b0604318]" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/4 w-60 h-60 blob-shape animate-float-slow bg-[#8faf8f1a]" style={{ animationDelay: '4s' }} />
      </div>

      <main className="flex-1 container max-w-3xl px-4 pt-28 md:pt-36 pb-16 md:pb-24 relative z-10">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-8 leading-tight">
          Клиент — в центре внимания
        </h1>

        <div className="space-y-6 text-[17px] leading-relaxed text-foreground/80">
          <p>
            Важно понять, что рынок жилья существует в первую очередь для удовлетворения потребностей покупателей, а не для выгоды тех, кто участвует в процессе продажи. Это означает, что все решения, принимаемые в сфере недвижимости, должны быть ориентированы на конечного потребителя, на того, кто ищет дом или инвестирует в недвижимость.
          </p>
          <p>Главное назначение сферы недвижимости — ориентироваться на интересы частных лиц и семей, которые стремятся приобрести жилье. Именно для них создаются объекты, формируется инфраструктура, а профессионалы рынка, агенты и застройщики, выступают в роли посредников и исполнителей. Их роль заключается в том, чтобы сделать процесс приобретения или продажи максимально удобным, прозрачным и выгодным именно для клиента.</p>
          <p>
            Таким образом, фокус внимания должен быть смещен с интересов продавцов или посредников на нужды и ожидания покупателей. Рынок недвижимости — это инструмент, созданный для решения жилищных вопросов людей, а не площадка для максимизации прибыли застройщиков или агентов. Успех в этой сфере определяется тем, насколько эффективно удается удовлетворить запросы тех, кто в конечном итоге становится владельцем недвижимого имущества.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ForClient;
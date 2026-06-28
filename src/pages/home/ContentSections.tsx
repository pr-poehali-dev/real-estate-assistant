import Icon from '@/components/ui/icon';
import SectionTitle from './SectionTitle';
import { SERVICES, DIRECTIONS, GOLD, GOLD20, GOLD40, NAVY, NAVYC, NAVYD, MUTED, FG } from './constants';

const ContentSections = () => (
  <>
    {/* ══════════════════════════════════
        SERVICES
    ══════════════════════════════════ */}
    <section id="services" style={{ padding:'clamp(56px,8vw,112px) clamp(20px,5vw,60px)', background:NAVY }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionTitle
          eyebrow="Что мы делаем"
          title={<>Услуги <em style={{ color:GOLD, fontStyle:'italic' }}>под ключ</em></>}
          sub="Полный цикл работы с недвижимостью — от первого звонка до регистрации права собственности."
        />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16 }}>
          {SERVICES.map((s, i) => (
            <div key={s.title} className="apex-card animate-fade-up" style={{ padding:'clamp(22px,3vw,36px)', textAlign:'center', animationDelay:`${i*80}ms` }}>
              <div style={{ width:52, height:52, border:`1px solid ${GOLD40}`, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 18px' }}>
                <Icon name={s.icon} size={22} style={{ color:GOLD }} />
              </div>
              <h3 className="font-display" style={{ fontSize:'clamp(16px,1.6vw,20px)', fontWeight:600, marginBottom:10, color:FG }}>{s.title}</h3>
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.8, color:MUTED }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════
        WHY US
    ══════════════════════════════════ */}
    <section id="why" style={{ padding:'clamp(56px,8vw,112px) clamp(20px,5vw,60px) 0', background:NAVYC }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionTitle
          eyebrow="Зачем мы нужны"
          title={<>Мы строим <em style={{ fontStyle:'italic', background:'linear-gradient(90deg, hsl(43 58% 45%), hsl(43 80% 70%), hsl(36 60% 50%))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>справедливый рынок</em> недвижимости, ориентированный на клиента — как покупателя, так и продавца</>}
        />

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }} className="why-grid">
          <div style={{ background:NAVYD, borderRadius:20, padding:'clamp(24px,3vw,40px)', border:`1px solid ${GOLD20}` }}>
            <div style={{ background:'hsl(220 40% 12%)', borderRadius:16, padding:'18px 22px', borderLeft:`3px solid hsl(210 60% 55%)`, marginBottom:20 }}>
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.85, color:MUTED, margin:0, borderLeft:`2px solid hsl(210 60% 55%)`, paddingLeft:14 }}>
                <strong style={{ color:FG, fontWeight:500 }}>Оптимизируйте процесс</strong> поиска и продажи ваших объектов недвижимости.
              </p>
            </div>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.28em', textTransform:'uppercase', color:MUTED, marginBottom:20 }}>Больше не нужно:</p>
            {[
              <><strong style={{ color:FG, fontWeight:500 }}>Самостоятельно исследовать</strong> рынок недвижимости, сопряженный с присущими ему рисками и противоречиями</>,
              <><strong style={{ color:FG, fontWeight:500 }}>Испытывать трудности</strong> в поиске действительно квалифицированного специалиста, чья надёжность требует тщательной проверки</>,
              <><strong style={{ color:FG, fontWeight:500 }}>Продираться</strong> сквозь навязчивую рекламу, поток скрытых комиссий и неоднозначные платные опции на сторонних платформах</>,
            ].map((text, i) => (
              <div key={i} style={{ display:'flex', gap:14, padding:'16px 0', borderBottom: i < 2 ? `1px solid ${GOLD20}` : 'none' }}>
                <div style={{ width:26, height:26, border:`1px solid ${GOLD20}`, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                  <Icon name="X" size={11} style={{ color:MUTED }} />
                </div>
                <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.75, color:MUTED }}>{text}</p>
              </div>
            ))}
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <div style={{ background:NAVYD, borderRadius:20, padding:'clamp(20px,2.5vw,32px)', border:`1px solid ${GOLD20}`, flex:1 }}>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.28em', textTransform:'uppercase', color:MUTED, marginBottom:14 }}>Вы можете:</p>
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.8, color:FG, marginBottom:20, borderLeft:`2px solid ${GOLD}`, paddingLeft:14 }}>
                Передать нам полный контроль над процессом и довериться нашим экспертам, пока вы располагаете свободным от этих обязательств временем, проводя его с пользой для себя.
              </p>
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.8, color:MUTED, marginBottom:20 }}>
                Мы сделаем всё строго так, как вы изначально задумали. Ваш опыт на рынке недвижимости — без стресса и компромиссов.
              </p>
              {[
                { icon:'ShieldCheck', label:'Надёжно',        text:'Прозрачные условия, тщательная проработка сделки и выявление всех потенциальных рисков.' },
                { icon:'Zap',         label:'Оперативно',      text:'Заявки клиентов рассматриваются в приоритетном порядке.' },
                { icon:'Award',       label:'Профессионально', text:'Подготовим договор и соберём полный комплект необходимых документов.' },
              ].map((item, i) => (
                <div key={item.label} style={{ display:'flex', gap:14, padding:'14px 0', borderBottom: i < 2 ? `1px solid ${GOLD20}` : 'none' }}>
                  <div style={{ width:36, height:36, border:`1px solid ${GOLD40}`, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon name={item.icon} size={15} style={{ color:GOLD }} />
                  </div>
                  <div>
                    <div style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.22em', textTransform:'uppercase', color:GOLD, marginBottom:3 }}>{item.label}</div>
                    <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:12.5, lineHeight:1.7, color:MUTED }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════
        DIRECTIONS
    ══════════════════════════════════ */}
    <section style={{ padding:'clamp(56px,8vw,112px) clamp(20px,5vw,60px)', background:NAVYC }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionTitle
          eyebrow="Направления"
          title={<>Четыре ключевых вектора работы — от жилья до <em style={{ fontStyle:'italic', background:'linear-gradient(90deg, hsl(43 58% 45%), hsl(43 80% 70%), hsl(36 60% 50%))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>инвестиционной коммерции</em> и <em style={{ fontStyle:'italic', background:'linear-gradient(90deg, hsl(43 58% 45%), hsl(43 80% 70%), hsl(36 60% 50%))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>ремонта</em>.</>}
          sub=""
        />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16 }}>
          {DIRECTIONS.map((d, i) => (
            <div key={d.title} className="apex-card animate-fade-up" style={{ padding:'clamp(22px,3vw,36px)', animationDelay:`${i*80}ms` }}>
              <div style={{ width:48, height:48, border:`1px solid ${GOLD40}`, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                <Icon name={d.icon} size={20} style={{ color:GOLD }} />
              </div>
              <h3 className="font-display" style={{ fontSize:'clamp(16px,1.6vw,20px)', fontWeight:600, marginBottom:10, color:FG }}>{d.title}</h3>
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.8, color:MUTED }}>{d.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══════════════════════════════════
        ABOUT
    ══════════════════════════════════ */}
    <section id="about" style={{ padding:'clamp(56px,8vw,112px) clamp(20px,5vw,60px)', background:NAVY }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <SectionTitle
          eyebrow="О нас"
          title={<>О компании{' '}
            <span style={{ display:'inline-flex', flexDirection:'column', lineHeight:1, verticalAlign:'middle', margin:'0 6px' }}>
              <span style={{ fontFamily:'Playfair Display, serif', fontSize:'0.85em', fontWeight:700, letterSpacing:'0.16em', color:FG, textTransform:'uppercase', fontStyle:'normal' }}>APEX</span>
              <span style={{ fontFamily:'Inter, sans-serif', fontSize:'0.28em', fontWeight:500, letterSpacing:'0.44em', textTransform:'uppercase', color:GOLD, marginTop:2, fontStyle:'normal' }}>SOLUTIONS</span>
            </span>
          </>}
        />

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, alignItems:'stretch' }} className="about-grid">

          <div style={{ background:NAVYC, padding:'clamp(28px,4vw,52px)', display:'flex', flexDirection:'column', gap:24, borderRadius:'24px 0 0 24px' }}>
            <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:14, lineHeight:1.9, color:MUTED }}>
              Мы — <strong style={{ color:FG, fontWeight:500 }}>динамично развивающаяся организация</strong>, работающая на рынке услуг по подбору недвижимости <strong style={{ color:GOLD, fontWeight:500 }}>с 2015 года</strong>. За это время мы успешно реализовали множество проектов разного масштаба и уровня сложности.
            </p>
            <div style={{ width:40, height:1, background:`linear-gradient(to right, ${GOLD}, transparent)` }} />
            <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:14, lineHeight:1.9, color:MUTED }}>
              Образование компании стало логическим продолжением успешного завершения <strong style={{ color:FG, fontWeight:500 }}>финансовых сделок группой специалистов</strong>, составивших основу нашей профессиональной деятельности.
            </p>
            <div style={{ width:40, height:1, background:`linear-gradient(to right, ${GOLD}, transparent)` }} />
            <div style={{ marginTop:8, background:`linear-gradient(135deg, ${GOLD20}, hsl(43 58% 55% / 0.05))`, borderRadius:16, padding:'22px 26px', borderLeft:`3px solid ${GOLD}` }}>
              <p className="font-display" style={{ fontSize:'clamp(14px,1.4vw,18px)', fontStyle:'italic', fontWeight:300, lineHeight:1.75, color:FG, margin:0 }}>
                «Apex Solutions — команда, поставившая своей целью решать все ваши вопросы, связанные с приобретением недвижимости. Мы готовы помочь принять верное решение и подобрать для Вас наилучшие условия.»
              </p>
            </div>

            <div style={{ background:'hsl(220 40% 12%)', borderRadius:16, padding:'22px 26px', borderLeft:`3px solid hsl(210 60% 55%)`, marginTop:4 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                <Icon name="Scale" size={14} style={{ color:'hsl(210 60% 65%)' }} />
                <span style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:600, letterSpacing:'0.28em', textTransform:'uppercase', color:'hsl(210 60% 65%)' }}>Наш принцип</span>
              </div>
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.85, color:MUTED, margin:0 }}>
                <strong style={{ color:FG, fontWeight:500 }}>Сделки с недвижимостью — это серьёзный и значимый шаг.</strong> Именно поэтому мы прилагаем все усилия, чтобы сделать данную процедуру максимально <strong style={{ color:'hsl(210 60% 70%)', fontWeight:500 }}>ясной и доступной</strong> для понимания.
              </p>
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13, lineHeight:1.85, color:MUTED, margin:'10px 0 0' }}>
                Мы верим, что <strong style={{ color:FG, fontWeight:500 }}>информированность — ключ к успеху</strong>, и всегда готовы поделиться своими знаниями, чтобы вы чувствовали себя уверенно на каждом шагу.
              </p>
            </div>
          </div>

          <div style={{ border:`1px solid ${GOLD20}`, borderRadius:'0 24px 24px 0', padding:'clamp(28px,4vw,52px)', display:'flex', flexDirection:'column', gap:24 }}>

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                <Icon name="Users" size={14} style={{ color:GOLD }} />
                <span style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:600, letterSpacing:'0.28em', textTransform:'uppercase', color:GOLD }}>Наша команда</span>
              </div>
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13.5, lineHeight:1.85, color:MUTED }}>
                <strong style={{ color:FG, fontWeight:500 }}>Опытные профессионалы</strong>, увлечённые своим делом. Мы глубоко разбираемся <strong style={{ color:FG, fontWeight:500 }}>в рынке недвижимости</strong> и постоянно отслеживаем его тенденции, чтобы вы всегда получали самую свежую и достоверную информацию.
              </p>
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13.5, lineHeight:1.85, color:MUTED, marginTop:0 }}>
                Наша цель — не просто подобрать объект, а помочь сделать <strong style={{ color:FG, fontWeight:500 }}>осознанный выбор</strong> с <strong style={{ color:FG, fontWeight:500 }}>индивидуальным подходом</strong> к каждому клиенту, учитывая все ваши пожелания и возможности.
              </p>
              <div style={{ display:'flex', flexWrap:'nowrap', gap:8, marginTop:4, overflowX:'auto' }}>
                {['Индивидуальный подход', 'Свежая аналитика', 'Осознанный выбор'].map(b => (
                  <span key={b} style={{ fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:400, padding:'4px 12px', borderRadius:20, border:`1px solid ${GOLD40}`, color:GOLD, whiteSpace:'nowrap' }}>{b}</span>
                ))}
              </div>
            </div>

            <div style={{ width:'100%', height:1, background:`linear-gradient(to right, transparent, ${GOLD20}, transparent)` }} />

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                <Icon name="Landmark" size={14} style={{ color:GOLD }} />
                <span style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:600, letterSpacing:'0.28em', textTransform:'uppercase', color:GOLD }}>Финансовые решения</span>
              </div>
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13.5, lineHeight:1.85, color:MUTED }}>
                <strong style={{ color:FG, fontWeight:500 }}>Ипотека</strong> на первичное или вторичное жильё, <strong style={{ color:FG, fontWeight:500 }}>рассрочка</strong>, <strong style={{ color:FG, fontWeight:500 }}>рефинансирование</strong>, или финансовая поддержка для вашего бизнеса — наши эксперты помогут подобрать оптимальные условия.
              </p>
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13.5, lineHeight:1.85, color:MUTED, marginTop:0 }}>
                Мы сотрудничаем с <strong style={{ color:FG, fontWeight:500 }}>ведущими банками</strong> и финансовыми учреждениями, чтобы предложить вам самые <strong style={{ color:FG, fontWeight:500 }}>выгодные ставки</strong> и удобные схемы оплаты.
              </p>
              <div style={{ display:'flex', flexWrap:'nowrap', gap:8, marginTop:4, overflowX:'auto' }}>
                {['Ипотека', 'Рассрочка', 'Рефинансирование', 'Бизнес-кредит'].map(b => (
                  <span key={b} style={{ fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:400, padding:'4px 12px', borderRadius:20, border:`1px solid ${GOLD40}`, color:GOLD, whiteSpace:'nowrap' }}>{b}</span>
                ))}
              </div>
            </div>

            <div style={{ width:'100%', height:1, background:`linear-gradient(to right, transparent, ${GOLD20}, transparent)` }} />

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                <Icon name="LayoutDashboard" size={14} style={{ color:GOLD }} />
                <span style={{ fontFamily:'Inter,sans-serif', fontSize:9, fontWeight:600, letterSpacing:'0.28em', textTransform:'uppercase', color:GOLD }}>Комплексный сервис</span>
              </div>
              <p style={{ fontFamily:'Inter,sans-serif', fontWeight:300, fontSize:13.5, lineHeight:1.85, color:MUTED }}>
                <strong style={{ color:FG, fontWeight:500 }}>Инструмент, созданный для вашего удобства.</strong> Мы стремимся к тому, чтобы вы могли найти <strong style={{ color:FG, fontWeight:500 }}>всё необходимое в одном месте</strong>, экономя своё время и силы, чтобы предоставить вам <strong style={{ color:FG, fontWeight:500 }}>лучший опыт</strong> взаимодействия с миром недвижимости.
              </p>
              <div style={{ display:'flex', flexWrap:'nowrap', gap:8, marginTop:4, overflowX:'auto' }}>
                {['Всё в одном месте', 'Экономия времени', 'Лучший опыт'].map(b => (
                  <span key={b} style={{ fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:400, padding:'4px 12px', borderRadius:20, border:`1px solid ${GOLD40}`, color:GOLD, whiteSpace:'nowrap' }}>{b}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </>
);

export default ContentSections;
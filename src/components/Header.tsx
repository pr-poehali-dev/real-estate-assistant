import { useNavigate, useLocation, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const GOLD   = 'hsl(43 58% 55%)';
const GOLD20 = 'hsl(43 58% 55% / 0.2)';
const GOLD40 = 'hsl(43 58% 55% / 0.4)';
const FG     = 'hsl(45 20% 94%)';
const MUTED  = 'hsl(220 10% 58%)';

const navLink: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: MUTED,
  padding: '0 14px',
  textDecoration: 'none',
  transition: 'color 0.25s',
  display: 'inline-flex',
  alignItems: 'center',
  height: '100%',
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
      background: 'hsl(222 28% 7% / 0.94)',
      backdropFilter: 'blur(18px)',
      borderBottom: `1px solid ${GOLD20}`,
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 clamp(20px,4vw,56px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 68,
      }}>

        {/* Логотип */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}
          translate="no"
        >
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }} translate="no">
            <span translate="no" style={{ fontFamily: 'Playfair Display, serif', fontSize: 21, fontWeight: 700, letterSpacing: '0.16em', color: FG, textTransform: 'uppercase' }}>APEX</span>
            <span translate="no" style={{ fontFamily: 'Inter, sans-serif', fontSize: 7, fontWeight: 500, letterSpacing: '0.44em', textTransform: 'uppercase', color: GOLD, marginTop: 1 }}>SOLUTIONS</span>
          </div>
          <div style={{ width: 1, height: 30, background: `linear-gradient(to bottom, transparent, ${GOLD40}, transparent)`, margin: '0 4px' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: '0.18em', color: `${MUTED}88`, textTransform: 'uppercase', lineHeight: 1.5 }}>
            Недвижимость<br />Москва и МО
          </span>
        </Link>

        {/* Навигация */}
        <nav style={{ display: 'flex', alignItems: 'center', height: 68 }}>
          {isHome && (
            <>
              {[
                { href: '#services', label: 'Услуги' },
                { href: '#about',    label: 'О нас' },
                { href: '#contacts', label: 'Контакты' },
              ].map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  style={navLink}
                  onMouseEnter={e => (e.currentTarget.style.color = FG)}
                  onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
                >{l.label}</a>
              ))}
              <Link
                to="/commercial"
                style={{ ...navLink, color: GOLD }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >Коммерция</Link>
            </>
          )}
        </nav>

        {/* Правый блок: на главной — «Клиентам», на внутренних — «Назад» + «Клиентам» рядом */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {!isHome && (
            <button
              onClick={() => navigate('/')}
              style={{ ...navLink, background: 'none', border: `1px solid ${GOLD20}`, borderRadius: 100, cursor: 'pointer', gap: 7, color: MUTED, padding: '8px 18px' }}
            >
              <Icon name="ArrowLeft" size={13} /> Назад
            </button>
          )}
          {location.pathname !== '/for-client' && (
            <Link
              to="/for-client"
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: GOLD, textDecoration: 'none',
                padding: '8px 18px',
                border: `1px solid ${GOLD40}`, borderRadius: 100,
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = GOLD; el.style.color = 'hsl(222 25% 8%)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = GOLD; }}
            >Клиентам</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
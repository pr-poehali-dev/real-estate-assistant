import { useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

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
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}
          translate="no"
        >
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }} translate="no">
            <span translate="no" style={{ fontFamily: 'Playfair Display, serif', fontSize: 21, fontWeight: 700, letterSpacing: '0.16em', color: FG, textTransform: 'uppercase' }}>APEX</span>
            <span translate="no" style={{ fontFamily: 'Inter, sans-serif', fontSize: 7, fontWeight: 500, letterSpacing: '0.44em', textTransform: 'uppercase', color: GOLD, marginTop: 1 }}>SOLUTIONS</span>
          </div>
          <div style={{ width: 1, height: 30, background: `linear-gradient(to bottom, transparent, ${GOLD40}, transparent)`, margin: '0 4px' }} />
          <span className="header-location-text" style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, letterSpacing: '0.18em', color: `${MUTED}88`, textTransform: 'uppercase', lineHeight: 1.5 }}>
            Недвижимость<br />Москва и МО
          </span>
        </Link>

        {/* Десктоп навигация */}
        <nav className="header-nav-desktop" style={{ display: 'flex', alignItems: 'center', height: 68 }}>
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

        {/* Десктоп правый блок */}
        <div className="header-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {!isHome && (
            <button
              onClick={() => navigate('/')}
              style={{ ...navLink, background: 'none', border: 'none', borderRadius: 100, cursor: 'pointer', gap: 7, color: MUTED, padding: '8px 18px' }}
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
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'hsl(43 58% 55% / 0.15)'; el.style.color = 'hsl(43 75% 70%)'; el.style.borderColor = 'hsl(43 58% 55% / 0.6)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = GOLD; el.style.borderColor = GOLD40; }}
            >Клиентам</Link>
          )}
        </div>

        {/* Мобильная кнопка бургера */}
        <button
          className="header-burger"
          onClick={() => setMenuOpen(v => !v)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: GOLD,
            flexShrink: 0,
          }}
          aria-label="Меню"
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
        </button>
      </div>

      {/* Мобильное выпадающее меню */}
      {menuOpen && (
        <div className="header-mobile-menu" style={{
          background: 'hsl(222 28% 7% / 0.98)',
          backdropFilter: 'blur(18px)',
          borderTop: `1px solid ${GOLD20}`,
          padding: '20px 24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
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
                  onClick={closeMenu}
                  style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
                    letterSpacing: '0.28em', textTransform: 'uppercase',
                    color: MUTED, textDecoration: 'none',
                    padding: '14px 0',
                    borderBottom: `1px solid ${GOLD20}`,
                    display: 'block',
                  }}
                >{l.label}</a>
              ))}
              <Link
                to="/commercial"
                onClick={closeMenu}
                style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
                  letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: GOLD, textDecoration: 'none',
                  padding: '14px 0',
                  borderBottom: `1px solid ${GOLD20}`,
                  display: 'block',
                }}
              >Коммерция</Link>
            </>
          )}

          {!isHome && (
            <button
              onClick={() => { navigate('/'); closeMenu(); }}
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: MUTED, background: 'none', border: 'none',
                padding: '14px 0', cursor: 'pointer', textAlign: 'left',
                borderBottom: `1px solid ${GOLD20}`,
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <Icon name="ArrowLeft" size={13} /> Назад
            </button>
          )}

          {location.pathname !== '/for-client' && (
            <Link
              to="/for-client"
              onClick={closeMenu}
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: GOLD, textDecoration: 'none',
                padding: '14px 0',
                display: 'block',
              }}
            >Клиентам</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
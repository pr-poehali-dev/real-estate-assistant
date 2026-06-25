import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const GOLD   = 'hsl(43 58% 55%)';
const GOLD20 = 'hsl(43 58% 55% / 0.2)';
const GOLD40 = 'hsl(43 58% 55% / 0.4)';
const FG     = 'hsl(45 20% 94%)';
const MUTED  = 'hsl(220 10% 58%)';

const navStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: MUTED,
  padding: '8px 14px',
  textDecoration: 'none',
  transition: 'color 0.25s',
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
      background: 'hsl(222 28% 7% / 0.92)',
      backdropFilter: 'blur(18px)',
      borderBottom: `1px solid ${GOLD20}`,
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(20px,4vw,56px)', display:'flex', alignItems:'center', justifyContent:'space-between', height:68 }}>

        {/* Logo */}
        <Link to="/" onClick={() => { window.scrollTo({ top:0, behavior:'smooth' }); closeMenu(); }}
          style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none' }}>
          <div style={{ display:'flex', flexDirection:'column', lineHeight:1 }}>
            <span style={{ fontFamily:'Playfair Display, serif', fontSize:21, fontWeight:700, letterSpacing:'0.16em', color:FG, textTransform:'uppercase' }}>APEX</span>
            <span style={{ fontFamily:'Inter, sans-serif', fontSize:7, fontWeight:500, letterSpacing:'0.44em', textTransform:'uppercase', color:GOLD, marginTop:1 }}>SOLUTIONS</span>
          </div>
          <div className="hidden md:block" style={{ width:1, height:30, background:`linear-gradient(to bottom, transparent, ${GOLD40}, transparent)`, margin:'0 4px' }} />
          <span className="hidden md:block" style={{ fontFamily:'Inter, sans-serif', fontSize:8, letterSpacing:'0.18em', color:`${MUTED}88`, textTransform:'uppercase', lineHeight:1.5 }}>
            Недвижимость<br/>Москва и МО
          </span>
        </Link>

        {/* Desktop nav */}
        {isHome ? (
          <>
            <nav className="hidden md:flex" style={{ alignItems:'center' }}>
              {[
                { href:'#services', label:'Услуги' },
                { href:'#about',    label:'О нас' },
                { href:'#contacts', label:'Контакты' },
              ].map(l => (
                <a key={l.href} href={l.href} style={navStyle}
                  onMouseEnter={e => (e.currentTarget.style.color = FG)}
                  onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
                >{l.label}</a>
              ))}
              <Link to="/commercial" style={{ ...navStyle, color:GOLD }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >Коммерция</Link>
            </nav>
            <Link to="/for-client"
              className="hidden md:inline-flex"
              style={{ fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.28em', textTransform:'uppercase',
                color:GOLD, textDecoration:'none', padding:'8px 18px',
                border:`1px solid ${GOLD40}`, borderRadius:100, transition:'all 0.3s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background=GOLD; el.style.color='hsl(222 25% 8%)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='transparent'; el.style.color=GOLD; }}
            >Клиентам</Link>
          </>
        ) : (
          <div className="hidden md:flex" style={{ alignItems:'center', gap:6 }}>
            <button onClick={() => navigate('/')}
              style={{ ...navStyle, background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:7 }}>
              <Icon name="ArrowLeft" size={13} /> Назад
            </button>
            {location.pathname !== '/commercial' && (
              <Link to="/commercial" style={{ ...navStyle, color:GOLD }}>Коммерция</Link>
            )}
            {location.pathname !== '/for-client' && (
              <Link to="/for-client" style={{ ...navStyle, color:GOLD, border:`1px solid ${GOLD40}`, borderRadius:100, padding:'8px 18px' }}>Клиентам</Link>
            )}
          </div>
        )}

        {/* Burger */}
        <button className="md:hidden"
          onClick={() => setMenuOpen(v => !v)} aria-label="Меню"
          style={{ display:'flex', alignItems:'center', justifyContent:'center', width:40, height:40,
            background:'none', border:`1px solid ${GOLD20}`, borderRadius:10, color:MUTED, cursor:'pointer' }}>
          <Icon name={menuOpen ? 'X' : 'Menu'} size={17} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden" style={{ background:'hsl(222 28% 7% / 0.98)', backdropFilter:'blur(18px)', borderBottom:`1px solid ${GOLD20}`, padding:'6px clamp(20px,4vw,40px) 18px' }}>
          {isHome ? (
            <>
              {[
                { href:'#services', label:'Услуги' },
                { href:'#about',    label:'О нас' },
                { href:'#contacts', label:'Контакты' },
              ].map(l => (
                <a key={l.href} href={l.href} onClick={closeMenu}
                  style={{ display:'block', padding:'13px 0', borderBottom:`1px solid ${GOLD20}`,
                    fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.28em',
                    textTransform:'uppercase', color:MUTED, textDecoration:'none' }}>{l.label}</a>
              ))}
              <Link to="/commercial" onClick={closeMenu}
                style={{ display:'block', padding:'13px 0', borderBottom:`1px solid ${GOLD20}`,
                  fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.28em',
                  textTransform:'uppercase', color:GOLD, textDecoration:'none' }}>Коммерция</Link>
              <Link to="/for-client" onClick={closeMenu}
                style={{ display:'block', marginTop:14, padding:'11px 0', textAlign:'center',
                  border:`1px solid ${GOLD40}`, borderRadius:100,
                  fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.28em',
                  textTransform:'uppercase', color:GOLD, textDecoration:'none' }}>Клиентам</Link>
            </>
          ) : (
            <>
              <button onClick={() => { navigate('/'); closeMenu(); }}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'13px 0', width:'100%',
                  background:'none', border:'none', borderBottom:`1px solid ${GOLD20}`,
                  fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.28em',
                  textTransform:'uppercase', color:MUTED, cursor:'pointer' }}>
                <Icon name="ArrowLeft" size={13} /> На главную
              </button>
              {location.pathname !== '/commercial' && (
                <Link to="/commercial" onClick={closeMenu}
                  style={{ display:'block', padding:'13px 0', borderBottom:`1px solid ${GOLD20}`,
                    fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.28em',
                    textTransform:'uppercase', color:GOLD, textDecoration:'none' }}>Коммерция</Link>
              )}
              {location.pathname !== '/for-client' && (
                <Link to="/for-client" onClick={closeMenu}
                  style={{ display:'block', marginTop:14, padding:'11px 0', textAlign:'center',
                    border:`1px solid ${GOLD40}`, borderRadius:100,
                    fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:500, letterSpacing:'0.28em',
                    textTransform:'uppercase', color:GOLD, textDecoration:'none' }}>Клиентам</Link>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

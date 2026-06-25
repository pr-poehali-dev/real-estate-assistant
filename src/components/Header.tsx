import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const GOLD   = '#C9A84C';
const GOLD20 = 'rgba(201,168,76,0.20)';
const GOLD40 = 'rgba(201,168,76,0.40)';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const navLink: React.CSSProperties = {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 9,
    fontWeight: 500,
    letterSpacing: '0.3em',
    textTransform: 'uppercase' as const,
    color: 'rgba(229,221,208,0.55)',
    padding: '8px 16px',
    textDecoration: 'none',
    transition: 'color 0.3s',
  };

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
      background: 'rgba(13,13,13,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${GOLD20}`,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,60px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

        {/* Logo */}
        <Link
          to="/"
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}
          style={{ display:'flex', alignItems:'center', gap:14, textDecoration:'none' }}
        >
          <div style={{ display:'flex', flexDirection:'column', lineHeight:1 }}>
            <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:22, fontWeight:600, letterSpacing:'0.18em', color:'#E5DDD0', textTransform:'uppercase' }}>APEX</span>
            <span style={{ fontFamily:'Montserrat, sans-serif', fontSize:7, fontWeight:500, letterSpacing:'0.45em', textTransform:'uppercase', color:GOLD, marginTop:2 }}>SOLUTIONS</span>
          </div>
          <div style={{ width:1, height:32, background:`linear-gradient(to bottom, transparent, ${GOLD40}, transparent)`, margin:'0 4px' }} className="hidden md:block" />
          <span style={{ fontFamily:'Montserrat, sans-serif', fontSize:8, letterSpacing:'0.2em', color:'rgba(229,221,208,0.35)', textTransform:'uppercase', lineHeight:1.5, display:'none' }} className="hidden md:block">
            Недвижимость<br/>Москва и МО
          </span>
        </Link>

        {/* Desktop nav */}
        {isHome ? (
          <>
            <nav style={{ display:'flex', alignItems:'center', gap:0 }} className="hidden md:flex">
              {[
                { href:'#services', label:'Услуги' },
                { href:'#about',    label:'О нас' },
                { href:'#contacts', label:'Контакты' },
              ].map(l => (
                <a key={l.href} href={l.href} style={navLink}
                  onMouseEnter={e => (e.currentTarget.style.color = '#E5DDD0')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(229,221,208,0.55)')}
                >{l.label}</a>
              ))}
              <Link to="/commercial" style={{ ...navLink, color: GOLD }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >Коммерция</Link>
            </nav>
            <Link
              to="/for-client"
              style={{
                fontFamily:'Montserrat, sans-serif', fontSize:9, fontWeight:500,
                letterSpacing:'0.3em', textTransform:'uppercase',
                color:GOLD, textDecoration:'none',
                padding:'9px 20px', border:`1px solid ${GOLD40}`,
                transition:'all 0.3s',
              }}
              className="hidden md:inline-flex"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.color = '#0d0d0d'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = GOLD; }}
            >Клиентам</Link>
          </>
        ) : (
          <div style={{ display:'flex', alignItems:'center', gap:8 }} className="hidden md:flex">
            <button onClick={() => navigate('/')} style={{ ...navLink, background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>
              <Icon name="ArrowLeft" size={13} /> Назад
            </button>
            {location.pathname !== '/commercial' && (
              <Link to="/commercial" style={{ ...navLink, color:GOLD }}>Коммерция</Link>
            )}
            {location.pathname !== '/for-client' && (
              <Link to="/for-client" style={{ ...navLink, border:`1px solid ${GOLD40}`, color:GOLD }}>Клиентам</Link>
            )}
          </div>
        )}

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Меню"
          style={{ display:'flex', alignItems:'center', justifyContent:'center', width:40, height:40, background:'none', border:`1px solid ${GOLD20}`, color:'rgba(229,221,208,0.7)', cursor:'pointer' }}
          className="md:hidden"
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} size={16} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ background:'rgba(13,13,13,0.98)', backdropFilter:'blur(16px)', borderBottom:`1px solid ${GOLD20}`, padding:'8px clamp(20px,4vw,40px) 20px' }} className="md:hidden">
          {isHome ? (
            <>
              {[
                { href:'#services', label:'Услуги' },
                { href:'#about',    label:'О нас' },
                { href:'#contacts', label:'Контакты' },
              ].map(l => (
                <a key={l.href} href={l.href} onClick={closeMenu}
                  style={{ display:'block', padding:'14px 0', borderBottom:`1px solid ${GOLD20}`, fontFamily:'Montserrat, sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(229,221,208,0.6)', textDecoration:'none' }}
                >{l.label}</a>
              ))}
              <Link to="/commercial" onClick={closeMenu}
                style={{ display:'block', padding:'14px 0', borderBottom:`1px solid ${GOLD20}`, fontFamily:'Montserrat, sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:GOLD, textDecoration:'none' }}
              >Коммерция</Link>
              <Link to="/for-client" onClick={closeMenu}
                style={{ display:'block', marginTop:16, padding:'12px 0', textAlign:'center', border:`1px solid ${GOLD40}`, fontFamily:'Montserrat, sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:GOLD, textDecoration:'none' }}
              >Клиентам</Link>
            </>
          ) : (
            <>
              <button onClick={() => { navigate('/'); closeMenu(); }}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'14px 0', width:'100%', background:'none', border:'none', borderBottom:`1px solid ${GOLD20}`, fontFamily:'Montserrat, sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(229,221,208,0.6)', cursor:'pointer' }}
              ><Icon name="ArrowLeft" size={13} /> На главную</button>
              {location.pathname !== '/commercial' && (
                <Link to="/commercial" onClick={closeMenu}
                  style={{ display:'block', padding:'14px 0', borderBottom:`1px solid ${GOLD20}`, fontFamily:'Montserrat, sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:GOLD, textDecoration:'none' }}
                >Коммерция</Link>
              )}
              {location.pathname !== '/for-client' && (
                <Link to="/for-client" onClick={closeMenu}
                  style={{ display:'block', marginTop:16, padding:'12px 0', textAlign:'center', border:`1px solid ${GOLD40}`, fontFamily:'Montserrat, sans-serif', fontSize:9, fontWeight:500, letterSpacing:'0.3em', textTransform:'uppercase', color:GOLD, textDecoration:'none' }}
                >Клиентам</Link>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
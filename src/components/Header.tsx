import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container max-w-6xl flex items-center justify-between py-4 px-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}
        >
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl md:text-2xl font-bold tracking-[0.14em] text-foreground uppercase">APEX</span>
            <span className="text-[8px] md:text-[9px] font-medium tracking-[0.32em] uppercase" style={{ color: 'hsl(42 52% 55%)' }}>Solutions</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-border/50 ml-1" />
          <span className="hidden md:block text-[9px] tracking-[0.18em] text-muted-foreground uppercase font-light max-w-[110px] leading-tight">Недвижимость<br/>Москва и МО</span>
        </Link>

        {/* Desktop nav */}
        {isHome ? (
          <>
            <nav className="hidden md:flex items-center gap-0 text-[10px] tracking-[0.2em] uppercase font-medium">
              <a href="#services" className="px-5 py-2 text-muted-foreground hover:text-foreground transition-colors border-r border-border/40">Услуги</a>
              <a href="#about"    className="px-5 py-2 text-muted-foreground hover:text-foreground transition-colors border-r border-border/40">О нас</a>
              <a href="#contacts" className="px-5 py-2 text-muted-foreground hover:text-foreground transition-colors border-r border-border/40">Контакты</a>
              <Link to="/commercial" className="px-5 py-2 transition-colors border-r border-border/40" style={{ color: 'hsl(42 52% 55%)' }}>Коммерция</Link>
            </nav>
            <Link
              to="/for-client"
              className="hidden md:inline-flex items-center px-5 py-2 border text-[10px] tracking-[0.2em] uppercase font-medium transition-all"
              style={{ borderColor: 'hsl(42 52% 55% / 0.4)', color: 'hsl(42 52% 55%)' }}
            >
              Клиентам
            </Link>
          </>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="gap-2 text-muted-foreground hover:text-foreground text-[10px] tracking-[0.2em] uppercase rounded-none"
            >
              <Icon name="ArrowLeft" size={14} /> Назад
            </Button>
            <nav className="flex items-center text-[10px] tracking-[0.2em] uppercase font-medium">
              {location.pathname !== '/commercial' && (
                <Link to="/commercial" className="px-5 py-2 transition-colors border-l border-border/40" style={{ color: 'hsl(42 52% 55%)' }}>Коммерция</Link>
              )}
              {location.pathname !== '/for-client' && (
                <Link to="/for-client" className="px-5 py-2 border border-border/40 ml-2 text-muted-foreground hover:text-foreground transition-colors">Клиентам</Link>
              )}
            </nav>
          </div>
        )}

        {/* Mobile burger */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Меню"
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} size={17} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border/50 px-4 pb-4 pt-1 flex flex-col">
          {isHome ? (
            <>
              <a href="#services" onClick={closeMenu} className="px-3 py-3 border-b border-border/30 text-muted-foreground hover:text-foreground text-[10px] tracking-[0.25em] uppercase font-medium">Услуги</a>
              <a href="#about"    onClick={closeMenu} className="px-3 py-3 border-b border-border/30 text-muted-foreground hover:text-foreground text-[10px] tracking-[0.25em] uppercase font-medium">О нас</a>
              <a href="#contacts" onClick={closeMenu} className="px-3 py-3 border-b border-border/30 text-muted-foreground hover:text-foreground text-[10px] tracking-[0.25em] uppercase font-medium">Контакты</a>
              <Link to="/commercial" onClick={closeMenu} className="px-3 py-3 border-b border-border/30 text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: 'hsl(42 52% 55%)' }}>Коммерция</Link>
              <Link to="/for-client" onClick={closeMenu} className="px-3 py-3 mt-2 border text-[10px] tracking-[0.25em] uppercase font-medium text-center" style={{ borderColor: 'hsl(42 52% 55% / 0.4)', color: 'hsl(42 52% 55%)' }}>Клиентам</Link>
            </>
          ) : (
            <>
              <button onClick={() => { navigate('/'); closeMenu(); }} className="px-3 py-3 border-b border-border/30 text-muted-foreground hover:text-foreground text-[10px] tracking-[0.25em] uppercase font-medium flex items-center gap-2">
                <Icon name="ArrowLeft" size={13} /> На главную
              </button>
              {location.pathname !== '/commercial' && (
                <Link to="/commercial" onClick={closeMenu} className="px-3 py-3 border-b border-border/30 text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: 'hsl(42 52% 55%)' }}>Коммерция</Link>
              )}
              {location.pathname !== '/for-client' && (
                <Link to="/for-client" onClick={closeMenu} className="px-3 py-3 mt-2 border text-[10px] tracking-[0.25em] uppercase font-medium text-center text-muted-foreground border-border/40">Клиентам</Link>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

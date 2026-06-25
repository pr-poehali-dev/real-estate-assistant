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
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/90 border-b border-border/60">
      <div className="container max-w-6xl flex items-center justify-between py-3.5 px-4">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}
        >
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl md:text-2xl font-700 tracking-[0.12em] text-foreground uppercase">APEX</span>
            <span className="text-[8px] md:text-[9px] font-medium tracking-[0.3em] text-terracotta uppercase">Solutions</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-border/60 ml-1" />
          <span className="hidden md:block text-[10px] tracking-[0.15em] text-muted-foreground uppercase font-light max-w-[120px] leading-tight">Недвижимость<br/>Москва и МО</span>
        </Link>

        {/* Desktop nav */}
        {isHome ? (
          <>
            <nav className="hidden md:flex items-center gap-1 text-xs font-medium tracking-widest uppercase">
              <a href="#services" className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">Услуги</a>
              <a href="#about" className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">О нас</a>
              <a href="#contacts" className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">Контакты</a>
              <Link to="/commercial" className="px-4 py-2 text-terracotta hover:text-terracotta/80 transition-colors">Коммерция</Link>
            </nav>
            <Link
              to="/for-client"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-terracotta/40 text-terracotta hover:bg-terracotta hover:text-background transition-all text-xs tracking-widest uppercase font-medium"
            >
              Клиентам
            </Link>
          </>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="gap-2 text-muted-foreground hover:text-foreground text-xs tracking-widest uppercase"
            >
              <Icon name="ArrowLeft" size={16} />
              Назад
            </Button>
            <nav className="flex items-center gap-1 text-xs font-medium tracking-widest uppercase">
              {location.pathname !== '/commercial' && (
                <Link to="/commercial" className="px-4 py-2 text-terracotta hover:text-terracotta/80 transition-colors">Коммерция</Link>
              )}
              {location.pathname !== '/for-client' && (
                <Link to="/for-client" className="px-4 py-2 border border-terracotta/40 text-terracotta hover:bg-terracotta hover:text-background transition-all">Клиентам</Link>
              )}
            </nav>
          </div>
        )}

        {/* Mobile burger */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 border border-border/60 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Меню"
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} size={18} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border/60 px-4 pb-4 pt-2 flex flex-col gap-1">
          {isHome ? (
            <>
              <a href="#services" onClick={closeMenu} className="px-3 py-3 text-muted-foreground hover:text-foreground text-xs tracking-widest uppercase font-medium border-b border-border/30">Услуги</a>
              <a href="#about" onClick={closeMenu} className="px-3 py-3 text-muted-foreground hover:text-foreground text-xs tracking-widest uppercase font-medium border-b border-border/30">О нас</a>
              <a href="#contacts" onClick={closeMenu} className="px-3 py-3 text-muted-foreground hover:text-foreground text-xs tracking-widest uppercase font-medium border-b border-border/30">Контакты</a>
              <Link to="/commercial" onClick={closeMenu} className="px-3 py-3 text-terracotta text-xs tracking-widest uppercase font-medium border-b border-border/30">Коммерция</Link>
              <Link to="/for-client" onClick={closeMenu} className="px-3 py-3 mt-1 border border-terracotta/40 text-terracotta text-xs tracking-widest uppercase font-medium text-center">Клиентам</Link>
            </>
          ) : (
            <>
              <button onClick={() => { navigate('/'); closeMenu(); }} className="px-3 py-3 text-muted-foreground hover:text-foreground text-xs tracking-widest uppercase font-medium flex items-center gap-2 border-b border-border/30">
                <Icon name="ArrowLeft" size={14} /> На главную
              </button>
              {location.pathname !== '/commercial' && (
                <Link to="/commercial" onClick={closeMenu} className="px-3 py-3 text-terracotta text-xs tracking-widest uppercase font-medium border-b border-border/30">Коммерция</Link>
              )}
              {location.pathname !== '/for-client' && (
                <Link to="/for-client" onClick={closeMenu} className="px-3 py-3 mt-1 border border-terracotta/40 text-terracotta text-xs tracking-widest uppercase font-medium text-center">Клиентам</Link>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

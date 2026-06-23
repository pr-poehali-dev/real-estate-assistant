import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const LOGO =
  'https://cdn.poehali.dev/projects/ab7a83ba-e182-427f-8219-a315e20c4c4a/bucket/cc8e3160-0678-4355-aa0f-d5623566165f.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="container max-w-6xl flex items-center justify-between py-3 px-4">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}
        >
          <img src={LOGO} alt="Дом Мечты" className="h-10 md:h-14 w-auto" />
        </Link>

        {/* Desktop nav */}
        {isHome ? (
          <>
            <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
              <a href="#services" className="px-4 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/70 transition-colors">Услуги</a>
              <a href="#about" className="px-4 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/70 transition-colors">О нас</a>
              <a href="#contacts" className="px-4 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/70 transition-colors">Контакты</a>
              <Link to="/commercial" className="px-4 py-2 rounded-full bg-terracotta/15 text-terracotta hover:bg-terracotta/25 transition-colors font-semibold">Коммерция</Link>
            </nav>
            <Link to="/for-client" className="hidden md:inline-flex px-4 py-2 rounded-full bg-muted hover:bg-muted/70 transition-colors text-sm font-medium text-[#565166]">Клиентам</Link>
          </>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="rounded-full gap-2 text-muted-foreground hover:text-foreground"
            >
              <Icon name="ArrowLeft" size={18} />
              Назад
            </Button>
            <nav className="flex items-center gap-2 text-sm font-medium">
              {location.pathname !== '/commercial' && (
                <Link to="/commercial" className="px-4 py-2 rounded-full bg-terracotta/15 text-terracotta hover:bg-terracotta/25 transition-colors font-semibold">Коммерция</Link>
              )}
              {location.pathname !== '/for-client' && (
                <Link to="/for-client" className="px-4 py-2 rounded-full bg-muted hover:bg-muted/70 transition-colors text-[#565166]">Клиентам</Link>
              )}
            </nav>
          </div>
        )}

        {/* Mobile burger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Меню"
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/50 px-4 pb-3 pt-1 flex flex-col gap-1.5">
          {isHome ? (
            <>
              <a href="#services" onClick={closeMenu} className="px-3 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium text-center">Услуги</a>
              <a href="#about" onClick={closeMenu} className="px-3 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium text-center">О нас</a>
              <a href="#contacts" onClick={closeMenu} className="px-3 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium text-center">Контакты</a>
              <Link to="/commercial" onClick={closeMenu} className="px-3 py-2 rounded-xl bg-terracotta/15 text-terracotta text-sm font-semibold text-center">Коммерция</Link>
              <Link to="/for-client" onClick={closeMenu} className="px-3 py-2 rounded-xl bg-muted text-[#565166] text-sm font-medium text-center">Клиентам</Link>
            </>
          ) : (
            <>
              <button onClick={() => { navigate('/'); closeMenu(); }} className="px-3 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium text-center flex items-center justify-center gap-2">
                <Icon name="ArrowLeft" size={15} /> На главную
              </button>
              {location.pathname !== '/commercial' && (
                <Link to="/commercial" onClick={closeMenu} className="px-3 py-2 rounded-xl bg-terracotta/15 text-terracotta text-sm font-semibold text-center">Коммерция</Link>
              )}
              {location.pathname !== '/for-client' && (
                <Link to="/for-client" onClick={closeMenu} className="px-3 py-2 rounded-xl bg-muted text-[#565166] text-sm font-medium text-center">Клиентам</Link>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
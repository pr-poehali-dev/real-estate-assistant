const Footer = () => (
  <footer className="py-10 px-4 border-t border-border/40">
    <div className="container max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="flex flex-col leading-none">
          <span className="font-display text-sm font-bold tracking-[0.12em] text-foreground uppercase">APEX</span>
          <span className="text-[7px] font-medium tracking-[0.3em] text-terracotta uppercase">Solutions</span>
        </div>
        <div className="w-px h-6 bg-border/60" />
        <span className="text-[10px] tracking-widest uppercase text-muted-foreground">Недвижимость · Москва и МО</span>
      </div>
      <span className="text-muted-foreground text-[11px] tracking-wider">© 2026 Apex Solutions. Бесплатный подбор недвижимости.</span>
    </div>
  </footer>
);

export default Footer;

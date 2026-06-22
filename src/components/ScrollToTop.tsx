import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToPrev = () => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
    const scrollY = window.scrollY + 80;
    let prev: HTMLElement | null = null;
    for (const section of sections) {
      if (section.offsetTop < scrollY - 10) {
        prev = section;
      }
    }
    if (prev) {
      window.scrollTo({ top: prev.offsetTop, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToPrev}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-md hover:bg-accent/70 transition-colors"
    >
      <Icon name="ChevronUp" size={24} />
    </button>
  );
}

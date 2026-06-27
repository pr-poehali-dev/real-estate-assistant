import { useState } from 'react';
import HeroSection from './home/HeroSection';
import ContentSections from './home/ContentSections';
import CtaSection from './home/CtaSection';
import { type FS, emptyForm } from './home/constants';

const Index = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'social'|'meeting'>('social');
  const [forms, setForms] = useState<Record<string,FS>>({ social: emptyForm(), meeting: emptyForm() });

  const openRequest = (m: 'social'|'meeting' = 'social') => { setMode(m); setOpen(true); };
  const handleClose = () => { setForms(prev => ({ ...prev, [mode]: emptyForm() })); setOpen(false); };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection onOpenRequest={openRequest} />
      <ContentSections />
      <CtaSection
        open={open}
        mode={mode}
        forms={forms}
        onOpenRequest={openRequest}
        onClose={handleClose}
        setForms={setForms}
      />
    </div>
  );
};

export default Index;

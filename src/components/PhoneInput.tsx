import { useRef } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

const MASK = '+7 (___) ___-__-__';

function applyMask(digits: string): string {
  let d = digits.replace(/\D/g, '');
  if (d.startsWith('7') || d.startsWith('8')) d = d.slice(1);
  d = d.slice(0, 10);

  let result = '+7 (';
  for (let i = 0; i < 10; i++) {
    if (i === 3) result += ') ';
    if (i === 6) result += '-';
    if (i === 8) result += '-';
    result += i < d.length ? d[i] : '_';
  }
  return result;
}

function extractDigits(masked: string): string {
  return masked.replace(/\D/g, '').replace(/^(7|8)/, '');
}

function getCursorPos(displayed: string): number {
  const pos = displayed.indexOf('_');
  return pos === -1 ? displayed.length : pos;
}

export default function PhoneInput({ value, onChange, className, required }: PhoneInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  const displayed = value ? applyMask(value) : MASK;
  const digits = extractDigits(value || '');

  const placeCursor = (disp: string) => {
    const cur = getCursorPos(disp);
    requestAnimationFrame(() => {
      ref.current?.setSelectionRange(cur, cur);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDigits = extractDigits(e.target.value);
    onChange(newDigits);
    const newDisplayed = newDigits ? applyMask(newDigits) : MASK;
    placeCursor(newDisplayed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newDigits = digits.slice(0, -1);
      onChange(newDigits);
      const newDisplayed = newDigits ? applyMask(newDigits) : MASK;
      placeCursor(newDisplayed);
    }
  };

  const handleFocus = () => { placeCursor(displayed); };
  const handleClick = () => { placeCursor(displayed); };

  return (
    <input
      ref={ref}
      type="tel"
      value={displayed}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onClick={handleClick}
      required={required}
      className={className}
    />
  );
}

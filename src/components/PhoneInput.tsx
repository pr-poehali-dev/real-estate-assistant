import { useRef } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').replace(/^(7|8)/, '');
  const d = digits.slice(0, 10);
  let result = '+7(';
  if (d.length === 0) return '+7(';
  result += d.slice(0, 3);
  if (d.length >= 3) result += ')' + d.slice(3, 6);
  if (d.length >= 6) result += '-' + d.slice(6, 8);
  if (d.length >= 8) result += '-' + d.slice(8, 10);
  return result;
}

export default function PhoneInput({ value, onChange, className, required }: PhoneInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === '' || raw === '+') {
      onChange('+7(');
      return;
    }
    onChange(formatPhone(raw));
  };

  const handleFocus = () => {
    if (!value || value === '+7(') {
      onChange('+7(');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && (value === '+7(' || value === '')) {
      e.preventDefault();
    }
  };

  return (
    <input
      ref={ref}
      type="tel"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      placeholder="+7(   )   -  -  "
      required={required}
      className={className}
    />
  );
}

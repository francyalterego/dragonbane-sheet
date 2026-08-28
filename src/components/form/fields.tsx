import type { ReactNode } from 'react';

export function TextField({
  label,
  value,
  onChange,
  className = '',
  placeholder,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
}) {
  return (
    <label className={`flex flex-col gap-1 text-xs text-parchment-200/80 ${className}`}>
      {label && <span>{label}</span>}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </label>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  className = '',
  min,
  max,
}: {
  label?: string;
  value: number | '';
  onChange: (v: number | '') => void;
  className?: string;
  min?: number;
  max?: number;
}) {
  return (
    <label className={`flex flex-col gap-1 text-xs text-parchment-200/80 ${className}`}>
      {label && <span>{label}</span>}
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        className="w-full"
      />
    </label>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-1.5 text-xs text-parchment-200/80">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="accent-dragon-gold" />
      {label}
    </label>
  );
}

export function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-dragon-gold/25 bg-black/15 p-4">
      <h2 className="section-title mb-3 text-sm text-dragon-gold">{title}</h2>
      {children}
    </section>
  );
}

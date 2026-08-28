

const PIP_LAYOUTS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 25], [72, 25], [28, 50], [72, 50], [28, 75], [72, 75]],
};

interface DieProps {
  value: number;
  rolling: boolean;
  discarded?: boolean;
  onClick?: () => void;
  size?: number;
}

export function Die({ value, rolling, discarded, onClick, size = 64 }: DieProps) {
  const pips = PIP_LAYOUTS[value] ?? PIP_LAYOUTS[1];
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={[
        'relative rounded-xl border-2 shadow-lg transition-all duration-200 select-none',
        discarded
          ? 'opacity-35 grayscale border-white/10 bg-black/30'
          : 'border-dragon-gold/70 bg-gradient-to-br from-parchment-100 to-parchment-200',
        onClick && !discarded ? 'hover:-translate-y-1 hover:shadow-dragon-gold/40 cursor-pointer' : '',
        onClick && discarded ? 'cursor-pointer hover:opacity-60' : '',
        rolling ? 'animate-dice-roll' : '',
      ].join(' ')}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {pips.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={8} fill={discarded ? '#666' : '#241f18'} />
        ))}
      </svg>
    </button>
  );
}

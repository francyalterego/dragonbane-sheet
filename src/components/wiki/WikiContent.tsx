const LOREM =
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;

function PlaceholderImage({ title }: { title: string }) {
  return (
    <div className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-dragon-gold/30 bg-black/20 p-6 text-center">
      <span className="text-4xl opacity-40">🐉</span>
      <span className="text-[11px] uppercase tracking-wide text-parchment-200/40">Placeholder immagine</span>
      <span className="text-[10px] text-parchment-200/25">{title}</span>
    </div>
  );
}

export function WikiContent({ title }: { title: string }) {
  return (
    <article className="flex-1 overflow-y-auto">
      <h1 className="section-title mb-4 text-2xl text-dragon-red">{title}</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_260px]">
        <div className="space-y-4 text-sm leading-relaxed text-parchment-200/80">
          {LOREM.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <PlaceholderImage title={title} />
      </div>
    </article>
  );
}

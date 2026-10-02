import { useEffect, useState } from 'react';

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

type WikiBlock =
  | { type: 'heading'; level: number; text: string }
  | { type: 'p'; text: string }
  | { type: 'table'; rows: string[][] }
  | { type: 'img'; src: string };

type WikiManifest = { nodes: Record<string, { title: string; blocks: WikiBlock[] }> };

// Solo per sviluppo locale: il manuale completo (testo + immagini) non viene mai committato
// nel repo pubblico. Vedi public/wiki-content/ (gitignored) e .env.local.
const FULL_CONTENT_ENABLED = import.meta.env.VITE_WIKI_FULL_CONTENT === 'true';

let manifestPromise: Promise<WikiManifest | null> | null = null;

function loadManifest() {
  if (!manifestPromise) {
    manifestPromise = fetch('/wiki-content/manifest.json')
      .then((res) => (res.ok ? (res.json() as Promise<WikiManifest>) : null))
      .catch(() => null);
  }
  return manifestPromise;
}

function RealContent({ blocks }: { blocks: WikiBlock[] }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-parchment-200/80">
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          const Tag = block.level <= 5 ? 'h2' : 'h3';
          return (
            <Tag key={i} className="section-title pt-2 text-base text-dragon-gold">
              {block.text}
            </Tag>
          );
        }
        if (block.type === 'p') {
          return <p key={i}>{block.text}</p>;
        }
        if (block.type === 'img') {
          return (
            <img
              key={i}
              src={`/wiki-content/${block.src}`}
              alt=""
              className="max-w-full rounded-lg border border-dragon-gold/20"
            />
          );
        }
        if (block.type === 'table') {
          const [header, ...rows] = block.rows;
          return (
            <div key={i} className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr>
                    {header.map((cell, ci) => (
                      <th
                        key={ci}
                        className="border border-dragon-gold/25 bg-black/30 px-2 py-1 text-left text-dragon-gold"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="border border-dragon-gold/15 px-2 py-1 align-top">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export function WikiContent({ path, title }: { path: string; title: string }) {
  const [manifest, setManifest] = useState<WikiManifest | null | undefined>(undefined);

  useEffect(() => {
    if (!FULL_CONTENT_ENABLED) return;
    loadManifest().then(setManifest);
  }, []);

  const node = FULL_CONTENT_ENABLED ? manifest?.nodes[path] : undefined;

  return (
    <article className="flex-1 overflow-y-auto">
      <h1 className="section-title mb-4 text-2xl text-dragon-red">{title}</h1>
      {node ? (
        <RealContent blocks={node.blocks} />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_260px]">
          <div className="space-y-4 text-sm leading-relaxed text-parchment-200/80">
            {LOREM.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <PlaceholderImage title={title} />
        </div>
      )}
    </article>
  );
}

import { useState } from 'react';
import { WikiChapter, WikiNode } from '../../data/wikiStructure';

function NodeItem({
  node,
  path,
  depth,
  selectedPath,
  onSelect,
}: {
  node: WikiNode;
  path: string;
  depth: number;
  selectedPath: string;
  onSelect: (path: string, title: string) => void;
}) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = !!node.children?.length;
  const isSelected = selectedPath === path;

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (hasChildren) setOpen((o) => !o);
          onSelect(path, node.title);
        }}
        className={[
          'flex w-full items-center justify-between gap-1 rounded px-2 py-1.5 text-left text-xs transition-colors',
          isSelected ? 'bg-dragon-gold/20 text-dragon-gold' : 'text-parchment-200/75 hover:bg-dragon-gold/10',
        ].join(' ')}
        style={{ paddingLeft: 8 + depth * 14 }}
      >
        <span className="truncate">{node.title}</span>
        {hasChildren && (
          <span className={`shrink-0 text-[10px] transition-transform ${open ? 'rotate-90' : ''}`}>▶</span>
        )}
      </button>
      {hasChildren && open && (
        <div>
          {node.children!.map((child, i) => (
            <NodeItem
              key={child.title}
              node={child}
              path={`${path}/${i}`}
              depth={depth + 1}
              selectedPath={selectedPath}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function WikiSidebar({
  chapters,
  selectedPath,
  onSelect,
}: {
  chapters: WikiChapter[];
  selectedPath: string;
  onSelect: (path: string, title: string) => void;
}) {
  return (
    <nav className="flex h-full flex-col gap-0.5 overflow-y-auto pr-1">
      {chapters.map((chapter, i) => (
        <div key={chapter.title} className="mb-1">
          <p className="section-title mb-0.5 px-2 text-[10px] uppercase tracking-wider text-dragon-gold/70">
            Capitolo {chapter.numero}
          </p>
          <NodeItem node={chapter} path={`${i}`} depth={0} selectedPath={selectedPath} onSelect={onSelect} />
        </div>
      ))}
    </nav>
  );
}

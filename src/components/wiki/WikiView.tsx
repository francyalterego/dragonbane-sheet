import { useState } from 'react';
import { WIKI_STRUCTURE } from '../../data/wikiStructure';
import { WikiSidebar } from './WikiSidebar';
import { WikiContent } from './WikiContent';

export function WikiView() {
  const [selectedPath, setSelectedPath] = useState('0/0');
  const [selectedTitle, setSelectedTitle] = useState('Introduzione');

  return (
    <div className="flex flex-1 gap-4 overflow-hidden p-4 sm:p-6">
      <div className="w-64 shrink-0 rounded-lg border border-dragon-gold/25 bg-black/15 p-3">
        <WikiSidebar
          chapters={WIKI_STRUCTURE}
          selectedPath={selectedPath}
          onSelect={(path, title) => {
            setSelectedPath(path);
            setSelectedTitle(title);
          }}
        />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-dragon-gold/25 bg-black/10 p-5">
        <WikiContent path={selectedPath} title={selectedTitle} />
      </div>
    </div>
  );
}

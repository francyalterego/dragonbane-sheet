
import { useRef, useState } from 'react';
import { CharacterProvider, useCharacter } from './state/CharacterContext';
import { AnagraficaSection } from './components/form/AnagraficaSection';
import { CaratteristicheSection } from './components/form/CaratteristicheSection';
import { AbilitaSection } from './components/form/AbilitaSection';
import { CapacitaIncantesimiSection } from './components/form/CapacitaIncantesimiSection';
import { InventarioSection } from './components/form/InventarioSection';
import { CombattimentoSection } from './components/form/CombattimentoSection';
import { RisorseSection } from './components/form/RisorseSection';
import { PdfPreview } from './components/PdfPreview';
import { WikiView } from './components/wiki/WikiView';

const SECRET_CLICKS = 6;
const SECRET_CLICK_WINDOW_MS = 1500;

function Header({ view, onToggleWiki }: { view: 'scheda' | 'wiki'; onToggleWiki: () => void }) {
  const { resetCharacter } = useCharacter();
  const clickCount = useRef(0);
  const lastClickAt = useRef(0);

  function handleLogoClick() {
    const now = Date.now();
    if (now - lastClickAt.current > SECRET_CLICK_WINDOW_MS) clickCount.current = 0;
    lastClickAt.current = now;
    clickCount.current += 1;
    if (clickCount.current >= SECRET_CLICKS) {
      clickCount.current = 0;
      onToggleWiki();
    }
  }

  return (
    <header className="flex items-center justify-between border-b border-dragon-gold/25 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleLogoClick}
          title=" "
          className="select-none rounded px-1 text-xl leading-none opacity-80 hover:opacity-100"
        >
          🐉
        </button>
        <h1 className="section-title text-xl text-dragon-red sm:text-2xl">
          {view === 'wiki' ? 'Wiki' : 'Scheda Dragonbane'}
        </h1>
      </div>
      {view === 'scheda' ? (
        <button
          onClick={() => {
            if (confirm('Svuotare completamente la scheda?')) resetCharacter();
          }}
          className="rounded border border-dragon-gold/40 px-3 py-1.5 text-xs hover:bg-dragon-gold/10"
        >
          Nuova scheda
        </button>
      ) : (
        <button
          onClick={onToggleWiki}
          className="rounded border border-dragon-gold/40 px-3 py-1.5 text-xs hover:bg-dragon-gold/10"
        >
          ← Torna alla scheda
        </button>
      )}
    </header>
  );
}

function AppInner() {
  const [view, setView] = useState<'scheda' | 'wiki'>('scheda');

  return (
    <div className="flex min-h-screen flex-col">
      <Header view={view} onToggleWiki={() => setView((v) => (v === 'wiki' ? 'scheda' : 'wiki'))} />
      {view === 'wiki' ? (
        <WikiView />
      ) : (
        <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 lg:flex-row">
          <div className="flex flex-col gap-4 lg:w-[640px] lg:flex-shrink-0">
            <AnagraficaSection />
            <CaratteristicheSection />
            <AbilitaSection />
            <CapacitaIncantesimiSection />
            <InventarioSection />
            <CombattimentoSection />
            <RisorseSection />
          </div>
          <div className="min-w-0 flex-1 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
            <PdfPreview />
          </div>
        </main>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CharacterProvider>
      <AppInner />
    </CharacterProvider>
  );
}

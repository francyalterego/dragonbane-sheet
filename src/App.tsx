
import { CharacterProvider, useCharacter } from './state/CharacterContext';
import { AnagraficaSection } from './components/form/AnagraficaSection';
import { CaratteristicheSection } from './components/form/CaratteristicheSection';
import { AbilitaSection } from './components/form/AbilitaSection';
import { CapacitaIncantesimiSection } from './components/form/CapacitaIncantesimiSection';
import { InventarioSection } from './components/form/InventarioSection';
import { CombattimentoSection } from './components/form/CombattimentoSection';
import { RisorseSection } from './components/form/RisorseSection';
import { PdfPreview } from './components/PdfPreview';

function Header() {
  const { resetCharacter } = useCharacter();
  return (
    <header className="flex items-center justify-between border-b border-dragon-gold/25 px-4 py-3 sm:px-6">
      <h1 className="section-title text-xl text-dragon-red sm:text-2xl">Scheda Dragonbane</h1>
      <button
        onClick={() => {
          if (confirm('Svuotare completamente la scheda?')) resetCharacter();
        }}
        className="rounded border border-dragon-gold/40 px-3 py-1.5 text-xs hover:bg-dragon-gold/10"
      >
        Nuova scheda
      </button>
    </header>
  );
}

function AppInner() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 lg:flex-row">
        <div className="flex flex-1 flex-col gap-4 lg:max-w-2xl">
          <AnagraficaSection />
          <CaratteristicheSection />
          <AbilitaSection />
          <CapacitaIncantesimiSection />
          <InventarioSection />
          <CombattimentoSection />
          <RisorseSection />
        </div>
        <div className="lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:w-[420px] lg:flex-shrink-0">
          <PdfPreview />
        </div>
      </main>
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

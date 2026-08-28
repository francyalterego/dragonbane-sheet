import { useEffect, useRef, useState } from 'react';
import { useCharacter } from '../state/CharacterContext';
import { fillCharacterSheet } from '../pdf/fillPdf';
import { renderPdfToCanvas } from '../pdf/renderPreview';

export function PdfPreview() {
  const { character } = useCharacter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lastBytes, setLastBytes] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(async () => {
      try {
        const bytes = await fillCharacterSheet(character);
        if (cancelled) return;
        setLastBytes(bytes);
        setError(null);
        if (canvasRef.current) await renderPdfToCanvas(bytes, canvasRef.current);
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [character]);

  function download() {
    if (!lastBytes) return;
    const blob = new Blob([lastBytes.slice().buffer as ArrayBuffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const filename = character.nome ? `Scheda - ${character.nome}.pdf` : 'Scheda Dragonbane.pdf';
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex h-full flex-col items-center gap-3">
      <button
        onClick={download}
        disabled={!lastBytes}
        className="w-full rounded-md bg-dragon-green px-4 py-2 font-display text-sm tracking-wide text-parchment-50 shadow hover:brightness-110 disabled:opacity-40"
      >
        Scarica PDF
      </button>
      {error && <p className="text-xs text-red-400">Errore nella generazione: {error}</p>}
      <div className="w-full flex-1 overflow-auto rounded-md border border-dragon-gold/20 bg-black/20 p-2">
        <canvas ref={canvasRef} className="w-full rounded shadow-lg" />
      </div>
    </div>
  );
}

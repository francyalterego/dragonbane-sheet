
import { useState } from 'react';
import { useCharacter } from '../../state/CharacterContext';
import { CIMELI, PROFESSIONI_INFO } from '../../data/dragonbaneData';
import { NumberField, SectionCard, TextField } from './fields';

const ALTRO = 'Altro';

export function InventarioSection() {
  const { character, update } = useCharacter();
  const cimelioIsCustom = character.cimelio !== '' && !CIMELI.includes(character.cimelio);
  const prof = PROFESSIONI_INFO.find((p) => p.nome === character.professione);
  const [equipSet, setEquipSet] = useState<number | null>(null);

  return (
    <SectionCard title="Inventario">
      {prof && (
        <div className="mb-4 rounded border border-dragon-gold/20 bg-black/20 p-2.5">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-wide text-parchment-200/50">
              Attrezzatura iniziale — {prof.nome} (pag. 29: tira o scegline uno)
            </p>
            <button
              type="button"
              onClick={() => {
                const roll = 1 + Math.floor(Math.random() * 6);
                setEquipSet(roll <= 2 ? 0 : roll <= 4 ? 1 : 2);
              }}
              className="shrink-0 rounded border border-dragon-gold/40 px-2 py-0.5 text-[10px] hover:bg-dragon-gold/10"
            >
              🎲 Tira 1D6
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {prof.attrezzatura.map((set, i) => (
              <button
                key={set.tiro}
                type="button"
                onClick={() => setEquipSet(i)}
                className={[
                  'rounded border p-1.5 text-left text-[11px] leading-snug',
                  equipSet === i ? 'border-dragon-gold bg-dragon-gold/10 text-parchment-50' : 'border-dragon-gold/15 text-parchment-200/60 hover:border-dragon-gold/30',
                ].join(' ')}
              >
                <span className="font-semibold text-dragon-gold">{set.tiro}: </span>
                {set.testo}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-[10px] text-parchment-200/45">
            Trascrivi armi e armatura scelte in Combattimento (dove trovi anche i loro valori esatti), il resto qui
            sotto o negli Oggetti Minuscoli. Possiedi anche indumenti semplici, non serve segnarli.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs uppercase tracking-wide text-parchment-200/60">Oggetti (10 slot)</p>
          <div className="flex flex-col gap-1.5">
            {character.inventario.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-4 text-xs text-parchment-200/50">{i + 1}</span>
                <input
                  type="text"
                  className="flex-1"
                  value={item.text}
                  onChange={(e) => {
                    const inv = [...character.inventario];
                    inv[i] = { text: e.target.value };
                    update('inventario', inv);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            <label className="flex flex-col gap-1 text-xs text-parchment-200/80">
              <span>Cimelio (oggetto di grande valore sentimentale, pag. 29)</span>
              <div className="flex gap-2">
                <select
                  value={cimelioIsCustom ? ALTRO : character.cimelio}
                  onChange={(e) => update('cimelio', e.target.value === ALTRO ? '' : e.target.value)}
                  className="flex-1"
                >
                  <option value="">—</option>
                  {CIMELI.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value={ALTRO}>Altro (scrivi tu)</option>
                </select>
                <button
                  type="button"
                  title="Tira D20 sulla tabella Cimelio"
                  onClick={() => update('cimelio', CIMELI[Math.floor(Math.random() * CIMELI.length)])}
                  className="rounded border border-dragon-gold/40 px-2 py-1.5 text-sm hover:bg-dragon-gold/10"
                >
                  🎲
                </button>
              </div>
            </label>
            {cimelioIsCustom && (
              <TextField value={character.cimelio} onChange={(v) => update('cimelio', v)} placeholder="Scrivi il tuo cimelio" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <TextField
            label="Oggetti minuscoli"
            value={character.oggettiMinuscoli}
            onChange={(v) => update('oggettiMinuscoli', v)}
          />
          <TextField
            label="Peso trasportabile"
            value={character.pesoTrasportabile}
            onChange={(v) => update('pesoTrasportabile', v)}
          />
          <div className="grid grid-cols-3 gap-2">
            <NumberField label="Oro" value={character.oro} onChange={(v) => update('oro', v)} />
            <NumberField label="Argento" value={character.argento} onChange={(v) => update('argento', v)} />
            <NumberField label="Rame" value={character.rame} onChange={(v) => update('rame', v)} />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

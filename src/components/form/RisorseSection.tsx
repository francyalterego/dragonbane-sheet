
import { useCharacter } from '../../state/CharacterContext';
import { Checkbox, NumberField, SectionCard } from './fields';

export function RisorseSection() {
  const { character, update } = useCharacter();

  return (
    <SectionCard title="Punti Ferita, Volontà e Riposo">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs uppercase tracking-wide text-parchment-200/60">Punti Volontà</p>
          <div className="flex gap-2">
            <NumberField label="Attuali" value={character.puntiVolontaAttuali} onChange={(v) => update('puntiVolontaAttuali', v)} />
            <NumberField label="Massimo" value={character.puntiVolontaMax} onChange={(v) => update('puntiVolontaMax', v)} />
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-xs uppercase tracking-wide text-parchment-200/60">Punti Ferita</p>
          <div className="flex gap-2">
            <NumberField label="Attuali" value={character.puntiFeritaAttuali} onChange={(v) => update('puntiFeritaAttuali', v)} />
            <NumberField label="Massimo" value={character.puntiFeritaMax} onChange={(v) => update('puntiFeritaMax', v)} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-parchment-200/60">Tiri Morte — Successi</p>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <Checkbox
                key={i}
                label={`${i + 1}`}
                checked={character.tiriMorteSuccessi > i}
                onChange={() => update('tiriMorteSuccessi', character.tiriMorteSuccessi > i ? i : i + 1)}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-parchment-200/60">Tiri Morte — Fallimenti</p>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <Checkbox
                key={i}
                label={`${i + 1}`}
                checked={character.tiriMorteFallimenti > i}
                onChange={() => update('tiriMorteFallimenti', character.tiriMorteFallimenti > i ? i : i + 1)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        <Checkbox label="Round di Riposo" checked={character.roundDiRiposo} onChange={(v) => update('roundDiRiposo', v)} />
        <Checkbox
          label="Intervallo di Riposo"
          checked={character.intervalloDiRiposo}
          onChange={(v) => update('intervalloDiRiposo', v)}
        />
      </div>
    </SectionCard>
  );
}

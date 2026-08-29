import { useEffect } from 'react';
import { useCharacter } from '../../state/CharacterContext';
import { NumberField, SectionCard } from './fields';

export function RisorseSection() {
  const { character, update } = useCharacter();

  const pvMaxCalc = character.attributes.VOL;
  const pfMaxCalc = character.attributes.COS;

  // pag. 27: PV massimi = VOL, PF massimi = COS (poi eventualmente aumentati da Concentrato/Robusto).
  // Se lasci vuoti Massimo/Attuali li compiliamo da soli; li tocchi tu solo se hai quelle capacità eroiche.
  useEffect(() => {
    if (character.puntiVolontaMax === '' && pvMaxCalc !== '') update('puntiVolontaMax', pvMaxCalc);
  }, [pvMaxCalc]);
  useEffect(() => {
    if (character.puntiFeritaMax === '' && pfMaxCalc !== '') update('puntiFeritaMax', pfMaxCalc);
  }, [pfMaxCalc]);
  useEffect(() => {
    if (character.puntiVolontaAttuali === '' && character.puntiVolontaMax !== '')
      update('puntiVolontaAttuali', character.puntiVolontaMax);
  }, [character.puntiVolontaMax]);
  useEffect(() => {
    if (character.puntiFeritaAttuali === '' && character.puntiFeritaMax !== '')
      update('puntiFeritaAttuali', character.puntiFeritaMax);
  }, [character.puntiFeritaMax]);

  return (
    <SectionCard title="Punti Ferita e Volontà">
      <p className="mb-2 text-[11px] text-parchment-200/50">
        Pag. 27: i Punti Volontà massimi equivalgono a VOL, i Punti Ferita massimi a COS (si compilano da soli finché
        non li tocchi tu, ad es. per le capacità eroiche Concentrato o Robusto, che li aumentano permanentemente).
        Sulla scheda scriviamo solo il massimo: i pallini di quelli attuali li spunti tu a matita mentre giochi, come
        i tiri morte e i round/intervalli di riposo — non servono in fase di creazione.
      </p>
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
    </SectionCard>
  );
}

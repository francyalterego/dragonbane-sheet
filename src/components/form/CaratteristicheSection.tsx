import { useEffect } from 'react';
import { useCharacter } from '../../state/CharacterContext';
import { ATTRIBUTES, Condition } from '../../types/character';
import { AttributeRoller } from '../dice/AttributeRoller';
import { calcDannoBonus, calcMovimento } from '../../data/dragonbaneData';
import { Checkbox, NumberField, SectionCard } from './fields';

const CONDITIONS: Condition[] = ['ESAUSTO', 'MALATICCIO', 'DISORIENTATO', 'ARRABBIATO', 'SPAVENTATO', 'SCORAGGIATO'];

export function CaratteristicheSection() {
  const { character, update } = useCharacter();

  const dannoBonusForCalc = calcDannoBonus(character.attributes.FOR);
  const dannoBonusAgiCalc = calcDannoBonus(character.attributes.AGI);
  const movimentoCalc = calcMovimento(character.stirpe, character.attributes.AGI);

  // Compila da sola i campi derivati quando sono vuoti, così non tocchiamo eventuali
  // aggiustamenti manuali del giocatore (es. per capacità eroiche che li modificano).
  useEffect(() => {
    if (character.dannoBonusFor === '' && dannoBonusForCalc) update('dannoBonusFor', dannoBonusForCalc);
  }, [dannoBonusForCalc]);
  useEffect(() => {
    if (character.dannoBonusAgi === '' && dannoBonusAgiCalc) update('dannoBonusAgi', dannoBonusAgiCalc);
  }, [dannoBonusAgiCalc]);
  useEffect(() => {
    if (character.movimento === '' && movimentoCalc !== '') update('movimento', movimentoCalc);
  }, [movimentoCalc]);

  return (
    <SectionCard title="Attributi e Condizioni">
      <AttributeRoller />

      <div className="mt-4 grid grid-cols-6 gap-2">
        {ATTRIBUTES.map((attr) => {
          const delta = character.appliedAgeDelta[attr];
          return (
            <div key={attr}>
              <NumberField
                label={attr}
                min={3}
                max={18}
                value={character.attributes[attr]}
                onChange={(v) => update('attributes', { ...character.attributes, [attr]: v })}
              />
              {!!delta && (
                <p className="mt-0.5 text-[10px] text-parchment-200/45">
                  {delta > 0 ? `+${delta}` : delta} età
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {CONDITIONS.map((c) => (
          <Checkbox
            key={c}
            label={c}
            checked={character.conditions[c]}
            onChange={(v) => update('conditions', { ...character.conditions, [c]: v })}
          />
        ))}
      </div>

      <p className="mt-4 text-[11px] text-parchment-200/50">
        Valori derivati (pag. 27 del manuale): Danno Bonus si legge da FOR/AGI (≤12 nessuno, 13-16 +D4, 17+ +D6);
        Movimento è quello base della stirpe modificato da AGI. Vengono calcolati da soli finché non li modifichi tu
        a mano (es. per una capacità eroica).
      </p>
      <div className="mt-2 grid grid-cols-3 gap-3">
        <div>
          <label className="flex flex-col gap-1 text-xs text-parchment-200/80">
            <span>Danno Bonus FOR</span>
            <div className="flex gap-2">
              <input type="text" className="flex-1" value={character.dannoBonusFor} onChange={(e) => update('dannoBonusFor', e.target.value)} />
              {dannoBonusForCalc && character.dannoBonusFor !== dannoBonusForCalc && (
                <button
                  type="button"
                  title={`Usa il valore da manuale: ${dannoBonusForCalc}`}
                  onClick={() => update('dannoBonusFor', dannoBonusForCalc)}
                  className="shrink-0 rounded border border-dragon-gold/40 px-2 py-1.5 text-sm hover:bg-dragon-gold/10"
                >
                  🎲
                </button>
              )}
            </div>
          </label>
          {dannoBonusForCalc && character.dannoBonusFor !== dannoBonusForCalc && (
            <p className="mt-0.5 text-[10px] text-parchment-200/45">da manuale: {dannoBonusForCalc}</p>
          )}
        </div>
        <div>
          <label className="flex flex-col gap-1 text-xs text-parchment-200/80">
            <span>Danno Bonus AGI</span>
            <div className="flex gap-2">
              <input type="text" className="flex-1" value={character.dannoBonusAgi} onChange={(e) => update('dannoBonusAgi', e.target.value)} />
              {dannoBonusAgiCalc && character.dannoBonusAgi !== dannoBonusAgiCalc && (
                <button
                  type="button"
                  title={`Usa il valore da manuale: ${dannoBonusAgiCalc}`}
                  onClick={() => update('dannoBonusAgi', dannoBonusAgiCalc)}
                  className="shrink-0 rounded border border-dragon-gold/40 px-2 py-1.5 text-sm hover:bg-dragon-gold/10"
                >
                  🎲
                </button>
              )}
            </div>
          </label>
          {dannoBonusAgiCalc && character.dannoBonusAgi !== dannoBonusAgiCalc && (
            <p className="mt-0.5 text-[10px] text-parchment-200/45">da manuale: {dannoBonusAgiCalc}</p>
          )}
        </div>
        <div>
          <NumberField label="Movimento" value={character.movimento} onChange={(v) => update('movimento', v)} />
          {movimentoCalc !== '' && character.movimento !== movimentoCalc && (
            <p className="mt-0.5 text-[10px] text-parchment-200/45">da manuale: {movimentoCalc}</p>
          )}
        </div>
      </div>
    </SectionCard>
  );
}

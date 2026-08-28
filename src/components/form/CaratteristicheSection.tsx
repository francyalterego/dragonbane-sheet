
import { useCharacter } from '../../state/CharacterContext';
import { ATTRIBUTES, Condition } from '../../types/character';
import { AttributeRoller } from '../dice/AttributeRoller';
import { Checkbox, NumberField, SectionCard, TextField } from './fields';

const CONDITIONS: Condition[] = ['ESAUSTO', 'MALATICCIO', 'DISORIENTATO', 'ARRABBIATO', 'SPAVENTATO', 'SCORAGGIATO'];

export function CaratteristicheSection() {
  const { character, update } = useCharacter();

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

      <div className="mt-4 grid grid-cols-3 gap-3">
        <TextField label="Danno Bonus FOR" value={character.dannoBonusFor} onChange={(v) => update('dannoBonusFor', v)} />
        <TextField label="Danno Bonus AGI" value={character.dannoBonusAgi} onChange={(v) => update('dannoBonusAgi', v)} />
        <NumberField label="Movimento" value={character.movimento} onChange={(v) => update('movimento', v)} />
      </div>
    </SectionCard>
  );
}


import { useCharacter } from '../../state/CharacterContext';
import { SectionCard } from './fields';

export function CapacitaIncantesimiSection() {
  const { character, update } = useCharacter();

  return (
    <SectionCard title="Capacità e Incantesimi">
      <div className="flex flex-col gap-1.5">
        {character.capacitaIncantesimi.map((text, i) => (
          <input
            key={i}
            type="text"
            value={text}
            onChange={(e) => {
              const list = [...character.capacitaIncantesimi];
              list[i] = e.target.value;
              update('capacitaIncantesimi', list);
            }}
          />
        ))}
      </div>
    </SectionCard>
  );
}

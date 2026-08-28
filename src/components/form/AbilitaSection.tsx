
import { useCharacter } from '../../state/CharacterContext';
import { ATTRIBUTES, Attribute } from '../../types/character';
import { SectionCard, TextField } from './fields';

export function AbilitaSection() {
  const { character, update } = useCharacter();

  return (
    <SectionCard title="Abilità">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs uppercase tracking-wide text-parchment-200/60">Abilità generali</p>
          <div className="flex flex-col gap-1.5">
            {character.skills.map((s, i) => (
              <div key={s.name} className="flex items-center gap-2">
                <span className="w-40 truncate text-xs">
                  {s.name} <span className="text-parchment-200/50">({s.attribute})</span>
                </span>
                <input
                  type="number"
                  className="w-16"
                  value={s.value}
                  onChange={(e) => {
                    const skills = [...character.skills];
                    skills[i] = { ...s, value: e.target.value === '' ? '' : Number(e.target.value) };
                    update('skills', skills);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs uppercase tracking-wide text-parchment-200/60">Abilità con armi</p>
          <div className="flex flex-col gap-1.5">
            {character.weaponSkills.map((s, i) => (
              <div key={s.name} className="flex items-center gap-2">
                <span className="w-40 truncate text-xs">
                  {s.name} <span className="text-parchment-200/50">({s.attribute})</span>
                </span>
                <input
                  type="number"
                  className="w-16"
                  value={s.value}
                  onChange={(e) => {
                    const ws = [...character.weaponSkills];
                    ws[i] = { ...s, value: e.target.value === '' ? '' : Number(e.target.value) };
                    update('weaponSkills', ws);
                  }}
                />
              </div>
            ))}
          </div>

          <p className="mb-1.5 mt-4 text-xs uppercase tracking-wide text-parchment-200/60">Abilità secondarie</p>
          <div className="flex flex-col gap-1.5">
            {character.secondarySkills.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <TextField
                  value={s.name}
                  onChange={(v) => {
                    const ss = [...character.secondarySkills];
                    ss[i] = { ...s, name: v };
                    update('secondarySkills', ss);
                  }}
                  className="flex-1"
                />
                <select
                  value={s.attribute}
                  onChange={(e) => {
                    const ss = [...character.secondarySkills];
                    ss[i] = { ...s, attribute: e.target.value as Attribute | '' };
                    update('secondarySkills', ss);
                  }}
                  className="w-20 text-xs"
                >
                  <option value="">—</option>
                  {ATTRIBUTES.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="w-14"
                  value={s.value}
                  onChange={(e) => {
                    const ss = [...character.secondarySkills];
                    ss[i] = { ...s, value: e.target.value === '' ? '' : Number(e.target.value) };
                    update('secondarySkills', ss);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

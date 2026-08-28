import { useEffect } from 'react';
import { useCharacter } from '../../state/CharacterContext';
import { ATTRIBUTES, Attribute } from '../../types/character';
import { calcValoreBase, PROFESSIONI_INFO } from '../../data/dragonbaneData';
import { SectionCard, TextField } from './fields';

export function AbilitaSection() {
  const { character, update } = useCharacter();
  const prof = PROFESSIONI_INFO.find((p) => p.nome === character.professione);
  const trainableNames = new Set(prof?.abilita ?? []);

  // pag. 27: il valore base di un'abilità (dal suo attributo) è "gratuito", lo ottieni in automatico.
  // Lo pre-compiliamo finché il campo è vuoto; se un'abilità è allenata va poi raddoppiato a mano.
  useEffect(() => {
    const skills = character.skills.map((s) => {
      if (s.value !== '') return s;
      const base = calcValoreBase(character.attributes[s.attribute]);
      return base === '' ? s : { ...s, value: base };
    });
    if (JSON.stringify(skills) !== JSON.stringify(character.skills)) update('skills', skills);
  }, [character.attributes]);
  useEffect(() => {
    const ws = character.weaponSkills.map((s) => {
      if (s.value !== '') return s;
      const base = calcValoreBase(character.attributes[s.attribute]);
      return base === '' ? s : { ...s, value: base };
    });
    if (JSON.stringify(ws) !== JSON.stringify(character.weaponSkills)) update('weaponSkills', ws);
  }, [character.attributes]);

  return (
    <SectionCard title="Abilità">
      <p className="mb-3 text-[11px] text-parchment-200/50">
        Pag. 27: il valore base (in grigio) è automatico dal tuo attributo. Le abilità evidenziate in oro sono quelle
        della professione {character.professione || '(selezionala in Anagrafica)'}: {character.professione && 'scegline 6 come '}
        <span className="text-dragon-gold">allenate</span> — il loro valore iniziale è il <em>doppio</em> del base. In
        base all'età hai poi altre 2 (Giovane), 4 (Adulto) o 6 (Vecchio) abilità allenate a scelta libera tra tutte.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs uppercase tracking-wide text-parchment-200/60">Abilità generali</p>
          <div className="flex flex-col gap-1.5">
            {character.skills.map((s, i) => {
              const base = calcValoreBase(character.attributes[s.attribute]);
              const trainable = trainableNames.has(s.name);
              return (
                <div key={s.name} className="flex items-center gap-2">
                  <span className={`w-40 truncate text-xs ${trainable ? 'text-dragon-gold' : ''}`}>
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
                  {base !== '' && <span className="text-[10px] text-parchment-200/40">base {base}{trainable ? `/${base * 2}` : ''}</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs uppercase tracking-wide text-parchment-200/60">Abilità con armi</p>
          <div className="flex flex-col gap-1.5">
            {character.weaponSkills.map((s, i) => {
              const base = calcValoreBase(character.attributes[s.attribute]);
              const trainable = trainableNames.has(s.name);
              return (
                <div key={s.name} className="flex items-center gap-2">
                  <span className={`w-40 truncate text-xs ${trainable ? 'text-dragon-gold' : ''}`}>
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
                  {base !== '' && <span className="text-[10px] text-parchment-200/40">base {base}{trainable ? `/${base * 2}` : ''}</span>}
                </div>
              );
            })}
          </div>

          <p className="mb-1.5 mt-4 text-xs uppercase tracking-wide text-parchment-200/60">Abilità secondarie</p>
          <p className="mb-1.5 text-[10px] text-parchment-200/45">
            Es. le scuole di magia. Non hanno un valore base gratuito (pag. 27): partono da 0 finché non le alleni.
          </p>
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

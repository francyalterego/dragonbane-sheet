import { useEffect } from 'react';
import { useCharacter } from '../../state/CharacterContext';
import { ATTRIBUTES, Attribute, Skill, WeaponSkill } from '../../types/character';
import { AGE_TRAINED_SKILLS, calcValoreBase, EtaCategoria, PROFESSIONI_INFO } from '../../data/dragonbaneData';
import { SectionCard, TextField } from './fields';

const PROFESSION_CAP = 6;

function SkillRow({
  s,
  base,
  trainable,
  disabled,
  onValueChange,
  onToggleAllenata,
}: {
  s: Skill | WeaponSkill;
  base: number | '';
  trainable: boolean;
  disabled: boolean;
  onValueChange: (v: number | '') => void;
  onToggleAllenata: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <input
        type="checkbox"
        checked={s.allenata}
        disabled={disabled}
        onChange={onToggleAllenata}
        title={disabled ? 'Limite di abilità allenate raggiunto' : 'Allenata: raddoppia il valore base'}
        className="accent-dragon-gold disabled:opacity-30"
      />
      <span className={`w-36 truncate text-xs ${trainable ? 'text-dragon-gold' : ''}`}>
        {s.name} <span className="text-parchment-200/50">({s.attribute})</span>
      </span>
      <input
        type="number"
        className="w-16"
        value={s.value}
        onChange={(e) => onValueChange(e.target.value === '' ? '' : Number(e.target.value))}
      />
      {base !== '' && <span className="text-[10px] text-parchment-200/40">base {base}{trainable ? `/${base * 2}` : ''}</span>}
    </div>
  );
}

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

  const allRows = [...character.skills, ...character.weaponSkills];
  const professionTrainedCount = allRows.filter((s) => s.allenata && trainableNames.has(s.name)).length;
  const totalTrainedCount = allRows.filter((s) => s.allenata).length;
  const totalCap = character.eta ? AGE_TRAINED_SKILLS[character.eta as EtaCategoria] : null;

  function toggle<T extends Skill | WeaponSkill>(list: T[], i: number, key: 'skills' | 'weaponSkills') {
    const s = list[i];
    const base = calcValoreBase(character.attributes[s.attribute]);
    const nextAllenata = !s.allenata;
    const nextValue = base === '' ? s.value : nextAllenata ? (base as number) * 2 : base;
    const next = [...list];
    next[i] = { ...s, allenata: nextAllenata, value: nextValue };
    update(key, next as any);
  }

  // Un solo tetto totale (8/10/12 in base all'età): almeno 6 devono venire dalla
  // professione, ma questo è un requisito di provenienza, non un tetto separato che
  // impedirebbe di allenare "in più" un'abilità della professione oltre le sei dedicate.
  function isDisabled(s: Skill | WeaponSkill) {
    if (s.allenata) return false; // si può sempre togliere la spunta
    return totalCap !== null && totalTrainedCount >= totalCap;
  }

  return (
    <SectionCard title="Abilità">
      <p className="mb-1.5 text-[11px] text-parchment-200/50">
        Pag. 27: il valore base (in grigio) è automatico dal tuo attributo. Le abilità in oro sono quelle della
        professione {character.professione || '(selezionala in Anagrafica)'}: spunta <span className="text-dragon-gold">Allenata</span> per
        raddoppiare il valore base. Ne scegli 6 dalla professione, più altre a scelta libera in base all'età: 2
        (Giovane), 4 (Adulto) o 6 (Vecchio).
      </p>
      <p className="mb-3 text-[11px] text-parchment-200/70">
        Allenate: {totalTrainedCount}/{totalCap ?? '?'} {!character.eta && '(scegli l\'età in Anagrafica per il limite)'}
        {' · '}di cui dalla professione: {professionTrainedCount}
        {professionTrainedCount < PROFESSION_CAP && character.professione && (
          <span className="text-dragon-red"> (almeno {PROFESSION_CAP} richieste)</span>
        )}
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs uppercase tracking-wide text-parchment-200/60">Abilità generali</p>
          <div className="flex flex-col gap-1.5">
            {character.skills.map((s, i) => (
              <SkillRow
                key={s.name}
                s={s}
                base={calcValoreBase(character.attributes[s.attribute])}
                trainable={trainableNames.has(s.name)}
                disabled={isDisabled(s)}
                onValueChange={(v) => {
                  const skills = [...character.skills];
                  skills[i] = { ...s, value: v };
                  update('skills', skills);
                }}
                onToggleAllenata={() => toggle(character.skills, i, 'skills')}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs uppercase tracking-wide text-parchment-200/60">Abilità con armi</p>
          <div className="flex flex-col gap-1.5">
            {character.weaponSkills.map((s, i) => (
              <SkillRow
                key={s.name}
                s={s}
                base={calcValoreBase(character.attributes[s.attribute])}
                trainable={trainableNames.has(s.name)}
                disabled={isDisabled(s)}
                onValueChange={(v) => {
                  const ws = [...character.weaponSkills];
                  ws[i] = { ...s, value: v };
                  update('weaponSkills', ws);
                }}
                onToggleAllenata={() => toggle(character.weaponSkills, i, 'weaponSkills')}
              />
            ))}
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

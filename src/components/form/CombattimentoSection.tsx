import { useCharacter } from '../../state/CharacterContext';
import { applyArmor, applyHelmet, ARMATURE, ARMI, COPRICAPI, WeaponStats } from '../../data/equipmentTables';
import { WeaponRow } from '../../types/character';
import { NumberField, SectionCard, TextField } from './fields';

function sciagureList(flags: Record<string, boolean>, labels: Record<string, string>): string {
  return Object.entries(flags)
    .filter(([, v]) => v)
    .map(([k]) => labels[k])
    .join(', ');
}

const PERSONALIZZATO = 'Personalizzato';

function applyWeapon(stats: WeaponStats): WeaponRow {
  return { nome: stats.nome, imp: stats.imp, portata: stats.portata, danno: stats.danno, durabilita: stats.durabilita, qualita: stats.qualita };
}

export function CombattimentoSection() {
  const { character, update } = useCharacter();

  const armaturaIsCustom = character.armatura.nome !== '' && !ARMATURE.some((a) => a.nome === character.armatura.nome);
  const copricapoIsCustom = character.copricapo.nome !== '' && !COPRICAPI.some((a) => a.nome === character.copricapo.nome);

  return (
    <SectionCard title="Combattimento">
      <p className="mb-3 text-[11px] text-parchment-200/50">
        Pag. 74-75: scegliendo un'armatura, un copricapo o un'arma dall'elenco ufficiale, valore, sciagure e
        statistiche si compilano da soli. Usa "Personalizzato" per oggetti speciali o di fattura magistrale.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-wide text-parchment-200/60">Armatura</p>
          <div className="flex gap-2">
            <label className="flex flex-1 flex-col gap-1 text-xs text-parchment-200/80">
              <span>Nome</span>
              <select
                value={armaturaIsCustom ? PERSONALIZZATO : character.armatura.nome}
                onChange={(e) => {
                  if (e.target.value === PERSONALIZZATO) {
                    update('armatura', { ...character.armatura, nome: '' });
                    return;
                  }
                  const stats = ARMATURE.find((a) => a.nome === e.target.value);
                  if (stats) update('armatura', { ...character.armatura, ...applyArmor(stats) });
                }}
              >
                <option value="">—</option>
                {ARMATURE.map((a) => (
                  <option key={a.nome} value={a.nome}>
                    {a.nome} (valore {a.valore})
                  </option>
                ))}
                <option value={PERSONALIZZATO}>Personalizzato</option>
              </select>
            </label>
            <NumberField
              label="Valore"
              value={character.armatura.valore}
              onChange={(v) => update('armatura', { ...character.armatura, valore: v })}
              className="w-20"
            />
          </div>
          {armaturaIsCustom && (
            <TextField value={character.armatura.nome} onChange={(v) => update('armatura', { ...character.armatura, nome: v })} placeholder="Nome armatura" />
          )}
          {(character.armatura.sciaguraSgattaiolare || character.armatura.sciaguraSfuggire || character.armatura.sciaguraAcrobazia) && (
            <p className="text-[11px] text-parchment-200/50">
              Sciagura su:{' '}
              {sciagureList(
                {
                  sciaguraSgattaiolare: character.armatura.sciaguraSgattaiolare,
                  sciaguraSfuggire: character.armatura.sciaguraSfuggire,
                  sciaguraAcrobazia: character.armatura.sciaguraAcrobazia,
                },
                { sciaguraSgattaiolare: 'Sgattaiolare', sciaguraSfuggire: 'Sfuggire', sciaguraAcrobazia: 'Acrobazia' }
              )}{' '}
              (automatico dall'armatura scelta)
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-wide text-parchment-200/60">Copricapo</p>
          <div className="flex gap-2">
            <label className="flex flex-1 flex-col gap-1 text-xs text-parchment-200/80">
              <span>Nome</span>
              <select
                value={copricapoIsCustom ? PERSONALIZZATO : character.copricapo.nome}
                onChange={(e) => {
                  if (e.target.value === PERSONALIZZATO) {
                    update('copricapo', { ...character.copricapo, nome: '' });
                    return;
                  }
                  const stats = COPRICAPI.find((a) => a.nome === e.target.value);
                  if (stats) update('copricapo', { ...character.copricapo, ...applyHelmet(stats) });
                }}
              >
                <option value="">—</option>
                {COPRICAPI.map((a) => (
                  <option key={a.nome} value={a.nome}>
                    {a.nome} ({a.valoreLabel})
                  </option>
                ))}
                <option value={PERSONALIZZATO}>Personalizzato</option>
              </select>
            </label>
            <NumberField
              label="Valore"
              value={character.copricapo.valore}
              onChange={(v) => update('copricapo', { ...character.copricapo, valore: v })}
              className="w-20"
            />
          </div>
          {copricapoIsCustom && (
            <TextField value={character.copricapo.nome} onChange={(v) => update('copricapo', { ...character.copricapo, nome: v })} placeholder="Nome copricapo" />
          )}
          {(character.copricapo.sciaguraConsapevolezza || character.copricapo.sciaguraAttacchiADistanza) && (
            <p className="text-[11px] text-parchment-200/50">
              Sciagura su:{' '}
              {sciagureList(
                {
                  sciaguraConsapevolezza: character.copricapo.sciaguraConsapevolezza,
                  sciaguraAttacchiADistanza: character.copricapo.sciaguraAttacchiADistanza,
                },
                { sciaguraConsapevolezza: 'Consapevolezza', sciaguraAttacchiADistanza: 'Attacchi a Distanza' }
              )}{' '}
              (automatico dal copricapo scelto)
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-1.5 text-xs uppercase tracking-wide text-parchment-200/60">Armi / Scudo (fino a 3 a portata di mano)</p>
        <div className="flex flex-col gap-2">
          {character.armi.map((w, i) => {
            const isCustom = w.nome !== '' && !ARMI.some((a) => a.nome === w.nome);
            return (
              <div key={i} className="flex flex-col gap-1">
                <div className="grid grid-cols-7 gap-1.5">
                  <select
                    className="col-span-2 text-xs"
                    value={isCustom ? PERSONALIZZATO : w.nome}
                    onChange={(e) => {
                      const armi = [...character.armi];
                      if (e.target.value === PERSONALIZZATO) {
                        armi[i] = { ...w, nome: '' };
                      } else {
                        const stats = ARMI.find((a) => a.nome === e.target.value);
                        if (stats) armi[i] = applyWeapon(stats);
                      }
                      update('armi', armi);
                    }}
                  >
                    <option value="">—</option>
                    {ARMI.map((a) => (
                      <option key={a.nome} value={a.nome}>
                        {a.nome}
                      </option>
                    ))}
                    <option value={PERSONALIZZATO}>Personalizzato</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Imp."
                    value={w.imp}
                    onChange={(e) => {
                      const armi = [...character.armi];
                      armi[i] = { ...w, imp: e.target.value };
                      update('armi', armi);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Portata"
                    value={w.portata}
                    onChange={(e) => {
                      const armi = [...character.armi];
                      armi[i] = { ...w, portata: e.target.value };
                      update('armi', armi);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Danno"
                    value={w.danno}
                    onChange={(e) => {
                      const armi = [...character.armi];
                      armi[i] = { ...w, danno: e.target.value };
                      update('armi', armi);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Durab."
                    value={w.durabilita}
                    onChange={(e) => {
                      const armi = [...character.armi];
                      armi[i] = { ...w, durabilita: e.target.value };
                      update('armi', armi);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Qualità"
                    value={w.qualita}
                    onChange={(e) => {
                      const armi = [...character.armi];
                      armi[i] = { ...w, qualita: e.target.value };
                      update('armi', armi);
                    }}
                  />
                </div>
                {isCustom && (
                  <TextField
                    value={w.nome}
                    onChange={(v) => {
                      const armi = [...character.armi];
                      armi[i] = { ...w, nome: v };
                      update('armi', armi);
                    }}
                    placeholder="Nome arma personalizzata"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}

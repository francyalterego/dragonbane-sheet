
import { useCharacter } from '../../state/CharacterContext';
import { Checkbox, NumberField, SectionCard, TextField } from './fields';

export function CombattimentoSection() {
  const { character, update } = useCharacter();

  return (
    <SectionCard title="Combattimento">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-wide text-parchment-200/60">Armatura</p>
          <div className="flex gap-2">
            <TextField
              label="Nome"
              value={character.armatura.nome}
              onChange={(v) => update('armatura', { ...character.armatura, nome: v })}
              className="flex-1"
            />
            <NumberField
              label="Valore"
              value={character.armatura.valore}
              onChange={(v) => update('armatura', { ...character.armatura, valore: v })}
              className="w-20"
            />
          </div>
          <div className="flex gap-3">
            <Checkbox
              label="Sciagura: Sgattaiolare"
              checked={character.armatura.sciaguraSgattaiolare}
              onChange={(v) => update('armatura', { ...character.armatura, sciaguraSgattaiolare: v })}
            />
            <Checkbox
              label="Sciagura: Sfuggire"
              checked={character.armatura.sciaguraSfuggire}
              onChange={(v) => update('armatura', { ...character.armatura, sciaguraSfuggire: v })}
            />
          </div>
          <Checkbox
            label="Sciagura: Acrobazia"
            checked={character.armatura.sciaguraAcrobazia}
            onChange={(v) => update('armatura', { ...character.armatura, sciaguraAcrobazia: v })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-wide text-parchment-200/60">Copricapo</p>
          <div className="flex gap-2">
            <TextField
              label="Nome"
              value={character.copricapo.nome}
              onChange={(v) => update('copricapo', { ...character.copricapo, nome: v })}
              className="flex-1"
            />
            <NumberField
              label="Valore"
              value={character.copricapo.valore}
              onChange={(v) => update('copricapo', { ...character.copricapo, valore: v })}
              className="w-20"
            />
          </div>
          <Checkbox
            label="Sciagura: Consapevolezza"
            checked={character.copricapo.sciaguraConsapevolezza}
            onChange={(v) => update('copricapo', { ...character.copricapo, sciaguraConsapevolezza: v })}
          />
          <Checkbox
            label="Sciagura: Attacchi a Distanza"
            checked={character.copricapo.sciaguraAttacchiADistanza}
            onChange={(v) => update('copricapo', { ...character.copricapo, sciaguraAttacchiADistanza: v })}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-1.5 text-xs uppercase tracking-wide text-parchment-200/60">Armi / Scudo</p>
        <div className="flex flex-col gap-2">
          {character.armi.map((w, i) => (
            <div key={i} className="grid grid-cols-7 gap-1.5">
              <input
                type="text"
                placeholder="Nome"
                className="col-span-2"
                value={w.nome}
                onChange={(e) => {
                  const armi = [...character.armi];
                  armi[i] = { ...w, nome: e.target.value };
                  update('armi', armi);
                }}
              />
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
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

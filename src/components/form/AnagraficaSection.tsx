import { useCharacter } from '../../state/CharacterContext';
import { ASPETTI, DEBOLEZZE, ETA_CATEGORIE, EtaCategoria, PROFESSIONI, STIRPI } from '../../data/dragonbaneData';
import { SectionCard, SelectField, TextField } from './fields';

const ALTRO = 'Altro';

function rollAspetto() {
  return ASPETTI[Math.floor(Math.random() * ASPETTI.length)];
}

export function AnagraficaSection() {
  const { character, update, applyAgeCategory } = useCharacter();

  const debolezzaIsCustom =
    character.debolezza !== '' && !DEBOLEZZE.some((d) => d.label === character.debolezza);

  return (
    <SectionCard title="Anagrafica">
      <div className="grid grid-cols-2 gap-3">
        <TextField label="Nome del personaggio" value={character.nome} onChange={(v) => update('nome', v)} className="col-span-2" />
        <TextField label="Giocatore" value={character.giocatore} onChange={(v) => update('giocatore', v)} />

        <SelectField label="Stirpe" value={character.stirpe} onChange={(v) => update('stirpe', v)} options={STIRPI} />

        <SelectField
          label="Età"
          value={character.eta}
          onChange={(v) => v && applyAgeCategory(v as EtaCategoria)}
          options={ETA_CATEGORIE}
        />

        <SelectField
          label="Professione"
          value={character.professione}
          onChange={(v) => update('professione', v)}
          options={PROFESSIONI}
        />

        <div className="col-span-2 flex flex-col gap-1.5">
          <label className="flex flex-col gap-1 text-xs text-parchment-200/80">
            <span>Debolezza</span>
            <select
              value={debolezzaIsCustom ? ALTRO : character.debolezza}
              onChange={(e) => update('debolezza', e.target.value === ALTRO ? '' : e.target.value)}
              className="w-full"
            >
              <option value="">—</option>
              {DEBOLEZZE.map((d) => (
                <option key={d.label} value={d.label}>
                  {d.label} — {d.text}
                </option>
              ))}
              <option value={ALTRO}>Altro (scrivi tu)</option>
            </select>
          </label>
          {debolezzaIsCustom && (
            <TextField value={character.debolezza} onChange={(v) => update('debolezza', v)} placeholder="Scrivi la tua debolezza" />
          )}
        </div>

        {([0, 1, 2] as const).map((i) => (
          <div key={i} className="col-span-2 flex items-end gap-2">
            <TextField
              label={`Aspetto (riga ${i + 1})`}
              value={character.aspetto[i]}
              onChange={(v) => {
                const next: [string, string, string] = [...character.aspetto];
                next[i] = v;
                update('aspetto', next);
              }}
              className="flex-1"
            />
            <button
              type="button"
              title="Tira sulla tabella Aspetto del manuale (pag. 29)"
              onClick={() => {
                const next: [string, string, string] = [...character.aspetto];
                next[i] = rollAspetto();
                update('aspetto', next);
              }}
              className="rounded border border-dragon-gold/40 px-2 py-1.5 text-sm hover:bg-dragon-gold/10"
            >
              🎲
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

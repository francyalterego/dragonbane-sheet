import { useCharacter } from '../../state/CharacterContext';
import { ASPETTI, DEBOLEZZE, ETA_CATEGORIE, EtaCategoria, PROFESSIONI, STIRPI, STIRPI_INFO } from '../../data/dragonbaneData';
import { SectionCard, SelectField, TextField } from './fields';

const ALTRO = 'Altro';

function rollAspetto() {
  return ASPETTI[Math.floor(Math.random() * ASPETTI.length)];
}

export function AnagraficaSection() {
  const { character, update, applyAgeCategory } = useCharacter();

  const debolezzaIsCustom =
    character.debolezza !== '' && !DEBOLEZZE.some((d) => d.label === character.debolezza);
  const kin = STIRPI_INFO.find((k) => k.nome === character.stirpe);

  return (
    <SectionCard title="Anagrafica">
      <div className="grid grid-cols-2 gap-3">
        <label className="col-span-2 flex flex-col gap-1 text-xs text-parchment-200/80">
          <span>Nome del personaggio</span>
          <div className="flex gap-2">
            <input type="text" className="flex-1" value={character.nome} onChange={(e) => update('nome', e.target.value)} />
            <button
              type="button"
              disabled={!kin}
              title={kin ? `Tira D6 sui nomi ${kin.nome} (pag. 12-15)` : 'Scegli prima la stirpe'}
              onClick={() => kin && update('nome', kin.nomi[Math.floor(Math.random() * kin.nomi.length)])}
              className="shrink-0 rounded border border-dragon-gold/40 px-2 py-1.5 text-sm hover:bg-dragon-gold/10 disabled:opacity-30"
            >
              🎲
            </button>
          </div>
        </label>
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

        {([0, 1, 2] as const).map((i) => {
          const isCustom = character.aspetto[i] !== '' && !ASPETTI.includes(character.aspetto[i]);
          return (
            <div key={i} className="col-span-2 flex flex-col gap-1.5">
              <label className="flex flex-col gap-1 text-xs text-parchment-200/80">
                <span>Aspetto (riga {i + 1})</span>
                <div className="flex gap-2">
                  <select
                    className="flex-1"
                    value={isCustom ? ALTRO : character.aspetto[i]}
                    onChange={(e) => {
                      const next: [string, string, string] = [...character.aspetto];
                      next[i] = e.target.value === ALTRO ? '' : e.target.value;
                      update('aspetto', next);
                    }}
                  >
                    <option value="">—</option>
                    {ASPETTI.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                    <option value={ALTRO}>Altro (scrivi tu)</option>
                  </select>
                  <button
                    type="button"
                    title="Tira D20 sulla tabella Aspetto (pag. 29)"
                    onClick={() => {
                      const next: [string, string, string] = [...character.aspetto];
                      next[i] = rollAspetto();
                      update('aspetto', next);
                    }}
                    className="shrink-0 rounded border border-dragon-gold/40 px-2 py-1.5 text-sm hover:bg-dragon-gold/10"
                  >
                    🎲
                  </button>
                </div>
              </label>
              {isCustom && (
                <TextField
                  value={character.aspetto[i]}
                  onChange={(v) => {
                    const next: [string, string, string] = [...character.aspetto];
                    next[i] = v;
                    update('aspetto', next);
                  }}
                  placeholder="Scrivi un tratto d'aspetto"
                />
              )}
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

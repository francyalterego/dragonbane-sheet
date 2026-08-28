import { useState } from 'react';
import { useCharacter } from '../../state/CharacterContext';
import { Ability, PROFESSIONI_INFO, STIRPI_INFO } from '../../data/dragonbaneData';
import { SectionCard } from './fields';

function insertLine(list: string[], text: string): string[] {
  const next = [...list];
  const emptyIdx = next.findIndex((l) => l === '');
  if (emptyIdx >= 0) next[emptyIdx] = text;
  else next.push(text);
  return next;
}

function AbilityCard({
  ability,
  onInsert,
}: {
  ability: Ability;
  onInsert: (text: string) => void;
}) {
  return (
    <div className="rounded border border-dragon-gold/20 bg-black/20 p-2">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold text-dragon-gold">
          {ability.nome} <span className="font-normal text-parchment-200/50">(PV: {ability.puntiVolonta})</span>
        </p>
        <button
          type="button"
          onClick={() => onInsert(`${ability.nome}: ${ability.descrizione}`)}
          className="shrink-0 rounded border border-dragon-gold/40 px-2 py-0.5 text-[10px] hover:bg-dragon-gold/10"
        >
          Inserisci
        </button>
      </div>
      <p className="mt-1 text-[11px] leading-snug text-parchment-200/70">{ability.descrizione}</p>
    </div>
  );
}

export function CapacitaIncantesimiSection() {
  const { character, update } = useCharacter();
  const [heroicChoice, setHeroicChoice] = useState(0);

  const kin = STIRPI_INFO.find((k) => k.nome === character.stirpe);
  const prof = PROFESSIONI_INFO.find((p) => p.nome === character.professione);

  return (
    <SectionCard title="Capacità e Incantesimi">
      <p className="mb-3 text-[11px] text-parchment-200/50">
        Pag. 11 e 26 del manuale: la capacità innata (dalla stirpe) e la capacità eroica iniziale (dalla professione)
        vanno scritte qui. Scegli stirpe e professione in Anagrafica, poi premi "Inserisci" per aggiungerle in fondo
        alla lista qui sotto.
      </p>

      {kin && (
        <div className="mb-3">
          <p className="mb-1 text-[10px] uppercase tracking-wide text-parchment-200/50">
            Capacità innata — {kin.nome}
          </p>
          <div className="flex flex-col gap-1.5">
            {kin.capacitaInnate.map((a) => (
              <AbilityCard key={a.nome} ability={a} onInsert={(t) => update('capacitaIncantesimi', insertLine(character.capacitaIncantesimi, t))} />
            ))}
          </div>
        </div>
      )}

      {character.professione === 'Mago' ? (
        <div className="mb-3 rounded border border-dragon-gold/20 bg-black/20 p-2">
          <p className="text-xs text-parchment-200/70">
            Il Mago non ha una capacità eroica iniziale: scegli una scuola di magia (Animismo, Elementalismo o
            Mentalismo — diventa una delle tue abilità allenate), poi 3 incantesimi di grado 1 e 3 trucchetti dalla
            tua scuola o dalla magia comune (pag. 20 e capitolo 5).
          </p>
        </div>
      ) : (
        prof &&
        prof.capacitaEroica.length > 0 && (
          <div className="mb-3">
            <p className="mb-1 text-[10px] uppercase tracking-wide text-parchment-200/50">
              Capacità eroica iniziale — {prof.nome}
              {prof.capacitaEroica.length > 1 ? ' (scegline una)' : ''}
            </p>
            {prof.capacitaEroica.length > 1 && (
              <div className="mb-1.5 flex gap-1.5">
                {prof.capacitaEroica.map((a, i) => (
                  <button
                    key={a.nome}
                    type="button"
                    onClick={() => setHeroicChoice(i)}
                    className={[
                      'rounded border px-2 py-1 text-[11px]',
                      heroicChoice === i ? 'border-dragon-gold bg-dragon-gold/20' : 'border-dragon-gold/30 hover:bg-dragon-gold/10',
                    ].join(' ')}
                  >
                    {a.nome}
                  </button>
                ))}
              </div>
            )}
            <AbilityCard
              ability={prof.capacitaEroica[Math.min(heroicChoice, prof.capacitaEroica.length - 1)]}
              onInsert={(t) => update('capacitaIncantesimi', insertLine(character.capacitaIncantesimi, t))}
            />
          </div>
        )
      )}

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

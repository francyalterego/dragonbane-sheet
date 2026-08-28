import { useState } from 'react';
import { Die } from './Die';
import { useCharacter } from '../../state/CharacterContext';
import { ATTRIBUTES, Attribute } from '../../types/character';

const ATTR_LABELS: Record<Attribute, string> = {
  FOR: 'Forza',
  COS: 'Costituzione',
  AGI: 'Agilità',
  INT: 'Intelligenza',
  VOL: 'Volontà',
  CAR: 'Carisma',
};

type AgeOption = 'giovane' | 'adulto' | 'vecchio';

const AGE_DELTAS: Record<AgeOption, Partial<Record<Attribute, number>>> = {
  giovane: { AGI: 1, COS: 1 },
  adulto: {},
  vecchio: { FOR: -2, AGI: -2, COS: -2, INT: 1, VOL: 1 },
};

function rollD6() {
  return 1 + Math.floor(Math.random() * 6);
}

export function AttributeRoller() {
  const { character, update, setCharacter } = useCharacter();
  const [dice, setDice] = useState<number[] | null>(null);
  const [discardedIndex, setDiscardedIndex] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [swapFirst, setSwapFirst] = useState<Attribute | null>(null);
  const [age, setAge] = useState<AgeOption | ''>('');
  const [appliedAgeDelta, setAppliedAgeDelta] = useState<Partial<Record<Attribute, number>> | null>(null);

  const assignedAttrs = ATTRIBUTES.filter((a) => character.attributes[a] !== '');
  const unassignedAttrs = ATTRIBUTES.filter((a) => character.attributes[a] === '');
  const allAssigned = unassignedAttrs.length === 0;

  const kept = dice ? dice.filter((_, i) => i !== discardedIndex) : [];
  const total = kept.reduce((a, b) => a + b, 0);

  function rollDice() {
    setRolling(true);
    setDiscardedIndex(null);
    const start = Date.now();
    const interval = setInterval(() => {
      setDice([rollD6(), rollD6(), rollD6(), rollD6()]);
      if (Date.now() - start > 550) {
        clearInterval(interval);
        const final = [rollD6(), rollD6(), rollD6(), rollD6()];
        setDice(final);
        const minVal = Math.min(...final);
        setDiscardedIndex(final.indexOf(minVal));
        setRolling(false);
      }
    }, 70);
  }

  function assignTo(attr: Attribute) {
    if (dice === null || discardedIndex === null) return;
    update('attributes', { ...character.attributes, [attr]: total });
    setDice(null);
    setDiscardedIndex(null);
  }

  function handleSwapClick(attr: Attribute) {
    if (!swapFirst) {
      setSwapFirst(attr);
      return;
    }
    if (swapFirst === attr) {
      setSwapFirst(null);
      return;
    }
    const a = character.attributes[swapFirst];
    const b = character.attributes[attr];
    update('attributes', { ...character.attributes, [swapFirst]: b, [attr]: a });
    setSwapFirst(null);
  }

  function applyAge(next: AgeOption) {
    setCharacter((prev) => {
      const attrs = { ...prev.attributes };
      if (appliedAgeDelta) {
        for (const k of Object.keys(appliedAgeDelta) as Attribute[]) {
          if (attrs[k] !== '') attrs[k] = (attrs[k] as number) - (appliedAgeDelta[k] ?? 0);
        }
      }
      const delta = AGE_DELTAS[next];
      for (const k of Object.keys(delta) as Attribute[]) {
        if (attrs[k] !== '') attrs[k] = Math.min(18, (attrs[k] as number) + (delta[k] ?? 0));
      }
      return { ...prev, attributes: attrs };
    });
    setAppliedAgeDelta(AGE_DELTAS[next]);
    setAge(next);
  }

  return (
    <div className="rounded-lg border border-dragon-gold/30 bg-black/20 p-4">
      <h3 className="section-title text-dragon-gold text-sm mb-2">Generazione Attributi</h3>
      <p className="text-xs text-parchment-200/70 mb-3">
        Tira 4D6, scarta il peggiore (cliccalo per cambiarlo), poi assegna il totale a un attributo a tua scelta.
        Puoi scambiare due valori già assegnati e applicare l'aggiustamento per età.
      </p>

      {!allAssigned && (
        <div className="flex flex-col items-center gap-3">
          {dice ? (
            <>
              <div className="flex gap-3">
                {dice.map((v, i) => (
                  <Die
                    key={i}
                    value={v}
                    rolling={rolling}
                    discarded={i === discardedIndex}
                    onClick={rolling ? undefined : () => setDiscardedIndex(i)}
                  />
                ))}
              </div>
              {!rolling && (
                <div className="flex items-center gap-3">
                  <span className="font-display text-dragon-gold text-lg">Totale: {total}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {unassignedAttrs.map((a) => (
                      <button
                        key={a}
                        onClick={() => assignTo(a)}
                        className="rounded border border-dragon-gold/50 px-2 py-1 text-xs hover:bg-dragon-gold/20"
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={rollDice}
              className="rounded-md bg-dragon-red px-4 py-2 font-display text-sm tracking-wide text-parchment-50 shadow hover:brightness-110"
            >
              Tira i dadi ({unassignedAttrs.length} attributi da assegnare)
            </button>
          )}
        </div>
      )}

      {assignedAttrs.length > 0 && (
        <div className="mt-4 border-t border-dragon-gold/20 pt-3">
          <p className="text-xs text-parchment-200/70 mb-1.5">
            Assegnati (clicca due valori per scambiarli):
          </p>
          <div className="flex flex-wrap gap-1.5">
            {assignedAttrs.map((a) => (
              <button
                key={a}
                onClick={() => handleSwapClick(a)}
                title={ATTR_LABELS[a]}
                className={[
                  'rounded border px-2 py-1 text-xs',
                  swapFirst === a
                    ? 'border-dragon-gold bg-dragon-gold/30'
                    : 'border-dragon-gold/40 hover:bg-dragon-gold/10',
                ].join(' ')}
              >
                {a}: {character.attributes[a]}
              </button>
            ))}
          </div>
        </div>
      )}

      {allAssigned && (
        <div className="mt-4 border-t border-dragon-gold/20 pt-3">
          <p className="text-xs text-parchment-200/70 mb-1.5">Aggiustamento per età:</p>
          <div className="flex gap-1.5">
            {(['giovane', 'adulto', 'vecchio'] as AgeOption[]).map((opt) => (
              <button
                key={opt}
                onClick={() => applyAge(opt)}
                className={[
                  'rounded border px-2 py-1 text-xs capitalize',
                  age === opt ? 'border-dragon-gold bg-dragon-gold/30' : 'border-dragon-gold/40 hover:bg-dragon-gold/10',
                ].join(' ')}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

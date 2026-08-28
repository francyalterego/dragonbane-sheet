
import { useCharacter } from '../../state/CharacterContext';
import { NumberField, SectionCard, TextField } from './fields';

export function InventarioSection() {
  const { character, update } = useCharacter();

  return (
    <SectionCard title="Inventario">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs uppercase tracking-wide text-parchment-200/60">Oggetti (10 slot)</p>
          <div className="flex flex-col gap-1.5">
            {character.inventario.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-4 text-xs text-parchment-200/50">{i + 1}</span>
                <input
                  type="text"
                  className="flex-1"
                  value={item.text}
                  onChange={(e) => {
                    const inv = [...character.inventario];
                    inv[i] = { text: e.target.value };
                    update('inventario', inv);
                  }}
                />
              </div>
            ))}
          </div>
          <TextField label="Cimelio" value={character.cimelio} onChange={(v) => update('cimelio', v)} className="mt-3" />
        </div>

        <div className="flex flex-col gap-3">
          <TextField
            label="Oggetti minuscoli"
            value={character.oggettiMinuscoli}
            onChange={(v) => update('oggettiMinuscoli', v)}
          />
          <TextField
            label="Peso trasportabile"
            value={character.pesoTrasportabile}
            onChange={(v) => update('pesoTrasportabile', v)}
          />
          <div className="grid grid-cols-3 gap-2">
            <NumberField label="Oro" value={character.oro} onChange={(v) => update('oro', v)} />
            <NumberField label="Argento" value={character.argento} onChange={(v) => update('argento', v)} />
            <NumberField label="Rame" value={character.rame} onChange={(v) => update('rame', v)} />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

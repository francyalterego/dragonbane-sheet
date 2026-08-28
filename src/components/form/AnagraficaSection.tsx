
import { useCharacter } from '../../state/CharacterContext';
import { SectionCard, TextField } from './fields';

export function AnagraficaSection() {
  const { character, update } = useCharacter();

  return (
    <SectionCard title="Anagrafica">
      <div className="grid grid-cols-2 gap-3">
        <TextField label="Nome del personaggio" value={character.nome} onChange={(v) => update('nome', v)} className="col-span-2" />
        <TextField label="Giocatore" value={character.giocatore} onChange={(v) => update('giocatore', v)} />
        <TextField label="Stirpe" value={character.stirpe} onChange={(v) => update('stirpe', v)} />
        <TextField label="Età" value={character.eta} onChange={(v) => update('eta', v)} />
        <TextField label="Professione" value={character.professione} onChange={(v) => update('professione', v)} />
        <TextField label="Debolezza" value={character.debolezza} onChange={(v) => update('debolezza', v)} className="col-span-2" />
        <TextField
          label="Aspetto (riga 1)"
          value={character.aspetto[0]}
          onChange={(v) => update('aspetto', [v, character.aspetto[1], character.aspetto[2]])}
          className="col-span-2"
        />
        <TextField
          label="Aspetto (riga 2)"
          value={character.aspetto[1]}
          onChange={(v) => update('aspetto', [character.aspetto[0], v, character.aspetto[2]])}
          className="col-span-2"
        />
        <TextField
          label="Aspetto (riga 3)"
          value={character.aspetto[2]}
          onChange={(v) => update('aspetto', [character.aspetto[0], character.aspetto[1], v])}
          className="col-span-2"
        />
      </div>
    </SectionCard>
  );
}

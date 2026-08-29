// Tabelle ufficiali di armi e armature, Manuale dei Giocatori di Dragonbane, cap. 6 "Attrezzatura" (pag. 74-75).

export interface WeaponStats {
  nome: string;
  imp: string; // impugnatura: 1M / 2M
  for: string; // requisito di FOR, "—" se nessuno, "FOR×2" per lancia corta
  portata: string;
  danno: string;
  durabilita: string;
  qualita: string;
}

export const ARMI: WeaponStats[] = [
  { nome: 'Mani Nude', imp: '—', for: '—', portata: '2', danno: 'D6', durabilita: '—', qualita: 'Contundente' },
  { nome: 'Oggetto Contundente, Leggero', imp: '1M', for: '—', portata: 'FOR', danno: 'D8', durabilita: '3', qualita: 'Contundente, può essere lanciato' },
  { nome: 'Oggetto Contundente, Pesante', imp: '2M', for: '16', portata: '2', danno: '2D8', durabilita: '3', qualita: 'Contundente' },
  { nome: 'Coltello', imp: '1M', for: '—', portata: 'FOR', danno: 'D8', durabilita: '6', qualita: 'Infido, perforante, può essere lanciato' },
  { nome: 'Pugnale', imp: '1M', for: '—', portata: 'FOR', danno: 'D8', durabilita: '9', qualita: 'Infido, perforante, tagliente, può essere lanciato' },
  { nome: 'Manosinistra', imp: '1M', for: '—', portata: '2', danno: 'D6', durabilita: '15', qualita: 'Infida, perforante, tagliente' },
  { nome: 'Spada Corta', imp: '1M', for: '7', portata: '2', danno: 'D10', durabilita: '12', qualita: 'Perforante, tagliente' },
  { nome: 'Spada', imp: '1M', for: '10', portata: '2', danno: '2D6', durabilita: '15', qualita: 'Perforante, tagliente' },
  { nome: 'Spada Lunga', imp: '1M', for: '13', portata: '2', danno: '2D8', durabilita: '15', qualita: 'Perforante, tagliente' },
  { nome: 'Spadone', imp: '2M', for: '16', portata: '2', danno: '2D10', durabilita: '15', qualita: 'Perforante, tagliente' },
  { nome: 'Scimitarra', imp: '1M', for: '10', portata: '2', danno: '2D6', durabilita: '12', qualita: 'Intralciante, tagliente' },
  { nome: 'Accetta', imp: '1M', for: '7', portata: 'FOR', danno: '2D6', durabilita: '9', qualita: 'Intralciante, tagliente, può essere lanciata' },
  { nome: 'Ascia da Battaglia', imp: '1M', for: '13', portata: '2', danno: '2D8', durabilita: '9', qualita: 'Intralciante, tagliente' },
  { nome: 'Ascia a Due Mani', imp: '2M', for: '16', portata: '2', danno: '2D10', durabilita: '9', qualita: 'Intralciante, tagliente' },
  { nome: 'Mazza', imp: '1M', for: '7', portata: '2', danno: '2D4', durabilita: '12', qualita: 'Contundente' },
  { nome: 'Mazza Chiodata', imp: '1M', for: '13', portata: '2', danno: '2D8', durabilita: '12', qualita: 'Contundente' },
  { nome: 'Flagello', imp: '1M', for: '13', portata: '2', danno: '2D8', durabilita: '—', qualita: 'Contundente, intralciante, non para' },
  { nome: "Martello d'Arme, Leggero", imp: '1M', for: '10', portata: '2', danno: '2D6', durabilita: '12', qualita: 'Contundente, intralciante' },
  { nome: "Martello d'Arme, Pesante", imp: '2M', for: '16', portata: '2', danno: '2D10', durabilita: '12', qualita: 'Contundente, intralciante' },
  { nome: 'Clava, Piccola', imp: '1M', for: '7', portata: '2', danno: 'D8', durabilita: '9', qualita: 'Contundente' },
  { nome: 'Clava, Grande', imp: '2M', for: '16', portata: '2', danno: '2D8', durabilita: '12', qualita: 'Contundente' },
  { nome: 'Bastone', imp: '2M', for: '7', portata: '2', danno: 'D8', durabilita: '9', qualita: 'Contundente, intralciante' },
  { nome: 'Lancia Corta', imp: '1M', for: '7', portata: 'FOR×2', danno: 'D10', durabilita: '9', qualita: 'Perforante, può essere lanciata' },
  { nome: 'Lancia Lunga', imp: '2M', for: '10', portata: '4', danno: '2D8', durabilita: '9', qualita: 'Lunga, perforante' },
  { nome: 'Lancia da Cavalleria', imp: '1M', for: '13', portata: '4', danno: '2D10', durabilita: '12', qualita: 'Lunga, perforante, richiede una cavalcatura addestrata' },
  { nome: 'Alabarda', imp: '2M', for: '13', portata: '4', danno: '2D8', durabilita: '12', qualita: 'Lunga, intralciante, perforante, tagliente' },
  { nome: 'Tridente', imp: '1M', for: '10', portata: 'FOR', danno: '2D6', durabilita: '9', qualita: 'Intralciante, perforante, può essere lanciato' },
  { nome: 'Scudo, Piccolo', imp: '1M', for: '7', portata: '2', danno: 'D8', durabilita: '15', qualita: 'Contundente' },
  { nome: 'Scudo, Grande', imp: '1M', for: '13', portata: '2', danno: 'D8', durabilita: '18', qualita: 'Contundente' },
  { nome: 'Frombola', imp: '1M', for: '—', portata: '20', danno: 'D8', durabilita: '—', qualita: 'Contundente, oggetto minuscolo' },
  { nome: 'Arco Corto', imp: '2M', for: '7', portata: '30', danno: 'D10', durabilita: '3', qualita: 'Perforante, richiede faretra' },
  { nome: 'Arco Lungo', imp: '2M', for: '13', portata: '100', danno: 'D12', durabilita: '6', qualita: 'Perforante, richiede faretra' },
  { nome: 'Balestra, Leggera', imp: '2M', for: '7', portata: '40', danno: '2D6', durabilita: '6', qualita: 'Perforante, richiede faretra, nessun danno bonus' },
  { nome: 'Balestra, Pesante', imp: '2M', for: '13', portata: '60', danno: '2D8', durabilita: '9', qualita: 'Perforante, richiede faretra, nessun danno bonus' },
  { nome: 'Balestrino', imp: '1M', for: '7', portata: '30', danno: '2D6', durabilita: '6', qualita: 'Perforante, richiede faretra, nessun danno bonus' },
];

export interface ArmorStats {
  nome: string;
  valore: number;
  valoreLabel?: string; // per i copricapi, che sono un bonus "+1"/"+2" e non un valore assoluto
  sciagure: string[]; // nomi delle abilità (come su ATTRIBUTES/SKILL_DEFS) colpite da sciagura
}

export const ARMATURE: ArmorStats[] = [
  { nome: 'Cuoio', valore: 1, sciagure: [] },
  { nome: 'Cuoio Borchiato', valore: 2, sciagure: ['Sgattaiolare'] },
  { nome: 'Cotta di Maglia', valore: 4, sciagure: ['Sfuggire', 'Sgattaiolare'] },
  { nome: 'Piastre', valore: 6, sciagure: ['Acrobazia', 'Sfuggire', 'Sgattaiolare'] },
];

export const COPRICAPI: ArmorStats[] = [
  { nome: 'Celata', valore: 1, valoreLabel: '+1', sciagure: ['Consapevolezza'] },
  { nome: 'Grande Elmo', valore: 2, valoreLabel: '+2', sciagure: ['Consapevolezza', 'Attacchi a Distanza'] },
];

export function applyArmor(stats: ArmorStats) {
  return {
    nome: stats.nome,
    valore: stats.valore,
    sciaguraSgattaiolare: stats.sciagure.includes('Sgattaiolare'),
    sciaguraSfuggire: stats.sciagure.includes('Sfuggire'),
    sciaguraAcrobazia: stats.sciagure.includes('Acrobazia'),
  };
}

export function applyHelmet(stats: ArmorStats) {
  return {
    nome: stats.nome,
    valore: stats.valore,
    sciaguraConsapevolezza: stats.sciagure.includes('Consapevolezza'),
    sciaguraAttacchiADistanza: stats.sciagure.includes('Attacchi a Distanza'),
  };
}

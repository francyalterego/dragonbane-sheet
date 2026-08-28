export type Attribute = 'FOR' | 'COS' | 'AGI' | 'INT' | 'VOL' | 'CAR';

export const ATTRIBUTES: Attribute[] = ['FOR', 'COS', 'AGI', 'INT', 'VOL', 'CAR'];

export type Condition =
  | 'ESAUSTO'
  | 'MALATICCIO'
  | 'DISORIENTATO'
  | 'ARRABBIATO'
  | 'SPAVENTATO'
  | 'SCORAGGIATO';

export interface Skill {
  name: string;
  attribute: Attribute;
  value: number | '';
}

export interface WeaponSkill {
  name: string;
  attribute: Attribute;
  value: number | '';
}

export interface SecondarySkill {
  name: string;
  attribute: Attribute | '';
  value: number | '';
}

export interface InventoryItem {
  text: string;
}

export interface WeaponRow {
  nome: string;
  imp: string;
  portata: string;
  danno: string;
  durabilita: string;
  qualita: string;
}

export interface Character {
  giocatore: string;
  nome: string;
  stirpe: string;
  eta: string;
  professione: string;
  debolezza: string;
  aspetto: [string, string, string];

  attributes: Record<Attribute, number | ''>;
  conditions: Record<Condition, boolean>;

  dannoBonusFor: string;
  dannoBonusAgi: string;
  movimento: number | '';

  capacitaIncantesimi: string[];

  skills: Skill[];
  weaponSkills: WeaponSkill[];
  secondarySkills: SecondarySkill[];

  cimelio: string;
  inventario: InventoryItem[];
  oggettiMinuscoli: string;
  oro: number | '';
  argento: number | '';
  rame: number | '';
  pesoTrasportabile: string;

  armatura: { nome: string; valore: number | ''; sciaguraSgattaiolare: boolean; sciaguraSfuggire: boolean; sciaguraAcrobazia: boolean };
  copricapo: { nome: string; valore: number | ''; sciaguraConsapevolezza: boolean; sciaguraAttacchiADistanza: boolean };
  armi: WeaponRow[];

  puntiVolontaMax: number | '';
  puntiVolontaAttuali: number | '';
  puntiFeritaMax: number | '';
  puntiFeritaAttuali: number | '';
  tiriMorteSuccessi: number; // 0-3
  tiriMorteFallimenti: number; // 0-3
  roundDiRiposo: boolean;
  intervalloDiRiposo: boolean;
}

export const SKILL_DEFS: { name: string; attribute: Attribute }[] = [
  { name: 'Acrobazia', attribute: 'AGI' },
  { name: 'Artigianato', attribute: 'FOR' },
  { name: 'Caccia e Pesca', attribute: 'AGI' },
  { name: 'Cavalcare', attribute: 'AGI' },
  { name: 'Consapevolezza', attribute: 'INT' },
  { name: 'Contrattare', attribute: 'CAR' },
  { name: 'Esibirsi', attribute: 'CAR' },
  { name: 'Guarire', attribute: 'INT' },
  { name: 'Imbrogliare', attribute: 'CAR' },
  { name: 'Linguaggi', attribute: 'INT' },
  { name: 'Localizzare', attribute: 'INT' },
  { name: 'Miti e Leggende', attribute: 'INT' },
  { name: 'Navigare', attribute: 'INT' },
  { name: 'Nuotare', attribute: 'AGI' },
  { name: 'Persuadere', attribute: 'CAR' },
  { name: 'Rapidità di Mano', attribute: 'AGI' },
  { name: 'Sapienza Animale', attribute: 'INT' },
  { name: 'Sfuggire', attribute: 'AGI' },
  { name: 'Sgattaiolare', attribute: 'AGI' },
  { name: 'Sopravvivenza', attribute: 'INT' },
];

export const WEAPON_SKILL_DEFS: { name: string; attribute: Attribute }[] = [
  { name: 'Archi', attribute: 'AGI' },
  { name: 'Asce', attribute: 'FOR' },
  { name: 'Balestre', attribute: 'AGI' },
  { name: 'Bastoni', attribute: 'AGI' },
  { name: 'Coltelli', attribute: 'AGI' },
  { name: 'Frombole', attribute: 'AGI' },
  { name: 'Lance', attribute: 'FOR' },
  { name: 'Martelli', attribute: 'FOR' },
  { name: 'Rissa', attribute: 'FOR' },
  { name: 'Spade', attribute: 'FOR' },
];

export function createEmptyCharacter(): Character {
  return {
    giocatore: '',
    nome: '',
    stirpe: '',
    eta: '',
    professione: '',
    debolezza: '',
    aspetto: ['', '', ''],
    attributes: { FOR: '', COS: '', AGI: '', INT: '', VOL: '', CAR: '' },
    conditions: {
      ESAUSTO: false,
      MALATICCIO: false,
      DISORIENTATO: false,
      ARRABBIATO: false,
      SPAVENTATO: false,
      SCORAGGIATO: false,
    },
    dannoBonusFor: '',
    dannoBonusAgi: '',
    movimento: '',
    capacitaIncantesimi: Array(8).fill(''),
    skills: SKILL_DEFS.map((s) => ({ ...s, value: '' })),
    weaponSkills: WEAPON_SKILL_DEFS.map((s) => ({ ...s, value: '' })),
    secondarySkills: Array(5)
      .fill(null)
      .map(() => ({ name: '', attribute: '', value: '' })),
    cimelio: '',
    inventario: Array(10)
      .fill(null)
      .map(() => ({ text: '' })),
    oggettiMinuscoli: '',
    oro: '',
    argento: '',
    rame: '',
    pesoTrasportabile: '',
    armatura: { nome: '', valore: '', sciaguraSgattaiolare: false, sciaguraSfuggire: false, sciaguraAcrobazia: false },
    copricapo: { nome: '', valore: '', sciaguraConsapevolezza: false, sciaguraAttacchiADistanza: false },
    armi: Array(3)
      .fill(null)
      .map(() => ({ nome: '', imp: '', portata: '', danno: '', durabilita: '', qualita: '' })),
    puntiVolontaMax: '',
    puntiVolontaAttuali: '',
    puntiFeritaMax: '',
    puntiFeritaAttuali: '',
    tiriMorteSuccessi: 0,
    tiriMorteFallimenti: 0,
    roundDiRiposo: false,
    intervalloDiRiposo: false,
  };
}

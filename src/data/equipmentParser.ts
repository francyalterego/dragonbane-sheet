// Traduce il testo in prosa di un set di "Attrezzatura Iniziale" (pag. 16-24 del manuale) in
// righe strutturate per Armi/Armatura/Copricapo/Inventario/Monete. Approccio prudente: un
// segmento finisce in Armi/Armatura solo quando lo riconosciamo con certezza (nome esatto o
// alias noto); in caso di dubbio resta come riga di testo in Inventario, non assegniamo mai
// statistiche indovinate.
import { ARMATURE, ARMI, ArmorStats, COPRICAPI, WeaponStats } from './equipmentTables';
import { WeaponRow } from '../types/character';

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[()]/g, '')
    .trim();
}

// segmento (normalizzato) -> nome esatto in ARMI/ARMATURE/COPRICAPI
const WEAPON_ALIASES: Record<string, string> = {
  "martello d'arme leggero": "Martello d'Arme, Leggero",
  "martello d'arme pesante": "Martello d'Arme, Pesante",
  'scudo piccolo': 'Scudo, Piccolo',
  'scudo grande': 'Scudo, Grande',
  'balestra leggera': 'Balestra, Leggera',
  'balestra pesante': 'Balestra, Pesante',
  'ascia da battaglia': 'Ascia da Battaglia',
  'mazza chiodata': 'Mazza Chiodata',
  'clava piccola': 'Clava, Piccola',
  'clava grande': 'Clava, Grande',
};
const ARMOR_ALIASES: Record<string, string> = {
  'armatura di cuoio': 'Cuoio',
  'armatura di cuoio borchiato': 'Cuoio Borchiato',
  'armatura a piastre': 'Piastre',
  'cuoio borchiato': 'Cuoio Borchiato',
};
const HELMET_ALIASES: Record<string, string> = {
  'grande elmo': 'Grande Elmo',
};

const WEAPON_BY_NORM = new Map(ARMI.map((a) => [normalize(a.nome), a]));
const ARMOR_BY_NORM = new Map(ARMATURE.map((a) => [normalize(a.nome), a]));
const HELMET_BY_NORM = new Map(COPRICAPI.map((a) => [normalize(a.nome), a]));

function findWeapon(norm: string): WeaponStats | null {
  if (WEAPON_BY_NORM.has(norm)) return WEAPON_BY_NORM.get(norm)!;
  if (WEAPON_ALIASES[norm]) return WEAPON_BY_NORM.get(normalize(WEAPON_ALIASES[norm])) ?? null;
  return null;
}
function findArmor(norm: string): ArmorStats | null {
  if (ARMOR_BY_NORM.has(norm)) return ARMOR_BY_NORM.get(norm)!;
  if (ARMOR_ALIASES[norm]) return ARMOR_BY_NORM.get(normalize(ARMOR_ALIASES[norm])) ?? null;
  return null;
}
function findHelmet(norm: string): ArmorStats | null {
  if (HELMET_BY_NORM.has(norm)) return HELMET_BY_NORM.get(norm)!;
  if (HELMET_ALIASES[norm]) return HELMET_BY_NORM.get(normalize(HELMET_ALIASES[norm])) ?? null;
  return null;
}

function rollDie(sides: number): number {
  return 1 + Math.floor(Math.random() * sides);
}

function weaponRow(stats: WeaponStats): WeaponRow {
  return { nome: stats.nome, imp: stats.imp, portata: stats.portata, danno: stats.danno, durabilita: stats.durabilita, qualita: stats.qualita };
}

export interface ParsedEquipment {
  armi: WeaponRow[];
  armatura: { nome: string; valore: number } | null;
  copricapo: { nome: string; valore: number } | null;
  inventario: string[];
  oro: number;
  argento: number;
  rame: number;
  note: string[]; // scelte fatte in automatico da segnalare all'utente (es. alternative con "/")
}

export function parseEquipmentSet(text: string): ParsedEquipment {
  const result: ParsedEquipment = { armi: [], armatura: null, copricapo: null, inventario: [], oro: 0, argento: 0, rame: 0, note: [] };

  const segments = text.split(',').map((s) => s.trim()).filter(Boolean);

  for (let raw of segments) {
    // alternative separate da "/": scegliamo la prima e lo segnaliamo
    if (raw.includes('/')) {
      const alts = raw.split('/').map((s) => s.trim());
      result.note.push(`"${raw}": scelta in automatico "${alts[0]}", cambiala pure in Combattimento`);
      raw = alts[0];
    }

    // quantità testuale ("due pugnali", "tre frecce"...): singolari noti dei plurali che
    // compaiono nelle liste di attrezzatura ufficiali. Deliberatamente non generico: una
    // depluralizzazione automatica dell'italiano sbaglierebbe più di quanto azzecchi.
    const KNOWN_PLURALS: Record<string, string> = { pugnali: 'pugnale', coltelli: 'coltello', frecce: 'freccia' };
    let count = 1;
    let rest = raw;
    const qtyMatch = raw.match(/^(due|tre)\s+(.*)/i);
    if (qtyMatch) {
      count = qtyMatch[1].toLowerCase() === 'due' ? 2 : 3;
      const word = qtyMatch[2].trim().toLowerCase();
      rest = KNOWN_PLURALS[word] ?? qtyMatch[2];
    }

    // dadi di monete/razioni: "D8 argento", "D6 razioni di cibo"
    const diceMatch = raw.match(/^D(\d+)\s+(razioni di cibo|argento|oro|rame)$/i);
    if (diceMatch) {
      const sides = Number(diceMatch[1]);
      const kind = diceMatch[2].toLowerCase();
      const rolled = rollDie(sides);
      if (kind === 'razioni di cibo') result.inventario.push(`${rolled} razioni di cibo`);
      else if (kind === 'argento') result.argento += rolled;
      else if (kind === 'oro') result.oro += rolled;
      else if (kind === 'rame') result.rame += rolled;
      continue;
    }

    const norm = normalize(rest);
    const weapon = findWeapon(norm);
    if (weapon && result.armi.length < 3) {
      for (let i = 0; i < count && result.armi.length < 3; i++) result.armi.push(weaponRow(weapon));
      continue;
    }
    const armor = findArmor(norm);
    if (armor) {
      result.armatura = { nome: armor.nome, valore: armor.valore };
      continue;
    }
    const helmet = findHelmet(norm);
    if (helmet) {
      result.copricapo = { nome: helmet.nome, valore: helmet.valore };
      continue;
    }

    // non riconosciuto con certezza: resta come oggetto in Inventario, capitalizzato
    result.inventario.push(raw.charAt(0).toUpperCase() + raw.slice(1));
  }

  return result;
}

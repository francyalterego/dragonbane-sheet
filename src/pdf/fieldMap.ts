// Coordinate in punti PDF (origine in basso a sinistra), estratte con precisione
// dal testo del template originale (src/assets/scheda-template.pdf) via pdfjs-dist,
// più stime per gli elementi grafici (cerchi, caselle, pallini) che non sono testo.
// Valori da rifinire visivamente: vedi scripts/generate-test-fill.ts

export const PAGE = { width: 612.283, height: 790.866 };

export interface FieldPos {
  x: number;
  y: number;
  size?: number;
  align?: 'left' | 'center' | 'right';
}

export const HEADER: Record<string, FieldPos> = {
  giocatore: { x: 98, y: 761, size: 8 },
  stirpe: { x: 70, y: 744, size: 8 },
  eta: { x: 168, y: 744, size: 8 },
  professione: { x: 112, y: 727, size: 8 },
  debolezza: { x: 112, y: 709, size: 6.5 },
  nome: { x: 306, y: 671, size: 13, align: 'center' },
};

// Debolezza/Cimelio/Aspetto vanno a capo se lunghi (vedi drawWrappedText in fillPdf.ts).
// Le posizioni di partenza restano quelle delle righe stampate; con lineHeight stretto le
// eventuali righe aggiuntive restano comunque nello spazio libero prima della riga successiva.
export const DEBOLEZZA_WRAP = { maxWidth: 290, lineHeight: 8, maxLines: 3 };

export interface WrapPos extends Omit<FieldPos, 'size'> {
  size: number;
  maxWidth: number;
  lineHeight: number;
  maxLines: number;
}

export const ASPETTO: WrapPos[] = [
  { x: 462, y: 761, size: 6.5, maxWidth: 140, lineHeight: 7.5, maxLines: 2 },
  { x: 413, y: 744, size: 6.5, maxWidth: 190, lineHeight: 7.5, maxLines: 2 },
  { x: 413, y: 727, size: 6.5, maxWidth: 190, lineHeight: 7.5, maxLines: 2 },
];

// Centri dei cerchi misurati per analisi pixel (fanno parte dell'immagine di sfondo,
// non sono oggetti vettoriali: la posizione delle etichette testuali non basta a dedurli).
export const ATTRIBUTE_X: Record<string, number> = {
  FOR: 160.5,
  COS: 218.3,
  AGI: 276.3,
  INT: 334.9,
  VOL: 393.0,
  CAR: 450.6,
};

export const ATTRIBUTE_VALUE_Y = 626;
export const CONDITION_Y = 592.45;
export const CONDITION_CHECK_DX = -29; // offset checkbox rispetto al centro del cerchio attributo

export const DANNO_MOVIMENTO: Record<string, FieldPos> = {
  dannoBonusFor: { x: 148, y: 554.38, size: 8 },
  dannoBonusAgi: { x: 335, y: 554.38, size: 8 },
  movimento: { x: 520, y: 554.38, size: 8, align: 'center' },
};

export const CAPACITA_INCANTESIMI = {
  x: 22,
  yStart: 507,
  rowHeight: 12.6,
  size: 7,
};

export const SKILLS = {
  nameX: 221.24,
  valueX: 200,
  yStart: 496.05,
  rowHeight: 14.175,
  size: 8,
};

export const WEAPON_SKILLS = {
  nameX: 348.01,
  valueX: 325,
  yStart: 481.87,
  rowHeight: 14.175,
  size: 8,
};

export const SECONDARY_SKILLS = {
  // Stessa colonna di ABILITÀ CON ARMI (x=348 nome, x=325 valore), continua sotto di essa
  nameX: 348.01,
  valueX: 325,
  yStart: 311.79,
  rowHeight: 14.175,
  size: 7.5,
};

export const INVENTORY = {
  valueX: 470,
  yStart: 498.91,
  rowHeight: 14.175,
  size: 7.5,
  cimelioY: 340,
  cimelioX: 452,
  cimelioWrap: { maxWidth: 148, lineHeight: 8.5, maxLines: 3 },
};

export const RESOURCES: Record<string, FieldPos> = {
  oro: { x: 90, y: 274.39, size: 7.5 },
  argento: { x: 90, y: 244.91, size: 7.5 },
  rame: { x: 90, y: 215.12, size: 7.5 },
  oggettiMinuscoli: { x: 462, y: 265, size: 7 },
  pesoTrasportabile: { x: 600, y: 536.13, size: 6.5, align: 'right' },
};

export const ARMOR: Record<string, FieldPos> = {
  armaturaNome: { x: 100, y: 165, size: 7 },
  armaturaValore: { x: 40, y: 165, size: 9, align: 'center' },
  copricapoNome: { x: 266, y: 165, size: 7 },
  copricapoValore: { x: 232, y: 165, size: 9, align: 'center' },
};

export const WEAPONS_TABLE = {
  nomeX: 55.64,
  impX: 142.52,
  portataX: 172.49,
  dannoX: 220.51,
  durabX: 265.02,
  qualitaX: 309.34,
  yStart: 78,
  rowHeight: 14.5,
  size: 6.5,
};

export const RIPOSO: Record<string, FieldPos> = {
  roundDiRiposo: { x: 405, y: 185.5, size: 8 },
  intervalloDiRiposo: { x: 487, y: 185.5, size: 8 },
};

// Solo il massimo va scritto qui (in nero, nello spazio bianco sotto l'etichetta):
// i pallini di PV/PF attuali li spunta a matita il giocatore durante il gioco.
export const PV_PF = {
  volontaMax: { x: 421, y: 150, size: 10, align: 'left' } as FieldPos,
  feritaMax: { x: 421, y: 83.5, size: 10, align: 'left' } as FieldPos,
};

export const TIRI_MORTE = {
  successiX: 490,
  fallimentiX: 536,
  y: 38,
  size: 9,
};

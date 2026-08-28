// Script di calibrazione: riempie il template con valori di prova per verificare
// visivamente le coordinate di fieldMap.ts prima di collegare l'app React.
const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

const INK = rgb(0.09, 0.08, 0.07);

const HEADER = {
  giocatore: { x: 98, y: 761, size: 8 },
  stirpe: { x: 70, y: 744, size: 8 },
  eta: { x: 168, y: 744, size: 8 },
  professione: { x: 112, y: 727, size: 8 },
  debolezza: { x: 112, y: 709, size: 8 },
  aspetto1: { x: 462, y: 761, size: 7 },
  aspetto2: { x: 413, y: 744, size: 7 },
  aspetto3: { x: 413, y: 727, size: 7 },
  nome: { x: 306, y: 665, size: 13, align: 'center' },
};

const ATTRIBUTE_X = { FOR: 153.35, COS: 211.09, AGI: 270.59, INT: 328.61, VOL: 386.21, CAR: 444.4 };
const ATTRIBUTE_VALUE_Y = 617;
const CONDITION_Y = 592.45;
const CONDITION_CHECK_DX = -22;

const DANNO_MOVIMENTO = {
  dannoBonusFor: { x: 148, y: 554.38, size: 8 },
  dannoBonusAgi: { x: 335, y: 554.38, size: 8 },
  movimento: { x: 520, y: 554.38, size: 8, align: 'center' },
};

const CAPACITA = { x: 22, yStart: 507, rowHeight: 12.6, size: 7 };
const SKILLS = { nameX: 221.24, valueX: 200, yStart: 496.05, rowHeight: 14.175, size: 8 };
const WEAPON_SKILLS = { nameX: 348.01, valueX: 325, yStart: 481.87, rowHeight: 14.175, size: 8 };
const SECONDARY_SKILLS = { nameX: 348.01, valueX: 325, yStart: 311.79, rowHeight: 14.175, size: 7.5 };
const INVENTORY = { valueX: 470, yStart: 498.91, rowHeight: 14.175, size: 7.5, cimelioY: 340, cimelioX: 452 };
const RESOURCES = {
  oro: { x: 90, y: 274.39, size: 7.5 },
  argento: { x: 90, y: 244.91, size: 7.5 },
  rame: { x: 90, y: 215.12, size: 7.5 },
  oggettiMinuscoli: { x: 462, y: 265, size: 7 },
  pesoTrasportabile: { x: 560, y: 536.13, size: 7, align: 'center' },
};
const ARMOR = {
  armaturaNome: { x: 100, y: 165, size: 7 },
  armaturaValore: { x: 40, y: 165, size: 9, align: 'center' },
  copricapoNome: { x: 266, y: 165, size: 7 },
  copricapoValore: { x: 232, y: 165, size: 9, align: 'center' },
};
const WEAPONS_TABLE = {
  nomeX: 55.64, impX: 142.52, portataX: 172.49, dannoX: 220.51, durabX: 265.02, qualitaX: 309.34,
  yStart: 78, rowHeight: 14.5, size: 7,
};
const RIPOSO = {
  roundDiRiposo: { x: 405, y: 185.5 },
  intervalloDiRiposo: { x: 487, y: 185.5 },
};
const PV_PF = {
  volontaLabel: { x: 500, y: 163.07, size: 9, align: 'center' },
  feritaLabel: { x: 500, y: 96.87, size: 9, align: 'center' },
};
const TIRI_MORTE = { successiX: 490, fallimentiX: 536, y: 38, size: 9 };

const SKILL_NAMES = ['Acrobazia','Artigianato','Caccia e Pesca','Cavalcare','Consapevolezza','Contrattare','Esibirsi','Guarire','Imbrogliare','Linguaggi','Localizzare','Miti e Leggende','Navigare','Nuotare','Persuadere','Rapidità di Mano','Sapienza Animale','Sfuggire','Sgattaiolare','Sopravvivenza'];
const WEAPON_SKILL_NAMES = ['Archi','Asce','Balestre','Bastoni','Coltelli','Frombole','Lance','Martelli','Rissa','Spade'];

function drawText(page, font, text, pos, fallbackSize = 8) {
  if (!text && text !== 0) return;
  text = String(text);
  const size = pos.size || fallbackSize;
  let x = pos.x;
  if (pos.align === 'center') x = pos.x - font.widthOfTextAtSize(text, size) / 2;
  else if (pos.align === 'right') x = pos.x - font.widthOfTextAtSize(text, size);
  page.drawText(text, { x, y: pos.y, size, font, color: INK });
}
function drawCheck(page, font, x, y, size = 8) {
  page.drawText('X', { x, y, size, font, color: INK });
}

(async () => {
  const bytes = fs.readFileSync(path.join(__dirname, '..', 'src/assets/scheda-template.pdf'));
  const pdfDoc = await PDFDocument.load(bytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.getPage(0);

  drawText(page, font, 'Mario Rossi', HEADER.giocatore);
  drawText(page, font, 'Umano', HEADER.stirpe);
  drawText(page, font, '27', HEADER.eta);
  drawText(page, font, 'Cacciatore', HEADER.professione);
  drawText(page, font, 'Avido', HEADER.debolezza);
  drawText(page, font, 'Alto e magro', HEADER.aspetto1);
  drawText(page, font, 'Cicatrice sul volto', HEADER.aspetto2);
  drawText(page, font, 'Mantello verde', HEADER.aspetto3);
  drawText(page, fontBold, 'Aldric Silente', HEADER.nome);

  const attrVals = { FOR: 12, COS: 14, AGI: 16, INT: 10, VOL: 13, CAR: 8 };
  for (const [attr, x] of Object.entries(ATTRIBUTE_X)) {
    drawText(page, fontBold, attrVals[attr], { x, y: ATTRIBUTE_VALUE_Y, size: 11, align: 'center' });
  }

  const condAttrs = ['FOR','COS','AGI','INT','VOL','CAR'];
  [true, false, true, false, false, true].forEach((on, i) => {
    if (on) drawCheck(page, font, ATTRIBUTE_X[condAttrs[i]] + CONDITION_CHECK_DX, CONDITION_Y, 7);
  });

  drawText(page, font, '+D4', DANNO_MOVIMENTO.dannoBonusFor);
  drawText(page, font, '+D2', DANNO_MOVIMENTO.dannoBonusAgi);
  drawText(page, font, '10', DANNO_MOVIMENTO.movimento);

  ['Vista nel Buio', 'Fiuto Animale', 'Passo Silenzioso'].forEach((t, i) => {
    drawText(page, font, t, { x: CAPACITA.x, y: CAPACITA.yStart - i * CAPACITA.rowHeight, size: CAPACITA.size });
  });

  SKILL_NAMES.forEach((_, i) => {
    drawText(page, fontBold, 5 + i, { x: SKILLS.valueX, y: SKILLS.yStart - i * SKILLS.rowHeight, size: SKILLS.size });
  });
  WEAPON_SKILL_NAMES.forEach((_, i) => {
    drawText(page, fontBold, 3 + i, { x: WEAPON_SKILLS.valueX, y: WEAPON_SKILLS.yStart - i * WEAPON_SKILLS.rowHeight, size: WEAPON_SKILLS.size });
  });
  ['Pesca', 'Cucina', 'Intaglio', 'Storia Locale', 'Erboristeria'].forEach((name, i) => {
    const y = SECONDARY_SKILLS.yStart - i * SECONDARY_SKILLS.rowHeight;
    drawText(page, font, name, { x: SECONDARY_SKILLS.nameX, y, size: SECONDARY_SKILLS.size });
    drawText(page, fontBold, 2 + i, { x: SECONDARY_SKILLS.valueX, y, size: SECONDARY_SKILLS.size });
  });

  for (let i = 0; i < 10; i++) {
    drawText(page, font, `Oggetto ${i + 1}`, { x: INVENTORY.valueX, y: INVENTORY.yStart - i * INVENTORY.rowHeight, size: INVENTORY.size });
  }
  drawText(page, font, 'Ciondolo di famiglia', { x: INVENTORY.cimelioX, y: INVENTORY.cimelioY, size: INVENTORY.size });

  drawText(page, font, 'Anello, moneta strana', RESOURCES.oggettiMinuscoli);
  drawText(page, font, '18 kg', RESOURCES.pesoTrasportabile);
  drawText(page, font, '12', RESOURCES.oro);
  drawText(page, font, '30', RESOURCES.argento);
  drawText(page, font, '75', RESOURCES.rame);

  drawText(page, font, 'Cuoio', ARMOR.armaturaNome);
  drawText(page, fontBold, '3', ARMOR.armaturaValore);
  drawText(page, font, 'Cappuccio', ARMOR.copricapoNome);
  drawText(page, fontBold, '1', ARMOR.copricapoValore);

  const armi = [
    { nome: 'Spada corta', imp: '1', portata: 'Corta', danno: 'D8', durabilita: '8', qualita: 'Tagliente' },
    { nome: 'Arco lungo', imp: '2', portata: '40/80/160', danno: 'D8', durabilita: '6', qualita: '' },
    { nome: 'Coltello', imp: '-', portata: 'Corta', danno: 'D6', durabilita: '5', qualita: '' },
  ];
  armi.forEach((w, i) => {
    const y = WEAPONS_TABLE.yStart - i * WEAPONS_TABLE.rowHeight;
    const s = WEAPONS_TABLE.size;
    drawText(page, font, w.nome, { x: WEAPONS_TABLE.nomeX, y, size: s });
    drawText(page, font, w.imp, { x: WEAPONS_TABLE.impX, y, size: s });
    drawText(page, font, w.portata, { x: WEAPONS_TABLE.portataX, y, size: s });
    drawText(page, font, w.danno, { x: WEAPONS_TABLE.dannoX, y, size: s });
    drawText(page, font, w.durabilita, { x: WEAPONS_TABLE.durabX, y, size: s });
    drawText(page, font, w.qualita, { x: WEAPONS_TABLE.qualitaX, y, size: s });
  });

  drawCheck(page, font, RIPOSO.roundDiRiposo.x, RIPOSO.roundDiRiposo.y, 7);
  drawText(page, fontBold, '9 / 12', PV_PF.volontaLabel);
  drawText(page, fontBold, '6 / 14', PV_PF.feritaLabel);
  for (let i = 0; i < 2; i++) drawCheck(page, font, TIRI_MORTE.successiX + i * 12, TIRI_MORTE.y, TIRI_MORTE.size);
  for (let i = 0; i < 1; i++) drawCheck(page, font, TIRI_MORTE.fallimentiX + i * 12, TIRI_MORTE.y, TIRI_MORTE.size);

  const out = await pdfDoc.save();
  fs.writeFileSync(path.join(__dirname, '..', 'test-fill.pdf'), out);
  console.log('OK -> test-fill.pdf');
})();

import { PDFDocument, PDFFont, PDFPage, RGB, StandardFonts, rgb } from 'pdf-lib';
import type { Character } from '../types/character';
import { ATTRIBUTES } from '../types/character';
import templateUrl from '../assets/scheda-template.pdf?url';
import * as F from './fieldMap';

const INK = rgb(0.09, 0.08, 0.07);
// Per il testo che cade sui nastri verdi/rossi o sui badge scuri del template:
// l'inchiostro scuro ci sparisce sopra, serve un colore chiaro.
const INK_LIGHT = rgb(0.97, 0.95, 0.88);

function drawText(
  page: PDFPage,
  font: PDFFont,
  text: string,
  pos: F.FieldPos,
  fallbackSize = 8,
  color: RGB = INK
) {
  if (!text) return;
  const size = pos.size ?? fallbackSize;
  let x = pos.x;
  if (pos.align === 'center') {
    x = pos.x - font.widthOfTextAtSize(text, size) / 2;
  } else if (pos.align === 'right') {
    x = pos.x - font.widthOfTextAtSize(text, size);
  }
  page.drawText(text, { x, y: pos.y, size, font, color });
}

function truncateToWidth(font: PDFFont, text: string, size: number, maxWidth: number): string {
  if (font.widthOfTextAtSize(text, size) <= maxWidth) return text;
  let end = text.length;
  while (end > 0 && font.widthOfTextAtSize(text.slice(0, end) + '…', size) > maxWidth) end--;
  return text.slice(0, end) + '…';
}

function wrapLines(font: PDFFont, text: string, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (current && font.widthOfTextAtSize(test, size) > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawWrappedText(
  page: PDFPage,
  font: PDFFont,
  text: string,
  x: number,
  y: number,
  opts: { maxWidth: number; lineHeight: number; maxLines: number; size: number }
) {
  if (!text) return;
  const lines = wrapLines(font, text, opts.size, opts.maxWidth).slice(0, opts.maxLines);
  lines.forEach((line, i) => {
    page.drawText(line, { x, y: y - i * opts.lineHeight, size: opts.size, font, color: INK });
  });
}

function drawCheck(page: PDFPage, font: PDFFont, x: number, y: number, size = 8) {
  page.drawText('X', { x, y, size, font, color: INK });
}

export async function fillCharacterSheet(character: Character): Promise<Uint8Array> {
  const templateBytes = await fetch(templateUrl).then((r) => r.arrayBuffer());
  const pdfDoc = await PDFDocument.load(templateBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page = pdfDoc.getPage(0);

  drawText(page, font, character.giocatore, F.HEADER.giocatore);
  drawText(page, font, character.stirpe, F.HEADER.stirpe);
  drawText(page, font, character.eta, F.HEADER.eta);
  drawText(page, font, character.professione, F.HEADER.professione);
  drawWrappedText(page, font, character.debolezza, F.HEADER.debolezza.x, F.HEADER.debolezza.y, {
    ...F.DEBOLEZZA_WRAP,
    size: F.HEADER.debolezza.size ?? 6.5,
  });
  character.aspetto.forEach((text, i) => {
    const pos = F.ASPETTO[i];
    drawWrappedText(page, font, text, pos.x, pos.y, pos);
  });
  drawText(page, fontBold, character.nome, F.HEADER.nome);

  for (const attr of ATTRIBUTES) {
    const val = character.attributes[attr];
    if (val !== '') {
      drawText(page, fontBold, String(val), {
        x: F.ATTRIBUTE_X[attr],
        y: F.ATTRIBUTE_VALUE_Y,
        size: 11,
        align: 'center',
      });
    }
  }

  const conditionOrder: (keyof Character['conditions'])[] = [
    'ESAUSTO',
    'MALATICCIO',
    'DISORIENTATO',
    'ARRABBIATO',
    'SPAVENTATO',
    'SCORAGGIATO',
  ];
  conditionOrder.forEach((cond, i) => {
    if (character.conditions[cond]) {
      const attr = ATTRIBUTES[i];
      drawCheck(page, font, F.ATTRIBUTE_X[attr] + F.CONDITION_CHECK_DX, F.CONDITION_Y, 7);
    }
  });

  // Nastro verde scuro: serve inchiostro chiaro
  drawText(page, fontBold, character.dannoBonusFor, F.DANNO_MOVIMENTO.dannoBonusFor, 8, INK_LIGHT);
  drawText(page, fontBold, character.dannoBonusAgi, F.DANNO_MOVIMENTO.dannoBonusAgi, 8, INK_LIGHT);
  if (character.movimento !== '')
    drawText(page, fontBold, String(character.movimento), F.DANNO_MOVIMENTO.movimento, 8, INK_LIGHT);

  character.capacitaIncantesimi.forEach((text, i) => {
    if (!text) return;
    drawText(page, font, text, {
      x: F.CAPACITA_INCANTESIMI.x,
      y: F.CAPACITA_INCANTESIMI.yStart - i * F.CAPACITA_INCANTESIMI.rowHeight,
      size: F.CAPACITA_INCANTESIMI.size,
    });
  });

  character.skills.forEach((s, i) => {
    if (s.value === '') return;
    drawText(page, fontBold, String(s.value), {
      x: F.SKILLS.valueX,
      y: F.SKILLS.yStart - i * F.SKILLS.rowHeight + 1,
      size: F.SKILLS.size,
    });
  });

  character.weaponSkills.forEach((s, i) => {
    if (s.value === '') return;
    drawText(page, fontBold, String(s.value), {
      x: F.WEAPON_SKILLS.valueX,
      y: F.WEAPON_SKILLS.yStart - i * F.WEAPON_SKILLS.rowHeight + 1,
      size: F.WEAPON_SKILLS.size,
    });
  });

  character.secondarySkills.forEach((s, i) => {
    const y = F.SECONDARY_SKILLS.yStart - i * F.SECONDARY_SKILLS.rowHeight;
    if (s.name) drawText(page, font, s.name, { x: F.SECONDARY_SKILLS.nameX, y, size: F.SECONDARY_SKILLS.size });
    if (s.value !== '')
      drawText(page, fontBold, String(s.value), { x: F.SECONDARY_SKILLS.valueX, y: y + 1, size: F.SECONDARY_SKILLS.size });
  });

  character.inventario.forEach((item, i) => {
    if (!item.text) return;
    drawText(page, font, item.text, {
      x: F.INVENTORY.valueX,
      y: F.INVENTORY.yStart - i * F.INVENTORY.rowHeight,
      size: F.INVENTORY.size,
    });
  });
  drawWrappedText(page, font, character.cimelio, F.INVENTORY.cimelioX, F.INVENTORY.cimelioY, {
    ...F.INVENTORY.cimelioWrap,
    size: F.INVENTORY.size,
  });

  drawText(page, font, character.oggettiMinuscoli, F.RESOURCES.oggettiMinuscoli);
  drawText(page, font, character.pesoTrasportabile, F.RESOURCES.pesoTrasportabile);
  if (character.oro !== '') drawText(page, font, String(character.oro), F.RESOURCES.oro);
  if (character.argento !== '') drawText(page, font, String(character.argento), F.RESOURCES.argento);
  if (character.rame !== '') drawText(page, font, String(character.rame), F.RESOURCES.rame);

  drawText(page, font, character.armatura.nome, F.ARMOR.armaturaNome);
  // il badge "valore" dell'armatura è scuro: inchiostro chiaro
  if (character.armatura.valore !== '')
    drawText(page, fontBold, String(character.armatura.valore), F.ARMOR.armaturaValore, 9, INK_LIGHT);
  drawText(page, font, character.copricapo.nome, F.ARMOR.copricapoNome);
  if (character.copricapo.valore !== '')
    drawText(page, fontBold, String(character.copricapo.valore), F.ARMOR.copricapoValore);

  character.armi.forEach((w, i) => {
    const y = F.WEAPONS_TABLE.yStart - i * F.WEAPONS_TABLE.rowHeight;
    const s = F.WEAPONS_TABLE.size;
    if (w.nome) drawText(page, font, w.nome, { x: F.WEAPONS_TABLE.nomeX, y, size: s });
    if (w.imp) drawText(page, font, w.imp, { x: F.WEAPONS_TABLE.impX, y, size: s });
    if (w.portata) drawText(page, font, w.portata, { x: F.WEAPONS_TABLE.portataX, y, size: s });
    if (w.danno) drawText(page, font, w.danno, { x: F.WEAPONS_TABLE.dannoX, y, size: s });
    if (w.durabilita) drawText(page, font, w.durabilita, { x: F.WEAPONS_TABLE.durabX, y, size: s });
    // la colonna Qualità è stretta: oltre non c'è più "bianco", si finisce sul riquadro PUNTI FERITA
    if (w.qualita) {
      const short = truncateToWidth(font, w.qualita, s, F.WEAPONS_TABLE.qualitaMaxWidth);
      drawText(page, font, short, { x: F.WEAPONS_TABLE.qualitaX, y, size: s });
    }
  });

  if (character.roundDiRiposo) drawCheck(page, font, F.RIPOSO.roundDiRiposo.x, F.RIPOSO.roundDiRiposo.y, 7);
  if (character.intervalloDiRiposo)
    drawCheck(page, font, F.RIPOSO.intervalloDiRiposo.x, F.RIPOSO.intervalloDiRiposo.y, 7);

  if (character.puntiVolontaMax !== '')
    drawText(page, fontBold, String(character.puntiVolontaMax), F.PV_PF.volontaMax);
  if (character.puntiFeritaMax !== '')
    drawText(page, fontBold, String(character.puntiFeritaMax), F.PV_PF.feritaMax);

  for (let i = 0; i < character.tiriMorteSuccessi; i++) {
    drawCheck(page, font, F.TIRI_MORTE.successiX + i * 12, F.TIRI_MORTE.y, F.TIRI_MORTE.size);
  }
  for (let i = 0; i < character.tiriMorteFallimenti; i++) {
    drawCheck(page, font, F.TIRI_MORTE.fallimentiX + i * 12, F.TIRI_MORTE.y, F.TIRI_MORTE.size);
  }

  return pdfDoc.save();
}

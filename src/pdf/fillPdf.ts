import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from 'pdf-lib';
import type { Character } from '../types/character';
import { ATTRIBUTES } from '../types/character';
import templateUrl from '../assets/scheda-template.pdf?url';
import * as F from './fieldMap';

const INK = rgb(0.09, 0.08, 0.07);

function drawText(
  page: PDFPage,
  font: PDFFont,
  text: string,
  pos: F.FieldPos,
  fallbackSize = 8
) {
  if (!text) return;
  const size = pos.size ?? fallbackSize;
  let x = pos.x;
  if (pos.align === 'center') {
    x = pos.x - font.widthOfTextAtSize(text, size) / 2;
  } else if (pos.align === 'right') {
    x = pos.x - font.widthOfTextAtSize(text, size);
  }
  page.drawText(text, { x, y: pos.y, size, font, color: INK });
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
  drawText(page, font, character.debolezza, F.HEADER.debolezza);
  drawText(page, font, character.aspetto[0], F.HEADER.aspetto1);
  drawText(page, font, character.aspetto[1], F.HEADER.aspetto2);
  drawText(page, font, character.aspetto[2], F.HEADER.aspetto3);
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

  drawText(page, font, character.dannoBonusFor, F.DANNO_MOVIMENTO.dannoBonusFor);
  drawText(page, font, character.dannoBonusAgi, F.DANNO_MOVIMENTO.dannoBonusAgi);
  if (character.movimento !== '')
    drawText(page, font, String(character.movimento), F.DANNO_MOVIMENTO.movimento);

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
      y: F.SKILLS.yStart - i * F.SKILLS.rowHeight,
      size: F.SKILLS.size,
    });
  });

  character.weaponSkills.forEach((s, i) => {
    if (s.value === '') return;
    drawText(page, fontBold, String(s.value), {
      x: F.WEAPON_SKILLS.valueX,
      y: F.WEAPON_SKILLS.yStart - i * F.WEAPON_SKILLS.rowHeight,
      size: F.WEAPON_SKILLS.size,
    });
  });

  character.secondarySkills.forEach((s, i) => {
    const y = F.SECONDARY_SKILLS.yStart - i * F.SECONDARY_SKILLS.rowHeight;
    if (s.name) drawText(page, font, s.name, { x: F.SECONDARY_SKILLS.nameX, y, size: F.SECONDARY_SKILLS.size });
    if (s.value !== '')
      drawText(page, fontBold, String(s.value), { x: F.SECONDARY_SKILLS.valueX, y, size: F.SECONDARY_SKILLS.size });
  });

  character.inventario.forEach((item, i) => {
    if (!item.text) return;
    drawText(page, font, item.text, {
      x: F.INVENTORY.valueX,
      y: F.INVENTORY.yStart - i * F.INVENTORY.rowHeight,
      size: F.INVENTORY.size,
    });
  });
  drawText(page, font, character.cimelio, { x: F.INVENTORY.cimelioX, y: F.INVENTORY.cimelioY, size: F.INVENTORY.size });

  drawText(page, font, character.oggettiMinuscoli, F.RESOURCES.oggettiMinuscoli);
  drawText(page, font, character.pesoTrasportabile, F.RESOURCES.pesoTrasportabile);
  if (character.oro !== '') drawText(page, font, String(character.oro), F.RESOURCES.oro);
  if (character.argento !== '') drawText(page, font, String(character.argento), F.RESOURCES.argento);
  if (character.rame !== '') drawText(page, font, String(character.rame), F.RESOURCES.rame);

  drawText(page, font, character.armatura.nome, F.ARMOR.armaturaNome);
  if (character.armatura.valore !== '')
    drawText(page, fontBold, String(character.armatura.valore), F.ARMOR.armaturaValore);
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
    if (w.qualita) drawText(page, font, w.qualita, { x: F.WEAPONS_TABLE.qualitaX, y, size: s });
  });

  if (character.roundDiRiposo) drawCheck(page, font, F.RIPOSO.roundDiRiposo.x, F.RIPOSO.roundDiRiposo.y, 7);
  if (character.intervalloDiRiposo)
    drawCheck(page, font, F.RIPOSO.intervalloDiRiposo.x, F.RIPOSO.intervalloDiRiposo.y, 7);

  const volontaTxt = `${character.puntiVolontaAttuali || 0} / ${character.puntiVolontaMax || 0}`;
  drawText(page, fontBold, volontaTxt, F.PV_PF.volontaLabel);
  const feritaTxt = `${character.puntiFeritaAttuali || 0} / ${character.puntiFeritaMax || 0}`;
  drawText(page, fontBold, feritaTxt, F.PV_PF.feritaLabel);

  for (let i = 0; i < character.tiriMorteSuccessi; i++) {
    drawCheck(page, font, F.TIRI_MORTE.successiX + i * 12, F.TIRI_MORTE.y, F.TIRI_MORTE.size);
  }
  for (let i = 0; i < character.tiriMorteFallimenti; i++) {
    drawCheck(page, font, F.TIRI_MORTE.fallimentiX + i * 12, F.TIRI_MORTE.y, F.TIRI_MORTE.size);
  }

  return pdfDoc.save();
}

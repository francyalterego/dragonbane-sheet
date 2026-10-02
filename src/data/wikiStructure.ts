// Struttura di navigazione (solo titoli dall'indice del manuale: nessun testo o immagine
// del libro). Scheletro per la Wiki: menu/sottomenu a sinistra, contenuto placeholder a destra.

export interface WikiNode {
  title: string;
  children?: WikiNode[];
}

export interface WikiChapter extends WikiNode {
  numero: number;
}

export const WIKI_STRUCTURE: WikiChapter[] = [
  {
    numero: 1,
    title: 'Nei Tempi Più Antichi',
    children: [{ title: 'Introduzione' }],
  },
  {
    numero: 2,
    title: 'Il Tuo Personaggio',
    children: [
      { title: 'Stirpi' },
      {
        title: 'Professioni',
        children: [
          { title: 'Artigiano' },
          { title: 'Bardo' },
          { title: 'Cacciatore' },
          { title: 'Cavaliere' },
          { title: 'Guerriero' },
          { title: 'Ladro' },
          { title: 'Mago' },
          { title: 'Marinaio' },
          { title: 'Mercante' },
          { title: 'Studioso' },
        ],
      },
      { title: 'Età' },
      { title: 'Nome' },
      { title: 'Attributi' },
      { title: 'Valori Derivati' },
      { title: 'Abilità' },
      { title: 'Capacità Eroiche' },
      { title: 'Attrezzatura' },
      { title: 'Ingombro' },
      { title: 'Aspetto' },
      { title: 'Esperienza' },
    ],
  },
  {
    numero: 3,
    title: 'Abilità',
    children: [
      { title: 'Tirare i Dadi' },
      { title: 'Favori e Sciagure' },
      { title: 'Tiri Contrapposti' },
      { title: 'Le Abilità Base' },
      { title: 'Capacità Eroiche' },
    ],
  },
  {
    numero: 4,
    title: 'Combattimento e Danno',
    children: [
      { title: 'Round e Iniziativa' },
      { title: 'Azioni e Movimento' },
      { title: 'Combattimento in Mischia' },
      { title: 'Combattimento a Distanza' },
      { title: 'Danni' },
      { title: 'Condizioni' },
      { title: 'Guarire e Riposare' },
      { title: 'Altri Pericoli' },
      { title: 'Cavalcare Animali' },
      { title: 'Armi Improvvisate' },
    ],
  },
  {
    numero: 5,
    title: 'Magia',
    children: [
      { title: 'Scuole di Magia' },
      { title: 'Incantesimi' },
      { title: 'Lanciare Incantesimi' },
      { title: 'Apprendere la Magia' },
      {
        title: 'Lista degli Incantesimi',
        children: [
          { title: 'Magia Comune' },
          { title: 'Animismo' },
          { title: 'Elementalismo' },
          { title: 'Mentalismo' },
        ],
      },
    ],
  },
  {
    numero: 6,
    title: 'Attrezzatura',
    children: [
      { title: 'Armature e Copricapi' },
      { title: 'Armi da Mischia' },
      { title: 'Armi a Distanza' },
      { title: 'Abiti' },
      { title: 'Strumenti Musicali' },
      { title: 'Beni Commerciali' },
      { title: 'Studio e Magia' },
      { title: 'Fonti di Luce' },
      { title: 'Attrezzi' },
      { title: 'Contenitori' },
      { title: 'Farmaci' },
      { title: 'Servizi' },
      { title: 'Cacciare e Pescare' },
      { title: 'Mezzi di Trasporto' },
      { title: 'Animali' },
    ],
  },
  {
    numero: 7,
    title: 'Bestiario',
    children: [
      { title: 'Arpia' },
      { title: 'Demone' },
      { title: 'Drago' },
      { title: 'Fantasma' },
      { title: 'Gigante' },
      { title: 'Goblin' },
      { title: 'Grifone' },
      { title: 'Manticora' },
      { title: 'Minotauro' },
      { title: 'Orco' },
      { title: 'Pipistrello Vampiro' },
      { title: 'Animali Comuni' },
      { title: 'Ragno Gigante' },
      { title: 'Scheletro' },
      { title: 'Troll' },
      { title: 'Wight' },
    ],
  },
  {
    numero: 8,
    title: 'Avventure',
    children: [
      { title: 'Viaggi' },
      { title: 'Il Ruolo del Gamemaster' },
      { title: 'Personaggi Non Giocanti' },
      { title: 'Creare Avventure' },
      { title: 'Campagne' },
      { title: 'Il Castello del Cavaliere Brigante' },
    ],
  },
];

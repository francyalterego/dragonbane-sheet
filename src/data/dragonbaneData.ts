// Dati ufficiali tratti dal Manuale dei Giocatori di Dragonbane (soprattutto capitolo 2,
// "Il tuo Personaggio", e capitolo 6 "Attrezzatura").
import { Attribute } from '../types/character';

export interface Ability {
  nome: string;
  puntiVolonta: string; // es. "3", "—", "Variabili"
  descrizione: string;
}

// pag. 12-15: capacità innata di ogni stirpe (i mallardi ne hanno due, le altre stirpi una sola)
export interface Kin {
  nome: string;
  movimento: number;
  capacitaInnate: Ability[];
}

export const STIRPI_INFO: Kin[] = [
  {
    nome: 'Umano',
    movimento: 10,
    capacitaInnate: [
      {
        nome: 'Adattabile',
        puntiVolonta: '3',
        descrizione:
          "Quando tiri su un'abilità, puoi decidere di farlo usando il livello di un'altra abilità a tua scelta, motivando come la usi.",
      },
    ],
  },
  {
    nome: 'Halfling',
    movimento: 8,
    capacitaInnate: [
      {
        nome: 'Difficile da Prendere',
        puntiVolonta: '3',
        descrizione: 'Puoi attivarla mentre schivi un attacco, ottenendo un favore al tiro di SFUGGIRE.',
      },
    ],
  },
  {
    nome: 'Nano',
    movimento: 8,
    capacitaInnate: [
      {
        nome: 'Rancoroso',
        puntiVolonta: '3',
        descrizione:
          "Puoi attivarla quando attacchi qualcuno che ti ha ferito in passato (almeno 1 danno, non importa quando), ottenendo un favore al tiro.",
      },
    ],
  },
  {
    nome: 'Elfo',
    movimento: 10,
    capacitaInnate: [
      {
        nome: 'Pace Interiore',
        puntiVolonta: '—',
        descrizione:
          "Puoi meditare profondamente durante un intervallo di riposo: guarisci PF e PV di un D6 aggiuntivo e rimuovi una condizione in più. Mentre mediti sei inerte e non puoi essere svegliato.",
      },
    ],
  },
  {
    nome: 'Mallardo',
    movimento: 8,
    capacitaInnate: [
      {
        nome: 'Scontroso',
        puntiVolonta: '3',
        descrizione:
          'Puoi attivarla (non è un\'azione) per ottenere un favore a un tiro di abilità, diventando Arrabbiato se non lo sei già. Non utilizzabile per tiri di INT o abilità basate su INT.',
      },
      {
        nome: 'Palmipede',
        puntiVolonta: '—',
        descrizione: 'Ottieni un favore a tutti i tiri di NUOTARE. A pelo d\'acqua o sott\'acqua puoi usare tutto il tuo movimento.',
      },
    ],
  },
  {
    nome: 'Lupinide',
    movimento: 12,
    capacitaInnate: [
      {
        nome: 'Istinti da Cacciatore',
        puntiVolonta: '3',
        descrizione:
          "Designa come preda una creatura che vedi o di cui senti l'odore (azione in combattimento). Puoi seguirne l'odore per un giorno intero e spendere 1 PV in più (non è un'azione) per un favore quando la attacchi.",
      },
    ],
  },
];

export const STIRPI = STIRPI_INFO.map((k) => k.nome);

export interface EquipmentSet {
  tiro: string; // es. "1–2"
  testo: string;
}

export interface Profession {
  nome: string;
  attributoPrincipale: Attribute;
  abilita: string[];
  capacitaEroica: Ability[]; // più di una = a scelta (es. Artigiano)
  attrezzatura: EquipmentSet[];
}

export const PROFESSIONI_INFO: Profession[] = [
  {
    nome: 'Artigiano',
    attributoPrincipale: 'FOR',
    abilita: ['Artigianato', 'Asce', 'Coltelli', 'Localizzare', 'Martelli', 'Rapidità di Mano', 'Rissa', 'Spade'],
    capacitaEroica: [
      {
        nome: 'Mastro Carpentiere',
        puntiVolonta: 'Variabili',
        descrizione:
          'Con gli attrezzi da carpentiere: infliggi D12 danni extra a porte/oggetti per ogni PV speso, ignorando l\'armatura; in un periodo completo crei un oggetto di legno spendendo PV pari al suo prezzo in oro.',
      },
      {
        nome: 'Mastro Conciatore',
        puntiVolonta: 'Variabili',
        descrizione:
          "Con gli attrezzi da conciatore, in un periodo completo crei un'armatura di cuoio dalla pelle di un animale/mostro: ottiene metà del suo valore di armatura (minimo 1), costo in PV pari a quel valore.",
      },
      {
        nome: 'Mastro Fabbro',
        puntiVolonta: 'Variabili',
        descrizione:
          "Con gli attrezzi da fabbro: per 3 PV affili un'arma (riduce di 1 l'armatura del bersaglio finché non la usi in combattimento); in un periodo completo forgi un'arma o armatura di metallo spendendo PV pari al prezzo in oro.",
      },
    ],
    attrezzatura: [
      { tiro: '1–2', testo: "Martello d'arme (leggero), armatura di cuoio, attrezzi da fabbro, torcia, pietra focaia e acciarino, D8 razioni di cibo, D8 argento" },
      { tiro: '3–4', testo: 'Accetta, armatura di cuoio, attrezzi da carpentiere, torcia, corda (canapa), pietra focaia e acciarino, D8 razioni di cibo, D8 argento' },
      { tiro: '5–6', testo: 'Coltello, armatura di cuoio, attrezzi da conciatore, lanterna, olio per lampade, pietra focaia e acciarino, D8 razioni di cibo, D8 argento' },
    ],
  },
  {
    nome: 'Bardo',
    attributoPrincipale: 'CAR',
    abilita: ['Acrobazia', 'Coltelli', 'Esibirsi', 'Imbrogliare', 'Linguaggi', 'Miti e Leggende', 'Persuadere', 'Sfuggire'],
    capacitaEroica: [
      {
        nome: 'Musicista',
        puntiVolonta: '3',
        descrizione:
          "Azione in combattimento: dai un favore a tutti gli alleati entro 10 metri, oppure una sciagura a tutti i nemici entro 10 metri (scegli un effetto), fino al tuo turno successivo. Uno strumento musicale può aumentarne la portata o ridurne il costo in PV.",
      },
    ],
    attrezzatura: [
      { tiro: '1–2', testo: 'Lira, coltello, lampada a olio, olio per lampade, pietra focaia e acciarino, D6 razioni di cibo, D8 argento' },
      { tiro: '3–4', testo: 'Flauto, pugnale, corda (canapa), torcia, pietra focaia e acciarino, D6 razioni di cibo, D8 argento' },
      { tiro: '5–6', testo: 'Corno, coltello, torcia, pietra focaia e acciarino, D6 razioni di cibo, D8 argento' },
    ],
  },
  {
    nome: 'Cacciatore',
    attributoPrincipale: 'AGI',
    abilita: ['Acrobazia', 'Archi', 'Caccia e Pesca', 'Coltelli', 'Consapevolezza', 'Frombole', 'Sgattaiolare', 'Sopravvivenza'],
    capacitaEroica: [
      {
        nome: 'Compagno',
        puntiVolonta: '3',
        descrizione:
          "Impiegando un intervallo, rendi un animale nelle vicinanze (deciso dal GM) il tuo compagno animale (uno alla volta). Ti segue e può esplorare per te gratis; spendendo altri 3 PV può attaccare un nemico (azione gratuita per te).",
      },
    ],
    attrezzatura: [
      { tiro: '1–2', testo: 'Pugnale, arco corto, faretra, armatura di cuoio, sacco a pelo, torcia, pietra focaia e acciarino, corda (canapa), trappola, D8 razioni di cibo, D6 argento' },
      { tiro: '3–4', testo: 'Coltello, arco lungo, faretra, armatura di cuoio, sacco a pelo, torcia, pietra focaia e acciarino, corda (canapa), canna da pesca, D8 razioni di cibo, D6 argento' },
      { tiro: '5–6', testo: 'Pugnale, frombola, armatura di cuoio, sacco a pelo, torcia, pietra focaia e acciarino, corda (canapa), trappola, D8 razioni di cibo, D6 argento' },
    ],
  },
  {
    nome: 'Cavaliere',
    attributoPrincipale: 'FOR',
    abilita: ['Cavalcare', 'Esibirsi', 'Lance', 'Martelli', 'Miti e Leggende', 'Persuadere', 'Sapienza Animale', 'Spade'],
    capacitaEroica: [
      {
        nome: 'Protettore',
        puntiVolonta: '2',
        descrizione:
          'Se tu e un alleato siete entro 2 metri dallo stesso nemico e questo cerca di attaccare il tuo compagno, puoi attivarla per obbligarlo ad attaccare te. Utilizzabile fuori dal tuo turno, non conta come azione.',
      },
    ],
    attrezzatura: [
      { tiro: '1–2', testo: 'Spada/mazza chiodata, scudo (piccolo), armatura a piastre, grande elmo, torcia, pietra focaia e acciarino, D6 razioni di cibo, D12 argento' },
      { tiro: '3–4', testo: 'Flagello/martello d\'arme (leggero), scudo (piccolo), cotta di maglia, celata, torcia, pietra focaia e acciarino, D6 razioni di cibo, D12 argento' },
      { tiro: '5–6', testo: 'Spada corta, lancia da cavalleria, scudo (piccolo), cotta di maglia, celata, cavallo da guerra, D6 razioni di cibo, D12 argento' },
    ],
  },
  {
    nome: 'Guerriero',
    attributoPrincipale: 'FOR',
    abilita: ['Archi', 'Asce', 'Balestre', 'Lance', 'Martelli', 'Rissa', 'Sfuggire', 'Spade'],
    capacitaEroica: [
      {
        nome: 'Veterano',
        puntiVolonta: '1',
        descrizione:
          "All'inizio del round di combattimento puoi tenere la carta iniziativa del round precedente invece di pescarne una nuova. Non conta come azione.",
      },
    ],
    attrezzatura: [
      { tiro: '1–2', testo: 'Spada/ascia da battaglia/mazza chiodata, scudo (piccolo), cotta di maglia, torcia, pietra focaia e acciarino, D6 razioni di cibo, D6 argento' },
      { tiro: '3–4', testo: 'Spada corta/accetta/lancia corta, balestra leggera, faretra, armatura di cuoio, torcia, pietra focaia e acciarino, D6 razioni di cibo, D6 argento' },
      { tiro: '5–6', testo: 'Lancia lunga, armatura di cuoio borchiato, celata, torcia, pietra focaia e acciarino, D6 razioni di cibo, D6 argento' },
    ],
  },
  {
    nome: 'Ladro',
    attributoPrincipale: 'AGI',
    abilita: ['Acrobazia', 'Coltelli', 'Consapevolezza', 'Imbrogliare', 'Localizzare', 'Rapidità di Mano', 'Sfuggire', 'Sgattaiolare'],
    capacitaEroica: [
      {
        nome: 'Pugnalata alle Spalle',
        puntiVolonta: '3',
        descrizione:
          "Attacco in mischia con un'arma infida contro un nemico entro 2 metri da un altro personaggio: conta come furtivo (non schivabile né parabile), ottieni un favore e un dado di danno in più. Non conta come azione.",
      },
    ],
    attrezzatura: [
      { tiro: '1–2', testo: 'Pugnale, frombola, corda (canapa), rampino, torcia, pietra focaia e acciarino, D6 razioni di cibo, D10 argento' },
      { tiro: '3–4', testo: 'Coltello, grimaldelli (semplici), torcia, pietra focaia e acciarino, D6 razioni di cibo, D10 argento' },
      { tiro: '5–6', testo: 'Due pugnali, biglie, corda (canapa), torcia, pietra focaia e acciarino, D6 razioni di cibo, D10 argento' },
    ],
  },
  {
    nome: 'Mago',
    attributoPrincipale: 'VOL',
    // Le abilità dipendono dalla scuola scelta (Animismo, Elementalismo o Mentalismo): elencate tutte insieme.
    abilita: [
      'Animismo', 'Elementalismo', 'Mentalismo',
      'Bastoni', 'Caccia e Pesca', 'Guarire', 'Sapienza Animale', 'Sfuggire', 'Sgattaiolare', 'Sopravvivenza',
      'Consapevolezza', 'Linguaggi', 'Localizzare', 'Miti e Leggende', 'Acrobazia', 'Rissa',
    ],
    capacitaEroica: [],
    attrezzatura: [
      { tiro: '1–2', testo: 'Bastone, sfera di cristallo, grimorio, torcia, pietra focaia e acciarino, D6 razioni di cibo, D8 argento' },
      { tiro: '3–4', testo: 'Coltello, bacchetta, grimorio, torcia, pietra focaia e acciarino, D6 razioni di cibo, D8 argento' },
      { tiro: '5–6', testo: 'Amuleto, grimorio, sacco a pelo, torcia, pietra focaia e acciarino, D6 razioni di cibo, D8 argento' },
    ],
  },
  {
    nome: 'Marinaio',
    attributoPrincipale: 'AGI',
    abilita: ['Acrobazia', 'Caccia e Pesca', 'Coltelli', 'Consapevolezza', 'Linguaggi', 'Navigare', 'Nuotare', 'Spade'],
    capacitaEroica: [
      {
        nome: 'Gambe da Marinaio',
        puntiVolonta: '1',
        descrizione:
          "Attivabile (non è un'azione) quando agisci in acqua, anche solo fino alla vita: eviti per un round tutti gli effetti negativi dell'essere in acqua, incluso il rischio di annegare.",
      },
    ],
    attrezzatura: [
      { tiro: '1–2', testo: 'Pugnale, arco corto, faretra, corda (canapa), rampino, sacco a pelo, torcia, pietra focaia e acciarino, D8 razioni di cibo, D10 argento' },
      { tiro: '3–4', testo: 'Scimitarra, armatura di cuoio, corda (canapa), rampino, torcia, pietra focaia e acciarino, D8 razioni di cibo, D10 argento' },
      { tiro: '5–6', testo: 'Tridente, cannocchiale, corda (canapa), rampino, torcia, pietra focaia e acciarino, D8 razioni di cibo, D10 argento' },
    ],
  },
  {
    nome: 'Mercante',
    attributoPrincipale: 'CAR',
    abilita: ['Coltelli', 'Consapevolezza', 'Contrattare', 'Imbrogliare', 'Localizzare', 'Persuadere', 'Rapidità di Mano', 'Sfuggire'],
    capacitaEroica: [
      {
        nome: 'Cacciatore di Tesori',
        puntiVolonta: '3',
        descrizione: 'A un bivio o incrocio, puoi attivarla per capire in che direzione si trovano i tesori più ricchi.',
      },
    ],
    attrezzatura: [
      { tiro: '1–2', testo: 'Pugnale, sacco a pelo, torcia, pietra focaia e acciarino, corda (canapa), asino, D6 razioni di cibo, D12 argento' },
      { tiro: '3–4', testo: 'Coltello, sacco a pelo, lanterna, olio per lampade, pietra focaia e acciarino, cucina da campo, asino, carretto, D6 razioni di cibo, D12 argento' },
      { tiro: '5–6', testo: 'Pugnale, sacco a pelo, tenda (grande), lampada a olio, olio per lampade, pietra focaia e acciarino, zaino, D6 razioni di cibo, D12 argento' },
    ],
  },
  {
    nome: 'Studioso',
    attributoPrincipale: 'INT',
    abilita: ['Consapevolezza', 'Guarire', 'Linguaggi', 'Localizzare', 'Miti e Leggende', 'Sapienza Animale', 'Sfuggire', 'Sopravvivenza'],
    capacitaEroica: [
      {
        nome: 'Intuizione',
        puntiVolonta: '3',
        descrizione:
          'Davanti a una decisione difficile, puoi attivarla per fare una domanda diretta al GM e ricevere una risposta utile (senza rivelarti tutto ciò che c\'è da sapere).',
      },
    ],
    attrezzatura: [
      { tiro: '1–2', testo: 'Bastone, taccuino, calamo, sacco a pelo, torcia, pietra focaia e acciarino, D6 razioni di cibo, D10 argento' },
      { tiro: '3–4', testo: 'Coltello, libro (di qualsiasi materia), sacco a pelo, lampada a olio, olio per lampade, pietra focaia e acciarino, D6 razioni di cibo, D10 argento' },
      { tiro: '5–6', testo: 'Spada corta, bende, veleno soporifero (1 dose), sacco a pelo, lanterna, olio per lampade, pietra focaia e acciarino, D6 razioni di cibo, D10 argento' },
    ],
  },
];

export const PROFESSIONI = PROFESSIONI_INFO.map((p) => p.nome);

export type EtaCategoria = 'Giovane' | 'Adulto' | 'Vecchio';
export const ETA_CATEGORIE: EtaCategoria[] = ['Giovane', 'Adulto', 'Vecchio'];

// pag. 24: effetti dell'età sugli attributi (fino a un massimo di 18) e abilità allenate totali
export const AGE_DELTAS: Record<EtaCategoria, Partial<Record<Attribute, number>>> = {
  Giovane: { AGI: 1, COS: 1 },
  Adulto: {},
  Vecchio: { FOR: -2, AGI: -2, COS: -2, INT: 1, VOL: 1 },
};
export const AGE_TRAINED_SKILLS: Record<EtaCategoria, number> = { Giovane: 8, Adulto: 10, Vecchio: 12 };

// pag. 27: valori derivati
export function calcDannoBonus(attrValue: number | ''): string {
  if (attrValue === '') return '';
  if (attrValue >= 17) return '+D6';
  if (attrValue >= 13) return '+D4';
  return '—';
}

export function calcValoreBase(attrValue: number | ''): number | '' {
  if (attrValue === '') return '';
  if (attrValue >= 16) return 7;
  if (attrValue >= 13) return 6;
  if (attrValue >= 9) return 5;
  if (attrValue >= 6) return 4;
  return 3;
}

export function calcMovimento(stirpe: string, agi: number | ''): number | '' {
  const kin = STIRPI_INFO.find((k) => k.nome === stirpe);
  if (!kin || agi === '') return '';
  let mod = 0;
  if (agi <= 6) mod = -4;
  else if (agi <= 9) mod = -2;
  else if (agi <= 12) mod = 0;
  else if (agi <= 15) mod = 2;
  else mod = 4;
  return kin.movimento + mod;
}

// pag. 26, tabella D20 Debolezza. "label" è ciò che finisce scritto sulla scheda
// (la riga Debolezza è stretta), "text" la descrizione completa mostrata nel form.
export const DEBOLEZZE: { label: string; text: string }[] = [
  { label: 'Credulone', text: 'Credo a tutto ciò che mi viene detto.' },
  { label: 'Avido', text: 'Voglio la parte più grande del bottino.' },
  { label: 'Permaloso', text: 'Non sopporto le provocazioni.' },
  { label: 'Avventato', text: 'Sono sempre il primo a gettarsi nel pericolo.' },
  { label: 'Codardo', text: 'Mi nascondo sempre in fondo al gruppo.' },
  { label: 'Ammazzamostri', text: 'Tutti i mostri sono malvagi e vanno uccisi.' },
  { label: 'Intollerante', text: 'Le stirpi notturne, come orchi e goblin, sono malvagie e vanno combattute.' },
  { label: 'Pigro', text: 'Ogni occasione è buona per riposare.' },
  { label: 'Goloso', text: 'Approfitto di ogni occasione per mangiarmi qualcosa di succulento.' },
  { label: 'Cleptomane', text: 'Non posso trattenermi dal rubare oggetti di valore.' },
  { label: 'Vanitoso', text: 'Aiuto chiunque mi ricopra di lodi e complimenti.' },
  { label: 'Spericolato', text: 'Corro sempre grossi rischi senza pensare alle conseguenze.' },
  { label: 'Timoroso della Magia', text: 'La magia è una forza malvagia e non ci si può fidare dei maghi.' },
  { label: 'Desideroso di Conoscenza', text: 'La ricerca della conoscenza è più importante dei miei amici.' },
  { label: 'Selvatico', text: 'Non dormo mai al chiuso.' },
  { label: 'Spaccone', text: 'Esagero sempre parlando dei miei risultati.' },
  { label: 'Violento', text: 'Uso la violenza per superare ogni ostacolo.' },
  { label: 'Prepotente', text: 'Dico sempre agli altri cosa fare.' },
  { label: 'Pessimista', text: 'Penso sempre che le cose andranno nel peggiore dei modi.' },
  { label: 'Altezzoso', text: 'Guardo dall\'alto in basso chi incontro.' },
];

// pag. 29, tabella D20 Aspetto
export const ASPETTI = [
  'Una brutta cicatrice sulla guancia',
  'Uno strano copricapo',
  'Stranamente pallido e slavato',
  'Sempre sorridente',
  'Sguardo gelido e penetrante',
  'Un po\' in carne',
  'Fisico magro e scolpito',
  'Quantità anormali di peli del corpo (a seconda della stirpe)',
  'Calvizie incipiente (a seconda della stirpe)',
  'Tatuaggio vistoso',
  'Puzza nauseante',
  'Pettinatura magnifica',
  'Zoppo',
  'Lercio',
  'Onesti occhi azzurri',
  'Dente d\'argento',
  'Troppo profumato',
  'Eterocromia',
  'Voce sibilante',
  'Volto invecchiato',
];

// pag. 29, tabella D20 Cimelio
export const CIMELI = [
  'Le tue vecchie fidate scarpe',
  'Un semplice medaglione d\'argento',
  'Una lettera da un vecchio amico o da un parente',
  'Un vecchio diario sgualcito',
  'Un bracciale tramandato nella tua famiglia',
  'Una statuina di legno che ti è stata donata da bambino',
  'Un sasso dalla forma peculiare',
  'Una moneta di rame da un tesoro trovato da tua madre o tuo padre',
  'Un vecchio boccale di peltro',
  'Un corno preso come trofeo da un mostro',
  'Una zanna presa come trofeo da una bestia',
  'Un paio di semplici dadi d\'osso',
  'Un ciondolo contenente una ciocca di capelli',
  'Una chiave decorata',
  'Una mappa disegnata a mano che hai ereditato',
  'Un anello con un\'iscrizione',
  'Un fischietto d\'osso',
  'Un vecchio cappello lacero di tua madre o tuo padre',
  'Una piuma di grifone',
  'Una bella pipa intagliata',
];

// Dati ufficiali tratti dal Manuale dei Giocatori di Dragonbane (capitolo 2).
import { Attribute } from '../types/character';

export const STIRPI = ['Umano', 'Halfling', 'Nano', 'Elfo', 'Mallardo', 'Lupinide'] as const;

export const PROFESSIONI = [
  'Artigiano',
  'Bardo',
  'Cacciatore',
  'Cavaliere',
  'Guerriero',
  'Ladro',
  'Mago',
  'Marinaio',
  'Mercante',
  'Studioso',
] as const;

export type EtaCategoria = 'Giovane' | 'Adulto' | 'Vecchio';
export const ETA_CATEGORIE: EtaCategoria[] = ['Giovane', 'Adulto', 'Vecchio'];

// pag. 24: effetti dell'età sugli attributi (fino a un massimo di 18)
export const AGE_DELTAS: Record<EtaCategoria, Partial<Record<Attribute, number>>> = {
  Giovane: { AGI: 1, COS: 1 },
  Adulto: {},
  Vecchio: { FOR: -2, AGI: -2, COS: -2, INT: 1, VOL: 1 },
};

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

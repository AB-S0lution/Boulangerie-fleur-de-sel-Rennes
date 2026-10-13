// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// RÉEL: le principe (base de pâte à croissant précuite, crème à la vanille de Madagascar), 7 parfums par jour
// qui changent avec les saisons, 3,90 € la part, flan entier en 6 parts, la liste des parfums attestés
// (`confirmedBy` ≠ 'mock'), les 4 éditions limitées. MOCK: les descriptions, les couleurs de pastilles,
// les trois parfums marqués 'mock' et la rotation par saison (voir seasons.ts).
// Les parfums « épeautre », « mangue-passion » et « praliné pécan » sont cités sur Instagram mais leur légende n'a pas été relue: 'avis'/'mock' selon le cas.

export type FlanConfirmation = 'office-tourisme' | 'avis' | 'instagram' | 'mock'

export type Topping =
  | 'plain'
  | 'raspberry'
  | 'strawberry'
  | 'pistachio'
  | 'coconut'
  | 'hazelnut'
  | 'lemon'
  | 'cocoa'
  | 'buckwheat'
  | 'popcorn'
  | 'speculoos'
  | 'maple'
  | 'pecan'
  | 'gianduja'
  | 'mango'
  | 'spelt'
  | 'apple'
  | 'chestnut'
  | 'rhubarb'

export interface Flan {
  id: string
  name: string
  /** Texte court pour la pastille */
  short: string
  color: string
  /** Seconde couleur (insert, topping) pour les parfums doubles */
  color2?: string
  ink: string
  topping: Topping
  description: string
  confirmedBy: FlanConfirmation
  limited: boolean
  bestSeller: boolean
  pricePerSlice: number
  source: 'reel' | 'mock'
  ref?: string
}

const P = 3.9
const OFFICE = 'https://www.tourisme-rennes.com/decouvrir-rennes/gastronomie/flan-patissier/'

export const FLAN_PRICE = P
export const FLAN_SLICES_PER_WHOLE = 6

export const FLANS: Flan[] = [
  {
    id: 'vanille',
    name: 'Vanille de Madagascar',
    short: 'Vanille',
    color: '#F1E3B5',
    ink: '#13161C',
    topping: 'plain',
    description: 'La base de la maison: une crème ferme à la vanille de Madagascar sur pâte à croissant précuite.',
    confirmedBy: 'office-tourisme',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
    ref: OFFICE,
  },
  {
    id: 'nature',
    name: 'Nature',
    short: 'Nature',
    color: '#F4EBC8',
    ink: '#13161C',
    topping: 'plain',
    description: 'Sans rien d’autre que la crème, le croustillant et une pointe de fleur de sel.',
    confirmedBy: 'avis',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
  },
  {
    id: 'chocolat',
    name: 'Chocolat',
    short: 'Chocolat',
    color: '#4A2E25',
    ink: '#FFFFFF',
    topping: 'cocoa',
    description: 'Une crème au chocolat profonde, un voile de cacao sur le dessus.',
    confirmedBy: 'office-tourisme',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
    ref: OFFICE,
  },
  {
    id: 'sarrasin',
    name: 'Sarrasin',
    short: 'Sarrasin',
    color: '#8B6B52',
    ink: '#FFFFFF',
    topping: 'buckwheat',
    description: 'Le blé noir, grillé, pour une note de noisette et de terre. Un clin d’œil à la Bretagne.',
    confirmedBy: 'office-tourisme',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
    ref: OFFICE,
  },
  {
    id: 'chocolat-sarrasin',
    name: 'Chocolat sarrasin',
    short: 'Choc. sarrasin',
    color: '#6A4A3A',
    color2: '#C9A27A',
    ink: '#FFFFFF',
    topping: 'buckwheat',
    description: 'Chocolat et blé noir, avec sa pointe de sel. Cité par les clients parmi leurs préférés.',
    confirmedBy: 'avis',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
  },
  {
    id: 'pistache',
    name: 'Pistache',
    short: 'Pistache',
    color: '#8FA65A',
    ink: '#13161C',
    topping: 'pistachio',
    description: 'Le parfum le plus cité dans les avis: une crème pistache, des éclats torréfiés.',
    confirmedBy: 'office-tourisme',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
    ref: OFFICE,
  },
  {
    id: 'coco',
    name: 'Coco',
    short: 'Coco',
    color: '#EEEDE7',
    ink: '#13161C',
    topping: 'coconut',
    description: 'Crème coco, copeaux légèrement toastés.',
    confirmedBy: 'office-tourisme',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
    ref: OFFICE,
  },
  {
    id: 'framboise',
    name: 'Framboise',
    short: 'Framboise',
    color: '#C23B57',
    ink: '#FFFFFF',
    topping: 'raspberry',
    description: 'Celui qui met tout le monde d’accord. Des framboises fraîches, et le flan le plus plébiscité de la boutique.',
    confirmedBy: 'instagram',
    limited: false,
    bestSeller: true,
    pricePerSlice: P,
    source: 'reel',
    ref: 'https://www.instagram.com/p/Dc3xm6RIFwR/',
  },
  {
    id: 'fraise',
    name: 'Fraise',
    short: 'Fraise',
    color: '#E0576A',
    ink: '#13161C',
    topping: 'strawberry',
    description: 'Fraises en saison, une crème légère qui garde la tenue du flan.',
    confirmedBy: 'office-tourisme',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
    ref: OFFICE,
  },
  {
    id: 'noisette',
    name: 'Noisette',
    short: 'Noisette',
    color: '#A97B4F',
    ink: '#13161C',
    topping: 'hazelnut',
    description: 'Un insert crémeux et un croquant de noisettes concassées.',
    confirmedBy: 'office-tourisme',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
    ref: OFFICE,
  },
  {
    id: 'citron',
    name: 'Citron',
    short: 'Citron',
    color: '#E6D35A',
    ink: '#13161C',
    topping: 'lemon',
    description: 'Un cœur acidulé au citron, un zeste fin pour réveiller la crème.',
    confirmedBy: 'office-tourisme',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
    ref: OFFICE,
  },
  {
    id: 'popcorn',
    name: 'Popcorn',
    short: 'Popcorn',
    color: '#F2DC9B',
    color2: '#C9923F',
    ink: '#13161C',
    topping: 'popcorn',
    description: 'Un parfum de maïs caramélisé, signalé par les clients (mars 2026).',
    confirmedBy: 'avis',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
  },
  {
    id: 'speculoos',
    name: 'Spéculoos',
    short: 'Spéculoos',
    color: '#B07A4A',
    ink: '#13161C',
    topping: 'speculoos',
    description: 'Épices de biscuit, éclats de spéculoos, caramel doux.',
    confirmedBy: 'avis',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
  },
  {
    id: 'gianduja',
    name: 'Gianduja Dolce Vita',
    short: 'Gianduja',
    color: '#7B4F36',
    color2: '#E5C99A',
    ink: '#FFFFFF',
    topping: 'gianduja',
    description: 'Édition limitée imaginée avec Fratelli Peruzzi (Supino et Ciao Bella), juillet 2026.',
    confirmedBy: 'instagram',
    limited: true,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
    ref: 'https://www.instagram.com/reel/Da3Er5rh-My',
  },
  {
    id: 'citron-dolce',
    name: 'Citron Dolce Vita',
    short: 'Citron Dolce Vita',
    color: '#EDE17A',
    color2: '#FFFFFF',
    ink: '#13161C',
    topping: 'lemon',
    description: 'Le second flan imaginé avec Fratelli Peruzzi: un citron « à l’italienne », édition limitée.',
    confirmedBy: 'instagram',
    limited: true,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
    ref: 'https://www.instagram.com/reel/Da3Er5rh-My',
  },
  {
    id: 'pistache-framboise',
    name: 'Pistache framboise, le flan de la communauté',
    short: 'Pistache framboise',
    color: '#8FA65A',
    color2: '#C23B57',
    ink: '#13161C',
    topping: 'pistachio',
    description: 'L’idée la plus plébiscitée du concours en commentaires, proposée par un abonné. Vous l’avez imaginé, on l’a fait.',
    confirmedBy: 'instagram',
    limited: true,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
    ref: 'https://www.instagram.com/p/Dd6xpYrjj-y/',
  },
  {
    id: 'erable-pecan',
    name: 'Sirop d’érable noix de pécan',
    short: 'Érable pécan',
    color: '#C98A3E',
    color2: '#7A4A25',
    ink: '#13161C',
    topping: 'maple',
    description: 'Édition limitée d’octobre 2026. Selon la boutique, « le meilleur flan de toute l’histoire ».',
    confirmedBy: 'instagram',
    limited: true,
    bestSeller: false,
    pricePerSlice: P,
    source: 'reel',
    ref: 'https://www.instagram.com/p/DeMvICyDhlH/',
  },
  {
    id: 'epeautre',
    name: 'Épeautre',
    short: 'Épeautre',
    color: '#D9C79A',
    ink: '#13161C',
    topping: 'spelt',
    description: 'Une crème au grain d’épeautre toasté, douce et boisée. Parfum cité sur Instagram.',
    confirmedBy: 'mock',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'mock',
  },
  {
    id: 'mangue-passion',
    name: 'Mangue passion',
    short: 'Mangue passion',
    color: '#F0A93B',
    ink: '#13161C',
    topping: 'mango',
    description: 'Un insert fruité mangue et passion sous une crème vanillée. Parfum cité sur Instagram.',
    confirmedBy: 'mock',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'mock',
  },
  {
    id: 'praline-pecan',
    name: 'Praliné pécan',
    short: 'Praliné pécan',
    color: '#9C6B3F',
    ink: '#FFFFFF',
    topping: 'pecan',
    description: 'Un praliné maison et des noix de pécan caramélisées. Parfum cité sur Instagram.',
    confirmedBy: 'mock',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'mock',
  },
  {
    id: 'pomme-caramel',
    name: 'Pomme caramel au beurre salé',
    short: 'Pomme caramel',
    color: '#D49A4E',
    ink: '#13161C',
    topping: 'apple',
    description: 'Exemple de parfum d’automne: pommes rôties, caramel au beurre salé.',
    confirmedBy: 'mock',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'mock',
  },
  {
    id: 'chataigne',
    name: 'Châtaigne',
    short: 'Châtaigne',
    color: '#A58A6B',
    ink: '#13161C',
    topping: 'chestnut',
    description: 'Exemple de parfum d’automne: crème de châtaigne, éclats de marron.',
    confirmedBy: 'mock',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'mock',
  },
  {
    id: 'rhubarbe',
    name: 'Rhubarbe',
    short: 'Rhubarbe',
    color: '#D96F7C',
    ink: '#13161C',
    topping: 'rhubarb',
    description: 'Exemple de parfum de printemps: rhubarbe rôtie, crème vanille.',
    confirmedBy: 'mock',
    limited: false,
    bestSeller: false,
    pricePerSlice: P,
    source: 'mock',
  },
]

export const flanById = (id: string): Flan => {
  const f = FLANS.find((x) => x.id === id)
  if (!f) throw new Error(`Flan inconnu: ${id}`)
  return f
}

export const CONFIRMATION_LABEL: Record<FlanConfirmation, string> = {
  'office-tourisme': 'Cité par l’office de tourisme',
  avis: 'Cité dans les avis clients',
  instagram: 'Annoncé par la boutique',
  mock: 'Exemple de rotation',
}

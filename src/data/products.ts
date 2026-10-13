// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// RÉEL (`priceSource: 'reel'`, prix de juillet 2025, à présenter comme indicatifs): croissant 1,40 €,
// pain au chocolat 1,50 €, pain complet 4,90 €, tourte de seigle 6,50 €, religieuse en pâte à brioche 3,10 €,
// éclair vanille-fraise 3,10 €, flan 3,90 € la part (2026).
// RÉEL (existence du produit, pas du prix): bara, baguette tradition (seul pain non bio), pain de mie,
// chausson aux pommes, pain suisse, éclair choco-noisette, tartelette abricot-romarin, cookies, mi-cuits
// fleur de sel, cannelés, financiers, madeleines, hot dog, brioche suisse poireaux-saumon,
// croissant burger, Burg'œuf.
// MOCK: tout le reste (descriptions, allergènes, prix sans repère public, produits de saison).
// Le prix de la baguette tradition est volontairement absent (le 1,30 € circulant est réfuté).
// Les allergènes sont indicatifs: toujours demander en boutique.

export type CategoryId =
  | 'pains'
  | 'quotidien'
  | 'viennoiseries'
  | 'feuillete'
  | 'flans'
  | 'douceurs'
  | 'snacking-froid'
  | 'snacking-chaud'

export type ProductTag =
  | 'bio'
  | 'signature'
  | 'nouveau'
  | 'de-saison'
  | 'vegetarien'
  | 'fruits-a-coque'
  | 'feuilletage'
  | 'brioche'
  | 'champion'

export type Allergen = 'gluten' | 'lait' | 'oeufs' | 'fruits-a-coque' | 'sesame' | 'poisson' | 'moutarde' | 'soja' | 'sulfites'

export type Moment = 'petit-dejeuner' | 'dejeuner' | 'gouter'

export type ArtKey =
  | 'croissant'
  | 'pain-chocolat'
  | 'pain-raisins'
  | 'chausson'
  | 'pain-suisse'
  | 'kouign'
  | 'brioche'
  | 'boule'
  | 'tourte'
  | 'bara'
  | 'baguette'
  | 'pain-mie'
  | 'eclair'
  | 'religieuse'
  | 'tartelette'
  | 'millefeuille'
  | 'parisbrest'
  | 'flan'
  | 'cookie'
  | 'cannele'
  | 'financier'
  | 'madeleine'
  | 'cake'
  | 'sandwich'
  | 'hotdog'
  | 'burger'
  | 'salade'

export interface Product {
  id: string
  name: string
  category: CategoryId
  description: string
  price: number | null
  priceNote?: string
  priceSource: 'reel' | 'mock' | 'aucun'
  unit: string
  tags: ProductTag[]
  allergens: Allergen[]
  organic: boolean
  signature: boolean
  seasonal: boolean
  isNew: boolean
  art: ArtKey
  moments: Moment[]
  source: 'reel' | 'mock'
  /** `reel` = le produit existe réellement à la boutique (nom attesté) */
  nameVerified: boolean
}

export interface Category {
  id: CategoryId
  label: string
  intro: string
}

export const CATEGORIES: Category[] = [
  { id: 'pains', label: 'Pains bio au levain', intro: 'Quinze heures de fermentation, farines biologiques, pains de 600 à 700 g.' },
  { id: 'quotidien', label: 'Baguette et quotidien', intro: 'La tradition, façonnée chaque jour.' },
  { id: 'viennoiseries', label: 'Viennoiseries', intro: 'Beurre AOP Charentes-Poitou. Ni miel, ni vanille, ni levain dans le croissant.' },
  { id: 'feuillete', label: 'Pâtisserie feuilletée', intro: 'Les classiques de la pâtisserie, repensés en pâte à croissant ou à brioche.' },
  { id: 'flans', label: 'Flans', intro: 'Sept parfums par jour, sur une base de pâte à croissant précuite.' },
  { id: 'douceurs', label: 'Douceurs', intro: 'Cookies, mi-cuits, cannelés et petits gâteaux.' },
  { id: 'snacking-froid', label: 'Snacking froid', intro: 'Un pain, un sandwich. Garnitures maison, légumes du primeur voisin.' },
  { id: 'snacking-chaud', label: 'Snacking chaud', intro: 'En pâte à croissant, réchauffé au four pour vous.' },
]

export const TAG_LABEL: Record<ProductTag, string> = {
  bio: 'Bio',
  signature: 'Signature',
  nouveau: 'Nouveau',
  'de-saison': 'De saison',
  vegetarien: 'Végétarien',
  'fruits-a-coque': 'Fruits à coque',
  feuilletage: 'Feuilletage',
  brioche: 'Brioche',
  champion: 'Croissant champion',
}

export const ALLERGEN_LABEL: Record<Allergen, string> = {
  gluten: 'Gluten',
  lait: 'Lait',
  oeufs: 'Œufs',
  'fruits-a-coque': 'Fruits à coque',
  sesame: 'Sésame',
  poisson: 'Poisson',
  moutarde: 'Moutarde',
  soja: 'Soja',
  sulfites: 'Sulfites',
}

export const MOMENTS: { id: Moment; label: string; line: string }[] = [
  { id: 'petit-dejeuner', label: 'Petit-déjeuner entre collègues', line: 'Dès 6 h 30, de quoi remplir un carton.' },
  { id: 'dejeuner', label: 'Pause déjeuner', line: 'Un pain, un sandwich. Et un snacking chaud.' },
  { id: 'gouter', label: 'Goûter bien mérité', line: 'Un flan, un cookie, la fin de journée.' },
]

type Draft = Partial<Product> & Pick<Product, 'id' | 'name' | 'category' | 'description' | 'art'>

const p = (d: Draft): Product => ({
  price: null,
  priceSource: 'mock',
  unit: 'pièce',
  tags: [],
  allergens: [],
  organic: false,
  signature: false,
  seasonal: false,
  isNew: false,
  moments: [],
  source: 'mock',
  nameVerified: false,
  ...d,
})

export const PRODUCTS: Product[] = [
  // ---------- Pains bio au levain (10)
  p({
    id: 'tourte-de-seigle',
    name: 'Tourte de seigle',
    category: 'pains',
    art: 'tourte',
    description: 'Un grand pain de seigle bio au levain, dense et parfumé, qui se garde plusieurs jours.',
    price: 6.5,
    priceSource: 'reel',
    unit: 'pain',
    tags: ['bio'],
    allergens: ['gluten'],
    organic: true,
    moments: ['dejeuner'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'pain-complet',
    name: 'Pain complet',
    category: 'pains',
    art: 'boule',
    description: 'Farine complète bio, levain naturel, quinze heures de fermentation. Environ 600 à 700 g.',
    price: 4.9,
    priceSource: 'reel',
    unit: 'pain',
    tags: ['bio'],
    allergens: ['gluten'],
    organic: true,
    moments: ['dejeuner', 'petit-dejeuner'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'bara',
    name: 'Le Bara',
    category: 'pains',
    art: 'bara',
    description: 'Le pain-identité de la maison. Bara veut dire pain en breton: farine T80, blé noir, sel de Guérande, graines de sarrasin torréfiées.',
    price: 5.4,
    priceSource: 'mock',
    unit: 'pain',
    tags: ['bio', 'signature'],
    allergens: ['gluten'],
    organic: true,
    signature: true,
    moments: ['dejeuner'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'pain-t80-graines',
    name: 'T80 aux graines',
    category: 'pains',
    art: 'boule',
    description: 'Farine T80 bio, un mélange de graines grillées, une croûte bien colorée.',
    price: 5.2,
    unit: 'pain',
    tags: ['bio'],
    allergens: ['gluten', 'sesame'],
    organic: true,
    moments: ['petit-dejeuner'],
    nameVerified: true,
  }),
  p({
    id: 'pain-seigle-noix',
    name: 'Seigle et noix',
    category: 'pains',
    art: 'tourte',
    description: 'Un seigle aux noix entières, pour le fromage et le beurre salé.',
    price: 5.9,
    unit: 'pain',
    tags: ['bio', 'fruits-a-coque'],
    allergens: ['gluten', 'fruits-a-coque'],
    organic: true,
  }),
  p({
    id: 'pain-cereales-torrefiees',
    name: 'Pain aux céréales torréfiées',
    category: 'pains',
    art: 'boule',
    description: 'Des farines et céréales torréfiées, qui donnent au pain des notes de café et de noisette.',
    price: 5.6,
    unit: 'pain',
    tags: ['bio'],
    allergens: ['gluten'],
    organic: true,
  }),
  p({
    id: 'pain-epeautre',
    name: 'Pain d’épeautre',
    category: 'pains',
    art: 'boule',
    description: 'Une mie souple et douce, un goût de noisette discret.',
    price: 5.3,
    unit: 'pain',
    tags: ['bio'],
    allergens: ['gluten'],
    organic: true,
  }),
  p({
    id: 'petit-pain-levain',
    name: 'Petit pain au levain',
    category: 'pains',
    art: 'boule',
    description: 'Le pain du petit-déjeuner: une portion pour une personne.',
    price: 1.3,
    tags: ['bio'],
    allergens: ['gluten'],
    organic: true,
    moments: ['petit-dejeuner'],
  }),
  p({
    id: 'pain-figues',
    name: 'Pain aux figues',
    category: 'pains',
    art: 'tourte',
    description: 'Seigle, figues séchées, une pointe de fleur de sel. Exemple de pain de saison.',
    price: 6.2,
    unit: 'pain',
    tags: ['bio', 'de-saison'],
    allergens: ['gluten'],
    organic: true,
    seasonal: true,
  }),
  p({
    id: 'pain-noir',
    name: 'Pain noir',
    category: 'pains',
    art: 'tourte',
    description: 'Un pain très coloré, mie serrée, pour le poisson fumé et les huîtres.',
    price: 5.8,
    unit: 'pain',
    tags: ['bio'],
    allergens: ['gluten'],
    organic: true,
    isNew: true,
  }),

  // ---------- Baguette et quotidien (3)
  p({
    id: 'baguette-tradition',
    name: 'Baguette tradition',
    category: 'quotidien',
    art: 'baguette',
    description: 'Il y a les grands discours. Et puis il y a le pain. Une tradition façonnée chaque jour, avec le temps, le geste et le goût comme seuls repères. Le seul pain de la maison qui n’est pas bio.',
    price: null,
    priceNote: 'Prix en boutique',
    priceSource: 'aucun',
    tags: ['signature'],
    allergens: ['gluten'],
    moments: ['dejeuner', 'petit-dejeuner'],
    signature: true,
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'pain-de-mie',
    name: 'Pain de mie',
    category: 'quotidien',
    art: 'pain-mie',
    description: 'Fait avec un empois d’amidon, pour une mie souple et qui reste moelleuse.',
    price: 4.2,
    unit: 'pain',
    tags: ['bio'],
    allergens: ['gluten', 'lait'],
    organic: true,
    moments: ['petit-dejeuner'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'ficelle',
    name: 'La ficelle du matin',
    category: 'quotidien',
    art: 'baguette',
    description: 'Fine, croustillante, pour les mouillettes. Exemple de produit quotidien.',
    price: 0.9,
    allergens: ['gluten'],
    moments: ['petit-dejeuner'],
  }),

  // ---------- Viennoiseries (12)
  p({
    id: 'croissant',
    name: 'Croissant au beurre AOP',
    category: 'viennoiseries',
    art: 'croissant',
    description: 'Le croissant de deux champions. Beurre AOP Charentes-Poitou, ni miel, ni vanille, ni levain. « Avant tout, un goût de beurre. »',
    price: 1.4,
    priceSource: 'reel',
    tags: ['signature', 'champion', 'feuilletage'],
    allergens: ['gluten', 'lait'],
    signature: true,
    moments: ['petit-dejeuner'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'pain-au-chocolat',
    name: 'Pain au chocolat',
    category: 'viennoiseries',
    art: 'pain-chocolat',
    description: 'Même pâte feuilletée que le croissant, deux barres de chocolat.',
    price: 1.5,
    priceSource: 'reel',
    tags: ['signature', 'feuilletage'],
    allergens: ['gluten', 'lait', 'soja'],
    signature: true,
    moments: ['petit-dejeuner', 'gouter'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'pain-aux-raisins',
    name: 'Pain aux raisins',
    category: 'viennoiseries',
    art: 'pain-raisins',
    description: 'Crème pâtissière, raisins moelleux, pâte feuilletée en spirale.',
    price: 2.1,
    tags: ['feuilletage'],
    allergens: ['gluten', 'lait', 'oeufs'],
    moments: ['petit-dejeuner'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'chausson-pommes',
    name: 'Chausson aux pommes',
    category: 'viennoiseries',
    art: 'chausson',
    description: 'Pâte à croissant, compote de pommes maison.',
    price: 2.3,
    tags: ['feuilletage'],
    allergens: ['gluten', 'lait'],
    moments: ['gouter'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'pain-suisse',
    name: 'Pain suisse',
    category: 'viennoiseries',
    art: 'pain-suisse',
    description: 'Brioche feuilletée, crème pâtissière, pépites de chocolat. Les clients le disent « super bon ».',
    price: 2.1,
    tags: ['brioche', 'feuilletage'],
    allergens: ['gluten', 'lait', 'oeufs', 'soja'],
    moments: ['petit-dejeuner', 'gouter'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'pain-gianduja',
    name: 'Pain au gianduja',
    category: 'viennoiseries',
    art: 'pain-chocolat',
    description: 'Le pain au chocolat qui a viré noisette: gianduja coulant, éclats torréfiés.',
    price: 2.5,
    tags: ['feuilletage', 'fruits-a-coque'],
    allergens: ['gluten', 'lait', 'fruits-a-coque', 'soja'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'strie-coeur-coulant',
    name: 'Strié cœur coulant',
    category: 'viennoiseries',
    art: 'brioche',
    description: 'Une brioche striée au cœur de chocolat fondant.',
    price: 2.6,
    tags: ['brioche'],
    allergens: ['gluten', 'lait', 'oeufs', 'soja'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'kouign-amann',
    name: 'Kouign-amann',
    category: 'viennoiseries',
    art: 'kouign',
    description: 'Le gâteau breton: beurre, sucre, caramélisation. Servi tiède si vous le demandez.',
    price: 2.9,
    tags: ['feuilletage'],
    allergens: ['gluten', 'lait'],
    moments: ['gouter'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'brioche-citron',
    name: 'Brioche citron',
    category: 'viennoiseries',
    art: 'brioche',
    description: 'Une brioche fourrée de lemon curd maison.',
    price: 2.6,
    tags: ['brioche'],
    allergens: ['gluten', 'lait', 'oeufs'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'croissant-amandes',
    name: 'Croissant aux amandes',
    category: 'viennoiseries',
    art: 'croissant',
    description: 'Un croissant de la veille, imbibé, fourré à la crème d’amande, amandes effilées.',
    price: 2.7,
    tags: ['fruits-a-coque', 'feuilletage'],
    allergens: ['gluten', 'lait', 'oeufs', 'fruits-a-coque'],
  }),
  p({
    id: 'croissant-bicolore',
    name: 'Croissant bicolore',
    category: 'viennoiseries',
    art: 'croissant',
    description: 'Une pâte cacao et une pâte au beurre laminées ensemble. Le chef tourier aime les croissants à deux tons.',
    price: 2.4,
    tags: ['feuilletage', 'nouveau'],
    allergens: ['gluten', 'lait', 'soja'],
    isNew: true,
  }),
  p({
    id: 'torsade-pistache',
    name: 'Torsade pistache',
    category: 'viennoiseries',
    art: 'pain-raisins',
    description: 'Pâte feuilletée roulée, crème pistache, quelques éclats verts. Exemple de nouveauté.',
    price: 2.8,
    tags: ['feuilletage', 'fruits-a-coque', 'nouveau'],
    allergens: ['gluten', 'lait', 'oeufs', 'fruits-a-coque'],
    isNew: true,
  }),

  // ---------- Pâtisserie feuilletée (10)
  p({
    id: 'religieuse-brioche',
    name: 'Religieuse en pâte à brioche',
    category: 'feuillete',
    art: 'religieuse',
    description: 'La religieuse sans pâte à choux: deux boules de brioche, crème, glaçage.',
    price: 3.1,
    priceSource: 'reel',
    tags: ['signature', 'brioche'],
    allergens: ['gluten', 'lait', 'oeufs'],
    signature: true,
    moments: ['gouter'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'eclair-choco-noisette',
    name: 'Éclair choco-noisette',
    category: 'feuillete',
    art: 'eclair',
    description: 'Pas de pâte à choux: de la pâte à croissant. Crème chocolat, noisettes.',
    price: 3.2,
    tags: ['signature', 'feuilletage', 'fruits-a-coque'],
    allergens: ['gluten', 'lait', 'oeufs', 'fruits-a-coque', 'soja'],
    signature: true,
    moments: ['gouter'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'eclair-vanille-fraise',
    name: 'Éclair vanille-fraise',
    category: 'feuillete',
    art: 'eclair',
    description: 'Crème vanille, fraises fraîches, pâte à croissant.',
    price: 3.1,
    priceSource: 'reel',
    tags: ['feuilletage', 'de-saison'],
    allergens: ['gluten', 'lait', 'oeufs'],
    seasonal: true,
    moments: ['gouter'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'tartelette-abricot-romarin',
    name: 'Tartelette abricot-romarin',
    category: 'feuillete',
    art: 'tartelette',
    description: 'Un fond de pâte à croissant, des abricots rôtis, une feuille de romarin.',
    price: 3.4,
    tags: ['feuilletage', 'de-saison'],
    allergens: ['gluten', 'lait', 'oeufs'],
    seasonal: true,
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'tarte-fraise',
    name: 'Tarte fraise',
    category: 'feuillete',
    art: 'tartelette',
    description: 'Fraises du moment sur une crème légère, pâte à croissant.',
    price: 3.6,
    tags: ['feuilletage', 'de-saison'],
    allergens: ['gluten', 'lait', 'oeufs'],
    seasonal: true,
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'tartelette-citron',
    name: 'Tartelette citron',
    category: 'feuillete',
    art: 'tartelette',
    description: 'Un lemon curd qui réveille, un fond de pâte à croissant.',
    price: 3.3,
    tags: ['feuilletage'],
    allergens: ['gluten', 'lait', 'oeufs'],
  }),
  p({
    id: 'mille-feuille-vanille',
    name: 'Mille-feuille vanille',
    category: 'feuillete',
    art: 'millefeuille',
    description: 'Du croissant laminé en fines plaques, de la crème vanille de Madagascar.',
    price: 3.7,
    tags: ['feuilletage'],
    allergens: ['gluten', 'lait', 'oeufs'],
  }),
  p({
    id: 'paris-brest-croissant',
    name: 'Paris-Brest en pâte à croissant',
    category: 'feuillete',
    art: 'parisbrest',
    description: 'La couronne pralinée, réinventée sans choux. Exemple d’un classique « décliné ».',
    price: 3.9,
    tags: ['feuilletage', 'fruits-a-coque'],
    allergens: ['gluten', 'lait', 'oeufs', 'fruits-a-coque'],
  }),
  p({
    id: 'tartelette-chocolat-sarrasin',
    name: 'Tartelette chocolat sarrasin',
    category: 'feuillete',
    art: 'tartelette',
    description: 'Ganache chocolat et blé noir, pointe de sel.',
    price: 3.5,
    tags: ['feuilletage'],
    allergens: ['gluten', 'lait', 'oeufs', 'soja'],
  }),
  p({
    id: 'tartelette-pomme',
    name: 'Tartelette pomme rôtie',
    category: 'feuillete',
    art: 'tartelette',
    description: 'Exemple de tartelette d’automne: pommes rôties, caramel beurre salé.',
    price: 3.4,
    tags: ['feuilletage', 'de-saison'],
    allergens: ['gluten', 'lait', 'oeufs'],
    seasonal: true,
  }),

  // ---------- Flans (3)
  p({
    id: 'flan-part',
    name: 'Flan, la part',
    category: 'flans',
    art: 'flan',
    description: 'Une part de flan sur base de pâte à croissant précuite et crème à la vanille de Madagascar. Sept parfums chaque jour.',
    price: 3.9,
    priceSource: 'reel',
    unit: 'part',
    tags: ['signature', 'feuilletage', 'vegetarien'],
    allergens: ['gluten', 'lait', 'oeufs'],
    signature: true,
    moments: ['gouter'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'flan-entier',
    name: 'Flan entier, 6 parts',
    category: 'flans',
    art: 'flan',
    description: 'Le flan entier se découpe en six parts. Appelez la boutique pour connaître la disponibilité. Nous ne prenons pas de commande en ligne.',
    price: null,
    priceNote: 'Prix et disponibilité: appelez la boutique',
    priceSource: 'aucun',
    unit: 'flan',
    tags: ['feuilletage', 'vegetarien'],
    allergens: ['gluten', 'lait', 'oeufs'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'flan-edition-limitee',
    name: 'Flan en édition limitée',
    category: 'flans',
    art: 'flan',
    description: 'Gianduja, citron, pistache framboise, érable pécan: des éditions limitées nées de collaborations et d’idées de la communauté.',
    price: 3.9,
    priceSource: 'reel',
    unit: 'part',
    tags: ['nouveau', 'signature', 'vegetarien'],
    allergens: ['gluten', 'lait', 'oeufs', 'fruits-a-coque'],
    isNew: true,
    source: 'reel',
    nameVerified: true,
  }),

  // ---------- Douceurs (9)
  p({
    id: 'cookie',
    name: 'Cookie',
    category: 'douceurs',
    art: 'cookie',
    description: 'Épais, des morceaux de chocolat, un grain de fleur de sel.',
    price: 2.5,
    tags: ['vegetarien'],
    allergens: ['gluten', 'lait', 'oeufs', 'soja'],
    moments: ['gouter'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'mi-cuit',
    name: 'Mi-cuit fleur de sel',
    category: 'douceurs',
    art: 'cookie',
    description: 'Un gâteau chocolat à cœur fondant, relevé de fleur de sel.',
    price: 2.8,
    tags: ['signature', 'vegetarien'],
    allergens: ['gluten', 'lait', 'oeufs', 'soja'],
    signature: true,
    moments: ['gouter'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'cannele',
    name: 'Cannelé',
    category: 'douceurs',
    art: 'cannele',
    description: 'Croûte caramélisée, cœur moelleux, vanille et rhum.',
    price: 2.2,
    tags: ['vegetarien'],
    allergens: ['gluten', 'lait', 'oeufs'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'financier',
    name: 'Financier',
    category: 'douceurs',
    art: 'financier',
    description: 'Beurre noisette, amandes, un petit lingot doré.',
    price: 2.2,
    tags: ['vegetarien', 'fruits-a-coque'],
    allergens: ['gluten', 'lait', 'oeufs', 'fruits-a-coque'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'madeleine-nature',
    name: 'Madeleine nature',
    category: 'douceurs',
    art: 'madeleine',
    description: 'La bosse de la madeleine bien marquée, beurre et miel.',
    price: 1.8,
    tags: ['vegetarien'],
    allergens: ['gluten', 'lait', 'oeufs'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'madeleine-speculoos',
    name: 'Madeleine spéculoos',
    category: 'douceurs',
    art: 'madeleine',
    description: 'Les épices du spéculoos dans une madeleine tiède.',
    price: 2,
    tags: ['vegetarien'],
    allergens: ['gluten', 'lait', 'oeufs'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'cake-du-moment',
    name: 'Cake du moment',
    category: 'douceurs',
    art: 'cake',
    description: 'Une tranche de cake qui change selon les saisons.',
    price: 3,
    unit: 'tranche',
    tags: ['vegetarien', 'de-saison'],
    allergens: ['gluten', 'lait', 'oeufs'],
    seasonal: true,
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'brioche-tranche',
    name: 'Brioche, la part',
    category: 'douceurs',
    art: 'brioche',
    description: 'Une brioche moelleuse, pour le goûter ou le pain perdu.',
    price: 2.4,
    unit: 'part',
    tags: ['brioche', 'vegetarien'],
    allergens: ['gluten', 'lait', 'oeufs'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'panettone',
    name: 'Panettone, la part',
    category: 'douceurs',
    art: 'cake',
    description: 'Aperçu au stand de la Braderie. Un exemple de gourmandise de saison.',
    price: 4.5,
    unit: 'part',
    tags: ['de-saison', 'vegetarien'],
    allergens: ['gluten', 'lait', 'oeufs'],
    seasonal: true,
    source: 'reel',
    nameVerified: true,
  }),

  // ---------- Snacking froid (10)
  p({
    id: 'sandwich-complet',
    name: 'Le Complet',
    category: 'snacking-froid',
    art: 'sandwich',
    description: 'Pain complet bio, jambon blanc tranché sur place, comté, beurre.',
    price: 6.5,
    tags: [],
    allergens: ['gluten', 'lait'],
    moments: ['dejeuner'],
  }),
  p({
    id: 'sandwich-seigle',
    name: 'Le Seigle',
    category: 'snacking-froid',
    art: 'sandwich',
    description: 'Tourte de seigle, saumon fumé, fromage frais, citron.',
    price: 8.5,
    allergens: ['gluten', 'lait', 'poisson'],
    moments: ['dejeuner'],
  }),
  p({
    id: 'sandwich-bara',
    name: 'Le Bara garni',
    category: 'snacking-froid',
    art: 'sandwich',
    description: 'Pain bara, poulet rôti, crudités du primeur voisin, sauce yaourt.',
    price: 7.2,
    allergens: ['gluten', 'lait'],
    moments: ['dejeuner'],
  }),
  p({
    id: 'jambon-beurre',
    name: 'Jambon-beurre tradition',
    category: 'snacking-froid',
    art: 'sandwich',
    description: 'Baguette tradition, beurre, jambon. Le grand classique.',
    price: 5.5,
    allergens: ['gluten', 'lait'],
    moments: ['dejeuner'],
  }),
  p({
    id: 'sandwich-veggie',
    name: 'Le Végétal',
    category: 'snacking-froid',
    art: 'sandwich',
    description: 'Légumes grillés, houmous, roquette, sur pain T80.',
    price: 6.8,
    tags: ['vegetarien'],
    allergens: ['gluten', 'sesame'],
    moments: ['dejeuner'],
  }),
  p({
    id: 'sandwich-thon',
    name: 'Thon, œuf, crudités',
    category: 'snacking-froid',
    art: 'sandwich',
    description: 'Pain complet, thon, œuf dur, salade, tomate.',
    price: 6.2,
    allergens: ['gluten', 'oeufs', 'poisson', 'moutarde'],
    moments: ['dejeuner'],
  }),
  p({
    id: 'club-pain-de-mie',
    name: 'Club pain de mie',
    category: 'snacking-froid',
    art: 'sandwich',
    description: 'Trois étages de pain de mie toasté, poulet, œuf, tomate.',
    price: 7,
    allergens: ['gluten', 'oeufs', 'lait', 'moutarde'],
    moments: ['dejeuner'],
  }),
  p({
    id: 'mini-croissant-jambon',
    name: 'Croissant jambon-fromage',
    category: 'snacking-froid',
    art: 'croissant',
    description: 'Un croissant salé, jambon, emmental, béchamel légère.',
    price: 3.8,
    tags: ['feuilletage'],
    allergens: ['gluten', 'lait'],
    moments: ['petit-dejeuner', 'dejeuner'],
  }),
  p({
    id: 'tartine-du-jour',
    name: 'La tartine du jour',
    category: 'snacking-froid',
    art: 'sandwich',
    description: 'Une grande tranche de levain, garnie selon le marché.',
    price: 6,
    tags: ['de-saison'],
    allergens: ['gluten', 'lait'],
    seasonal: true,
    moments: ['dejeuner'],
  }),
  p({
    id: 'salade-composee',
    name: 'Salade composée de saison',
    category: 'snacking-froid',
    art: 'salade',
    description: 'Légumes de saison, graines, vinaigrette maison. Exemple.',
    price: 7.5,
    tags: ['de-saison', 'vegetarien'],
    allergens: ['moutarde', 'sesame'],
    seasonal: true,
    moments: ['dejeuner'],
  }),

  // ---------- Snacking chaud (4)
  p({
    id: 'hot-dog-croissant',
    name: 'Hot dog en pâte à croissant',
    category: 'snacking-chaud',
    art: 'hotdog',
    description: 'Une saucisse dans un feuilletage de croissant, réchauffé au four.',
    price: 5.2,
    tags: ['feuilletage'],
    allergens: ['gluten', 'lait', 'moutarde'],
    moments: ['dejeuner'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'brioche-suisse-poireaux',
    name: 'Brioche suisse, fondue de poireaux et saumon',
    category: 'snacking-chaud',
    art: 'pain-suisse',
    description: 'Une brioche feuilletée salée, poireaux fondus, saumon.',
    price: 5.8,
    tags: ['brioche'],
    allergens: ['gluten', 'lait', 'oeufs', 'poisson'],
    moments: ['dejeuner'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'croissant-burger',
    name: 'Croissant burger',
    category: 'snacking-chaud',
    art: 'burger',
    description: 'Un burger dans un croissant. Les clients disent: « Une réussite ! »',
    price: 8.9,
    tags: ['signature', 'feuilletage'],
    allergens: ['gluten', 'lait', 'oeufs', 'moutarde'],
    signature: true,
    moments: ['dejeuner'],
    source: 'reel',
    nameVerified: true,
  }),
  p({
    id: 'burg-oeuf',
    name: 'Burg’œuf',
    category: 'snacking-chaud',
    art: 'burger',
    description: 'Un petit pain laminé, œuf au plat, sauce tartare, cheddar, bacon fumé.',
    price: 6.9,
    tags: ['feuilletage'],
    allergens: ['gluten', 'lait', 'oeufs', 'moutarde'],
    moments: ['petit-dejeuner', 'dejeuner'],
    source: 'reel',
    nameVerified: true,
  }),
]

export const productById = (id: string): Product | undefined => PRODUCTS.find((x) => x.id === id)
export const categoryById = (id: CategoryId): Category => CATEGORIES.find((c) => c.id === id)!

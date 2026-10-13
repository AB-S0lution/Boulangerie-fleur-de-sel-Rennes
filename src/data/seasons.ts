// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// RÉEL: le principe « 7 parfums par jour, qui changent avec les saisons ».
// MOCK: la composition de chaque saison ci-dessous (la boutique publie les parfums du jour sur Instagram).
// Fêtes: la boutique a un highlight Instagram « fêtes » dont le contenu est inconnu. Rien ci-dessous n'est confirmé.

export type SeasonId = 'printemps' | 'ete' | 'automne' | 'hiver'

export interface Season {
  id: SeasonId
  label: string
  months: string
  /** ids de flans.ts, toujours 7 */
  board: string[]
  note: string
  festive: { label: string; status: 'mock' }[]
}

export const SEASONS: Season[] = [
  {
    id: 'printemps',
    label: 'Printemps',
    months: 'mars à mai',
    board: ['fraise', 'pistache', 'citron', 'vanille', 'rhubarbe', 'coco', 'chocolat-sarrasin'],
    note: 'Les premières fraises, la rhubarbe, des citrons vifs.',
    festive: [{ label: 'Pâques: exemple de flan « praliné », non confirmé', status: 'mock' }],
  },
  {
    id: 'ete',
    label: 'Été',
    months: 'juin à août',
    board: ['framboise', 'fraise', 'mangue-passion', 'coco', 'citron', 'pistache', 'vanille'],
    note: 'Des fruits frais, des parfums qui rafraîchissent.',
    festive: [{ label: 'Fête de la musique: exemple, non confirmé', status: 'mock' }],
  },
  {
    id: 'automne',
    label: 'Automne',
    months: 'septembre à novembre',
    board: ['framboise', 'pistache', 'chocolat-sarrasin', 'noisette', 'pomme-caramel', 'speculoos', 'chataigne'],
    note: 'Noisette, blé noir, pommes rôties. Les éditions limitées de la rentrée s’ajoutent au plateau.',
    festive: [{ label: 'Halloween: exemple, non confirmé', status: 'mock' }],
  },
  {
    id: 'hiver',
    label: 'Hiver',
    months: 'décembre à février',
    board: ['chocolat', 'praline-pecan', 'noisette', 'popcorn', 'speculoos', 'vanille', 'epeautre'],
    note: 'Des parfums de four: chocolat, praliné, épices.',
    festive: [
      { label: 'Galette des rois: non confirmée', status: 'mock' },
      { label: 'Bûche: non confirmée', status: 'mock' },
    ],
  },
]

export function currentSeason(date = new Date()): SeasonId {
  const m = date.getMonth() + 1
  if (m >= 3 && m <= 5) return 'printemps'
  if (m >= 6 && m <= 8) return 'ete'
  if (m >= 9 && m <= 11) return 'automne'
  return 'hiver'
}

export const seasonById = (id: SeasonId): Season => SEASONS.find((s) => s.id === id)!

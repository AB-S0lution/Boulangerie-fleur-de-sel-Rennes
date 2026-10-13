// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// 100 % RÉEL: les quatre éditions limitées lues dans les légendes Instagram de la boutique (critic pass, PLAN.md §2 et §15).
// Règle: on écrit « édition limitée » sans durée (« pendant 3 mois » n'est pas dans la légende).
// Ne pas nommer l'abonné qui a proposé pistache-framboise.

export type EditionOrigin = 'collab' | 'communauté' | 'équipe'

export interface LimitedEdition {
  id: string
  flanId: string
  name: string
  date: string
  dateLabel: string
  origin: EditionOrigin
  partner?: string
  story: string
  ref: string
}

export const LIMITED_EDITIONS: LimitedEdition[] = [
  {
    id: 'dolce-vita-gianduja',
    flanId: 'gianduja',
    name: 'Gianduja Dolce Vita',
    date: '2026-07-16',
    dateLabel: '16 juillet 2026',
    origin: 'collab',
    partner: 'Fratelli Peruzzi (Supino et Ciao Bella, Rennes)',
    story:
      '« Quando l’Italia rencontre Rennes. » Deux recettes, une même passion du goût, imaginées avec nos amis de Supino et Ciao Bella. À emporter chez nous, à savourer avant qu’il ne disparaisse.',
    ref: 'https://www.instagram.com/reel/Da3Er5rh-My',
  },
  {
    id: 'dolce-vita-citron',
    flanId: 'citron-dolce',
    name: 'Citron Dolce Vita',
    date: '2026-07-16',
    dateLabel: '16 juillet 2026',
    origin: 'collab',
    partner: 'Fratelli Peruzzi (Supino et Ciao Bella, Rennes)',
    story: 'Le second flan de la collaboration: un citron qui sent la dolce vita.',
    ref: 'https://www.instagram.com/reel/Da3Er5rh-My',
  },
  {
    id: 'communaute-pistache-framboise',
    flanId: 'pistache-framboise',
    name: 'Le flan de la communauté',
    date: '2026-09-30',
    dateLabel: '30 septembre 2026',
    origin: 'communauté',
    story:
      'Vous avez imaginé votre flan idéal en commentaire. L’idée la plus aimée, pistache et framboise, est devenue un vrai flan. « Vous l’avez imaginé, vous l’avez plébiscité, on l’a fait. »',
    ref: 'https://www.instagram.com/p/Dd6xpYrjj-y/',
  },
  {
    id: 'erable-pecan',
    flanId: 'erable-pecan',
    name: 'Sirop d’érable noix de pécan',
    date: '2026-10-07',
    dateLabel: '7 octobre 2026',
    origin: 'équipe',
    story:
      'Une proposition de notre équipe, racontée à la première personne sur Instagram: « le meilleur flan de toute l’histoire ». On vous laisse juger.',
    ref: 'https://www.instagram.com/p/DeMvICyDhlH/',
  },
]

// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// 100 % RÉEL (PLAN.md §11 stats.ts). Chaque chiffre porte sa source. Les chiffres datés sont présentés avec leur date.

export interface Stat {
  id: string
  value: string
  /** valeur numérique pour les compteurs animés, si pertinent */
  numeric?: number
  unit?: string
  label: string
  detail: string
  source: string
  asOf?: string
}

export const STATS: Stat[] = [
  { id: '2019', value: '2019', numeric: 2019, label: 'Meilleur croissant au beurre de France', detail: '1er Concours national, Baptiste Cortais', source: 'lesnouvellesdelaboulangerie.fr' },
  { id: '2022', value: '2022', numeric: 2022, label: 'Meilleur croissant au beurre de Bretagne', detail: 'Mathis Ruelleux', source: 'Ouest-France' },
  { id: '15h', value: '15', numeric: 15, unit: 'h', label: 'de fermentation pour le pain', detail: 'Levain naturel, farines biologiques', source: 'LaToque' },
  { id: '7parfums', value: '7', numeric: 7, label: 'parfums de flan chaque jour', detail: 'Ils changent avec les saisons', source: 'Office de tourisme, LaToque' },
  { id: 'prix-flan', value: '3,90', unit: '€', label: 'la part de flan', detail: 'Sur pâte à croissant, crème à la vanille de Madagascar', source: 'Office de tourisme (sept. 2026)', asOf: '2026-09' },
  { id: 'ouverture', value: '6 h 30', label: 'ouverture, six jours sur sept', detail: 'Dimanche compris. Fermé le lundi', source: 'Horaires publics' },
  { id: 'poids', value: '600 à 700', unit: 'g', label: 'par pain', detail: 'Des pains de campagne généreux', source: 'LaToque' },
  { id: 'flans-jour', value: '50 à 70', label: 'flans entiers par jour', detail: 'Environ 50 à 60 en semaine, jusqu’à 70 le week-end', source: 'LaToque (novembre 2025)', asOf: '2025-11' },
  { id: 'equipe', value: '13', numeric: 13, label: 'personnes dans l’équipe', detail: 'Chiffre de novembre 2025', source: 'LaToque', asOf: '2025-11' },
  { id: 'note', value: '4,8', unit: '/5', label: 'sur Google, 270+ avis', detail: 'À recontrôler avant mise en ligne', source: 'Miroirs d’avis (oct. 2026)', asOf: '2026-10' },
]

export const stat = (id: string): Stat => {
  const s = STATS.find((x) => x.id === id)
  if (!s) throw new Error(`Stat inconnue: ${id}`)
  return s
}

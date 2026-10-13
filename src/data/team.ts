// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// RÉEL: les deux co-gérants et leurs rôles publics, le fait qu'il y ait un traiteur dans l'équipe, l'effectif de 13 personnes (nov. 2025).
// MOCK: les autres rôles (aucun nom, aucune photo). Aucun autre employé n'est nommé sans autorisation.

export interface TeamMember {
  id: string
  name?: string
  role: string
  description: string
  named: boolean
  source: 'reel' | 'mock'
}

export const TEAM: TeamMember[] = [
  {
    id: 'baptiste',
    name: 'Baptiste Cortais',
    role: 'Chef tourier, co-gérant',
    description: 'Il dirige la viennoiserie. « Un bon croissant se joue à 90 % dans le pétrin. »',
    named: true,
    source: 'reel',
  },
  {
    id: 'mathis',
    name: 'Mathis Ruelleux',
    role: 'Boulanger, co-gérant',
    description: 'Il dirige le pain et le levain. Il aime les farines torréfiées et les concours « pour sortir la tête du quotidien ».',
    named: true,
    source: 'reel',
  },
  {
    id: 'boulangers',
    role: 'Boulangers et boulangères',
    description: 'Pétrissage, façonnage et cuisson du pain bio au levain, avant l’ouverture.',
    named: false,
    source: 'mock',
  },
  {
    id: 'tourier',
    role: 'Tourières et touriers',
    description: 'Ils plient, étirent et laminent la pâte, des croissants aux bases de flans.',
    named: false,
    source: 'mock',
  },
  {
    id: 'flans',
    role: 'Bar à flans',
    description: 'Les sept parfums du jour, de la crème au dernier éclat de topping.',
    named: false,
    source: 'mock',
  },
  {
    id: 'traiteur',
    role: 'Traiteur',
    description: 'Garnitures maison, viandes tranchées sur place, sandwichs et snacking chaud.',
    named: false,
    source: 'reel',
  },
  {
    id: 'vente',
    role: 'Vendeuses et vendeurs',
    description: 'L’accueil du comptoir, de 6 h 30 à la fermeture, avec le sourire.',
    named: false,
    source: 'mock',
  },
  {
    id: 'apprenti',
    role: 'Apprenti·e',
    description: 'Un poste d’exemple: la maison transmet ses gestes.',
    named: false,
    source: 'mock',
  },
]

export const TEAM_SIZE_NOTE = '13 personnes en novembre 2025'

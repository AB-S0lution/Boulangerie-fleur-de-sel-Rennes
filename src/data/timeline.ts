// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// RÉEL: chronologie issue de PLAN.md §2 (dates exactes). Ce qui est annoncé mais pas encore là est marqué `status: 'annonce'`.
// À ne jamais écrire: l'âge ou la date de naissance des fondateurs, les années de Maison Poirier, un lien avec la famille Poirier.

export interface TimelineEvent {
  id: string
  date: string
  year: string
  label: string
  title: string
  text: string
  status?: 'annonce'
}

export const TIMELINE: TimelineEvent[] = [
  { id: '2019', date: '2019-10-28', year: '2019', label: 'octobre 2019', title: 'Un croissant, un titre national', text: 'Baptiste Cortais remporte le 1er Concours national du Meilleur Croissant au Beurre, à Ferrières-en-Brie, au sein de Maison Fraudin à Saint-Grégoire.' },
  { id: '2020', date: '2020-01-01', year: '2020', label: '2020', title: 'Deux boulangers se rencontrent', text: 'Baptiste et Mathis travaillent ensemble pendant quatre à cinq ans chez Maison Fraudin.' },
  { id: '2022', date: '2022-10-11', year: '2022', label: 'octobre 2022', title: 'Un titre breton', text: 'Mathis Ruelleux remporte le Meilleur Croissant au Beurre de Bretagne.' },
  { id: '2023', date: '2023-10-01', year: '2023', label: 'octobre 2023', title: 'L’idée d’une maison à eux', text: 'Le projet d’ouvrir leur propre boulangerie prend forme.' },
  { id: 'reprise', date: '2025-06-13', year: '2025', label: 'juin 2025', title: 'La reprise du 161 rue de Saint-Malo', text: 'Ils reprennent un ancien fonds de boulangerie, remplacent les machines, remettent le lieu à blanc avec un logo doré.' },
  { id: 'ouverture', date: '2025-07-08', year: '2025', label: '8 juillet 2025', title: 'Ouverture à 6 h 30', text: '« On a dormi sur un sac de farine ! » Une journée d’une heure du matin à vingt heures, pour le premier jour.' },
  { id: 'flan', date: '2025-09-26', year: '2025', label: 'septembre 2025', title: 'Le flan entre dans les guides', text: 'L’office de tourisme de Rennes publie « Où trouver les meilleurs flans de Rennes ? » et cite la maison.' },
  { id: 'snacking', date: '2025-10-03', year: '2025', label: '3 octobre 2025', title: 'Le snacking chaud arrive', text: 'Hot dog en pâte à croissant, croissant burger, Burg’œuf: la pâte feuilletée passe au salé.' },
  { id: 'un-an', date: '2026-07-08', year: '2026', label: '8 juillet 2026', title: 'Une première bougie', text: '« Difficile de résumer cette première année en quelques lignes. Une chose est sûre: rien de tout cela n’aurait la même saveur sans vous. »' },
  { id: 'dolce-vita', date: '2026-07-16', year: '2026', label: '16 juillet 2026', title: 'Dolce Vita', text: 'Deux flans en édition limitée avec Fratelli Peruzzi: gianduja et citron.' },
  { id: 'open-blot', date: '2026-09-14', year: '2026', label: '14-20 septembre 2026', title: 'Du four au court', text: 'Partenaire de l’Open Blot Rennes, avec un atelier de dégustation dans les salons VIP.' },
  { id: 'braderie', date: '2026-09-20', year: '2026', label: '20 septembre 2026', title: 'La Braderie du Canal Saint-Martin', text: 'Un stand rue Lenoir dès 6 h, et la boutique ouverte jusqu’à 17 h.' },
  { id: 'communaute', date: '2026-09-30', year: '2026', label: '30 septembre 2026', title: 'Le flan de la communauté', text: 'Pistache framboise: l’idée la plus plébiscitée en commentaires devient un vrai flan.' },
  { id: 'fidelite', date: '2026-10-04', year: '2026', label: '4 octobre 2026', title: 'Une carte de fidélité se prépare', text: 'Annoncée pour les prochaines semaines. Elle n’est pas encore disponible.', status: 'annonce' },
]

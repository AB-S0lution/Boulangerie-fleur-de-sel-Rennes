// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// RÉEL (faits tissés dans les étapes): « un bon croissant se joue à 90 % dans le pétrin », 15 h de fermentation du levain,
// beurre AOP, « deux ans de mise au point », pré-cuisson de la base du flan, sel de Guérande, VMI spiral mixer.
// MOCK: la rédaction des étapes (le détail précis du procédé de la maison n'est pas public).
// Étiquettes à l'infinitif, pas de « Étape 1 ».

export interface ProcessStep {
  id: string
  verb: string
  title: string
  text: string
  fact?: string
  clock: string
}

export const PROCESS: ProcessStep[] = [
  {
    id: 'petrir',
    verb: 'Pétrir',
    title: 'Tout se joue dans le pétrin',
    text: 'Plus il y a de volume au pétrissage, meilleure est la pâte. Un pétrin spiral donne à la farine et à l’eau le temps de se rencontrer.',
    fact: '« Un bon croissant se joue à quatre-vingt-dix pour cent dans le pétrin. »',
    clock: '01 h 00',
  },
  {
    id: 'tourer',
    verb: 'Tourer',
    title: 'Le beurre se plie dans la pâte',
    text: 'On enferme le beurre AOP dans la détrempe, puis on plie et on étire. Chaque tour multiplie les couches. C’est le tourage.',
    fact: 'Il aura fallu deux ans de mise au point, en modifiant des paramètres tous les jours.',
    clock: '02 h 30',
  },
  {
    id: 'pousser',
    verb: 'Laisser pousser',
    title: 'Le temps fait le travail',
    text: 'Le levain naturel travaille environ quinze heures sur le pain. La pâte à croissant, elle, repose et pousse à son rythme.',
    fact: 'Quinze heures de fermentation pour nos pains bio.',
    clock: '03 h 30',
  },
  {
    id: 'faconner',
    verb: 'Façonner',
    title: 'Un geste, mille fois',
    text: 'Croissants, pains au chocolat, bases de flans: chaque pâton est détaillé, roulé, posé à la main.',
    clock: '04 h 45',
  },
  {
    id: 'cuire',
    verb: 'Cuire',
    title: 'La croûte vient avec le feu',
    text: 'La base des flans est précuite pour rester croustillante sous la crème. Les croissants sortent dorés, les pains craquent en refroidissant.',
    fact: 'La base du flan est précuite pour garder son croustillant.',
    clock: '05 h 45',
  },
  {
    id: 'saler',
    verb: 'Saler',
    title: 'Une pincée, et tout prend du goût',
    text: 'Fleur de sel dans le bara, sur le mi-cuit, dans les flans: c’est la signature de la maison, et la raison de son nom.',
    fact: '« Sans le sel, il n’y a pas de goût, il n’y a rien. »',
    clock: '06 h 30',
  },
]

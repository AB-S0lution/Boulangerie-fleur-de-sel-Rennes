// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// Définitions rédigées pour le site (inspiration: le glossaire de Mamiche, PLAN.md §8). Mock éditorial,
// mais les faits cités sont ceux de la boutique (bara, empois, AOP, tourier).

export interface GlossaryEntry {
  term: string
  type: string
  definition: string
  note?: string
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: 'Fleur de sel',
    type: 'nom féminin',
    definition: 'Fine couche de cristaux de sel qui se forme à la surface des marais salants, récoltée à la main. Elle fond sous la dent et apporte du goût sans saler lourdement.',
    note: 'Elle donne son nom à la maison.',
  },
  {
    term: 'Tourage',
    type: 'nom masculin',
    definition: 'Technique qui consiste à plier et étirer plusieurs fois une pâte autour d’une couche de beurre, pour obtenir des dizaines de feuillets.',
  },
  {
    term: 'Tourier, tourière',
    type: 'métier',
    definition: 'Celui ou celle qui réalise les pâtes feuilletées levées: croissants, pains au chocolat, brioches feuilletées.',
    note: 'Baptiste Cortais est notre chef tourier.',
  },
  {
    term: 'Bara',
    type: 'nom breton',
    definition: 'Le pain, en breton. Chez nous, un pain de farine T80 et de blé noir, au sel de Guérande, avec des graines de sarrasin torréfiées.',
  },
  {
    term: 'Levain',
    type: 'nom masculin',
    definition: 'Pâte vivante, faite de farine et d’eau, que l’on nourrit pour faire lever le pain sans levure.',
    note: 'Quinze heures de fermentation chez nous.',
  },
  {
    term: 'Empois d’amidon',
    type: 'terme technique',
    definition: 'Mélange de farine et d’eau cuit à part, ajouté à la pâte pour garder une mie moelleuse. Nous l’utilisons dans notre pain de mie.',
  },
  {
    term: 'AOP',
    type: 'sigle',
    definition: 'Appellation d’origine protégée. Notre beurre est un AOP Charentes-Poitou.',
  },
  {
    term: 'Sarrasin, blé noir',
    type: 'nom',
    definition: 'Plante dont on tire une farine sombre, très liée à la cuisine bretonne. On la retrouve dans le bara et dans un flan.',
  },
]

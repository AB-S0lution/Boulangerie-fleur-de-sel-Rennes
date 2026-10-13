// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// Les réponses s'appuient sur des faits vérifiés (PLAN.md §11). La formulation est d'exemple.
// `status: 'a-confirmer'` = information non confirmée par la boutique: la réponse renvoie vers un appel.
// Volontairement absent: tout e-mail, tout service de commande en ligne, livraison, click-and-collect.

export type FaqTopic = 'horaires' | 'produits' | 'flans' | 'venir' | 'pratique'

export interface FaqItem {
  id: string
  topic: FaqTopic
  question: string
  answer: string
  status: 'verifie' | 'a-confirmer'
  keywords: string[]
}

export const FAQ_TOPICS: { id: FaqTopic; label: string }[] = [
  { id: 'horaires', label: 'Horaires' },
  { id: 'produits', label: 'Produits' },
  { id: 'flans', label: 'Flans' },
  { id: 'venir', label: 'Venir' },
  { id: 'pratique', label: 'Pratique' },
]

export const FAQ: FaqItem[] = [
  {
    id: 'horaires',
    topic: 'horaires',
    question: 'Quels sont vos horaires ?',
    answer:
      'Du mardi au vendredi de 6 h 30 à 19 h, le samedi de 6 h 30 à 14 h 30 et le dimanche de 6 h 30 à 12 h 30. Nous sommes fermés le lundi.',
    status: 'verifie',
    keywords: ['ouvert', 'heure', 'horaire', 'ouverture', 'fermeture'],
  },
  {
    id: 'dimanche',
    topic: 'horaires',
    question: 'Êtes-vous ouverts le dimanche ?',
    answer:
      'Oui, dès 6 h 30 et jusqu’à 12 h 30. Les croissants du dimanche sont les mêmes que ceux de la semaine.',
    status: 'verifie',
    keywords: ['dimanche', 'week-end'],
  },
  {
    id: 'lundi',
    topic: 'horaires',
    question: 'Êtes-vous ouverts le lundi ?',
    answer: 'Non, la boutique est fermée le lundi. Nous rouvrons le mardi dès 6 h 30.',
    status: 'verifie',
    keywords: ['lundi', 'fermé', 'repos'],
  },
  {
    id: 'feries',
    topic: 'horaires',
    question: 'Ouvrez-vous les jours fériés ?',
    answer:
      'D’après la presse locale, la boutique est fermée les jours fériés. Pour une date précise, appelez-nous au 02 23 46 47 61.',
    status: 'a-confirmer',
    keywords: ['férié', 'noël', 'jour de l’an', '1er mai'],
  },
  {
    id: 'bio',
    topic: 'produits',
    question: 'Tout votre pain est-il bio ?',
    answer:
      'Tous nos pains au levain sont issus de l’agriculture biologique (certifiés AB). La seule exception est la baguette tradition.',
    status: 'verifie',
    keywords: ['bio', 'biologique', 'levain', 'certification', 'ab'],
  },
  {
    id: 'beurre',
    topic: 'produits',
    question: 'Quel beurre utilisez-vous ?',
    answer:
      'Un beurre AOP Charentes-Poitou, jamais de margarine. « C’est moins cher, c’est sûr, mais ça n’a pas de goût. »',
    status: 'verifie',
    keywords: ['beurre', 'aop', 'margarine', 'croissant'],
  },
  {
    id: 'allergenes',
    topic: 'produits',
    question: 'Comment connaître les allergènes ?',
    answer:
      'Les allergènes indiqués sur ce site sont des exemples. En boutique, demandez-nous la liste à jour d’un produit avant de le choisir.',
    status: 'verifie',
    keywords: ['allergène', 'gluten', 'lait', 'noix', 'intolérance'],
  },
  {
    id: 'snacking',
    topic: 'produits',
    question: 'Proposez-vous des sandwichs et du snacking chaud ?',
    answer:
      'Oui. Un pain, un sandwich: chaque pain a le sien. Et depuis octobre 2025, des snacks chauds en pâte à croissant, réchauffés au four.',
    status: 'verifie',
    keywords: ['sandwich', 'déjeuner', 'burger', 'hot dog', 'snacking'],
  },
  {
    id: 'flan-quoi',
    topic: 'flans',
    question: 'Qu’est-ce qu’un flan sur pâte à croissant ?',
    answer:
      'C’est notre version du flan pâtissier: une base de pâte à croissant précuite pour rester croustillante, une crème à la vanille de Madagascar, et un parfum en insert ou en topping.',
    status: 'verifie',
    keywords: ['flan', 'pâte', 'croissant', 'vanille'],
  },
  {
    id: 'flan-parfums',
    topic: 'flans',
    question: 'Combien y a-t-il de parfums ?',
    answer:
      'Sept parfums chaque jour, qui changent avec les saisons. La liste du jour est publiée sur notre Instagram @fleurdesel_rennes.',
    status: 'verifie',
    keywords: ['parfum', 'saveur', 'framboise', 'pistache', 'instagram'],
  },
  {
    id: 'flan-prix',
    topic: 'flans',
    question: 'Combien coûte une part de flan ?',
    answer: '3,90 € la part. Les éditions limitées sont au même prix.',
    status: 'verifie',
    keywords: ['prix', 'tarif', 'part', '3,90'],
  },
  {
    id: 'flan-entier',
    topic: 'flans',
    question: 'Peut-on acheter un flan entier ?',
    answer:
      'Un flan entier se découpe en six parts. Pour connaître la disponibilité, appelez la boutique. Nous n’avons pas de commande en ligne.',
    status: 'a-confirmer',
    keywords: ['entier', 'six', 'commande', 'réserver', 'anniversaire'],
  },
  {
    id: 'place',
    topic: 'venir',
    question: 'Peut-on s’asseoir et consommer sur place ?',
    answer:
      'Non: la boutique est à emporter uniquement. Nous n’avons malheureusement pas la place, même si cela nous aurait beaucoup plu.',
    status: 'verifie',
    keywords: ['salle', 'terrasse', 'sur place', 'asseoir', 'emporter'],
  },
  {
    id: 'acces',
    topic: 'venir',
    question: 'Comment venir en transports ?',
    answer:
      'L’arrêt de bus Saint-Martin est à environ 60 mètres (lignes C1 et 12, ligne E4 un peu plus loin). Le métro A, station Anatole France, est à environ 600 mètres.',
    status: 'verifie',
    keywords: ['bus', 'métro', 'transport', 'star', 'arrêt'],
  },
  {
    id: 'paiement',
    topic: 'pratique',
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer:
      'Nous ne pouvons pas vous le confirmer ici. Appelez la boutique au 02 23 46 47 61 avant de passer, nous vous répondrons avec plaisir.',
    status: 'a-confirmer',
    keywords: ['carte', 'espèces', 'paiement', 'ticket restaurant', 'cb'],
  },
  {
    id: 'accessibilite',
    topic: 'pratique',
    question: 'La boutique est-elle accessible ? Y a-t-il un parking ?',
    answer:
      'Nous n’avons pas encore d’information publique à jour sur l’accessibilité ni le stationnement. Contactez-nous par téléphone, nous vous guiderons.',
    status: 'a-confirmer',
    keywords: ['pmr', 'accessible', 'fauteuil', 'parking', 'stationnement', 'handicap'],
  },
]

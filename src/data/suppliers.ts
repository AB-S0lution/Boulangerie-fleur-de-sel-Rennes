// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// RÉEL: beurre AOP Charentes-Poitou (Lescure), farines torréfiées de Vallée Torréfaction (la localisation « Janzé » est NON vérifiée:
// ne pas l'afficher), sel de Guérande dans le bara, vanille de Madagascar dans la crème des flans, légumes du primeur voisin (non nommé).
// MOCK: les phrases descriptives. `origin` reste une région/pays, jamais une adresse de fournisseur.

export interface Supplier {
  id: string
  name: string
  what: string
  where: string
  note: string
  source: 'reel'
  ref: string
}

export const SUPPLIERS: Supplier[] = [
  {
    id: 'beurre',
    name: 'Beurre AOP Charentes-Poitou',
    what: 'Le beurre du croissant et de toute la pâte feuilletée',
    where: 'Charentes-Poitou',
    note: 'Fourni par Lescure. Jamais de margarine.',
    source: 'reel',
    ref: 'LaToque',
  },
  {
    id: 'torrefaction',
    name: 'Vallée Torréfaction',
    what: 'Farines et céréales torréfiées',
    where: 'Torréfacteur partenaire',
    note: '« De formidables exhausteurs naturels de goût, même à faible dosage. »',
    source: 'reel',
    ref: 'LaToque',
  },
  {
    id: 'guerande',
    name: 'Sel de Guérande',
    what: 'Dans le bara, et la pointe de sel qui donne son nom à la maison',
    where: 'Guérande',
    note: '« Sans le sel, il n’y a pas de goût, il n’y a rien. »',
    source: 'reel',
    ref: 'actu.fr',
  },
  {
    id: 'vanille',
    name: 'Vanille de Madagascar',
    what: 'La crème de tous les flans',
    where: 'Madagascar',
    note: 'Elle donne sa base à chaque part.',
    source: 'reel',
    ref: 'Presse, office de tourisme',
  },
  {
    id: 'primeur',
    name: 'Le primeur voisin',
    what: 'Les légumes des sandwichs',
    where: 'Dans le quartier',
    note: 'On le cite sans le nommer, en attendant son accord.',
    source: 'reel',
    ref: 'LaToque',
  },
]

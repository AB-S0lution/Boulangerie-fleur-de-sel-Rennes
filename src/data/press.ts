// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// RÉEL: médias, dates et URL (PLAN.md §2 et §14). Les « titres » entre guillemets sont les vrais titres quand
// `exactTitle` est vrai; sinon c'est une description neutre de l'article (titre exact non relevé).
// Aucun logo de média n'est reproduit: texte uniquement.

export interface PressItem {
  id: string
  outlet: string
  date: string
  dateLabel: string
  title: string
  exactTitle: boolean
  excerpt?: string
  url: string
  source: 'reel'
}

export const PRESS: PressItem[] = [
  {
    id: 'unidivers',
    outlet: 'Unidivers',
    date: '2025-07-10',
    dateLabel: '10 juillet 2025',
    title: 'Fleur de sel, rue de Saint-Malo: une maison du bon goût',
    exactTitle: false,
    excerpt: '« une maison du bon goût »',
    url: 'https://unidivers.fr/fleur-de-sel-rennes-rue-saint-malo/',
    source: 'reel',
  },
  {
    id: 'actufr',
    outlet: 'actu.fr',
    date: '2025-07-10',
    dateLabel: '10 juillet 2025',
    title: 'Une nouvelle boulangerie a ouvert dans ce quartier de Rennes',
    exactTitle: false,
    url: 'https://actu.fr/bretagne/rennes_35238/fleur-de-sel-une-nouvelle-boulangerie-a-ouvert-dans-ce-quartier-de-rennes-on-a-pousse-les-portes_62891553.html',
    source: 'reel',
  },
  {
    id: 'telegramme',
    outlet: 'Le Télégramme',
    date: '2025-07-14',
    dateLabel: '14 juillet 2025',
    title: '« On a dormi sur un sac de farine »: ces rois du croissant ouvrent une nouvelle boulangerie à Rennes',
    exactTitle: false,
    url: 'https://www.letelegramme.fr/ille-et-vilaine/rennes-35000/on-a-dormi-sur-un-sac-de-farine-ces-rois-du-croissant-ouvrent-une-nouvelle-boulangerie-a-rennes-6854016.php',
    source: 'reel',
  },
  {
    id: 'ouest-france',
    outlet: 'Ouest-France',
    date: '2025-07-14',
    dateLabel: '14 juillet 2025',
    title: 'La boulangerie Fleur de sel veut transformer les pâtisseries en viennoiseries',
    exactTitle: false,
    url: 'https://www.ouest-france.fr/bretagne/rennes-35000/a-rennes-la-boulangerie-fleur-de-sel-veut-transformer-les-patisseries-en-viennoiseries-fe8266ea-5b35-11f0-8b05-6b82fd3c3480',
    source: 'reel',
  },
  {
    id: 'lessentiel',
    outlet: "L'Essentiel",
    date: '2025-07-25',
    dateLabel: '25 juillet 2025',
    title: 'Rennes: cette boulangerie décline la pâtisserie en viennoiserie',
    exactTitle: false,
    url: 'https://www.lessentiel.fr/rennes/bonnes-adresses/2025-07-25/rennes-cette-boulangerie-decline-la-patisserie-en-viennoiserie',
    source: 'reel',
  },
  {
    id: 'tourisme',
    outlet: 'Destination Rennes, office de tourisme',
    date: '2025-09-26',
    dateLabel: 'septembre 2025, mis à jour le 22 septembre 2026',
    title: 'Où trouver les meilleurs flans de Rennes ?',
    exactTitle: true,
    excerpt: '« En un mot : miam ! »',
    url: 'https://www.tourisme-rennes.com/decouvrir-rennes/gastronomie/flan-patissier/',
    source: 'reel',
  },
  {
    id: 'latoque',
    outlet: 'LaToque',
    date: '2025-11-21',
    dateLabel: '21 novembre 2025',
    title: 'Fleur de sel: le croissant en fil rouge',
    exactTitle: true,
    excerpt: '« Avant tout, un goût de beurre »',
    url: 'https://www.latoque.fr/snacking/article/890453/fleur-de-sel-le-croissant-en-fil-rouge',
    source: 'reel',
  },
  {
    id: 'credit-agricole',
    outlet: "Crédit Agricole d'Ille-et-Vilaine",
    date: '2025-10-08',
    dateLabel: 'octobre 2025',
    title: 'Publication « Nos commerçants » consacrée à la boulangerie',
    exactTitle: false,
    url: 'https://fr.linkedin.com/posts/cr-dit-agricole-d-ille-et-vilaine_nos-commer%C3%A7ants-la-boulangerie-fleur-activity-7381939010103005184-QH_b',
    source: 'reel',
  },
]

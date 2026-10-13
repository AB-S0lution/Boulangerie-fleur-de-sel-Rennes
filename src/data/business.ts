// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// Ce fichier est 100 % RÉEL (source: PLAN.md §1, vérifié le 2026-10-13). Rien ici n'est inventé.
// Volontairement absents: e-mail (non confirmé), numéro de mobile (privé), dates de naissance,
// logo (non fourni), prix de la baguette tradition (non vérifié).

export type Source = 'reel' | 'mock'

export interface Social {
  id: 'instagram' | 'facebook'
  label: string
  handle: string
  url: string
  note: string
}

export interface Award {
  year: number
  who: string
  title: string
  detail: string
  source: Source
  ref: string
}

export interface Business {
  name: string
  shortName: string
  legalName: string
  tagline: string
  concept: string
  phone: string
  phoneDisplay: string
  address: {
    street: string
    postalCode: string
    city: string
    country: string
    corner: string
    quartier: string
  }
  geo: { lat: number; lng: number }
  openedOn: string
  openedAtHour: string
  legal: {
    form: string
    capital: string
    siren: string
    siret: string
    rcs: string
    naf: string
  }
  organic: { label: string; certifier: string; operator: string; since: string; scope: string }
  founders: { name: string; role: string; line: string }[]
  links: { maps: string; osm: string; instagram: string; facebook: string }
  demoNotice: string
}

export const BUSINESS: Business = {
  name: 'Fleur de sel',
  shortName: 'FDS',
  legalName: 'SARL FLEUR DE SEL',
  tagline: "L'or du four, le sel du goût.",
  concept: 'Boulangerie-viennoiserie artisanale. On décline la pâtisserie en viennoiserie.',
  phone: '+33223464761',
  phoneDisplay: '02 23 46 47 61',
  address: {
    street: '161 rue de Saint-Malo',
    postalCode: '35000',
    city: 'Rennes',
    country: 'FR',
    corner: 'à l’angle de la rue de Saint-Malo et du boulevard de Verdun',
    quartier: 'Saint-Martin',
  },
  geo: { lat: 48.12311, lng: -1.68461 },
  openedOn: '2025-07-08',
  openedAtHour: '6 h 30',
  legal: {
    form: 'SARL',
    capital: '10 000 €',
    siren: '944 521 426',
    siret: '944 521 426 00014',
    rcs: 'RCS Rennes',
    naf: '10.71C (boulangerie et boulangerie-pâtisserie)',
  },
  organic: {
    label: 'Agriculture biologique (AB)',
    certifier: 'Bureau Veritas, FR-BIO-10',
    operator: 'Agence Bio, opérateur n° 70935',
    since: '2025-06-05',
    scope: 'Pain frais, au levain. Seule exception: la baguette tradition.',
  },
  founders: [
    {
      name: 'Baptiste Cortais',
      role: 'Chef tourier',
      line: 'Il gère la viennoiserie. 1er prix du 1er Concours national du Meilleur Croissant au Beurre, 2019.',
    },
    {
      name: 'Mathis Ruelleux',
      role: 'Boulanger',
      line: 'Il gère le pain. Meilleur Croissant au Beurre de Bretagne, 2022.',
    },
  ],
  links: {
    maps: 'https://www.google.com/maps/search/?api=1&query=161+rue+de+Saint-Malo+35000+Rennes',
    osm: 'https://www.openstreetmap.org/?mlat=48.12311&mlon=-1.68461#map=18/48.12311/-1.68461',
    instagram: 'https://www.instagram.com/fleurdesel_rennes/',
    facebook: 'https://www.facebook.com/p/Fleur-de-sel-61577092253181/',
  },
  demoNotice:
    "Site de démonstration. Il n'est pas le site officiel de la boutique: les produits, prix hors repères publics, articles et réponses sont des données d'exemple.",
}

export const SOCIALS: Social[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@fleurdesel_rennes',
    url: BUSINESS.links.instagram,
    note: 'Les 7 parfums du jour y sont publiés. Environ 5,8 k abonnés (octobre 2026).',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    handle: 'Fleur de sel | Rennes',
    url: BUSINESS.links.facebook,
    note: 'Canal secondaire.',
  },
]

export const AWARDS: Award[] = [
  {
    year: 2019,
    who: 'Baptiste Cortais',
    title: 'Meilleur croissant de France 2019',
    detail:
      '1er prix du 1er Concours national du Meilleur Croissant au Beurre (CNBPF avec le CNIEL), 28-30 octobre 2019, Ferrières-en-Brie.',
    source: 'reel',
    ref: 'https://lesnouvellesdelaboulangerie.fr/actualites/baptiste-cortais-remporte-le-1er-concours-national-du-meilleur-croissant-au-beurre/',
  },
  {
    year: 2022,
    who: 'Mathis Ruelleux',
    title: 'Meilleur croissant au beurre de Bretagne 2022',
    detail: '1er prix régional du Meilleur Croissant au Beurre de Bretagne.',
    source: 'reel',
    ref: 'https://www.ouest-france.fr/bretagne/rennes-35000/ce-boulanger-de-saint-gregoire-remporte-le-prix-du-meilleur-croissant-breton-6f9c8366-4b07-11ed-a299-c34310d448f8',
  },
  {
    year: 2026,
    who: "Un membre de l'équipe",
    title: '2e du Master régional du Meilleur Pain au Chocolat',
    detail: 'Bretagne, Ploufragan, 9 avril 2026. Les cinq premiers sont qualifiés pour la finale nationale à Paris, le 29 octobre 2026.',
    source: 'reel',
    ref: 'https://www.instagram.com/p/DW7RvvLDMb3',
  },
]

/** Données pour le JSON-LD Bakery. Uniquement du vérifié. */
export function bakeryJsonLd(origin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: BUSINESS.name,
    alternateName: ['Boulangerie Fleur de sel', 'FDS'],
    slogan: BUSINESS.tagline,
    description:
      'Boulangerie-viennoiserie artisanale à Rennes (quartier Saint-Martin): pain bio au levain, croissants au beurre AOP et bar à flans sur pâte à croissant.',
    telephone: BUSINESS.phone,
    priceRange: '€',
    foundingDate: BUSINESS.openedOn,
    image: `${origin}og.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      postalCode: BUSINESS.address.postalCode,
      addressLocality: BUSINESS.address.city,
      addressCountry: BUSINESS.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '06:30',
        closes: '19:00',
      },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '06:30', closes: '14:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '06:30', closes: '12:30' },
    ],
    sameAs: [BUSINESS.links.instagram, BUSINESS.links.facebook],
    founder: BUSINESS.founders.map((f) => ({ '@type': 'Person', name: f.name, jobTitle: f.role })),
  }
}

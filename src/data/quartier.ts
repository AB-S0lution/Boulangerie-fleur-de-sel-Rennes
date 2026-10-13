// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// RÉEL: les lieux (PLAN.md §6), ainsi que les distances à vol d'oiseau OSM, APPROXIMATIVES.
// MOCK: les phrases de présentation. Aucun lien d'affaires n'est sous-entendu avec ces lieux.
// `order` suit la promenade: du canal à l'angle de la rue de Saint-Malo et du boulevard de Verdun.
// `x`/`y` positionnent les lieux sur le schéma SVG original de la page (pas une carte à l'échelle).

export interface Poi {
  id: string
  name: string
  kind: 'nature' | 'patrimoine' | 'marche' | 'ecole' | 'transport' | 'boutique'
  approxMeters: number
  blurb: string
  x: number
  y: number
  order: number
}

export const POIS: Poi[] = [
  { id: 'prairies', name: 'Prairies Saint-Martin', kind: 'nature', approxMeters: 755, blurb: 'Une trentaine d’hectares de nature en ville, des passerelles de bois et des prairies fauchées tard.', x: 80, y: 60, order: 1 },
  { id: 'canal', name: 'Canal d’Ille-et-Rance', kind: 'patrimoine', approxMeters: 500, blurb: 'Creusé entre 1804 et 1832, il a remodelé le faubourg industriel, des moulins aux écluses.', x: 160, y: 130, order: 2 },
  { id: 'plomberie', name: 'La Plomberie du Canal', kind: 'patrimoine', approxMeters: 475, blurb: 'Un lieu du canal, repère de promenade.', x: 215, y: 160, order: 3 },
  { id: 'jardin-sechoir', name: 'Jardin du Séchoir, parc des Tanneurs', kind: 'nature', approxMeters: 550, blurb: 'De petits parcs pour reprendre son souffle entre le canal et les rues.', x: 270, y: 120, order: 4 },
  { id: 'ensab', name: 'École nationale supérieure d’architecture', kind: 'ecole', approxMeters: 425, blurb: 'Des étudiants qui passent tôt le matin. Notre ouverture à 6 h 30 leur va bien.', x: 330, y: 190, order: 5 },
  { id: 'inspe', name: 'INSPÉ Bretagne', kind: 'ecole', approxMeters: 150, blurb: 'À deux pas de la boutique.', x: 400, y: 240, order: 6 },
  { id: 'eglise', name: 'Église Saint-Martin', kind: 'patrimoine', approxMeters: 110, blurb: 'Bâtie en 1933, abîmée en 1943, rebâtie en 1950-1951, avec des vitraux de Max Ingrand.', x: 440, y: 260, order: 7 },
  { id: 'coetlogon', name: 'Square de Coëtlogon', kind: 'nature', approxMeters: 250, blurb: 'Un petit square de quartier pour les goûters.', x: 470, y: 205, order: 8 },
  { id: 'lices', name: 'Marché des Lices', kind: 'marche', approxMeters: 1100, blurb: 'Le samedi matin depuis 1622, autour des Halles Martenot. Environ 250 commerçants.', x: 560, y: 340, order: 9 },
  { id: 'boutique', name: 'Fleur de sel, 161 rue de Saint-Malo', kind: 'boutique', approxMeters: 0, blurb: 'À l’angle de la rue de Saint-Malo et du boulevard de Verdun.', x: 520, y: 275, order: 10 },
]

export const QUARTIER_FACTS = [
  { value: '5 700', label: 'habitants environ' },
  { value: '1,76', unit: 'km²', label: 'de superficie' },
  { value: '28', unit: 'ans', label: 'd’âge moyen' },
  { value: '60', unit: '%', label: 'de foyers d’une personne' },
]

export const TRANSPORT = [
  { id: 'bus-saint-martin', mode: 'bus', label: 'Arrêt Saint-Martin', lines: 'C1, 12', approxMeters: 64 },
  { id: 'bus-e4', mode: 'bus', label: 'Arrêt Saint-Martin', lines: 'E4', approxMeters: 98 },
  { id: 'metro-a', mode: 'metro', label: 'Métro A, Anatole France', lines: 'Ligne A', approxMeters: 591 },
]

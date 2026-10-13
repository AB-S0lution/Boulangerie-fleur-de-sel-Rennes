// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// 18 pièces d'ART ORIGINAL générées en SVG par le site (voir src/core/art.ts): aucune photo de la boutique, aucune image de tiers.
// Si la boutique fournit de vraies photos avec autorisation écrite, remplacer `art` par une image et créditer le photographe.
// `kind` suit PLAN.md §11: lamination 5, flans 5, aube/boutique 3, cristaux 2, quartier 3.

export type GalleryKind = 'lamination' | 'flan' | 'aube' | 'cristaux' | 'quartier'

export interface GalleryItem {
  id: string
  title: string
  alt: string
  kind: GalleryKind
  /** graine du générateur, pour que le motif soit stable */
  seed: number
  palette: 'or' | 'sel' | 'nuit' | 'schiste' | 'framboise' | 'pistache'
  /** variante du générateur, interprétée par art.ts */
  variant: number
  /** ratio d'affichage pour la maçonnerie */
  ratio: '1/1' | '4/5' | '3/4' | '16/10' | '5/4' | '2/3'
  caption: string
}

export const GALLERY_KINDS: { id: GalleryKind | 'tout'; label: string }[] = [
  { id: 'tout', label: 'Tout' },
  { id: 'lamination', label: 'Feuilletage' },
  { id: 'flan', label: 'Flans' },
  { id: 'aube', label: 'Aube' },
  { id: 'cristaux', label: 'Cristaux' },
  { id: 'quartier', label: 'Quartier' },
]

export const GALLERY: GalleryItem[] = [
  { id: 'g01', title: 'Trois tours', alt: 'Coupe stylisée de pâte feuilletée: couches alternées dorées et blanches, vingt-sept feuillets.', kind: 'lamination', seed: 11, palette: 'or', variant: 0, ratio: '4/5', caption: 'Vingt-sept feuillets, trois tours.' },
  { id: 'g02', title: 'Alvéolage', alt: 'Macro stylisée d’une mie de croissant: alvéoles dorées dans des feuillets.', kind: 'lamination', seed: 23, palette: 'or', variant: 1, ratio: '1/1', caption: 'Ce que fait la vapeur du beurre.' },
  { id: 'g03', title: 'Beurre et sel', alt: 'Couches de beurre doré et de pâte blanche, avec quelques cristaux de sel.', kind: 'lamination', seed: 37, palette: 'sel', variant: 2, ratio: '16/10', caption: 'Le beurre AOP dans la détrempe.' },
  { id: 'g04', title: 'Pli double', alt: 'Schéma stylisé d’un pli double: feuillets dorés qui se replient.', kind: 'lamination', seed: 41, palette: 'or', variant: 3, ratio: '3/4', caption: 'Un pli double, avant le repos.' },
  { id: 'g05', title: 'Feuilletage de nuit', alt: 'Coupe de pâte feuilletée en or sur fond bleu nuit.', kind: 'lamination', seed: 53, palette: 'nuit', variant: 0, ratio: '5/4', caption: 'Le fournil, avant l’aube.' },
  { id: 'g06', title: 'Pistache', alt: 'Une part de flan verte, bordée d’une croûte feuilletée dorée.', kind: 'flan', seed: 61, palette: 'pistache', variant: 0, ratio: '1/1', caption: 'Le parfum le plus cité des avis.' },
  { id: 'g07', title: 'Framboise', alt: 'Une part de flan rouge framboise avec des framboises dessinées.', kind: 'flan', seed: 67, palette: 'framboise', variant: 1, ratio: '4/5', caption: 'Celui qui met tout le monde d’accord.' },
  { id: 'g08', title: 'Plateau de six parts', alt: 'Un flan entier découpé en six parts de couleurs différentes.', kind: 'flan', seed: 71, palette: 'or', variant: 2, ratio: '1/1', caption: 'Six parts, sept parfums.' },
  { id: 'g09', title: 'Chocolat sarrasin', alt: 'Une part de flan brun foncé avec des graines de sarrasin.', kind: 'flan', seed: 79, palette: 'schiste', variant: 3, ratio: '3/4', caption: 'Avec sa pointe de sel.' },
  { id: 'g10', title: 'Tranche de croûte', alt: 'Profil d’une part de flan: la base feuilletée et la crème.', kind: 'flan', seed: 83, palette: 'sel', variant: 4, ratio: '16/10', caption: 'La base de pâte à croissant, précuite.' },
  { id: 'g11', title: '1 h 00', alt: 'Ciel de nuit, quelques étoiles et la lumière d’un fournil.', kind: 'aube', seed: 89, palette: 'nuit', variant: 0, ratio: '4/5', caption: 'Un croissant, ça se mérite.' },
  { id: 'g12', title: '5 h 15', alt: 'Ciel qui s’éclaircit, un dégradé de bleu nuit vers l’or.', kind: 'aube', seed: 97, palette: 'or', variant: 1, ratio: '16/10', caption: 'Les fours chauffent.' },
  { id: 'g13', title: '6 h 30', alt: 'Façade blanche aux lettres dorées sous un ciel clair.', kind: 'aube', seed: 101, palette: 'sel', variant: 2, ratio: '5/4', caption: 'On ouvre.' },
  { id: 'g14', title: 'Fleur de sel', alt: 'Cristaux de sel pyramidaux au liseré doré.', kind: 'cristaux', seed: 103, palette: 'sel', variant: 0, ratio: '1/1', caption: 'Sans le sel, il n’y a pas de goût.' },
  { id: 'g15', title: 'Marais', alt: 'Cristaux de sel éparpillés sur un fond nuit.', kind: 'cristaux', seed: 107, palette: 'nuit', variant: 1, ratio: '3/4', caption: 'Récoltés à la main.' },
  { id: 'g16', title: 'Le canal', alt: 'Dessin au trait doré d’un canal et d’une écluse.', kind: 'quartier', seed: 109, palette: 'schiste', variant: 0, ratio: '16/10', caption: 'Le canal d’Ille-et-Rance.' },
  { id: 'g17', title: 'Le clocher', alt: 'Dessin au trait doré d’une église et de ses vitraux.', kind: 'quartier', seed: 113, palette: 'schiste', variant: 1, ratio: '2/3', caption: 'À 110 mètres de la boutique.' },
  { id: 'g18', title: 'Pans de bois', alt: 'Dessin au trait doré de façades à pans de bois.', kind: 'quartier', seed: 127, palette: 'schiste', variant: 2, ratio: '5/4', caption: 'La trame de la ville.' },
]

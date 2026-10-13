// Photos d'illustration Unsplash (licence Unsplash), pas des photos du commerce.
// DONNÉES D'EXEMPLE: images d'ambiance libres de droits (https://unsplash.com/license), téléchargées dans
// public/photos. Elles ne montrent ni la boutique, ni ses produits, ni son équipe. À remplacer par de vraies
// photos de la maison, avec autorisation écrite, dès qu'elles existent.

export type PhotoTheme = 'viennoiserie' | 'pain' | 'patisserie' | 'fournil'

export interface Photo {
  slug: string
  /** chemin construit sur la base Vite, jamais en absolu */
  src: string
  alt: string
  credit: string
  url: string
  width: number
  height: number
  theme: PhotoTheme
}

type Raw = [slug: string, alt: string, credit: string, id: string, w: number, h: number, theme: PhotoTheme]

const RAW: Raw[] = [
  ['croissants-table', 'Des croissants dorés serrés les uns contre les autres sur une table.', 'Conor Brown', '1623334044303-241021148842', 1100, 733, 'viennoiserie'],
  ['croissant-blanc', 'Un croissant seul, bien cambré, sur un fond blanc.', 'personalgraphic.com', '1691480162735-9b91238080f6', 1400, 1400, 'viennoiserie'],
  ['croissant-liege', 'Un croissant posé sur un sous-verre en liège.', 'Vicky Nguyen', '1681218079567-35aef7c8e7e4', 1400, 1050, 'viennoiserie'],
  ['viennoiseries-plateau', 'Viennoiseries sur un plateau en bois, à côté d’une tasse blanche.', 'Kobby Mendez', '1612366747681-e4ca6992b1e9', 1100, 1266, 'viennoiserie'],
  ['croissants-plaque-inox', 'Croissants alignés sur une plaque en inox.', 'Kavita Joshi Rai', '1530610476181-d83430b64dcd', 1100, 1467, 'fournil'],
  ['deux-croissants', 'Deux croissants feuilletés, vus de près.', 'Mae Mu', '1555507036-ab1f4038808a', 1400, 1120, 'viennoiserie'],
  ['pile-croissants', 'Une pile de croissants à la croûte brillante.', 'Vadim Babenko', '1700915704616-b455b3679024', 1000, 1000, 'viennoiserie'],
  ['croissants-plaque', 'Croissants crus alignés en rangs sur une plaque de cuisson.', 'With Mahdy', '1693483640461-267d788b6148', 1200, 1800, 'fournil'],
  ['croissants-sortie-four', 'Croissants tout juste sortis du four, encore sur la plaque.', 'arh Lee', '1747459707229-7b1b7c8367e0', 1000, 1777, 'fournil'],
  ['patisserie-soucoupe', 'Une viennoiserie dorée sur une soucoupe en céramique blanche.', 'Kaley Dykstra', '1501721358449-1505ca840822', 1200, 800, 'viennoiserie'],
  ['pains-vitrine-flou', 'Pains et brioches dans une vitrine, en faible profondeur de champ.', 'Sergio Arze', '1567891026259-c133718572a4', 1200, 800, 'pain'],
  ['pains-etagere', 'Pains rangés sur les étagères d’une boulangerie.', 'Yeh Xintong', '1568254183919-78a4f43a2877', 1200, 801, 'pain'],
  ['pain-panier', 'Un pain de campagne dans un panier en osier.', 'mohamed hassouna', '1608198093002-ad4e005484ec', 1200, 675, 'pain'],
  ['tartes-vitrine', 'Tartes aux fruits et gâteaux au chocolat sur des étagères en verre.', 'Ulysse Pointcheval', '1583338917451-face2751d8d5', 1200, 1800, 'patisserie'],
  ['petrissage-rouleau', 'Des mains façonnent une pâte, à côté d’un rouleau en bois.', 'Nadya Spetnitskaya', '1517686469429-8bdb88b9f907', 1200, 800, 'fournil'],
  ['vitrine-patisseries', 'Pâtisseries et gâteau à la crème dans une vitrine de boulangerie.', 'Kirsten Drew', '1534432182912-63863115e106', 1000, 1500, 'patisserie'],
  ['plateau-gourmandises', 'Gourmandises dorées alignées sur un plateau, vues de près.', 'Mink Mingle', '1483695028939-5bb13f8648b0', 1200, 800, 'patisserie'],
  ['pain-sac-papier', 'Un pain dans un sac en papier kraft.', 'Bas Peperzak', '1599819055803-717bba43890f', 1200, 800, 'pain'],
  ['ble-et-pains', 'Pains, biscuits et épis de blé sur une table.', 'Ales Krivec', '1523294587484-bae6cc870010', 1000, 579, 'pain'],
  ['pains-graines-ble', 'Trois pains rustiques aux graines et des épis de blé sur du bois.', 'Wesual Click', '1509440159596-0249088772ff', 1000, 665, 'pain'],
  ['tranches-pain', 'Tranches de pain au levain sur un fond clair.', 'Louise Lyshøj', '1534620808146-d33bb39128b2', 1000, 1500, 'pain'],
  ['cafe-viennoiseries', 'Un café entouré de quatre viennoiseries.', 'Nathan Dumlao', '1515823662972-da6a2e4d3002', 1000, 1500, 'viennoiserie'],
  ['tarte-fruits-rouges', 'Une tarte aux fruits rouges sur une table en bois.', 'Oliver-Timm Haarmann', '1620980776848-84ac10194945', 1200, 1800, 'patisserie'],
  ['macarons', 'Des macarons de couleurs pastel posés sur une table.', 'Heather Barnes', '1558326567-98ae2405596b', 1200, 1518, 'patisserie'],
  ['planche-viennoiseries', 'Croissants et pains au chocolat sur une planche, avec un rouleau et un fouet.', 'tabitha turner', '1597528662465-55ece5734101', 1200, 900, 'fournil'],
  ['desserts-table', 'Plusieurs desserts dressés sur une table.', 'Vladyslav Tobolenko', '1691052252990-4cd1fdda73dc', 1200, 1800, 'patisserie'],
  ['roules-cannelle', 'Roulés briochés foncés, vus de près.', 'Otto Norin', '1509365465985-25d11c17e812', 900, 1200, 'patisserie'],
  ['pain-jute', 'Un pain cuit posé sur une toile de jute.', 'Maria Orlova', '1549413468-cd78edb7e75c', 900, 1350, 'pain'],
  ['pain-couteau', 'Un pain tranché à côté d’un couteau à pain.', 'Victoria Shes', '1559811814-e2c57b5e69df', 900, 1350, 'pain'],
  ['pain-tranche', 'Tranches de pain empilées, mie et croûte visibles.', 'Rodolfo Marques', '1533782654613-826a072dd6f3', 1200, 1500, 'pain'],
  ['miche-farine', 'Une miche saupoudrée de farine.', 'Tetiana Padurets', '1635341814289-55cf1490024c', 900, 1125, 'fournil'],
  ['mie-alveolee', 'L’intérieur d’un pain: une mie alvéolée.', 'Benjamin Jauregui', '1742845834625-4c68792709f1', 787, 1400, 'pain'],
  ['pain-planche', 'Un pain sur une table en bois.', 'Tommaso Urli', '1586765501019-cbe3973ef8fa', 1200, 802, 'pain'],
]

export const PHOTOS: Photo[] = RAW.map(([slug, alt, credit, id, width, height, theme]) => ({
  slug,
  src: `${import.meta.env.BASE_URL}photos/${slug}.jpg`,
  alt,
  credit,
  url: `https://unsplash.com/photos/${id}`,
  width,
  height,
  theme,
}))

export const PHOTO_THEMES: { id: PhotoTheme | 'tout'; label: string }[] = [
  { id: 'tout', label: 'Tout' },
  { id: 'viennoiserie', label: 'Viennoiseries' },
  { id: 'pain', label: 'Pains' },
  { id: 'patisserie', label: 'Douceurs' },
  { id: 'fournil', label: 'Fournil' },
]

export const photoBySlug = (slug: string): Photo | undefined => PHOTOS.find((p) => p.slug === slug)

export const photosByTheme = (theme: PhotoTheme): Photo[] => PHOTOS.filter((p) => p.theme === theme)

/** Choix stable d'une photo dans un thème (ou dans tout le lot) à partir d'une graine. */
export const photoFor = (seed: number, theme?: PhotoTheme): Photo => {
  const pool = theme ? photosByTheme(theme) : PHOTOS
  return pool[Math.abs(seed) % pool.length]
}

export const PHOTO_NOTE = 'Photo d’illustration'

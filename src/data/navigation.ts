// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// Plan du site (PLAN.md §10). Les chemins sont relatifs à la base du site; utiliser `href()` de src/core/dom.ts.

export interface NavItem {
  id: string
  label: string
  path: string
  description: string
}

/** Barre de navigation principale (6 entrées, une seule ligne en desktop). */
export const NAV_MAIN: NavItem[] = [
  { id: 'boutique', label: 'Boutique', path: 'boutique/', description: 'Pains, viennoiseries, flans, snacking' },
  { id: 'flans', label: 'Bar à flans', path: 'bar-a-flans/', description: 'Les sept parfums du jour' },
  { id: 'savoir-faire', label: 'Savoir-faire', path: 'savoir-faire/', description: 'Tourage, levain, bara' },
  { id: 'maison', label: 'La maison', path: 'maison/', description: 'Deux champions, une histoire' },
  { id: 'journal', label: 'Journal', path: 'journal/', description: 'Actualités et coulisses' },
  { id: 'infos', label: 'Infos', path: 'infos/', description: 'Horaires, accès, contact' },
]

/** Pages secondaires, visibles dans le menu mobile et le pied de page. */
export const NAV_MORE: NavItem[] = [
  { id: 'galerie', label: 'Galerie', path: 'galerie/', description: 'Dix-huit images originales' },
  { id: 'quartier', label: 'Le quartier', path: 'le-quartier/', description: 'Saint-Martin, du canal à l’angle' },
  { id: 'faq', label: 'Questions fréquentes', path: 'faq/', description: 'Horaires, flans, accès' },
]

export const NAV_LEGAL: NavItem[] = [
  { id: 'mentions', label: 'Mentions légales', path: 'mentions-legales/', description: '' },
  { id: 'confidentialite', label: 'Confidentialité', path: 'confidentialite/', description: '' },
]

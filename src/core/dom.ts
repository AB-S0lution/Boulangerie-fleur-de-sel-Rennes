// Petits utilitaires DOM + typographie française. Aucun framework: des chaînes HTML et des écouteurs.

export const BASE: string = import.meta.env.BASE_URL

/** Chemin interne, relatif à la base du site (ex. href('boutique/') -> /Boulangerie-fleur-de-sel-Rennes/boutique/). */
export const href = (path = ''): string => BASE + path.replace(/^\//, '')

export const SITE_ORIGIN = 'https://ab-s0lution.github.io/Boulangerie-fleur-de-sel-Rennes/'

type Part = string | number | boolean | null | undefined | Part[]

const flat = (v: Part): string => {
  if (Array.isArray(v)) return v.map(flat).join('')
  if (v === false || v === null || v === undefined) return ''
  if (v === true) return 'true'
  return String(v)
}

/** Gabarit HTML: aplatit les tableaux, ignore false/null/undefined. */
export const html = (strings: TemplateStringsArray, ...values: Part[]): string => {
  let out = ''
  strings.forEach((s, i) => {
    out += s
    if (i < values.length) out += flat(values[i])
  })
  return out
}

export const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const NNBSP = '\u202f'
const NBSP = '\u00a0'

/** Typographie française sur un texte brut: espace fine insécable avant ? ! ;, insécable avant : et % et autour des « ». */
export const fr = (t: string): string =>
  t
    .replace(/&(#?\w+);/g, '\u0001$1\u0002')
    .replace(/([^\s])[ \u00a0\u202f]?([?!;])(?=[\s\u00a0]|$|[»”’)])/g, `$1${NNBSP}$2`)
    .replace(/([^\s])[ \u00a0]?:(?=\s)/g, `$1${NBSP}:`)
    .replace(/(\d) %/g, `$1${NBSP}%`)
    .replace(/« /g, `«${NBSP}`)
    .replace(/ »/g, `${NBSP}»`)
    .replace(/\u0001(#?\w+)\u0002/g, '&$1;')

/**
 * Typographie française sur du HTML: seuls les nœuds texte et quelques attributs (aria-label, alt, title, placeholder)
 * sont corrigés, jamais les balises. À appliquer une seule fois sur le HTML final d'une page ou d'un fragment injecté.
 */
export const typo = (s: string): string =>
  s
    .split(/(<[^>]*>)/)
    .map((seg) =>
      seg.startsWith('<')
        ? seg.replace(/\b(aria-label|alt|title|placeholder)="([^"]*)"/g, (_m, k: string, v: string) => `${k}="${fr(v)}"`)
        : fr(seg),
    )
    .join('')

/** Remplace le contenu d'un élément par du HTML typographié. */
export const setHTML = (el: Element, markup: string): void => {
  el.innerHTML = typo(markup)
}

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T | null =>
  root.querySelector<T>(sel)

export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T[] =>
  Array.from(root.querySelectorAll<T>(sel))

/** Prix à la française: 3,90 € (espace insécable). */
const EUR = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
export const eur = (n: number): string => EUR.format(Number.isFinite(n) ? n : 0)

export const reducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const finePointer = (): boolean => window.matchMedia('(hover: hover) and (pointer: fine)').matches

export const isDesktopWide = (): boolean => window.matchMedia('(min-width: 900px)').matches

export const clamp = (v: number, min: number, max: number): number => Math.min(max, Math.max(min, v))

/** Générateur pseudo-aléatoire déterministe (mulberry32): les motifs générés restent stables. */
export function rng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const formatDateFr = (iso: string): string =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))

export const param = (name: string): string | null => new URLSearchParams(location.search).get(name)

/** Titre et description dynamiques (pages à paramètre: fiche produit, article). */
export function setMeta(title: string, description?: string): void {
  document.title = fr(title)
  if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', fr(description))
}

/** Normalisation pour la recherche: minuscules, sans accents. */
export const fold = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/œ/g, 'oe')

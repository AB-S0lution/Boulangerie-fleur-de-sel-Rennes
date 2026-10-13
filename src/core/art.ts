// Art ORIGINAL du site: tout est dessiné ou généré ici (SVG). Aucune photo, aucune image de tiers,
// aucune reprise du logo de la boutique (qui n'a pas été fourni).
import type { ArtKey } from '../data/products'
import type { Flan, Topping } from '../data/flans'
import type { GalleryItem } from '../data/gallery'
import type { Poi } from '../data/quartier'
import { rng } from './dom'

const f1 = (n: number): string => n.toFixed(1)

// ---------------------------------------------------------------------------------------------
// Couleurs du dessin (pas de variables CSS: ces SVG sont aussi rasterisés pour l'image de partage)
// ---------------------------------------------------------------------------------------------
export const C = {
  gold: '#D2AE5C',
  goldDeep: '#7A5A12',
  glow: '#F0D79A',
  butter: '#E7C26A',
  dough: '#F6F1E3',
  doughShade: '#E9DFC4',
  night: '#0F131B',
  night2: '#1A2030',
  salt: '#F5F6F3',
  ink: '#13161C',
  schist: '#6B3A48',
}

// ---------------------------------------------------------------------------------------------
// Cristal de fleur de sel: petite pyramide au liseré doré
// ---------------------------------------------------------------------------------------------
export function crystal(size = 14, rot = 0, fill = '#FFFFFF', rim = C.gold): string {
  const s = size
  return `<g transform="rotate(${rot})"><polygon points="0,${-s} ${s * 0.78},${s * 0.55} ${-s * 0.78},${s * 0.55}" fill="${fill}" stroke="${rim}" stroke-width="${f1(Math.max(0.8, s / 10))}" stroke-linejoin="round"/><polyline points="0,${-s} ${s * 0.12},${s * 0.55}" fill="none" stroke="${rim}" stroke-width="${f1(Math.max(0.6, s / 16))}" opacity=".7"/></g>`
}

/** Un seul SVG de cristal, pour les particules du DOM. */
export const crystalSvg = (size = 16): string =>
  `<svg viewBox="-${size} -${size} ${size * 2} ${size * 2}" width="${size * 2}" height="${size * 2}" aria-hidden="true" focusable="false">${crystal(size * 0.8)}</svg>`

// ---------------------------------------------------------------------------------------------
// Strates de tourage (feuillets or / sel) avec alvéoles
// ---------------------------------------------------------------------------------------------
export interface StrataOpts {
  w: number
  h: number
  n: number
  seed?: number
  butter?: string
  dough?: string
  stroke?: string
  crumb?: boolean
  x?: number
  y?: number
  wobble?: number
}

export function strata(o: StrataOpts): string {
  const r = rng(o.seed ?? 7)
  const butter = o.butter ?? C.butter
  const dough = o.dough ?? C.dough
  const stroke = o.stroke ?? 'rgba(122,90,18,.35)'
  const x0 = o.x ?? 0
  const y0 = o.y ?? 0
  const wob = o.wobble ?? 0
  const weights = Array.from({ length: o.n }, () => 0.8 + r() * 0.4)
  const total = weights.reduce((a, b) => a + b, 0)
  let y = y0
  let out = ''
  weights.forEach((wt, i) => {
    const hh = (o.h * wt) / total
    const col = i % 2 === 0 ? dough : butter
    if (wob > 0) {
      const a = (r() - 0.5) * wob
      const b = (r() - 0.5) * wob
      out += `<path d="M${x0} ${f1(y)} Q${f1(x0 + o.w / 2)} ${f1(y + a)} ${x0 + o.w} ${f1(y + b)} L${x0 + o.w} ${f1(y + hh + b)} Q${f1(x0 + o.w / 2)} ${f1(y + hh + a)} ${x0} ${f1(y + hh)} Z" fill="${col}" stroke="${stroke}" stroke-width=".5"/>`
    } else {
      out += `<rect x="${x0}" y="${f1(y)}" width="${o.w}" height="${f1(hh + 0.4)}" fill="${col}" stroke="${stroke}" stroke-width=".5"/>`
    }
    if (o.crumb && i % 2 === 0) {
      const cells = Math.max(1, Math.round(o.w / 38))
      for (let c = 0; c < cells; c++) {
        const cx = x0 + r() * o.w
        out += `<ellipse cx="${f1(cx)}" cy="${f1(y + hh / 2)}" rx="${f1(3 + r() * 8)}" ry="${f1(Math.min(hh / 2.4, 2 + r() * 3))}" fill="${C.doughShade}" opacity=".8"/>`
      }
    }
    y += hh
  })
  return out
}

// ---------------------------------------------------------------------------------------------
// Croissant: un croissant en arc, fait de segments de pâte qui s'effilent vers deux pointes.
// Les coutures entre segments sont des courbes en chevron, et chaque segment porte des stries de feuilletage.
// ---------------------------------------------------------------------------------------------
interface CroissantGeo {
  /** Contour fermé de chaque segment, du centre vers les pointes (ordre de dessin). */
  outlines: string[]
  /** Toutes les stries de feuilletage en un seul chemin ouvert (jamais rempli). */
  striae: string
}

function croissantGeometry(cx: number, cy: number, R: number, hmax: number, spanDeg: number): CroissantGeo {
  const half = spanDeg / 2
  const theta = (u: number) => ((-90 + u * half) * Math.PI) / 180
  const h = (u: number) => hmax * Math.pow(Math.max(0, Math.cos((Math.abs(u) * Math.PI) / 2)), 0.72)
  const at = (u: number, r: number): [number, number] => {
    const t = theta(u)
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)]
  }
  const tangent = (u: number): [number, number] => {
    const t = theta(u)
    return [-Math.sin(t), Math.cos(t)]
  }
  const IN = 0.82 // le bord intérieur est plus mince que l'extérieur
  const out = (u: number) => R + h(u)
  const inn = (u: number) => R - h(u) * IN
  // Coutures: centre large, puis segments de plus en plus étroits vers les pointes
  const seams = [-1, -0.86, -0.68, -0.46, -0.2, 0.2, 0.46, 0.68, 0.86, 1]
  const P = (q: [number, number]) => `${f1(q[0])} ${f1(q[1])}`
  const seamCtrl = (u: number, r: number): [number, number] => {
    const sgn = u < 0 ? -1 : 1
    const base = at(u, r)
    const t = tangent(u)
    const bow = Math.abs(u) < 0.999 ? h(u) * 0.62 : 0
    return [base[0] + sgn * t[0] * bow, base[1] + sgn * t[1] * bow]
  }
  const seamD = (u: number, from: 'out' | 'in'): string => {
    // trace la couture de bord extérieur à bord intérieur (ou l'inverse)
    const ctrl = seamCtrl(u, (out(u) + inn(u)) / 2)
    return from === 'out' ? `Q${P(ctrl)} ${P(at(u, inn(u)))}` : `Q${P(ctrl)} ${P(at(u, out(u)))}`
  }
  const edge = (ua: number, ub: number, side: 'out' | 'in'): string => {
    const um = (ua + ub) / 2
    const ra = side === 'out' ? out(ua) : inn(ua)
    const rb = side === 'out' ? out(ub) : inn(ub)
    const hm = h(um)
    const sag = side === 'out' ? hm * 0.3 : -hm * 0.22
    const ctrl = at(um, (ra + rb) / 2 + sag)
    return `Q${P(ctrl)} ${P(at(ub, rb))}`
  }
  const segs: { ua: number; ub: number }[] = []
  for (let i = 0; i < seams.length - 1; i++) segs.push({ ua: seams[i], ub: seams[i + 1] })
  // Ordre de dessin: le centre d'abord, puis une pointe, l'autre, et ainsi de suite vers l'extérieur
  segs.sort((a, b) => Math.abs((a.ua + a.ub) / 2) - Math.abs((b.ua + b.ub) / 2) || a.ua - b.ua)
  const outlines: string[] = []
  let striae = ''
  for (const { ua, ub } of segs) {
    const start = at(ua, out(ua))
    // contour: bord extérieur, couture de droite (vers l'intérieur), bord intérieur retour, couture de gauche (vers l'extérieur)
    const d =
      `M${P(start)} ${edge(ua, ub, 'out')} ${seamD(ub, 'out')} ` +
      `${edge(ub, ua, 'in')} ${seamD(ua, 'in')} Z`
    // Stries de feuilletage: courbes parallèles à la couture de gauche, sur 62 % de l'épaisseur
    const um = (ua + ub) / 2
    const nStria = Math.abs(um) < 0.3 ? 3 : Math.abs(um) < 0.8 ? 2 : 1
    let stria = ''
    for (let k = 1; k <= nStria; k++) {
      const f = k / (nStria + 1)
      const u = ua + (ub - ua) * f
      const hh = h(u)
      const span = 0.31 * hh
      const a = at(u, R + span * 0.95)
      const b = at(u, R - span * 1.0)
      const c = seamCtrl(u, R)
      stria += ` M${P(a)} Q${P(c)} ${P(b)}`
    }
    outlines.push(d)
    striae += stria
  }
  return { outlines, striae: striae.trim() }
}

// ---------------------------------------------------------------------------------------------
// Dessins au trait des produits (viewBox 0 0 160 120, traits en currentColor)
// ---------------------------------------------------------------------------------------------
const CROISSANT_ART = (() => {
  const g = croissantGeometry(80, 112, 50, 24, 156)
  return `<g class="f">${g.outlines.map((d) => `<path d="${d}"/>`).join('')}</g>${g.outlines.map((d) => `<path d="${d}"/>`).join('')}<path d="${g.striae}"/>`
})()

const ART: Record<ArtKey, string> = {
  croissant: CROISSANT_ART,
  'pain-chocolat': `
    <rect class="f" x="26" y="36" width="108" height="50" rx="16"/><rect x="26" y="36" width="108" height="50" rx="16"/>
    <path d="M48 37 Q54 61 48 85"/><path d="M80 36 Q86 61 80 86"/><path d="M112 37 Q118 61 112 85"/>
    <rect x="124" y="50" width="12" height="22" rx="3"/><path d="M128 56 h5 M128 64 h5"/>`,
  'pain-raisins': `
    <circle class="f" cx="80" cy="60" r="38"/><circle cx="80" cy="60" r="38"/>
    <path d="M80 60 m-4 0 a4 4 0 1 1 8 0 a10 10 0 1 1 -20 0 a18 18 0 1 1 36 0 a26 26 0 1 1 -52 0 a34 34 0 1 1 68 0"/>
    <circle cx="66" cy="44" r="3"/><circle cx="98" cy="70" r="3"/><circle cx="62" cy="76" r="3"/><circle cx="96" cy="46" r="3"/>`,
  chausson: `
    <path class="f" d="M24 88 C24 36 136 36 136 88 Z"/><path d="M24 88 C24 36 136 36 136 88 Z"/>
    <path d="M52 58 Q60 72 56 84"/><path d="M80 50 Q86 68 80 84"/><path d="M108 58 Q102 72 106 84"/>
    <path d="M30 88 h100" stroke-dasharray="3 5"/>`,
  'pain-suisse': `
    <rect class="f" x="22" y="40" width="116" height="44" rx="22"/><rect x="22" y="40" width="116" height="44" rx="22"/>
    <path d="M40 62 q10 -9 20 0 t20 0 t20 0 t20 0"/>
    <circle cx="52" cy="52" r="2.5"/><circle cx="76" cy="74" r="2.5"/><circle cx="104" cy="54" r="2.5"/><circle cx="118" cy="72" r="2.5"/>`,
  kouign: `
    <path class="f" d="M34 40 Q80 24 126 40 Q134 62 126 84 Q80 98 34 84 Q26 62 34 40 Z"/><path d="M34 40 Q80 24 126 40 Q134 62 126 84 Q80 98 34 84 Q26 62 34 40 Z"/>
    <path d="M34 62 Q80 52 126 62"/><path d="M80 31 Q86 62 80 92"/><circle cx="56" cy="50" r="2"/><circle cx="106" cy="74" r="2"/><circle cx="104" cy="48" r="2"/>`,
  brioche: `
    <ellipse class="f" cx="80" cy="78" rx="50" ry="28"/><ellipse cx="80" cy="78" rx="50" ry="28"/>
    <circle class="f" cx="80" cy="42" r="15"/><circle cx="80" cy="42" r="15"/>
    <path d="M52 66 Q60 80 54 96"/><path d="M80 56 Q86 78 80 104"/><path d="M108 66 Q100 80 106 96"/>`,
  boule: `
    <ellipse class="f" cx="80" cy="66" rx="50" ry="36"/><ellipse cx="80" cy="66" rx="50" ry="36"/>
    <path d="M50 46 Q58 62 52 80"/><path d="M72 40 Q82 62 74 88"/><path d="M96 42 Q106 62 98 84"/>
    <circle cx="34" cy="106" r="1.4"/><circle cx="52" cy="108" r="1.4"/><circle cx="110" cy="108" r="1.4"/><circle cx="128" cy="105" r="1.4"/>`,
  tourte: `
    <ellipse class="f" cx="80" cy="66" rx="56" ry="34"/><ellipse cx="80" cy="66" rx="56" ry="34"/>
    <path d="M44 46 L112 90"/><path d="M62 38 L124 76"/><path d="M36 62 L92 98"/><path d="M116 44 L50 90"/><path d="M98 38 L38 76"/><path d="M124 62 L70 98"/>`,
  bara: `
    <path class="f" d="M20 70 C20 40 60 34 80 34 C100 34 140 40 140 70 C140 90 100 98 80 98 C60 98 20 90 20 70 Z"/><path d="M20 70 C20 40 60 34 80 34 C100 34 140 40 140 70 C140 90 100 98 80 98 C60 98 20 90 20 70 Z"/>
    <path d="M48 46 Q56 66 50 90"/><path d="M80 36 Q88 66 80 98"/><path d="M112 46 Q106 66 112 90"/>
    <path d="M62 62 l3 -3 l3 3 z"/><path d="M96 74 l3 -3 l3 3 z"/><path d="M70 82 l3 -3 l3 3 z"/><circle cx="94" cy="54" r="1.6"/><circle cx="40" cy="70" r="1.6"/>`,
  baguette: `
    <g transform="rotate(-20 80 60)"><rect class="f" x="8" y="46" width="144" height="28" rx="14"/><rect x="8" y="46" width="144" height="28" rx="14"/>
    <path d="M32 50 l12 20"/><path d="M58 50 l12 20"/><path d="M84 50 l12 20"/><path d="M110 50 l12 20"/></g>`,
  'pain-mie': `
    <path class="f" d="M34 94 V60 C28 40 50 34 80 34 C110 34 132 40 126 60 V94 Z"/><path d="M34 94 V60 C28 40 50 34 80 34 C110 34 132 40 126 60 V94 Z"/>
    <path d="M44 94 V60 C44 50 56 46 80 46 C104 46 116 50 116 60 V94" opacity=".6"/>
    <circle cx="66" cy="70" r="1.6"/><circle cx="90" cy="64" r="1.6"/><circle cx="82" cy="82" r="1.6"/><circle cx="100" cy="76" r="1.6"/>`,
  eclair: `
    <rect class="f" x="18" y="48" width="124" height="34" rx="17"/><rect x="18" y="48" width="124" height="34" rx="17"/>
    <path d="M26 60 q10 -12 22 -2 t24 0 t24 0 t24 0 t14 -4" />
    <path d="M30 70 h100" opacity=".5"/><circle cx="56" cy="64" r="2"/><circle cx="104" cy="66" r="2"/>`,
  religieuse: `
    <circle class="f" cx="80" cy="80" r="26"/><circle cx="80" cy="80" r="26"/>
    <circle class="f" cx="80" cy="42" r="15"/><circle cx="80" cy="42" r="15"/>
    <path d="M62 57 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6"/><circle cx="80" cy="25" r="3"/>
    <path d="M60 78 Q80 92 100 78" opacity=".6"/>`,
  tartelette: `
    <path class="f" d="M34 64 L44 98 H116 L126 64 Z"/><path d="M34 64 L44 98 H116 L126 64 Z"/>
    <path d="M52 66 L58 98 M72 66 L74 98 M92 66 L90 98 M110 66 L104 98" opacity=".7"/>
    <ellipse class="f" cx="80" cy="64" rx="46" ry="12"/><ellipse cx="80" cy="64" rx="46" ry="12"/>
    <circle cx="58" cy="60" r="7"/><circle cx="82" cy="57" r="8"/><circle cx="104" cy="61" r="7"/><path d="M82 49 q4 -10 12 -12" />`,
  millefeuille: `
    <rect class="f" x="26" y="34" width="108" height="14" rx="2"/><rect x="26" y="34" width="108" height="14" rx="2"/>
    <path d="M26 56 q8 -6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0"/>
    <rect class="f" x="26" y="62" width="108" height="12" rx="2"/><rect x="26" y="62" width="108" height="12" rx="2"/>
    <path d="M26 82 q8 -6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0"/>
    <rect class="f" x="26" y="88" width="108" height="12" rx="2"/><rect x="26" y="88" width="108" height="12" rx="2"/>
    <path d="M40 41 h80" stroke-dasharray="2 5"/>`,
  parisbrest: `
    <ellipse class="f" cx="80" cy="64" rx="56" ry="38"/><ellipse cx="80" cy="64" rx="56" ry="38"/><ellipse cx="80" cy="66" rx="24" ry="13"/>
    <path d="M36 54 l6 3 M56 36 l3 6 M92 33 l-1 6 M118 48 l-6 4 M128 70 l-7 1 M108 92 l-3 -6 M70 98 l1 -6 M42 86 l7 -3" />`,
  flan: `
    <path class="f" d="M80 22 L132 92 H28 Z"/><path d="M80 22 L132 92 H28 Z" stroke-linejoin="round"/>
    <path d="M28 92 h104 v10 H28 Z"/><path d="M28 96 h104 M28 99 h104" opacity=".55"/>
    <circle cx="80" cy="58" r="5"/><circle cx="68" cy="72" r="4"/><circle cx="92" cy="74" r="4"/>`,
  cookie: `
    <path class="f" d="M32 60 C30 36 58 28 82 30 C108 28 132 38 130 64 C132 88 106 98 80 96 C54 98 30 86 32 60 Z"/><path d="M32 60 C30 36 58 28 82 30 C108 28 132 38 130 64 C132 88 106 98 80 96 C54 98 30 86 32 60 Z"/>
    <circle cx="60" cy="52" r="4"/><circle cx="92" cy="46" r="4"/><circle cx="108" cy="70" r="4"/><circle cx="72" cy="76" r="4"/><circle cx="48" cy="72" r="3"/><circle cx="100" cy="58" r="1.4"/>`,
  cannele: `
    <ellipse class="f" cx="80" cy="42" rx="30" ry="9"/><ellipse cx="80" cy="42" rx="30" ry="9"/>
    <path class="f" d="M50 42 L56 98 H104 L110 42"/><path d="M50 42 L56 98 H104 L110 42"/>
    <path d="M62 50 L65 96 M72 52 L73 98 M80 52 V98 M88 52 L87 98 M98 50 L95 96" opacity=".7"/>`,
  financier: `
    <path class="f" d="M36 52 L50 38 H110 L124 52 V90 H36 Z"/><path d="M36 52 L50 38 H110 L124 52 V90 H36 Z"/>
    <path d="M36 52 H124" /><ellipse cx="62" cy="45" rx="7" ry="3"/><ellipse cx="86" cy="46" rx="7" ry="3"/>`,
  madeleine: `
    <path class="f" d="M28 66 C28 36 92 28 114 54 C134 80 104 100 70 94 C46 90 28 82 28 66 Z"/><path d="M28 66 C28 36 92 28 114 54 C134 80 104 100 70 94 C46 90 28 82 28 66 Z"/>
    <path d="M38 70 C54 50 78 42 96 50"/><path d="M42 78 C62 62 92 58 108 66"/><path d="M52 86 C70 76 94 74 106 80"/>`,
  cake: `
    <path class="f" d="M22 52 C22 38 44 32 80 32 C116 32 138 38 138 52 V90 H22 Z"/><path d="M22 52 C22 38 44 32 80 32 C116 32 138 38 138 52 V90 H22 Z"/>
    <path d="M80 32 V90" /><path d="M22 60 H138" opacity=".5"/><circle cx="48" cy="72" r="2"/><circle cx="64" cy="76" r="2"/><circle cx="100" cy="72" r="2"/><circle cx="116" cy="78" r="2"/>`,
  sandwich: `
    <path class="f" d="M24 52 C24 34 56 30 80 30 C104 30 136 34 136 52 Z"/><path d="M24 52 C24 34 56 30 80 30 C104 30 136 34 136 52 Z"/>
    <path d="M20 62 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t8 -4"/>
    <rect x="24" y="68" width="112" height="8" rx="2"/><path class="f" d="M24 82 H136 C136 96 104 100 80 100 C56 100 24 96 24 82 Z"/><path d="M24 82 H136 C136 96 104 100 80 100 C56 100 24 96 24 82 Z"/>`,
  hotdog: `
    <g transform="rotate(-12 80 60)"><rect class="f" x="10" y="48" width="140" height="34" rx="17"/><rect x="10" y="48" width="140" height="34" rx="17"/>
    <rect x="4" y="44" width="152" height="16" rx="8"/><path d="M20 52 l8 -3 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6" /></g>`,
  burger: `
    <path class="f" d="M26 50 C26 30 56 24 80 24 C104 24 134 30 134 50 Z"/><path d="M26 50 C26 30 56 24 80 24 C104 24 134 30 134 50 Z"/>
    <path d="M22 60 q7 -8 14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t8 -4"/>
    <rect x="26" y="66" width="108" height="12" rx="6"/><path d="M30 86 H130" />
    <path class="f" d="M26 90 H134 C134 102 104 106 80 106 C56 106 26 102 26 90 Z"/><path d="M26 90 H134 C134 102 104 106 80 106 C56 106 26 102 26 90 Z"/>`,
  salade: `
    <path class="f" d="M24 62 H136 C136 92 110 104 80 104 C50 104 24 92 24 62 Z"/><path d="M24 62 H136 C136 92 110 104 80 104 C50 104 24 92 24 62 Z"/>
    <path d="M36 60 C34 44 48 36 60 44 C62 30 82 28 88 42 C100 34 118 40 116 60"/><path d="M60 44 q8 8 4 16 M88 42 q-6 8 -2 18"/>
    <circle cx="104" cy="52" r="5"/><circle cx="46" cy="52" r="4"/>`,
}

export function productArt(key: ArtKey, cls = ''): string {
  return `<svg class="art ${cls}" viewBox="0 0 160 120" role="presentation" aria-hidden="true" focusable="false">${ART[key]}</svg>`
}

// ---------------------------------------------------------------------------------------------
// Héros « Avant l'aube »: un croissant dessiné trait par trait (pathLength=1 pour le stroke-dash)
// ---------------------------------------------------------------------------------------------
export function heroCroissant(): string {
  const g = croissantGeometry(300, 352, 214, 84, 166)
  const els = [...g.outlines.map((d) => `<path d="${d}" pathLength="1" class="draw"/>`), `<path d="${g.striae}" pathLength="1" class="draw stria"/>`]
  return `<svg class="hero-croissant" viewBox="0 0 600 400" role="img" aria-label="Un croissant dessiné au trait doré" focusable="false">
    <defs><linearGradient id="goldLine" gradientUnits="userSpaceOnUse" x1="60" y1="40" x2="540" y2="340"><stop offset="0" stop-color="${C.glow}"/><stop offset=".5" stop-color="${C.gold}"/><stop offset="1" stop-color="#B8903A"/></linearGradient></defs>
    <g fill="none" stroke="url(#goldLine)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${els.join('')}</g>
  </svg>`
}

// ---------------------------------------------------------------------------------------------
// Flans: disque de 6 parts, part isolée, garnitures
// ---------------------------------------------------------------------------------------------
const R = 180
const RC = 146
const HALF = 29.4
const rad = (deg: number) => (deg * Math.PI) / 180
const pt = (r: number, deg: number): [number, number] => [r * Math.cos(rad(deg)), r * Math.sin(rad(deg))]
const P = (p: [number, number]) => `${f1(p[0])} ${f1(p[1])}`

function hashStr(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

function toppingShapes(kind: Topping, f: Flan, cx: number, cy: number): string {
  const r = rng(hashStr(f.id))
  const jitter = (spread: number) => (r() - 0.5) * spread
  let out = ''
  const berry = (x: number, y: number, col: string, size = 7) => {
    let b = ''
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2
      b += `<circle cx="${f1(x + Math.cos(a) * size * 0.55)}" cy="${f1(y + Math.sin(a) * size * 0.55)}" r="${f1(size * 0.42)}" fill="${col}"/>`
    }
    b += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(size * 0.5)}" fill="${col}"/><circle cx="${f1(x - size * 0.2)}" cy="${f1(y - size * 0.25)}" r="${f1(size * 0.14)}" fill="#fff" opacity=".55"/>`
    return b
  }
  const crumbs = (col: string, n = 8, spread = 44, kindShape: 'rect' | 'tri' | 'ell' = 'rect') => {
    let c = ''
    for (let i = 0; i < n; i++) {
      const x = cx + jitter(spread)
      const y = cy + jitter(spread)
      const a = r() * 180
      if (kindShape === 'tri') c += `<polygon points="0,-4 4,3 -4,3" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})" fill="${col}"/>`
      else if (kindShape === 'ell') c += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(4 + r() * 3)}" ry="${f1(3 + r() * 2)}" transform="rotate(${f1(a)} ${f1(x)} ${f1(y)})" fill="${col}"/>`
      else c += `<rect x="${f1(x - 4)}" y="${f1(y - 2.5)}" width="${f1(6 + r() * 4)}" height="${f1(4 + r() * 2)}" rx="1.4" transform="rotate(${f1(a)} ${f1(x)} ${f1(y)})" fill="${col}"/>`
    }
    return c
  }
  switch (kind) {
    case 'raspberry':
      out += berry(cx - 18, cy - 6, '#8E1F3A', 11) + berry(cx + 14, cy - 14, '#A52A47', 10) + berry(cx + 2, cy + 18, '#8E1F3A', 11)
      break
    case 'strawberry':
      for (let i = 0; i < 3; i++) out += `<path d="M${f1(cx - 20 + i * 20)} ${f1(cy - 10 + (i % 2) * 14)} q10 -4 12 10 q-6 14 -12 12 q-8 -8 0 -22 z" fill="#B8283F"/><circle cx="${f1(cx - 14 + i * 20)}" cy="${f1(cy + (i % 2) * 14)}" r="1.4" fill="#F9D3A0"/>`
      break
    case 'rhubarb':
      for (let i = 0; i < 4; i++) out += `<rect x="${f1(cx - 24 + i * 12)}" y="${f1(cy - 12 + (i % 2) * 6)}" width="7" height="26" rx="2" fill="#F0A0AA" transform="rotate(${-20 + i * 14} ${f1(cx)} ${f1(cy)})"/>`
      break
    case 'mango':
      for (let i = 0; i < 3; i++) out += `<path d="M${f1(cx - 20 + i * 18)} ${f1(cy - 8 + i * 4)} q10 -14 20 0 q-10 6 -20 0z" fill="#F7C46A" stroke="#E08B1F" stroke-width="1"/>`
      break
    case 'pistachio':
      out += crumbs('#5E7A2E', 9, 46, 'rect') + crumbs('#A8C46E', 4, 40, 'ell')
      break
    case 'hazelnut':
      out += crumbs('#6E4524', 6, 44, 'ell') + crumbs('#C79A62', 4, 40, 'rect')
      break
    case 'pecan':
    case 'maple':
      out += crumbs('#6B3E1F', 6, 44, 'ell')
      if (kind === 'maple') out += `<path d="M${f1(cx)} ${f1(cy - 16)} l5 8 l9 -3 l-3 9 l8 4 l-10 3 l1 10 l-10 -6 l-10 6 l1 -10 l-10 -3 l8 -4 l-3 -9 l9 3 z" fill="#B5651D" opacity=".95"/>`
      break
    case 'speculoos':
      out += crumbs('#7A4E26', 8, 46, 'rect') + crumbs('#C99A5E', 4, 36, 'rect')
      break
    case 'buckwheat':
      out += crumbs('#3A2A20', 10, 46, 'tri')
      break
    case 'spelt':
      out += crumbs('#B8A06A', 8, 46, 'ell')
      break
    case 'chestnut':
      out += crumbs('#6A4A2E', 7, 44, 'ell') + crumbs('#E8D5B0', 3, 36, 'rect')
      break
    case 'popcorn':
      for (let i = 0; i < 5; i++) out += `<circle cx="${f1(cx + jitter(40))}" cy="${f1(cy + jitter(40))}" r="${f1(5 + r() * 3)}" fill="#FFF3C4" stroke="#E0B25A" stroke-width="1"/>`
      break
    case 'coconut':
      for (let i = 0; i < 7; i++) out += `<path d="M${f1(cx + jitter(44))} ${f1(cy + jitter(44))} q6 -8 12 -1" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`
      break
    case 'lemon': {
      out += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="14" fill="#F4E36C" stroke="#fff" stroke-width="3"/>`
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2
        out += `<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(cx + Math.cos(a) * 12)}" y2="${f1(cy + Math.sin(a) * 12)}" stroke="#fff" stroke-width="1.4"/>`
      }
      break
    }
    case 'apple':
      for (let i = 0; i < 3; i++) out += `<path d="M${f1(cx - 22 + i * 16)} ${f1(cy - 10 + i * 6)} q12 -12 22 2 q-10 10 -22 -2z" fill="#E8C36F" stroke="#B5651D" stroke-width="1"/>`
      break
    case 'cocoa':
      for (let i = 0; i < 14; i++) out += `<circle cx="${f1(cx + jitter(50))}" cy="${f1(cy + jitter(50))}" r="${f1(0.8 + r() * 1.4)}" fill="#C9A27A" opacity=".7"/>`
      out += `<path d="M${f1(cx - 24)} ${f1(cy - 8)} q12 -10 24 0 t24 0" fill="none" stroke="#2A1A14" stroke-width="2.4" stroke-linecap="round"/>`
      break
    case 'gianduja':
      out += `<path d="M${f1(cx)} ${f1(cy)} m-2 0 a3 3 0 1 1 6 0 a8 8 0 1 1 -16 0 a14 14 0 1 1 28 0 a20 20 0 1 1 -40 0" fill="none" stroke="#E5C99A" stroke-width="2.4" stroke-linecap="round"/>`
      break
    default:
      break
  }
  // Une pointe de fleur de sel sur chaque part
  for (let i = 0; i < 3; i++) {
    const sx = cx + jitter(60)
    const sy = cy + jitter(60)
    out += `<g transform="translate(${f1(sx)} ${f1(sy)}) scale(.35)">${crystal(8, r() * 60)}</g>`
  }
  return out
}

/** Une part, dans le repère du disque (centre 0,0), centrée sur l'angle `deg` (0 = à droite, -90 = en haut). */
export function flanSlice(f: Flan, deg: number, index: number): string {
  const a1 = deg - HALF
  const a2 = deg + HALF
  const wedge = `M0 0 L${P(pt(RC, a1))} A${RC} ${RC} 0 0 1 ${P(pt(RC, a2))} Z`
  const crust = `M${P(pt(RC, a1))} L${P(pt(R, a1))} A${R} ${R} 0 0 1 ${P(pt(R, a2))} L${P(pt(RC, a2))} A${RC} ${RC} 0 0 0 ${P(pt(RC, a1))} Z`
  const arcs = [152, 159, 166, 173]
    .map(
      (r, i) =>
        `<path d="M${P(pt(r, a1 + 1.2))} A${r} ${r} 0 0 1 ${P(pt(r, a2 - 1.2))}" fill="none" stroke="${C.goldDeep}" stroke-opacity="${0.22 + i * 0.04}" stroke-width="1"/>`,
    )
    .join('')
  const [tx, ty] = pt(96, deg)
  const insert = f.color2
    ? `<circle cx="${f1(pt(62, deg)[0])}" cy="${f1(pt(62, deg)[1])}" r="15" fill="${f.color2}" opacity=".95"/>`
    : ''
  return `<g class="slice" data-index="${index}" data-angle="${deg}" data-flan="${f.id}">
    <path d="${wedge}" fill="${f.color}" stroke="rgba(19,22,28,.18)" stroke-width="1.2"/>
    <path d="M0 0 L${P(pt(RC, deg))}" stroke="rgba(255,255,255,.14)" stroke-width="14" stroke-linecap="butt"/>
    ${insert}
    <path d="${crust}" fill="#EAD39A" stroke="rgba(122,90,18,.55)" stroke-width="1.2"/>${arcs}
    ${toppingShapes(f.topping, f, tx, ty)}
  </g>`
}

/** Le disque entier: 6 parts, la première centrée en haut. */
export function flanDisc(flans: Flan[]): string {
  const slices = flans.map((f, i) => flanSlice(f, -90 + i * 60, i)).join('')
  return `<svg class="flan-disc-svg" viewBox="-206 -206 412 412" role="presentation" aria-hidden="true" focusable="false">
    <circle r="${R + 12}" fill="rgba(19,22,28,.06)"/>
    <g class="disc-rotor">${slices}</g>
    <circle r="7" fill="${C.gold}" opacity=".0"/>
  </svg>`
}

/** Une part seule, pointe vers le bas, pour les pastilles et les vignettes. */
export function flanWedge(f: Flan, cls = ''): string {
  return `<svg class="flan-wedge ${cls}" viewBox="-96 -192 192 200" role="presentation" aria-hidden="true" focusable="false"><g transform="rotate(0)">${flanSlice(f, -90, 0)}</g></svg>`
}

/** Coupe de la base feuilletée, pour la fiche d'une part. */
export function flanBaseSection(f: Flan): string {
  return `<svg class="flan-section" viewBox="0 0 240 90" role="presentation" aria-hidden="true" focusable="false">
    <rect x="0" y="0" width="240" height="30" fill="${f.color}"/>
    ${f.color2 ? `<rect x="40" y="6" width="60" height="18" rx="9" fill="${f.color2}"/>` : ''}
    <g transform="translate(0 30)">${strata({ w: 240, h: 54, n: 11, seed: hashStr(f.id), crumb: true })}</g>
    <rect x="0" y="0" width="240" height="90" fill="none" stroke="rgba(122,90,18,.5)"/>
  </svg>`
}

// ---------------------------------------------------------------------------------------------
// Tourage: pile de feuillets pour la scène épinglée (3, 9, 27 couches)
// ---------------------------------------------------------------------------------------------
export function tourageStack(n: number, seed: number): string {
  return `<g class="stack stack-${n}">${strata({ w: 420, h: 260, n, seed, crumb: n <= 9, wobble: n > 9 ? 3 : 0 })}</g>`
}

// ---------------------------------------------------------------------------------------------
// Ciel, aube, cristaux, quartier: pièces de galerie et illustrations de journal
// ---------------------------------------------------------------------------------------------
type Pal = { bg: [string, string]; fg: string; accent: string; line: string }
const PALETTES: Record<GalleryItem['palette'], Pal> = {
  or: { bg: ['#1A2030', '#7A5A12'], fg: '#F0D79A', accent: '#D2AE5C', line: '#F0D79A' },
  sel: { bg: ['#F5F6F3', '#E7E9E4'], fg: '#13161C', accent: '#7A5A12', line: '#7A5A12' },
  nuit: { bg: ['#0F131B', '#1A2030'], fg: '#F0D79A', accent: '#D2AE5C', line: '#D2AE5C' },
  schiste: { bg: ['#6B3A48', '#3C2029'], fg: '#F0D79A', accent: '#D2AE5C', line: '#F0D79A' },
  framboise: { bg: ['#2A0E18', '#C23B57'], fg: '#FFE2E8', accent: '#F0D79A', line: '#FFE2E8' },
  pistache: { bg: ['#1E2A12', '#8FA65A'], fg: '#F2F7DA', accent: '#F0D79A', line: '#F2F7DA' },
}

const bgDef = (id: string, pal: Pal) =>
  `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pal.bg[0]}"/><stop offset="1" stop-color="${pal.bg[1]}"/></linearGradient></defs><rect width="400" height="400" fill="url(#${id})"/>`

function laminationArt(it: GalleryItem, pal: Pal): string {
  const r = rng(it.seed)
  const id = `bg${it.id}`
  let body = bgDef(id, pal)
  const dark = pal.bg[0] !== '#F5F6F3'
  const dough = dark ? '#F6F1E3' : '#FFFFFF'
  switch (it.variant) {
    case 1: {
      // macro alvéolage
      body += strata({ w: 400, h: 400, n: 14, seed: it.seed, dough, crumb: false })
      for (let i = 0; i < 46; i++) {
        const cx = r() * 400
        const cy = r() * 400
        body += `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(10 + r() * 34)}" ry="${f1(5 + r() * 12)}" fill="${C.night}" opacity="${f1(0.1 + r() * 0.16)}"/><ellipse cx="${f1(cx)}" cy="${f1(cy - 2)}" rx="${f1(8 + r() * 26)}" ry="${f1(3 + r() * 8)}" fill="${C.glow}" opacity=".35"/>`
      }
      break
    }
    case 2:
      body += `<g transform="translate(40 70)">${strata({ w: 320, h: 230, n: 9, seed: it.seed, dough, crumb: true })}</g>`
      for (let i = 0; i < 9; i++) body += `<g transform="translate(${f1(30 + r() * 340)} ${f1(40 + r() * 320)}) scale(${f1(0.8 + r() * 0.8)})">${crystal(10, r() * 80)}</g>`
      break
    case 3: {
      // pli double: feuillets qui se replient
      for (let i = 0; i < 12; i++) {
        const y = 60 + i * 24
        const col = i % 2 ? C.butter : dough
        body += `<path d="M30 ${y} C150 ${y - 40} 250 ${y + 40} 370 ${y} L370 ${y + 20} C250 ${y + 60} 150 ${y - 20} 30 ${y + 20} Z" fill="${col}" stroke="rgba(122,90,18,.4)" stroke-width=".6"/>`
      }
      break
    }
    default:
      body += `<g transform="translate(36 56)">${strata({ w: 328, h: 288, n: it.id === 'g01' ? 27 : 17, seed: it.seed, dough, crumb: true, wobble: 4 })}</g>`
  }
  return body
}

function flanArt(it: GalleryItem, flans: Flan[], pal: Pal): string {
  const id = `bg${it.id}`
  let body = bgDef(id, pal)
  const pick = (i: number) => flans[i % flans.length]
  if (it.variant === 2) {
    const six = [0, 1, 2, 3, 4, 5].map((i) => pick(i + it.seed))
    body += `<g transform="translate(200 200) scale(.96)">${six.map((f, i) => flanSlice(f, -90 + i * 60, i)).join('')}</g>`
  } else if (it.variant === 4) {
    const f = pick(it.seed)
    body += `<g transform="translate(40 120) scale(1.5)">${flanBaseSection(f).replace(/<svg[^>]*>|<\/svg>/g, '')}</g>`
  } else {
    const f = pick(it.seed)
    body += `<g transform="translate(200 360) scale(1.9)"><g transform="translate(0 0)">${flanSlice(f, -90, 0)}</g></g>`
  }
  return body
}

function aubeArt(it: GalleryItem, _pal: Pal): string {
  const r = rng(it.seed)
  const sky: [string, string, string] =
    it.variant === 0 ? ['#0A0E15', '#141B2A', '#1F2A40'] : it.variant === 1 ? ['#1A2030', '#7A5A12', '#F0D79A'] : ['#DCE3EC', '#F5F6F3', '#FBF3DC']
  let body = `<defs><linearGradient id="s${it.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect width="400" height="400" fill="url(#s${it.id})"/>`
  if (it.variant < 2) for (let i = 0; i < 40; i++) body += `<circle cx="${f1(r() * 400)}" cy="${f1(r() * 200)}" r="${f1(0.5 + r() * 1.2)}" fill="#fff" opacity="${f1(0.25 + r() * 0.5)}"/>`
  if (it.variant === 1) body += `<circle cx="300" cy="260" r="46" fill="${C.glow}" opacity=".85"/><circle cx="300" cy="260" r="80" fill="${C.glow}" opacity=".16"/>`
  // façade
  const shop = it.variant === 2 ? '#FFFFFF' : it.variant === 1 ? '#C9CDC9' : '#222A3A'
  body += `<rect x="70" y="210" width="260" height="190" fill="${shop}" stroke="${it.variant === 2 ? '#D9DCD8' : 'rgba(255,255,255,.1)'}"/>`
  body += `<rect x="96" y="262" width="96" height="138" fill="${it.variant === 0 ? '#2A3350' : '#FBF3DC'}" ${it.variant === 0 ? '' : 'opacity=".85"'} stroke="${C.gold}" stroke-width="1.5"/>`
  body += `<rect x="212" y="262" width="92" height="90" fill="${it.variant === 0 ? '#2A3350' : '#FBF3DC'}" stroke="${C.gold}" stroke-width="1.5"/>`
  body += `<line x1="86" y1="232" x2="314" y2="232" stroke="${C.gold}" stroke-width="3" stroke-linecap="round"/>`
  if (it.variant === 0) body += `<rect x="96" y="262" width="96" height="138" fill="${C.glow}" opacity=".16"/>`
  return body + `<rect y="398" width="400" height="2" fill="${C.gold}" opacity=".6"/>`
}

function cristauxArt(it: GalleryItem, pal: Pal): string {
  const r = rng(it.seed)
  let body = bgDef(`bg${it.id}`, pal)
  const n = it.variant === 0 ? 14 : 36
  for (let i = 0; i < n; i++) {
    const s = it.variant === 0 ? 20 + r() * 40 : 6 + r() * 20
    body += `<g transform="translate(${f1(30 + r() * 340)} ${f1(30 + r() * 340)})">${crystal(s, r() * 360, pal.bg[0] === '#F5F6F3' ? '#FFFFFF' : '#F5F6F3', C.gold)}</g>`
  }
  return body
}

function quartierArt(it: GalleryItem, pal: Pal): string {
  let body = bgDef(`bg${it.id}`, pal)
  const g = `fill="none" stroke="${C.glow}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`
  if (it.variant === 0) {
    // canal et écluse
    for (let i = 0; i < 6; i++) body += `<path d="M20 ${250 + i * 22} q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" ${g} opacity="${f1(0.9 - i * 0.12)}"/>`
    body += `<path d="M60 250 V150 H110 V250 M290 250 V150 H340 V250 M60 150 L40 130 H130 M290 150 L270 130 H360" ${g}/><path d="M130 130 V90 M270 130 V90 M130 90 H270" ${g}/><circle cx="200" cy="70" r="26" ${g}/>`
  } else if (it.variant === 1) {
    // église et vitraux
    body += `<path d="M110 360 V190 L200 100 L290 190 V360 Z M160 360 V260 a40 40 0 0 1 80 0 V360 M200 100 V50 M184 66 H216" ${g}/>`
    ;[150, 200, 250].forEach((x) => (body += `<path d="M${x - 12} 220 a12 12 0 0 1 24 0 v26 h-24 z" ${g}/>`))
    body += `<circle cx="200" cy="170" r="16" ${g}/>`
  } else {
    // pans de bois
    for (let k = 0; k < 3; k++) {
      const x = 30 + k * 120
      body += `<path d="M${x} 360 V160 L${x + 55} 100 L${x + 110} 160 V360 Z M${x} 230 H${x + 110} M${x + 55} 160 V360 M${x} 230 L${x + 55} 160 L${x + 110} 230 M${x} 300 L${x + 55} 230 L${x + 110} 300" ${g}/>`
    }
  }
  return body
}

export function galleryArt(it: GalleryItem, flans: Flan[]): string {
  const pal = PALETTES[it.palette]
  let inner = ''
  switch (it.kind) {
    case 'lamination':
      inner = laminationArt(it, pal)
      break
    case 'flan':
      inner = flanArt(it, flans, pal)
      break
    case 'aube':
      inner = aubeArt(it, pal)
      break
    case 'cristaux':
      inner = cristauxArt(it, pal)
      break
    case 'quartier':
      inner = quartierArt(it, pal)
      break
  }
  return `<svg class="gallery-art" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${it.alt}" focusable="false">${inner}</svg>`
}

/** Couverture d'article: motif simple à partir d'une clé. */
export function coverArt(key: string, seed: number, flans: Flan[]): string {
  const base = (id: string) => `<svg class="cover-art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1A2030"/><stop offset="1" stop-color="#0F131B"/></linearGradient></defs><rect width="400" height="300" fill="url(#${id})"/>`
  const id = `cv${seed}`
  if (key === 'dawn') {
    const it = { id: `c${seed}`, variant: 1, seed } as GalleryItem
    return `<svg class="cover-art" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${aubeArt(it, PALETTES.or)}</svg>`
  }
  if (key === 'layers') {
    return base(id) + `<g transform="translate(60 40)">${strata({ w: 280, h: 220, n: 17, seed, crumb: true, wobble: 3 })}</g></svg>`
  }
  if (key === 'flan-slice') {
    const f = flans[seed % flans.length]
    return base(id) + `<g transform="translate(200 280) scale(1.25)">${flanSlice(f, -90, 0)}</g></svg>`
  }
  if (key === 'salt') {
    const r = rng(seed)
    let c = ''
    for (let i = 0; i < 16; i++) c += `<g transform="translate(${f1(30 + r() * 340)} ${f1(30 + r() * 240)})">${crystal(8 + r() * 18, r() * 360, '#F5F6F3', C.gold)}</g>`
    return base(id) + c + '</svg>'
  }
  return base(id) + `<g transform="translate(120 70) scale(1.6)" style="color:${C.glow}" class="art">${ART[key as ArtKey] ?? ART.croissant}</g></svg>`
}

// ---------------------------------------------------------------------------------------------
// Schéma du quartier (pas une carte à l'échelle) + parcours qui se dessine
// ---------------------------------------------------------------------------------------------
export function smoothPath(points: [number, number][]): string {
  if (points.length < 2) return ''
  let d = `M${f1(points[0][0])} ${f1(points[0][1])}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1: [number, number] = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2: [number, number] = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${f1(c1[0])} ${f1(c1[1])} ${f1(c2[0])} ${f1(c2[1])} ${f1(p2[0])} ${f1(p2[1])}`
  }
  return d
}

export function quartierSchema(pois: Poi[]): string {
  const route = [...pois].filter((p) => p.id !== 'lices').sort((a, b) => a.order - b.order)
  const path = smoothPath(route.map((p) => [p.x, p.y] as [number, number]))
  const shop = pois.find((p) => p.id === 'boutique')!
  return `<svg class="quartier-schema" viewBox="0 0 640 400" role="img" aria-label="Schéma du quartier Saint-Martin: de la promenade du canal à l'angle de la rue de Saint-Malo et du boulevard de Verdun. Ce n'est pas une carte à l'échelle." focusable="false">
    <rect width="640" height="400" class="qs-bg"/>
    <path class="qs-park" d="M20 20 H170 Q190 60 160 110 Q110 130 40 110 Q10 70 20 20 Z"/>
    <path class="qs-canal" d="M0 150 C120 120 180 190 300 170 S480 110 640 130" />
    <path class="qs-canal qs-canal-2" d="M0 164 C120 134 180 204 300 184 S480 124 640 144" />
    <path class="qs-street" d="M360 0 L520 400"/>
    <path class="qs-street" d="M300 300 L640 250"/>
    <path class="qs-street qs-street-thin" d="M380 120 L610 200"/>
    <path class="qs-street qs-street-thin" d="M200 330 L460 380"/>
    <text class="qs-label" x="372" y="40" transform="rotate(20 372 40)">rue de Saint-Malo</text>
    <text class="qs-label" x="470" y="262" transform="rotate(-8 470 262)">bd de Verdun</text>
    <path class="qs-route" d="${path}" pathLength="1"/>
    ${pois
      .map(
        (p) =>
          `<g class="qs-poi${p.id === 'boutique' ? ' is-shop' : ''}" data-poi="${p.id}" transform="translate(${p.x} ${p.y})"><circle r="${p.id === 'boutique' ? 11 : 6}"/>${p.id === 'boutique' ? `<circle r="4" class="qs-core"/>` : ''}</g>`,
      )
      .join('')}
    <g transform="translate(${shop.x} ${shop.y})"><circle class="qs-pulse" r="11"/></g>
  </svg>`
}

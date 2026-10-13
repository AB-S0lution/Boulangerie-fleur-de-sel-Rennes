// Petits composants HTML réutilisés par plusieurs pages (des chaînes, pas de framework).
import { CUSTOMER_WORDS, HOURS, TAG_LABEL, formatRange, parisNow, type NewsPost, type Product, type Testimonial } from '../data'
import { crystalSvg, productArt } from './art'
import { flanById, PHOTO_NOTE, photoBySlug, photoFor, type Photo, type PhotoTheme } from '../data'
import { esc, eur, href, html } from './dom'
import { icon } from './icons'

/** Bandeau d'ouverture des pages intérieures. */
export const pageHero = (o: { eyebrow: string; title: string; lead?: string; extra?: string }): string => html`
  <header class="page-hero">
    <div class="wrap">
      <p class="eyebrow" data-reveal="fade">${o.eyebrow}</p>
      <h1 data-split>${o.title}</h1>
      ${o.lead ? html`<p class="lead" data-reveal>${o.lead}</p>` : ''}
      ${o.extra ?? ''}
    </div>
  </header>`

export const sectionHead = (eyebrow: string, title: string, lead?: string, wide = false): string => html`
  <div class="section-head${wide ? ' section-head--wide' : ''}">
    <p class="eyebrow" data-reveal="fade">${eyebrow}</p>
    <h2 data-split>${title}</h2>
    ${lead ? html`<p class="lead" data-reveal>${lead}</p>` : ''}
  </div>`

export const productPrice = (p: Product): string =>
  p.price === null
    ? html`<span class="price price--none">${p.priceNote ?? 'Prix en boutique'}</span>`
    : html`<span class="price">${eur(p.price)}${p.priceSource === 'mock' ? html`<small><span aria-hidden="true"> *</span><span class="sr-only"> (prix d’exemple)</span></small>` : ''}</span>`

export const productBadges = (p: Product, max = 2): string => {
  const tags = p.tags.slice(0, max)
  return html`<span class="badges">${tags.map((t) => html`<span class="badge${t === 'champion' || t === 'signature' ? ' badge--gold' : ''}">${TAG_LABEL[t]}</span>`)}</span>`
}

export const productCard = (p: Product): string => html`
  <a class="tag-card" href="${href(`boutique/produit.html?id=${p.id}`)}" data-product-id="${p.id}" data-name="${esc(p.name)}">
    ${productTheme(p) ? html`<div class="tag-art tag-art--photo">${photoImg(photoFor(seedOf(p.id), productTheme(p)!), 'ph-img', true)}</div>` : html`<div class="tag-art">${productArt(p.art)}</div>`}
    <h3 class="tag-name">${p.name}</h3>
    <p class="tag-desc">${p.description}</p>
    <div class="tag-foot">${productBadges(p)}${productPrice(p)}</div>
  </a>`

export const newsCard = (n: NewsPost, big = false): string => html`
  <a class="news-card${big ? ' news-card--big' : ''}" href="${href(`journal/article.html?slug=${n.slug}`)}" data-category="${n.category}">
    <div class="news-cover news-cover--photo">${photoImg(newsPhoto(n), 'ph-img', true)}</div>
    <div class="news-meta"><span class="badge">${n.category}</span><time class="mono" datetime="${n.date}">${n.dateLabel}</time></div>
    <h3>${n.title}</h3>
    <p class="muted">${n.excerpt}</p>
  </a>`

/** Photo d'illustration (Unsplash): image paresseuse, dimensions réservées, mention discrète. */
export const photoImg = (ph: Photo, cls = 'ph-img', note = false): string => html`
  <img class="${cls}" src="${ph.src}" alt="${esc(ph.alt)}" width="${String(ph.width)}" height="${String(ph.height)}" loading="lazy" decoding="async" />${note ? html`<span class="ph-note" aria-hidden="true">${PHOTO_NOTE}</span>` : ''}`

/** Figure avec légende et crédit. */
export const photoFigure = (ph: Photo, cls = '', reveal = 'up'): string => html`
  <figure class="ph-fig ${cls}" data-reveal="${reveal}">
    <div class="ph-frame">${photoImg(ph)}</div>
    <figcaption class="ph-cap"><span>${PHOTO_NOTE}</span> · <a href="${ph.url}" target="_blank" rel="noopener noreferrer">${esc(ph.credit)} / Unsplash</a></figcaption>
  </figure>`

/** Bande photo fine (pages intérieures: FAQ, infos, légal…). Une à trois photos, recadrées en bandeau. */
export const photoBand = (slugs: string[], cls = ''): string => {
  const list = slugs.map(photoBySlug).filter((p): p is Photo => !!p)
  return html`
    <section class="photo-slim ${cls}" aria-label="Photos d’illustration">
      <div class="wrap">
        <ul class="photo-slim-grid photo-slim-grid--${String(list.length)}">
          ${list.map((ph, i) => html`<li class="photo-slim-item" data-reveal="${i === 0 ? 'clip' : 'up'}">${photoImg(ph, 'ph-img', i === 0)}</li>`)}
        </ul>
        <p class="ph-cap">${PHOTO_NOTE} · ${list.map((ph) => html`<a href="${ph.url}" target="_blank" rel="noopener noreferrer">${esc(ph.credit)}</a>`).join(', ')} / Unsplash</p>
      </div>
    </section>`
}

/** Photo associée à un produit (même choix que sa carte), ou undefined pour les flans et le snacking (art SVG). */
export const productPhoto = (p: Product): Photo | undefined => {
  const t = productTheme(p)
  return t ? photoFor(seedOf(p.id), t) : undefined
}

/** Photo de couverture d'un article (même choix que sa carte). */
export const newsPhoto = (n: NewsPost): Photo => photoFor(seedOf(n.slug))

const PRODUCT_THEME: Partial<Record<string, PhotoTheme>> = {
  pains: 'pain',
  quotidien: 'pain',
  viennoiseries: 'viennoiserie',
  feuillete: 'viennoiserie',
  douceurs: 'patisserie',
}
const productTheme = (p: Product): PhotoTheme | undefined => PRODUCT_THEME[p.category]

export function seedOf(s: string): number {
  let h = 7
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h % 997
}

export const quote = (t: Testimonial): string => html`
  <figure class="quote">
    <blockquote>« ${t.text.replace(/^"|"$/g, '')} »</blockquote>
    <figcaption><span class="mono">${t.attribution}</span> · ${t.dateLabel}</figcaption>
  </figure>`

/** Le seul bandeau défilant du site. Le doublon est masqué aux technologies d'assistance. */
export const marquee = (): string => {
  const item = (hidden: boolean) => html`<span class="marquee-item"${hidden ? ' aria-hidden="true"' : ''}>${CUSTOMER_WORDS.map(
    (w) => html`<span>${w}</span><span class="crystal-sep">${crystalSvg(12)}</span>`,
  )}</span>`
  return html`<div class="marquee" role="group" aria-label="Mots de nos clients, extraits d’avis Google"><div class="marquee-track">${item(false)}${item(true)}</div></div>`
}

/** Tableau d'horaires avec la ligne du jour mise en avant. */
export const hoursTable = (): string => {
  const today = parisNow().dayIndex
  return html`<dl class="hours-table">${HOURS.map(
    (d) => html`<div${d.dayIndex === today ? ' class="is-today"' : ''}><dt>${d.label}</dt><dd class="mono">${formatRange(d)}</dd></div>`,
  )}</dl>`
}

export const statusPill = (): string => html`
  <p class="status-inline"><span class="led" data-status-led data-open="false" aria-hidden="true"></span><span data-status-copy>Horaires</span></p>`

export const flanMini = (id: string): string => {
  const f = flanById(id)
  return f.name
}

export const arrowLink = (label: string, to: string, cls = ''): string =>
  html`<a class="btn ${cls}" href="${to}">${label}<span class="btn-ico">${icon('arrow-up-right')}</span></a>`

export const demoBadge = (label = 'Données d’exemple'): string => html`<span class="badge badge--mock">${label}</span>`

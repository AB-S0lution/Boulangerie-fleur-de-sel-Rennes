import { boot } from '../core/boot'
import { $, href, html, param, setMeta } from '../core/dom'
import { icon } from '../core/icons'
import { coverArt, productArt } from '../core/art'
import { newsPhoto, photoFigure, seedOf } from '../core/components'
import { gsap, motionOn } from '../core/motion'
import { FLANS, postBySlug, sortedNews, type NewsPost } from '../data'

const slug = param('slug') ?? ''
const post = postBySlug(slug)

function notFound(): string {
  return html`
    <section class="section page-top">
      <div class="wrap">
        <div class="empty">
          ${productArt('baguette', 'empty-art')}
          <h1>Cet article n’existe pas.</h1>
          <p class="muted">Il a peut-être été déplacé. Le journal garde tout le reste.</p>
          <a class="btn" href="${href('journal/')}">Retour au journal<span class="btn-ico">${icon('arrow-right')}</span></a>
        </div>
      </div>
    </section>`
}

function view(p: NewsPost): string {
  const all = sortedNews()
  const i = all.findIndex((x) => x.slug === p.slug)
  const newer = all[i - 1]
  const older = all[i + 1]
  const nav = (n: NewsPost | undefined, dir: 'prev' | 'next') =>
    n
      ? html`<a class="pn pn--${dir}" href="${href(`journal/article.html?slug=${n.slug}`)}"><span class="mono">${dir === 'prev' ? 'Article plus récent' : 'Article plus ancien'}</span><strong>${n.title}</strong></a>`
      : '<span></span>'
  return html`
    <div class="read-progress" aria-hidden="true"><span data-progress></span></div>
    <article class="article page-top">
      <header class="wrap article-head">
        <nav class="crumbs mono" aria-label="Fil d’Ariane"><a class="link" href="${href('journal/')}">Journal</a><span aria-hidden="true">/</span><span>${p.category}</span></nav>
        <h1 data-split>${p.title}</h1>
        <p class="article-meta mono"><time datetime="${p.date}">${p.dateLabel}</time> · ${p.readMinutes} min de lecture ${p.kind === 'editorial' ? '· <span class="badge badge--mock">Contenu d’exemple</span>' : ''}</p>
      </header>
      <div class="wrap article-cover article-cover--photo">${photoFigure(newsPhoto(p), 'article-photo', 'clip')}</div>
      <div class="wrap article-body">
        <p class="lead">${p.excerpt}</p>
        ${p.body.map((para, k) => `<p>${para}</p>${k === 0 && p.body.length > 1 ? `<figure class="article-art" data-reveal="clip">${coverArt(p.art, seedOf(p.slug), FLANS)}<figcaption class="fine muted">Illustration originale.</figcaption></figure>` : ''}`)}
        ${p.body.length <= 1 ? `<figure class="article-art" data-reveal="clip">${coverArt(p.art, seedOf(p.slug), FLANS)}<figcaption class="fine muted">Illustration originale.</figcaption></figure>` : ''}
        ${p.ref && p.kind === 'reel' ? `<p class="fine muted">Source: <a class="link" href="${p.ref}" target="_blank" rel="noopener noreferrer">lien d’origine</a></p>` : ''}
      </div>
      <nav class="wrap prev-next" aria-label="Autres articles">${nav(newer, 'prev')}${nav(older, 'next')}</nav>
    </article>`
}

if (post) setMeta(`${post.title} | Journal Fleur de sel`, post.excerpt)
else setMeta('Article introuvable | Fleur de sel, Rennes')

boot({
  nav: 'journal',
  main: () => (post ? view(post) : notFound()),
  init() {
    const bar = $('[data-progress]')
    if (!bar || !motionOn()) return
    gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.article-body', start: 'top 80%', end: 'bottom 80%', scrub: true } })
  },
})

import { boot } from '../core/boot'
import { $, $$, esc, html } from '../core/dom'
import { icon } from '../core/icons'
import { galleryArt } from '../core/art'
import { pageHero, photoFigure } from '../core/components'
import { startScroll, stopScroll, gsap, motionOn } from '../core/motion'
import { FLANS, GALLERY, GALLERY_KINDS, PHOTOS, type GalleryKind } from '../data'

let kind: GalleryKind | 'tout' = 'tout'

function main(): string {
  const count = (k: GalleryKind | 'tout') => (k === 'tout' ? GALLERY.length : GALLERY.filter((g) => g.kind === k).length)
  return html`
    ${pageHero({ eyebrow: 'La galerie', title: 'Photos et dessins, du fournil au sel.', lead: `${PHOTOS.length} photos d’illustration libres de droits (Unsplash) et dix-huit dessins originaux. Aucune image ne montre la boutique ni ses produits.` })}
    <section class="section section--tight photo-gallery" aria-labelledby="pg-title">
      <div class="wrap">
        <h2 id="pg-title" class="eyebrow" data-reveal="fade">Photos d’illustration · ${String(PHOTOS.length)}</h2>
        <div class="photo-masonry">${PHOTOS.map((ph) => photoFigure(ph))}</div>
      </div>
    </section>
    <div class="wrap"><h2 class="eyebrow" data-reveal="fade">Dessins originaux · ${String(GALLERY.length)}</h2></div>
    <section class="section section--tight gallery" aria-label="Images">
      <div class="wrap">
        <div class="scroller cats" role="group" aria-label="Filtrer les images">
          ${GALLERY_KINDS.map((k) => html`<button class="chip" type="button" data-gkind="${k.id}" aria-pressed="${String(k.id === 'tout')}">${k.label}<span class="count">${count(k.id)}</span></button>`)}
        </div>
        <ul class="masonry" data-masonry>
          ${GALLERY.map(
            (g, i) => html`
              <li class="m-item" data-kind="${g.kind}" style="--ratio:${g.ratio}">
                <button class="m-btn" type="button" data-gopen="${String(i)}" aria-label="Agrandir: ${esc(g.title)}">
                  ${galleryArt(g, FLANS)}
                  <span class="m-cap"><strong>${g.title}</strong><span>${g.caption}</span></span>
                </button>
              </li>`,
          )}
        </ul>
      </div>
    </section>
    <dialog class="lightbox" data-lightbox aria-label="Image agrandie">
      <div class="lb-inner">
        <button class="round-btn lb-close" type="button" data-close aria-label="Fermer">${icon('x')}</button>
        <div class="lb-art" data-lb-art></div>
        <div class="lb-cap"><h2 data-lb-title></h2><p class="muted" data-lb-caption></p><p class="mono fine" data-lb-count></p></div>
        <button class="round-btn lb-prev" type="button" data-prev aria-label="Image précédente">${icon('caret-left')}</button>
        <button class="round-btn lb-next" type="button" data-next aria-label="Image suivante">${icon('caret-right')}</button>
      </div>
    </dialog>`
}

function init() {
  const items = $$<HTMLElement>('.m-item')
  const dlg = $<HTMLDialogElement>('[data-lightbox]')!
  const art = $('[data-lb-art]')!
  let current = 0
  const visible = () => GALLERY.map((g, i) => ({ g, i })).filter(({ g }) => kind === 'tout' || g.kind === kind)

  $$('[data-gkind]').forEach((b) =>
    b.addEventListener('click', () => {
      kind = b.dataset.gkind as typeof kind
      $$('[data-gkind]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
      items.forEach((el) => (el.hidden = !(kind === 'tout' || el.dataset.kind === kind)))
      if (motionOn()) gsap.fromTo(items.filter((el) => !el.hidden), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.03, clearProps: 'all' })
    }),
  )

  const show = (i: number) => {
    current = i
    const g = GALLERY[i]
    art.innerHTML = galleryArt(g, FLANS)
    $('[data-lb-title]')!.textContent = g.title
    $('[data-lb-caption]')!.textContent = g.caption
    const list = visible()
    $('[data-lb-count]')!.textContent = `${list.findIndex((x) => x.i === i) + 1} sur ${list.length}`
  }
  const move = (d: 1 | -1) => {
    const list = visible()
    const pos = list.findIndex((x) => x.i === current)
    show(list[(pos + d + list.length) % list.length].i)
  }
  $$('[data-gopen]').forEach((b) =>
    b.addEventListener('click', () => {
      show(Number(b.dataset.gopen))
      dlg.showModal()
      stopScroll()
    }),
  )
  $('[data-close]')!.addEventListener('click', () => dlg.close())
  dlg.addEventListener('close', () => startScroll())
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) dlg.close()
  })
  $('[data-prev]')!.addEventListener('click', () => move(-1))
  $('[data-next]')!.addEventListener('click', () => move(1))
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') move(1)
    else if (e.key === 'ArrowLeft') move(-1)
  })
}

boot({ nav: 'galerie', main, init })

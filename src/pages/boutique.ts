import { boot } from '../core/boot'
import { $, $$, fold, html, param, reducedMotion } from '../core/dom'
import { icon } from '../core/icons'
import { productArt } from '../core/art'
import { pageHero, photoBand, productCard } from '../core/components'
import { Flip, gsap, motionOn } from '../core/motion'
import { CATEGORIES, MOMENTS, PRODUCTS, TAG_LABEL, type CategoryId, type Moment, type ProductTag } from '../data'

const FILTER_TAGS: ProductTag[] = ['bio', 'vegetarien', 'fruits-a-coque', 'de-saison', 'signature', 'nouveau']

interface State {
  cat: CategoryId | 'tout'
  q: string
  tags: Set<ProductTag>
  moment: Moment | null
}

const initialCat = param('cat')
const state: State = {
  cat: CATEGORIES.some((c) => c.id === initialCat) ? (initialCat as CategoryId) : 'tout',
  q: param('q') ?? '',
  tags: new Set(),
  moment: null,
}

const count = (id: CategoryId | 'tout') => (id === 'tout' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === id).length)

const matches = (p: (typeof PRODUCTS)[number]): boolean => {
  if (state.cat !== 'tout' && p.category !== state.cat) return false
  if (state.moment && !p.moments.includes(state.moment)) return false
  for (const t of state.tags) if (!p.tags.includes(t)) return false
  if (state.q) {
    const hay = fold(`${p.name} ${p.description} ${p.tags.map((t) => TAG_LABEL[t]).join(' ')}`)
    if (!state.q.split(/\s+/).every((w) => hay.includes(fold(w)))) return false
  }
  return true
}

function main(): string {
  return html`
    ${pageHero({
      eyebrow: 'La boutique',
      title: 'Pains, viennoiseries, flans et snacking.',
      lead: 'Le catalogue de la maison, à feuilleter. L’offre change régulièrement: pour savoir ce qui est en vitrine ce matin, appelez la boutique.',
    })}
    ${photoBand(['pains-graines-ble', 'croissants-table', 'tarte-fruits-rouges'], 'photo-slim--shop')}
    <section class="section section--tight shop" aria-label="Catalogue">
      <div class="wrap">
        <div class="moments" role="group" aria-label="Choisir un moment de la journée">
          ${MOMENTS.map(
            (m) => html`<button class="moment" type="button" data-moment="${m.id}" aria-pressed="false"><span class="moment-label">${m.label}</span><span class="moment-line muted">${m.line}</span></button>`,
          )}
        </div>
        <div class="filters">
          <div class="input-wrap">
            ${icon('search')}
            <label class="sr-only" for="q">Rechercher un produit</label>
            <input class="input" id="q" type="search" inputmode="search" enterkeyhint="search" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Rechercher: croissant, flan, bara…" value="${state.q}" />
            <button class="search-clear" type="button" aria-label="Effacer la recherche">${icon('x')}</button>
          </div>
          <div class="scroller cats" role="group" aria-label="Catégories">
            ${[{ id: 'tout', label: 'Tout' }, ...CATEGORIES].map(
              (c) => html`<button class="chip" type="button" data-cat="${c.id}" aria-pressed="${String(state.cat === c.id)}">${c.label}<span class="count">${count(c.id as CategoryId | 'tout')}</span></button>`,
            )}
          </div>
          <div class="scroller tags" role="group" aria-label="Filtres">
            ${FILTER_TAGS.map((t) => html`<button class="chip" type="button" data-tag="${t}" aria-pressed="false">${TAG_LABEL[t]}</button>`)}
          </div>
        </div>
        <div class="result-bar">
          <p class="result-count mono" role="status" aria-live="polite" data-count></p>
          <button class="link reset" type="button" data-reset hidden>Réinitialiser</button>
        </div>
        <p class="cat-intro lead" data-intro></p>
        <div class="card-grid shop-grid" data-grid>
          ${PRODUCTS.map((p) => productCard(p).replace('<a class="tag-card"', `<a class="tag-card" data-flip-id="${p.id}"`))}
        </div>
        <div class="empty" data-empty hidden>
          ${productArt('boule', 'empty-art')}
          <h2>Rien ici aujourd’hui…</h2>
          <p class="muted">Essayez une autre catégorie, ou effacez la recherche. Et si vous cherchez quelque chose de précis, appelez la boutique.</p>
          <button class="btn btn--ghost btn--noicon" type="button" data-reset>Tout afficher</button>
        </div>
        <p class="fine muted shop-note">* Prix d’exemple: seuls quelques prix sont relevés publiquement (croissant, pain au chocolat, pain complet, tourte, religieuse, éclair, flan). Le catalogue est une démonstration et l’offre change régulièrement.</p>
      </div>
    </section>`
}

function init() {
  const cards = $$<HTMLElement>('[data-grid] .tag-card')
  const grid = $('[data-grid]')!
  const empty = $('[data-empty]')!
  const countEl = $('[data-count]')!
  const intro = $('[data-intro]')!
  const resetBtns = $$('[data-reset]')
  const input = $<HTMLInputElement>('#q')!
  const wrap = input.closest('.input-wrap')!

  const apply = (animate: boolean) => {
    const animated = animate && motionOn() && !reducedMotion()
    const flipState = animated ? Flip.getState(cards) : null
    let shown = 0
    cards.forEach((el) => {
      const p = PRODUCTS.find((x) => x.id === el.dataset.productId)!
      const ok = matches(p)
      el.hidden = !ok
      if (ok) shown++
    })
    // contrôles
    $$('[data-cat]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cat === state.cat)))
    $$('[data-tag]').forEach((b) => b.setAttribute('aria-pressed', String(state.tags.has(b.dataset.tag as ProductTag))))
    $$('[data-moment]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.moment === state.moment)))
    wrap.classList.toggle('has-value', input.value.length > 0)
    const filtered = state.cat !== 'tout' || state.q || state.tags.size || state.moment
    resetBtns.forEach((b) => ((b as HTMLElement).hidden = b.classList.contains('btn') ? false : !filtered))
    countEl.textContent = shown === 0 ? 'Aucun produit' : `${shown} produit${shown > 1 ? 's' : ''}`
    empty.hidden = shown !== 0
    grid.hidden = shown === 0
    intro.textContent = state.cat !== 'tout' ? CATEGORIES.find((c) => c.id === state.cat)!.intro : ''
    intro.hidden = state.cat === 'tout'
    if (flipState) {
      Flip.from(flipState, {
        duration: 0.6,
        ease: 'expo.out',
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.94, duration: 0.25, ease: 'power2.in' }),
      })
    }
    const url = new URL(location.href)
    state.cat !== 'tout' ? url.searchParams.set('cat', state.cat) : url.searchParams.delete('cat')
    state.q ? url.searchParams.set('q', state.q) : url.searchParams.delete('q')
    history.replaceState(null, '', url)
  }

  $$('[data-cat]').forEach((b) =>
    b.addEventListener('click', () => {
      state.cat = b.dataset.cat as State['cat']
      apply(true)
    }),
  )
  $$('[data-tag]').forEach((b) =>
    b.addEventListener('click', () => {
      const t = b.dataset.tag as ProductTag
      state.tags.has(t) ? state.tags.delete(t) : state.tags.add(t)
      apply(true)
    }),
  )
  $$('[data-moment]').forEach((b) =>
    b.addEventListener('click', () => {
      const m = b.dataset.moment as Moment
      state.moment = state.moment === m ? null : m
      apply(true)
    }),
  )
  let timer = 0
  input.addEventListener('input', () => {
    window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      state.q = input.value.trim()
      apply(true)
    }, 140)
  })
  $('.search-clear')!.addEventListener('click', () => {
    input.value = ''
    state.q = ''
    apply(true)
    input.focus()
  })
  resetBtns.forEach((b) =>
    b.addEventListener('click', () => {
      state.cat = 'tout'
      state.q = ''
      state.tags.clear()
      state.moment = null
      input.value = ''
      apply(true)
    }),
  )
  apply(false)
  if (motionOn()) {
    const first = cards.filter((c) => !c.hidden).slice(0, 12)
    gsap.from(first, { opacity: 0, y: 32, duration: 0.9, ease: 'expo.out', stagger: 0.05, delay: 0.25, clearProps: 'all' })
  }
}

boot({ nav: 'boutique', main, init })

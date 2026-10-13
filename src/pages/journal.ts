import { boot } from '../core/boot'
import { $, $$, fold, html, reducedMotion } from '../core/dom'
import { icon } from '../core/icons'
import { newsCard, pageHero } from '../core/components'
import { Flip, gsap, motionOn } from '../core/motion'
import { NEWS_CATEGORIES, sortedNews, type NewsCategory } from '../data'

const posts = sortedNews()
let cat: NewsCategory | 'tout' = 'tout'
let q = ''

function main(): string {
  const count = (c: NewsCategory | 'tout') => (c === 'tout' ? posts.length : posts.filter((p) => p.category === c).length)
  return html`
    ${pageHero({ eyebrow: 'Le journal', title: 'Actualités et coulisses.', lead: 'Ce qui se passe à la boulangerie, du four au quartier. Les faits sont ceux de la maison; la rédaction des articles est un exemple.' })}
    <section class="section section--tight journal" aria-label="Articles">
      <div class="wrap">
        <div class="filters">
          <div class="input-wrap">
            ${icon('search')}
            <label class="sr-only" for="jq">Rechercher un article</label>
            <input class="input" id="jq" type="search" inputmode="search" enterkeyhint="search" autocomplete="off" placeholder="Rechercher un article" />
            <button class="search-clear" type="button" aria-label="Effacer la recherche">${icon('x')}</button>
          </div>
          <div class="scroller cats" role="group" aria-label="Rubriques">
            ${['tout' as const, ...NEWS_CATEGORIES].map(
              (c) => html`<button class="chip" type="button" data-jcat="${c}" aria-pressed="${String(c === 'tout')}">${c === 'tout' ? 'Tout' : c}<span class="count">${count(c)}</span></button>`,
            )}
          </div>
        </div>
        <p class="result-count mono" role="status" aria-live="polite" data-jcount></p>
        <div class="news-grid" data-news>
          ${posts.map((p, i) => newsCard(p, i === 0).replace('<a class="news-card', `<a data-flip-id="${p.slug}" class="news-card`))}
        </div>
        <div class="empty" data-jempty hidden>
          <h2>Aucun article ne correspond.</h2>
          <p class="muted">Essayez un autre mot, ou une autre rubrique.</p>
          <button class="btn btn--ghost btn--noicon" type="button" data-jreset>Tout afficher</button>
        </div>
      </div>
    </section>`
}

function init() {
  const cards = $$<HTMLElement>('[data-news] .news-card')
  const input = $<HTMLInputElement>('#jq')!
  const count = $('[data-jcount]')!
  const empty = $('[data-jempty]')!
  const grid = $('[data-news]')!
  const wrap = input.closest('.input-wrap')!

  const apply = (animate: boolean) => {
    const st = animate && motionOn() && !reducedMotion() ? Flip.getState(cards) : null
    let n = 0
    cards.forEach((el) => {
      const p = posts.find((x) => el.dataset.flipId === x.slug)!
      const ok = (cat === 'tout' || p.category === cat) && (!q || fold(`${p.title} ${p.excerpt}`).includes(fold(q)))
      el.hidden = !ok
      el.classList.toggle('news-card--big', ok && n === 0 && cat === 'tout' && !q)
      if (ok) n++
    })
    $$('[data-jcat]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.jcat === cat)))
    wrap.classList.toggle('has-value', input.value.length > 0)
    count.textContent = n === 0 ? 'Aucun article' : `${n} article${n > 1 ? 's' : ''}`
    empty.hidden = n !== 0
    grid.hidden = n === 0
    if (st)
      Flip.from(st, {
        duration: 0.6,
        ease: 'expo.out',
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }),
        onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.2 }),
      })
  }

  $$('[data-jcat]').forEach((b) =>
    b.addEventListener('click', () => {
      cat = b.dataset.jcat as typeof cat
      apply(true)
    }),
  )
  let t = 0
  input.addEventListener('input', () => {
    window.clearTimeout(t)
    t = window.setTimeout(() => {
      q = input.value.trim()
      apply(true)
    }, 140)
  })
  $('.search-clear')!.addEventListener('click', () => {
    input.value = ''
    q = ''
    apply(true)
    input.focus()
  })
  $('[data-jreset]')!.addEventListener('click', () => {
    cat = 'tout'
    q = ''
    input.value = ''
    apply(true)
  })
  apply(false)
  if (motionOn()) gsap.from(cards.slice(0, 8), { opacity: 0, y: 28, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.25, clearProps: 'all' })
}

boot({ nav: 'journal', main, init })

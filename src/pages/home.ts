import { boot } from '../core/boot'
import { $, $$, eur, href, html, rng } from '../core/dom'
import { icon } from '../core/icons'
import { flanWedge, heroCroissant, tourageStack } from '../core/art'
import { arrowLink, hoursTable, marquee, photoFigure, photoImg, productCard, quote, sectionHead, statusPill } from '../core/components'
import { gsap, motionOn, ScrollTrigger } from '../core/motion'
import {
  AWARDS,
  BUSINESS,
  FLAN_PRICE,
  PHOTO_NOTE,
  PHOTOS,
  photoBySlug,
  PRESS,
  RATING,
  SOCIALS,
  TESTIMONIALS,
  TRANSPORT,
  currentSeason,
  flanById,
  productById,
  seasonById,
  stat,
  voice,
} from '../data'

const pick = (ids: string[]) => ids.map((id) => productById(id)!).filter(Boolean)

function stars(): string {
  const r = rng(404)
  let s = ''
  for (let i = 0; i < 70; i++) s += `<circle cx="${(r() * 1000).toFixed(0)}" cy="${(r() * 520).toFixed(0)}" r="${(0.6 + r() * 1.3).toFixed(1)}" opacity="${(0.25 + r() * 0.6).toFixed(2)}"/>`
  return `<svg class="hero-stars" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" fill="#F5F6F3">${s}</svg>`
}

function hero(): string {
  const [first, ...rest] = voice('aube').split('. ')
  const st = (i: number) => `style="--i:${i}"`
  return html`
    <section class="hero on-night" data-hero aria-labelledby="hero-title">
      <div class="hero-pin" data-hero-pin>
        <div class="hero-sky" aria-hidden="true"></div>
        ${stars()}
        <div class="hero-glow" aria-hidden="true"></div>
        <div class="hero-layers" aria-hidden="true">${Array.from({ length: 27 }, (_, i) => `<i ${st(i)}></i>`).join('')}</div>
        <div class="hero-day" data-hero-day aria-hidden="true"></div>
        <div class="hero-door" aria-hidden="true"></div>
        <div class="wrap hero-inner">
          <p class="hero-clock mono"><span class="hero-time" data-clock>06:30</span><span class="hero-where">Rennes, rue de Saint-Malo</span></p>
          <h1 id="hero-title" class="hero-title">${first}.</h1>
          <p class="hero-sub">${rest.join('. ')}</p>
          <div class="hero-cta">
            <a class="btn" href="tel:${BUSINESS.phone}" data-salt>Appeler la boutique<span class="btn-ico">${icon('phone')}</span></a>
            <a class="btn btn--ghost" href="${href('bar-a-flans/')}">Les parfums du jour<span class="btn-ico">${icon('arrow-right')}</span></a>
          </div>
          ${statusPill()}
        </div>
        <div class="hero-art" aria-hidden="true">${heroCroissant()}</div>
        <p class="hero-caption mono" data-hero-caption>6 h 30. La porte s’ouvre.</p>
        <p class="hero-scroll mono" aria-hidden="true">Défiler<span class="hero-scroll-line"></span></p>
      </div>
    </section>`
}

function manifest(): string {
  const s15 = stat('15h')
  const s7 = stat('7parfums')
  return html`
    <section class="section manifest">
      <div class="wrap">
        <p class="manifest-text" data-scrub-words>${voice('pain')}</p>
        <div class="manifest-grid">
          <p class="lead" data-reveal>${voice('pain-suite')}</p>
          <p class="lead" data-reveal>${BUSINESS.concept}</p>
        </div>
        <ul class="pillars">
          <li class="pillar" data-reveal>
            <p class="pillar-num"><span data-count="${s15.numeric}">${s15.value}</span><small>${s15.unit}</small></p>
            <h3>Le pain</h3>
            <p class="muted">${s15.detail}, quinze heures de fermentation pour nos pains bio.</p>
            <a class="link" href="${href('boutique/?cat=pains')}">Les pains bio</a>
          </li>
          <li class="pillar" data-reveal>
            <p class="pillar-num"><span data-count="${s7.numeric}">${s7.value}</span></p>
            <h3>Les flans</h3>
            <p class="muted">Sept parfums par jour, sur une base de pâte à croissant précuite. Ils changent avec les saisons.</p>
            <a class="link" href="${href('bar-a-flans/')}">Le bar à flans</a>
          </li>
          <li class="pillar" data-reveal>
            <p class="pillar-num">${FLAN_PRICE.toFixed(2).replace('.', ',')}<small>€</small></p>
            <h3>La part</h3>
            <p class="muted">Le prix d’une part de flan, repéré par l’office de tourisme de Rennes en septembre 2026.</p>
            <a class="link" href="${href('faq/')}">Questions fréquentes</a>
          </li>
        </ul>
      </div>
    </section>`
}

function photoBand(): string {
  const [a, b, c] = ['croissants-sortie-four', 'deux-croissants', 'pains-graines-ble'].map((slug) => photoBySlug(slug)!)
  return html`
    <section class="section section--tight photo-band" aria-label="Le fournil en images">
      <div class="wrap photo-band-grid">
        ${photoFigure(a, 'photo-band-a', 'clip')}
        ${photoFigure(b, 'photo-band-b')}
        ${photoFigure(c, 'photo-band-c')}
      </div>
    </section>`
}

function photoStrip(): string {
  const picks = PHOTOS.filter((_, i) => i % 3 === 1).slice(0, 10)
  return html`
    <section class="section section--line photo-strip" aria-labelledby="strip-title">
      <div class="wrap">
        <div class="section-head">
          <p class="eyebrow" data-reveal="fade">En images</p>
          <h2 id="strip-title" data-split>Du fournil à la vitrine.</h2>
          <p class="lead" data-reveal>Feuilletage, mie, croûte: l’ambiance d’une boulangerie au petit matin. ${PHOTO_NOTE}s, pas des photos de la boutique.</p>
        </div>
        <ul class="photo-strip-grid">
          ${picks.map((ph) => html`<li data-reveal>${photoImg(ph, 'ph-img', true)}</li>`)}
        </ul>
        <p data-reveal style="margin-top:24px">${arrowLink('Toute la galerie', href('galerie/'), 'btn--ghost')}</p>
      </div>
    </section>`
}

function tourage(): string {
  const steps = [
    { n: '01', title: 'Le beurre dans la pâte', text: 'On enferme le beurre AOP Charentes-Poitou dans la détrempe. Trois épaisseurs, déjà.', stack: 3, seed: 5 },
    { n: '02', title: 'On plie, on étire', text: 'Un tour, puis un autre. À chaque pli, le beurre et la pâte se superposent un peu plus finement.', stack: 9, seed: 6 },
    { n: '03', title: 'Des feuillets par dizaines', text: 'C’est la vapeur du beurre, au four, qui soulève chaque feuillet et dessine l’alvéolage.', stack: 27, seed: 7 },
  ]
  return html`
    <section class="tourage on-night" data-tourage aria-labelledby="tourage-title">
      <div class="tourage-pin" data-tourage-pin>
        <div class="wrap tourage-grid">
          <div class="tourage-copy">
            <p class="eyebrow">Le tourage</p>
            <h2 id="tourage-title" data-split>Le beurre se plie dans la pâte, tour après tour.</h2>
            <ol class="tourage-steps">
              ${steps.map(
                (s, i) => html`
                  <li class="step${i === 0 ? ' is-active' : ''}" data-step="${i}">
                    <span class="mono step-n">${s.n}</span>
                    <div>
                      <h3>${s.title}</h3>
                      <p class="muted">${s.text}</p>
                      <svg class="step-art" viewBox="0 0 420 260" aria-hidden="true" focusable="false">${tourageStack(s.stack, s.seed)}</svg>
                    </div>
                  </li>`,
              )}
            </ol>
            <p class="fine muted">Illustration: les nombres de couches sont indicatifs, ce n’est pas la recette de la maison.</p>
          </div>
          <div class="tourage-visual" aria-hidden="true">
            <svg viewBox="-10 -10 440 280" focusable="false">
              ${steps.map((s, i) => `<g class="stack-wrap" data-stack="${i}">${tourageStack(s.stack, s.seed)}</g>`).join('')}
            </svg>
            <p class="tourage-count mono"><span data-layers>3</span> couches</p>
          </div>
        </div>
      </div>
    </section>`
}

function flansTeaser(): string {
  const board = seasonById(currentSeason()).board.map(flanById)
  return html`
    <section class="section flans-teaser" data-hpan aria-labelledby="flans-title">
      <div class="hpan-pin" data-hpan-pin>
        <div class="wrap">
          <div class="section-head">
            <p class="eyebrow" data-reveal="fade">Le bar à flans</p>
            <h2 id="flans-title" data-split>Sept parfums par jour, ${eur(FLAN_PRICE)} la part.</h2>
            <p class="lead" data-reveal>Une base de pâte à croissant précuite, une crème à la vanille de Madagascar, et une pincée de fleur de sel. ${voice('framboise')} C’est le framboise.</p>
          </div>
        </div>
        <div class="hpan-viewport" data-hpan-viewport>
          <ul class="hpan-track" data-hpan-track>
            ${board.map(
              (f) => html`
                <li class="flan-card">
                  <div class="flan-card-art" style="--flan:${f.color}">${flanWedge(f)}</div>
                  <h3>${f.name}</h3>
                  <p class="muted">${f.short}</p>
                  <p class="price">${eur(f.pricePerSlice)}</p>
                  ${f.bestSeller ? '<span class="badge badge--gold">Le plus plébiscité</span>' : f.limited ? '<span class="badge badge--gold">Édition limitée</span>' : ''}
                </li>`,
            )}
            <li class="flan-card flan-card--cta">
              <p class="display">Faites tourner le disque.</p>
              ${arrowLink('Ouvrir le bar à flans', href('bar-a-flans/'))}
              <p class="fine muted">Composition d’exemple. Les parfums du jour sont publiés sur Instagram.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>`
}

function titres(): string {
  return html`
    <section class="section section--line titres">
      <div class="wrap">
        ${sectionHead('Deux croissants, deux titres', 'Un titre de France, un titre de Bretagne.', 'Le chef tourier et le boulanger ont chacun un titre au croissant au beurre. Et en 2026, la maison monte sur la deuxième marche du Master régional du Meilleur Pain au Chocolat.')}
        <ol class="award-list">
          ${AWARDS.map(
            (a) => html`
              <li class="award" data-reveal>
                <p class="award-year mono"><span data-count="${a.year}" data-from="${a.year - 40}">${a.year}</span></p>
                <div>
                  <h3>${a.title}</h3>
                  <p class="award-who">${a.who}</p>
                  <p class="muted">${a.detail}</p>
                </div>
              </li>`,
          )}
        </ol>
      </div>
    </section>`
}

function pain(): string {
  const items = pick(['tourte-de-seigle', 'bara', 'pain-complet', 'pain-t80-graines'])
  return html`
    <section class="section pain">
      <div class="wrap">
        <div class="pain-grid">
          <div class="pain-copy">
            <p class="eyebrow" data-reveal="fade">Le pain bio au levain</p>
            <h2 data-split>Quinze heures pour un pain.</h2>
            <p class="lead" data-reveal>Des pains de 600 à 700 g, au levain naturel et aux farines biologiques. Le bara, notre pain de la maison, mêle T80, blé noir et sel de Guérande.</p>
            <p class="muted" data-reveal>${BUSINESS.organic.label}. ${BUSINESS.organic.scope}</p>
            <p data-reveal>${arrowLink('Voir tous les pains', href('boutique/?cat=pains'), 'btn--ghost')}</p>
          </div>
          <div class="pain-cards">${items.map(productCard)}</div>
        </div>
      </div>
    </section>`
}

function snacking(): string {
  const items = pick(['hot-dog-croissant', 'croissant-burger', 'burg-oeuf', 'brioche-suisse-poireaux'])
  return html`
    <section class="section section--line snacking">
      <div class="wrap">
        ${sectionHead('Snacking feuilleté', 'La pâte à croissant passe au salé.', 'Hot dog, burger, Burg’œuf: ici le snacking n’est pas un produit secondaire. Réchauffé au four pour vous.')}
        <div class="card-grid">${items.map(productCard)}</div>
        <p class="fine muted" style="margin-top:20px">* Prix d’exemple. Le catalogue est une démonstration.</p>
      </div>
    </section>`
}

function avis(): string {
  const pickQ = ['q01', 'q08', 'q12'].map((id) => TESTIMONIALS.find((t) => t.id === id)!)
  return html`
    <section class="section avis">
      ${marquee()}
      <div class="wrap">
        <p class="rating mono" data-reveal="fade">${RATING.display} · octobre 2026</p>
        <div class="quote-grid">${pickQ.map((t) => quote(t))}</div>
      </div>
    </section>`
}

function presse(): string {
  return html`
    <section class="section section--tight section--line presse">
      <div class="wrap">
        <p class="eyebrow" data-reveal="fade">On en parle</p>
        <ul class="press-list">
          ${PRESS.map(
            (p) => html`<li data-reveal><a class="press-link" href="${p.url}" target="_blank" rel="noopener noreferrer"><span class="press-outlet">${p.outlet}</span><span class="press-date mono">${p.dateLabel}</span>${icon('arrow-up-right')}</a></li>`,
          )}
        </ul>
      </div>
    </section>`
}

function horaires(): string {
  return html`
    <section class="section section--line board" aria-labelledby="board-title">
      <div class="wrap board-grid">
        <div>
          <p class="eyebrow" data-reveal="fade">Horaires et accès</p>
          <h2 id="board-title" data-split>Entre le canal et l’angle.</h2>
          <p class="lead" data-reveal>${BUSINESS.address.street}, ${BUSINESS.address.postalCode} ${BUSINESS.address.city}, ${BUSINESS.address.corner}. À emporter uniquement.</p>
          <div class="board-actions" data-reveal>
            <a class="btn" href="tel:${BUSINESS.phone}" data-salt>${BUSINESS.phoneDisplay}<span class="btn-ico">${icon('phone')}</span></a>
            <a class="btn btn--ghost" href="${BUSINESS.links.maps}" target="_blank" rel="noopener noreferrer">Itinéraire<span class="btn-ico">${icon('map-pin')}</span></a>
          </div>
          <ul class="transport" data-reveal>
            ${TRANSPORT.map((t) => html`<li>${icon(t.mode === 'metro' ? 'train' : 'bus')}<span><strong>${t.label}</strong>, ${t.lines} <span class="muted mono">à environ&nbsp;${t.approxMeters}&nbsp;m</span></span></li>`)}
          </ul>
        </div>
        <div class="board-card" data-reveal>
          ${statusPill()}
          ${hoursTable()}
          <p class="fine muted">Fermé les jours fériés (à confirmer auprès de la boutique).</p>
        </div>
      </div>
    </section>`
}

function instagram(): string {
  const ig = SOCIALS.find((s) => s.id === 'instagram')!
  return html`
    <section class="section on-night insta">
      <div class="wrap insta-inner">
        <p class="insta-big" data-split>Les parfums du jour se disent d’abord sur Instagram.</p>
        <a class="btn btn--night" href="${ig.url}" target="_blank" rel="noopener noreferrer" data-salt>${ig.handle}<span class="btn-ico">${icon('instagram')}</span></a>
      </div>
    </section>`
}

// ---------------------------------------------------------------------------------------------
// Mouvement
// ---------------------------------------------------------------------------------------------
function setTone(tone: 'night' | 'day') {
  const h = $('.site-header')
  if (h && h.dataset.tone !== tone) h.dataset.tone = tone
}

function initHero() {
  const hero = $('[data-hero]')
  const pin = $('[data-hero-pin]')
  if (!hero || !pin || !motionOn()) return
  const clock = $('[data-clock]')!
  const state = { t: 60 }
  const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(Math.round(m % 60)).padStart(2, '0')}`

  const mm = gsap.matchMedia()
  mm.add(
    { desk: '(min-width: 900px) and (hover: hover) and (pointer: fine)', other: '(max-width: 899px), (hover: none), (pointer: coarse)' },
    (ctx) => {
      const desk = !!ctx.conditions?.desk
      clock.textContent = fmt(60)
      const tl = gsap.timeline({
        paused: desk,
        defaults: { ease: 'none' },
        delay: desk ? 0 : 0.15,
        onUpdate() {
          const day = tl.progress() > 0.72
          pin.classList.toggle('is-day', day)
          setTone(day ? 'day' : 'night')
        },
      })
      tl.fromTo('.hero-layers i', { scaleX: 0 }, { scaleX: 1, duration: 3, stagger: { each: 0.07, from: 'center' } }, 0)
        .fromTo('.hero-croissant .draw', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 4.2, stagger: 0.35, ease: 'power1.inOut' }, 0.3)
        .fromTo('.hero-croissant', { '--fo': 0 }, { '--fo': 0.16, duration: 2.5 }, 5)
        .fromTo('.hero-glow', { opacity: 0 }, { opacity: 1, duration: 5 }, 3)
        .to('.hero-stars', { opacity: 0, duration: 4 }, 4)
        .fromTo('.hero-door', { scaleY: 0, opacity: 1 }, { scaleY: 1, duration: 1.4 }, 5.4)
        .fromTo('.hero-day', { clipPath: 'inset(0% 50% 0% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 2.6, ease: 'power2.inOut' }, 7)
        .to('.hero-door', { opacity: 0, duration: 1 }, 8.6)
        .to('.hero-layers', { opacity: 0.35, duration: 2 }, 7.5)
        .fromTo('.hero-caption', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, 8.8)
        .to(state, { t: 390, duration: 10, onUpdate: () => (clock.textContent = fmt(state.t)) }, 0)

      if (desk) {
        ScrollTrigger.create({ trigger: hero, start: 'top top', end: '+=260%', pin, scrub: 0.7, animation: tl, anticipatePin: 1 })
        // Le défilement rend la main à l'en-tête clair une fois le héros dépassé.
      } else {
        tl.duration(2.8)
      }
      return () => {
        tl.kill()
      }
    },
  )
}

function initTourage() {
  const root = $('[data-tourage]')
  const pin = $('[data-tourage-pin]')
  if (!root || !pin || !motionOn()) return
  const mm = gsap.matchMedia()
  // Téléphones et tablettes tactiles: pas d'épinglage, chaque pile de feuillets se déplie à l'entrée dans l'écran.
  mm.add('(max-width: 899px), (hover: none), (pointer: coarse)', () => {
    $$('.step', root).forEach((s) => s.classList.add('is-active'))
    $$('.step-art', root).forEach((art) => {
      gsap.fromTo(
        art,
        { scaleY: 0.4, opacity: 0, transformOrigin: '50% 100%' },
        { scaleY: 1, opacity: 1, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: art, start: 'top 90%', once: true } },
      )
    })
  })
  mm.add('(min-width: 900px) and (hover: hover) and (pointer: fine)', () => {
    const stacks = $$('[data-stack]', root)
    const steps = $$('.step', root)
    const label = $('[data-layers]', root)!
    const counts = [3, 9, 27]
    gsap.set(stacks, { opacity: 0, scale: 0.94, transformOrigin: '50% 50%' })
    gsap.set(stacks[0], { opacity: 1, scale: 1 })
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
    tl.to(stacks[0], { opacity: 0, scale: 1.05, duration: 1 }, 1)
      .to(stacks[1], { opacity: 1, scale: 1, duration: 1 }, 1.05)
      .to(stacks[1], { opacity: 0, scale: 1.05, duration: 1 }, 3)
      .to(stacks[2], { opacity: 1, scale: 1, duration: 1 }, 3.05)
      .to({}, { duration: 1 }, 4)
    let last = -1
    ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: '+=220%',
      pin,
      scrub: 0.6,
      animation: tl,
      anticipatePin: 1,
      onUpdate(self) {
        const i = self.progress < 0.3 ? 0 : self.progress < 0.68 ? 1 : 2
        if (i === last) return
        last = i
        steps.forEach((s, k) => s.classList.toggle('is-active', k === i))
        label.textContent = String(counts[i])
      },
    })
    return () => {
      steps.forEach((s, k) => s.classList.toggle('is-active', k === 0))
    }
  })
}

function initHpan() {
  const root = $('[data-hpan]')
  if (!root || !motionOn()) return
  const pin = $('[data-hpan-pin]', root)!
  const viewport = $('[data-hpan-viewport]', root)!
  const track = $('[data-hpan-track]', root)!
  gsap.matchMedia().add('(min-width: 900px) and (hover: hover) and (pointer: fine)', () => {
    viewport.classList.add('is-pinned')
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 64)
    gsap.to(track, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: () => `+=${dist() + 200}`, pin, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
    })
    return () => viewport.classList.remove('is-pinned')
  })
}

boot({
  tone: document.documentElement.classList.contains('js-motion') ? 'night' : 'day',
  main: () => html`${hero()}${manifest()}${photoBand()}${tourage()}${flansTeaser()}${titres()}${pain()}${snacking()}${avis()}${presse()}${horaires()}${photoStrip()}${instagram()}`,
  init() {
    initHero()
    initTourage()
    initHpan()
  },
})


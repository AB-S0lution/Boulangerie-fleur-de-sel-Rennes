import { boot } from '../core/boot'
import { $, $$, clamp, eur, href, html, setHTML } from '../core/dom'
import { icon } from '../core/icons'
import { flanBaseSection, flanDisc, flanSlice, flanWedge } from '../core/art'
import { arrowLink, pageHero, photoBand, sectionHead } from '../core/components'
import { gsap, motionOn } from '../core/motion'
import {
  BUSINESS,
  CONFIRMATION_LABEL,
  FLANS,
  FLAN_PRICE,
  FLAN_SLICES_PER_WHOLE,
  LIMITED_EDITIONS,
  PRESS,
  SEASONS,
  SOCIALS,
  currentSeason,
  flanById,
  seasonById,
  voice,
  type Flan,
  type SeasonId,
} from '../data'

let season: SeasonId = currentSeason()
const boardOf = (s: SeasonId): Flan[] => seasonById(s).board.map(flanById)

const wedgeCard = (f: Flan) => html`
  <li class="flan-card">
    <div class="flan-card-art" style="--flan:${f.color}">${flanWedge(f)}</div>
    <h3>${f.name}</h3>
    <p class="muted">${f.short}</p>
    <p class="price">${eur(f.pricePerSlice)}</p>
    ${f.bestSeller ? '<span class="badge badge--gold">Le plus plébiscité</span>' : f.limited ? '<span class="badge badge--gold">Édition limitée</span>' : ''}
  </li>`

function stage(): string {
  const board = boardOf(season)
  return html`
    <section class="flan-stage" data-stage aria-label="Le disque de flan">
      <div class="wrap flan-stage-grid">
        <div class="disc-col">
          <div class="disc" data-disc role="group" aria-roledescription="disque" aria-label="Disque de flan à six parts. Flèches gauche et droite pour tourner." tabindex="0">
            <span class="disc-ring" aria-hidden="true"></span>
            ${flanDisc(board.slice(0, 6))}
            <span class="disc-marker" aria-hidden="true"></span>
          </div>
          <div class="disc-controls">
            <button class="round-btn" type="button" data-prev aria-label="Part précédente">${icon('caret-left')}</button>
            <p class="disc-hint mono" aria-hidden="true">Glissez pour tourner</p>
            <button class="round-btn" type="button" data-next aria-label="Part suivante">${icon('caret-right')}</button>
          </div>
        </div>
        <div class="info-col">
          <div class="season-toggle" role="group" aria-label="Saison">
            ${SEASONS.map((s) => html`<button class="chip" type="button" data-season="${s.id}" aria-pressed="${String(s.id === season)}">${s.label}</button>`)}
          </div>
          <p class="fine muted season-note" data-season-note></p>
          <article class="flan-tag" data-panel aria-live="polite" aria-atomic="true">
            <p class="mono flan-tag-top"><span data-flan-price></span><span class="flan-tag-badges" data-flan-badges></span></p>
            <h2 class="flan-name" data-flan-name></h2>
            <p class="flan-desc" data-flan-desc></p>
            <p class="fine muted" data-flan-source></p>
          </article>
          <div class="board-chips" role="group" aria-label="Les sept parfums du jour" data-chips></div>
          <p class="fine muted">Composition d’exemple: les parfums du jour sont publiés par la boutique sur Instagram.</p>
        </div>
      </div>
      <div class="wrap">
        <ul class="flan-grid" data-flan-grid>${board.map(wedgeCard)}</ul>
      </div>
    </section>`
}

function howItsMade(): string {
  const f = flanById('vanille')
  return html`
    <section class="section made">
      <div class="wrap made-grid">
        <div>
          ${sectionHead('Comment c’est fait', 'Un flan qui a du feuilletage.', 'Ici, le flan ne repose pas sur une pâte brisée. Il s’appuie sur de la pâte à croissant, et ça change tout.')}
          <ol class="made-steps">
            <li data-reveal><h3>La base</h3><p class="muted">Une pâte à croissant feuilletée sert de fond. Elle est précuite pour rester croustillante sous la crème.</p></li>
            <li data-reveal><h3>La crème</h3><p class="muted">Une crème à la vanille de Madagascar, que le parfum du jour vient colorer.</p></li>
            <li data-reveal><h3>Le sel</h3><p class="muted">Une pincée de fleur de sel, comme dans tout ce qui sort de chez nous.</p></li>
          </ol>
        </div>
        <figure class="made-art" data-reveal="clip">
          ${flanBaseSection(f)}
          <figcaption class="fine muted">Coupe schématique d’une part. Illustration originale.</figcaption>
        </figure>
      </div>
    </section>`
}

function whole(): string {
  const six = boardOf(season).slice(0, 6)
  return html`
    <section class="section section--line whole">
      <div class="wrap whole-grid">
        <div class="whole-art" aria-hidden="true">${flanDisc(six).replace('class="flan-disc-svg"', 'class="flan-disc-svg flan-disc-static"')}</div>
        <div>
          ${sectionHead('Le flan entier', `Un flan, ${FLAN_SLICES_PER_WHOLE} parts.`, `Une part coûte ${eur(FLAN_PRICE)}. Pour partager un flan entier, le plus simple est de téléphoner à la boutique pour demander s’il est disponible.`)}
          <p data-reveal>${arrowLink('Appeler la boutique', `tel:${BUSINESS.phone}`)}</p>
          <p class="fine muted" data-reveal style="margin-top:16px">Pas de commande en ligne dans cette démonstration. <a class="link" href="${href('faq/')}">Voir la FAQ</a>.</p>
        </div>
      </div>
    </section>`
}

function seasons(): string {
  const now = currentSeason()
  return html`
    <section class="section section--line seasons">
      <div class="wrap">
        ${sectionHead('Le calendrier', 'Les parfums suivent les saisons.', 'Sept parfums chaque jour, qui changent avec les saisons. Voici une composition d’exemple pour l’année.')}
        <div class="season-grid">
          ${SEASONS.map(
            (s) => html`
              <article class="season-card${s.id === now ? ' is-now' : ''}" data-reveal>
                <p class="mono">${s.months}</p>
                <h3>${s.label}${s.id === now ? ' <span class="badge badge--solid">En ce moment</span>' : ''}</h3>
                <p class="muted">${s.note}</p>
                <ul class="swatch-list">${s.board.map((id) => `<li style="--swatch:${flanById(id).color}"><span class="sw"></span>${flanById(id).short}</li>`).join('')}</ul>
              </article>`,
          )}
        </div>
      </div>
    </section>`
}

function editions(): string {
  return html`
    <section class="section on-night editions">
      <div class="wrap">
        ${sectionHead('Éditions limitées', 'Le flan que vous ne reverrez peut-être pas.', 'Des collaborations, un concours en commentaires, une envie d’automne. À emporter chez nous, à savourer avant qu’il ne disparaisse.')}
        <ol class="edition-list">
          ${LIMITED_EDITIONS.map((e) => {
            const f = flanById(e.flanId)
            return html`
              <li class="edition" data-reveal>
                <div class="edition-art" style="--flan:${f.color}">${flanWedge(f)}</div>
                <div>
                  <p class="mono edition-date">${e.dateLabel}</p>
                  <h3>${e.name}</h3>
                  <p class="badges"><span class="badge badge--gold">Édition limitée</span><span class="badge">${e.origin === 'collab' ? 'Collaboration' : e.origin === 'communauté' ? 'Idée de la communauté' : 'Idée de l’équipe'}</span></p>
                  ${e.partner ? `<p class="fine muted">Avec ${e.partner}</p>` : ''}
                  <p class="muted">${e.story}</p>
                </div>
              </li>`
          })}
        </ol>
      </div>
    </section>`
}

function allFlavours(): string {
  return html`
    <section class="section all-flavours">
      <div class="wrap">
        ${sectionHead('Tous les parfums', `Vingt-trois parfums, sept à la fois.`, 'Ceux que la maison a servis ou annoncés, et quelques exemples de rotation. Chacun est marqué de la façon dont nous savons qu’il existe.')}
        <ul class="flavour-grid">
          ${FLANS.map(
            (f) => html`<li class="flavour" data-reveal><span class="flavour-wedge" style="--flan:${f.color}">${flanWedge(f)}</span><div><h3>${f.name}</h3><p class="fine muted">${CONFIRMATION_LABEL[f.confirmedBy]}${f.limited ? ' · édition limitée' : ''}</p></div></li>`,
          )}
        </ul>
      </div>
    </section>`
}

function nextFlan(): string {
  const ig = SOCIALS.find((s) => s.id === 'instagram')!
  const miam = PRESS.find((p) => p.excerpt?.includes('miam'))
  return html`
    <section class="section section--line next-flan">
      <div class="wrap next-grid">
        <div class="next-card" data-reveal>
          <p class="eyebrow">Imaginez le prochain flan</p>
          <h2>Le flan de la communauté est né d’un commentaire.</h2>
          <p class="muted">Pistache-framboise est sorti des idées laissées sous une publication de la boutique. Le prochain peut être le vôtre. Il n’y a pas de formulaire ici: ça se passe en commentaire sur Instagram.</p>
          <p>${arrowLink(ig.handle, ig.url, 'btn--ghost')}</p>
        </div>
        ${
          miam
            ? html`<figure class="quote quote--big" data-reveal>
                <blockquote>${miam.excerpt}</blockquote>
                <figcaption><span class="mono">${miam.outlet}</span> · ${miam.dateLabel}</figcaption>
              </figure>`
            : ''
        }
      </div>
    </section>`
}

// ---------------------------------------------------------------------------------------------
// Le disque
// ---------------------------------------------------------------------------------------------
const STEP = 360 / 6
const norm = (a: number) => ((((a + 180) % 360) + 360) % 360) - 180 // [-180, 180)

function initDisc() {
  const disc = $('[data-disc]')
  const stageEl = $('[data-stage]')
  if (!disc || !stageEl || !motionOn()) return
  const panel = $('[data-panel]')!
  const chipsEl = $('[data-chips]')!
  const grid = $('[data-flan-grid]')!
  const noteEl = $('[data-season-note]')!
  const svg = $<SVGSVGElement>('.flan-disc-svg', disc)!
  const rotor = $<SVGGElement>('.disc-rotor', disc)!
  const live = motionOn()

  let board = boardOf(season)
  let slots: Flan[] = board.slice(0, 6)
  let rot = 0
  let front = 0
  const proxy = { rot: 0 }
  let tween: gsap.core.Tween | null = null

  const sliceEls = () => $$<SVGGElement>('.slice', rotor)

  // ---- rendu du disque
  const draw = () => {
    gsap.set(rotor, { rotation: rot, svgOrigin: '0 0' })
    let best = 0
    let bestD = 999
    sliceEls().forEach((el, i) => {
      const ang = norm(STEP * i + rot)
      const d = Math.abs(ang)
      const k = Math.max(0, 1 - d / 38)
      const e = k * k * (3 - 2 * k)
      const a = ((-90 + STEP * i) * Math.PI) / 180
      const lift = e * 20
      el.setAttribute('transform', `translate(${(Math.cos(a) * lift).toFixed(2)} ${(Math.sin(a) * lift).toFixed(2)}) scale(${(1 + 0.035 * e).toFixed(4)})`)
      el.classList.toggle('is-front', e > 0.55)
      if (d < bestD) {
        bestD = d
        best = i
      }
    })
    if (best !== front) {
      front = best
      showFront(true)
    }
  }

  const frontFlan = () => slots[front]

  // ---- panneau (étiquette de prix qui se retourne)
  const showFront = (animate: boolean) => {
    const f = frontFlan()
    const set = () => {
      $('[data-flan-name]', panel)!.textContent = f.name
      $('[data-flan-desc]', panel)!.textContent = f.description
      $('[data-flan-price]', panel)!.textContent = `${eur(f.pricePerSlice)} la part`
      setHTML(
        $('[data-flan-badges]', panel)!,
        `${f.bestSeller ? '<span class="badge badge--gold">Le plus plébiscité</span>' : ''}${f.limited ? '<span class="badge badge--gold">Édition limitée</span>' : ''}`,
      )
      $('[data-flan-source]', panel)!.textContent = CONFIRMATION_LABEL[f.confirmedBy]
      panel.style.setProperty('--flan', f.color)
    }
    set()
    disc.classList.toggle('is-limited', f.limited)
    $$('[data-chip]', chipsEl).forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.chip === f.id)))
    if (animate && live) {
      panel.getAnimations().forEach((a) => a.cancel())
      panel.animate(
        [
          { transform: 'perspective(900px) rotateX(-62deg) translateY(-10px)', opacity: 0 },
          { transform: 'perspective(900px) rotateX(0) translateY(0)', opacity: 1 },
        ],
        { duration: 420, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
      )
    }
  }

  // ---- mouvement
  const rotateTo = (target: number, duration?: number) => {
    tween?.kill()
    proxy.rot = rot
    const d = duration ?? clamp(0.55 + Math.abs(target - rot) / 420, 0.6, 1.5)
    tween = gsap.to(proxy, {
      rot: target,
      duration: d,
      ease: 'expo.out',
      onUpdate: () => {
        rot = proxy.rot
        draw()
      },
    })
  }
  const snap = (value: number) => Math.round(value / STEP) * STEP
  const goToIndex = (i: number) => {
    const base = -STEP * i
    const k = Math.round((rot - base) / 360)
    rotateTo(base + 360 * k)
  }
  const step = (dir: 1 | -1) => rotateTo(snap(rot) - dir * STEP)

  // ---- glisser (pointer events, capture, historique de vitesse)
  let dragging = false
  let moved = 0
  let lastA = 0
  let center = { x: 0, y: 0 }
  let hist: { t: number; r: number }[] = []
  const angleAt = (e: PointerEvent) => (Math.atan2(e.clientY - center.y, e.clientX - center.x) * 180) / Math.PI

  disc.addEventListener('pointerdown', (e) => {
    if (!live || (e.pointerType === 'mouse' && e.button !== 0)) return
    if (dragging) return
    tween?.kill()
    const r = svg.getBoundingClientRect()
    center = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
    dragging = true
    moved = 0
    lastA = angleAt(e)
    hist = [{ t: performance.now(), r: rot }]
    disc.setPointerCapture(e.pointerId)
    disc.classList.add('is-dragging')
  })
  disc.addEventListener('pointermove', (e) => {
    if (!dragging) return
    const a = angleAt(e)
    const d = norm(a - lastA)
    lastA = a
    moved += Math.abs(d)
    rot += d
    hist.push({ t: performance.now(), r: rot })
    if (hist.length > 8) hist.shift()
    draw()
  })
  const end = (e: PointerEvent) => {
    if (!dragging) return
    dragging = false
    disc.classList.remove('is-dragging')
    if (disc.hasPointerCapture(e.pointerId)) disc.releasePointerCapture(e.pointerId)
    if (moved < 4) {
      // simple toucher: la part touchée vient devant
      const s = (document.elementFromPoint(e.clientX, e.clientY) as Element | null)?.closest('.slice')
      if (s) goToIndex(Number((s as SVGGElement).dataset.index))
      else rotateTo(snap(rot))
      return
    }
    const last = hist[hist.length - 1]
    const first = hist.find((h) => last.t - h.t < 110) ?? hist[0]
    const dt = Math.max(16, last.t - first.t)
    const v = ((last.r - first.r) / dt) * 1000 // deg/s
    const projected = (v / 1000) * (0.99 / (1 - 0.99)) // projection de l'élan (Apple, taux 0,99)
    rotateTo(snap(rot + projected), clamp(0.7 + Math.abs(v) / 2400, 0.7, 1.6))
  }
  disc.addEventListener('pointerup', end)
  disc.addEventListener('pointercancel', end)
  disc.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') (e.preventDefault(), step(1))
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') (e.preventDefault(), step(-1))
  })
  $('[data-prev]')!.addEventListener('click', () => step(-1))
  $('[data-next]')!.addEventListener('click', () => step(1))

  // ---- pastilles du jour
  const renderChips = () => {
    setHTML(
      chipsEl,
      board
        .map((f) => `<button class="chip chip--swatch" type="button" data-chip="${f.id}" style="--swatch:${f.color}" aria-pressed="false">${f.short}</button>`)
        .join(''),
    )
    $$('[data-chip]', chipsEl).forEach((c) =>
      c.addEventListener('click', () => {
        const f = flanById(c.dataset.chip!)
        const idx = slots.findIndex((s) => s.id === f.id)
        if (idx >= 0) return goToIndex(idx)
        // le septième parfum prend la place de la part de devant
        slots[front] = f
        const old = sliceEls()[front]
        old.outerHTML = flanSlice(f, -90 + STEP * front, front)
        const fresh = sliceEls()[front]
        gsap.fromTo(fresh, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
        draw()
        showFront(true)
      }),
    )
  }

  const renderSeason = (animate: boolean) => {
    board = boardOf(season)
    slots = board.slice(0, 6)
    noteEl.textContent = `${seasonById(season).months}\u00a0: ${seasonById(season).note}`
    $$('[data-season]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.season === season)))
    setHTML(grid, board.map(wedgeCard).join(''))
    const apply = () => {
      rotor.innerHTML = slots.map((f, i) => flanSlice(f, -90 + STEP * i, i)).join('')
      renderChips()
      front = -1
      draw()
      showFront(false)
    }
    if (animate) {
      gsap
        .timeline()
        .to(svg, { opacity: 0, scale: 0.92, duration: 0.22, ease: 'power2.in', transformOrigin: '50% 50%' })
        .add(apply)
        .to(svg, { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' })
    } else apply()
  }

  $$('[data-season]').forEach((b) =>
    b.addEventListener('click', () => {
      const next = b.dataset.season as SeasonId
      if (next === season) return
      season = next
      renderSeason(live)
    }),
  )

  // départ: la première part devant, avec un petit élan d'invitation
  renderSeason(false)
  if (live) {
    rotateTo(STEP * 2, 0.01)
    gsap.delayedCall(0.5, () => rotateTo(0, 1.6))
  }
}

function initSeasonToggleStatic() {
  // Sans mouvement: la bascule de saison remplace seulement la grille des sept parfums.
  if (motionOn()) return
  const grid = $('[data-flan-grid]')!
  const noteEl = $('[data-season-note]')!
  const set = (s: SeasonId) => {
    season = s
    $$('[data-season]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.season === s)))
    setHTML(grid, boardOf(s).map(wedgeCard).join(''))
    noteEl.textContent = `${seasonById(s).months}\u00a0: ${seasonById(s).note}`
  }
  $$('[data-season]').forEach((b) => b.addEventListener('click', () => set(b.dataset.season as SeasonId)))
  set(season)
}

boot({
  nav: 'flans',
  main: () => html`
    ${pageHero({ eyebrow: 'Le bar à flans', title: 'Faites tourner le disque.', lead: `${voice('framboise')} Sept parfums par jour, ${eur(FLAN_PRICE)} la part, sur une base de pâte à croissant.` })}
    ${stage()}${howItsMade()}${photoBand(['macarons', 'tarte-fruits-rouges', 'patisserie-soucoupe'])}${whole()}${seasons()}${editions()}${allFlavours()}${nextFlan()}`,
  init() {
    initDisc()
    initSeasonToggleStatic()
  },
})

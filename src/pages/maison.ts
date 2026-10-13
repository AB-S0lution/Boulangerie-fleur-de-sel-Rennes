import { boot } from '../core/boot'
import { $, href, html } from '../core/dom'
import { galleryArt } from '../core/art'
import { arrowLink, pageHero, photoFigure, sectionHead } from '../core/components'
import { gsap, motionOn } from '../core/motion'
import { AWARDS, BUSINESS, FLANS, GALLERY, TEAM, TEAM_SIZE_NOTE, TIMELINE, photoBySlug, stat } from '../data'

const TRUST = [
  { name: 'Destination Rennes', role: 'Office de tourisme', text: 'Cite notre flan dans son guide des meilleurs flans de Rennes.' },
  { name: 'Open Blot Rennes', role: 'Partenaire', text: 'Un atelier de dégustation dans les salons VIP, en septembre 2026.' },
  { name: 'Fratelli Peruzzi', role: 'Collaboration', text: 'Supino et Ciao Bella: deux flans en édition limitée, en juillet 2026.' },
  { name: 'Crédit Agricole d’Ille-et-Vilaine', role: 'Banque', text: 'Nous présente dans sa série de publications « Nos commerçants ».' },
]

function founders(): string {
  const quotes: Record<string, string> = {
    'Baptiste Cortais': '« Un bon croissant se joue à 90 % dans le pétrin. »',
  }
  return html`
    <section class="section founders">
      <div class="wrap">
        <div class="founder-grid">
          ${BUSINESS.founders.map(
            (f, i) => html`
              <article class="founder" data-reveal>
                <p class="mono">${f.role}</p>
                <h2 class="founder-name">${f.name}</h2>
                <p class="lead">${f.line}</p>
                ${quotes[f.name] && i === 0 ? `<blockquote class="fact">${quotes[f.name]}</blockquote>` : ''}
              </article>`,
          )}
        </div>
        <ul class="award-list award-list--compact">
          ${AWARDS.map((a) => html`<li class="award" data-reveal><p class="award-year mono">${a.year}</p><div><h3>${a.title}</h3><p class="award-who">${a.who}</p></div></li>`)}
        </ul>
      </div>
    </section>`
}

function timeline(): string {
  return html`
    <section class="section section--line story">
      <div class="wrap">
        ${sectionHead('Notre histoire', 'De Saint-Grégoire au 161 rue de Saint-Malo.', 'Quelques dates repères, de 2019 à l’automne 2026.')}
        <ol class="timeline" data-timeline>
          <span class="tl-line" aria-hidden="true"><span class="tl-fill" data-tl-fill></span></span>
          ${TIMELINE.map(
            (e) => html`
              <li class="tl-item" data-reveal>
                <p class="tl-year mono">${e.year}</p>
                <div>
                  <p class="mono tl-label">${e.label}${e.status === 'annonce' ? ' <span class="badge badge--gold">Annoncée</span>' : ''}</p>
                  <h3>${e.title}</h3>
                  <p class="muted">${e.text}</p>
                </div>
              </li>`,
          )}
        </ol>
      </div>
    </section>`
}

function trust(): string {
  return html`
    <section class="section section--tight section--line trust">
      <div class="wrap">
        <p class="eyebrow" data-reveal="fade">Ils nous font confiance</p>
        <ul class="trust-list">
          ${TRUST.map((t) => html`<li data-reveal><p class="mono">${t.role}</p><h3>${t.name}</h3><p class="muted">${t.text}</p></li>`)}
        </ul>
      </div>
    </section>`
}

function team(): string {
  return html`
    <section class="section team">
      <div class="wrap">
        ${sectionHead('L’équipe', 'Une maison de métiers.', `${TEAM_SIZE_NOTE}. Boulangers, tourières, vendeuses, traiteur: chacun a son geste.`)}
        <ul class="team-grid">
          ${TEAM.map((m) => html`<li class="team-card" data-reveal><h3>${m.named && m.name ? m.name : m.role}</h3><p class="mono">${m.named ? m.role : 'Rôle'}</p><p class="muted">${m.description}</p></li>`)}
        </ul>
      </div>
    </section>`
}

function shop(): string {
  const facade = GALLERY.find((g) => g.kind === 'aube' && g.variant === 2) ?? GALLERY.find((g) => g.kind === 'aube')!
  const s = stat('equipe')
  return html`
    <section class="section section--line the-shop">
      <div class="wrap shop-grid">
        <div class="shop-art" data-reveal="clip">${galleryArt(facade, FLANS)}</div>
        <div>
          ${sectionHead('La boutique', 'Blanche et or, pour faire place au produit.', 'Trente-six mètres carrés, un comptoir, une vitrine. Le décor s’efface pour laisser parler les feuilletages.')}
          <p class="muted" data-reveal>À emporter uniquement, pas de salle. ${s.value} personnes dans l’équipe, selon un chiffre de novembre 2025.</p>
          <p data-reveal>${arrowLink('Le quartier Saint-Martin', href('le-quartier/'), 'btn--ghost')}</p>
        </div>
      </div>
    </section>`
}

function atelier(): string {
  const picks = ['petrissage-rouleau', 'croissants-plaque', 'miche-farine', 'planche-viennoiseries'].map((slug) => photoBySlug(slug)!)
  return html`
    <section class="section section--line atelier-photos">
      <div class="wrap">
        ${sectionHead('Au fournil', 'Le geste, avant le produit.', 'Pétrir, tourer, façonner, cuire: une journée qui commence bien avant l’ouverture. Images d’ambiance, en attendant les photos de la maison.')}
        <div class="atelier-grid">${picks.map((ph, i) => photoFigure(ph, `atelier-${i}`, i === 0 ? 'clip' : 'up'))}</div>
      </div>
    </section>`
}

function initTimeline() {
  const root = $('[data-timeline]')
  const fill = $('[data-tl-fill]')
  if (!root || !fill) return
  if (!motionOn()) {
    fill.style.transform = 'scaleY(1)'
    return
  }
  gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top 60%', end: 'bottom 60%', scrub: 0.4 } })
}

boot({
  nav: 'maison',
  main: () => html`
    <div class="timber">
      ${pageHero({ eyebrow: 'La maison', title: 'Deux champions, une boulangerie.', lead: 'Un chef tourier et un boulanger se rencontrent chez Maison Fraudin. Le 8 juillet 2025, ils ouvrent leur propre porte, à Rennes.' })}
    </div>
    ${founders()}${timeline()}${trust()}${team()}${atelier()}${shop()}`,
  init: initTimeline,
})

import { boot } from '../core/boot'
import { $, $$, href, html } from '../core/dom'
import { icon } from '../core/icons'
import { quartierSchema } from '../core/art'
import { arrowLink, pageHero, sectionHead } from '../core/components'
import { gsap, motionOn, ScrollTrigger } from '../core/motion'
import { BUSINESS, POIS, QUARTIER_FACTS, TRANSPORT } from '../data'

const route = [...POIS].filter((p) => p.id !== 'lices').sort((a, b) => a.order - b.order)
const KIND: Record<string, string> = { nature: 'Nature', patrimoine: 'Patrimoine', marche: 'Marché', ecole: 'Études', transport: 'Transport', boutique: 'Chez nous' }

function main(): string {
  return html`
    ${pageHero({ eyebrow: 'Le quartier Saint-Martin', title: 'Du canal à l’angle.', lead: 'Une promenade de la nature en ville jusqu’à la porte de la boutique, à l’angle de la rue de Saint-Malo et du boulevard de Verdun.' })}
    <section class="section walk" data-walk>
      <div class="wrap walk-grid">
        <div class="walk-map">
          <div class="walk-sticky">
            ${quartierSchema(POIS)}
            <p class="fine muted">Schéma du quartier, pas une carte à l’échelle. Les distances sont approximatives, à vol d’oiseau.</p>
          </div>
        </div>
        <ol class="walk-list">
          ${route.map(
            (p, i) => html`
              <li class="poi" data-poi-step="${p.id}">
                <p class="mono poi-n">${String(i + 1).padStart(2, '0')} · ${KIND[p.kind]} ${p.approxMeters ? `· à ${p.approxMeters} m` : ''}</p>
                <h3>${p.name}</h3>
                <p class="muted">${p.blurb}</p>
              </li>`,
          )}
          <li class="poi poi--aside" data-poi-step="lices">
            <p class="mono poi-n">Et le samedi · à ${POIS.find((p) => p.id === 'lices')!.approxMeters} m</p>
            <h3>${POIS.find((p) => p.id === 'lices')!.name}</h3>
            <p class="muted">${POIS.find((p) => p.id === 'lices')!.blurb}</p>
          </li>
        </ol>
      </div>
    </section>
    <section class="section section--line facts">
      <div class="wrap">
        ${sectionHead('Saint-Martin en chiffres', 'Un quartier jeune et vivant.', 'Repères approximatifs, à titre indicatif.')}
        <ul class="fact-grid">
          ${QUARTIER_FACTS.map((f) => html`<li data-reveal><p class="fact-num mono">${f.value}<small>${'unit' in f ? f.unit : ''}</small></p><p class="muted">${f.label}</p></li>`)}
        </ul>
      </div>
    </section>
    <section class="section on-night come">
      <div class="wrap come-grid">
        <div>
          <p class="eyebrow" data-reveal="fade">Pour venir</p>
          <h2 data-split>Un arrêt de bus à 64 mètres.</h2>
          <ul class="transport" data-reveal>
            ${TRANSPORT.map((t) => html`<li>${icon(t.mode === 'metro' ? 'train' : 'bus')}<span><strong>${t.label}</strong>, ${t.lines} <span class="muted mono">à environ ${t.approxMeters} m</span></span></li>`)}
          </ul>
        </div>
        <div class="come-actions" data-reveal>
          ${arrowLink('Itinéraire Google Maps', BUSINESS.links.maps, 'btn--night')}
          ${arrowLink('Horaires et contact', href('infos/'), 'btn--light')}
        </div>
      </div>
    </section>`
}

function init() {
  const root = $('[data-walk]')
  if (!root) return
  const steps = $$('[data-poi-step]', root)
  const pois = (id: string) => $(`[data-poi="${id}"]`, root)
  const routeEl = $<SVGPathElement>('.qs-route', root)
  steps.forEach((el) =>
    ScrollTrigger.create({
      trigger: el,
      start: 'top 60%',
      end: 'bottom 60%',
      onToggle: (self) => {
        el.classList.toggle('is-active', self.isActive)
        pois(el.dataset.poiStep!)?.classList.toggle('is-lit', self.isActive)
      },
    }),
  )
  if (routeEl && motionOn()) {
    gsap.fromTo(routeEl, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.walk-list', start: 'top 60%', end: 'bottom 60%', scrub: 0.5 } })
  }
}

boot({ nav: 'quartier', main, init })

import { boot } from '../core/boot'
import { href, html } from '../core/dom'
import { icon } from '../core/icons'
import { quartierSchema } from '../core/art'
import { arrowLink, hoursTable, pageHero, photoFigure, statusPill } from '../core/components'
import { BUSINESS, HOLIDAY_NOTE, POIS, SOCIALS, TRANSPORT, photoBySlug } from '../data'

function main(): string {
  const a = BUSINESS.address
  return html`
    ${pageHero({ eyebrow: 'Infos pratiques', title: 'Horaires, accès et contact.', lead: `Au ${a.street}, ${a.corner}. À emporter uniquement, pas de salle.` })}
    <section class="section section--tight infos">
      <div class="wrap infos-grid">
        <div class="infos-card" data-reveal>
          <h2 class="h-small">Ouverture</h2>
          ${statusPill()}
          ${hoursTable()}
          <p class="fine muted">${HOLIDAY_NOTE}</p>
        </div>
        <div class="infos-card" data-reveal>
          <h2 class="h-small">Nous joindre</h2>
          <p class="infos-phone"><a class="link mono" href="tel:${BUSINESS.phone}" data-salt>${BUSINESS.phoneDisplay}</a></p>
          <p class="muted">Le plus simple: un coup de téléphone, pour savoir ce qui est en vitrine ou pour un flan entier.</p>
          <address>${a.street}<br />${a.postalCode} ${a.city}<br /><span class="muted">Quartier ${a.quartier}</span></address>
          <div class="infos-actions">
            <a class="btn" href="tel:${BUSINESS.phone}" data-salt>Appeler<span class="btn-ico">${icon('phone')}</span></a>
            <a class="btn btn--ghost" href="${BUSINESS.links.maps}" target="_blank" rel="noopener noreferrer">Google Maps<span class="btn-ico">${icon('map-pin')}</span></a>
          </div>
          <ul class="footer-list social-list">
            ${SOCIALS.map((s) => html`<li><a class="link" href="${s.url}" target="_blank" rel="noopener noreferrer">${icon(s.id)}<span>${s.label}: ${s.handle}</span></a></li>`)}
          </ul>
          <p class="fine muted">Pas d’adresse e-mail ni de formulaire sur ce site de démonstration.</p>
        </div>
        <div class="infos-card infos-card--photo">${photoFigure(photoBySlug('pains-etagere')!, 'infos-photo', 'clip')}<p class="fine muted">Vitrine d’ambiance. Pas une photo de la boutique: elles arriveront avec l’accord de la maison.</p></div>
        <div class="infos-card infos-card--wide" data-reveal>
          <h2 class="h-small">Comment venir</h2>
          <div class="infos-map">
            ${quartierSchema(POIS)}
            <p class="fine muted">Schéma du quartier, pas une carte à l’échelle. <a class="link" href="${BUSINESS.links.osm}" target="_blank" rel="noopener noreferrer">Voir sur OpenStreetMap</a>.</p>
          </div>
          <ul class="transport">
            ${TRANSPORT.map((t) => html`<li>${icon(t.mode === 'metro' ? 'train' : 'bus')}<span><strong>${t.label}</strong>, ${t.lines} <span class="muted mono">à environ ${t.approxMeters} m</span></span></li>`)}
          </ul>
          <p>${arrowLink('Le quartier Saint-Martin', href('le-quartier/'), 'btn--ghost')}</p>
        </div>
      </div>
    </section>`
}

boot({ nav: 'infos', main })

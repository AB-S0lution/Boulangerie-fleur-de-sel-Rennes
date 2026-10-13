// Coque commune des pages: en-tête, menu mobile, pied de page, barre d'action mobile.
import { BUSINESS, HOURS, NAV_LEGAL, NAV_MAIN, NAV_MORE, SOCIALS, formatRange, getStatus, parisNow, voice } from '../data'
import { href, html } from './dom'
import { icon } from './icons'

export interface ShellOptions {
  /** id de navigation active (voir data/navigation.ts) */
  nav?: string
  /** `night`: l'en-tête est transparent et clair sur l'aube du héros */
  tone?: 'night' | 'day'
  main: string
}

const navLink = (id: string, label: string, path: string, active?: string) =>
  html`<a href="${href(path)}"${active === id ? ' aria-current="page"' : ''}>${label}</a>`

export function renderHeader(o: ShellOptions): string {
  const st = getStatus()
  return html`
    <a class="skip-link sr-only-focusable" href="#main">Aller au contenu</a>
    <header class="site-header" data-tone="${o.tone ?? 'day'}">
      <div class="wrap header-inner">
        <a class="wordmark" href="${href('')}" aria-label="${BUSINESS.name}, accueil">Fleur de sel<span class="dot" aria-hidden="true"></span></a>
        <nav class="nav-main" aria-label="Navigation principale">
          ${NAV_MAIN.map((n) => navLink(n.id, n.label, n.path, o.nav))}
        </nav>
        <div class="status-pill" data-status data-open="${String(st.open)}" role="status" aria-live="polite">
          <span class="led" aria-hidden="true"></span>
          <span class="status-text">${st.text}</span>
          <span class="status-short">${st.open ? 'Ouvert' : 'Fermé'}</span>
        </div>
        <a class="btn btn--sm header-call" href="tel:${BUSINESS.phone}">Appeler la boutique<span class="btn-ico">${icon('phone')}</span></a>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Ouvrir le menu"><span></span><span></span></button>
      </div>
    </header>
    <div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu">
      <nav aria-label="Navigation mobile">
        <div class="menu-links">
          ${[...NAV_MAIN, ...NAV_MORE.slice(0, 1)].map(
            (n, i) =>
              html`<a href="${href(n.path)}" style="--i:${i}"${o.nav === n.id ? ' aria-current="page"' : ''}>${n.label}<small>${n.description}</small></a>`,
          )}
        </div>
      </nav>
      <div class="menu-meta">
        <div class="menu-more">${NAV_MORE.slice(1).map((n) => html`<a class="link" href="${href(n.path)}">${n.label}</a>`)}</div>
        <p data-status-copy>${st.text}</p>
        <p>${BUSINESS.address.street}, ${BUSINESS.address.postalCode} ${BUSINESS.address.city}</p>
      </div>
    </div>`
}

export function renderFooter(): string {
  const today = parisNow().dayIndex
  return html`
    <footer class="site-footer on-night">
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <p class="display" style="font-size:clamp(1.5rem,2.4vw,2.25rem);font-weight:700;letter-spacing:-0.03em;line-height:1.1;max-width:18ch">${BUSINESS.tagline}</p>
            <p class="muted" style="margin-top:16px;max-width:36ch">${voice('saveur')}</p>
            <a class="btn btn--night" style="margin-top:28px" href="tel:${BUSINESS.phone}">Appeler la boutique<span class="btn-ico">${icon('phone')}</span></a>
          </div>
          <div>
            <h2 class="footer-title">Horaires</h2>
            <dl class="footer-hours">
              ${HOURS.map(
                (d) => html`<div${d.dayIndex === today ? ' class="is-today"' : ''}><dt>${d.label}</dt><dd>${formatRange(d)}</dd></div>`,
              )}
            </dl>
          </div>
          <div>
            <h2 class="footer-title">Explorer</h2>
            <ul class="footer-list">
              ${[...NAV_MAIN, ...NAV_MORE].map((n) => html`<li><a class="link" href="${href(n.path)}">${n.label}</a></li>`)}
            </ul>
          </div>
          <div>
            <h2 class="footer-title">Nous trouver</h2>
            <address style="font-style:normal;line-height:1.6">
              ${BUSINESS.address.street}<br />${BUSINESS.address.postalCode} ${BUSINESS.address.city}<br />
              <span class="muted">Quartier ${BUSINESS.address.quartier}</span>
            </address>
            <p class="mono" style="margin-top:12px"><a class="link" href="tel:${BUSINESS.phone}">${BUSINESS.phoneDisplay}</a></p>
            <ul class="footer-list" style="margin-top:12px">
              ${SOCIALS.map(
                (s) =>
                  html`<li><a class="link" href="${s.url}" target="_blank" rel="noopener noreferrer" style="gap:8px">${icon(s.id)}${s.handle}</a></li>`,
              )}
              <li><a class="link" href="${BUSINESS.links.maps}" target="_blank" rel="noopener noreferrer" style="gap:8px">${icon('map-pin')}Itinéraire Google Maps</a></li>
            </ul>
          </div>
        </div>
        <p class="footer-big" aria-hidden="true">Fleur de sel</p>
        <div class="footer-bottom">
          <p class="demo-note">${BUSINESS.demoNotice}</p>
          <p>
            ${NAV_LEGAL.map((n) => html`<a class="link" href="${href(n.path)}">${n.label}</a>`).join('&nbsp;&nbsp;&nbsp;')}
          </p>
        </div>
      </div>
    </footer>
    <div class="dock" data-dock>
      <a class="btn" href="tel:${BUSINESS.phone}">Appeler la boutique<span class="btn-ico">${icon('phone')}</span></a>
      <a class="btn btn--ghost btn--noicon" href="${BUSINESS.links.maps}" target="_blank" rel="noopener noreferrer" aria-label="Itinéraire sur Google Maps (nouvel onglet)">Itinéraire</a>
    </div>`
}

export function renderShell(o: ShellOptions): string {
  return html`${renderHeader(o)}<main id="main" tabindex="-1">${o.main}</main>${renderFooter()}`
}

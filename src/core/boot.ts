// Amorçage commun à toutes les pages: polices, styles, coque (en-tête / pied), mouvement, puis le code de la page.
import '@fontsource-variable/schibsted-grotesk/wght.css'
import '@fontsource-variable/hanken-grotesk/wght.css'
import '@fontsource-variable/geist-mono/wght.css'
import '../style.css'
import { getStatus } from '../data'
import { $, $$, typo } from './dom'
import { renderShell, type ShellOptions } from './layout'
import {
  gsap,
  ScrollTrigger,
  initCounters,
  initParallax,
  initReveals,
  initSaltTriggers,
  initSmoothScroll,
  initSplits,
  initWordScrub,
  refreshOnReady,
  startScroll,
  stopScroll,
} from './motion'
import { initTransitions } from './transitions'

export interface PageDef extends Omit<ShellOptions, 'main'> {
  main: () => string
  init?: () => void
}

function initMenu(): void {
  const btn = $<HTMLButtonElement>('.menu-btn')
  const menu = $('#menu')
  if (!btn || !menu) return
  const root = document.documentElement
  const inertTargets = () => $$('main, .site-footer, .dock')
  const set = (open: boolean) => {
    btn.setAttribute('aria-expanded', String(open))
    btn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu')
    menu.classList.toggle('is-open', open)
    root.classList.toggle('menu-open', open)
    inertTargets().forEach((el) => (el.inert = open))
    if (open) {
      stopScroll()
      ;($('a', menu) as HTMLElement | null)?.focus({ preventScroll: true })
    } else {
      startScroll()
      btn.focus({ preventScroll: true })
    }
  }
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'))
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) set(false)
  })
  menu.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a')) root.classList.remove('menu-open')
  })
  // Retour à une largeur desktop: on referme proprement.
  window.matchMedia('(min-width: 1100px)').addEventListener('change', (m) => {
    if (m.matches && menu.classList.contains('is-open')) set(false)
  })
}

function initStatus(): void {
  const refresh = () => {
    const st = getStatus()
    const pill = $('[data-status]')
    if (pill) {
      pill.dataset.open = String(st.open)
      const t = $('.status-text', pill)
      const s = $('.status-short', pill)
      if (t && t.textContent !== st.text) t.textContent = st.text
      if (s) s.textContent = st.open ? 'Ouvert' : 'Fermé'
    }
    $$('[data-status-copy]').forEach((el) => (el.textContent = st.text))
    $$('[data-status-detail]').forEach((el) => (el.textContent = st.detail))
    $$('[data-status-led]').forEach((el) => (el.dataset.open = String(st.open)))
  }
  refresh()
  window.setInterval(refresh, 30_000)
  document.addEventListener('visibilitychange', () => !document.hidden && refresh())
}

/** La barre d'action mobile apparaît après le premier écran. */
function initDock(): void {
  const dock = $('[data-dock]')
  if (!dock) return
  const sentinel = document.createElement('div')
  sentinel.setAttribute('aria-hidden', 'true')
  sentinel.style.cssText = 'position:absolute;top:600px;left:0;width:1px;height:1px;pointer-events:none'
  document.body.prepend(sentinel)
  new IntersectionObserver(([e]) => dock.classList.toggle('is-visible', !e.isIntersecting && e.boundingClientRect.top < 0)).observe(sentinel)
}

export function boot(def: PageDef): void {
  const app = $('#app')
  if (!app) return
  const root = document.documentElement
  try {
    app.innerHTML = typo(renderShell({ nav: def.nav, tone: def.tone, main: def.main() }))
    initMenu()
    initStatus()
    initDock()
    ScrollTrigger.config({ ignoreMobileResize: true })
    initSmoothScroll()
    initTransitions()
    initSaltTriggers()
    def.init?.()
    initSplits()
    initReveals()
    initWordScrub()
    initCounters()
    initParallax()
    refreshOnReady()
    // Reprise d'ancre après rendu JS
    if (location.hash) {
      const t = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (t) requestAnimationFrame(() => t.scrollIntoView())
    }
  } catch (err) {
    console.error('[fleur-de-sel] échec de l’initialisation', err)
    root.classList.add('motion-failed')
    gsap.killTweensOf('*')
  }
}

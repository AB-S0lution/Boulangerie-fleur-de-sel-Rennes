// Transitions de page. Chrome/Edge 126+ et Safari 18.2+: View Transitions entre documents (voir components.css,
// `@view-transition { navigation: auto }`). Ailleurs (Firefox): rideau doré animé en JS, même langage visuel.
import gsap from 'gsap'
import { $, reducedMotion } from './dom'

interface PageSwapLike extends Event {
  viewTransition?: { finished: Promise<void> }
  activation?: { entry?: { url?: string }; from?: { url?: string } }
}

const FLAG = 'fds-wipe'

export function initTransitions(): void {
  // Élément partagé: la vignette produit devient l'illustration de la fiche (et inversement).
  window.addEventListener('pageswap', (e) => {
    const ev = e as PageSwapLike
    if (!ev.viewTransition) return
    const to = ev.activation?.entry?.url
    if (!to) return
    const url = new URL(to)
    if (!url.pathname.endsWith('produit.html')) return
    const id = url.searchParams.get('id')
    const art = id ? $(`[data-product-id="${CSS.escape(id)}"] .tag-art`) : null
    if (art) art.style.viewTransitionName = 'product-art'
  })

  window.addEventListener('pagereveal', async (e) => {
    const ev = e as PageSwapLike
    if (!ev.viewTransition) return
    const from = ev.activation?.from?.url
    if (!from) return
    const u = new URL(from)
    if (!u.pathname.endsWith('produit.html')) return
    const id = u.searchParams.get('id')
    const art = id ? $(`[data-product-id="${CSS.escape(id)}"] .tag-art`) : null
    if (!art) return
    art.style.viewTransitionName = 'product-art'
    await ev.viewTransition.finished
    art.style.viewTransitionName = ''
  })

  const supports = 'CSSViewTransitionRule' in window
  if (supports || reducedMotion()) return

  const wipe = document.createElement('div')
  wipe.className = 'wipe'
  wipe.setAttribute('aria-hidden', 'true')
  wipe.innerHTML = '<span class="wipe-label">Fleur de sel</span>'
  document.body.append(wipe)
  gsap.set(wipe, { yPercent: 100 })

  let arriving = false
  try {
    arriving = sessionStorage.getItem(FLAG) === '1'
    sessionStorage.removeItem(FLAG)
  } catch {
    arriving = false
  }
  if (arriving) {
    gsap.set(wipe, { yPercent: 0 })
    gsap.to(wipe, { yPercent: -100, duration: 0.7, ease: 'expo.inOut', delay: 0.05 })
  }

  window.addEventListener('pageshow', (ev) => {
    if ((ev as PageTransitionEvent).persisted) gsap.set(wipe, { yPercent: 100 })
  })

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href]')
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return
    const url = new URL(a.href, location.href)
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return
    if (!url.pathname.startsWith(import.meta.env.BASE_URL)) return
    e.preventDefault()
    try {
      sessionStorage.setItem(FLAG, '1')
    } catch {
      /* stockage indisponible: on navigue sans rideau d'arrivée */
    }
    gsap.fromTo(
      wipe,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.45, ease: 'expo.inOut', onComplete: () => (location.href = url.href) },
    )
  })
}

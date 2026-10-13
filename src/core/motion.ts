// Moteur de mouvement: GSAP (ScrollTrigger, SplitText, Flip), Lenis, révélations, compteurs, éclat de sel.
// Règles: transform / opacity / clip-path uniquement, aucun écouteur `scroll` sur window,
// repli calme si `prefers-reduced-motion` (la classe `js-motion` n'est alors jamais posée).
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import Lenis from 'lenis'
import { $, $$, finePointer, rng } from './dom'
import { crystalSvg } from './art'

gsap.registerPlugin(ScrollTrigger, SplitText, Flip)

export { gsap, ScrollTrigger, SplitText, Flip }

export const EASE_OUT = 'expo.out'

export const motionOn = (): boolean => document.documentElement.classList.contains('js-motion')

let lenis: Lenis | null = null
export const getLenis = (): Lenis | null => lenis

/** Défilement doux, seulement pour les pointeurs précis. Le tactile garde son inertie native. */
export function initSmoothScroll(): void {
  if (!motionOn() || !finePointer()) return
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.95 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  document.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]')
    if (!a || e.defaultPrevented) return
    const url = new URL(a.href, location.href)
    if (url.pathname !== location.pathname || !url.hash) return
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
    if (!target) return
    e.preventDefault()
    lenis?.scrollTo(target, { offset: -(64 + 16), duration: 1.2 })
    history.pushState(null, '', url.hash)
  })
}

export const stopScroll = (): void => lenis?.stop()
export const startScroll = (): void => lenis?.start()

/** Révélations génériques au défilement: data-reveal="up|fade|clip". */
export function initReveals(): void {
  if (!motionOn()) return
  const els = $$('[data-reveal]')
  ScrollTrigger.batch(els, {
    start: 'top 92%',
    once: true,
    batchMax: 8,
    interval: 0.08,
    onEnter: (batch) => {
      batch.forEach((el, i) => {
        const mode = (el as HTMLElement).dataset.reveal
        if (mode === 'clip') {
          gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: EASE_OUT, delay: i * 0.08, clearProps: 'clipPath' })
        } else if (mode === 'fade') {
          gsap.to(el, { opacity: 1, duration: 0.9, ease: 'power2.out', delay: i * 0.06 })
        } else {
          gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: EASE_OUT, delay: i * 0.08, clearProps: 'transform' })
        }
      })
    },
  })
}

/** Titres découpés en lignes masquées (SplitText) qui montent au défilement. */
export function initSplits(): void {
  const els = $$('[data-split]')
  if (!motionOn()) {
    els.forEach((el) => el.classList.add('is-split'))
    return
  }
  document.fonts.ready.then(() => {
    els.forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        linesClass: 'split-line',
        onSplit(self) {
          el.classList.add('is-split')
          return gsap.from(self.lines, {
            yPercent: 115,
            duration: 1.05,
            ease: EASE_OUT,
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        },
      })
    })
  })
}

/** Phrase-manifeste dont les mots s'allument au défilement. */
export function initWordScrub(): void {
  $$('[data-scrub-words]').forEach((el) => {
    if (!motionOn()) return
    document.fonts.ready.then(() => {
      const split = SplitText.create(el, { type: 'words', wordsClass: 'scrub-word' })
      gsap.fromTo(
        split.words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: 0.6 },
        },
      )
    })
  })
}

/** Compteurs: data-count="2019" data-from="1990". La valeur finale est déjà dans le HTML. */
export function initCounters(): void {
  $$('[data-count]').forEach((el) => {
    if (!motionOn()) return
    const to = Number(el.dataset.count)
    const from = Number(el.dataset.from ?? 0)
    const o = { v: from }
    el.textContent = String(from)
    gsap.to(o, {
      v: to,
      duration: 2.2,
      ease: 'power3.out',
      snap: { v: 1 },
      onUpdate: () => (el.textContent = String(Math.round(o.v))),
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })
  })
}

/** Légère parallaxe de profondeur (pointeurs précis uniquement). */
export function initParallax(): void {
  if (!motionOn() || !finePointer()) return
  $$('[data-parallax]').forEach((el) => {
    const amt = Number(el.dataset.parallax || 40)
    gsap.fromTo(
      el,
      { y: -amt },
      { y: amt, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
    )
  })
}

/** Une pincée de fleur de sel: 6 à 10 cristaux jaillissent avec une chute, en moins de 600 ms. */
export function saltBurst(x: number, y: number, count = 8): void {
  if (!motionOn()) return
  let layer = $('.salt-layer')
  if (!layer) {
    layer = document.createElement('div')
    layer.className = 'salt-layer'
    layer.setAttribute('aria-hidden', 'true')
    document.body.append(layer)
  }
  const r = rng(Math.floor(x * 7 + y * 13 + performance.now()))
  for (let i = 0; i < count; i++) {
    const bit = document.createElement('span')
    bit.className = 'salt-bit'
    bit.innerHTML = crystalSvg(5 + Math.round(r() * 5))
    layer.append(bit)
    const angle = -Math.PI / 2 + (r() - 0.5) * 2.2
    const dist = 40 + r() * 70
    gsap.set(bit, { x, y, rotate: r() * 120, scale: 0.6 + r() * 0.6 })
    gsap
      .timeline({ onComplete: () => bit.remove() })
      .to(bit, { x: x + Math.cos(angle) * dist, y: y + Math.sin(angle) * dist, rotate: `+=${(r() - 0.5) * 240}`, duration: 0.28, ease: 'power3.out' })
      .to(bit, { y: `+=${50 + r() * 50}`, opacity: 0, duration: 0.3, ease: 'power2.in' })
  }
}

/** Éclat de sel sur les CTA principaux (data-salt) à l'appui. */
export function initSaltTriggers(): void {
  document.addEventListener('pointerdown', (e) => {
    const t = (e.target as Element | null)?.closest<HTMLElement>('[data-salt]')
    if (t) saltBurst(e.clientX, e.clientY)
  })
}

/** Rafraîchit les ScrollTrigger quand les polices et les images ont fini de se mettre en place. */
export function refreshOnReady(): void {
  document.fonts.ready.then(() => ScrollTrigger.refresh())
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
}

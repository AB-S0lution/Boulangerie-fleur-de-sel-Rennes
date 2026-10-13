import { boot } from '../core/boot'
import { href, html, rng } from '../core/dom'
import { icon } from '../core/icons'
import { crystalSvg } from '../core/art'
import { photoImg } from '../core/components'
import { photoBySlug } from '../data'

const r = rng(1)
const drops = Array.from({ length: 14 }, (_, i) => ({ x: 6 + i * 6.6 + r() * 3, s: 8 + Math.round(r() * 10), d: r() * 3.2 }))

boot({
  main: () => html`
    <section class="notfound on-night">
      <div class="nf-crystals" aria-hidden="true">${drops.map((d) => `<span class="nf-bit" style="left:${d.x.toFixed(1)}%;animation-delay:${d.d.toFixed(2)}s">${crystalSvg(d.s)}</span>`)}</div>
      <div class="wrap nf-inner">
        <p class="mono eyebrow">Erreur 404</p>
        <h1>Cette fournée est déjà partie.</h1>
        <p class="lead">La page que vous cherchez n’est plus en vitrine, ou n’a jamais été au four. Retour au comptoir ?</p>
        <div class="nf-photo">${photoImg(photoBySlug('pain-sac-papier')!, 'ph-img', true)}</div>
        <p class="nf-actions"><a class="btn btn--night" href="${href('')}" data-salt>Retour à l’accueil<span class="btn-ico">${icon('arrow-right')}</span></a> <a class="link" href="${href('boutique/')}">Voir la boutique</a></p>
      </div>
    </section>`,
})

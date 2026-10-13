import { boot } from '../core/boot'
import { $, $$, href, html } from '../core/dom'
import { pageHero, sectionHead, arrowLink } from '../core/components'
import { gsap, motionOn, ScrollTrigger } from '../core/motion'
import { BUSINESS, GLOSSARY, PROCESS, SUPPLIERS } from '../data'

function process(): string {
  return html`
    <section class="section process" data-process aria-labelledby="process-title">
      <div class="wrap process-grid">
        <div class="process-clock">
          <div class="clock-card on-night">
            <p class="mono clock-label">Dans le fournil</p>
            <p class="clock-time mono" data-process-clock>${PROCESS[0].clock}</p>
            <p class="clock-verb display" data-process-verb>${PROCESS[0].verb}</p>
            <span class="clock-track" aria-hidden="true"><span class="clock-fill" data-process-fill></span></span>
          </div>
        </div>
        <div class="process-steps">
          <div class="section-head">
            <p class="eyebrow" data-reveal="fade">Du pétrin à la fleur de sel</p>
            <h2 id="process-title" data-split>Six gestes entre une heure et six heures trente.</h2>
            <p class="lead" data-reveal>Le détail de nos horaires de fournil est un récit d’exemple. Les faits qui le portent, eux, sont ceux de la maison.</p>
          </div>
          <ol class="step-list">
            ${PROCESS.map(
              (s, i) => html`
                <li class="process-step" data-process-step="${i}" data-clock="${s.clock}" data-verb="${s.verb}">
                  <p class="mono step-clock">${s.clock}</p>
                  <h3><span class="verb">${s.verb}.</span> ${s.title}</h3>
                  <p class="muted">${s.text}</p>
                  ${s.fact ? `<blockquote class="fact">${s.fact}</blockquote>` : ''}
                </li>`,
            )}
          </ol>
        </div>
      </div>
    </section>`
}

function pillars(): string {
  return html`
    <section class="section section--line craft">
      <div class="wrap">
        ${sectionHead('Trois repères', 'Le beurre, le temps, le sel.')}
        <div class="craft-grid">
          <article class="craft-card" data-reveal>
            <p class="mono craft-n">Le tourage</p>
            <h3>Un chef tourier, du beurre AOP.</h3>
            <p class="muted">Baptiste Cortais dirige la viennoiserie. Le beurre est un AOP Charentes-Poitou, fourni par Lescure. Il n’y a ni miel, ni vanille, ni levain dans le croissant. Et jamais de margarine.</p>
          </article>
          <article class="craft-card" data-reveal>
            <p class="mono craft-n">Le levain</p>
            <h3>Quinze heures de fermentation.</h3>
            <p class="muted">Nos pains sont bio et au levain naturel. Mathis Ruelleux dirige le pain: des pains généreux de 600 à 700 g.</p>
          </article>
          <article class="craft-card" data-reveal>
            <p class="mono craft-n">Le bara</p>
            <h3>Le pain, en breton.</h3>
            <p class="muted">Farine T80, blé noir, sel de Guérande et graines de sarrasin torréfiées. C’est le pain de la maison, celui qui dit où nous sommes.</p>
          </article>
        </div>
      </div>
    </section>`
}

function ingredients(): string {
  return html`
    <section class="section section--line ingredients">
      <div class="wrap">
        ${sectionHead('Ce qui entre dans la pâte', 'Cinq ingrédients qui comptent.', 'Une petite carte de ce qui fait le goût, du marais salant au primeur du coin.')}
        <ul class="supplier-list">
          ${SUPPLIERS.map(
            (s, i) => html`
              <li class="supplier" data-reveal>
                <span class="mono supplier-n">0${i + 1}</span>
                <div>
                  <h3>${s.name}</h3>
                  <p class="muted">${s.what}</p>
                </div>
                <p class="supplier-where mono">${s.where}</p>
                ${s.id.includes('primeur') ? '' : `<p class="supplier-note muted">${s.note}</p>`}
              </li>`,
          )}
        </ul>
      </div>
    </section>`
}

function certification(): string {
  const o = BUSINESS.organic
  return html`
    <section class="section on-night cert">
      <div class="wrap cert-grid">
        <div>
          <p class="eyebrow" data-reveal="fade">Agriculture biologique</p>
          <h2 data-split>Du pain certifié bio.</h2>
          <p class="lead" data-reveal>${o.scope}</p>
        </div>
        <dl class="cert-card" data-reveal>
          <div><dt>Label</dt><dd>${o.label}</dd></div>
          <div><dt>Organisme certificateur</dt><dd>${o.certifier}</dd></div>
          <div><dt>Opérateur</dt><dd>${o.operator}</dd></div>
          <div><dt>Engagé depuis</dt><dd>juin 2025</dd></div>
        </dl>
      </div>
    </section>`
}

function glossary(): string {
  return html`
    <section class="section glossary">
      <div class="wrap">
        ${sectionHead('Petit glossaire', 'Les mots du fournil.')}
        <dl class="glossary-list">
          ${GLOSSARY.map(
            (g) => html`<div class="gloss" data-reveal><dt>${g.term}<span class="mono gloss-type">${g.type}</span></dt><dd>${g.definition}${g.note ? ` <span class="muted">${g.note}</span>` : ''}</dd></div>`,
          )}
        </dl>
        <p style="margin-top:32px">${arrowLink('Voir les pains et viennoiseries', href('boutique/'), 'btn--ghost')}</p>
      </div>
    </section>`
}

function initProcess() {
  const root = $('[data-process]')
  if (!root) return
  const clock = $('[data-process-clock]')!
  const verb = $('[data-process-verb]')!
  const fill = $('[data-process-fill]')!
  const steps = $$('[data-process-step]', root)
  steps.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        el.classList.toggle('is-active', self.isActive)
        if (!self.isActive) return
        clock.textContent = el.dataset.clock!
        verb.textContent = el.dataset.verb!
      },
    })
  })
  if (motionOn()) {
    gsap.fromTo(fill, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.step-list', start: 'top 55%', end: 'bottom 55%', scrub: 0.4 } })
  } else {
    fill.style.transform = 'scaleX(1)'
  }
}

boot({
  nav: 'savoir-faire',
  main: () => html`
    ${pageHero({ eyebrow: 'Savoir-faire', title: 'Du pétrin à la fleur de sel.', lead: 'Le beurre se plie, le levain prend son temps, le sel finit le travail. Voici comment nous travaillons, sans en révéler la recette.' })}
    ${process()}${pillars()}${ingredients()}${certification()}${glossary()}`,
  init: initProcess,
})

import { boot } from '../core/boot'
import { $, $$, fold, html, reducedMotion } from '../core/dom'
import { icon } from '../core/icons'
import { productArt } from '../core/art'
import { pageHero } from '../core/components'
import { FAQ, FAQ_TOPICS, type FaqTopic } from '../data'

let topic: FaqTopic | 'tout' = 'tout'
let q = ''

function main(): string {
  const count = (t: FaqTopic | 'tout') => (t === 'tout' ? FAQ.length : FAQ.filter((f) => f.topic === t).length)
  return html`
    ${pageHero({ eyebrow: 'Questions fréquentes', title: 'On vous répond.', lead: 'Les réponses marquées « à confirmer » attendent une validation de la boutique. En cas de doute, appelez-nous.' })}
    <section class="section section--tight faq">
      <div class="wrap faq-wrap">
        <div class="filters">
          <div class="input-wrap">
            ${icon('search')}
            <label class="sr-only" for="fq">Rechercher une question</label>
            <input class="input" id="fq" type="search" inputmode="search" enterkeyhint="search" autocomplete="off" placeholder="Rechercher: horaires, flan, accès…" />
            <button class="search-clear" type="button" aria-label="Effacer la recherche">${icon('x')}</button>
          </div>
          <div class="scroller cats" role="group" aria-label="Thèmes">
            ${['tout' as const, ...FAQ_TOPICS.map((t) => t.id)].map(
              (t) => html`<button class="chip" type="button" data-topic="${t}" aria-pressed="${String(t === 'tout')}">${t === 'tout' ? 'Tout' : FAQ_TOPICS.find((x) => x.id === t)!.label}<span class="count">${count(t)}</span></button>`,
            )}
          </div>
        </div>
        <p class="result-count mono" role="status" aria-live="polite" data-fcount></p>
        <div class="faq-list" data-faq>
          ${FAQ.map(
            (f) => html`
              <details class="faq-item" data-topic-of="${f.topic}" data-text="${fold(`${f.question} ${f.answer} ${f.keywords.join(' ')}`).replace(/"/g, '')}">
                <summary><span>${f.question}</span>${icon('plus', 'faq-plus')}</summary>
                <div class="faq-answer">
                  <p>${f.answer}</p>
                  ${f.status === 'a-confirmer' ? '<p><span class="badge badge--mock">À confirmer auprès de la boutique</span></p>' : ''}
                </div>
              </details>`,
          )}
        </div>
        <div class="empty" data-fempty hidden>
          ${productArt('baguette', 'empty-art')}
          <h2>Pas de réponse à cette question.</h2>
          <p class="muted">Essayez un autre mot, ou appelez la boutique: on s’occupe du reste !</p>
        </div>
      </div>
    </section>`
}

function init() {
  const input = $<HTMLInputElement>('#fq')!
  const items = $$<HTMLDetailsElement>('.faq-item')
  const wrap = input.closest('.input-wrap')!
  const apply = () => {
    let n = 0
    const needle = fold(q)
    items.forEach((el) => {
      const ok = (topic === 'tout' || el.dataset.topicOf === topic) && (!needle || needle.split(/\s+/).every((w) => el.dataset.text!.includes(w)))
      el.hidden = !ok
      if (ok) n++
    })
    $$('[data-topic]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.topic === topic)))
    wrap.classList.toggle('has-value', input.value.length > 0)
    $('[data-fcount]')!.textContent = n === 0 ? 'Aucune question' : `${n} question${n > 1 ? 's' : ''}`
    $('[data-fempty]')!.hidden = n !== 0
    $('[data-faq]')!.hidden = n === 0
  }
  $$('[data-topic]').forEach((b) =>
    b.addEventListener('click', () => {
      topic = b.dataset.topic as typeof topic
      apply()
    }),
  )
  input.addEventListener('input', () => {
    q = input.value.trim()
    apply()
  })
  $('.search-clear')!.addEventListener('click', () => {
    input.value = ''
    q = ''
    apply()
    input.focus()
  })
  // Un seul panneau ouvert à la fois (sauf mouvement réduit: on laisse libre).
  if (!reducedMotion())
    items.forEach((el) =>
      el.addEventListener('toggle', () => {
        if (el.open) items.forEach((o) => o !== el && (o.open = false))
      }),
    )
  apply()
}

boot({ nav: 'faq', main, init })

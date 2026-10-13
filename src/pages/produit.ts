import { boot } from '../core/boot'
import { eur, href, html, param, setMeta } from '../core/dom'
import { icon } from '../core/icons'
import { productArt } from '../core/art'
import { productCard } from '../core/components'
import { ALLERGEN_LABEL, BUSINESS, MOMENTS, PRODUCTS, TAG_LABEL, categoryById, productById, type Product } from '../data'

const id = param('id') ?? ''
const product = productById(id)

const FEUILLETE_CATS = ['viennoiseries', 'feuillete', 'flans', 'snacking-chaud']

function notFound(): string {
  return html`
    <section class="section page-top">
      <div class="wrap">
        <div class="empty">
          ${productArt('baguette', 'empty-art')}
          <h1>Ce produit n’est plus en vitrine.</h1>
          <p class="muted">L’offre change régulièrement. Parcourez le catalogue pour voir ce qui sort du four.</p>
          <a class="btn" href="${href('boutique/')}">Voir la boutique<span class="btn-ico">${icon('arrow-right')}</span></a>
        </div>
      </div>
    </section>`
}

function priceBlock(p: Product): string {
  if (p.price === null) {
    return html`<div class="price-tag"><p class="price-tag-value mono">${p.priceNote ?? 'Prix en boutique'}</p><p class="fine muted">Le prix n’est pas affiché ici: demandez-le en boutique.</p></div>`
  }
  return html`<div class="price-tag"><p class="price-tag-value mono">${eur(p.price)}<small> / ${p.unit}</small></p>${
    p.priceSource === 'reel'
      ? '<p class="fine muted">Prix relevé auprès de sources publiques.</p>'
      : '<p class="fine muted">Prix d’exemple: la démonstration n’affiche pas les tarifs réels de la boutique.</p>'
  }</div>`
}

function body(p: Product): string {
  const cat = categoryById(p.category)
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4)
  const feuillete = FEUILLETE_CATS.includes(p.category) || p.tags.includes('feuilletage')
  return html`
    <section class="section page-top product">
      <div class="wrap">
        <nav class="crumbs mono" aria-label="Fil d’Ariane">
          <a class="link" href="${href('boutique/')}">Boutique</a><span aria-hidden="true">/</span><a class="link" href="${href(`boutique/?cat=${cat.id}`)}">${cat.label}</a>
        </nav>
        <div class="product-grid">
          <div class="product-art vt-product-art">${productArt(p.art)}</div>
          <div class="product-info">
            <span class="badges">${p.tags.map((t) => html`<span class="badge${t === 'champion' || t === 'signature' ? ' badge--gold' : ''}">${TAG_LABEL[t]}</span>`)}</span>
            <h1 class="product-title">${p.name}</h1>
            <p class="lead">${p.description}</p>
            ${priceBlock(p)}
            <dl class="specs">
              <div><dt>Catégorie</dt><dd>${cat.label}</dd></div>
              <div><dt>Allergènes</dt><dd>${p.allergens.length ? p.allergens.map((a) => ALLERGEN_LABEL[a]).join(', ') : 'Aucun déclaré dans cette démonstration'}</dd></div>
              <div><dt>Plutôt pour</dt><dd>${p.moments.length ? p.moments.map((m) => MOMENTS.find((x) => x.id === m)!.label).join(', ') : 'Toute la journée'}</dd></div>
              ${p.organic ? '<div><dt>Label</dt><dd>Fabriqué avec des farines issues de l’agriculture biologique</dd></div>' : ''}
            </dl>
            <p class="fine muted">Allergènes donnés à titre d’exemple: demandez toujours en boutique avant de commander.</p>
            <div class="product-actions">
              <a class="btn" href="tel:${BUSINESS.phone}" data-salt>Demander en boutique<span class="btn-ico">${icon('phone')}</span></a>
              <a class="btn btn--ghost" href="${href('boutique/')}">Retour au catalogue<span class="btn-ico">${icon('arrow-left')}</span></a>
            </div>
          </div>
        </div>
        ${
          feuillete
            ? html`<aside class="why-layers" data-reveal>
                <p class="eyebrow">Pourquoi c’est feuilleté</p>
                <p>Le beurre est plié dans la pâte, tour après tour. Au four, sa vapeur soulève chaque feuillet: c’est ce qui donne le croustillant dehors et le moelleux dedans. ${p.category === 'flans' ? 'Ici, la base est précuite pour rester croustillante sous la crème.' : ''}</p>
                <a class="link" href="${href('savoir-faire/')}">Le savoir-faire</a>
              </aside>`
            : ''
        }
        ${
          related.length
            ? html`<div class="related"><h2>Dans la même catégorie</h2><div class="card-grid">${related.map(productCard)}</div></div>`
            : ''
        }
      </div>
    </section>`
}

if (product) setMeta(`${product.name} | Fleur de sel, Rennes`, `${product.name}: ${product.description}`)
else setMeta('Produit introuvable | Fleur de sel, Rennes')

boot({ nav: 'boutique', main: () => (product ? body(product) : notFound()) })

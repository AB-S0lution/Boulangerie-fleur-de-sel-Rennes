import { boot } from '../core/boot'
import { html } from '../core/dom'
import { pageHero } from '../core/components'
import { BUSINESS } from '../data'

boot({
  main: () => html`
    ${pageHero({ eyebrow: 'Confidentialité', title: 'Aucun cookie, aucun traceur.' })}
    <section class="section section--tight legal">
      <div class="wrap prose">
        <h2>Ce que ce site ne fait pas</h2>
        <p>Ce site n’installe aucun cookie, n’intègre aucun outil de mesure d’audience, aucune police ni aucun script hébergé chez un tiers. Il ne contient ni formulaire, ni compte, ni paiement: nous ne collectons aucune donnée personnelle.</p>
        <h2>Ce qui reste dans votre navigateur</h2>
        <p>Les filtres, la recherche et le disque de flans fonctionnent entièrement sur votre appareil. Pour animer le passage entre deux pages dans certains navigateurs, un simple indicateur technique peut être conservé le temps de la session (sans aucune donnée personnelle), puis il disparaît à la fermeture de l’onglet.</p>
        <h2>Hébergement</h2>
        <p>Le site est servi par GitHub Pages. Comme tout hébergeur, il peut conserver des journaux techniques (adresse IP, date de la requête). Nous n’y avons pas accès.</p>
        <h2>Liens vers d’autres services</h2>
        <p>Certains liens ouvrent Instagram, Facebook, Google Maps, OpenStreetMap ou des articles de presse. Ces services ont leur propre politique de confidentialité, qui s’applique dès que vous les ouvrez.</p>
        <h2>Contact</h2>
        <p>Pour toute question, appelez la boutique au <a class="link" href="tel:${BUSINESS.phone}">${BUSINESS.phoneDisplay}</a>.</p>
      </div>
    </section>`,
})

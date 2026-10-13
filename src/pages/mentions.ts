import { boot } from '../core/boot'
import { html } from '../core/dom'
import { pageHero, photoBand } from '../core/components'
import { BUSINESS } from '../data'

const L = BUSINESS.legal
const a = BUSINESS.address

boot({
  main: () => html`
    ${pageHero({ eyebrow: 'Mentions légales', title: 'Qui est derrière ce site.' })}
    ${photoBand(['pain-planche'], 'photo-slim--single')}
    <section class="section section--tight legal">
      <div class="wrap prose">
        <h2>Nature du site</h2>
        <p>${BUSINESS.demoNotice} Il présente, à titre de proposition, l’univers de la boulangerie Fleur de sel à Rennes. Les noms, adresse, horaires, prix repères et distinctions mentionnés reposent sur des informations publiques. Tout le reste (catalogue détaillé, articles, questions fréquentes, rotation des parfums) est composé d’exemples.</p>
        <h2>Entreprise présentée</h2>
        <dl class="legal-dl">
          <div><dt>Dénomination</dt><dd>${BUSINESS.legalName}</dd></div>
          <div><dt>Forme</dt><dd>${L.form} au capital de ${L.capital}</dd></div>
          <div><dt>Immatriculation</dt><dd>${L.rcs}, SIREN ${L.siren}</dd></div>
          <div><dt>SIRET</dt><dd>${L.siret}</dd></div>
          <div><dt>Activité (NAF)</dt><dd>${L.naf}</dd></div>
          <div><dt>Siège</dt><dd>${a.street}, ${a.postalCode} ${a.city}</dd></div>
          <div><dt>Téléphone</dt><dd><a class="link" href="tel:${BUSINESS.phone}">${BUSINESS.phoneDisplay}</a></dd></div>
          <div><dt>Directeurs de publication</dt><dd>À confirmer avec les co-gérants avant toute mise en ligne officielle</dd></div>
        </dl>
        <h2>Hébergement</h2>
        <p>Ce site statique est hébergé par GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis).</p>
        <h2>Crédits</h2>
        <ul>
          <li>Toutes les illustrations (feuilletages, parts de flan, cristaux, aubes, schéma du quartier) sont des créations originales dessinées en SVG pour ce site. Aucun logo de la boutique n’est reproduit.</li>
          <li>Photos d’illustration: Unsplash (licence Unsplash), photographes crédités sous chaque image. Elles ne montrent ni la boutique, ni ses produits, ni son équipe.</li>
          <li>Polices: Schibsted Grotesk, Hanken Grotesk et Geist Mono, sous licence SIL Open Font License, distribuées par Fontsource.</li>
          <li>Icônes: Phosphor Icons, poids « light », licence MIT.</li>
          <li>Animation: GSAP (ScrollTrigger, SplitText, Flip) et Lenis pour le défilement doux.</li>
        </ul>
        <h2>Propriété et droit de réponse</h2>
        <p>Les marques, noms et distinctions cités appartiennent à leurs titulaires. Si vous êtes titulaire de droits et souhaitez une modification ou un retrait, appelez la boutique au ${BUSINESS.phoneDisplay}.</p>
      </div>
    </section>`,
})

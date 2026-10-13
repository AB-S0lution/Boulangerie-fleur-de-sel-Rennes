# Fleur de sel, Rennes: site de démonstration

Site vitrine complet pour la boulangerie Fleur de sel (161 rue de Saint-Malo, Rennes). **C'est une démonstration**: il n'est pas le site officiel de la boutique. Les faits publics (adresse, horaires, téléphone, prix repères, distinctions) sont exacts; le catalogue, les articles, la FAQ et la rotation des parfums de flan sont des **données d'exemple**. Le concept, les sources et les règles de publication sont dans `PLAN.md`.

Concept visuel « Tourage »: l'or se plie dans le sel. Toutes les images sont des illustrations SVG originales (aucune photo, aucun logo de la boutique).

## Pile technique

- Vite 8 (site multipage, un HTML par route) + TypeScript strict + Tailwind CSS v4
- GSAP (ScrollTrigger, SplitText, Flip) pour le mouvement, Lenis pour le défilement doux (pointeur précis uniquement)
- Polices Fontsource (Schibsted Grotesk, Hanken Grotesk, Geist Mono), icônes Phosphor (MIT) copiées dans `src/icons`
- Aucune dépendance d'exécution autre que gsap et lenis; pas de cookie, pas de traceur

## Scripts

```bash
npm install
npm run dev        # serveur de développement
npm run typecheck  # tsc --noEmit
npm run build      # typecheck puis build dans dist/
npm run preview    # sert dist/ sur http://localhost:4173/Boulangerie-fleur-de-sel-Rennes/
```

## Déploiement (GitHub Pages)

Le workflow `.github/workflows` construit le site et publie `dist/`. La base est `/Boulangerie-fleur-de-sel-Rennes/` (voir `vite.config.ts`). `404.html` est une page du build; `.nojekyll` est dans `public/`.

## Structure

```
index.html, boutique/, bar-a-flans/, savoir-faire/, maison/, journal/, galerie/,
infos/, faq/, le-quartier/, mentions-legales/, confidentialite/, 404.html   un HTML par route
src/pages/      un module TypeScript par page (rend le contenu dans #app)
src/core/       boot, layout (en-tête, pied, barre mobile), motion, transitions, art (SVG), composants
src/styles/     components.css (jetons, base, composants) et pages.css (une section par page)
src/data/       données typées (voir ci-dessous)
```

Les fichiers HTML ne contiennent que les métadonnées (titre, description, Open Graph, JSON-LD Bakery avec données vérifiées uniquement) et un repli sans JavaScript; le contenu est rendu par le module de la page.

## Données (`src/data`)

Chaque fichier a un commentaire d'en-tête « DONNÉES D'EXEMPLE » et des champs `source: 'reel' | 'mock'`. `index.ts` les réexporte.

| Fichier | Contenu | Éléments |
|---|---|---|
| `business.ts`, `hours.ts` | identité, horaires réels, statut ouvert/fermé (Europe/Paris), JSON-LD | réel |
| `products.ts` | catalogue en 8 catégories | 61 |
| `flans.ts`, `seasons.ts`, `limitedEditions.ts` | parfums, 4 saisons de 7, éditions limitées | 23, 4, 4 |
| `news.ts`, `press.ts`, `testimonials.ts` | journal, presse, avis Google | 17, 8, 20 |
| `faq.ts`, `glossary.ts` | questions (certaines « à confirmer »), glossaire | 16, 8 |
| `gallery.ts`, `team.ts`, `stats.ts`, `voice.ts` | galerie, équipe (rôles), chiffres, voix de marque | 18, 8, 10, 11 |
| `suppliers.ts`, `process.ts`, `quartier.ts`, `timeline.ts`, `navigation.ts` | ingrédients, gestes, quartier, histoire, menus | 5, 6, 10, 14, - |

## Mouvement et accessibilité

Héros « Avant l'aube » épinglé et scrubé (desktop), lecture automatique sur mobile; scène du tourage épinglée; panoramique horizontal des flans; disque de flan à faire tourner; transitions de page (View Transitions entre documents, rideau JS en repli). Avec `prefers-reduced-motion`, tout est statique (état « jour », grille de flans, pas de marquee animé). Seules `transform`, `opacity` et `clip-path` sont animées.

## À confirmer avant toute mise en ligne réelle

Voir `PLAN.md` (§13): jours fériés, paiement, accessibilité, commande d'un flan entier, directeurs de publication, accord pour nommer les personnes citées, fournisseurs.

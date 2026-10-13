# Fleur de sel, Rennes (démo)

- **Concept**: « Tourage », l'or se plie dans le sel. Palette: salt #F5F6F3, ink #13161C, night #0F131B, gold #D2AE5C (texte: gold-deep #7A5A12 sur clair), glow #F0D79A, schist #6B3A48. Polices Schibsted / Hanken / Geist Mono.
- **Source de vérité**: `PLAN.md` (faits, voix « nous », règles de publication). Ne pas nommer Paul Josse, pas de « partenaire majeur », pas d'horaires, prix ou avis inventés.
- **Lancer**: `npm run dev`; **vérifier**: `npm run typecheck && npm run build`, puis `npm run preview` (base `/Boulangerie-fleur-de-sel-Rennes/`).
- **Une page = un HTML + un module** `src/pages/<nom>.ts` (appelle `boot()`); la liste des routes est dans `vite.config.ts`. Ajouter une page: créer les deux et l'entrée de `pages`.
- **Particularité**: Vite retire `blocking="render"` des scripts; le plugin `blockingRender` de `vite.config.ts` le remet (nécessaire aux View Transitions).
- **Typographie**: `typo()` (src/core/dom.ts) met les espaces insécables avant `? ! ; :` et dans « »; passer tout HTML injecté par `setHTML`/`typo`.
- **Mouvement**: la classe `js-motion` (script inline) active les états initiaux; `prefers-reduced-motion` donne l'état statique. Pas de `transition: all`, pas de tiret cadratin.
- **Art**: tout est SVG original (`src/core/art.ts`); aucune photo ni logo de la boutique.
- **Données**: `src/data/*.ts`, toujours marquées exemple vs réel; le JSON-LD n'utilise que des données vérifiées.
- **Git**: ne jamais committer ni pousser sans demande.

import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Vite retire l'attribut `blocking` des scripts d'entrée. On le remet après la transformation: le contenu des pages est rendu
// par le module, et `blocking="render"` garantit que les transitions de vue entre documents trouvent la page déjà peinte.
const blockingRender = (): Plugin => ({
  name: 'blocking-render',
  enforce: 'post',
  transformIndexHtml: (html) => html.replace(/<script type="module"(?![^>]*blocking)/g, '<script type="module" blocking="render"'),
})

// GitHub Pages project site: https://ab-s0lution.github.io/Boulangerie-fleur-de-sel-Rennes/
// Site multipage: un fichier HTML par route, chacun avec son propre point d'entrée TypeScript.
const pages = {
  index: 'index.html',
  boutique: 'boutique/index.html',
  produit: 'boutique/produit.html',
  flans: 'bar-a-flans/index.html',
  savoirFaire: 'savoir-faire/index.html',
  maison: 'maison/index.html',
  journal: 'journal/index.html',
  article: 'journal/article.html',
  galerie: 'galerie/index.html',
  infos: 'infos/index.html',
  faq: 'faq/index.html',
  quartier: 'le-quartier/index.html',
  mentions: 'mentions-legales/index.html',
  confidentialite: 'confidentialite/index.html',
  notFound: '404.html',
}

export default defineConfig({
  base: '/Boulangerie-fleur-de-sel-Rennes/',
  plugins: [tailwindcss(), blockingRender()],
  build: {
    rollupOptions: {
      input: pages,
    },
  },
})

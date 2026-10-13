// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// 100 % RÉEL: citations d'avis Google relevées sur des miroirs publics (PLAN.md §4.5), orthographe d'origine
// conservée (« gjanduja » compris). Attribuées à la plateforme uniquement: AUCUN nom d'auteur, jamais.
// À recontrôler sur Google avant mise en ligne. Les plaintes (C1 à C3) ne sont volontairement pas publiées.
// Note globale: environ 4,8/5 pour 279 avis (miroirs, octobre 2026). À afficher « 4,8 sur Google, 270+ avis ».

export type Theme = 'flan' | 'viennoiserie' | 'equipe' | 'boutique' | 'prix' | 'sel' | 'metier' | 'snacking' | 'nouveautes'

export interface Testimonial {
  id: string
  text: string
  attribution: 'Avis Google'
  date: string
  dateLabel: string
  theme: Theme
  about?: string
  source: 'reel'
}

const t = (
  id: string,
  text: string,
  date: string,
  dateLabel: string,
  theme: Theme,
  about?: string,
): Testimonial => ({ id, text, attribution: 'Avis Google', date, dateLabel, theme, about, source: 'reel' })

export const RATING = { value: 4.8, outOf: 5, count: 279, display: '4,8 sur Google, 270+ avis', asOf: '2026-10-05' }

export const TESTIMONIALS: Testimonial[] = [
  t('q01', "Le meilleur flan de la ville se trouve ici, surtout celui à la pistache.", '2026-06-22', 'juin 2026', 'flan', 'Flan pistache'),
  t('q02', "Le flan chocolat sarrasin était une tuerie… parmi les meilleurs flans que j'ai eu l'occasion de goûter", '2026-02-08', 'février 2026', 'flan', 'Flan chocolat sarrasin'),
  t('q03', "les flans signatures… sont devenus des incontournables de Rennes !", '2026-06-24', 'juin 2026', 'flan'),
  t('q04', "toujours avec cette note de fleur de sel dans chaque produit quel régal !", '2026-06-24', 'juin 2026', 'sel'),
  t('q05', "Le rapport qualité prix défie toute concurrence.", '2026-06-24', 'juin 2026', 'prix'),
  t('q06', "Une boulangerie de caractère ! Les pâtisseries sont à tomber", '2025-11-18', 'novembre 2025', 'boutique'),
  t('q07', "cette boulangerie est pour nous une référence à Rennes. La deco est épurée, très moderne", '2025-11-18', 'novembre 2025', 'boutique'),
  t('q08', "On sent la passion et la qualité dans chaque produit. Impossible de repartir les mains vides !", '2025-10-24', 'octobre 2025', 'boutique'),
  t('q09', "Équipe accueillante et dynamique, boutique superbe et flans signature absolument délicieux !", '2025-10-10', 'octobre 2025', 'equipe'),
  t('q10', "J'ai aussi testé le croissant - burger. Une réussite ! Je reviendrai", '2025-10-10', 'octobre 2025', 'snacking', 'Croissant burger'),
  t('q11', "Étant moi-même du métier… là franchement, il y a du niveau.", '2026-08-14', 'août 2026', 'metier'),
  t('q12', "On sent qu'ici le snacking n'est clairement pas traité comme un produit secondaire.", '2026-08-14', 'août 2026', 'snacking'),
  t('q13', "la première fois que je n'ai absolument rien à redire. C'était tout simplement excellent !", '2026-01-01', 'sans date précise', 'flan', 'Flan pistache'),
  t('q14', "Ils sont goûteux. Je suis conquise, je reviendrai !", '2026-03-07', 'mars 2026', 'viennoiserie'),
  t('q15', "C'est original, parfaitement maîtrisé et surtout terriblement bon.", '2026-08-14', 'août 2026', 'flan', 'Flans et pâte à croissant'),
  t('q16', "Une adresse qui mérite largement sa réputation.", '2026-08-14', 'août 2026', 'boutique'),
  t('q17', 'J\'adore les flans pâtissiers traditionnels mais les flans de " fleur de sel " sont différents et très bons.', '2026-02-18', 'février 2026', 'flan'),
  t('q18', "Les viennoiseries (suisse, pain au gjanduja, strié coeur coulant) étaient parfaites.", '2026-02-08', 'février 2026', 'viennoiserie'),
  t('q19', "L'offre de viennoiseries et de sandwichs change régulièrement pour toujours avoir une nouvelle chose à déguster.", '2025-10-24', 'octobre 2025', 'nouveautes'),
  t('q20', "Le pain suisse etait super bon également !", '2026-03-29', 'mars 2026', 'viennoiserie', 'Pain suisse'),
]

/** Mots de clients à faire défiler dans le (seul) bandeau du site. Fragments de citations réelles ci-dessus. */
export const CUSTOMER_WORDS = [
  'une tuerie',
  'à tomber',
  'quel régal',
  'impossible de repartir les mains vides',
  'une référence à Rennes',
  'une boulangerie de caractère',
  'conquise',
  'des incontournables',
  'il y a du niveau',
  'une réussite',
]

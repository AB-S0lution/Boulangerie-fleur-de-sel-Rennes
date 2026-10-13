// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// 15 articles `kind: 'reel'`: des événements RÉELS (dates exactes, PLAN.md §2) racontés sous forme d'actualité. Le texte est
// rédigé pour le site à partir de faits publics; les citations entre guillemets viennent de la presse ou de la boutique.
// 2 articles `kind: 'editorial'`: contenus pédagogiques d'exemple (MOCK).
// Garde-fous: l'employé 2e du Master n'est PAS nommé (permission à demander); l'Open Blot est « partenaire », jamais « majeur »;
// la carte de fidélité est « annoncée », jamais présentée comme disponible; aucune durée n'est donnée aux éditions limitées.
// Le « carnet de recettes de la rentrée » est une image réelle dont le contenu est inconnu: l'article est un simple mot de rentrée.

import type { ArtKey } from './products'

export type NewsCategory = 'Actu' | 'Coulisses' | 'Saison' | 'Quartier'

export interface NewsPost {
  slug: string
  title: string
  date: string
  dateLabel: string
  category: NewsCategory
  kind: 'reel' | 'editorial'
  excerpt: string
  body: string[]
  art: ArtKey | 'dawn' | 'flan-slice' | 'layers' | 'salt'
  readMinutes: number
  ref?: string
  /** Fait à vérifier ou à demander avant publication */
  todo?: string
}

export const NEWS_CATEGORIES: NewsCategory[] = ['Actu', 'Coulisses', 'Saison', 'Quartier']

export const NEWS: NewsPost[] = [
  {
    slug: 'ouverture-8-juillet-2025',
    title: 'Fleur de sel ouvre ses portes à 6 h 30',
    date: '2025-07-08',
    dateLabel: '8 juillet 2025',
    category: 'Actu',
    kind: 'reel',
    excerpt: 'Un mardi matin, au 161 rue de Saint-Malo, la boulangerie d’un chef tourier et d’un boulanger accueille ses premiers clients.',
    body: [
      'Le mardi 8 juillet 2025, à 6 h 30, la porte du 161 rue de Saint-Malo s’ouvre pour la première fois. À l’angle du boulevard de Verdun, dans le quartier Saint-Martin, l’ancienne boulangerie a été remise à blanc, avec un logo doré.',
      'Derrière le comptoir, deux boulangers qui se sont rencontrés chez Maison Fraudin à Saint-Grégoire: Baptiste Cortais, chef tourier, 1er prix du premier concours national du Meilleur Croissant au Beurre en 2019, et Mathis Ruelleux, boulanger, meilleur croissant au beurre de Bretagne en 2022.',
      'Leur idée: décliner la pâtisserie en viennoiserie. Pas d’entremets classique, mais des éclairs, des religieuses et des flans réinventés en pâte à croissant ou à brioche. Et du pain bio au levain, comme un fil rouge.',
    ],
    art: 'dawn',
    readMinutes: 2,
    ref: 'https://unidivers.fr/fleur-de-sel-rennes-rue-saint-malo/',
  },
  {
    slug: 'on-a-dormi-sur-un-sac-de-farine',
    title: '« On a dormi sur un sac de farine ! »',
    date: '2025-07-14',
    dateLabel: '14 juillet 2025',
    category: 'Coulisses',
    kind: 'reel',
    excerpt: 'Le jour de l’ouverture a duré de une heure du matin à vingt heures. Le récit de Baptiste Cortais au Télégramme.',
    body: [
      'Pour le premier jour, la maison n’a presque pas dormi: « on fait une journée d’1 h du matin à 20 h le soir et on a dormi sur un sac de farine ! », raconte Baptiste Cortais au Télégramme.',
      'Le chantier a été mené vite: toutes les machines ont été remplacées, les locaux partiellement rénovés. « L’objectif était de repartir de zéro, on a fait une devanture épurée avec une couleur blanche et un logo doré. Il fallait du nouveau. »',
      'Au fournil, il a fallu aussi du temps pour le croissant: « il aura tout de même fallu deux ans de mise au point, en modifiant des paramètres tous les jours ».',
    ],
    art: 'layers',
    readMinutes: 2,
    ref: 'https://www.letelegramme.fr/ille-et-vilaine/rennes-35000/on-a-dormi-sur-un-sac-de-farine-ces-rois-du-croissant-ouvrent-une-nouvelle-boulangerie-a-rennes-6854016.php',
  },
  {
    slug: 'le-flan-dans-le-guide-de-l-office-de-tourisme',
    title: 'Le flan entre dans le guide de l’office de tourisme',
    date: '2025-09-26',
    dateLabel: '26 septembre 2025',
    category: 'Actu',
    kind: 'reel',
    excerpt: '« Où trouver les meilleurs flans de Rennes ? » Notre bar à flans y est cité, avec neuf parfums.',
    body: [
      'Destination Rennes, l’office de tourisme de la ville, publie un guide consacré au flan pâtissier. Fleur de sel y figure avec ses parfums: chocolat, sarrasin, pistache, coco, framboise, fraise, noisette, citron et vanille.',
      'Le guide résume notre flan en trois mots: « En un mot : miam ! » Il est tenu à jour: la dernière mise à jour date du 22 septembre 2026, avec un prix de 3,90 € la part.',
    ],
    art: 'flan-slice',
    readMinutes: 1,
    ref: 'https://www.tourisme-rennes.com/decouvrir-rennes/gastronomie/flan-patissier/',
  },
  {
    slug: 'snacking-chaud-3-octobre-2025',
    title: 'Le snacking chaud arrive en pâte à croissant',
    date: '2025-10-03',
    dateLabel: '3 octobre 2025',
    category: 'Actu',
    kind: 'reel',
    excerpt: 'Hot dog, croissant burger, Burg’œuf: la pâte feuilletée passe au salé, réchauffée au four.',
    body: [
      'Le vendredi 3 octobre 2025, la boutique lance sa première gamme de snacking chaud. Au menu: un hot dog en pâte à croissant, une brioche suisse à la fondue de poireaux et au saumon, un croissant burger et un Burg’œuf.',
      'Ce dernier est un petit pain laminé avec un œuf au plat, une sauce tartare, du cheddar et du bacon fumé. Les produits sont réchauffés dans un four compact.',
      'Les clients ne s’y sont pas trompés: « le snacking n’est clairement pas traité comme un produit secondaire », écrit l’un d’eux dans un avis Google.',
    ],
    art: 'burger',
    readMinutes: 1,
    ref: 'https://www.latoque.fr/snacking/article/890453/fleur-de-sel-le-croissant-en-fil-rouge',
  },
  {
    slug: 'latoque-le-croissant-en-fil-rouge',
    title: 'LaToque: « Le croissant en fil rouge »',
    date: '2025-11-21',
    dateLabel: '21 novembre 2025',
    category: 'Coulisses',
    kind: 'reel',
    excerpt: 'Le magazine professionnel visite le fournil et raconte la maison de l’intérieur.',
    body: [
      'En novembre 2025, le magazine LaToque consacre un portrait à la boutique. Il rappelle que l’équipe a « déjà explosé son prévisionnel » en trois mois.',
      'On y apprend aussi que le pétrin est un modèle spiral, car « plus on a de volume au pétrissage, plus la pâte sera de qualité », selon Baptiste Cortais, et que les farines torréfiées viennent de Vallée Torréfaction.',
      'Le titre de l’article le dit bien: le croissant est le fil rouge. « Avant tout, un goût de beurre. »',
    ],
    art: 'croissant',
    readMinutes: 2,
    ref: 'https://www.latoque.fr/snacking/article/890453/fleur-de-sel-le-croissant-en-fil-rouge',
  },
  {
    slug: 'master-regional-du-meilleur-pain-au-chocolat',
    title: 'Une place de 2e au Master régional du pain au chocolat',
    date: '2026-04-09',
    dateLabel: '9 avril 2026',
    category: 'Actu',
    kind: 'reel',
    excerpt: 'Un membre de l’équipe termine deuxième à Ploufragan. Les cinq premiers vont en finale nationale à Paris.',
    body: [
      'Le 9 avril 2026, à Ploufragan, un membre de notre équipe a terminé deuxième du Master régional du Meilleur Pain au Chocolat, pour la Bretagne.',
      'Les cinq premiers sont qualifiés pour la finale nationale, qui doit se tenir à Paris le 29 octobre 2026. Nous vous tiendrons au courant du résultat.',
      'Pour Mathis Ruelleux, les concours sont « un bon levier pour progresser, s’évaluer et sortir la tête du quotidien ».',
    ],
    art: 'pain-chocolat',
    readMinutes: 1,
    ref: 'https://www.instagram.com/p/DW7RvvLDMb3',
    todo: 'Demander l’autorisation de nommer la personne avant de publier son nom.',
  },
  {
    slug: 'une-premiere-bougie',
    title: 'Une première bougie',
    date: '2026-07-08',
    dateLabel: '8 juillet 2026',
    category: 'Actu',
    kind: 'reel',
    excerpt: '365 jours plus tard. Merci d’être là depuis le premier jour, ou de nous avoir rejoints en chemin.',
    body: [
      '« 365 jours plus tard… Difficile de résumer cette première année en quelques lignes. Une chose est sûre: rien de tout cela n’aurait la même saveur sans vous. »',
      'Pour fêter cette première bougie, plusieurs surprises ont été annoncées par la boutique. Elles ont démarré le dimanche suivant.',
    ],
    art: 'cake',
    readMinutes: 1,
    ref: 'https://www.instagram.com/p/DaiZvxmCAEg/',
    todo: 'Le détail des surprises n’est pas connu: ne pas l’inventer.',
  },
  {
    slug: 'flans-dolce-vita-avec-fratelli-peruzzi',
    title: 'Dolce Vita: deux flans avec Fratelli Peruzzi',
    date: '2026-07-16',
    dateLabel: '16 juillet 2026',
    category: 'Actu',
    kind: 'reel',
    excerpt: 'Un gianduja et un citron, en édition limitée, imaginés avec le groupe italien de Supino et Ciao Bella.',
    body: [
      '« Quando l’Italia rencontre Rennes… Deux recettes, une même passion du goût… » Le 16 juillet 2026, nous dévoilons, avec nos amis de Fratelli Peruzzi (Supino, rue Saint-Mélaine, et Ciao Bella, rue du Maréchal Joffre), deux flans en édition limitée.',
      'Le premier est au gianduja, le second au citron. « Un dessert qui sent la dolce vita, à savourer avant qu’il ne disparaisse. »',
      'Les deux flans sont vendus à emporter chez Fleur de sel, au prix habituel de 3,90 € la part.',
    ],
    art: 'flan-slice',
    readMinutes: 1,
    ref: 'https://www.instagram.com/reel/Da3Er5rh-My',
  },
  {
    slug: 'bonne-rentree',
    title: 'Bonne rentrée à toutes et à tous',
    date: '2026-08-31',
    dateLabel: '31 août 2026',
    category: 'Saison',
    kind: 'reel',
    excerpt: 'Petit-déjeuner entre collègues, pause déjeuner, goûter bien mérité: on s’occupe du reste.',
    body: [
      'À la rentrée, nous serons là pour vous accompagner tout au long de la journée: petit-déjeuner entre collègues, pause déjeuner, ou goûter bien mérité après le travail.',
      '« Bon courage pour la reprise, on s’occupe du reste ! »',
    ],
    art: 'salt',
    readMinutes: 1,
    ref: 'https://www.instagram.com/fleurdesel_rennes/',
  },
  {
    slug: 'celui-qui-met-tout-le-monde-d-accord',
    title: 'Celui qui met tout le monde d’accord',
    date: '2026-09-04',
    dateLabel: '4 septembre 2026',
    category: 'Saison',
    kind: 'reel',
    excerpt: 'Le flan framboise, avec ses framboises fraîches, est le flan le plus plébiscité de la boutique.',
    body: [
      '« Celui qui met tout le monde d’accord. » Notre flan framboise, avec ses framboises fraîches, est depuis longtemps l’un des grands favoris de Fleur de sel. C’est même le flan le plus plébiscité de la boutique.',
      'Il est affiché à 3,90 € la part, comme tous nos flans.',
    ],
    art: 'flan-slice',
    readMinutes: 1,
    ref: 'https://www.instagram.com/p/Dc3xm6RIFwR/',
  },
  {
    slug: 'open-blot-rennes-du-four-au-court',
    title: 'Du four au court: l’Open Blot Rennes',
    date: '2026-09-17',
    dateLabel: '14 au 20 septembre 2026',
    category: 'Quartier',
    kind: 'reel',
    excerpt: 'Partenaire de l’Open Blot Rennes, nous animons un atelier de dégustation dans les salons VIP.',
    body: [
      'Du 14 au 20 septembre 2026, le tournoi de tennis Open Blot Rennes (ATP Challenger, au Liberté) a compté Fleur de sel parmi ses partenaires.',
      '« Du four au court. » Nous y avons animé un atelier de dégustation dans les salons VIP, aux côtés d’autres adresses rennaises.',
    ],
    art: 'cookie',
    readMinutes: 1,
    ref: 'https://www.instagram.com/p/DdjkKHGiFqQ/',
  },
  {
    slug: 'braderie-du-canal-saint-martin',
    title: 'Dimanche, dès l’aube: la Braderie du Canal Saint-Martin',
    date: '2026-09-20',
    dateLabel: '20 septembre 2026',
    category: 'Quartier',
    kind: 'reel',
    excerpt: 'Un stand rue Lenoir dès 6 h, et la boutique ouverte jusqu’à 17 h.',
    body: [
      'Le dimanche 20 septembre, jour de la braderie du quartier, nous tenions un stand rue Lenoir dès 6 h: viennoiseries, pâtisseries de voyage, cookies, mi-cuits, cakes, brioches, panettones… et du café.',
      'La boutique, ce jour-là seulement, est restée ouverte de 6 h 30 à 17 h. « On vous attend dimanche, dès l’aube. »',
    ],
    art: 'cake',
    readMinutes: 1,
    ref: 'https://www.instagram.com/p/DdWp7-ziM2i/',
  },
  {
    slug: 'le-flan-de-la-communaute',
    title: 'Vous l’avez imaginé, on l’a fait: le flan de la communauté',
    date: '2026-09-30',
    dateLabel: '30 septembre 2026',
    category: 'Actu',
    kind: 'reel',
    excerpt: 'Le flan idéal de nos abonnés, pistache et framboise, est devenu un vrai flan en édition limitée.',
    body: [
      'Nous avons demandé en commentaire: quel serait votre flan idéal? L’idée la plus aimée, pistache et framboise, a été proposée par l’un de nos abonnés.',
      '« Vous l’avez imaginé, vous l’avez plébiscité, on l’a fait. » Et ce n’est que le début: plusieurs nouveautés arrivent très bientôt chez FDS.',
    ],
    art: 'flan-slice',
    readMinutes: 1,
    ref: 'https://www.instagram.com/p/Dd6xpYrjj-y/',
  },
  {
    slug: 'une-carte-de-fidelite-se-prepare',
    title: 'Votre fidélité mérite bien sa carte',
    date: '2026-10-04',
    dateLabel: '4 octobre 2026',
    category: 'Actu',
    kind: 'reel',
    excerpt: 'Un programme de fidélité se prépare. Il n’est pas encore disponible.',
    body: [
      'Nous préparons un programme de fidélité. Dans les prochaines semaines, chaque achat vous permettra de cumuler des avantages sur votre carte, et ils seront cumulables.',
      'Il n’est pas encore en place. Nous vous le dirons ici et sur Instagram dès qu’il le sera.',
    ],
    art: 'salt',
    readMinutes: 1,
    ref: 'https://www.instagram.com/fleurdesel_rennes/',
    todo: 'Programme annoncé, pas en service. Mettre à jour dès son lancement.',
  },
  {
    slug: 'erable-pecan-edition-limitee',
    title: 'Sirop d’érable noix de pécan: la nouvelle édition limitée',
    date: '2026-10-07',
    dateLabel: '7 octobre 2026',
    category: 'Saison',
    kind: 'reel',
    excerpt: 'Une proposition de l’équipe. Sa légende Instagram promet « le meilleur flan de toute l’histoire ».',
    body: [
      'Le 7 octobre 2026, notre nouvelle édition limitée arrive: un flan au sirop d’érable et aux noix de pécan.',
      'Sa légende sur Instagram est sans détour: « c’est le meilleur flan de toute l’histoire ». À vous de juger, à 3,90 € la part.',
    ],
    art: 'flan-slice',
    readMinutes: 1,
    ref: 'https://www.instagram.com/p/DeMvICyDhlH/',
  },
  {
    slug: 'pourquoi-notre-pain-pese-600-grammes',
    title: 'Pourquoi nos pains pèsent 600 à 700 grammes',
    date: '2026-09-12',
    dateLabel: '12 septembre 2026',
    category: 'Coulisses',
    kind: 'editorial',
    excerpt: 'Un pain de campagne généreux, quinze heures de fermentation: ce que le poids raconte.',
    body: [
      'Nos pains au levain se situent autour de 600 à 700 grammes. Ce n’est pas un hasard: un pain de cette taille garde plus longtemps son humidité et sa mie reste fraîche plusieurs jours.',
      'Le levain travaille environ quinze heures. Plus la fermentation est longue, plus le goût se développe. Voilà pourquoi nous préférons un pain qui prend son temps.',
      'Le bara, notre pain breton, ajoute du blé noir et un sel de Guérande. La tourte de seigle, elle, se tient quelques jours de plus. Et pour la baguette tradition, seule exception non bio, la tradition reste notre repère.',
    ],
    art: 'boule',
    readMinutes: 2,
    todo: 'Article éditorial d’exemple. Faire relire les détails techniques par la boulangerie.',
  },
  {
    slug: 'le-tourage-explique',
    title: 'Le tourage expliqué',
    date: '2026-08-20',
    dateLabel: '20 août 2026',
    category: 'Coulisses',
    kind: 'editorial',
    excerpt: 'Comment une pâte et un beurre deviennent des dizaines de feuillets.',
    body: [
      'Le tourage est une série de plis. On enferme une plaque de beurre dans la pâte, puis on étire et on plie. Un « tour simple » donne trois couches, un second tour neuf, un troisième vingt-sept: les couches se multiplient à chaque pli.',
      'Au four, l’eau du beurre se transforme en vapeur. Elle soulève les feuillets l’un après l’autre, et c’est ce qui crée l’alvéolage régulier du croissant.',
      'Chez nous, ce savoir-faire sert aussi à autre chose que le croissant: les éclairs en pâte à croissant, les tartelettes et la base croustillante de nos flans.',
    ],
    art: 'layers',
    readMinutes: 2,
    todo: 'Article pédagogique d’exemple: le nombre de tours exact de la maison n’est pas public.',
  },
]

export const postBySlug = (slug: string): NewsPost | undefined => NEWS.find((n) => n.slug === slug)

export const sortedNews = (): NewsPost[] => [...NEWS].sort((a, b) => b.date.localeCompare(a.date))

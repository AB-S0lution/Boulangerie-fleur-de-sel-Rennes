// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// RÉEL: lignes tirées des légendes Instagram de la boutique (relues le 2026-10-13), donc sa propre voix.
// `needsApproval: true` partout: à faire valider par l'équipe avant la mise en ligne.
// Garde-fou: le site parle en « nous / l'équipe Fleur de sel ». La première personne du community manager reste sur Instagram.

export interface VoiceLine {
  id: string
  text: string
  usage: 'hero' | 'section' | 'empty' | '404' | 'footer' | 'cta'
  ref: string
  needsApproval: true
}

export const VOICE: VoiceLine[] = [
  {
    id: 'pain',
    text: 'Il y a les grands discours. Et puis il y a le pain.',
    usage: 'section',
    ref: 'https://www.instagram.com/p/DdJx6a2CJYD/',
    needsApproval: true,
  },
  {
    id: 'pain-suite',
    text: 'Une tradition façonnée chaque jour chez Fleur de sel, avec le temps, le geste et le goût comme seuls repères.',
    usage: 'section',
    ref: 'https://www.instagram.com/p/DdJx6a2CJYD/',
    needsApproval: true,
  },
  {
    id: 'framboise',
    text: 'Celui qui met tout le monde d’accord.',
    usage: 'section',
    ref: 'https://www.instagram.com/p/Dc3xm6RIFwR/',
    needsApproval: true,
  },
  {
    id: 'aube',
    text: 'Un croissant, ça se mérite. Chez Fleur de sel, il commence bien avant l’aube.',
    usage: 'hero',
    ref: 'https://www.instagram.com/reel/DMasy4ioRwC/',
    needsApproval: true,
  },
  {
    id: 'dimanche',
    text: 'On vous attend dimanche, dès l’aube.',
    usage: 'cta',
    ref: 'https://www.instagram.com/p/DdWp7-ziM2i/',
    needsApproval: true,
  },
  {
    id: 'fidelite',
    text: 'Votre fidélité mérite bien sa carte.',
    usage: 'cta',
    ref: 'https://www.instagram.com/p/DeFAyiHCD3j/',
    needsApproval: true,
  },
  {
    id: 'lieu',
    text: 'Un lieu pensé pour accueillir, servir, et faire place au produit.',
    usage: 'section',
    ref: 'https://www.instagram.com/p/DX7C_PUCJXt',
    needsApproval: true,
  },
  {
    id: 'saveur',
    text: 'Rien de tout cela n’aurait la même saveur sans vous.',
    usage: 'footer',
    ref: 'https://www.instagram.com/p/DaiZvxmCAEg/',
    needsApproval: true,
  },
  {
    id: 'reste',
    text: 'On s’occupe du reste !',
    usage: 'empty',
    ref: 'https://www.instagram.com/fleurdesel_rennes/',
    needsApproval: true,
  },
  {
    id: 'four-au-court',
    text: 'Du four au court.',
    usage: 'section',
    ref: 'https://www.instagram.com/p/DdjkKHGiFqQ/',
    needsApproval: true,
  },
  {
    id: 'imagine',
    text: 'Vous l’avez imaginé, vous l’avez plébiscité, on l’a fait.',
    usage: 'section',
    ref: 'https://www.instagram.com/p/Dd6xpYrjj-y/',
    needsApproval: true,
  },
]

export const voice = (id: string): string => {
  const v = VOICE.find((x) => x.id === id)
  if (!v) throw new Error(`Ligne de voix inconnue: ${id}`)
  return v.text
}

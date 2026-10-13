// DONNÉES D'EXEMPLE: à remplacer par les données réelles de la boutique.
// Les horaires hebdomadaires sont RÉELS (PLAN.md §1, recoupés par 5+ sources, dont la banque de la boutique).
// Le dimanche ferme à 12 h 30 (certains annuaires disent 13 h: périmé).
// `exceptions` est vide à dessein: les jours fériés (« toujours fermée », source unique) sont à confirmer.

export interface DayHours {
  /** 0 = dimanche … 6 = samedi (convention JS) */
  dayIndex: number
  label: string
  short: string
  /** minutes depuis minuit, null si fermé */
  opens: number | null
  closes: number | null
}

export interface HoursException {
  date: string
  label: string
  opens: number | null
  closes: number | null
  source: 'reel' | 'mock'
}

const h = (hh: number, mm = 0) => hh * 60 + mm

export const HOURS: DayHours[] = [
  { dayIndex: 1, label: 'Lundi', short: 'Lun', opens: null, closes: null },
  { dayIndex: 2, label: 'Mardi', short: 'Mar', opens: h(6, 30), closes: h(19) },
  { dayIndex: 3, label: 'Mercredi', short: 'Mer', opens: h(6, 30), closes: h(19) },
  { dayIndex: 4, label: 'Jeudi', short: 'Jeu', opens: h(6, 30), closes: h(19) },
  { dayIndex: 5, label: 'Vendredi', short: 'Ven', opens: h(6, 30), closes: h(19) },
  { dayIndex: 6, label: 'Samedi', short: 'Sam', opens: h(6, 30), closes: h(14, 30) },
  { dayIndex: 0, label: 'Dimanche', short: 'Dim', opens: h(6, 30), closes: h(12, 30) },
]

/** TODO(boutique): jours fériés et fermetures annuelles à confirmer. */
export const EXCEPTIONS: HoursException[] = [
  {
    date: '2026-09-20',
    label: 'Dimanche de la Braderie du Canal Saint-Martin: boutique ouverte jusqu’à 17 h',
    opens: h(6, 30),
    closes: h(17),
    source: 'reel',
  },
]

export const HOLIDAY_NOTE =
  'Fermé les jours fériés (information relevée dans la presse locale, à confirmer auprès de la boutique).'

export function formatMinutes(total: number): string {
  const hh = Math.floor(total / 60)
  const mm = total % 60
  return mm === 0 ? `${hh} h` : `${hh} h ${String(mm).padStart(2, '0')}`
}

export function formatRange(d: DayHours): string {
  if (d.opens === null || d.closes === null) return 'Fermé'
  return `${formatMinutes(d.opens)} à ${formatMinutes(d.closes)}`
}

/** Heure et jour courants à Paris, indépendamment du fuseau du visiteur. */
export function parisNow(date = new Date()): { dayIndex: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return {
    dayIndex: map[get('weekday')] ?? 0,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

export interface OpenStatus {
  open: boolean
  text: string
  detail: string
}

export function getStatus(date = new Date()): OpenStatus {
  const { dayIndex, minutes } = parisNow(date)
  const today = HOURS.find((d) => d.dayIndex === dayIndex)!
  if (today.opens !== null && today.closes !== null) {
    if (minutes >= today.opens && minutes < today.closes) {
      return {
        open: true,
        text: `Ouvert jusqu’à ${formatMinutes(today.closes)}`,
        detail: `Aujourd’hui ${formatRange(today)}`,
      }
    }
    if (minutes < today.opens) {
      return {
        open: false,
        text: `Ouvre à ${formatMinutes(today.opens)}`,
        detail: `Aujourd’hui ${formatRange(today)}`,
      }
    }
  }
  // Prochain jour ouvert
  for (let i = 1; i <= 7; i++) {
    const next = HOURS.find((d) => d.dayIndex === (dayIndex + i) % 7)!
    if (next.opens !== null) {
      const when = i === 1 ? 'demain' : next.label.toLowerCase()
      const prefix = today.opens === null ? `Fermé le ${today.label.toLowerCase()}` : 'Fermé'
      return {
        open: false,
        text: `${prefix}, rouvre ${when} à ${formatMinutes(next.opens)}`,
        detail: `${next.label} ${formatRange(next)}`,
      }
    }
  }
  return { open: false, text: 'Fermé', detail: '' }
}

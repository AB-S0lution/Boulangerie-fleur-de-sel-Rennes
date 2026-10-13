// Icônes Phosphor (poids « light », licence MIT, voir src/icons/LICENSE-phosphor). Une seule famille, un seul poids.
import arrowUpRight from '../icons/arrow-up-right.svg?raw'
import arrowRight from '../icons/arrow-right.svg?raw'
import arrowLeft from '../icons/arrow-left.svg?raw'
import arrowDown from '../icons/arrow-down.svg?raw'
import phone from '../icons/phone.svg?raw'
import mapPin from '../icons/map-pin.svg?raw'
import instagram from '../icons/instagram-logo.svg?raw'
import facebook from '../icons/facebook-logo.svg?raw'
import list from '../icons/list.svg?raw'
import x from '../icons/x.svg?raw'
import search from '../icons/magnifying-glass.svg?raw'
import clock from '../icons/clock.svg?raw'
import bus from '../icons/bus.svg?raw'
import train from '../icons/train.svg?raw'
import tram from '../icons/tram.svg?raw'
import heart from '../icons/heart.svg?raw'
import plus from '../icons/plus.svg?raw'
import minus from '../icons/minus.svg?raw'
import caretLeft from '../icons/caret-left.svg?raw'
import caretRight from '../icons/caret-right.svg?raw'
import caretDown from '../icons/caret-down.svg?raw'
import check from '../icons/check.svg?raw'
import sparkle from '../icons/sparkle.svg?raw'
import moon from '../icons/moon.svg?raw'

const ICONS = {
  'arrow-up-right': arrowUpRight,
  'arrow-right': arrowRight,
  'arrow-left': arrowLeft,
  'arrow-down': arrowDown,
  phone,
  'map-pin': mapPin,
  instagram,
  facebook,
  list,
  x,
  search,
  clock,
  bus,
  train,
  tram,
  heart,
  plus,
  minus,
  'caret-left': caretLeft,
  'caret-right': caretRight,
  'caret-down': caretDown,
  check,
  sparkle,
  moon,
} as const

export type IconName = keyof typeof ICONS

export const icon = (name: IconName, cls = ''): string =>
  `<span class="icon ${cls}" aria-hidden="true">${ICONS[name]}</span>`

import {
  Clapperboard,
  HeartPulse,
  HelpCircle,
  Plane,
  Receipt,
  ShoppingBag,
  Car,
  UtensilsCrossed,
} from 'lucide-react'

const CATEGORY_ICONS = {
  Food: UtensilsCrossed,
  Transport: Car,
  Shopping: ShoppingBag,
  Bills: Receipt,
  Entertainment: Clapperboard,
  Health: HeartPulse,
  Travel: Plane,
  Other: HelpCircle,
}

export function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] ?? HelpCircle
}

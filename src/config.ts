import { Theme } from "./Theme"

export const sets = {
  "151": 398,
  base: 102,
  fossil: 64,
  jungle: 82,
  "base set 2": 100,
}

export const attributes = [
  "Standard",
  "Standard Holographic",
  "Reverse Holographic",
  "Special",
  "EX",
  "Trainer",
  "Energy",
  "Full Art",
  "Gold",
  "Metal",
]

export const attributeColour: Record<string, any> = {
  standard: Theme.primaryText,
  "standard holographic": Theme.standardHolographic,
  "reverse holographic": Theme.reverseHolographic,
  special: Theme.special,
}

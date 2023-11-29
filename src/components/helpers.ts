import { Theme } from "../Theme"

export const upperCaseFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substring(1)
}

export const typeColours: Record<string, any> = {
  normal: "#a8a878",
  fire: "#f08030",
  water: "#6790f0",
  grass: "#78c84f",
  electric: "#f9cf30",
  ice: "#98d8d8",
  fighting: "#c03028",
  poison: "#9f40a0",
  ground: "#e0c068",
  flying: "#a890f0",
  psychic: "#f85888",
  bug: "#a8b720",
  rock: "#b8a039",
  ghost: "#705898",
  dragon: "#7038f8",
  dark: "#705848",
  steel: "#b8b8d0",
  fairy: "#f0b6bc",
}

export const attributeColour: Record<string, any> = {
  standard: Theme.primaryText,
  "standard holographic": Theme.standardHolographic,
  "reverse holographic": Theme.reverseHolographic,
  special: Theme.special,
}

export enum View {
  READ = "read",
  EDIT = "edit",
}

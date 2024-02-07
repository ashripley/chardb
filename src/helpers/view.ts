export type ReadOrEditView = "Read" | "Edit"
export type CardViewType = "Grid" | "List" | "Tile"
export type FilterViewType = "id" | "name" | "type" | "year" | "attribute"
export type PageType = "Home" | "Info" | "Cards" | "Pokedex"
export const isMobile = window.matchMedia(
  "only screen and (max-width: 760px)"
).matches

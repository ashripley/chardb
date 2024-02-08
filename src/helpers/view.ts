export type ReadOrEditView = "Read" | "Edit"
export type CardViewType = "Grid" | "List" | "Tile"
export type FilterViewType = "id" | "name" | "type" | "year" | "attribute"
export type PageType = "Home" | "Info" | "Cards" | "Pokedex"
export type DbType = "char" | "squir" | "bulb"

export const isMobile = window.matchMedia(
  "only screen and (max-width: 760px)"
).matches
export const sxColourMap: Record<
  string,
  "warning" | "success" | "info" | "error" | "primary" | "secondary" | undefined
> = {
  char: "warning",
  bulb: "success",
  squir: "info",
}

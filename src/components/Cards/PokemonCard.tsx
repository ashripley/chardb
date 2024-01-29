import { useEffect, useState } from "react"
import { GridView } from "../Views/Grid"
import { ListView } from "../Views/List"
import { TileView } from "../Views/Tile"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
  view: "Grid" | "List" | "Tile"
  isLoading: boolean
  isCardDeleted: (isDeleted: boolean, pokemon: Record<string, any>) => void
}

export const PokemonCard = ({
  pokemon,
  cardIndex,
  view,
  isLoading,
  isCardDeleted,
}: Props) => {
  const [cardView, setCardView] = useState(view)

  const onDelete = (hasChanged: boolean, pokemon: Record<string, any>) => {
    isCardDeleted(hasChanged, pokemon)
  }

  useEffect(() => {
    setCardView(view)
  }, [view])

  return cardView === "Tile" ? (
    <TileView
      isCardDeleted={onDelete}
      pokemon={pokemon}
      cardIndex={cardIndex++}
      isLoading={isLoading}
    />
  ) : cardView === "Grid" ? (
    <GridView
      isCardDeleted={onDelete}
      pokemon={pokemon}
      cardIndex={cardIndex++}
      isLoading={isLoading}
    />
  ) : cardView === "List" ? (
    <ListView
      isCardDeleted={onDelete}
      pokemon={pokemon}
      cardIndex={cardIndex++}
      isLoading={isLoading}
    />
  ) : (
    <></>
  )
}

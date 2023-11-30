import { useEffect, useState } from "react"
import { GridView } from "../Views/Grid"
import { ListView } from "../Views/List"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
  view: boolean
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
  const [gridView, setGridView] = useState(view)

  const onDelete = (hasChanged: boolean, pokemon: Record<string, any>) => {
    isCardDeleted(hasChanged, pokemon)
  }

  useEffect(() => {
    setGridView(view)
  }, [view])

  return gridView ? (
    <GridView
      isCardDeleted={onDelete}
      pokemon={pokemon}
      cardIndex={cardIndex++}
      isLoading={isLoading}
    />
  ) : (
    <ListView
      isCardDeleted={onDelete}
      pokemon={pokemon}
      cardIndex={cardIndex++}
      isLoading={isLoading}
    />
  )
}

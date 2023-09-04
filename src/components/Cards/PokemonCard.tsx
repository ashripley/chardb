import { useEffect, useState } from "react"
import axios from "axios"
import { GridView } from "../Views/Grid"
import { ListView } from "../Views/List"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
  view: boolean
  isLoading: boolean
}

export const PokemonCard = ({ pokemon, cardIndex, view, isLoading }: Props) => {
  const [gridView, setGridView] = useState(view)

  useEffect(() => {
    setGridView(view)
  }, [view])

  return gridView ? (
    <GridView pokemon={pokemon} cardIndex={cardIndex++} isLoading={isLoading} />
  ) : (
    <ListView pokemon={pokemon} cardIndex={cardIndex++} isLoading={isLoading} />
  )
}

import { useEffect, useState } from "react"
import { GridView } from "../Views/Grid"
import { ListView } from "../Views/List"
import { TileView } from "../Views/Tile"
import { useDispatch, useSelector } from "react-redux"
import { setCardView } from "../../redux/root"
import { RootState } from "../../redux/store"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
  isCardDeleted: (isDeleted: boolean, pokemon: Record<string, any>) => void
}

export const PokemonCard = ({ pokemon, cardIndex, isCardDeleted }: Props) => {
  const { cardView: view } = useSelector((state: RootState) => state.root)
  const dispatch = useDispatch()

  const onDelete = (hasChanged: boolean, pokemon: Record<string, any>) => {
    isCardDeleted(hasChanged, pokemon)
  }

  return view === "Tile" ? (
    <TileView
      isCardDeleted={onDelete}
      pokemon={pokemon}
      cardIndex={cardIndex++}
    />
  ) : view === "Grid" ? (
    <GridView
      isCardDeleted={onDelete}
      pokemon={pokemon}
      cardIndex={cardIndex++}
    />
  ) : view === "List" ? (
    <ListView
      isCardDeleted={onDelete}
      pokemon={pokemon}
      cardIndex={cardIndex++}
    />
  ) : (
    <></>
  )
}

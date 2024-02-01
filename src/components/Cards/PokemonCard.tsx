import { Grid } from "../Views/Grid"
import { List } from "../Views/List"
import { Tile } from "../Views/Tile"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
}

export const PokemonCard = ({ pokemon, cardIndex }: Props) => {
  const { cardView } = useSelector((state: RootState) => state.root)

  const components: Record<string, any> = {
    Tile,
    Grid,
    List,
  }

  const Component = components[cardView] || (() => <></>)

  return <Component pokemon={pokemon} cardIndex={cardIndex} />
}

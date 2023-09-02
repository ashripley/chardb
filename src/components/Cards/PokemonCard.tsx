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

enum View {
  READ = "read",
  EDIT = "edit",
}

export const PokemonCard = ({ pokemon, cardIndex, view, isLoading }: Props) => {
  const [state, setState] = useState([
    { name: "", id: 0, url: { front: "", back: "" } },
  ])
  const [gridView, setGridView] = useState(view)

  // const [cardView, setCardView] = useState<Record<string, any>>({
  //   view: View.READ,
  // })

  // const [imageOrientation, setImageOrientation] = useState<boolean | string>(
  //   true
  // )

  // useEffect(() => {
  //   const pokemonObj = pokemon.find((p) => p.name.length)
  //   setState(pokemonObj)
  // }, [state])

  useEffect(() => {
    setGridView(view)
  }, [view])

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then((response) => {
        if (pokemon.name !== response.data.name) return null
        const pokemonData = {
          ...pokemon,
          name: response.data.name,
          id: response.data.id,
          url: {
            front: response.data.sprites.front_default,
            back: response.data.sprites.back_default,
          },
        }
        setState((prev) => [...prev, pokemonData])
      })
  }, [pokemon])

  // const pokemonField = (name: string, action: string) => {
  //   const pokemon = Object.values(state).filter(
  //     (pokemonName) => pokemonName.name === name
  //   )

  //   return action === "id"
  //     ? pokemon[0]?.id
  //     : action === "frontUrl"
  //     ? pokemon[0]?.url.front
  //     : action === "backUrl"
  //     ? pokemon[0]?.url.back
  //     : ""
  // }

  // const mouseEnter = () => {
  //   setImageOrientation("edit")
  // }

  // const mouseLeave = () => {
  //   setImageOrientation(true)
  // }

  // const onViewChange = () => {
  //   if (cardView.view === View.READ && imageOrientation === "edit") {
  //     setCardView({ view: View.EDIT })
  //     view = true
  //   } else {
  //     setCardView({ view: View.READ })
  //     view = false
  //   }
  // }

  return gridView ? (
    <GridView pokemon={state} cardIndex={cardIndex++} isLoading={isLoading} />
  ) : (
    <ListView pokemon={state} cardIndex={cardIndex++} isLoading={isLoading} />
  )
}

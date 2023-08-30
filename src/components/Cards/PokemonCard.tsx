import { Card, Divider, Grow, Paper, Slide, TextField } from "@mui/material"
import styled from "styled-components"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined"
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone"
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined"
import TagIcon from "@mui/icons-material/Tag"
import { useEffect, useState } from "react"
import axios from "axios"
import { ViewSwitch } from "../ViewSwitch"
import EditIcon from "@mui/icons-material/Edit"
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

const ListWrapper = styled.div`
  width: 90%;
  padding: 20px 30px;
  height: 150px;
`

const ListImage = styled.div`
  height: 100%;
  max-width: 20%;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f1a1b;
  border-radius: 50px;
`

const ListDetails = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const ListColumn = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const IdColumn = styled.div`
  width: 99%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const IdDivider = styled.div`
  width: 1%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ListIconWrapper = styled.div`
  display: flex;
  width: 15%;
  justify-content: center;
`

const ListData = styled.div`
  display: flex;
  width: 60%;
  font-weight: 800;
  justify-content: center;
  align-items: center;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  text-transform: capitalize;
  padding: 10px 0px;
`

const ListId = styled.div`
  color: black;
  display: flex;
  width: 10%;
  padding: 10px 0px;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
`

export const PokemonCard = ({ pokemon, cardIndex, view, isLoading }: Props) => {
  const [state, setState] = useState([
    { name: "", id: 0, url: { front: "", back: "" } },
  ])

  const [cardView, setCardView] = useState<Record<string, any>>({
    view: View.READ,
  })

  const [gridView, setGridView] = useState(view)

  const [imageOrientation, setImageOrientation] = useState<boolean | string>(
    true
  )

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

  const pokemonField = (name: string, action: string) => {
    const pokemon = Object.values(state).filter(
      (pokemonName) => pokemonName.name === name
    )

    return action === "id"
      ? pokemon[0]?.id
      : action === "frontUrl"
      ? pokemon[0]?.url.front
      : action === "backUrl"
      ? pokemon[0]?.url.back
      : ""
  }

  const mouseEnter = () => {
    setImageOrientation("edit")
  }

  const mouseLeave = () => {
    setImageOrientation(true)
  }

  const onViewChange = () => {
    if (cardView.view === View.READ && imageOrientation === "edit") {
      setCardView({ view: View.EDIT })
      view = true
    } else {
      setCardView({ view: View.READ })
      view = false
    }
  }

  return gridView ? (
    <GridView pokemon={state} cardIndex={cardIndex++} isLoading={isLoading} />
  ) : (
    <ListView pokemon={state} cardIndex={cardIndex++} isLoading={isLoading} />
  )
}

import { Card, Grow } from "@mui/material"
import styled from "styled-components"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined"
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone"
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined"
import TagIcon from "@mui/icons-material/Tag"
import { useState } from "react"
import EditIcon from "@mui/icons-material/Edit"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
}

enum View {
  READ = "read",
  EDIT = "edit",
}

const Wrapper = styled.div`
  width: 20%;
  padding: 20px 30px;
  height: 500px;
`

const Image = styled.div`
  background: #0f1a1b;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #0f1a1b;
`

const Details = styled.div`
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const Row = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Icon = styled.div`
  display: flex;
  width: 15%;
  justify-content: flex-start;
`

const Data = styled.div`
  display: flex;
  width: 60%;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  text-transform: capitalize;
`

const Id = styled.div`
  color: white;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  padding-top: 30px;
  font-size: 1.5rem;
`

export const PokemonCard = ({ pokemon, cardIndex }: Props) => {
  const [state, setState] = useState([
    { name: "name", id: 0, url: { front: "", back: "" } },
  ])

  const [cardView, setCardView] = useState<Record<string, any>>({
    view: View.READ,
  })

  const [imageOrientation, setImageOrientation] = useState<boolean | string>(
    true
  )

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

  return (
    <Wrapper key={`grid-${cardIndex}`}>
      <Grow
        in={true}
        style={{ transformOrigin: "1 1 1" }}
        {...(true ? { timeout: 1000 } : {})}
      >
        {cardView.view === View.READ ? (
          <Card
            sx={{
              minWidth: 275,
              backgroundColor: "white",
              borderRadius: 15,
              height: "100%",
              transition: "box-shadow 0.8s !important",
              ":hover": {
                boxShadow: "0px 10px 30px dimGray",
              },
            }}
            variant="elevation"
            raised
          >
            <Image>
              <Card
                sx={{
                  width: 150,
                  height: 150,
                  background: "white",
                  borderRadius: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: "revert",
                }}
                onMouseEnter={() => mouseEnter()}
                onMouseLeave={() => mouseLeave()}
              >
                {imageOrientation === "edit" ? (
                  <EditIcon />
                ) : pokemonField(pokemon.name, "frontUrl") ? (
                  <img
                    alt="pokemon"
                    src={`${pokemonField(
                      pokemon.name,
                      `${imageOrientation ? "frontUrl" : "backUrl"}`
                    )}`}
                    style={{
                      width: 120,
                      height: 120,
                    }}
                  />
                ) : (
                  <InsertPhotoOutlinedIcon />
                )}
              </Card>
              <Id>{`# ${pokemonField(pokemon.name, "id")}`}</Id>
            </Image>
            <Details>
              <Row>
                <Icon>
                  <PermIdentityOutlinedIcon />
                </Icon>
                <Data>{pokemon.name}</Data>
              </Row>
              <Row>
                <Icon>
                  <CatchingPokemonTwoToneIcon />
                </Icon>
                <Data>{pokemon.type}</Data>
              </Row>
              <Row>
                <Icon>
                  <FeaturedPlayListOutlinedIcon />
                </Icon>
                <Data>{pokemon.set}</Data>
              </Row>
              <Row>
                <Icon>
                  <TagIcon />
                </Icon>
                <Data>{pokemon.year}</Data>
              </Row>
            </Details>
          </Card>
        ) : (
          <></>
        )}
      </Grow>
    </Wrapper>
  )
}

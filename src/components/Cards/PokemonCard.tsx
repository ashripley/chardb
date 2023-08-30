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

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
  view: boolean
}

enum View {
  READ = "read",
  EDIT = "edit",
}

const GridWrapper = styled.div`
  width: 20%;
  padding: 20px 30px;
  height: 500px;
`

const ListWrapper = styled.div`
  width: 90%;
  padding: 20px 30px;
  height: 150px;
`

const GridImage = styled.div`
  background: #0f1a1b;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #0f1a1b;
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

const GridDetails = styled.div`
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const ListDetails = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const GridRow = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
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

const GridIcon = styled.div`
  display: flex;
  width: 15%;
  justify-content: flex-start;
`

const ListIconWrapper = styled.div`
  display: flex;
  width: 15%;
  justify-content: center;
`

const GridData = styled.div`
  display: flex;
  width: 60%;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  text-transform: capitalize;
`

const GridId = styled.div`
  color: white;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  padding-top: 30px;
  font-size: 1.5rem;
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

export const PokemonCard = ({ pokemon, cardIndex, view }: Props) => {
  const [state, setState] = useState([
    { name: "name", id: 0, url: { front: "", back: "" } },
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
    <GridWrapper>
      <Grow
        in={true}
        style={{ transformOrigin: "1 1 1" }}
        {...(true ? { timeout: 1000 } : {})}
      >
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
          <GridImage>
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
            <GridId>{`# ${pokemonField(pokemon.name, "id")}`}</GridId>
          </GridImage>
          <GridDetails>
            <GridRow>
              <GridIcon>
                <PermIdentityOutlinedIcon />
              </GridIcon>
              <GridData>{pokemon.name}</GridData>
            </GridRow>
            <GridRow>
              <GridIcon>
                <CatchingPokemonTwoToneIcon />
              </GridIcon>
              <GridData>{pokemon.type}</GridData>
            </GridRow>
            <GridRow>
              <GridIcon>
                <FeaturedPlayListOutlinedIcon />
              </GridIcon>
              <GridData>{pokemon.set}</GridData>
            </GridRow>
            <GridRow>
              <GridIcon>
                <TagIcon />
              </GridIcon>
              <GridData>{pokemon.year}</GridData>
            </GridRow>
          </GridDetails>
        </Card>
      </Grow>
    </GridWrapper>
  ) : (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <ListWrapper>
        <Grow
          in={true}
          style={{ transformOrigin: "1 1 1" }}
          {...(true ? { timeout: 1000 } : {})}
        >
          {cardView.view === View.READ ? (
            <Card
              sx={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: 15,
                height: "100%",
                display: "flex",
                transition: "box-shadow 0.8s !important",
                ":hover": {
                  boxShadow: "0px 10px 30px dimGray",
                },
              }}
              variant="elevation"
              raised
            >
              <ListImage>
                <Card
                  sx={{
                    width: 120,
                    height: 120,
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
                    <EditIcon onClick={() => onViewChange()} />
                  ) : pokemonField(pokemon.name, "frontUrl") ? (
                    <img
                      alt="pokemon"
                      src={`${pokemonField(
                        pokemon.name,
                        `${imageOrientation ? "frontUrl" : "backUrl"}`
                      )}`}
                      style={{
                        width: 100,
                        height: 100,
                      }}
                      onClick={() => onViewChange()}
                    />
                  ) : (
                    <InsertPhotoOutlinedIcon />
                  )}
                </Card>
              </ListImage>
              <ListDetails>
                <IdColumn>
                  <ListIconWrapper>
                    <TagIcon />
                  </ListIconWrapper>
                  <ListId>{pokemonField(pokemon.name, "id")}</ListId>
                </IdColumn>
                <IdDivider>
                  <Divider
                    sx={{ borderRightWidth: 2 }}
                    orientation="vertical"
                  />
                </IdDivider>
                <ListColumn>
                  <ListIconWrapper>
                    <PermIdentityOutlinedIcon />
                  </ListIconWrapper>
                  <ListData>{pokemon.name}</ListData>
                </ListColumn>
                <ListColumn>
                  <ListIconWrapper>
                    <CatchingPokemonTwoToneIcon />
                  </ListIconWrapper>
                  <ListData>{pokemon.type}</ListData>
                </ListColumn>
                <ListColumn>
                  <ListIconWrapper>
                    <FeaturedPlayListOutlinedIcon />
                  </ListIconWrapper>
                  <ListData>{pokemon.set}</ListData>
                </ListColumn>
                <ListColumn>
                  <ListIconWrapper>
                    <TagIcon />
                  </ListIconWrapper>
                  <ListData>{pokemon.year}</ListData>
                </ListColumn>
              </ListDetails>
            </Card>
          ) : cardView.view === View.EDIT ? (
            <Card
              sx={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: 15,
                height: "100%",
                display: "flex",
                transition: "box-shadow 0.8s !important",
                ":hover": {
                  boxShadow: "0px 10px 30px dimGray",
                },
              }}
              variant="elevation"
              raised
            >
              <ListImage>
                <Card
                  sx={{
                    width: 120,
                    height: 120,
                    background: "white",
                    borderRadius: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: "revert",
                  }}
                >
                  <EditIcon />
                </Card>
              </ListImage>
              <ListDetails>
                <ListColumn>
                  <ListIconWrapper>
                    <PermIdentityOutlinedIcon />
                  </ListIconWrapper>
                  <ListData>
                    <TextField
                      id="standard"
                      value={pokemon.name}
                      label={"Name"}
                      variant="outlined"
                      style={{ width: "100%", margin: 5 }}
                      sx={{ borderRadius: 15 }}
                      color="warning"
                      onChange={() => {}}
                      InputProps={{
                        sx: {
                          borderRadius: "15px !important",
                        },
                      }}
                    />
                  </ListData>
                </ListColumn>
                <ListColumn>
                  <ListIconWrapper>
                    <CatchingPokemonTwoToneIcon />
                  </ListIconWrapper>
                  <ListData>
                    <TextField
                      id="standard"
                      value={pokemon.type}
                      label={"Type"}
                      variant="outlined"
                      style={{ width: "100%", margin: 5 }}
                      color="warning"
                      onChange={() => {}}
                      InputProps={{
                        sx: {
                          borderRadius: "15px !important",
                        },
                      }}
                    />
                  </ListData>
                </ListColumn>
                <ListColumn>
                  <ListIconWrapper>
                    <FeaturedPlayListOutlinedIcon />
                  </ListIconWrapper>
                  <ListData>
                    <TextField
                      id="standard"
                      value={pokemon.set}
                      label={"Set"}
                      variant="outlined"
                      style={{ width: "100%", margin: 5 }}
                      color="warning"
                      onChange={() => {}}
                      InputProps={{
                        sx: {
                          borderRadius: "15px !important",
                        },
                      }}
                    />
                  </ListData>
                </ListColumn>
                <ListColumn>
                  <ListIconWrapper>
                    <TagIcon />
                  </ListIconWrapper>
                  <ListData>
                    <TextField
                      id="standard"
                      value={pokemon.year}
                      label={"Year"}
                      variant="outlined"
                      style={{ width: "100%", margin: 5 }}
                      color="warning"
                      onChange={() => {}}
                      InputProps={{
                        sx: {
                          borderRadius: "15px !important",
                        },
                      }}
                    />
                  </ListData>
                </ListColumn>
              </ListDetails>
            </Card>
          ) : (
            <></>
          )}
        </Grow>
      </ListWrapper>
    </Slide>
  )
}

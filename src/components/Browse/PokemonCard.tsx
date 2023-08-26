import { Card, Divider, Grow, Paper, Slide } from "@mui/material"
import styled from "styled-components"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined"
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone"
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined"
import TagIcon from "@mui/icons-material/Tag"
import { useEffect, useState } from "react"
import axios from "axios"
import { ViewSwitch } from "./ViewSwitch"
import EditIcon from "@mui/icons-material/Edit"

interface Props {
  query: Record<string, any>
}

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: block;
  justify-content: center;
  background: white !important;
`

const StyledPaper = styled(Paper)`
  background-color: white;
  display: flex;
  max-width: 100%;
  width: 100%;
  justify-content: center;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
`

const GridWrapper = styled.div`
  width: 20%;
  padding: 20px 30px;
  height: 500px;

  & > :hover {
    box-shadow: 0px -25px 20px -20px rgba(0, 0, 0, 0.45),
      0px 35px 30px -20px rgba(0, 0, 0, 0.45);
  }
`

const ListWrapper = styled.div`
  width: 90%;
  padding: 20px 30px;
  height: 150px;

  & > :hover {
    box-shadow: 0px -25px 20px -20px rgba(0, 0, 0, 0.45),
      0px 35px 30px -20px rgba(0, 0, 0, 0.45);
  }
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

const Switch = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

export const PokemonCard = ({ query }: Props) => {
  const [state, setState] = useState([
    { name: "name", id: 0, url: { front: "", back: "" } },
  ])
  const [isGridView, setIsGridView] = useState(true)
  const [imageOrientation, setImageOrientation] = useState<boolean | string>(
    true
  )

  useEffect(() => {
    query.map(async (q: any) => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${q.name}`)
        .then((response) => {
          const pokemonData = {
            ...q,
            name: response.data.name,
            id: response.data.id,
            url: {
              front: response.data.sprites.front_default,
              back: response.data.sprites.back_default,
            },
          }

          setState((prev) => [...prev, pokemonData])
        })
    })
  }, [query])

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

  const viewChange = () => {
    setIsGridView(!isGridView)
  }

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit={false}>
      <Container>
        <Switch>
          <ViewSwitch view={viewChange} />
        </Switch>
        <StyledPaper
          elevation={0}
          style={{ backgroundColor: "white", maxWidth: "100%", padding: 0 }}
        >
          {query.map((query: Record<string, any>) => (
            <>
              {isGridView ? (
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
                          onMouseEnter={() => setImageOrientation("edit")}
                          onMouseLeave={() => setImageOrientation(true)}
                        >
                          {imageOrientation === "edit" ? (
                            <EditIcon />
                          ) : pokemonField(query.name, "frontUrl") ? (
                            <img
                              src={`${pokemonField(
                                query.name,
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
                        <GridId>{`# ${pokemonField(query.name, "id")}`}</GridId>
                      </GridImage>
                      <GridDetails>
                        <GridRow>
                          <GridIcon>
                            <PermIdentityOutlinedIcon />
                          </GridIcon>
                          <GridData>{query.name}</GridData>
                        </GridRow>
                        <GridRow>
                          <GridIcon>
                            <CatchingPokemonTwoToneIcon />
                          </GridIcon>
                          <GridData>{query.type}</GridData>
                        </GridRow>
                        <GridRow>
                          <GridIcon>
                            <FeaturedPlayListOutlinedIcon />
                          </GridIcon>
                          <GridData>{query.set}</GridData>
                        </GridRow>
                        <GridRow>
                          <GridIcon>
                            <TagIcon />
                          </GridIcon>
                          <GridData>{query.year}</GridData>
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
                      <Card
                        sx={{
                          width: "100%",
                          backgroundColor: "white",
                          borderRadius: 15,
                          height: "100%",
                          display: "flex",
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
                            onMouseEnter={() => setImageOrientation("edit")}
                            onMouseLeave={() => setImageOrientation(true)}
                          >
                            {imageOrientation === "edit" ? (
                              <EditIcon />
                            ) : pokemonField(query.name, "frontUrl") ? (
                              <img
                                src={`${pokemonField(
                                  query.name,
                                  `${imageOrientation ? "frontUrl" : "backUrl"}`
                                )}`}
                                style={{
                                  width: 100,
                                  height: 100,
                                }}
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
                            <ListId>{pokemonField(query.name, "id")}</ListId>
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
                            <ListData>{query.name}</ListData>
                          </ListColumn>
                          <ListColumn>
                            <ListIconWrapper>
                              <CatchingPokemonTwoToneIcon />
                            </ListIconWrapper>
                            <ListData>{query.type}</ListData>
                          </ListColumn>
                          <ListColumn>
                            <ListIconWrapper>
                              <FeaturedPlayListOutlinedIcon />
                            </ListIconWrapper>
                            <ListData>{query.set}</ListData>
                          </ListColumn>
                          <ListColumn>
                            <ListIconWrapper>
                              <TagIcon />
                            </ListIconWrapper>
                            <ListData>{query.year}</ListData>
                          </ListColumn>
                        </ListDetails>
                      </Card>
                    </Grow>
                  </ListWrapper>
                </Slide>
              )}
            </>
          ))}
        </StyledPaper>
      </Container>
    </Slide>
  )
}

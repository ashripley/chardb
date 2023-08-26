import { Button, Card, CircularProgress, Divider, Paper } from "@mui/material"
import styled from "styled-components"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined"
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone"
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined"
import TagIcon from "@mui/icons-material/Tag"
import { useEffect, useState } from "react"
import axios from "axios"
import { click } from "@testing-library/user-event/dist/click"
import GridViewIcon from "@mui/icons-material/GridView"
import ListIcon from "@mui/icons-material/List"

interface Props {
  query: Record<string, any>
}

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: grid;
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

  // & > :hover {
  //   box-shadow: 0 -6px 5px 10px lightGray, 0 6px 5px 10px lightGray,
  //     -7px 0 4px -3px lightGray, 7px 0 4px -3px lightGray;
  // }

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

export const PokemonCard = (props: Props) => {
  const [state, setState] = useState([{ name: "name", id: 0, url: "" }])
  const [view, setView] = useState("grid")

  useEffect(() => {
    props.query.map(async (q: any) => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${q.name}`)
        .then((response) => {
          const pokemonData = {
            ...q,
            name: response.data.name,
            id: response.data.id,
            url: response.data.sprites.front_default,
          }

          setState((prev) => [...prev, pokemonData])
        })
    })
  }, [])

  const pokemonField = (name: string, action: string) => {
    const pokemon = Object.values(state).filter(
      (pokemonName) => pokemonName.name === name
    )

    return action === "id" ? pokemon[0]?.id : pokemon[0]?.url
  }

  return (
    <Container>
      <Button>
        {view === "grid" ? (
          <ListIcon onClick={() => setView("list")} />
        ) : (
          <GridViewIcon onClick={() => setView("grid")} />
        )}
      </Button>
      <StyledPaper
        elevation={0}
        style={{ backgroundColor: "white", maxWidth: "100%", padding: 0 }}
      >
        {props.query.map((query: Record<string, any>) => (
          <>
            {view === "grid" ? (
              <GridWrapper>
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
                    >
                      {pokemonField(query.name, "url") ? (
                        <img
                          src={`${pokemonField(query.name, "url")}`}
                          style={{
                            width: 150,
                            height: 150,
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
              </GridWrapper>
            ) : (
              <ListWrapper>
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
                        width: 100,
                        height: 100,
                        background: "white",
                        borderRadius: 100,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: "revert",
                      }}
                    >
                      {pokemonField(query.name, "url") ? (
                        <img
                          src={`${pokemonField(query.name, "url")}`}
                          style={{
                            width: 150,
                            height: 150,
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
              </ListWrapper>
            )}
          </>
        ))}
      </StyledPaper>
    </Container>
  )
}

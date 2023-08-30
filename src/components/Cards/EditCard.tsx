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
  query: Record<string, any>
  isLoading: boolean
  mounted: boolean
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

const Switch = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-bottom: 20px;
`

export const PokemonCard = ({ query, mounted }: Props) => {
  const [isGridView, setIsGridView] = useState(true)
  const [imageOrientation, setImageOrientation] = useState<boolean | string>(
    true
  )
  const [cardIndex, setCardIndex] = useState<number>()

  const viewChange = () => {
    setIsGridView(!isGridView)
  }

  const mouseEnter = (index: number) => {
    setCardIndex(index)
    setImageOrientation("edit")
  }

  const mouseLeave = () => {
    setImageOrientation(true)
  }

  return (
    <Slide direction="up" in={mounted} mountOnEnter unmountOnExit>
      <Container>
        <Switch>
          <ViewSwitch view={viewChange} />
        </Switch>
        <StyledPaper
          elevation={0}
          style={{ backgroundColor: "white", maxWidth: "100%", padding: 0 }}
        >
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
                          value={query.name}
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
                          value={query.type}
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
                          value={query.set}
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
                          value={query.year}
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
              </Grow>
            </ListWrapper>
          </Slide>
        </StyledPaper>
      </Container>
    </Slide>
  )
}

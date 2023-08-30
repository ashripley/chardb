import { Card, Divider, Grow, Paper, Slide, TextField } from "@mui/material"
import styled from "styled-components"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined"
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone"
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined"
import TagIcon from "@mui/icons-material/Tag"
import { useState } from "react"
import EditIcon from "@mui/icons-material/Edit"
import { Spinner } from "../Spinner"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>[]
  isLoading: boolean
}

enum View {
  READ = "read",
  EDIT = "edit",
}

const Wrapper = styled.div`
  width: 90%;
  padding: 20px 30px;
  height: 150px;
`

const Image = styled.div`
  height: 100%;
  max-width: 20%;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f1a1b;
  border-radius: 50px;
`

const Details = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const Column = styled.div`
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

const IconWrapper = styled.div`
  display: flex;
  width: 15%;
  justify-content: center;
`

const Data = styled.div`
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

const Id = styled.div`
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

export const ListView = ({ pokemon, cardIndex, isLoading }: Props) => {
  const data = pokemon.find((p) => p.name.length)
  const [cardView, setCardView] = useState<Record<string, any>>({
    view: View.READ,
  })

  const [imageFace, setImageFace] = useState<string>("front")

  const mouseEnter = () => {
    setImageFace("back")
  }

  const mouseLeave = () => {
    setImageFace("front")
  }

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Wrapper key={`list-${cardIndex}`}>
        <Grow
          in={true}
          style={{ transformOrigin: "1 1 1" }}
          {...(true ? { timeout: 1000 } : {})}
        >
          {isLoading ? (
            <Spinner />
          ) : cardView.view === View.READ ? (
            <Card
              sx={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: 15,
                height: "100%",
                display: "flex",
                transition: "all 0.8s !important",
                ":hover": {
                  padding: "0.5em",
                  boxShadow: "0px 10px 30px dimGray",
                },
              }}
              variant="elevation"
              raised
            >
              <Image>
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
                    transition: "all 0.8s !important",
                    ":hover": {
                      padding: "0.3em",
                      boxShadow: "0px 0px 30px gray",
                    },
                  }}
                  onMouseEnter={() => mouseEnter()}
                  onMouseLeave={() => mouseLeave()}
                >
                  <img
                    alt={`"${data?.name}"`}
                    src={
                      imageFace === "front"
                        ? data?.url.front
                        : data?.url.back || <InsertPhotoOutlinedIcon />
                    }
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </Card>
              </Image>
              <Details>
                <IdColumn>
                  <IconWrapper>
                    <TagIcon />
                  </IconWrapper>
                  <Id>{data?.id || ""}</Id>
                </IdColumn>
                <IdDivider>
                  <Divider
                    sx={{ borderRightWidth: 2 }}
                    orientation="vertical"
                  />
                </IdDivider>
                <Column>
                  <IconWrapper>
                    <PermIdentityOutlinedIcon />
                  </IconWrapper>
                  <Data>{data?.name || ""}</Data>
                </Column>
                <Column>
                  <IconWrapper>
                    <CatchingPokemonTwoToneIcon />
                  </IconWrapper>
                  <Data>{data?.type || ""}</Data>
                </Column>
                <Column>
                  <IconWrapper>
                    <FeaturedPlayListOutlinedIcon />
                  </IconWrapper>
                  <Data>{data?.set || ""}</Data>
                </Column>
                <Column>
                  <IconWrapper>
                    <TagIcon />
                  </IconWrapper>
                  <Data>{data?.year || ""}</Data>
                </Column>
              </Details>
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
              <Image>
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
              </Image>
              <Details>
                <Column>
                  <IconWrapper>
                    <PermIdentityOutlinedIcon />
                  </IconWrapper>
                  <Data>
                    <TextField
                      id="standard"
                      value={data?.name}
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
                  </Data>
                </Column>
                <Column>
                  <IconWrapper>
                    <CatchingPokemonTwoToneIcon />
                  </IconWrapper>
                  <Data>
                    <TextField
                      id="standard"
                      value={data?.type}
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
                  </Data>
                </Column>
                <Column>
                  <IconWrapper>
                    <FeaturedPlayListOutlinedIcon />
                  </IconWrapper>
                  <Data>
                    <TextField
                      id="standard"
                      value={data?.set}
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
                  </Data>
                </Column>
                <Column>
                  <IconWrapper>
                    <TagIcon />
                  </IconWrapper>
                  <Data>
                    <TextField
                      id="standard"
                      value={data?.year}
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
                  </Data>
                </Column>
              </Details>
            </Card>
          ) : (
            <>test</>
          )}
        </Grow>
      </Wrapper>
    </Slide>
  )
}

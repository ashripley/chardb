import { Button, Card, Grow } from "@mui/material"
import styled from "styled-components"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined"
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone"
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined"
import TagIcon from "@mui/icons-material/Tag"
import { useState } from "react"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
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
  border-radius: 50px;
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

const ActionColumn = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f1a1b;
  border-radius: 50px;
  transition: all 1s ease;

  &:hover {
    height: 20%;
  }
`

export const GridView = ({ pokemon, cardIndex, isLoading }: Props) => {
  const data = pokemon.find((p) => p.name.length)

  const [cardView, setCardView] = useState<Record<string, any>>({
    view: View.READ,
  })
  const [imageFace, setImageFace] = useState<string>("front")
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const mouseEnter = () => {
    setIsHovered(true)
    setImageFace("back")
  }

  const mouseLeave = () => {
    setIsHovered(false)
    setImageFace("front")
  }

  const onCardEnter = () => {
    setIsHovered(true)
  }

  const onCardLeave = () => {
    setIsHovered(false)
  }

  return (
    <Wrapper key={`grid-${cardIndex}`}>
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
              minWidth: 275,
              backgroundColor: "white",
              borderRadius: 15,
              height: "100%",
              transition: "all 0.8s !important",
              ":hover": {
                padding: "0.5em",
                boxShadow: "0px 10px 30px dimGray",
              },
            }}
            variant="elevation"
            raised
            onMouseEnter={() => onCardEnter()}
            onMouseLeave={() => onCardLeave()}
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
                  transition: "all 0.8s !important",
                  ":hover": {
                    padding: "0.5em",
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
                    width: 120,
                    height: 120,
                  }}
                />
              </Card>
              <Id>{`# ${data?.id || ""}`}</Id>
            </Image>
            <Details>
              <Row>
                <Icon>
                  <PermIdentityOutlinedIcon />
                </Icon>
                <Data>{data?.name || ""}</Data>
              </Row>
              <Row>
                <Icon>
                  <CatchingPokemonTwoToneIcon />
                </Icon>
                <Data>{data?.type || ""}</Data>
              </Row>
              <Row>
                <Icon>
                  <FeaturedPlayListOutlinedIcon />
                </Icon>
                <Data>{data?.set || ""}</Data>
              </Row>
              <Row>
                <Icon>
                  <TagIcon />
                </Icon>
                <Data>{data?.year || ""}</Data>
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

import { Card, Fade, Grow, Tooltip } from "@mui/material"
import styled from "styled-components"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined"
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone"
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined"
import TagIcon from "@mui/icons-material/Tag"
import { useState } from "react"
import { Spinner } from "../Spinner"
import StarOutlineIcon from "@mui/icons-material/StarOutline"
import StarIcon from "@mui/icons-material/Star"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
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

const Image = styled.div<{ attribute: boolean }>`
  background: #0f1a1b;
  height: 60%;
  display: flex;
  align-items: center;
  ${(props) =>
    !!props.attribute &&
    `
    flex-direction: column;
    `}
  justify-content: center;
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

const Id = styled.div<{ attribute: boolean }>`
  color: white;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  padding-top: 30px;
  font-size: 1.5rem;

  ${(props) =>
    !!props.attribute &&
    `
  justify-content: center;
  display: flex;
  `}
`

const Attribute = styled.div`
  display: flex;
  color: white;
  height: 75%;
  width: 25px;
  margin-right: -25px;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const GridView = ({ pokemon, cardIndex, isLoading }: Props) => {
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
            <Image attribute={pokemon.attribute === ("" || "standard")}>
              <CardWrapper>
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
                    alt={`"${pokemon.name}"`}
                    src={
                      imageFace === "front"
                        ? pokemon.url?.front
                        : pokemon.url?.back || <InsertPhotoOutlinedIcon />
                    }
                    style={{
                      width: 120,
                      height: 120,
                    }}
                  />
                </Card>
                <Id attribute={pokemon.attribute !== ("" || "standard")}>{`# ${
                  pokemon.id || ""
                }`}</Id>
              </CardWrapper>
              {!!pokemon.attribute && (
                <Attribute>
                  {pokemon.attribute === "holo" ? (
                    <Tooltip
                      title="Holographic"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                    >
                      <StarOutlineIcon />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Special"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                    >
                      <StarIcon />
                    </Tooltip>
                  )}
                </Attribute>
              )}
            </Image>
            <Details>
              <Row>
                <Icon>
                  <PermIdentityOutlinedIcon />
                </Icon>
                <Data>{pokemon.name || ""}</Data>
              </Row>
              <Row>
                <Icon>
                  <CatchingPokemonTwoToneIcon />
                </Icon>
                <Data>{pokemon.type || ""}</Data>
              </Row>
              <Row>
                <Icon>
                  <FeaturedPlayListOutlinedIcon />
                </Icon>
                <Data>{pokemon.set || ""}</Data>
              </Row>
              <Row>
                <Icon>
                  <TagIcon />
                </Icon>
                <Data>{pokemon.year || ""}</Data>
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

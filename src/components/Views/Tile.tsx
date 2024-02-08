import { Card, Icon } from "@mui/material"
import { useRef, useState } from "react"
import styled from "styled-components"
import { theme } from "../../theme"
import { TileImage } from "../Tile/TileImage"
import ReactCardFlip from "react-card-flip"
import { fieldsToMap } from "../../helpers/fieldsToMap"
import { isMobile } from "../../helpers/view"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
}

//#region Styled Components
const Container = styled.div<{ isMobile: boolean }>`
  min-height: ${({ isMobile }) => (isMobile ? "100px" : "200px")};
  min-width: ${({ isMobile }) => (isMobile ? "100px" : "200px")};
  height: auto;
  width: auto;
  position: relative;
  z-index: 2;
  margin: 10px;
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const Images = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  justify-content: center;

  .react-card-back {
    display: grid;
    align-items: center;
    height: auto;
    width: auto;
    max-height: 120px;
    max-width: 120px;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    overflow: hidden;
    overflow-y: auto;
  }
`

const Row = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: ${({ isMobile }) => (isMobile ? "17px" : "35px")};
  width: 100%;

  & div > span > div {
    width: auto;
  }
`

const Data = styled.div<{ isMobile: boolean }>`
  display: flex;
  width: auto;
  font-weight: 800;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
  color: ${theme.primaryText};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 1;
  ${({ isMobile }) =>
    isMobile &&
    `
    font-size: calc(6px + 1vw)

  `};
`
//#endregion

const cardStyles = (p: Record<string, any>) => {
  return {
    height: isMobile ? 120 : 250,
    width: isMobile ? 115 : 250,
    minWidth: isMobile ? 110 : 200,
    minHeight: isMobile ? 110 : 200,
    backgroundColor: theme.lightBg,
    borderRadius: "15px",
    boxShadow: "rgba(0, 0, 0, 0.4) 0px 40px 90px",
    transition: "all 0.5s !important",
    gap: "10px !important",
    padding: isMobile ? "20px !important" : "40px !important",
    border: "8px solid white",
    ":hover": {
      boxShadow: `0px 0px 10px 5px ${
        theme.typeColours[p.type]
      } , 0px 0px 0px 0px #ffffff`,
    },
  }
}

export const Tile = ({ pokemon, cardIndex }: Props) => {
  //#region state
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false)
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const fields = {
    name: pokemon.name,
    type: pokemon.type,
    set: pokemon.set,
    setNumber: pokemon.setNumber,
    year: pokemon.year,
    attribute: pokemon.attribute,
    quantity: pokemon.quantity,
  }

  const handleClick = (e: any) => {
    e.preventDefault()
    setIsFlipped(!isFlipped)
  }

  const ref = useRef(null)
  //#endregion

  const onCardEnter = () => {
    setIsCardHovered(true)
  }

  const onCardLeave = () => {
    setIsCardHovered(false)
  }

  return (
    <Container isMobile={isMobile}>
      <Wrapper key={`grid-${cardIndex}`}>
        <Images>
          <Card
            sx={cardStyles(pokemon)}
            variant="elevation"
            raised
            onMouseEnter={onCardEnter}
            onMouseLeave={onCardLeave}
            onClick={handleClick}
          >
            <ReactCardFlip
              isFlipped={isFlipped}
              flipDirection="vertical"
              containerStyle={{ height: "100%" }}
            >
              <TileImage
                isCardHovered={isCardHovered}
                isEditView={false}
                isEvolutionsHovered={false}
                pokemon={pokemon}
                ref={ref}
              />
              {Object.entries(
                fieldsToMap(false, fields, false, pokemon, pokemon.id, true)
              ).map(([k, v], index) => (
                <Row isMobile={isMobile}>
                  <Icon
                    style={{
                      width: "auto",
                      paddingRight: isMobile ? 10 : 20,
                      height: "auto",
                    }}
                  >
                    {v.icon ?? <></>}
                  </Icon>
                  <Data isMobile={isMobile}>{pokemon[k] || ""}</Data>
                </Row>
              ))}
            </ReactCardFlip>
          </Card>
        </Images>
      </Wrapper>
    </Container>
  )
}

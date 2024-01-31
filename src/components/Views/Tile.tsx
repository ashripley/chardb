import { Card, Grow, Icon, Tooltip } from "@mui/material"
import { useRef, useState } from "react"
import styled from "styled-components"
import { theme } from "../../theme"
import { ReadOrEditEnum } from "../../helpers/view"
import { TileImage } from "../Tile/TileImage"
import ReactCardFlip from "react-card-flip"
import { fieldsToMap } from "../../helpers/fieldsToMap"
import { AttributeSelect } from "../AttributeSelect"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
  isCardDeleted: (isDeleted: boolean, pokemon: Record<string, any>) => void
}

//#region Styled Components
const Container = styled.div`
  min-height: 200px;
  min-width: 200px;
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
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 35px;

  & div > span > div {
    width: auto;
  }
`

const Data = styled.div`
  display: flex;
  width: auto;
  font-weight: 800;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
  color: ${theme.primaryText};
`
//#endregion

const cardStyles = (p: Record<string, any>) => {
  return {
    height: 250,
    width: 250,
    minWidth: 200,
    minHeight: 200,
    backgroundColor: theme.lightBg,
    borderRadius: "15px",
    boxShadow: "rgba(0, 0, 0, 0.4) 0px 40px 90px",
    transition: "all 0.5s !important",
    gap: 10,
    padding: 5,
    border: "8px solid white",
    ":hover": {
      boxShadow: `0px 0px 10px 5px ${
        theme.typeColours[p.type]
      } , 0px 0px 0px 0px #ffffff`,
    },
  }
}

export const TileView = ({ pokemon, cardIndex, isCardDeleted }: Props) => {
  //#region state
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false)
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [cardView, setCardView] = useState<Record<string, any>>({
    view: ReadOrEditEnum.READ,
  })
  const fields = {
    name: pokemon.name,
    type: pokemon.type,
    set: pokemon.set,
    setNumber: pokemon.setNumber,
    year: pokemon.year,
    attribute: pokemon.attribute,
    quantity: pokemon.quantity,
  }

  // this.handleClick = this.handleClick.bind(this);

  const handleClick = (e: any) => {
    e.preventDefault()
    setIsFlipped(!isFlipped)
  }

  const ref = useRef(null)
  //#endregion

  const mouseEnter = () => {
    // setIsEvolutionsHovered(true)
  }

  const mouseLeave = () => {
    // setIsEvolutionsHovered(false)
  }

  const onCardEnter = () => {
    setIsCardHovered(true)
  }

  const onCardLeave = () => {
    setIsCardHovered(false)
  }

  return (
    <Container>
      <Wrapper key={`grid-${cardIndex}`}>
        <Grow
          in={true}
          style={{ transformOrigin: "1 1 1" }}
          {...(true ? { timeout: 1000 } : { timeout: 1000 })}
        >
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
                  mouseEnter={mouseEnter}
                  mouseLeave={mouseLeave}
                  pokemon={pokemon}
                  ref={ref}
                />

                {Object.entries(
                  fieldsToMap(false, fields, false, pokemon, pokemon.id, true)
                ).map(([k, v], index) => (
                  <Row>
                    <Icon
                      style={{
                        width: "auto",
                        paddingRight: 20,
                        height: "auto",
                      }}
                    >
                      {v.icon ?? <></>}
                    </Icon>
                    <Data>{pokemon[k] || ""}</Data>
                  </Row>
                ))}
              </ReactCardFlip>
            </Card>
          </Images>
        </Grow>
      </Wrapper>
    </Container>
  )
}

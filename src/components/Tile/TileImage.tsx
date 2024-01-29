import styled from "styled-components"
import { theme } from "../../theme"
import { Card, Grow } from "@mui/material"
import pokemonTrainer from "../../assets/icons/pokemon-trainer.svg"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import { energyImageMap } from "../../helpers/trainerImageMap"
import { AttributeBadge } from "../Grid/AttributeBadge"

interface Props {
  isEvolutionsHovered: boolean
  pokemon: Record<string, any>
  ref?: any
  isCardHovered: boolean
  isEditView: boolean
  mouseEnter: () => void
  mouseLeave: () => void
}

const Wrapper = styled.div<{
  isCardHovered: boolean
  isEditView: boolean
}>`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  transition: all 1s ease;
  justify-content: center;
`

const Image = styled.img<{
  isCardHovered: boolean
}>``

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
`

export const TileImage = ({
  pokemon,
  ref,
  isCardHovered,
  isEditView,
  mouseEnter,
  mouseLeave,
}: Props) => {
  const cardStyles = {
    width: 150,
    height: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${theme.lightBg} !important`,
    boxShadow: "none",
  }

  const imageStyles: Record<string, any> = {
    width:
      pokemon.attribute === "trainer"
        ? 1300
        : pokemon.attribute === "energy"
        ? 130
        : 150,
    height:
      pokemon.attribute === "trainer"
        ? 130
        : pokemon.attribute === "energy"
        ? 130
        : 150,
    zIndex: 100,
    position: "absolute",
  }

  return (
    <Wrapper ref={ref} isEditView={isEditView} isCardHovered={isCardHovered}>
      <CardWrapper>
        <Card
          sx={cardStyles}
          className="card-image"
          onMouseEnter={() => mouseEnter()}
          onMouseLeave={() => mouseLeave()}
        >
          <Grow in={true} unmountOnExit {...(true ? { timeout: 1000 } : {})}>
            <Image
              isCardHovered={isCardHovered}
              alt={`"${pokemon.name}"`}
              src={
                pokemon.attribute === "trainer"
                  ? pokemonTrainer
                  : pokemon.attribute === "energy"
                  ? energyImageMap(pokemon.type)
                  : pokemon.url?.front ?? InsertPhotoOutlinedIcon
              }
              style={imageStyles}
            />
          </Grow>
        </Card>
      </CardWrapper>
    </Wrapper>
  )
}

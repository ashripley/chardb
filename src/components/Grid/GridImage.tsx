import styled from "styled-components"
import { theme } from "../../theme"
import { Card, Grow } from "@mui/material"
import { AttributeBadge } from "./AttributeBadge"
import pokemonTrainer from "../../assets/icons/pokemon-trainer.svg"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import { energyImageMap } from "../../helpers/imageMap"

interface Props {
  isEvolutionsHovered: boolean
  pokemon: Record<string, any>
  ref?: any
  isCardHovered: boolean
  isEditView: boolean
  mouseEnter: () => void
  mouseLeave: () => void
}

const Image = styled.div<{
  isCardHovered: boolean
  isEditView: boolean
}>`
  background: ${theme.card};
  height: ${({ isCardHovered, isEditView }) =>
    !!isCardHovered && !!isEditView ? "30%" : isCardHovered ? "40%" : "45%"};
  width: 100%;
  display: flex;
  align-items: center;
  transition: all 1s ease;
  justify-content: center;
  border-radius: 20px;

  & :hover {
    border-radius: 45px !important;
  }
`

const CardWrapper = styled.div<{ hasAttribute: boolean }>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
  margin-right: ${({ hasAttribute }) => (hasAttribute ? "-70px" : "-35px")};
`

const Evolutions = styled.div`
  display: flex;
  justify-content: space-around;
`

export const nonPokemonImage = (
  src: string,
  pokemon: Record<string, any>,
  listView?: boolean
) => (
  <Grow
    in={true}
    unmountOnExit
    style={{ transformOrigin: "1 1 1" }}
    {...(true ? { timeout: 1000 } : {})}
  >
    <img
      alt={`"${pokemon.attribute}"`}
      src={src ?? ""}
      style={{
        width: listView ? 50 : 100,
        height: listView ? 50 : 100,
        padding: 0,
        zIndex: 100,
      }}
    />
  </Grow>
)

export const GridImage = ({
  pokemon,
  isEvolutionsHovered,
  ref,
  isCardHovered,
  isEditView,
  mouseEnter,
  mouseLeave,
}: Props) => {
  const cardStyles = {
    width: 200,
    height: 200,
    borderRadius: "100px !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${theme.lightBg} !important`,
    opacity: "revert",
    transition: "all 0.8s !important",
    boxShadow: `${
      pokemon.attribute === "energy"
        ? theme.typeColours[pokemon.type]
        : theme.attributeColour[pokemon.attribute] || theme.lightBg
    } 0px 0px 20px 0px !important`,

    ":hover": {
      width: "360px !important",
      height: "350px !important",
      boxShadow: "none !important",
    },
  }

  const evolutions =
    [
      pokemon?.evolutionChain?.first?.image ?? pokemon.url?.front,
      pokemon?.evolutionChain?.second?.image ?? null,
      pokemon?.evolutionChain?.third?.image ?? null,
    ] ?? pokemon.url?.front

  return (
    <Image ref={ref} isEditView={isEditView} isCardHovered={isCardHovered}>
      <CardWrapper hasAttribute={pokemon.attribute}>
        <Card
          sx={cardStyles}
          className="card-image"
          onMouseEnter={() => mouseEnter()}
          onMouseLeave={() => mouseLeave()}
        >
          {!isEvolutionsHovered ? (
            <Grow in={true} unmountOnExit {...(true ? { timeout: 1000 } : {})}>
              <img
                alt={`"${pokemon.name}"`}
                src={
                  pokemon.attribute === "trainer"
                    ? pokemonTrainer
                    : pokemon.attribute === "energy"
                    ? energyImageMap(pokemon.type)
                    : pokemon.url?.front ?? InsertPhotoOutlinedIcon
                }
                style={{
                  width: 130,
                  height: 130,
                  zIndex: 100,
                  position: "absolute",
                }}
              />
            </Grow>
          ) : (
            <Evolutions>
              {pokemon.attribute === "trainer"
                ? nonPokemonImage(pokemonTrainer, pokemon)
                : pokemon.attribute === "energy"
                ? nonPokemonImage(energyImageMap(pokemon.type), pokemon)
                : evolutions.map(
                    (image, index) =>
                      !!image && (
                        <Grow
                          in={true}
                          unmountOnExit
                          style={{ transformOrigin: "1 1 1" }}
                          {...(true ? { timeout: 1000 } : {})}
                        >
                          <img
                            key={index}
                            alt={`"${pokemon.name}"`}
                            src={image || null}
                            style={{
                              width: 100,
                              height: 100,
                              padding: 0,
                              zIndex: 100,
                            }}
                          />
                        </Grow>
                      )
                  )}
            </Evolutions>
          )}
        </Card>
      </CardWrapper>
      {pokemon?.attribute && (
        <AttributeBadge
          isGridCard
          pokemon={pokemon}
          isEvolutionsHovered={isEvolutionsHovered}
        />
      )}
    </Image>
  )
}

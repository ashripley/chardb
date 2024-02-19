import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import { Card, Grow, Tooltip } from "@mui/material"
import styled from "styled-components"
import { theme } from "../../theme"
import pokemonTrainer from "../../assets/icons/pokemon-trainer.svg"
import { energyImageMap } from "../../helpers/imageMap"
import { AttributeBadge } from "../Grid/AttributeBadge"
import { nonPokemonImage } from "../Grid/GridImage"

interface Props {
  isEvolutionsHovered: boolean
  pokemon: Record<string, any>
  ref?: any
  mouseEnter: () => void
  mouseLeave: () => void
}

const Main = styled.div`
  height: 100%;
  width: 300px;
  max-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.card};
  border-radius: 25px;

  & :hover {
    border-radius: 25px;
  }
`

const Wrapper = styled.div<{ hasAttribute: boolean }>`
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

export const ListImage = ({
  pokemon,
  isEvolutionsHovered,
  ref,
  mouseEnter,
  mouseLeave,
}: Props) => {
  const cardStyles = {
    width: 80,
    height: 80,
    maxWidth: 300,
    borderRadius: "100px",
    display: "flex",
    backgroundColor: theme.lightBg,
    alignItems: "center",
    justifyContent: "center",
    opacity: "revert",
    transition: "all 0.8s !important",
    boxShadow: `${
      pokemon.attribute === "energy"
        ? theme.typeColours[pokemon.type]
        : theme.attributeColour[pokemon.attribute] || theme.lightBg
    } 0px 0px 20px 0px !important`,
    ":hover": {
      width: 300,
      maxWidth: 300,
      height: "100%",
      boxShadow: "none !important",
      borderRadius: "10px",
    },
  }

  const nonPokemon = ["trainer", "energy"]

  const evolutions =
    [
      pokemon?.evolutionChain?.first?.image ?? pokemon.url.front,
      pokemon?.evolutionChain?.second?.image ?? null,
      pokemon?.evolutionChain?.third?.image ?? null,
    ] ?? pokemon.url.front

  return (
    <Main ref={ref}>
      <Wrapper hasAttribute={pokemon.attribute}>
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
                    : pokemon.url.front ?? InsertPhotoOutlinedIcon
                }
                style={{
                  width: nonPokemon.some((np) => np === pokemon.attribute)
                    ? 50
                    : 60,
                  height: nonPokemon.some((np) => np === pokemon.attribute)
                    ? 50
                    : 60,
                }}
              />
            </Grow>
          ) : (
            <Evolutions>
              {pokemon.attribute === "trainer"
                ? nonPokemonImage(pokemonTrainer, pokemon, true)
                : pokemon.attribute === "energy"
                ? nonPokemonImage(energyImageMap(pokemon.type), pokemon, true)
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
                            src={
                              pokemon.attribute === "trainer"
                                ? pokemonTrainer
                                : pokemon.attribute === "energy"
                                ? energyImageMap(pokemon.type)
                                : image || null
                            }
                            style={{
                              width: 70,
                              height: 70,
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
      </Wrapper>
      {pokemon?.attribute && (
        <Tooltip title={pokemon.attribute.toUpperCase()} placement="top">
          <AttributeBadge
            isGridCard={false}
            pokemon={pokemon}
            isEvolutionsHovered={isEvolutionsHovered}
          />
        </Tooltip>
      )}
    </Main>
  )
}

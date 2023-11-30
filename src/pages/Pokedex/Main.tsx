import {
  Card,
  CircularProgress,
  FormControl,
  Grow,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Theme } from "../../Theme"
import { PokedexModal } from "../../components/PokedexModal"
import { AllCards } from "../../api/queries/allCards"
import axios from "axios"

const Container = styled.div`
  max-height: 100%;
  max-width: 100%;
  padding: 30px 30px;
  position: relative;
  z-index: 2;
`

const Wrapper = styled.div`
  display: flex;
  max-width: 100%;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`

const Header = styled.div`
  display: flex;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  color: ${Theme.primaryText};
  font-size: 30px;
  justify-content: center;
  padding: 30px 0px;
  width: 90%;
  right: 6%;
  position: relative;
}
`

const StyledPaper = styled(Paper)`
  margin: 0px 30px;
  width: 100%;
`

const Images = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  height: auto;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const Image = styled.img<{ hasPokemon: boolean }>`
  display: flex;
  height: 150px;
  width: 150px;
  padding: 20px;
  ${(props) => !props.hasPokemon && `filter: brightness(0.1); opacity: 0.9;`};
`

const Fields = styled.div`
  width: 10%;
  margin-left: 35px;
`

const NameField = styled.div`
  display: flex;
  justify-content: center;
  width: 100% !important;
  position: relative;
  z-index: 3;
  justify-content: flex-start;
`

export const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pokedex, setPokedex] = useState<Record<string, any>[]>([{}])
  const [pokemon, setPokemon] = useState<Record<string, any>>({})
  const [hasPokemon, setHasPokemon] = useState<string[]>([])
  const [generation, setGeneration] = useState<Record<string, any>>({})

  const cardStyles = (p: Record<string, any>) => {
    return {
      height: 200,
      width: 200,
      padding: "2rem",
      margin: "1rem",
      backgroundColor: Theme.lightBg,
      borderRadius: "15px",
      boxShadow: "rgba(0, 0, 0, 0.4) 0px 40px 90px",
      transition: "all 0.5s !important",
      border: "8px solid white",
      ":hover": {
        boxShadow: `0px 0px 10px 5px ${
          Theme.typeColours[p.types?.[0]]
        } , 0px 0px 0px 0px #ffffff`,
      },
    }
  }

  const selectStyles = {
    borderRadius: "15px 35px 35px 15px",
    width: "100%",
    fieldset: {
      borderColor: "#e3e4db",
    },
    color: Theme.primaryText,

    "&:hover": {
      fieldset: {
        borderColor: "#ed6d03 !important",
      },
    },
  }

  const fetchPokemon = async (start: number, range: number) => {
    setIsLoading(true)
    let pokedex: Record<string, any>[] = [{}]

    for (var i = start; i <= range; i++) {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((response) => response.json())
        .then(async (data) => {
          // fetch evolution chain url from pokeapi
          const fetchEvolutionChainUrl = async (pokemon: string) => {
            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
            )

            const chainUrl = await response.data.evolution_chain

            return chainUrl
          }

          const chainUrl = await fetchEvolutionChainUrl(data.name)

          // fetch evolution chain from pokeapi
          const fetchEvolutionChain = async () => {
            const response = await axios.get(`${chainUrl.url}`)

            return response.data
          }

          const chain = await fetchEvolutionChain()

          // Getting id for displaying evolved Pokemon url
          // INPUT 'str' example: 'https://pokeapi.co/api/v2/pokemon-species/121/'
          // OUTPUT: 'str' id example: '121'
          const getImageId = (urlStr?: string) => {
            if (!urlStr) return null

            let regex = /[^v]\d/ // looking for a number that doesn't with a 'v' before it,
            let searchIdx = urlStr.search(regex) // gives index position
            // grabbing the numbers inbetween the forward slashes
            let evoId = urlStr.slice(searchIdx + 1, -1)
            return evoId
          }

          const firstEvolution = chain.chain.species
          const secondEvolution = chain.chain.evolves_to?.[0]?.species
          const thirdEvolution =
            chain.chain.evolves_to?.[0]?.evolves_to?.[0]?.species

          const evolutionChainObj = {
            first: {
              id: getImageId(firstEvolution.url),
              name: firstEvolution.name ?? "",
              url: firstEvolution.url ?? "",
              image: firstEvolution.name
                ? `https://img.pokemondb.net/sprites/home/normal/${firstEvolution.name}.png`
                : "",
            },
            second: {
              id: getImageId(secondEvolution?.url) ?? "",
              name: secondEvolution?.name ?? "",
              url: secondEvolution?.url ?? "",
              image: secondEvolution?.name
                ? `https://img.pokemondb.net/sprites/home/normal/${secondEvolution.name}.png`
                : "",
            },
            third: {
              id: getImageId(thirdEvolution?.url) ?? "",
              name: thirdEvolution?.name ?? "",
              url: thirdEvolution?.url ?? "",
              image: thirdEvolution?.name
                ? `https://img.pokemondb.net/sprites/home/normal/${thirdEvolution.name}.png`
                : "",
            },
          }

          pokedex.push({
            name: data.name,
            id: data.id,
            height: data.height,
            weight: data.weight,
            types: data.types?.map(
              (type: Record<string, any>) => type.type.name
            ),
            abilities: data.abilities?.map(
              (ability: Record<string, any>) => ability.ability.name
            ),
            sprites: {
              front: data.sprites.front_default,
              back: data.sprites.back_default,
            },
            colour: Theme.typeColours[pokemon?.types?.[0]] ?? "#a8a878",
            image: `https://img.pokemondb.net/sprites/home/normal/${data.name}.png`,
            evolutionChain: { ...evolutionChainObj },
          })
        })
    }
    pokedex.shift()

    const cards = await AllCards()

    const cardFilter = cards.map((p) => p.name)

    setHasPokemon(cardFilter)

    setPokedex(pokedex)
    setIsLoading(false)
    return pokedex
  }

  useEffect(() => {
    if (generation.value == 1) {
      fetchPokemon(1, 151)
    } else if (generation.value == 2) {
      fetchPokemon(152, 251)
    } else if (generation.value == 3) {
      fetchPokemon(153, 386)
    } else if (generation.value == 4) {
      fetchPokemon(387, 493)
    }
  }, [generation])

  const onClose = () => setIsModalOpen(!isModalOpen)

  const onOpen = async (index: number) => {
    index++
    setIsModalOpen(!isModalOpen)

    const tempPokemon: Record<string, any> = pokedex
      .filter((p: Record<string, any>) => p.id === index)
      .reduce(function (a, b) {
        return (a = b)
      }, {})

    setPokemon(tempPokemon)
  }

  useEffect(() => {
    fetchPokemon(1, 151)
  }, [])

  return (
    <Container>
      <Wrapper>
        <Grow
          in={true}
          style={{ transformOrigin: "1 1 1" }}
          {...(true ? { timeout: 1000 } : { timeout: 1000 })}
        >
          <StyledPaper
            variant="outlined"
            sx={{
              height: "15%",
              backgroundColor: Theme.lightBg,
              border: "none",
              borderRadius: "15px",
              transition: "all 1s ease !important",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              display: "flex",
              alignItems: "center",

              "&:hover": {
                padding: "0.2rem",
              },
            }}
          >
            <Fields>
              <NameField>
                <FormControl
                  sx={{
                    borderRadius: "15px !important",
                    width: "100%",
                  }}
                >
                  <InputLabel color="warning">{"Generation"}</InputLabel>
                  <Select
                    id="standard"
                    variant="outlined"
                    value={generation.value}
                    label={"Generation"}
                    color="warning"
                    onChange={(e) =>
                      setGeneration({
                        key: "generation",
                        value: e.target.value,
                      })
                    }
                    sx={selectStyles}
                  >
                    {["1", "2", "3", "4"].map((gen, index) => (
                      <MenuItem
                        key={index}
                        value={gen}
                        sx={{ color: Theme.primaryText }}
                      >
                        {gen}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </NameField>
            </Fields>
            <Header>Pokédex</Header>
          </StyledPaper>
        </Grow>
      </Wrapper>
      <Images>
        {isLoading ? (
          <div style={{ top: "50%", position: "relative" }}>
            <CircularProgress color="warning" />
          </div>
        ) : (
          pokedex.map((p, index) => (
            <Card key={index} sx={cardStyles(p)} variant="elevation" raised>
              <Image
                hasPokemon={!!hasPokemon.includes(p.name)}
                key={index}
                src={p.image}
                alt="image!"
                onClick={() => onOpen(index)}
              />
            </Card>
          ))
        )}
      </Images>
      <PokedexModal
        pokemon={pokemon}
        openModal={isModalOpen}
        closeModal={onClose}
      />
    </Container>
  )
}
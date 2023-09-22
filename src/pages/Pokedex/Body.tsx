import {
  Card,
  Chip,
  FormControl,
  Grow,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Theme, TypeColours } from "../../Theme"
import { PokedexModal } from "../../components/PokedexModal"
import { Loading } from "../../components/Skeleton"
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone"

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

const Image = styled.img`
  display: flex;
  height: 150px;
  width: 150px;
  padding: 20px;
  // filter: brightness(0.5);
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

export const PokedexBody = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pokedex, setPokedex] = useState<Record<string, any>[]>([{}])
  const [pokemon, setPokemon] = useState<Record<string, any>>({})
  const [regionToggle, setRegionToggle] = useState<boolean>(false)
  const [generation, setGeneration] = useState<Record<string, any>>({})

  const Gen1 = "1 - 151"
  const Gen2 = "152 - 251"
  const Gen3 = "252 - 386"
  const Gen4 = "387 - 493"

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
    const fetchPokemon = async () => {
      setIsLoading(true)
      let pokedex: Record<string, any>[] = [{}]

      for (var i = 1; i <= 493; i++) {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
          .then((response) => response.json())
          .then((data) => {
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
              colour: TypeColours[pokemon?.types?.[0]] ?? "#a8a878",
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
            })
          })
      }
      pokedex.shift()
      setPokedex(pokedex)
      return pokedex
    }

    fetchPokemon()

    setIsLoading(false)
  }, [])

  const onViewChange = () => {
    setRegionToggle(!regionToggle)
  }

  return isLoading ? (
    <Loading view={true} />
  ) : (
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
                    sx={{
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
                    }}
                  >
                    <MenuItem value="">
                      <b style={{ color: Theme.primaryText }}>All</b>
                    </MenuItem>
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
        {pokedex?.map((p, index) => (
          <Card
            key={index}
            sx={{
              height: 200,
              width: 200,
              padding: "2rem",
              margin: "1rem",
              backgroundColor: Theme.lightBg,
              borderRadius: "15px",
              boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px",
              transition: "all 0.8s !important",
              ":hover": {
                padding: "1.8em",
                boxShadow: `0px 0px 10px 5px ${
                  TypeColours[p.types?.[0]]
                } , 0px 0px 0px 0px #ffffff`,
              },
            }}
            variant="elevation"
            raised
          >
            <Image
              key={index}
              src={p.image}
              alt="image"
              onClick={() => onOpen(index)}
            />
          </Card>
        ))}
      </Images>
      <PokedexModal
        pokemon={pokemon}
        openModal={isModalOpen}
        closeModal={onClose}
      />
    </Container>
  )
}

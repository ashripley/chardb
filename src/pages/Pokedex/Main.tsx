import {
  Card,
  CircularProgress,
  Fade,
  Grow,
  Pagination,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { Theme } from "../../Theme"
import { AllCards } from "../../api/queries/allCards"
import axios from "axios"
import { IconImageMap } from "../../components/IconImageMap"
import tick from "../../assets/icons/tick.png"
import { upperCaseFirst } from "../../helpers/upperCaseFirst"

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
  width: 100%;
  margin-right: -320px;
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
  justify-content: center;
`

const Image = styled.img<{ hasPokemon: boolean }>`
  display: flex;
  height: 150px;
  width: 150px;
  padding: 20px;
  ${({ hasPokemon }) => hasPokemon && `margin-top: -25px`}
`

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pokedex, setPokedex] = useState<Record<string, any>[]>([{}])
  const [hasPokemon, setHasPokemon] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pokedexName, setPokedexName] = useState<string>("")

  const itemsPerPage = 50

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

  const fetchAllPokemon = useCallback(async () => {
    setIsLoading(true)
    let allPokemon: Record<string, any>[] = []

    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=493"
      )
      const { results } = response.data
      const pokemonDetailsPromises = results.map((results: any) =>
        axios.get(results.url)
      )

      const pokemonDetails = await Promise.all(pokemonDetailsPromises)

      allPokemon = pokemonDetails.map((data: any) => {
        const { name, types } = data.data

        return {
          name,
          types: types.map((type: Record<string, any>) => type.type.name),
          colour: Theme.typeColours[types?.[0]] ?? "#a8a878",
          image: `https://img.pokemondb.net/sprites/home/normal/${name}.png`,
        }
      })
    } catch (error) {
      console.error("Error fetching pokemon data:", error)
    }

    const cards = await AllCards()

    const cardFilter = cards.map((p) => p.name)

    setHasPokemon(cardFilter)

    setPokedex(allPokemon)
    setIsLoading(false)
  }, [])

  const paginatedPokemon = pokedex.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    fetchAllPokemon()
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [currentPage])

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
            }}
          >
            <Header>Pokédex</Header>
            <TextField
              id="standard"
              value={pokedexName}
              label={"Search"}
              variant="outlined"
              style={{ width: 300, margin: 20 }}
              color={"warning"}
              onChange={(e) => setPokedexName(e.target.value)}
              // error={error}
              InputProps={{
                sx: {
                  borderRadius: "15px !important",
                  fieldset: {
                    borderColor: "#e3e4db",
                  },
                  input: { color: Theme.primaryText },

                  "&:hover": {
                    fieldset: {
                      borderColor: "#ed6d03 !important",
                    },
                  },
                },
              }}
            />
          </StyledPaper>
        </Grow>
      </Wrapper>
      <Images>
        {isLoading ? (
          <div style={{ top: "50%", position: "relative" }}>
            <CircularProgress color="warning" />
          </div>
        ) : (
          (pokedexName !== ""
            ? pokedex.filter((p: Record<string, any>) =>
                p.name?.includes(pokedexName)
              )
            : paginatedPokemon
          ).map((p, index) => (
            <Card key={index} sx={cardStyles(p)} variant="elevation" raised>
              {!!hasPokemon.includes(p.name) && IconImageMap(tick, true)}
              <Tooltip
                title={upperCaseFirst(p.name)}
                placement="bottom"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                componentsProps={{
                  tooltip: {
                    sx: {
                      fontSize: "1rem",
                    },
                  },
                }}
              >
                <Image
                  hasPokemon={!!hasPokemon.includes(p.name)}
                  key={index}
                  src={p.image}
                  alt="image!"
                />
              </Tooltip>
            </Card>
          ))
        )}
      </Images>
      <PaginationWrapper>
        <Pagination
          count={Math.ceil(pokedex.length / itemsPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="standard"
          style={{ margin: 50, marginTop: 80 }}
        />
      </PaginationWrapper>
      {/* <PokedexModal
        pokemon={pokemon}
        openModal={isModalOpen}
        closeModal={onClose}
      /> */}
    </Container>
  )
}

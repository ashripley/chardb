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
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { theme } from "../theme"
import { AllCards } from "../api/queries/allCards"
import tick from "../assets/icons/tick.png"
import { IconImageMap } from "../components/IconImageMap"
import { upperCaseFirst } from "../helpers/upperCaseFirst"
import { isMobile, sxColourMap } from "../helpers/view"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

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
  flex-wrap: wrap;
`

const Header = styled.div`
  display: flex;
  font-weight: 800;
  font-family: ${theme.fontFamily};
  color: ${theme.primaryText};
  font-size: 30px;
  justify-content: center;
  padding: 30px 0px;
  width: 100%;
  min-width: 300px;
`

const StyledPaper = styled(Paper)`
  margin: 0px 30px;
  width: 100%;
  flex-wrap: wrap;
`

const Images = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  height: auto;
  flex-wrap: wrap;
  justify-content: center;
`

const Image = styled.img<{ hasPokemon: boolean; isMobile: boolean }>`
  display: flex;
  height: ${({ isMobile }) => (isMobile ? "50px" : "150px")};
  weight: ${({ isMobile }) => (isMobile ? "50px" : "150px")};
  padding: 20px;
  ${({ hasPokemon }) => hasPokemon && `margin-top: -25px`}
`

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const Pokedex = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [pokedex, setPokedex] = useState<Record<string, any>[]>([{}])
  const [hasPokemon, setHasPokemon] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pokedexName, setPokedexName] = useState<string>("")

  const { dbType } = useSelector((state: RootState) => state.root)

  const itemsPerPage = 50

  const cardStyles = (p: Record<string, any>) => {
    return {
      height: isMobile ? 100 : 200,
      width: isMobile ? 100 : 200,
      padding: isMobile ? "1rem" : "2rem",
      margin: isMobile ? "0.5rem" : "1rem",
      backgroundColor: theme.lightBg,
      borderRadius: "15px",
      boxShadow: "rgba(0, 0, 0, 0.4) 0px 40px 90px",
      transition: "all 0.5s !important",
      border: "8px solid white",
      ":hover": {
        boxShadow: `0px 0px 10px 5px ${
          theme.typeColours[p.types?.[0]]
        } , 0px 0px 0px 0px #ffffff`,
      },
    }
  }

  const fieldStyle = {
    minWidth: 250,
    width: "20%",
    margin: "20px auto",
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
          colour: theme.typeColours[types?.[0]] ?? "#a8a878",
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
              backgroundColor: theme.lightBg,
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
              style={{ ...fieldStyle }}
              color={sxColourMap[dbType]}
              onChange={(e) => setPokedexName(e.target.value)}
              InputProps={{
                sx: {
                  borderRadius: "15px !important",
                  fieldset: {
                    borderColor: theme.darkBg,
                  },
                  input: { color: theme.primaryText },
                  width: "auto",

                  "&:hover": {
                    fieldset: {
                      borderColor:
                        (dbType === "char"
                          ? theme.charAccent
                          : dbType === "squir"
                          ? theme.squirAccent
                          : theme.bulbAccent) + "!important",
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
            <CircularProgress color={sxColourMap[dbType]} />
          </div>
        ) : (
          (pokedexName !== ""
            ? pokedex.filter((p: Record<string, any>) =>
                p.name?.includes(pokedexName.toLowerCase())
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
                  isMobile={isMobile}
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
    </Container>
  )
}

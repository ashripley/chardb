import { Button, CircularProgress, TextField } from "@mui/material"
import styled from "styled-components"
import Box from "@mui/material/Box"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { theme } from "../../theme"
import { RootState } from "../../redux/store"
import { AllSets } from "../../api/queries/allSets"
import { setPokemonData, setSetData } from "../../redux/root"
import { sxColourMap } from "../../helpers/view"
import { AddPokemonMutation } from "../../api/mutations/addPokemon"
import { AllPokemon } from "../../api/queries/allPokemon"

const Header = styled.div`
  font-size: 1.5rem;
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin: 0;
  font-family: ${theme.fontFamily};
  min-height: 50px;
  padding: 15px;
  width: auto;
}
`

const Details = styled.div`
  align-items: center;
  height: 90%;
  width: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
`

const Row = styled.div`
  height: auto;
  display: flex;
  gap: 10px;
  min-height: 30px;
  width: auto;
  min-width: 400px;
`

const Data = styled.div`
  display: flex;
  font-weight: 800;
  justify-content: center;
  align-items: center;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
  min-height: 30px;
  width: auto;
  min-width: 400px;
`

const PokemonRowData = styled(Data)`
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
`

const StyledBox = styled(Box)`
  overflow: auto;
  max-height: 80%;
  padding: 20px;
`

const Container = styled.div`
  width: auto;
  height: auto;
  min-height: 200px;
  min-width: 400px;
  display: flex;
  font-weight: 800;
  justify-content: flex-start;
  align-items: center;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
  gap: 30px;
  padding: 10px;
`

const StyledImage = styled.img`
  width: 150px;
  height: 150px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 100px;
  width: auto;
  min-width: 400px;
  flex-direction: column;
  gap: 10px;
`

const NoResultsContainer = styled.div`
  width: auto;
  height: auto;
  padding: 20px;
  display: flex;
  font-weight: 800;
  justify-content: flex-start;
  align-items: center;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
`

const saveButton = {
  width: "auto",
  minWidth: "100px",
  minHeight: "40px",
  height: "auto",
}

const searchButton = {
  width: "auto",
  minWidth: "150px",
  minHeight: "50px",
  height: "auto",
}

const inputProps = {
  sx: {
    borderRadius: "10px !important",
    minWidth: 150,
    fieldset: {
      borderColor: theme.darkBg,
    },
    input: { color: theme.primaryText },

    "&:hover": {
      fieldset: {
        borderColor: `${theme.charAccent} !important`,
      },
    },
  },
}
export const Pokemon = () => {
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncLoading, setIsSyncLoading] = useState(false)
  const [isFetchLoading, setIsFetchLoading] = useState(false)
  const [showPokemon, setShowPokemon] = useState(false)
  const [noResultsFound, setNoResultsFound] = useState(false)
  const [searchedPokemon, setSearchedPokemon] = useState<Record<string, any>>(
    {}
  )

  const dispatch = useDispatch()
  const { pokemonData } = useSelector((state: RootState) => state.root)

  const fetchPokemon = async () => {
    setIsFetchLoading(true)
    try {
      const pokemon = await AllPokemon()

      dispatch(setPokemonData(pokemon || []))
      setIsFetchLoading(false)
    } catch (error) {
      console.error("set error: ", error)
    }
  }
  // useEffect(() => {
  //   console.log("useEffect fetch pokemon")
  //   fetchPokemon()
  // }, [])

  const onSync = async () => {
    setIsSyncLoading(true)

    await AddPokemonMutation()

    setIsSyncLoading(false)
  }

  const onSearch = () => {
    setIsLoading(true)
    if (pokemonData.some((obj) => obj.name === name)) {
      console.log("in if")
      setIsLoading(false)
      setSearchedPokemon(pokemonData.filter((obj) => obj.name === name))
      setShowPokemon(true)
    } else {
      console.log("in else")
      setNoResultsFound(true)
      setIsLoading(false)
    }
  }

  const onClear = () => {
    setName("")
    setShowPokemon(false)
    setNoResultsFound(false)
  }

  return (
    <StyledBox>
      <Details>
        {isFetchLoading ? (
          <CircularProgress
            size={24}
            sx={{
              color: theme.charAccent,
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        ) : (
          <Header>Number of Pokemon in chardb: {pokemonData.length}</Header>
        )}
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            variant="outlined"
            size="small"
            color="success"
            onClick={onSync}
            sx={saveButton}
            disabled={isSyncLoading}
          >
            sync db
          </Button>
          {isSyncLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: theme.bulbAccent,
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </Details>
      <Header>{"Search Pokemon in chardb"}</Header>
      <Details>
        <Row>
          <Data>
            <TextField
              id="standard"
              value={name}
              label="Name"
              variant="outlined"
              color={sxColourMap["char"]}
              style={{ width: "100%", margin: 5 }}
              InputProps={inputProps}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </Data>
        </Row>
        <Box sx={{ m: 1, position: "relative", display: "flex", gap: 5 }}>
          <Button
            variant="outlined"
            size="small"
            color="warning"
            onClick={onSearch}
            sx={searchButton}
            disabled={!name}
          >
            Search DB
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={onClear}
            sx={searchButton}
            disabled={name == ""}
          >
            Clear
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: theme.bulbAccent,
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </Details>
      {showPokemon ? (
        <Container>
          <StyledImage
            src={searchedPokemon[0].image}
            alt={searchedPokemon[0].name}
          />
          <Wrapper>
            <PokemonRowData>Name: {searchedPokemon[0].name}</PokemonRowData>
            <PokemonRowData>Id: {searchedPokemon[0].id}</PokemonRowData>
            <PokemonRowData>Type: {searchedPokemon[0].type}</PokemonRowData>
          </Wrapper>
        </Container>
      ) : noResultsFound ? (
        <NoResultsContainer>No Results Found</NoResultsContainer>
      ) : (
        <></>
      )}
    </StyledBox>
  )
}

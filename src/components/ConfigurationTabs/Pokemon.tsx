import { Button, CircularProgress, TextField } from "@mui/material"
import styled from "styled-components"
import Box from "@mui/material/Box"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { theme } from "../../theme"
import { RootState } from "../../redux/store"
import { setPokemonData } from "../../redux/root"
import { sxColourMap } from "../../helpers/view"
import { BulkAddPokemonMutation } from "../../api/mutations/bulkAddPokemon"
import { AllPokemon } from "../../api/queries/allPokemon"
import { AddPokemonMutation } from "../../api/mutations/addPokemon"
import { DeletePokemonMutation } from "../../api/mutations/deletePokemon"

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
  const [searchName, setSearchName] = useState("")
  const [addName, setAddName] = useState("")
  const [deleteName, setDeleteName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAddLoading, setIsAddLoading] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
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
    try {
      setIsFetchLoading(true)

      const pokemon = await AllPokemon()

      dispatch(setPokemonData(pokemon))
    } catch (error) {
      console.error("set error: ", error)
    } finally {
      setIsFetchLoading(false)
    }
  }
  useEffect(() => {
    fetchPokemon()
  }, [])

  const onSync = async () => {
    fetchPokemon()
  }

  // upsert for 151 bulk add
  // const upsert = async () => {
  //   setIsLoading(true)
  //   await BulkAddPokemonMutation()
  //   setIsLoading(false)
  // }

  const onSearch = async () => {
    setIsLoading(true)
    if (pokemonData[searchName]) {
      setSearchedPokemon(pokemonData[searchName])
      setIsLoading(false)
      setSearchedPokemon(pokemonData[searchName])
      setShowPokemon(true)
    } else {
      setNoResultsFound(true)
      setIsLoading(false)
    }
  }

  const onAdd = async () => {
    setIsAddLoading(true)
    if (!pokemonData[addName]) {
      try {
        await AddPokemonMutation(addName)
        setAddName("")
      } catch (e) {
        console.error("Error adding pokemon to DB: ", e)
      } finally {
        fetchPokemon()
        console.log("pokemonData", pokemonData)
        setIsAddLoading(false)
      }
    }
  }

  const onDelete = async () => {
    setIsDeleteLoading(true)
    if (pokemonData[deleteName]) {
      try {
        console.log("deleteName", deleteName)
        await DeletePokemonMutation(deleteName)
        setDeleteName("")
      } catch (e) {
        console.error("Error deleting pokemon from DB: ", e)
      } finally {
        fetchPokemon()
        console.log("pokemonData", pokemonData)
        setIsDeleteLoading(false)
      }
    }
  }

  const onClear = () => {
    setSearchName("")
    setShowPokemon(false)
    setNoResultsFound(false)
  }

  return (
    <StyledBox>
      <Details>
        <Header>
          Number of Pokemon in DB:
          {isFetchLoading ? (
            <CircularProgress
              size={24}
              sx={{
                color: theme.charAccent,
                marginLeft: "20px",
              }}
            />
          ) : (
            <Header>{Object.keys(pokemonData).length}</Header>
          )}
        </Header>
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            variant="outlined"
            size="small"
            color="success"
            onClick={onSync}
            sx={saveButton}
            disabled={isFetchLoading}
          >
            sync db
          </Button>
          {isFetchLoading && (
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
          {/* button to upsert 151 pokemon into db */}
          {/* <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={upsert}
            sx={saveButton}
            disabled={isFetchLoading}
          >
            upsert 151
          </Button>
          {isFetchLoading && (
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
          )} */}
        </Box>
      </Details>
      <Header>{"Search Pokemon in DB"}</Header>
      <Details>
        <Row>
          <Data>
            <TextField
              id="standard"
              value={searchName}
              label="Name"
              variant="outlined"
              color={sxColourMap["char"]}
              style={{ width: "100%", margin: 5 }}
              InputProps={inputProps}
              onChange={(e) => {
                setSearchName(e.target.value)
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
            disabled={!searchName}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={onClear}
            sx={searchButton}
            disabled={searchName == ""}
          >
            Clear
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: theme.bulbAccent,
              }}
            />
          )}
        </Box>
      </Details>
      {showPokemon ? (
        <Container>
          <StyledImage src={searchedPokemon.image} alt={searchedPokemon.name} />
          <Wrapper>
            <PokemonRowData>Name: {searchedPokemon.name}</PokemonRowData>
            <PokemonRowData>Id: {searchedPokemon.id}</PokemonRowData>
            <PokemonRowData>Type: {searchedPokemon.type}</PokemonRowData>
          </Wrapper>
        </Container>
      ) : noResultsFound ? (
        <NoResultsContainer>No Results Found</NoResultsContainer>
      ) : (
        <></>
      )}
      <br></br>
      <Header>{"Add Pokemon To DB"}</Header>
      <Details>
        <Row>
          <Data>
            <TextField
              id="standard"
              value={addName}
              label="Name"
              variant="outlined"
              color={sxColourMap["char"]}
              style={{ width: "100%", margin: 5 }}
              InputProps={inputProps}
              onChange={(e) => {
                setAddName(e.target.value)
              }}
            />
          </Data>
        </Row>
        <Box sx={{ m: 1, position: "relative", display: "flex", gap: 5 }}>
          <Button
            variant="outlined"
            size="small"
            color="warning"
            onClick={onAdd}
            sx={searchButton}
            disabled={!addName}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={onClear}
            sx={searchButton}
            disabled={addName == ""}
          >
            Clear
          </Button>
          {isAddLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: theme.bulbAccent,
              }}
            />
          )}
        </Box>
      </Details>
      <br></br>
      <Header>{"Delete Pokemon From DB"}</Header>
      <Details>
        <Row>
          <Data>
            <TextField
              id="standard"
              value={deleteName}
              label="Name"
              variant="outlined"
              color={sxColourMap["char"]}
              style={{ width: "100%", margin: 5 }}
              InputProps={inputProps}
              onChange={(e) => {
                setDeleteName(e.target.value)
              }}
            />
          </Data>
        </Row>
        <Box sx={{ m: 1, position: "relative", display: "flex", gap: 5 }}>
          <Button
            variant="outlined"
            size="small"
            color="warning"
            onClick={onDelete}
            sx={searchButton}
            disabled={!deleteName}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={onClear}
            sx={searchButton}
            disabled={deleteName == ""}
          >
            Clear
          </Button>
          {isDeleteLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: theme.bulbAccent,
              }}
            />
          )}
        </Box>
      </Details>
    </StyledBox>
  )
}

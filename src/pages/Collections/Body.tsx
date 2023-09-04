import {
  Button,
  CircularProgress,
  FormControl,
  Grow,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material"
import { useEffect, useState } from "react"
import styled from "styled-components"
import AddIcon from "@mui/icons-material/Add"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import RefreshIcon from "@mui/icons-material/Refresh"
import { Card } from "../../api/queries/cards"
import { AllCards } from "../../api/queries/allCards"
import { AddCard } from "../../components/Cards/AddCard"
import { Spinner } from "../../components/Spinner"
import { Cards } from "../../components/Cards/Cards"
import axios from "axios"

const Root = styled.div`
  display: flex;
  max-width: 100%;
  width: 100%;
  justify-content: center;
  background: white !important;
  padding-top: 30px;
`

const StyledPaper = styled(Paper)`
  margin: 20px;
  width: 60%;
`

const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
`
const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 80vh;
  padding: 30px;
  background: white !important;
`

const TextFieldWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`

const Fields = styled.div`
  display: block;
  max-width: 100%;
  width: 100%;
`

const NameField = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Buttons = styled.div`
  max-width: 100%;
  width: 15%;
  display: flex;
  justify-content: flex-start;
`

const Actions = styled.div`
  max-width: 100%;
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const CollectionsBody = () => {
  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [showAddCard, setShowAddCard] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [icon, setIcon] = useState<string>("collections")
  const [data, setData] = useState([{ id: 0, url: { front: "", back: "" } }])
  const [category, setCategory] = useState<Record<string, any>>({})

  const axiosTest = async (pokemon: string) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    )
    return response.data
  }

  const QueryAllCards = async () => {
    setData([])
    setIsLoading(true)

    const allCards = await AllCards()

    allCards.map(async (card) => {
      const pokemon = await axiosTest(card.name)

      const tempData = {
        ...card,
        id: pokemon.id,
        url: {
          front: pokemon.sprites.front_default,
          back: pokemon.sprites.back_default,
        },
      }
      setData((prev) => [...prev, tempData])
      return
    })

    setShowCard(true)
    setIsLoading(false)
  }

  const handleError = () => {
    setName("")
    setError(false)
    setIcon("collections")
  }

  const handleRefresh = () => {
    setName("")
    setIcon("collections")
    setShowCard(false)
    setData([])
  }

  const handleElse = () => {}

  useEffect(() => {
    QueryAllCards()
  }, [])

  const categories = ["Name", "Type", "Set", "Year"]

  return (
    <>
      {isLoading && <Spinner />}
      <Root>
        <Grow
          in={true}
          style={{ transformOrigin: "1 1 1" }}
          {...(true ? { timeout: 1000 } : { timeout: 1000 })}
        >
          <StyledPaper
            variant="outlined"
            elevation={5}
            style={{
              backgroundColor: "white",
              border: "none",
              borderRadius: 15,
              boxShadow: "0px 10px 15px 0px rgba(0, 0, 0, 0.45)",
            }}
          >
            <Wrapper>
              <Fields>
                <NameField>
                  <FormControl
                    sx={{ borderRadius: "15px !important", width: "30%" }}
                  >
                    <InputLabel color="warning">{"Category"}</InputLabel>
                    <Select
                      id="standard"
                      variant="outlined"
                      value={category.value}
                      label={"Category"}
                      color="warning"
                      onChange={(e) =>
                        setCategory({ key: "category", value: e.target.value })
                      }
                      sx={{ borderRadius: "15px !important" }}
                    >
                      <MenuItem value="">
                        <b>None</b>
                      </MenuItem>
                      {categories.map((category) => (
                        <MenuItem value={category}>{category}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextFieldWrapper>
                    <TextField
                      id="standard"
                      value={name}
                      label={`${
                        error
                          ? "No Results Found"
                          : category.value
                          ? `Pokémon ${category.value}`
                          : "Search All Pokémon..."
                      }`}
                      variant="outlined"
                      style={{ width: "100%" }}
                      color={icon === "error" ? "error" : "warning"}
                      onChange={(e) => setName(e.target.value)}
                      error={error}
                      InputProps={{
                        sx: {
                          borderRadius: "15px !important",
                        },
                      }}
                    />
                  </TextFieldWrapper>
                  <Buttons>
                    <Actions>
                      <Button
                        variant="outlined"
                        size="small"
                        color={`${
                          icon === "error"
                            ? "error"
                            : icon === "refresh"
                            ? "secondary"
                            : "warning"
                        }`}
                        style={{
                          width: "15%",
                          height: "100%",
                          borderRadius: 50,
                        }}
                        onClick={async () => {
                          // icon === "collections"
                          //   ? QueryCard()
                          icon === "error"
                            ? handleError()
                            : icon === "refresh"
                            ? handleRefresh()
                            : handleElse()
                        }}
                      >
                        {isLoading === true ? (
                          <CircularProgress color="warning" />
                        ) : icon === "error" ? (
                          <ClearIcon />
                        ) : icon === "refresh" ? (
                          <RefreshIcon />
                        ) : (
                          <SearchIcon />
                        )}
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        style={{
                          width: "15%",
                          height: "100%",
                          borderRadius: 50,
                        }}
                        onClick={() => setShowAddCard(!showAddCard)}
                      >
                        {showAddCard ? (
                          <RemoveCircleOutlineIcon />
                        ) : (
                          <AddIcon />
                        )}
                      </Button>
                    </Actions>
                  </Buttons>
                </NameField>
              </Fields>
            </Wrapper>
          </StyledPaper>
        </Grow>
      </Root>
      <Container>
        {showAddCard && <AddCard />}
        {showCard && (
          <Cards pokemon={data} mounted={showCard} isLoading={isLoading} />
        )}
        {/* {snapshots &&
          snapshots.map((snapshot, index) => (
            <PokemonCard
              cardIndex={index}
              query={snapshot}
              isLoading={isLoading}
              mounted={showCard}
            />
          ))} */}
      </Container>
    </>
  )
}

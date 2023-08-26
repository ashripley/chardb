import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material"
import { useState } from "react"
import styled from "styled-components"
import AddIcon from "@mui/icons-material/Add"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import { PokemonCard } from "./PokemonCard"
import RefreshIcon from "@mui/icons-material/Refresh"
import { QueryCards } from "../../api/card"
import { Add } from "./Add"

const Root = styled.div`
  display: flex;
  max-width: 100%;
  width: 100%;
  justify-content: center;
  background: white !important;
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
  justify-content: space-evenly;
`

export const BrowseBody = () => {
  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [showAddCard, setShowAddCard] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [icon, setIcon] = useState<string>("browse")
  const [snapshot, setSnapshot] = useState<Record<string, any>>([])
  const [category, setCategory] = useState<Record<string, any>>({})

  const QueryCard = async () => {
    setIsLoading(true)

    const newCategory =
      typeof category.value === "string"
        ? category.value.toLowerCase()
        : category.value

    const snapshot = await QueryCards(name, newCategory)

    // if empty, set error and early exit
    if (snapshot?.empty) {
      setError(true)
      setIcon("error")
      setIsLoading(false)
      return
    }

    let snapshots: Record<string, any> = []

    await snapshot?.forEach((doc: Record<string, any>) => {
      snapshots.push(doc.data())
    })

    console.log("snapshots", snapshots)
    setSnapshot(snapshots)

    setShowCard(true)
    setIsLoading(false)
    setIcon("refresh")

    return snapshots
  }

  const handleError = () => {
    setName("")
    setError(false)
    setIcon("browse")
  }

  const handleRefresh = () => {
    console.log("refresh")
    setName("")
    setIcon("browse")
    setShowCard(false)
    setSnapshot([])
  }

  const handleElse = () => {}

  const categories = ["Name", "Type", "Set", "Year"]

  return (
    <>
      <Root>
        <StyledPaper
          variant="outlined"
          elevation={5}
          style={{ backgroundColor: "white", border: "none" }}
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
                        ? "No Pokémon Found"
                        : category.value
                        ? `Pokémon ${category.value}`
                        : icon === "refresh"
                        ? "Refresh results..."
                        : "Search All Pokémon..."
                    }`}
                    variant="outlined"
                    style={{ width: "100%" }}
                    color={
                      icon === "error"
                        ? "error"
                        : icon === "refresh"
                        ? "secondary"
                        : "warning"
                    }
                    onChange={(e) => setName(e.target.value)}
                    error={error}
                    InputProps={{ sx: { borderRadius: "15px !important" } }}
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
                      style={{ width: "15%", borderRadius: 15 }}
                      onClick={async () => {
                        icon === "browse"
                          ? QueryCard()
                          : icon === "error"
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

                    {/* <Button
                      variant="outlined"
                      size="small"
                      style={{ width: "15%", borderRadius: 15 }}
                      onClick={() => setShowFilterCard(!showFilterCard)}
                    >
                      {!showFilterCard ? <FilterAlt /> : <FilterAltOffIcon />}
                    </Button> */}
                    <Button
                      variant="outlined"
                      size="small"
                      color="success"
                      style={{ width: "15%", borderRadius: 15 }}
                      onClick={() => setShowAddCard(!showAddCard)}
                    >
                      {!showAddCard ? <AddIcon /> : <RemoveCircleOutlineIcon />}
                    </Button>
                  </Actions>
                </Buttons>
              </NameField>
            </Fields>
          </Wrapper>
        </StyledPaper>
      </Root>
      <Container>
        {showAddCard && (
          <Add name="charmander" type="fire" set="base" year={1995} />
        )}
        {showCard && <PokemonCard query={snapshot} />}
      </Container>
    </>
  )
}

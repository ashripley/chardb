import { FilterAlt } from "@mui/icons-material"
import { Button, CircularProgress, Paper, TextField } from "@mui/material"
import { useState } from "react"
import styled from "styled-components"
import { AddCard } from "./AddCard"
import AddIcon from "@mui/icons-material/Add"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"
import { FilterCard } from "./FilterCard"
import { PokemonCard } from "./PokemonCard"
import RefreshIcon from "@mui/icons-material/Refresh"
import { QueryName } from "../../api/name"
import wallpaper from "../assets/wallpaper.jpg"

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
  justify-content: center;
`

const Buttons = styled.div`
  max-width: 100%;
  width: 30%;
  display: flex;
  justify-content: flex-start;
`

const Actions = styled.div`
  max-width: 100%;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`

const Filter = styled.div`
  max-width: 100%;
  display: flex;
  width: 20%;
  justify-content: center;
`

export const Body = () => {
  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [showAddCard, setShowAddCard] = useState(false)
  const [showFilterCard, setShowFilterCard] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [icon, setIcon] = useState<string>("browse")
  const [snapshot, setSnapshot] = useState<Record<string, any>>([])

  //test
  const [fetch, setFetch] = useState(false)

  const QueryCard = async () => {
    setIsLoading(true)

    const snapshot = await QueryName(name)

    // if empty, set error and early exit
    if (snapshot.empty) {
      setError(true)
      setIcon("error")
      setIsLoading(false)
      return
    }

    let snapshots: Record<string, any> = []

    await snapshot.forEach((doc) => {
      snapshots.push(doc.data())
    })

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
    setName("")
    setIcon("browse")
    setShowCard(false)
    setSnapshot([])
  }

  const handleElse = () => {}

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
                <TextFieldWrapper>
                  <TextField
                    id="standard"
                    value={name}
                    label={`${error ? "No Pokémon Found" : "Pokémon Name"}`}
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
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ width: "15%", borderRadius: 15 }}
                      onClick={() => setShowFilterCard(!showFilterCard)}
                    >
                      {!showFilterCard ? <FilterAlt /> : <FilterAltOffIcon />}
                    </Button>
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
            {/* {isLoading && <div>LOADING</div>} */}
          </Wrapper>
        </StyledPaper>
      </Root>
      <Container>
        {showAddCard && (
          <AddCard name="charmander" type="fire" set="base" year={1995} />
        )}
        {showFilterCard && (
          <FilterCard
          // name={name}
          // type={type}
          // set={set}
          // year={year}
          />
        )}
        {/* {fetch && <FetchQuery />} */}
        {showCard && <PokemonCard query={snapshot} />}
      </Container>
    </>
  )
}
import { FilterAlt } from "@mui/icons-material"
import { Button, TextField } from "@mui/material"
import { useState } from "react"
import styled from "styled-components"
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../services/firebase"
import { useFirestoreQueryData } from "@react-query-firebase/firestore"
import { AddCard } from "./AddCard"
import AddIcon from "@mui/icons-material/Add"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"
import { FilterCard } from "./FilterCard"
import { FetchQuery } from "./TestQuery"
import { Card } from "./Card"
import RefreshIcon from "@mui/icons-material/Refresh"

const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  margin: 30px;
  display: flex;
  justify-content: center;
`
const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 80vh;
`

const TextFieldWrapper = styled.div`
  width: 30%;
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
  width: 15%;
  display: flex;
  justify-content: flex-start;
`

const Actions = styled.div`
  max-width: 100%;
  display: flex;
  width: 90%;
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
  const [refresh, setRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [icon, setIcon] = useState<string>("search")
  const [snapshot, setSnapshot] = useState<Record<string, any>>([])

  //test
  const [fetch, setFetch] = useState(false)

  // query
  const QueryCard = async () => {
    console.log("### query")
    setIsLoading(true)

    const ref = await collection(firestore, "cards")

    const res = await query(ref, where("name", "==", name))

    const snapshot = await getDocs(res)

    // if empty, set error and early exit
    if (snapshot.empty) {
      setError(true)
      setIcon("error")
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
    setIcon("search")
  }

  const handleRefresh = () => {
    setName("")
    setIcon("search")
    setShowCard(false)
    setSnapshot([])
  }

  const handleElse = () => {}

  return (
    <>
      <Wrapper>
        <Button onClick={() => setFetch(!fetch)}>Fetch</Button>
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
                  style={{ width: "15%" }}
                  onClick={async () => {
                    if (icon === "search") {
                      QueryCard()
                    } else if (icon === "error") {
                      handleError()
                    } else if (icon === "refresh") {
                      handleRefresh()
                    } else {
                      handleElse()
                    }
                  }}
                >
                  {icon === "error" ? (
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
                  style={{ width: "15%" }}
                  onClick={() => setShowFilterCard(!showFilterCard)}
                >
                  {!showFilterCard ? <FilterAlt /> : <FilterAltOffIcon />}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="success"
                  style={{ width: "15%" }}
                  onClick={() => setShowAddCard(!showAddCard)}
                >
                  {!showAddCard ? <AddIcon /> : <RemoveCircleOutlineIcon />}
                </Button>
              </Actions>
            </Buttons>
          </NameField>
        </Fields>
        {isLoading && <div>LOADING</div>}
      </Wrapper>
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
        {fetch && <FetchQuery />}
        {showCard && <Card query={snapshot} />}
      </Container>
    </>
  )
}

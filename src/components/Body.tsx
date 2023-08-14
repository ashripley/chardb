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

  const QueryCard = async () => {
    const cardsRef = collection(firestore, "cards")
    const q = query(cardsRef, where("name", "==", name))

    const querySnapshot = await getDocs(q)
    console.log("### querySnapshot: ", querySnapshot)

    if (querySnapshot.empty) return setError(true)

    querySnapshot.forEach((doc) => {
      // console.log("### doc data: ", doc.data())
      return doc.data()
    })
    setError(false)
  }

  const collectionQuery = useFirestoreQueryData(
    ["cards"],
    collection(firestore, "cards"),
    {
      subscribe: true,
    }
  )

  if (collectionQuery.isLoading) {
    return <div>Loading...</div>
  }

  const handleError = () => {
    setName("")
    setError(false)
  }

  return (
    <>
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
                color="warning"
                onChange={(e) => setName(e.target.value)}
                error={error}
              />
            </TextFieldWrapper>
            <Buttons>
              <Actions>
                <Button
                  variant="outlined"
                  size="small"
                  color={`${error ? "error" : "warning"}`}
                  style={{ width: "15%" }}
                  onClick={() => (error ? handleError() : QueryCard())}
                >
                  {!error ? <SearchIcon /> : <ClearIcon />}
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
        {collectionQuery.data?.map((document: any) => {
          return <div key={document.id}>{document.name}</div>
        })}
      </Container>
    </>
  )
}

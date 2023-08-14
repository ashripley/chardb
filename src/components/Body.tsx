import { FilterAlt } from "@mui/icons-material"
import { Button, TextField } from "@mui/material"
import { useState } from "react"
import styled from "styled-components"
import { QueryCard } from "../api/card"
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../services/firebase"
import { useFirestoreQueryData } from "@react-query-firebase/firestore"
import { AddCard } from "./AddCard"

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
  width: 30%;
  display: flex;
  justify-content: flex-start;
`

const Filter = styled.div`
  max-width: 100%;
  display: flex;
  width: 10%;
  justify-content: center;
`

const Actions = styled.div`
  max-width: 100%;
  display: flex;
  width: 70%;
  justify-content: space-evenly;
`

export const Body = () => {
  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [showAddCard, setShowAddCard] = useState(false)

  const QueryCard = async () => {
    const cardsRef = collection(firestore, "cards")
    const q = query(cardsRef, where("name", "==", name))

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) return setError(true)

    querySnapshot.forEach((doc) => {
      console.log("### doc data: ", doc.data())
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
                  color="warning"
                  style={{ width: "45%" }}
                  onClick={() => QueryCard()}
                >
                  {"Search"}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="success"
                  style={{ width: "45%" }}
                  onClick={() => setShowAddCard(!showAddCard)}
                >
                  {"Add"}
                </Button>
              </Actions>
              <Filter>
                <Button style={{ width: "5%" }}>
                  <FilterAlt />
                </Button>
              </Filter>
            </Buttons>
          </NameField>
        </Fields>
      </Wrapper>
      <Container>
        {showAddCard && (
          <AddCard
            name="charmander"
            type="fire"
            collection="base"
            year={1995}
          />
        )}
        {collectionQuery.data?.map((document: any) => {
          return <div key={document.id}>{document.name}</div>
        })}
      </Container>
    </>
  )
}

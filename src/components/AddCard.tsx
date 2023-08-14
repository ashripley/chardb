import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore"
import { collection } from "firebase/firestore"
import { firestore } from "../services/firebase"
import { Button, TextField } from "@mui/material"
import styled from "styled-components"
import { useState } from "react"

interface Props {
  name: string
  type: string
  set: string
  year: number
}

const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  margin: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const Fields = styled.div`
  display: flex;
  max-width: 100%;
  width: 100%;
  padding: 20px;
`

const NameField = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`

const Submit = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  height: 50px;
  width: 100%;
`

export const AddCard = (props: Props) => {
  const ref = collection(firestore, "cards")
  const mutation = useFirestoreCollectionMutation(ref)

  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [set, setSet] = useState("")
  const [year, setYear] = useState("")

  const addPokemonCard = () => {
    mutation.mutate({
      name,
      type,
      set,
      year,
    })
  }

  return (
    <>
      <Wrapper>
        <Fields>
          <NameField>
            <TextField
              id="standard"
              value={name}
              label={"Name"}
              variant="outlined"
              style={{ width: "20%", margin: 5 }}
              color="warning"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="standard"
              value={type}
              label={"Type"}
              variant="outlined"
              style={{ width: "20%", margin: 5 }}
              color="warning"
              onChange={(e) => setType(e.target.value)}
            />
            <TextField
              id="standard"
              value={set}
              label={"Set"}
              variant="outlined"
              style={{ width: "20%", margin: 5 }}
              color="warning"
              onChange={(e) => setSet(e.target.value)}
            />
            <TextField
              id="standard"
              value={year}
              label={"Year"}
              variant="outlined"
              style={{ width: "20%", margin: 5 }}
              color="warning"
              onChange={(e) => setYear(e.target.value)}
            />
          </NameField>
        </Fields>
        <Submit>
          <Button
            variant="contained"
            size="large"
            color="success"
            style={{ width: "10%" }}
            onClick={() => addPokemonCard()}
          >
            {`submit`}
          </Button>
        </Submit>
      </Wrapper>
      {mutation.isError && <p>{mutation.error.message}</p>}
    </>
  )
}

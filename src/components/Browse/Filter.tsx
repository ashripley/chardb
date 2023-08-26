import { and, collection, getDocs, or, query, where } from "firebase/firestore"
import { firestore } from "../../services/firebase"
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import styled from "styled-components"
import { useState } from "react"

interface Props {
  name?: string
  type?: string
  set?: string
  year?: number
  queryCard?: () => void
}

const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  margin: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background: white !important;
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

export const Filter = (props: Props) => {
  const [name, setName] = useState<Record<string, any>>({})
  const [type, setType] = useState<Record<string, any>>({})
  const [set, setSet] = useState<Record<string, any>>({})
  const [year, setYear] = useState<Record<string, any>>({})

  const fields = [name, type, set, year]

  const QueryCard = async () => {
    const cardsRef = await collection(firestore, "cards")

    const fieldArray = fields.filter((field) =>
      field?.value?.length ? field : null
    )

    const fetchedFields = await query(
      cardsRef,
      and(
        ...fieldArray.map((field) =>
          where(
            field.key,
            "==",
            field.key === "year" ? Number(field.value) : field.value
          )
        )
      )
    )

    const fieldQuerySnapshot = await getDocs(fetchedFields)

    fieldQuerySnapshot.forEach((doc) => {
      return doc.data()
    })
  }

  return (
    <>
      <Wrapper>
        <Fields>
          <NameField>
            <TextField
              id="standard"
              value={name.value}
              label={"Name"}
              variant="outlined"
              style={{ width: "20%", margin: 5 }}
              color="warning"
              onChange={(e) => setName({ key: "name", value: e.target.value })}
            />
            <FormControl style={{ width: "20%", margin: 5 }}>
              <InputLabel color="warning" id="demo-simple-select-helper-label">
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={type.value}
                label="Type"
                color="warning"
                onChange={(e) =>
                  setType({ key: "type", value: e.target.value })
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"fire"}>Fire</MenuItem>
                <MenuItem value={"water"}>Water</MenuItem>
                <MenuItem value={"flying"}>Flying</MenuItem>
                <MenuItem value={"grass"}>Grass</MenuItem>
                <MenuItem value={"electric"}>Electric</MenuItem>
                <MenuItem value={"ice"}>Ice</MenuItem>
                <MenuItem value={"normal"}>Normal</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="standard"
              value={set.value}
              label={"Set"}
              variant="outlined"
              style={{ width: "20%", margin: 5 }}
              color="warning"
              onChange={(e) => setSet({ key: "set", value: e.target.value })}
            />
            <TextField
              id="standard"
              value={year.value}
              label={"Year"}
              variant="outlined"
              style={{ width: "20%", margin: 5 }}
              color="warning"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(e) => setYear({ key: "year", value: e.target.value })}
            />
          </NameField>
        </Fields>
        <Submit>
          <Button
            variant="contained"
            size="large"
            color="success"
            style={{ width: "10%" }}
            onClick={() => QueryCard()}
          >
            {`browse`}
          </Button>
        </Submit>
      </Wrapper>
    </>
  )
}

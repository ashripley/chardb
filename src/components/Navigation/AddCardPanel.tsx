import styled from "styled-components"
import { theme } from "../../theme"
import { TextField } from "@mui/material"
import { AutoSelectComponent } from "../Selects/AutoSelectComponent"
import { SetSelect } from "../Selects/SetSelect"
import { sxColourMap } from "../../helpers/view"
import { AttributeSelect } from "../Selects/AttributeSelect"
import { RaritySelect } from "../Selects/RaritySelect"
import { useDispatch, useSelector } from "react-redux"
import { CardState, RootState } from "../../redux/store"
import { setData } from "../../redux/card"

const StudioHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 10%;
  min-width: 400px;
`

const Heading = styled.h2`
  font-weight: 800;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
  width: auto;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
  min-width: 400px;
  gap: 30px;
`

const Label = styled.h3`
  font-weight: 800;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
  min-width: 200px;
  width: 15%;
  justify-content: center;
  display: flex;
`

// add
const Row = styled.div`
  width: 100%;
  min-width: 100px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
  min-height: 30px;
`

const Data = styled.div`
  display: flex;
  width: 80%;
  font-weight: 800;
  justify-content: flex-start;
  align-items: center;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
  min-height: 30px;
`

export const AddCardPanel = () => {
  const { dbType } = useSelector((state: RootState) => state.root)
  const { data } = useSelector((state: CardState) => state.card)
  const dispatch = useDispatch()

  // dispatch(setUserSettings({ setting3: 'some other text'})

  const inputProps = {
    sx: {
      borderRadius: "15px !important",
      minWidth: 150,
      fieldset: {
        borderColor: theme.darkBg,
      },
      input: { color: theme.primaryText },

      "&:hover": {
        fieldset: {
          borderColor: `${theme[`${dbType}Accent`]} !important`,
        },
      },
    },
  }

  return (
    <>
      <StudioHeader>
        <Heading>Add Card</Heading>
      </StudioHeader>
      <Body>
        <Row>
          <Data>
            <Label>Name</Label>
            <AutoSelectComponent />
          </Data>
        </Row>
        <Row>
          <Data>
            <Label>Set</Label>
            <SetSelect fields={{}} handleSetSelectChange={() => {}} />
          </Data>
        </Row>
        <Row>
          <Data>
            <Label>Set Number</Label>
            <TextField
              id="standard"
              value={data.setNumber}
              variant="outlined"
              color={sxColourMap[dbType]}
              InputProps={inputProps}
              onChange={(e) => dispatch(setData({ setNumber: e.target.value }))}
              sx={{ width: "80%", minWidth: 200 }}
            />
          </Data>
        </Row>
        <Row>
          <Data>
            <Label>Year</Label>
            <TextField
              id="standard"
              type="number"
              value={data.year}
              variant="outlined"
              color={sxColourMap[dbType]}
              style={{ width: "100%" }}
              InputProps={inputProps}
              onChange={(e) => dispatch(setData({ year: e.target.value }))}
              sx={{ width: "80%", minWidth: 200 }}
            />
          </Data>
        </Row>
        <Row>
          <Data>
            <Label>Quantity</Label>
            <TextField
              id="standard"
              type="number"
              value={data.quantity}
              variant="outlined"
              color={sxColourMap[dbType]}
              style={{ width: "100%" }}
              InputProps={inputProps}
              onChange={(e) => dispatch(setData({ quantity: e.target.value }))}
              sx={{ width: "80%", minWidth: 200 }}
            />
          </Data>
        </Row>
        <Row>
          <Data>
            <Label>Attribute</Label>
            <AttributeSelect fields={{}} handleSelectChange={() => {}} />
          </Data>
        </Row>
        <Row>
          <Data>
            <Label>Rarity</Label>
            <RaritySelect fields={{}} handleSelectChange={() => {}} />
          </Data>
        </Row>
      </Body>
    </>
  )
}

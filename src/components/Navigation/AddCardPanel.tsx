import styled from "styled-components"
import { theme } from "../../theme"
import { Button, TextField } from "@mui/material"
import { AutoSelectComponent } from "../Selects/AutoSelectComponent"
import { SetSelect } from "../Selects/SetSelect"
import { sxColourMap } from "../../helpers/view"
import { CardTypeSelect } from "../Selects/CardTypeSelect"
import { RaritySelect } from "../Selects/RaritySelect"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { GradedRadioButton } from "../GradedRadioButton"
import { updateCard } from "../../redux/root"
import { ConditionSelect } from "../Selects/ConditionSelect"

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

const Row = styled.div`
  width: auto;
  min-width: 650px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
  min-height: 30px;
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  min-width: 400px;
`

export const AddCardPanel = () => {
  const { dbType, tempCard } = useSelector((state: RootState) => state.root)
  const dispatch = useDispatch()

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

  const saveButton = {
    width: "auto",
    minWidth: "200px",
    minHeight: "50px",
    height: "auto",
    borderRadius: "15px !important",
  }

  return (
    <>
      <StudioHeader>
        <Heading>Add Card</Heading>
      </StudioHeader>
      <Body>
        <Row>
          <AutoSelectComponent />
          <SetSelect />
        </Row>
        <Row>
          <TextField
            id="standard"
            type="number"
            label="Set Number"
            value={tempCard.setNumber}
            variant="outlined"
            color={sxColourMap[dbType]}
            InputProps={inputProps}
            onChange={(e) =>
              dispatch(updateCard({ setNumber: Number(e.target.value) }))
            }
            sx={{ width: "auto", minWidth: 300 }}
          />
          <CardTypeSelect />
        </Row>
        <Row>
          <RaritySelect />
          <TextField
            id="standard"
            type="number"
            label="Quantity"
            value={tempCard.quantity}
            variant="outlined"
            color={sxColourMap[dbType]}
            InputProps={inputProps}
            onChange={(e) =>
              dispatch(updateCard({ quantity: Number(e.target.value) }))
            }
            sx={{ width: "auto", minWidth: 300 }}
          />
        </Row>
        <Row>
          <TextField
            id="standard"
            type="number"
            value={tempCard.year}
            label="Year"
            variant="outlined"
            color={sxColourMap[dbType]}
            InputProps={inputProps}
            onChange={(e) =>
              dispatch(updateCard({ year: Number(e.target.value) }))
            }
            sx={{ width: "auto", minWidth: 300 }}
          />
          <ConditionSelect />
        </Row>
        <Row>
          <GradedRadioButton />
          <TextField
            id="standard"
            type="number"
            value={tempCard.grade}
            label="grade"
            variant="outlined"
            color={sxColourMap[dbType]}
            InputProps={inputProps}
            onChange={(e) =>
              dispatch(updateCard({ grade: Number(e.target.value) }))
            }
            disabled={!tempCard.isGraded}
            sx={{ width: "auto", minWidth: 300 }}
          />
        </Row>
        <Footer>
          <Button
            variant="outlined"
            size="small"
            color="success"
            onClick={() => {}}
            sx={saveButton}
            disabled={false}
          >
            Save
          </Button>
        </Footer>
      </Body>
    </>
  )
}

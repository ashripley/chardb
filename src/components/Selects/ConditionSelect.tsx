import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import styled from "styled-components"
import { theme } from "../../theme"
import { sxColourMap } from "../../helpers/view"
import { RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { upperCaseFirst } from "../../helpers/upperCaseFirst"
import { updateCard } from "../../redux/root"

const StyledForm = styled(FormControl)`
  @media only screen and (max-width: 600px) {
    margin: 10px !important;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  min-width: 300px;
`

export const ConditionSelect = () => {
  const dispatch = useDispatch()
  const { dbType, tempConditions, tempCard } = useSelector(
    (state: RootState) => state.root
  )

  const handleChange = (e: SelectChangeEvent) => {
    dispatch(updateCard({ condition: e.target.value as string }))
  }

  return (
    <Wrapper>
      <StyledForm
        sx={{
          borderRadius: "15px !important",
          width: "auto",
          minWidth: 300,
        }}
      >
        <InputLabel color={sxColourMap[dbType]}>Condition</InputLabel>
        <Select
          id="condition"
          variant="outlined"
          label="Condition"
          value={tempCard.condition}
          color={sxColourMap[dbType]}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: theme.lightBg,
                borderRadius: 3,
              },
            },
          }}
          input={<OutlinedInput />}
          onChange={handleChange}
          sx={{
            borderRadius: "15px",
            fieldset: {
              borderColor: theme.darkBg,
            },
            color: theme.primaryText,
            justifyContent: "center",

            "&:hover": {
              fieldset: {
                borderColor:
                  (dbType === "char"
                    ? theme.charAccent
                    : dbType === "squir"
                    ? theme.squirAccent
                    : theme.bulbAccent) + "!important",
              },
            },
          }}
        >
          <MenuItem value="">
            <b style={{ color: theme.primaryText }}>Condition</b>
          </MenuItem>
          {Object.entries(tempConditions).map(([_, value], index) => (
            <MenuItem
              key={index}
              value={value.name}
              sx={{ color: theme.primaryText }}
            >
              {upperCaseFirst(value.name)}
            </MenuItem>
          ))}
        </Select>
      </StyledForm>
    </Wrapper>
  )
}

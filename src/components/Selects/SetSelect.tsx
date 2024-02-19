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

const StyledMenuItem = styled(MenuItem)`
  text-transform: capitalize;
`

export const SetSelect = () => {
  const { dbType, tempSets, tempCard } = useSelector(
    (state: RootState) => state.root
  )
  const dispatch = useDispatch()

  const handleChange = (e: SelectChangeEvent) => {
    dispatch(updateCard({ set: e.target.value as string }))
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
        <InputLabel color={sxColourMap[dbType]}>Set</InputLabel>
        <Select
          id="set"
          variant="outlined"
          label="Set"
          value={tempCard.set}
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
          {Object.entries(tempSets).map(([_, value], index) => (
            <StyledMenuItem
              key={index}
              value={value.name}
              sx={{ color: theme.primaryText }}
            >
              {value.name}
            </StyledMenuItem>
          ))}
        </Select>
      </StyledForm>
    </Wrapper>
  )
}

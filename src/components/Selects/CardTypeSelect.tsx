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
import { attributes } from "../../config"
import { sxColourMap } from "../../helpers/view"
import { RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { upperCaseFirst } from "../../helpers/upperCaseFirst"
import { useState } from "react"
import { updateCard } from "../../redux/root"

const StyledForm = styled(FormControl)`
  @media only screen and (max-width: 600px) {
    margin: 10px !important;
  }
`

const AttributeWrapper = styled.div`
  display: flex;
  width: auto;
  min-width: 300px;
  justify-content: center;
`

export const CardTypeSelect = () => {
  const dispatch = useDispatch()
  const { dbType, tempCardTypes, tempCard } = useSelector(
    (state: RootState) => state.root
  )

  const handleChange = (e: SelectChangeEvent) => {
    dispatch(updateCard({ cardType: e.target.value as string }))
  }

  return (
    <AttributeWrapper>
      <StyledForm
        sx={{
          borderRadius: "15px !important",
          width: "auto",
          minWidth: 300,
        }}
      >
        <InputLabel color={sxColourMap[dbType]}>Card Type</InputLabel>
        <Select
          id="attribute"
          variant="outlined"
          value={tempCard.cardType}
          label="Card Type"
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
            <b style={{ color: theme.primaryText }}>Card Type</b>
          </MenuItem>
          {Object.entries(tempCardTypes).map(([_, value], index) => (
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
    </AttributeWrapper>
  )
}

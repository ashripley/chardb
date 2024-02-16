import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material"
import styled from "styled-components"
import { theme } from "../../theme"
import { DbType, sxColourMap } from "../../helpers/view"
import { RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { upperCaseFirst } from "../../helpers/upperCaseFirst"
import { setDbType } from "../../redux/root"

const StyledForm = styled(FormControl)`
  @media only screen and (max-width: 600px) {
    margin: 10px !important;
  }
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

export const ThemeSelect = () => {
  const [option, setOption] = useState("")
  const dispatch = useDispatch()
  const { dbType } = useSelector((state: RootState) => state.root)

  const themeData = [
    { name: "bulbdb", type: "bulb" },
    { name: "squirdb", type: "squir" },
    { name: "chardb", type: "char" },
  ]

  const handleSelectChange = (val: any) => {
    setOption(val)
    const theme = Object.values(themeData).filter((theme) => theme.name === val)
    dispatch(setDbType(theme[0].type as DbType))
  }

  return (
    <Wrapper>
      <StyledForm
        sx={{
          borderRadius: "15px !important",
          width: "100%",
          minWidth: 200,
        }}
      >
        <InputLabel color={sxColourMap[dbType]}>{}</InputLabel>
        <Select
          id="theme-id"
          variant="outlined"
          value={option}
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
          onChange={(e) => handleSelectChange(e.target.value)}
          sx={{
            borderRadius: "15px",
            fieldset: {
              borderColor: theme.darkBg,
              borderWidth: 2,
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
          {Object.values(themeData).map((theme, index) => (
            <MenuItem key={index} value={theme.name}>
              {upperCaseFirst(theme.name)}
            </MenuItem>
          ))}
        </Select>
      </StyledForm>
    </Wrapper>
  )
}

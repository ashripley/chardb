import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material"
import styled from "styled-components"
import { theme } from "../theme"
import { attributes } from "../config"
import { sxColourMap } from "../helpers/view"
import { RootState } from "../redux/store"
import { useSelector } from "react-redux"

interface Props {
  fields: Record<string, any>
  handleSelectChange: (e: any) => void
}

const StyledForm = styled(FormControl)`
  @media only screen and (max-width: 600px) {
    margin: 10px !important;
  }
`

const AttributeWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

export const AttributeSelect = ({ fields, handleSelectChange }: Props) => {
  const { dbType } = useSelector((state: RootState) => state.root)

  return (
    <AttributeWrapper>
      <StyledForm
        sx={{
          borderRadius: "15px !important",
          width: "100%",
        }}
      >
        <InputLabel color={sxColourMap[dbType]}>{"Attribute"}</InputLabel>
        <Select
          id="attribute"
          variant="outlined"
          value={fields.attribute}
          color={sxColourMap[dbType]}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: theme.lightBg,
                borderRadius: 3,
              },
            },
          }}
          input={<OutlinedInput label="Attribute" />}
          onChange={handleSelectChange}
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
            <b style={{ color: theme.primaryText }}>Attribute</b>
          </MenuItem>
          {attributes.map((attribute, index) => (
            <MenuItem
              key={index}
              value={attribute}
              sx={{ color: theme.primaryText }}
            >
              {attribute}
            </MenuItem>
          ))}
        </Select>
      </StyledForm>
    </AttributeWrapper>
  )
}

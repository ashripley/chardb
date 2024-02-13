import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material"
import styled from "styled-components"
import { theme } from "../theme"
import { sxColourMap } from "../helpers/view"
import { RootState } from "../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { AllRarities } from "../api/queries/allRarities"
import { setRarityData } from "../redux/root"
import { upperCaseFirst } from "../helpers/upperCaseFirst"

interface Props {
  fields: Record<string, any>
  handleSelectChange: (e: any) => void
}

const StyledForm = styled(FormControl)`
  @media only screen and (max-width: 600px) {
    margin: 10px !important;
  }
`

const RarityWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

export const RaritySelect = ({ fields, handleSelectChange }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const { dbType, rarityData } = useSelector((state: RootState) => state.root)

  const fetchRarities = async () => {
    setIsLoading(true)
    try {
      const rarities = await AllRarities()

      dispatch(setRarityData(rarities || []))
      setIsLoading(false)
    } catch (error) {
      console.error("set error: ", error)
    }
  }
  useEffect(() => {
    fetchRarities()
  }, [])

  return (
    <RarityWrapper>
      <StyledForm
        sx={{
          borderRadius: "15px !important",
          width: "100%",
        }}
      >
        <InputLabel color={sxColourMap[dbType]}>{"Rarity"}</InputLabel>
        <Select
          id="rarity"
          variant="outlined"
          value={fields.rarity}
          color={sxColourMap[dbType]}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: theme.lightBg,
                borderRadius: 3,
              },
            },
          }}
          input={<OutlinedInput label="Rarity" />}
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
            <b style={{ color: theme.primaryText }}>Rarity</b>
          </MenuItem>
          {rarityData.map((rarity, index) => (
            <MenuItem
              key={index}
              value={rarity.name}
              sx={{ color: theme.primaryText }}
            >
              {upperCaseFirst(rarity.name)}
            </MenuItem>
          ))}
        </Select>
      </StyledForm>
    </RarityWrapper>
  )
}

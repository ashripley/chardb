import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material"
import styled from "styled-components"
import { theme } from "../../theme"
import { attributes } from "../../config"
import { sxColourMap } from "../../helpers/view"
import { RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect } from "react"
import { AllSets } from "../../api/queries/allSets"
import { setSetData } from "../../redux/root"

interface Props {
  fields: Record<string, any>
  handleSetSelectChange: (e: any) => void
}

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

const StyledMenuItem = styled(MenuItem)`
  text-transform: capitalize;
`

export const SetSelect = ({ fields, handleSetSelectChange }: Props) => {
  const { dbType, setData } = useSelector((state: RootState) => state.root)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const sets = await AllSets()

        dispatch(setSetData(sets || []))
      } catch (error) {
        console.error("set error: ", error)
      }
    }

    fetchSets()
  }, [])

  return (
    <Wrapper>
      <StyledForm
        sx={{
          borderRadius: "15px !important",
          width: "100%",
          minWidth: 150,
        }}
      >
        <InputLabel color={sxColourMap[dbType]}>{"Set"}</InputLabel>
        <Select
          id="set"
          variant="outlined"
          value={fields.set}
          color={sxColourMap[dbType]}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: theme.lightBg,
                borderRadius: 3,
              },
            },
          }}
          input={<OutlinedInput label="Set" />}
          onChange={handleSetSelectChange}
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
            <b style={{ color: theme.primaryText }}>Set</b>
          </MenuItem>
          {setData.map((set, index) => (
            <StyledMenuItem
              key={index}
              value={set.name}
              sx={{ color: theme.primaryText }}
            >
              {set.name}
            </StyledMenuItem>
          ))}
        </Select>
      </StyledForm>
    </Wrapper>
  )
}

import * as React from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { SelectChangeEvent } from "@mui/material"
import { updateCard } from "../redux/root"

export const GradedRadioButton = () => {
  const { dbType, tempCard } = useSelector((state: RootState) => state.root)

  const dispatch = useDispatch()

  const handleChange = (e: SelectChangeEvent) => {
    dispatch(updateCard({ isGraded: e.target.value === "true" ? true : false }))
  }

  return (
    <FormControl style={{ width: "auto", minWidth: 300 }}>
      <FormLabel id="demo-controlled-radio-buttons-group">Graded</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={tempCard.isGraded}
        onChange={handleChange}
        row
      >
        <FormControlLabel value={true} control={<Radio />} label="Yes" />
        <FormControlLabel value={false} control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
  )
}

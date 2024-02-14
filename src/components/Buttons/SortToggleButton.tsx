import { Tooltip, styled } from "@mui/material"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { icons } from "../../helpers/fieldsToMap"
import { upperCaseFirst } from "../../helpers/upperCaseFirst"
import { IconImageMap } from "../IconImageMap"
import { FilterViewType, sxColourMap } from "../../helpers/view"
import { useDispatch, useSelector } from "react-redux"
import { setFilterView } from "../../redux/root"
import { RootState } from "../../redux/store"

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: 15,
    },
    "&:first-of-type": {
      borderRadius: 15,
    },
  },
}))

const StyledToggleButton = styled(ToggleButton)`
  width: auto;
  height: auto;
  border-radius: 15px;
  border: 1px solid rgb(227, 228, 219) !important;
`

export const SortToggleButton = () => {
  const fields: string[] = ["id", "name", "type", "year", "attribute"]
  const { filterView, dbType } = useSelector((state: RootState) => state.root)
  const dispatch = useDispatch()

  return (
    <StyledToggleButtonGroup
      orientation="horizontal"
      value={filterView || "id"}
      exclusive
      color={sxColourMap[dbType]}
      onChange={(e, view: FilterViewType) => dispatch(setFilterView(view))}
      style={{
        height: "auto",
        gap: 10,
      }}
    >
      {fields.map((field: string, index: number) => (
        <StyledToggleButton value={field} key={index}>
          <Tooltip
            title={upperCaseFirst(field)}
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  fontSize: "0.8rem",
                },
              },
            }}
          >
            {IconImageMap(icons[field], false)}
          </Tooltip>
        </StyledToggleButton>
      ))}
    </StyledToggleButtonGroup>
  )
}

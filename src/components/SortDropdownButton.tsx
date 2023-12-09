import * as React from "react"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { IconImageMap } from "./IconImageMap"
import { icons } from "../helpers/fieldsToMap"
import { useEffect } from "react"
import { Tooltip } from "@mui/material"
import { upperCaseFirst } from "../helpers/upperCaseFirst"

interface Props {
  sortView: (view: string) => void
  view: string
}

export const SortToggleButton = ({ sortView, view }: Props) => {
  const fields: string[] = ["id", "name", "type", "year", "attribute"]

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    sortView(nextView)
  }

  return (
    <ToggleButtonGroup
      orientation="horizontal"
      value={view || "id"}
      exclusive
      color="warning"
      onChange={handleChange}
      style={{
        height: "auto",
      }}
    >
      {fields.map((field: string, index: number) => (
        <ToggleButton value={field} key={index} style={{ height: "auto" }}>
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
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}

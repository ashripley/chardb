import * as React from "react"
import { styled } from "@mui/material/styles"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import GridViewIcon from "@mui/icons-material/GridView"
import ListIcon from "@mui/icons-material/List"

interface Props {
  view: (grid: boolean) => void
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "lightGray",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "dimGray",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "lightGray",
    borderRadius: 20 / 2,
  },
}))

export const ViewSwitch = ({ view }: Props) => {
  const [switchView, setSwtichView] = React.useState(false)

  const onClick = () => {
    setSwtichView(!switchView)
    view(switchView)
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <>
            <GridViewIcon color={!switchView ? "success" : "disabled"} />
            <MaterialUISwitch
              sx={{ m: 1 }}
              defaultChecked
              checked={switchView}
              onClick={() => onClick()}
            />
            <ListIcon color={switchView ? "success" : "disabled"} />
          </>
        }
        label=""
      />
    </FormGroup>
  )
}

import { Alert, Snackbar as Bar } from "@mui/material"
import { useSelector } from "react-redux"
import { CardState } from "../../redux/store"

interface Props {
  open: boolean
  handleClose: () => void
}

export const Snackbar = ({ open, handleClose }: Props) => {
  const { viewAlert } = useSelector((state: CardState) => state.card)
  return (
    <Bar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {viewAlert}
      </Alert>
    </Bar>
  )
}

import { Alert, Snackbar as Bar } from "@mui/material"
import React from "react"

interface Props {
  open: boolean
  editAlert: string
  handleClose: () => void
}

export const Snackbar = ({ open, editAlert, handleClose }: Props) => {
  return (
    <Bar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {editAlert}
      </Alert>
    </Bar>
  )
}

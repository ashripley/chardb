import * as React from "react"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import styled from "styled-components"
import { useState } from "react"

const Container = styled.div`
  position: absolute;
  z-index: 100;
`

export default function SimpleBackdrop() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Container>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={() => setOpen(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </>
  )
}

import * as React from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import { Alert, Button, Snackbar } from "@mui/material"
import styled from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import { Theme } from "../Theme"
import { upperCaseFirst } from "../helpers/upperCaseFirst"
import { useEffect, useState } from "react"

interface Props {
  openModal: boolean
  pokemon: Record<string, any>
  isDeleted: (isDeleted: boolean) => void
}

const HWrapper = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  background: ${Theme.lightBg};
`

const HTitle = styled.h2`
  height: 50px;
  width: 80%;
  display: flex;
  justify-content: flex-start;
  background: ${Theme.lightBg};
  align-items: center;
  font-weight: 800;
  font-size: 1.5rem;
`

const Exit = styled.div`
  height: 50px;
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${Theme.lightBg};
`

const BWrapper = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  background: ${Theme.lightBg};
`

const FWrapper = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: ${Theme.lightBg};
`

const Text = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  background: ${Theme.lightBg};
  font-weight: 100;
`

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${Theme.lightBg};
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
`

const Buttons = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: flex-end;
  align-items: center;
`

const B = styled.p`
  font-weight: 800;
`

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  height: "300px",
  border: "8px solid white",
  bgcolor: Theme.lightBg,
  boxShadow: `${Theme.lightBg} 0px 0px 2px 0px !important`,
  borderRadius: "35px",
  p: 4,
}

export const ConfirmationModal = ({ openModal, pokemon, isDeleted }: Props) => {
  const [open, setOpen] = useState(false)
  const [isReadyForDeletion, setIsReadyForDeletion] = useState<boolean>(false)
  const [alert, setAlert] = useState<string>("")

  const handleClose = () => {
    setOpen(false)
    // closeModal(true)
  }

  useEffect(() => {
    setOpen(openModal)
  }, [openModal])

  useEffect(() => {
    if (isReadyForDeletion) isDeleted(isReadyForDeletion)
  }, [isReadyForDeletion])

  const toastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setIsReadyForDeletion(false)
  }

  const Header = () => (
    <HWrapper>
      <HTitle>Confirm</HTitle>
      <Exit>
        <CloseIcon
          fontSize="large"
          style={{
            width: 30,
            height: 30,
            borderRadius: 100,
            padding: 10,
          }}
          sx={{
            transition: "all 0.5s !important",
            ":hover": {
              background: Theme.lightBg,
              boxShadow: `0px 0px 10px 0px #ff8c00 , 0px 0px 10px 0px #ffffff`,
              cursor: "pointer",
            },
          }}
          onClick={handleClose}
        />
      </Exit>
    </HWrapper>
  )

  const Body = () => (
    <BWrapper>
      <Text>
        {`You are about to delete ${upperCaseFirst(
          pokemon.name
        )} from the ${upperCaseFirst(
          pokemon.set
        )} set. This action is irreversible.`}
      </Text>
      <Text>{"Are you sure you wish to continue?"}</Text>
    </BWrapper>
  )

  const Footer = () => (
    <FWrapper>
      <Buttons>
        <Button
          variant="outlined"
          size="small"
          color="success"
          style={{
            width: "120px",
            borderRadius: 15,
            height: "50px",
            borderColor: Theme.darkBg,
            color: Theme.darkBg,
            backgroundColor: "green",
          }}
          sx={{
            ":hover": {
              opacity: 0.8,
            },
            transition: "0.3s ease-in-out all",
          }}
          onClick={() => {
            setIsReadyForDeletion(!isReadyForDeletion)
            setAlert(`${upperCaseFirst(pokemon.name)} Removed`)
          }}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="error"
          style={{
            width: "120px",
            borderRadius: 15,
            height: "50px",
            borderColor: Theme.darkBg,
            marginLeft: 10,
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </Buttons>
    </FWrapper>
  )

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        style={{ backdropFilter: "blur(4px)" }}
        slotProps={{
          backdrop: {
            timeout: {
              appear: 1000,
              enter: 1000,
              exit: 1000,
            },
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Container>
              <Header />
              <Body />
              <Footer />
            </Container>
          </Box>
        </Fade>
      </Modal>
      <Snackbar
        open={isReadyForDeletion}
        autoHideDuration={5000}
        onClose={toastClose}
      >
        <Alert onClose={toastClose} severity="success" sx={{ width: "100%" }}>
          {alert}
        </Alert>
      </Snackbar>
    </div>
  )
}

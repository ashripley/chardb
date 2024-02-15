import CloseIcon from "@mui/icons-material/Close"
import { Alert, Button, Snackbar } from "@mui/material"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Fade from "@mui/material/Fade"
import Modal from "@mui/material/Modal"
import * as React from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { theme } from "../../theme"
import { upperCaseFirst } from "../../helpers/upperCaseFirst"
import { useDispatch, useSelector } from "react-redux"
import {
  setIsReadyForDeletion,
  setIsConfirmationModalOpen,
  setConfirmationModalAlert,
} from "../../redux/card"
import { CardState, RootState } from "../../redux/store"
import { deleteDoc, doc } from "firebase/firestore"
import { firestore } from "../../services/firebase"
import { AllCards } from "../../api/queries/allCards"
import { setCardData } from "../../redux/root"

const HWrapper = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  background: ${theme.lightBg};
`

const HTitle = styled.h2`
  height: 50px;
  width: 80%;
  display: flex;
  justify-content: flex-start;
  background: ${theme.lightBg};
  align-items: center;
  font-weight: 800;
  font-size: 1.5rem;
  font-family: ${theme.fontFamily};
  color: ${theme.primaryText};
  margin-bottom: 20px;
`

const Exit = styled.div`
  height: 50px;
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${theme.lightBg};
`

const BWrapper = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  background: ${theme.lightBg};
`

const FWrapper = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: ${theme.lightBg};
`

const Text = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  background: ${theme.lightBg};
  font-weight: 100;
  font-family: ${theme.fontFamily};
  color: ${theme.primaryText};
`

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${theme.lightBg};
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  height: "300px",
  border: "8px solid white",
  bgcolor: theme.lightBg,
  boxShadow: `${theme.lightBg} 0px 0px 2px 0px !important`,
  borderRadius: "35px",
  p: 4,
}

export const ConfirmationModal = () => {
  const dispatch = useDispatch()
  const {
    isConfirmationModalOpen,
    pokemonToBeDeleted,
    isReadyForDeletion,
    confirmationModalAlert,
  } = useSelector((state: CardState) => state.card)

  const { dbType } = useSelector((state: RootState) => state.root)

  // Function to handle card deletion
  useEffect(() => {
    console.log("useEffect confirmation modal")
    const handleDelete = async () => {
      await deleteDoc(doc(firestore, "cards", pokemonToBeDeleted.cardId))
      const cards = await AllCards()

      dispatch(setCardData([...cards]))
      dispatch(setIsConfirmationModalOpen(false))
    }

    if (isReadyForDeletion) handleDelete()
  }, [isReadyForDeletion])

  const toastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(setIsReadyForDeletion(false))
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
            color: theme.primaryText,
            padding: 10,
          }}
          sx={{
            transition: "all 0.5s !important",
            ":hover": {
              background: theme.lightBg,
              boxShadow: `0px 0px 10px 0px ${
                theme[`${dbType}Accent`]
              }, 0px 0px 10px 0px #ffffff`,
              cursor: "pointer",
            },
          }}
          onClick={() =>
            dispatch(setIsConfirmationModalOpen(!isConfirmationModalOpen))
          }
        />
      </Exit>
    </HWrapper>
  )

  const Body = () => (
    <BWrapper>
      <Text>
        {`You are about to delete ${upperCaseFirst(
          pokemonToBeDeleted.name
        )} from the ${upperCaseFirst(
          pokemonToBeDeleted.set
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
            borderColor: theme.darkBg,
            color: theme.darkBg,
            backgroundColor: "green",
          }}
          sx={{
            ":hover": {
              opacity: 0.8,
            },
            transition: "0.3s ease-in-out all",
          }}
          onClick={() => {
            dispatch(setIsReadyForDeletion(true))
            dispatch(
              setConfirmationModalAlert(
                `${upperCaseFirst(pokemonToBeDeleted.name)} Removed`
              )
            )
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
            borderColor: theme.darkBg,
            marginLeft: 10,
          }}
          onClick={() =>
            dispatch(setIsConfirmationModalOpen(!isConfirmationModalOpen))
          }
        >
          Cancel
        </Button>
      </Buttons>
    </FWrapper>
  )

  return (
    <div>
      <Modal
        open={isConfirmationModalOpen}
        onClose={() =>
          dispatch(setIsConfirmationModalOpen(!isConfirmationModalOpen))
        }
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
        <Fade in={isConfirmationModalOpen}>
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
          {confirmationModalAlert}
        </Alert>
      </Snackbar>
    </div>
  )
}

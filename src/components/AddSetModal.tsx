import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Fade from "@mui/material/Fade"
import Modal from "@mui/material/Modal"
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore"
import { collection } from "firebase/firestore"
import { SyntheticEvent, useState } from "react"
import styled from "styled-components"
import { theme } from "../theme"
import { AddCardMutation } from "../api/mutations/addCard"
import { fieldsToMap } from "../helpers/fieldsToMap"
import { omit } from "../helpers/omit"
import { upperCaseFirst } from "../helpers/upperCaseFirst"
import { firestore } from "../services/firebase"
import { AttributeSelect } from "./AttributeSelect"
import { useDispatch, useSelector } from "react-redux"
import {
  setAddSetAlert,
  setIsAddModalOpen,
  setIsAddSetModalOpen,
  setSetIcon,
} from "../redux/card"
import { CardState, RootState } from "../redux/store"
import { isMobile, sxColourMap } from "../helpers/view"
import { AddSetMutation } from "../api/mutations/addSet"
import pokemonNameIcon from "../assets/icons/pokemonName.png"
import setIcon from "../assets/icons/set.png"
import { IconImageMap } from "./IconImageMap"

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background: ${theme.lightBg};
`

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 90%;
`

const Row = styled.div`
  width: 100%;
  min-width: 100px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
  min-height: 30px;
`

const Data = styled.div`
  display: flex;
  width: 80%;
  g-weight: 800;
  justify-content: center;
  align-items: center;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
  min-height: 30px;
`

const IconWrapper = styled.div`
  display: flex;
  width: 5%;
  justify-content: flex-start;
  color: ${theme.primaryText};
`

const Buttons = styled.div<{ isMobile: boolean }>`
  display: flex;
  width: auto;
  min-height: 50px;
  min-width: 150px;
  justify-content: center;
  align-items: center;
  height: ${({ isMobile }) => (isMobile ? "5%" : "10%")};
`

const ActionButton = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  margin-left: -20px;
`

const Header = styled.h1`
  display: flex;
  width: 100%;
  justify-content: center;
  font-family: ${theme.fontFamily};
  color: ${theme.primaryText};
  font-size: calc(12px + 1vw);
  height: 10%;
`

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  minWidth: isMobile ? "60vw" : "30vw",
  maxWidth: 400,
  height: isMobile ? "85%" : "40%",
  maxHeight: 800,
  minHeight: isMobile ? "70vh" : "25vh",
  border: "8px solid white",
  bgcolor: theme.lightBg,
  boxShadow: `${theme.lightBg} 0px 0px 2px 0px !important`,
  borderRadius: "35px",
  p: 4,
}

export const AddSetModal = () => {
  const dispatch = useDispatch()
  const { isAddSetModalOpen, addSetAlert } = useSelector(
    (state: CardState) => state.card
  )
  const { dbType } = useSelector((state: RootState) => state.root)

  const inputProps = {
    sx: {
      borderRadius: "15px !important",
      minWidth: 150,
      fieldset: {
        borderColor: theme.darkBg,
      },
      input: { color: theme.primaryText },

      "&:hover": {
        fieldset: {
          borderColor: `${theme[`${dbType}Accent`]} !important`,
        },
      },
    },
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [fields, setFields] = useState<Record<string, any>>({
    name: "",
    totalCards: "",
  })

  const ref = collection(firestore, "sets")
  const mutation = useFirestoreCollectionMutation(ref)

  const toastClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setToastOpen(false)
  }

  const onClick = async () => {
    setIsLoading(true)

    await AddSetMutation(
      fields.name?.toLowerCase() ?? "",
      fields.totalCards ?? ""
    )

    setTimeout(() => {
      setIsLoading(false)
      clearFields()
      dispatch(setSetIcon("add"))
    }, 1500)

    setToastOpen(true)
    dispatch(setAddSetAlert(`${upperCaseFirst(fields.name)} Added`))
  }

  const clearFields = () => {
    setFields({
      name: "",
      totalCards: "",
    })
  }

  const mappedFields = {
    name: {
      label: "Name",
      value: fields.name,
      icon: IconImageMap(pokemonNameIcon, false, false),
    },
    totalCards: {
      label: "Total Cards",
      value: fields.totalCards,
      icon: IconImageMap(setIcon, false, false),
    },
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isAddSetModalOpen}
        onClose={() => dispatch(setIsAddSetModalOpen(false))}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        style={{ backdropFilter: "blur(2px)" }}
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
        <Fade in={isAddSetModalOpen}>
          <Box sx={style}>
            <Container>
              <div style={{ maxHeight: "95%", height: "95%" }}>
                <Header>Add Set</Header>
                <Details>
                  {Object.entries(mappedFields).map(([k, v], index) => (
                    <Row key={index}>
                      <IconWrapper>{v.icon}</IconWrapper>
                      <Data>
                        <TextField
                          id="standard"
                          value={v.value}
                          label={v.label}
                          variant="outlined"
                          color={sxColourMap[dbType]}
                          style={{ width: "100%", margin: 5 }}
                          InputProps={inputProps}
                          onChange={(e) => {
                            setFields({
                              [k]: e.target.value,
                              ...omit(k, fields),
                            })
                          }}
                        />
                      </Data>
                    </Row>
                  ))}
                </Details>
              </div>
              <Buttons isMobile={isMobile}>
                <ActionButton>
                  <Button
                    variant="outlined"
                    size="small"
                    color="success"
                    style={{
                      width: "80%",
                      borderRadius: 15,
                      height: "100%",
                      borderColor: theme.darkBg,
                    }}
                    onClick={() => onClick()}
                  >
                    {isLoading || mutation.isLoading ? (
                      <CircularProgress color="success" />
                    ) : (
                      "Add"
                    )}
                  </Button>
                </ActionButton>
                <ActionButton>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    style={{
                      width: "80%",
                      borderRadius: 15,
                      height: "100%",
                      borderColor: theme.darkBg,
                    }}
                    onClick={() => dispatch(setIsAddSetModalOpen(false))}
                  >
                    Cancel
                  </Button>
                </ActionButton>
              </Buttons>
            </Container>
          </Box>
        </Fade>
      </Modal>
      <Snackbar open={toastOpen} autoHideDuration={6000} onClose={toastClose}>
        <Alert onClose={toastClose} severity="success" sx={{ width: "100%" }}>
          {addSetAlert}
        </Alert>
      </Snackbar>
    </div>
  )
}

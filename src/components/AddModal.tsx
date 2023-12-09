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
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import styled from "styled-components"
import { theme } from "../theme"
import { AddCardMutation } from "../api/mutations/addCard"
import { fieldsToMap } from "../helpers/fieldsToMap"
import { omit } from "../helpers/omit"
import { upperCaseFirst } from "../helpers/upperCaseFirst"
import { firestore } from "../services/firebase"
import { AttributeSelect } from "./AttributeSelect"

interface Props {
  openModal: boolean
  closeModal: (isClosed: boolean) => void
}

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
  padding-bottom: 20px;
  gap: 10px;
`

const Row = styled.div`
  width: 100%;
  min-width: 100px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const Data = styled.div`
  display: flex;
  width: 80%;
  font-weight: 800;
  justify-content: center;
  align-items: center;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
`

const IconWrapper = styled.div`
  display: flex;
  width: 5%;
  justify-content: flex-start;
  color: ${theme.primaryText};
`

const Buttons = styled.div`
  display: flex;
  width: auto;
  height: auto;
  min-height: 50px;
  min-width: 150px;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 20px;
`

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  maxWidth: 600,
  minWidth: 400,
  height: "80%",
  maxHeight: 800,
  minHeight: 700,
  border: "8px solid white",
  bgcolor: theme.lightBg,
  boxShadow: `${theme.lightBg} 0px 0px 2px 0px !important`,
  borderRadius: "35px",
  p: 4,
}

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
        borderColor: `${theme.charAccent} !important`,
      },
    },
  },
}

export const AddModal = ({ openModal, closeModal }: Props) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [icon, setIcon] = useState("add")
  const [alert, setAlert] = useState("add")
  const [toastOpen, setToastOpen] = useState(false)
  const [fields, setFields] = useState<Record<string, any>>({
    name: "",
    type: "",
    set: "",
    setNumber: "",
    year: "",
    attribute: "",
    quantity: "",
  })

  const ref = collection(firestore, "cards")
  const mutation = useFirestoreCollectionMutation(ref)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFields({
      attribute: (event.target as HTMLInputElement).value,
      ...omit("attribute", fields),
    })
  }

  const handleSelectChange = (event: any) => {
    setFields({
      attribute: (event.target as HTMLInputElement).value,
      ...omit("attribute", fields),
    })
  }

  const handleClose = () => {
    setOpen(false)
    closeModal(false)
  }

  useEffect(() => {
    setOpen(openModal)
  }, [openModal])

  const toastClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setToastOpen(false)
  }

  const onClick = async () => {
    setIsLoading(true)

    await AddCardMutation(
      fields.name?.toLowerCase() ?? "",
      fields.type?.toLowerCase() ?? "",
      fields.set?.toLowerCase() ?? "",
      fields.setNumber ?? "",
      fields.year ?? "",
      fields.quantity ?? "",
      fields.attribute?.toLowerCase() ?? ""
    )

    setTimeout(() => {
      setIsLoading(false)
      clearFields()
      setIcon("add")
    }, 1500)

    setToastOpen(true)
    setAlert(`${upperCaseFirst(fields.name)} Added`)
  }

  const clearFields = () => {
    setFields({
      name: "",
      type: "",
      set: "",
      setNumber: "",
      year: "",
      quantity: "",
      attribute: "",
    })
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
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
        <Fade in={open}>
          <Box sx={style}>
            <Container>
              <div>
                <Header>Add Card</Header>
                <Details>
                  {Object.entries(fieldsToMap(false, fields, true)).map(
                    ([k, v], index) => (
                      <Row key={index}>
                        <IconWrapper>{v.icon ?? <></>}</IconWrapper>
                        <Data>
                          {v.label === "Attribute" ? (
                            <AttributeSelect
                              fields={fields}
                              handleSelectChange={handleSelectChange}
                            />
                          ) : (
                            <TextField
                              id="standard"
                              value={v.value}
                              label={v.label}
                              variant="outlined"
                              color="warning"
                              style={{ width: "100%", margin: 5 }}
                              InputProps={inputProps}
                              onChange={(e) => {
                                setFields({
                                  [k]: e.target.value,
                                  ...omit(k, fields),
                                })
                              }}
                            />
                          )}
                        </Data>
                      </Row>
                    )
                  )}
                </Details>
              </div>
              <Buttons>
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
                    onClick={handleClose}
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
          {alert}
        </Alert>
      </Snackbar>
    </div>
  )
}

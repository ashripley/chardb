import * as React from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore"
import { collection } from "firebase/firestore"
import { firestore } from "../services/firebase"
import {
  Alert,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from "@mui/material"
import styled from "styled-components"
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined"
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone"
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined"
import TagIcon from "@mui/icons-material/Tag"
import AddIcon from "@mui/icons-material/Add"
import DoneIcon from "@mui/icons-material/Done"
import { AddCardMutation } from "../api/mutations/addCard"
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined"
import CloseIcon from "@mui/icons-material/Close"
import { Theme } from "../Theme"
import { upperCaseFirst } from "../helpers/upperCaseFirst"
import { fieldsToMap } from "../helpers/fieldsToMap"
import { omit } from "../helpers/omit"

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
  background: ${Theme.lightBg};
`

const Details = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-bottom: 20px;
`

const Column = styled.div`
  width: 25%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Data = styled.div`
  display: flex;
  width: 80%;
  font-weight: 800;
  justify-content: center;
  align-items: center;
  font-family: ${Theme.fontFamily};
  text-transform: capitalize;
  padding: 10px 0px;
`

const IconWrapper = styled.div`
  display: flex;
  width: 15%;
  justify-content: center;
  color: ${Theme.primaryText};
`

const Buttons = styled.div`
  display: flex;
  width: 100%;
  height: 15%;
  justify-content: center;
  align-items: center;
`

const Add = styled.div`
  display: flex;
  width: 20%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  margin-left: -20px;
`

const StyledRadioGroup = styled(RadioGroup)`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  color: ${Theme.primaryText};
  font-weight: 300 !important;
  font-family: ${Theme.fontFamily};
`

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "35%",
  border: "8px solid white",
  bgcolor: Theme.lightBg,
  boxShadow: `${Theme.lightBg} 0px 0px 2px 0px !important`,
  borderRadius: "35px",
  p: 4,
}

const inputProps = {
  sx: {
    borderRadius: "15px !important",
    fieldset: {
      borderColor: Theme.darkBg,
    },
    input: { color: Theme.primaryText },

    "&:hover": {
      fieldset: {
        borderColor: `${Theme.charAccent} !important`,
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
      fields.attribute ?? ""
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
                <Details>
                  {Object.entries(fieldsToMap(false, fields, true)).map(
                    ([k, v], index) => (
                      <Column key={index}>
                        <IconWrapper>{v.icon ?? <></>}</IconWrapper>
                        <Data>
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
                        </Data>
                      </Column>
                    )
                  )}
                </Details>
                <StyledRadioGroup
                  value={fields.attribute}
                  onChange={handleChange}
                  row
                >
                  {[
                    "Standard",
                    "Standard Holographic",
                    "Reverse Holographic",
                    "Special",
                  ].map((label, index) => (
                    <FormControlLabel
                      key={index}
                      value={label.toLowerCase()}
                      control={<Radio color="warning" />}
                      label={label}
                      sx={{ height: 35 }}
                    />
                  ))}
                </StyledRadioGroup>
              </div>
              <Buttons>
                <Add>
                  <Button
                    variant="outlined"
                    size="small"
                    color="success"
                    style={{
                      width: "80%",
                      borderRadius: 15,
                      height: "100%",
                      borderColor: Theme.darkBg,
                    }}
                    onClick={() => onClick()}
                  >
                    {isLoading || mutation.isLoading ? (
                      <CircularProgress color="success" />
                    ) : icon === "add" ? (
                      <AddIcon />
                    ) : icon === "success" ? (
                      <DoneIcon />
                    ) : (
                      <></>
                    )}
                  </Button>
                </Add>
                <Add>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    style={{
                      width: "80%",
                      borderRadius: 15,
                      height: "100%",
                      borderColor: Theme.darkBg,
                    }}
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </Button>
                </Add>
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

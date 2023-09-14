import * as React from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore"
import { collection } from "firebase/firestore"
import { firestore } from "../services/firebase"
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import styled from "styled-components"
import { useState } from "react"
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined"
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone"
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined"
import TagIcon from "@mui/icons-material/Tag"
import AddIcon from "@mui/icons-material/Add"
import DoneIcon from "@mui/icons-material/Done"
import { AddCardMutation } from "../api/mutations/addCard"
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined"
import CloseIcon from "@mui/icons-material/Close"

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
  background: white !important;
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
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  text-transform: capitalize;
  padding: 10px 0px;
`

const IconWrapper = styled.div`
  display: flex;
  width: 15%;
  justify-content: center;
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
  font-weight: 300 !important;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
`

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "35%",
  bgcolor: "background.paper",
  boxShadow: `#f08030 0px 2px 4px 0px, #f08030 0px 0px 10px 0px`,
  // boxShadow:
  //   "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
  borderRadius: 15,
  p: 4,
}

export const AddModal = ({ openModal, closeModal }: Props) => {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [type, setType] = useState("")
  const [set, setSet] = useState("")
  const [year, setYear] = useState("")
  const [quantity, setQuantity] = useState("")
  const [attribute, setAttribute] = useState("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [icon, setIcon] = useState("add")

  const ref = collection(firestore, "cards")
  const mutation = useFirestoreCollectionMutation(ref)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAttribute((event.target as HTMLInputElement).value)
  }

  const handleClose = () => {
    setOpen(false)
    closeModal(false)
  }

  React.useEffect(() => {
    setOpen(openModal)
    console.log("open", open)
  }, [openModal])

  const onClick = async () => {
    setIsLoading(true)

    await AddCardMutation(name, type, set, year, quantity, attribute)

    setTimeout(() => {
      setIsLoading(false)
      clearFields()
      setIcon("add")
    }, 1500)
  }

  const clearFields = () => {
    setName("")
    setType("")
    setSet("")
    setYear("")
    setQuantity("")
    setAttribute("")
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
                  <Column>
                    <IconWrapper>
                      <PermIdentityOutlinedIcon />
                    </IconWrapper>
                    <Data>
                      <TextField
                        id="standard"
                        value={name}
                        label={"Name"}
                        variant="outlined"
                        style={{ width: "100%", margin: 5 }}
                        sx={{ borderRadius: "15px" }}
                        color="warning"
                        onChange={(e) => setName(e.target.value)}
                        InputProps={{
                          sx: {
                            borderRadius: "15px !important",
                          },
                        }}
                      />
                    </Data>
                  </Column>
                  <Column>
                    <IconWrapper>
                      <CatchingPokemonTwoToneIcon />
                    </IconWrapper>
                    <Data>
                      <TextField
                        id="standard"
                        value={type}
                        label={"Type"}
                        variant="outlined"
                        style={{ width: "100%", margin: 5 }}
                        color="warning"
                        onChange={(e) => setType(e.target.value)}
                        InputProps={{
                          sx: {
                            borderRadius: "15px !important",
                          },
                        }}
                      />
                    </Data>
                  </Column>
                  <Column>
                    <IconWrapper>
                      <FeaturedPlayListOutlinedIcon />
                    </IconWrapper>
                    <Data>
                      <TextField
                        id="standard"
                        value={set}
                        label={"Set"}
                        variant="outlined"
                        style={{ width: "100%", margin: 5 }}
                        color="warning"
                        onChange={(e) => setSet(e.target.value)}
                        InputProps={{
                          sx: {
                            borderRadius: "15px !important",
                          },
                        }}
                      />
                    </Data>
                  </Column>
                  <Column>
                    <IconWrapper>
                      <TagIcon />
                    </IconWrapper>
                    <Data>
                      <TextField
                        id="standard"
                        value={year}
                        label={"Year"}
                        type="number"
                        variant="outlined"
                        style={{ width: "100%", margin: 5 }}
                        color="warning"
                        onChange={(e) => setYear(e.target.value)}
                        InputProps={{
                          sx: {
                            borderRadius: "15px !important",
                          },
                        }}
                      />
                    </Data>
                  </Column>
                  <Column>
                    <IconWrapper>
                      <PlaylistAddOutlinedIcon />
                    </IconWrapper>
                    <Data>
                      <TextField
                        id="standard"
                        value={quantity}
                        label={"Quantity"}
                        variant="outlined"
                        type="number"
                        style={{ width: "100%", margin: 5 }}
                        color="warning"
                        onChange={(e) => setQuantity(e.target.value)}
                        InputProps={{
                          sx: {
                            borderRadius: "15px !important",
                          },
                        }}
                      />
                    </Data>
                  </Column>
                </Details>
                <StyledRadioGroup
                  aria-labelledby="controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={attribute}
                  onChange={handleChange}
                  row
                >
                  {["Normal", "Holo", "Special"].map((label, index) => (
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
    </div>
  )
}

import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore"
import { collection } from "firebase/firestore"
import { firestore } from "../../services/firebase"
import {
  Button,
  Card,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grow,
  Paper,
  Radio,
  RadioGroup,
  Slide,
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
import { AddCardMutation } from "../../api/mutations/addCard"
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined"

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: block;
  justify-content: center;
  background: white !important;
  padding-bottom: 30px;
`

const StyledPaper = styled(Paper)`
  background-color: white;
  display: flex;
  max-width: 100%;
  width: 100%;
  justify-content: center;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
`

const Wrapper = styled.div`
  width: 90%;
  padding: 20px 30px;
  height: 150px;
`

const Details = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const Column = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const IdDivider = styled.div`
  width: 1%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
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

const Add = styled.div`
  display: flex;
  width: 80%;
  height: 40%;
  justify-content: center;
  align-items: center;
  margin-left: -20px;
`

const StyledRadioGroup = styled(RadioGroup)`
  width: 50%;
  margin: 5px;
  font-weight: 300 !important;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
`

export const AddCard = () => {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [set, setSet] = useState("")
  const [year, setYear] = useState("")
  const [quantity, setQuantity] = useState("")
  const [attribute, setAttribute] = useState("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [icon, setIcon] = useState("")

  const ref = collection(firestore, "cards")
  const mutation = useFirestoreCollectionMutation(ref)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAttribute((event.target as HTMLInputElement).value)
  }

  const onClick = async () => {
    setIsLoading(true)

    await AddCardMutation(name, type, set, year, quantity, attribute)

    setIcon("Success")
    clearFields()

    setTimeout(() => {
      setIcon("Add")
    }, 2500)

    setIsLoading(false)
  }

  const clearFields = () => {
    setName("")
    setType("")
    setSet("")
    setYear("")
    setQuantity("")
    setAttribute("")
  }

  // const changeIcon = () => {
  //   mutation.status === "success" && setTimeout(() => {}, 2000)
  //   return <AddIcon />
  // }

  return (
    <>
      <Container>
        <StyledPaper
          elevation={0}
          style={{ backgroundColor: "white", maxWidth: "100%", padding: 0 }}
        >
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Wrapper>
              <Grow
                in={true}
                style={{ transformOrigin: "1 1 1" }}
                {...(true ? { timeout: 1000 } : {})}
              >
                <Card
                  sx={{
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "35px",
                    height: "100%",
                    display: "flex",
                  }}
                  variant="elevation"
                  raised
                >
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
                          sx={{ borderRadius: 15 }}
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
                    <StyledRadioGroup
                      aria-labelledby="controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={attribute}
                      onChange={handleChange}
                    >
                      {["Normal", "Holo", "Normal"].map((label, index) => (
                        <FormControlLabel
                          key={index}
                          value={label.toLowerCase()}
                          control={<Radio color="warning" />}
                          label={label}
                          sx={{ height: 35 }}
                        />
                      ))}
                    </StyledRadioGroup>
                    <IdDivider>
                      <Divider
                        sx={{ borderRightWidth: 2 }}
                        orientation="vertical"
                      />
                    </IdDivider>
                    <Add>
                      <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        style={{
                          width: "15%",
                          borderRadius: 50,
                          height: "100%",
                        }}
                        onClick={() => onClick()}
                      >
                        {isLoading || mutation.isLoading ? (
                          <CircularProgress color="success" />
                        ) : mutation.isSuccess ? (
                          icon === "Success" ? (
                            <DoneIcon />
                          ) : icon === "Add" ? (
                            <AddIcon />
                          ) : (
                            <></>
                          )
                        ) : (
                          <AddIcon />
                        )}
                      </Button>
                    </Add>
                  </Details>
                </Card>
              </Grow>
            </Wrapper>
          </Slide>
        </StyledPaper>
      </Container>
    </>
  )
}

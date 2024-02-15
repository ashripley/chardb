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
import { SyntheticEvent, useEffect, useState } from "react"
import styled from "styled-components"
import { theme } from "../../theme"
import { AddCardMutation } from "../../api/mutations/addCard"
import { omit } from "../../helpers/omit"
import { upperCaseFirst } from "../../helpers/upperCaseFirst"
import { firestore } from "../../services/firebase"
import { AttributeSelect } from "../Selects/AttributeSelect"
import { useDispatch, useSelector } from "react-redux"
import { setIcon, setIsAddModalOpen } from "../../redux/card"
import { CardState, RootState } from "../../redux/store"
import { isMobile, sxColourMap } from "../../helpers/view"
import { SetSelect } from "../Selects/SetSelect"
import { AllSets } from "../../api/queries/allSets"
import { setPokemonData, setSetData } from "../../redux/root"
import { AllPokemon } from "../../api/queries/allPokemon"
import { RaritySelect } from "../Selects/RaritySelect"
import { AutoSelectComponent } from "../Selects/AutoSelectComponent"
import attributeIcon from "../../assets/icons/attribute.png"
import set from "../../assets/icons/set.png"
import idIcon from "../../assets/icons/id.png"
import pokemonNameIcon from "../../assets/icons/pokemonName.png"
import pokemonTypeIcon from "../../assets/icons/pokemonType.png"
import quantityIcon from "../../assets/icons/quantity.png"
import setNumberIcon from "../../assets/icons/setNumber.png"
import yearIcon from "../../assets/icons/year.png"
import rarityIcon from "../../assets/icons/rarityIcon.png"

export const icons: Record<string, any> = {
  id: idIcon,
  name: pokemonNameIcon,
  type: pokemonTypeIcon,
  set: set,
  setNumber: setNumberIcon,
  year: yearIcon,
  attribute: attributeIcon,
  quantity: quantityIcon,
  rarity: rarityIcon,
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

const Wrapper = styled.div`
  max-height: 95%;
  height: 95%;
`

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 80%;
`

const Row = styled.div`
  width: 100%;
  min-width: 100px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
  min-height: 30px;
`

const Data = styled.div`
  display: flex;
  width: 100%;
  font-weight: 800;
  justify-content: center;
  align-items: center;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
  min-height: 30px;
`

const Actions = styled.div<{ isMobile: boolean }>`
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

export const AddModal = () => {
  const dispatch = useDispatch()
  const { isAddModalOpen } = useSelector((state: CardState) => state.card)
  const { dbType, setData, pokemonData } = useSelector(
    (state: RootState) => state.root
  )

  const [isLoading, setIsLoading] = useState<boolean>(false)
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
    rarity: "",
  })

  const ref = collection(firestore, "cards")
  const mutation = useFirestoreCollectionMutation(ref)

  const handleAttributeSelectChange = (event: any) => {
    setFields({
      attribute: (event.target as HTMLInputElement).value,
      ...omit("attribute", fields),
    })
  }

  const handleSetSelectChange = (event: any) => {
    setFields({
      set: (event.target as HTMLInputElement).value,
      ...omit("set", fields),
    })
  }

  const handleRaritySelectChange = (event: any) => {
    setFields({
      rarity: (event.target as HTMLInputElement).value,
      ...omit("rarity", fields),
    })
  }

  useEffect(() => {
    if (fields.set !== "") {
      setFields({
        setNumber: ` / ${
          setData.find((set) => set.name === fields.set)?.totalCards ?? ""
        }`,
        ...omit("setNumber", fields),
      })
    }
  }, [fields.set])

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
      dispatch(setIcon("add"))
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

  // useEffect(() => {
  //   console.log("add modal useEffect")
  //   const fetchSets = async () => {
  //     try {
  //       const sets = await AllSets()

  //       dispatch(setSetData(sets || []))
  //     } catch (error) {
  //       console.error("set error: ", error)
  //     }
  //   }

  //   const fetchPokemon = async () => {
  //     try {
  //       const pokemon = await AllPokemon()

  //       dispatch(setPokemonData(pokemon || []))
  //     } catch (error) {
  //       console.error("set error: ", error)
  //     }
  //   }

  //   console.log("useEffect on mount")
  //   // fetchSets()
  //   // fetchPokemon()
  // }, [])

  // styles
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

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    minWidth: isMobile ? "60vw" : 500,
    maxWidth: 400,
    height: isMobile ? "85%" : "80%",
    maxHeight: 500,
    minHeight: isMobile ? "60vh" : 500,
    border: "8px solid white",
    bgcolor: theme.lightBg,
    boxShadow: `${theme.lightBg} 0px 0px 2px 0px !important`,
    borderRadius: "35px",
    p: 4,
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isAddModalOpen}
        onClose={() => dispatch(setIsAddModalOpen(false))}
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
        <Fade in={isAddModalOpen}>
          <Box sx={style}>
            <Container>
              <Wrapper>
                <Header>Add Card</Header>
                <Body>
                  <Row>
                    <Data>
                      <AutoSelectComponent />
                    </Data>
                  </Row>
                  <Row>
                    <Row>
                      <Data>
                        <SetSelect
                          fields={fields}
                          handleSetSelectChange={handleSetSelectChange}
                        />
                      </Data>
                    </Row>
                    <Row>
                      <Data>
                        <TextField
                          id="standard"
                          value={fields.setNumber}
                          label={"Set Number"}
                          variant="outlined"
                          color={sxColourMap[dbType]}
                          style={{ width: "100%" }}
                          InputProps={inputProps}
                          onChange={(e) => {
                            setFields({
                              setNumber: e.target.value,
                              ...omit("setNumber", fields),
                            })
                          }}
                        />
                      </Data>
                    </Row>
                  </Row>
                  <Row>
                    <Row>
                      <Data>
                        <TextField
                          id="standard"
                          type="number"
                          value={fields.year}
                          label={"Year"}
                          variant="outlined"
                          color={sxColourMap[dbType]}
                          style={{ width: "100%" }}
                          InputProps={inputProps}
                          onChange={(e) => {
                            setFields({
                              year: e.target.value,
                              ...omit("year", fields),
                            })
                          }}
                        />
                      </Data>
                    </Row>
                    <Row>
                      <Data>
                        <TextField
                          id="standard"
                          type="number"
                          value={fields.quantity}
                          label={"Quantity"}
                          variant="outlined"
                          color={sxColourMap[dbType]}
                          style={{ width: "100%" }}
                          InputProps={inputProps}
                          onChange={(e) => {
                            setFields({
                              quantity: e.target.value,
                              ...omit("quantity", fields),
                            })
                          }}
                        />
                      </Data>
                    </Row>
                  </Row>
                  <Row>
                    <Row>
                      <Data>
                        <AttributeSelect
                          fields={fields}
                          handleSelectChange={handleAttributeSelectChange}
                        />
                      </Data>
                    </Row>
                    <Row>
                      <Data>
                        <RaritySelect
                          fields={fields}
                          handleSelectChange={handleRaritySelectChange}
                        />
                      </Data>
                    </Row>
                  </Row>
                </Body>
                <Actions isMobile={isMobile}>
                  <ActionButton>
                    <Button
                      variant="outlined"
                      size="small"
                      color="success"
                      style={{
                        width: "auto",
                        borderRadius: 15,
                        height: "auto",
                        borderColor: "rgb(227, 228, 219)",
                        minWidth: 200,
                        minHeight: 50,
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
                        width: "auto",
                        borderRadius: 15,
                        height: "auto",
                        borderColor: "rgb(227, 228, 219)",
                        minWidth: 200,
                        minHeight: 50,
                      }}
                      onClick={() => {
                        dispatch(setIsAddModalOpen(false))
                        clearFields()
                      }}
                    >
                      Cancel
                    </Button>
                  </ActionButton>
                </Actions>
              </Wrapper>
            </Container>
          </Box>
        </Fade>
      </Modal>
      <Snackbar open={toastOpen} autoHideDuration={6000} onClose={toastClose}>
        <Alert onClose={toastClose} severity="success" sx={{ width: "100%" }}>
          {alert}
        </Alert>
      </Snackbar>
    </>
  )
}

import AddIcon from "@mui/icons-material/Add"
import ListIcon from "@mui/icons-material/List"
import RefreshIcon from "@mui/icons-material/Refresh"
import WindowIcon from "@mui/icons-material/Window"
import {
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grow,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material"
import { deleteDoc, doc } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { Theme } from "../../Theme"
import { AllCards } from "../../api/queries/allCards"
import { AddModal } from "../../components/AddModal"
import { Cards } from "../../components/Cards/Cards"
import { ConfirmationModal } from "../../components/ConfirmationModal"
import { SortToggleButton } from "../../components/SortDropdownButton"
import { firestore } from "../../services/firebase"

const Wrap = styled.div``

const Root = styled.div`
  display: flex;
  max-width: 100%;
  width: 100%;
  justify-content: center;
  padding-top: 30px;
  position: relative;
  z-index: 1 !important;
`

const Header = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 50px;
`

const StyledPaper = styled(Paper)`
  margin: 20px;
  width: 100%;
`

const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
`

const TextFieldWrapper = styled.div`
  width: auto;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    min-width: 200px;
    margin: 10px;
  }
`

const Fields = styled.div`
  display: block;
  max-width: 100%;
  width: 100%;
`

const NameField = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Buttons = styled.div`
  max-width: 100%;
  width: 15%;
  display: flex;
  justify-content: flex-start;

  @media only screen and (max-width: 600px) {
    min-width: 200px;
    margin: 10px;
    height: 50px;
  }
`

const Actions = styled.div`
  max-width: 100%;
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const Chips = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media only screen and (max-width: 600px) {
    min-width: 200px;
    margin: 10px;
    height: 50px;
  }
`

const StyledForm = styled(FormControl)`
  @media only screen and (max-width: 600px) {
    margin: 10px !important;
  }
`

export const Main = () => {
  // State variables
  const [error, setError] = useState(false)
  const [showAddCard, setShowAddCard] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [sortToggleView, setSortToggleView] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [pokemonToBeDeleted, setPokemonToBeDeleted] = useState<
    Record<string, any>
  >({})
  const [data, setData] = useState([{}])
  const [viewToggle, setViewToggle] = useState(true)
  const [field, setField] = useState<Record<string, any>>({
    key: "",
    value: "",
  })

  const categories = ["Name", "Type", "Set", "Year", "Attribute"]

  const sortView = (view: string) => {
    console.log("view", view)
    setSortToggleView(view)
  }

  // Function to fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true)

    try {
      const cards = await AllCards()

      setData(cards || [])
      setShowCard(true)
    } catch (error) {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Function to handle refresh
  const handleRefresh = () => {
    setField({ key: "", value: "" })
    fetchData()
  }

  // Function to handle add button click
  const handleAdd = () => {
    showAddCard ? setShowAddCard(false) : setShowAddCard(true)
  }

  // Callback function when AddModal is closed
  const onAddClose = (isClosed: boolean) => {
    !isClosed && setShowAddCard(false)
    fetchData()
  }

  // Function to handle card deletion confirmation
  const isDeleted = (hasChanged: boolean, pokemon: Record<string, any>) => {
    if (hasChanged) {
      setShowConfirmationModal(!showConfirmationModal)
      setPokemonToBeDeleted(pokemon)
    }
  }

  // Function to handle card deletion
  const handleDelete = async (isReadyForDeletion: boolean) => {
    if (isReadyForDeletion) {
      await deleteDoc(doc(firestore, "cards", pokemonToBeDeleted.cardId))
      const cards = await AllCards()

      setData([...cards])
      setShowConfirmationModal(false)
    }
  }

  // Function to toggle between grid and list view
  const onViewChange = () => {
    setViewToggle((prev) => !prev)
  }

  // Initial data fetch on component mount
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Wrap>
      <Root>
        <Header>
          <Grow
            in={true}
            style={{ transformOrigin: "1 1 1" }}
            {...(true ? { timeout: 1000 } : { timeout: 1000 })}
          >
            <StyledPaper
              variant="outlined"
              sx={{
                backgroundColor: Theme.lightBg,
                border: "none",
                borderRadius: "15px",
                transition: "all 1s ease !important",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              }}
            >
              <Wrapper>
                <Fields>
                  <NameField>
                    <StyledForm
                      sx={{
                        borderRadius: "15px !important",
                        width: "15%",
                        minWidth: 200,
                      }}
                    >
                      <InputLabel color="warning">{"Category"}</InputLabel>
                      <Select
                        id="standard"
                        variant="outlined"
                        value={field.key}
                        label={"Category"}
                        color="warning"
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              backgroundColor: Theme.lightBg,
                              borderRadius: 3,
                            },
                          },
                        }}
                        onChange={(e) => {
                          setField({
                            key: e.target.value,
                            value: "",
                          })
                        }}
                        sx={{
                          borderRadius: "15px 35px 35px 15px",
                          fieldset: {
                            borderColor: Theme.darkBg,
                          },
                          color: Theme.primaryText,

                          "&:hover": {
                            fieldset: {
                              borderColor: "#ff8c00 !important",
                            },
                          },
                        }}
                      >
                        <MenuItem value="">
                          <b style={{ color: Theme.primaryText }}>None</b>
                        </MenuItem>
                        {categories.map((category, index) => (
                          <MenuItem
                            key={index}
                            value={category}
                            sx={{ color: Theme.primaryText }}
                          >
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    </StyledForm>
                    <TextFieldWrapper>
                      <TextField
                        id="standard"
                        value={field.value}
                        label={`Search ${field.key || "All Cards"}...`}
                        variant="outlined"
                        style={{ width: "auto", minWidth: 400 }}
                        color={"warning"}
                        onChange={(e) =>
                          setField({ key: field.key, value: e.target.value })
                        }
                        error={error}
                        InputProps={{
                          sx: {
                            borderRadius: "15px !important",
                            fieldset: {
                              borderColor: Theme.darkBg,
                            },
                            input: { color: Theme.primaryText },

                            "&:hover": {
                              fieldset: {
                                borderColor: "#ff8c00 !important",
                              },
                            },
                          },
                        }}
                      />
                    </TextFieldWrapper>
                    <Buttons>
                      <Actions>
                        <Button
                          variant="outlined"
                          size="small"
                          color="success"
                          style={{
                            width: "45%",
                            height: "100%",
                            borderRadius: 15,
                            borderColor: Theme.darkBg,
                          }}
                          onClick={handleAdd}
                        >
                          <AddIcon />
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color={`primary`}
                          style={{
                            width: "45%",
                            height: "100%",
                            borderRadius: 15,
                            borderColor: Theme.darkBg,
                          }}
                          onClick={handleRefresh}
                        >
                          {isLoading === true ? (
                            <CircularProgress color="warning" />
                          ) : (
                            <RefreshIcon />
                          )}
                        </Button>
                      </Actions>
                    </Buttons>
                    <SortToggleButton
                      sortView={sortView}
                      view={sortToggleView}
                    />
                    <Chips>
                      <Chip
                        label="GRID"
                        onClick={onViewChange}
                        icon={
                          <WindowIcon
                            fontSize="small"
                            style={{
                              color: `${
                                !viewToggle ? Theme.primaryText : "#ff8c00"
                              }`,
                            }}
                          />
                        }
                        sx={{
                          padding: "15px 5px",
                          borderRadius: "15px",
                          borderColor: Theme.darkBg,
                          color: `${
                            !viewToggle ? Theme.primaryText : "#ff8c00"
                          }`,
                          fontFamily: Theme.fontFamily,
                        }}
                        variant={viewToggle ? "filled" : "outlined"}
                      />
                      <Chip
                        label="LIST"
                        onClick={onViewChange}
                        icon={
                          <ListIcon
                            fontSize="small"
                            style={{
                              color: `${
                                viewToggle ? Theme.primaryText : "#ff8c00"
                              }`,
                            }}
                          />
                        }
                        sx={{
                          padding: "15px 5px",
                          borderRadius: "15px",
                          borderColor: Theme.darkBg,
                          color: `${
                            viewToggle ? Theme.primaryText : "#ff8c00"
                          }`,
                          fontFamily: Theme.fontFamily,
                        }}
                        variant={!viewToggle ? "filled" : "outlined"}
                      />
                    </Chips>
                  </NameField>
                </Fields>
              </Wrapper>
            </StyledPaper>
          </Grow>
        </Header>
      </Root>
      <AddModal openModal={showAddCard} closeModal={onAddClose} />
      <ConfirmationModal
        isDeleted={handleDelete}
        pokemon={pokemonToBeDeleted}
        openModal={showConfirmationModal}
      />
      <Wrap>
        {showCard && (
          <Cards
            view={viewToggle}
            isCardDeleted={isDeleted}
            sortView={sortToggleView}
            pokemon={
              field.value !== ""
                ? data.filter((p: Record<string, any>) =>
                    p[field.key?.toLowerCase() || "name"]?.includes(field.value)
                  )
                : data
            }
            mounted={showCard}
            isLoading={isLoading}
          />
        )}
      </Wrap>
    </Wrap>
  )
}

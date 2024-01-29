import AddIcon from "@mui/icons-material/Add"
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined"
import ListIcon from "@mui/icons-material/List"
import RefreshIcon from "@mui/icons-material/Refresh"
import WindowIcon from "@mui/icons-material/Window"
import {
  Button,
  Chip,
  CircularProgress,
  Divider,
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
import { AllCards } from "../../api/queries/allCards"
import { AddModal } from "../../components/AddModal"
import { Cards } from "../../components/Cards/Cards"
import { ConfirmationModal } from "../../components/ConfirmationModal"
import { SortToggleButton } from "../../components/SortToggleButton"
import { firestore } from "../../services/firebase"
import { theme } from "../../theme"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { AnalyticsModal } from "../../components/AnalyticsModal"

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
  width: auto;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    min-width: 200px;
    margin: 10px;
    height: 50px;
  }
`

const Actions = styled.div`
  max-width: 100%;
  display: flex;
  width: auto;
  gap: 20px;
`

const Chips = styled.div`
  width: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-width: 200px;
  gap: 10px;

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
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [pokemonToBeDeleted, setPokemonToBeDeleted] = useState<
    Record<string, any>
  >({})
  const [data, setData] = useState([{}])
  const [view, setView] = useState<"Grid" | "List" | "Tile">("Grid")
  const [field, setField] = useState<Record<string, any>>({
    key: "",
    value: "",
  })

  const categories = ["Name", "Type", "Set", "Year", "Attribute"]

  const sortView = (view: string) => {
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

  // Function to toggle between grid, tile and list view
  const onViewChange = (view: "Grid" | "List" | "Tile") => {
    setView(view)
  }

  // Function to toggle between grid and list view
  const analyticsToggle = () => {
    setIsAnalyticsOpen((prev) => !prev)
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
                backgroundColor: theme.lightBg,
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
                        width: "auto",
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
                              backgroundColor: theme.lightBg,
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
                            borderColor: theme.darkBg,
                          },
                          color: theme.primaryText,

                          "&:hover": {
                            fieldset: {
                              borderColor: "#ff8c00 !important",
                            },
                          },
                        }}
                      >
                        <MenuItem value="">
                          <b style={{ color: theme.primaryText }}>None</b>
                        </MenuItem>
                        {categories.map((category, index) => (
                          <MenuItem
                            key={index}
                            value={category}
                            sx={{ color: theme.primaryText }}
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
                              borderColor: theme.darkBg,
                            },
                            input: { color: theme.primaryText },

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
                          color="warning"
                          style={{
                            width: "auto",
                            height: "auto",
                            borderRadius: 15,
                            borderColor: theme.darkBg,
                          }}
                          onClick={handleAdd}
                        >
                          <AddIcon />
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="success"
                          style={{
                            width: "auto",
                            height: "auto",
                            borderRadius: 15,
                            borderColor: theme.darkBg,
                          }}
                          onClick={handleRefresh}
                        >
                          {isLoading === true ? (
                            <CircularProgress color="warning" />
                          ) : (
                            <RefreshIcon />
                          )}
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          style={{
                            width: "auto",
                            height: "auto",
                            borderRadius: 15,
                            borderColor: theme.darkBg,
                          }}
                          onClick={() => setIsAnalyticsOpen((prev) => !prev)}
                        >
                          <InfoOutlinedIcon />
                        </Button>
                      </Actions>
                    </Buttons>
                    <Divider orientation="vertical" flexItem />
                    <SortToggleButton
                      sortView={sortView}
                      view={sortToggleView}
                    />
                    <Divider orientation="vertical" flexItem />
                    <Chips>
                      <Chip
                        label="TILE"
                        onClick={() => onViewChange("Tile")}
                        icon={
                          <AppsOutlinedIcon
                            fontSize="small"
                            style={{
                              color: `${
                                view !== "Tile" ? theme.primaryText : "#ff8c00"
                              }`,
                            }}
                          />
                        }
                        sx={{
                          padding: "15px 5px",
                          borderRadius: "15px",
                          borderColor: theme.darkBg,
                          color: `${
                            view !== "Tile" ? theme.primaryText : "#ff8c00"
                          }`,
                          fontFamily: theme.fontFamily,
                        }}
                        variant={view === "Tile" ? "filled" : "outlined"}
                      />
                      <Chip
                        label="GRID"
                        onClick={() => onViewChange("Grid")}
                        icon={
                          <WindowIcon
                            fontSize="small"
                            style={{
                              color: `${
                                view !== "Grid" ? theme.primaryText : "#ff8c00"
                              }`,
                            }}
                          />
                        }
                        sx={{
                          padding: "15px 5px",
                          borderRadius: "15px",
                          borderColor: theme.darkBg,
                          color: `${
                            view !== "Grid" ? theme.primaryText : "#ff8c00"
                          }`,
                          fontFamily: theme.fontFamily,
                        }}
                        variant={view === "Grid" ? "filled" : "outlined"}
                      />
                      <Chip
                        label="LIST"
                        onClick={() => onViewChange("List")}
                        icon={
                          <ListIcon
                            fontSize="small"
                            style={{
                              color: `${
                                view !== "List" ? theme.primaryText : "#ff8c00"
                              }`,
                            }}
                          />
                        }
                        sx={{
                          padding: "15px 5px",
                          borderRadius: "15px",
                          borderColor: theme.darkBg,
                          color: `${
                            view !== "List" ? theme.primaryText : "#ff8c00"
                          }`,
                          fontFamily: theme.fontFamily,
                        }}
                        variant={view === "List" ? "filled" : "outlined"}
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
      <AnalyticsModal
        analyticsToggle={analyticsToggle}
        isOpen={isAnalyticsOpen}
      />
      <Wrap>
        {showCard && (
          <Cards
            view={view}
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

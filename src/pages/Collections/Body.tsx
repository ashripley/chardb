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
import { useEffect, useState } from "react"
import styled from "styled-components"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import RefreshIcon from "@mui/icons-material/Refresh"
import { Card } from "../../api/queries/cards"
import { AllCards } from "../../api/queries/allCards"
import { Cards } from "../../components/Cards/Cards"
import { AddModal } from "../../components/AddModal"
import WindowIcon from "@mui/icons-material/Window"
import ListIcon from "@mui/icons-material/List"

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

  // border-top-left-radius: 25% 20% !important;
  // border-top-right-radius: 25% 20% !important;
  // border-bottom-left-radius: 35% 10% !important;
  // border-bottom-right-radius: 45% 20% !important;
`

const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
`
const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: auto;
  padding: 30px;
  position: relative;
  z-index: 1 !important;
`

const TextFieldWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
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
`

const Buttons = styled.div`
  max-width: 100%;
  width: 15%;
  display: flex;
  justify-content: flex-start;
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
`

export const CollectionsBody = () => {
  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [showAddCard, setShowAddCard] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [icon, setIcon] = useState<string>("collections")
  const [data, setData] = useState([{}])
  const [viewToggle, setViewToggle] = useState(true)
  const [category, setCategory] = useState<Record<string, any>>({})

  const Query = async () => {
    setData([])
    setError(false)
    setIsLoading(true)

    const cards =
      name?.length || category.value?.length
        ? await Card(name, category.value)
        : await AllCards()

    if (!cards) {
      setError(true)
      setIsLoading(false)
      return
    }
    setData([...cards])

    setShowCard(true)
    setIsLoading(false)
  }

  const handleError = () => {
    setName("")
    setError(false)
    setIcon("collections")
  }

  const handleRefresh = () => {
    setName("")
    setIcon("collections")
    setShowCard(false)
    setData([])
  }

  const handleAdd = () => {
    showAddCard ? setShowAddCard(false) : setShowAddCard(true)
  }

  const onAddClose = (isClosed: boolean) => {
    !isClosed && setShowAddCard(false)
    Query()
  }

  const handleElse = () => {}

  useEffect(() => {
    Query()
  }, [])

  const isDeleted = async (hasChanged: boolean) => {
    if (hasChanged) {
      const cards = await AllCards()

      setData([...cards])
    }
  }

  const isViewToggled = (view: boolean) => {
    setViewToggle(view)
  }

  const onViewChange = () => {
    setViewToggle(!viewToggle)
  }

  return (
    <>
      <Root>
        <Header>
          <Grow
            in={true}
            style={{ transformOrigin: "1 1 1" }}
            {...(true ? { timeout: 1000 } : { timeout: 1000 })}
          >
            <StyledPaper
              variant="outlined"
              elevation={5}
              sx={{
                backgroundColor: "#eeefeb",
                border: "none",
                borderRadius: "35px",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                transition: "all 1s ease !important",

                "&:hover": {
                  padding: "0.2rem",
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                },
              }}
            >
              <Wrapper>
                <Fields>
                  <NameField>
                    <FormControl
                      sx={{ borderRadius: "15px !important", width: "15%" }}
                    >
                      <InputLabel color="warning">{"Category"}</InputLabel>
                      <Select
                        id="standard"
                        variant="outlined"
                        value={category.value}
                        label={"Category"}
                        color="warning"
                        onChange={(e) =>
                          setCategory({
                            key: "category",
                            value: e.target.value,
                          })
                        }
                        sx={{
                          borderRadius: "15px !important",
                          fieldset: {
                            borderColor: "dimGray",
                          },
                          color: "dimGray",

                          "&:hover": {
                            fieldset: {
                              borderColor: "#ed6d03 !important",
                            },
                          },
                        }}
                      >
                        <MenuItem value="">
                          <b style={{ color: "dimGray" }}>None</b>
                        </MenuItem>
                        {["Name", "Type", "Set", "Year"].map(
                          (category, index) => (
                            <MenuItem
                              key={index}
                              value={category}
                              sx={{ color: "dimGray" }}
                            >
                              {category}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                    <TextFieldWrapper>
                      <TextField
                        id="standard"
                        value={name}
                        label={`${
                          error
                            ? "No Results Found"
                            : category.value
                            ? `Pokémon ${category.value}`
                            : "Search All Pokémon..."
                        }`}
                        variant="outlined"
                        style={{ width: "100%" }}
                        color={icon === "error" ? "error" : "warning"}
                        onChange={(e) => setName(e.target.value)}
                        error={error}
                        InputProps={{
                          sx: {
                            borderRadius: "15px !important",
                            fieldset: {
                              borderColor: "dimGray",
                            },
                            input: { color: "dimGray" },

                            "&:hover": {
                              fieldset: {
                                borderColor: "#ed6d03 !important",
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
                          color={`${
                            icon === "error"
                              ? "error"
                              : icon === "refresh"
                              ? "secondary"
                              : "warning"
                          }`}
                          style={{
                            width: "45%",
                            height: "100%",
                            borderRadius: 15,
                          }}
                          onClick={async () => {
                            icon === "collections"
                              ? Query()
                              : icon === "error"
                              ? handleError()
                              : icon === "refresh"
                              ? handleRefresh()
                              : handleElse()
                          }}
                        >
                          {isLoading === true ? (
                            <CircularProgress color="warning" />
                          ) : icon === "error" ? (
                            <ClearIcon />
                          ) : icon === "refresh" ? (
                            <RefreshIcon />
                          ) : (
                            <SearchIcon />
                          )}
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="success"
                          style={{
                            width: "45%",
                            height: "100%",
                            borderRadius: 15,
                          }}
                          onClick={handleAdd}
                        >
                          <AddIcon />
                        </Button>
                      </Actions>
                    </Buttons>
                    <Chips>
                      <Chip
                        label="GRID"
                        onClick={onViewChange}
                        icon={
                          <WindowIcon
                            fontSize="small"
                            style={{
                              color: `${!viewToggle ? "dimGray" : "#ed6d03"}`,
                            }}
                          />
                        }
                        sx={{
                          padding: "15px 5px",
                          borderRadius: "15px",
                          borderColor: "dimGray",
                          color: `${!viewToggle ? "dimGray" : "#ed6d03"}`,
                          fontFamily:
                            "ui-rounded,'Hiragino Maru Gothic ProN',Quicksand,Comfortaa,Manjari,'Arial Rounded MT','Arial Rounded MT Bold',Calibri,source-sans-pro,sans-serif",
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
                              color: `${viewToggle ? "dimGray" : "#ed6d03"}`,
                            }}
                          />
                        }
                        sx={{
                          padding: "15px 5px",
                          borderRadius: "15px",
                          borderColor: "dimGray",
                          color: `${viewToggle ? "dimGray" : "#ed6d03"}`,
                          fontFamily:
                            "ui-rounded,'Hiragino Maru Gothic ProN',Quicksand,Comfortaa,Manjari,'Arial Rounded MT','Arial Rounded MT Bold',Calibri,source-sans-pro,sans-serif",
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
      <Container>
        {showCard && (
          <Cards
            view={viewToggle}
            isCardDeleted={isDeleted}
            pokemon={data}
            mounted={showCard}
            isLoading={isLoading}
          />
        )}
      </Container>
    </>
  )
}

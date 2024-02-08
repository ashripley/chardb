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
import { useCallback } from "react"
import styled from "styled-components"
import { AllCards } from "../api/queries/allCards"
import { SortToggleButton } from "../components/SortToggleButton"
import { theme } from "../theme"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { useDispatch, useSelector } from "react-redux"
import {
  setCardData,
  setCardField,
  setCardView,
  setIsDataLoading,
} from "../redux/root"
import {
  setHasCardError,
  setIsAddModalOpen,
  setIsAnalyticsOpen,
  setIsCardOpen,
  setIsSearchOpen,
} from "../redux/card"
import { CardState, RootState } from "../redux/store"
import { isMobile } from "../helpers/view"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
  width: auto;
`

const Root = styled.div`
  display: flex;
  position: relative;
  z-index: 1 !important;
  width: 90vw;
  margin: 0px auto;
  justify-content: center;
`

const Header = styled.div`
  display: flex;
  padding: 0px;
  width: 100%;
  margin: auto;
`

const StyledPaper = styled(Paper)`
  width: 100%;
  margin: 20px auto;
`

const Body = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`

const Search = styled.div`
  justify-content: space-between;
  gap: 5vw;
  display: flex;
  width: 100%;
}
`

const Fields = styled.div`
  display: block;
  max-width: 100%;
  width: auto;
`

const NameField = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`

const Buttons = styled.div`
  max-width: 100%;
  display: flex;
  width: 100%;
  justify-content: center;
  height: auto;
  min-height: 50px;
`

const Actions = styled.div`
  max-width: 100%;
  display: flex;
  width: auto;
  gap: 20px;
`

const Chips = styled.div`
  display: flex;
  align-items: center;
  min-width: 200px;
  gap: 10px;
  width: 100%;
  justify-content: center;
}
`

const StyledForm = styled(FormControl)`
  width: 100%;
`

export const MobileSearch = () => {
  const dispatch = useDispatch()
  const { cardView, cardField, isDataLoading } = useSelector(
    (state: RootState) => state.root
  )
  const { isAddModalOpen, hasCardError, isSearchOpen, isAnalyticsOpen } =
    useSelector((state: CardState) => state.card)

  const categories = ["Name", "Type", "Set", "Year", "Attribute"]

  // Function to fetch data
  const fetchData = useCallback(async () => {
    dispatch(setIsDataLoading(true))

    try {
      const cards = await AllCards()

      dispatch(setCardData(cards || []))
      dispatch(setIsCardOpen(true))
    } catch (error) {
      dispatch(setHasCardError(true))
    } finally {
      dispatch(setIsDataLoading(false))
    }
  }, [])

  // Function to handle refresh
  const handleRefresh = () => {
    dispatch(setCardField({ key: "", value: "" }))
    fetchData()
  }

  // Function to handle add button click
  const handleAdd = () => {
    if (isAddModalOpen) {
      dispatch(setIsAddModalOpen(false))
    } else {
      dispatch(setIsAddModalOpen(true))
    }
  }

  return (
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
                  <Search>
                    <TextField
                      id="standard"
                      value={cardField.value}
                      label={`Search ${cardField.key || "All Cards"}...`}
                      variant="outlined"
                      style={{ width: "auto" }}
                      color={"warning"}
                      onChange={(e) =>
                        dispatch(
                          setCardField({
                            key: cardField.key,
                            value: e.target.value,
                          })
                        )
                      }
                      error={hasCardError}
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
                      sx={{ color: theme.primaryText }}
                      onClick={() => dispatch(setIsSearchOpen(!isSearchOpen))}
                    >
                      {isSearchOpen ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </Button>
                  </Search>
                  {isSearchOpen ? (
                    <Body>
                      <StyledForm
                        sx={{
                          borderRadius: "15px !important",
                          width: "100%",
                          // minWidth: 200,
                        }}
                      >
                        <InputLabel color="warning">{"Category"}</InputLabel>
                        <Select
                          id="standard"
                          variant="outlined"
                          value={cardField.key}
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
                            dispatch(
                              setCardField({
                                key: e.target.value,
                                value: "",
                              })
                            )
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
                            {isDataLoading === true ? (
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
                            onClick={() =>
                              dispatch(setIsAnalyticsOpen(!isAnalyticsOpen))
                            }
                          >
                            <InfoOutlinedIcon />
                          </Button>
                        </Actions>
                      </Buttons>
                      <SortToggleButton />
                      <Chips>
                        <Chip
                          label="TILE"
                          onClick={() => dispatch(setCardView("Tile"))}
                          icon={
                            <AppsOutlinedIcon
                              fontSize="small"
                              style={{
                                color: `${
                                  cardView !== "Tile"
                                    ? theme.primaryText
                                    : "#ff8c00"
                                }`,
                              }}
                            />
                          }
                          sx={{
                            padding: "15px 5px",
                            borderRadius: "15px",
                            borderColor: theme.darkBg,
                            color: `${
                              cardView !== "Tile"
                                ? theme.primaryText
                                : "#ff8c00"
                            }`,
                            fontFamily: theme.fontFamily,
                          }}
                          variant={cardView === "Tile" ? "filled" : "outlined"}
                        />
                        <Chip
                          label="GRID"
                          onClick={() => dispatch(setCardView("Grid"))}
                          icon={
                            <WindowIcon
                              fontSize="small"
                              style={{
                                color: `${
                                  cardView !== "Grid"
                                    ? theme.primaryText
                                    : "#ff8c00"
                                }`,
                              }}
                            />
                          }
                          sx={{
                            padding: "15px 5px",
                            borderRadius: "15px",
                            borderColor: theme.darkBg,
                            color: `${
                              cardView !== "Grid"
                                ? theme.primaryText
                                : "#ff8c00"
                            }`,
                            fontFamily: theme.fontFamily,
                          }}
                          variant={cardView === "Grid" ? "filled" : "outlined"}
                        />
                        {!isMobile && (
                          <Chip
                            label="LIST"
                            onClick={() => dispatch(setCardView("List"))}
                            icon={
                              <ListIcon
                                fontSize="small"
                                style={{
                                  color: `${
                                    cardView !== "List"
                                      ? theme.primaryText
                                      : "#ff8c00"
                                  }`,
                                }}
                              />
                            }
                            sx={{
                              padding: "15px 5px",
                              borderRadius: "15px",
                              borderColor: theme.darkBg,
                              color: `${
                                cardView !== "List"
                                  ? theme.primaryText
                                  : "#ff8c00"
                              }`,
                              fontFamily: theme.fontFamily,
                            }}
                            variant={
                              cardView === "List" ? "filled" : "outlined"
                            }
                          />
                        )}
                      </Chips>
                    </Body>
                  ) : (
                    <></>
                  )}
                </NameField>
              </Fields>
            </Wrapper>
          </StyledPaper>
        </Grow>
      </Header>
    </Root>
  )
}

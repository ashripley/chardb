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
  setIsAddSetModalOpen,
  setIsAnalyticsOpen,
  setIsCardOpen,
} from "../redux/card"
import { CardState, RootState } from "../redux/store"
import { isMobile, sxColourMap } from "../helpers/view"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"

const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
`
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
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
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
  min-height: 55px;
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

const StyledDivider = styled(Divider)`
  @media only screen and (max-width: 1700px) {
    display: none;
  }
`

export const DesktopSearch = () => {
  const dispatch = useDispatch()
  const { cardView, cardField, isDataLoading, dbType } = useSelector(
    (state: RootState) => state.root
  )
  const { isAddModalOpen, isAddSetModalOpen, hasCardError, isAnalyticsOpen } =
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

  // Function to handle add set button click
  const handleAddSet = () => {
    if (isAddSetModalOpen) {
      dispatch(setIsAddSetModalOpen(false))
    } else {
      dispatch(setIsAddSetModalOpen(true))
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
                  <StyledForm
                    sx={{
                      borderRadius: "15px !important",
                      width: "auto",
                      minWidth: 200,
                    }}
                  >
                    <InputLabel color={sxColourMap[dbType]}>
                      {"Category"}
                    </InputLabel>
                    <Select
                      id="standard"
                      variant="outlined"
                      value={cardField.key}
                      label={"Category"}
                      color={sxColourMap[dbType]}
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
                            borderColor:
                              (dbType === "char"
                                ? theme.charAccent
                                : dbType === "squir"
                                ? theme.squirAccent
                                : theme.bulbAccent) + "!important",
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
                      value={cardField.value}
                      label={`Search ${cardField.key || "All Cards"}...`}
                      variant="outlined"
                      style={{ width: "auto", minWidth: 400 }}
                      color={sxColourMap[dbType]}
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
                              borderColor:
                                (dbType === "char"
                                  ? theme.charAccent
                                  : dbType === "squir"
                                  ? theme.squirAccent
                                  : theme.bulbAccent) + "!important",
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
                        color={sxColourMap[dbType]}
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
                        color={sxColourMap[dbType]}
                        style={{
                          width: "auto",
                          height: "auto",
                          borderRadius: 15,
                          borderColor: theme.darkBg,
                        }}
                        onClick={handleAddSet}
                      >
                        <PlaylistAddIcon />
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
                          <CircularProgress color={sxColourMap[dbType]} />
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
                  <Divider orientation="vertical" flexItem />
                  <SortToggleButton />
                  <StyledDivider orientation="vertical" flexItem />
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
                                : theme[`${dbType}Accent`]
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
                            : theme[`${dbType}Accent`]
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
                                : theme[`${dbType}Accent`]
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
                            : theme[`${dbType}Accent`]
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
                                  : theme[`${dbType}Accent`]
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
                              : theme[`${dbType}Accent`]
                          }`,
                          fontFamily: theme.fontFamily,
                        }}
                        variant={cardView === "List" ? "filled" : "outlined"}
                      />
                    )}
                  </Chips>
                </NameField>
              </Fields>
            </Wrapper>
          </StyledPaper>
        </Grow>
      </Header>
    </Root>
  )
}

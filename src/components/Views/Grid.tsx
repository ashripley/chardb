import { Card, TextField, Tooltip } from "@mui/material"
import { ChangeEvent, SyntheticEvent, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { theme } from "../../theme"
import { UpdateCard } from "../../api/mutations/updateCard"
import { fieldsToMap } from "../../helpers/fieldsToMap"
import { omit } from "../../helpers/omit"
import { upperCaseFirst } from "../../helpers/upperCaseFirst"
import { AttributeSelect } from "../AttributeSelect"
import { Actions } from "../Grid/Actions"
import { GridImage } from "../Grid/GridImage"
import { Snackbar } from "../Grid/Snackbar"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import {
  setGridFields,
  setIsConfirmationModalOpen,
  setPokemonToBeDeleted,
  setViewAlert,
} from "../../redux/card"
import { CardState } from "../../redux/store"
import { sxColourMap } from "../../helpers/view"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
}

//#region Styled Components
const Wrapper = styled.div<{
  isCardHovered: boolean
  isEditView: boolean
  isLoading: boolean
}>`
  width: 370px;
  padding: 20px 20px;
  height: ${({ isEditView, isCardHovered, isLoading }) =>
    isEditView
      ? "800px"
      : isCardHovered
      ? "700px"
      : isLoading
      ? "0px"
      : "600px"};
  transition: all 0.5s ease;
`

const Row = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Icon = styled.div<{ isEditView: boolean }>`
  display: flex;
  width: 15%;
  justify-content: ${({ isEditView }) =>
    isEditView ? "center" : "flex-start"};
  color: ${theme.card};
`

const Data = styled.div`
  display: flex;
  width: 60%;
  font-weight: 800;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
  color: ${theme.primaryText};
`

const Details = styled.div<{ isCardHovered: boolean; isEditView: boolean }>`
  height: ${({ isEditView, isCardHovered }) =>
    isEditView ? "60%" : isCardHovered ? "50%" : "55%"};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
  transition: all 1s ease;
`
//#endregion

export const Grid = ({ pokemon, cardIndex }: Props) => {
  const dispatch = useDispatch()
  const { isDataLoading, dbType } = useSelector(
    (state: RootState) => state.root
  )
  const { isConfirmationModalOpen, gridFields } = useSelector(
    (state: CardState) => state.card
  )

  const [isEvolutionsHovered, setIsEvolutionsHovered] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false)
  const [isEditView, setIsEditView] = useState<boolean>(false)

  const ref = useRef(null)

  const shadowStyle = useMemo(
    () => ({
      boxShadow: `${pokemon.colour} 0px 2px 35px 0px, ${pokemon.colour} 0px 0px 40px 0px`,
      borderRadius: 25,
    }),
    [pokemon.colour]
  )

  const cardStyles = useMemo(
    () => ({
      minWidth: 275,
      backgroundColor: theme.lightBg,
      borderRadius: "30px",
      height: "100%",
      transition: "all 1.5s !important",
      border: `8px solid white`,
      ...(isEditView && { borderRadius: 25 }),
      ":hover": { ...shadowStyle },
    }),
    [isEditView, shadowStyle]
  )

  //#endregion

  const mouseEnter = () => {
    setIsEvolutionsHovered(true)
  }

  const mouseLeave = () => {
    setIsEvolutionsHovered(false)
  }

  const onCardEnter = () => {
    setIsCardHovered(true)
  }

  const onCardLeave = () => {
    !isEditView && setIsCardHovered(false)
  }

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  const handleEdit = () => {
    setIsEditView(true)
  }

  const handleDelete = async () => {
    dispatch(setIsConfirmationModalOpen(!isConfirmationModalOpen))
    dispatch(setPokemonToBeDeleted(pokemon))
  }

  const handleClear = async () => {
    setIsEditView(false)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setGridFields({
        attribute: (event.target as HTMLInputElement).value,
        ...omit("attribute", gridFields),
      })
    )
  }

  const handleSubmit = async () => {
    await updateCard()
  }

  const updateCard = async () => {
    dispatch(
      setGridFields({
        ...gridFields,
      })
    )

    await UpdateCard(
      pokemon.cardId,
      gridFields.name?.toLowerCase() || pokemon.name,
      gridFields.type?.toLowerCase() || pokemon.type,
      gridFields.set?.toLowerCase() || pokemon.set,
      gridFields.setNumber || pokemon.setNumber,
      gridFields.year || pokemon.year,
      gridFields.quantity || pokemon.quantity,
      gridFields.attribute?.toLowerCase() || pokemon.attribute,
      theme.typeColours[gridFields.type?.toLowerCase()] ?? pokemon.colour
    )

    setOpen(true)
    dispatch(
      setViewAlert(
        `Fields for ${upperCaseFirst(
          pokemon.name
        )} have been updated! Please refresh for results`
      )
    )

    setIsEditView(false)
    clearFields()
  }

  const clearFields = () => {
    dispatch(
      setGridFields({
        name: "",
        type: "",
        set: "",
        year: "",
        quantity: "",
        attribute: "",
      })
    )
  }

  return (
    <Wrapper
      isLoading={isDataLoading}
      isEditView={isEditView}
      isCardHovered={isCardHovered}
      key={`grid-${cardIndex}`}
    >
      <Card
        sx={{ ...cardStyles }}
        variant="elevation"
        raised
        onMouseEnter={onCardEnter}
        onMouseLeave={onCardLeave}
      >
        <GridImage
          isCardHovered={isCardHovered}
          isEditView={isEditView}
          isEvolutionsHovered={isEvolutionsHovered}
          mouseEnter={mouseEnter}
          mouseLeave={mouseLeave}
          pokemon={pokemon}
          ref={ref}
        />
        <Details isEditView={isEditView} isCardHovered={isCardHovered}>
          {Object.entries(
            fieldsToMap(isEditView, gridFields, false, pokemon, pokemon.id)
          ).map(([k, v], index) => (
            <Row key={index}>
              <Tooltip title={v.label} placement="top-start">
                <Icon isEditView={isEditView}>{v.icon ?? <></>}</Icon>
              </Tooltip>
              {!isEditView ? (
                <Data>{pokemon[k] || ""}</Data>
              ) : v.label === "Attribute" ? (
                <AttributeSelect
                  fields={gridFields}
                  handleSelectChange={handleChange}
                />
              ) : (
                <TextField
                  id="standard"
                  value={v.value}
                  placeholder={upperCaseFirst(pokemon[k])}
                  variant="outlined"
                  color={sxColourMap[dbType]}
                  style={{ width: "80%", margin: 5 }}
                  sx={{ borderRadius: 15 }}
                  onChange={(e) => {
                    dispatch(
                      setGridFields({
                        [k]: e.target.value,
                        ...omit(k, gridFields),
                      })
                    )
                  }}
                  InputProps={{
                    sx: {
                      borderRadius: "15px !important",
                      fieldset: {
                        border: `2px solid ${theme.darkBg}`,
                      },
                      input: { color: theme.primaryText },

                      "&:hover": {
                        fieldset: {
                          borderColor: `${theme[`${dbType}Accent`]} !important`,
                          borderWidth: 2,
                        },
                      },
                    },
                  }}
                />
              )}
            </Row>
          ))}
        </Details>
        <Actions
          handleClear={handleClear}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleSubmit={handleSubmit}
          isCardHovered={isCardHovered}
          isEditView={isEditView}
        />
        <Snackbar handleClose={handleClose} open={open} />
      </Card>
    </Wrapper>
  )
}

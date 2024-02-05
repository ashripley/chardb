import { Card, Skeleton, TextField, Tooltip } from "@mui/material"
import { ChangeEvent, SyntheticEvent, useState } from "react"
import styled from "styled-components"
import { theme } from "../../theme"
import { UpdateCard } from "../../api/mutations/updateCard"
import { fieldsToMap } from "../../helpers/fieldsToMap"
import { omit } from "../../helpers/omit"
import { upperCaseFirst } from "../../helpers/upperCaseFirst"
import { AttributeSelect } from "../AttributeSelect"
import { Snackbar } from "../Grid/Snackbar"
import { ListActions } from "../List/ListActions"
import { ListImage } from "../List/ListImage"
import { CardState, RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import {
  setIsConfirmationModalOpen,
  setListFields,
  setPokemonToBeDeleted,
  setViewAlert,
} from "../../redux/card"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
}

//#region Styled Components
const Wrapper = styled.div`
  width: 90%;
  padding: 0px 30px;
`

const Details = styled.div<{ isHovered: boolean }>`
  width: ${({ isHovered }) =>
    isHovered ? "calc(100% - 450px)" : "calc(100% - 300px)"};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  transition: 0.5s ease-out;
  ${({ isHovered }) => isHovered && `margin-right: 50px;`}
`

const Column = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`

const Data = styled.div`
  display: flex;
  font-weight: 800;
  justify-content: center;
  align-items: center;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
  color: ${theme.primaryText};

  font-size: 0.9em;
`

const Icon = styled.div`
  display: flex;
  width: 15%;
  justify-content: center;
  color: ${theme.card};
`
//#endregion

export const readIconStyles = {
  height: 25,
  width: 25,
  borderRadius: 100,
  background: "transparent",
  color: theme.lightBg,
  transition: "all 0.3s !important",
  ":hover": {
    padding: "10px",
    boxShadow: `0px 5px 30px ${theme.primaryText}`,
  },
}

export const editIconStyles = {
  height: 25,
  width: 25,
  borderRadius: 100,
  color: theme.lightBg,
  transition: "all 0.3s !important",
  ":hover": {
    padding: "10px",
    boxShadow: `0px 10px 30px ${theme.primaryText}`,
  },
}

export const List = ({ pokemon, cardIndex }: Props) => {
  const dispatch = useDispatch()
  const { isConfirmationModalOpen, listFields } = useSelector(
    (state: CardState) => state.card
  )

  //#region State
  const [isEditView, setIsEditView] = useState<boolean>(false)
  const [isEvolutionsHovered, setIsEvolutionsHovered] = useState<boolean>(false)
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  //#endregion

  const { isDataLoading } = useSelector((state: RootState) => state.root)

  const cardStyles = {
    width: "100%",
    borderRadius: "30px",
    height: 100,
    display: "flex",
    transition: "all 0.8s !important",
    backgroundColor: theme.lightBg,
    border: "8px solid white",
    ":hover": {
      boxShadow: `${pokemon.colour} 0px 2px 35px 0px, ${pokemon.colour} 0px 0px 40px 0px`,
    },
  }

  const textFieldStyles = {
    sx: {
      borderRadius: "15px !important",
      fieldset: {
        border: `2px solid ${theme.darkBg}`,
      },
      input: { color: theme.primaryText },

      "&:hover": {
        fieldset: {
          borderColor: `${theme.charAccent} !important`,
          borderWidth: 2,
        },
      },
    },
  }

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

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  const handleSubmit = async () => {
    await UpdateCard(
      pokemon.cardId,
      listFields.name?.toLowerCase() || pokemon.name,
      listFields.type?.toLowerCase() || pokemon.type,
      listFields.set?.toLowerCase() || pokemon.set,
      listFields.setNumber || pokemon.setNumber,
      listFields.year || pokemon.year,
      listFields.quantity || pokemon.quantity,
      listFields.attribute?.toLowerCase() || pokemon.attribute,
      theme.typeColours[listFields.type?.toLowerCase()] ?? pokemon.colour
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
      setListFields({
        name: "",
        type: "",
        set: "",
        setNumber: "",
        year: "",
        quantity: "",
        attribute: "",
      })
    )
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setListFields({
        attribute: (event.target as HTMLInputElement).value,
        ...omit("attribute", listFields),
      })
    )
  }

  return (
    <Wrapper key={`list-${cardIndex}`}>
      {isDataLoading ? (
        <Skeleton
          variant="rounded"
          width={"100%"}
          height={150}
          sx={{ borderRadius: "30px" }}
        />
      ) : (
        <Card
          sx={{ ...cardStyles }}
          variant="elevation"
          raised
          onMouseEnter={() => onCardEnter()}
          onMouseLeave={() => onCardLeave()}
        >
          <ListImage
            isEvolutionsHovered={isEvolutionsHovered}
            mouseEnter={mouseEnter}
            mouseLeave={mouseLeave}
            pokemon={pokemon}
          />
          <Details isHovered={isCardHovered}>
            {Object.entries(
              fieldsToMap(isEditView, listFields, false, pokemon, pokemon.id)
            ).map(([k, v], index) => (
              <Column key={index}>
                <Tooltip title={v.label} placement="top-start">
                  <Icon>{v.icon ?? <></>}</Icon>
                </Tooltip>
                {!isEditView ? (
                  <Data>{pokemon[k] || ""}</Data>
                ) : v.label === "Attribute" ? (
                  <AttributeSelect
                    fields={listFields}
                    handleSelectChange={handleChange}
                  />
                ) : (
                  <TextField
                    id="standard"
                    value={v.value}
                    placeholder={upperCaseFirst(pokemon[k])}
                    variant="outlined"
                    color="warning"
                    style={{ width: "80%", margin: "0px 5px" }}
                    sx={{ borderRadius: 15 }}
                    onChange={(e) => {
                      dispatch(
                        setListFields({
                          [k]: e.target.value,
                          ...omit(k, listFields),
                        })
                      )
                    }}
                    InputProps={{ ...textFieldStyles }}
                  />
                )}
              </Column>
            ))}
          </Details>
          <ListActions
            handleClear={handleClear}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleSubmit={handleSubmit}
            isCardHovered={isCardHovered}
            isEditView={isEditView}
          />
          <Snackbar handleClose={handleClose} open={open} />
        </Card>
      )}
    </Wrapper>
  )
}

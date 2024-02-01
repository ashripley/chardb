import { Card, RadioGroup, Skeleton, TextField, Tooltip } from "@mui/material"
import { ChangeEvent, SyntheticEvent, useState } from "react"
import styled from "styled-components"
import { theme } from "../../theme"
import { UpdateCard } from "../../api/mutations/updateCard"
import { fieldsToMap } from "../../helpers/fieldsToMap"
import { omit } from "../../helpers/omit"
import { upperCaseFirst } from "../../helpers/upperCaseFirst"
import { ReadOrEditEnum } from "../../helpers/view"
import { AttributeSelect } from "../AttributeSelect"
import { Snackbar } from "../Grid/Snackbar"
import { ListActions } from "../List/ListActions"
import { ListImage } from "../List/ListImage"
import { CardState, RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import {
  setIsConfirmationModalOpen,
  setPokemonToBeDeleted,
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

const StyledRadioGroup = styled(RadioGroup)`
  width: 100%;
  margin: 5px;
  font-weight: 300 !important;
  font-family: ${theme.fontFamily};
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
  const { isConfirmationModalOpen } = useSelector(
    (state: CardState) => state.card
  )

  //#region State
  const [cardView, setCardView] = useState<Record<string, any>>({
    view: ReadOrEditEnum.READ,
  })
  const [fields, setFields] = useState<Record<string, any>>({
    name: "",
    type: "",
    set: "",
    setNumber: "",
    year: "",
    quantity: "",
    attribute: "",
  })
  const [isEvolutionsHovered, setIsEvolutionsHovered] = useState<boolean>(false)
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false)
  const [alert, setAlert] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  //#endregion

  const { isDataLoading } = useSelector((state: RootState) => state.root)

  const isEditView = cardView.view === ReadOrEditEnum.EDIT

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
    setCardView({ view: ReadOrEditEnum.EDIT })
  }

  const handleDelete = async () => {
    dispatch(setIsConfirmationModalOpen(!isConfirmationModalOpen))
    dispatch(setPokemonToBeDeleted(pokemon))
  }

  const handleClear = async () => {
    setCardView({ view: ReadOrEditEnum.READ })
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
      fields.name?.toLowerCase() || pokemon.name,
      fields.type?.toLowerCase() || pokemon.type,
      fields.set?.toLowerCase() || pokemon.set,
      fields.setNumber || pokemon.setNumber,
      fields.year || pokemon.year,
      fields.quantity || pokemon.quantity,
      fields.attribute?.toLowerCase() || pokemon.attribute,
      theme.typeColours[fields.type?.toLowerCase()] ?? pokemon.colour
    )

    setOpen(true)
    setAlert(
      `Fields for ${upperCaseFirst(
        pokemon.name
      )} have been updated! Please refresh for results`
    )

    setCardView({ view: ReadOrEditEnum.READ })
    clearFields()
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFields({
      attribute: (event.target as HTMLInputElement).value,
      ...omit("attribute", fields),
    })
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
              fieldsToMap(isEditView, fields, false, pokemon, pokemon.id)
            ).map(([k, v], index) => (
              <Column key={index}>
                <Tooltip title={v.label} placement="top-start">
                  <Icon>{v.icon ?? <></>}</Icon>
                </Tooltip>
                {!isEditView ? (
                  <Data>{pokemon[k] || ""}</Data>
                ) : v.label === "Attribute" ? (
                  <AttributeSelect
                    fields={fields}
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
                      setFields({
                        [k]: e.target.value,
                        ...omit(k, fields),
                      })
                    }}
                    InputProps={{ ...textFieldStyles }}
                  />
                )}
              </Column>
            ))}
            {/* {isEditView && (
              <StyledRadioGroup
                defaultValue={
                  pokemon.attribute ? pokemon.attribute : fields.attribute
                }
                row
                onChange={(e) => handleChange(e)}
              >
                {[
                  "Standard",
                  "Standard Holographic",
                  "Reverse Holographic",
                  "Special",
                ].map((label, index) => (
                  <FormControlLabel
                    key={index}
                    value={label.toLowerCase()}
                    control={<Radio color="warning" />}
                    label={label}
                    sx={{
                      height: 35,
                      minWidth: 200,
                    }}
                  />
                ))}
              </StyledRadioGroup>
            )} */}
          </Details>
          <ListActions
            handleClear={handleClear}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleSubmit={handleSubmit}
            isCardHovered={isCardHovered}
            isEditView={isEditView}
          />
          <Snackbar editAlert={alert} handleClose={handleClose} open={open} />
        </Card>
      )}
    </Wrapper>
  )
}

import {
  Card,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  TextField,
  Tooltip,
} from "@mui/material"
import styled from "styled-components"
import { ChangeEvent, SyntheticEvent, useState } from "react"
import { UpdateCard } from "../../api/mutations/updateCard"
import { Theme } from "../../Theme"
import { View } from "../../helpers/view"
import { ListImage } from "../List/ListImage"
import { ListActions } from "../List/ListActions"
import { Snackbar } from "../Grid/Snackbar"
import { upperCaseFirst } from "../../helpers/upperCaseFirst"
import { fieldsToMap } from "../../helpers/fieldsToMap"
import { omit } from "../../helpers/omit"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
  isLoading: boolean
  isCardDeleted: (isDeleted: boolean, pokemon: Record<string, any>) => void
}

//#region Styled Components
const Wrapper = styled.div`
  width: 90%;
  padding: 20px 30px;
  height: 150px;
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
`

const Data = styled.div`
  display: flex;
  font-weight: 800;
  justify-content: center;
  align-items: center;
  font-family: ${Theme.fontFamily};
  text-transform: capitalize;
  padding: 10px 0px;
  color: ${Theme.primaryText};

  font-size: 0.9em;
`

const StyledRadioGroup = styled(RadioGroup)`
  width: 100%;
  margin: 5px;
  font-weight: 300 !important;
  font-family: ${Theme.fontFamily};
`

const Icon = styled.div`
  display: flex;
  width: 15%;
  justify-content: center;
  color: ${Theme.card};
`
//#endregion

export const readIconStyles = {
  height: 30,
  width: 30,
  borderRadius: 100,
  background: "transparent",
  color: Theme.lightBg,
  transition: "all 0.3s !important",
  padding: "0.5em",
  ":hover": {
    boxShadow: `0px 10px 30px ${Theme.primaryText}`,
  },
}

export const editIconStyles = {
  borderRadius: 100,
  color: Theme.lightBg,
  transition: "all 0.3s !important",
  padding: "0.5em",
  ":hover": {
    boxShadow: `0px 10px 30px ${Theme.primaryText}`,
  },
}

export const ListView = ({
  pokemon,
  cardIndex,
  isLoading,
  isCardDeleted,
}: Props) => {
  //#region State
  const [cardView, setCardView] = useState<Record<string, any>>({
    view: View.READ,
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

  const isEditView = cardView.view === View.EDIT

  const cardStyles = {
    width: "100%",
    borderRadius: "30px",
    height: "100%",
    display: "flex",
    transition: "all 0.8s !important",
    backgroundColor: Theme.lightBg,
    border: "8px solid white",
    ":hover": {
      boxShadow: `${pokemon.colour} 0px 2px 35px 0px, ${pokemon.colour} 0px 0px 40px 0px`,
    },
  }

  const textFieldStyles = {
    sx: {
      borderRadius: "15px !important",
      fieldset: {
        border: `2px solid ${Theme.darkBg}`,
      },
      input: { color: Theme.primaryText },

      "&:hover": {
        fieldset: {
          borderColor: `${Theme.charAccent} !important`,
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
    setCardView({ view: View.EDIT })
  }

  const handleDelete = async () => {
    isCardDeleted(true, pokemon)
  }

  const handleClear = async () => {
    setCardView({ view: View.READ })
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
      fields.attribute || pokemon.attribute,
      Theme.typeColours[fields.type?.toLowerCase()] ?? pokemon.colour
    )

    setOpen(true)
    setAlert(
      `Fields for ${upperCaseFirst(
        pokemon.name
      )} have been updated! Please refresh for results`
    )

    setCardView({ view: View.READ })
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
      {isLoading ? (
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
              fieldsToMap(isEditView, fields, false, pokemon)
            ).map(([k, v], index) => (
              <Column key={index}>
                <Tooltip title={v.label} placement="top-start">
                  <Icon>{v.icon ?? <></>}</Icon>
                </Tooltip>
                {!isEditView ? (
                  <Data>{pokemon[k] || "N/A"}</Data>
                ) : (
                  <TextField
                    id="standard"
                    value={v.value}
                    placeholder={upperCaseFirst(pokemon[k])}
                    variant="outlined"
                    color="warning"
                    style={{ width: "80%", margin: 5 }}
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
            {isEditView && (
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
            )}
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

import { Card, RadioGroup, TextField, Tooltip } from "@mui/material"
import { ChangeEvent, SyntheticEvent, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { theme } from "../../theme"
import { UpdateCard } from "../../api/mutations/updateCard"
import { fieldsToMap } from "../../helpers/fieldsToMap"
import { omit } from "../../helpers/omit"
import { energyImageMap } from "../../helpers/trainerImageMap"
import { upperCaseFirst } from "../../helpers/upperCaseFirst"
import { View } from "../../helpers/view"
import { AttributeSelect } from "../AttributeSelect"
import { Actions } from "../Grid/Actions"
import { GridImage } from "../Grid/GridImage"
import { Snackbar } from "../Grid/Snackbar"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
  isLoading: boolean
  isCardDeleted: (isDeleted: boolean, pokemon: Record<string, any>) => void
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

export const GridView = ({
  pokemon,
  cardIndex,
  isLoading,
  isCardDeleted,
}: Props) => {
  //#region state
  const [isEvolutionsHovered, setIsEvolutionsHovered] = useState<boolean>(false)
  const [editAlert, setEditAlert] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false)
  const [cardView, setCardView] = useState<Record<string, any>>({
    view: View.READ,
  })
  const [fields, setFields] = useState<Record<string, any>>({
    name: "",
    type: "",
    set: "",
    setNumber: "",
    year: "",
    attribute: "",
    quantity: "",
  })

  const ref = useRef(null)
  //#endregion

  const isEditView = cardView.view === View.EDIT

  //#region styles

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
    setCardView({ view: View.EDIT })
    console.log("trainerImageMap", energyImageMap("water"))
  }

  const handleDelete = async () => {
    isCardDeleted(true, pokemon)
  }

  const handleClear = async () => {
    setCardView({ view: View.READ })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFields({
      attribute: (event.target as HTMLInputElement).value,
      ...omit("attribute", fields),
    })
  }

  const handleSubmit = async () => {
    await updateCard()
  }

  const updateCard = async () => {
    setFields({
      ...fields,
    })

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
    setEditAlert(
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
      year: "",
      quantity: "",
      attribute: "",
    })
  }

  return (
    <Wrapper
      isLoading={isLoading}
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
            fieldsToMap(isEditView, fields, false, pokemon, pokemon.id)
          ).map(([k, v], index) => (
            <Row key={index}>
              <Tooltip title={v.label} placement="top-start">
                <Icon isEditView={isEditView}>{v.icon ?? <></>}</Icon>
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
                  style={{ width: "80%", margin: 5 }}
                  sx={{ borderRadius: 15 }}
                  onChange={(e) => {
                    setFields({
                      [k]: e.target.value,
                      ...omit(k, fields),
                    })
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
                          borderColor: `${theme.charAccent} !important`,
                          borderWidth: 2,
                        },
                      },
                    },
                  }}
                />
              )}
            </Row>
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
                  sx={{ height: 35 }}
                />
              ))}
            </StyledRadioGroup>
          )} */}
        </Details>
        <Actions
          handleClear={handleClear}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleSubmit={handleSubmit}
          isCardHovered={isCardHovered}
          isEditView={isEditView}
        />
        <Snackbar editAlert={editAlert} handleClose={handleClose} open={open} />
      </Card>
    </Wrapper>
  )
}

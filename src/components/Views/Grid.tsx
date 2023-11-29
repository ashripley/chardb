import {
  Card,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import styled from "styled-components"
import { useRef, useState } from "react"
import { deleteDoc, doc } from "firebase/firestore"
import { firestore } from "../../services/firebase"
import { UpdateCard } from "../../api/mutations/updateCard"
import { Theme } from "../../Theme"
import { View, typeColours, upperCaseFirst } from "../helpers"
import { GridImage } from "../Grid/GridImage"
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined"
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone"
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined"
import TagIcon from "@mui/icons-material/Tag"
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined"
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined"
import { Actions } from "../Grid/Actions"
import { Snackbar } from "../Grid/Snackbar"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
  isLoading: boolean
  isCardDeleted: (isDeleted: boolean) => void
}

//#region Styled Components
const Wrapper = styled.div<{
  isCardHovered: boolean
  editView: boolean
  isLoading: boolean
}>`
  width: 370px;
  padding: 20px 20px;
  height: ${(props) =>
    !!props.isCardHovered && !!props.editView
      ? "800px"
      : !!props.isCardHovered
      ? "700px"
      : props.isLoading
      ? "0px"
      : "600px"};
  transition: all 0.5s ease;
`

const ActionRow = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333333;
  border-radius: 30px;
  transition: all 1s ease;
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
  color: #333333;
`

const Data = styled.div`
  display: flex;
  width: 60%;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  text-transform: capitalize;
  color: ${Theme.primaryText};
`

const Details = styled.div<{ isCardHovered: boolean; editView: boolean }>`
  height: ${(props) =>
    !!props.isCardHovered && !!props.editView
      ? "60%"
      : props.isCardHovered
      ? "50%"
      : "55%"};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
  transition: all 1s ease;
`

const StyledRadioGroup = styled(RadioGroup)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 5px;
  font-weight: 300 !important;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
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
    year: "",
    attribute: "",
    quantity: "",
  })

  const ref = useRef(null)
  //#endregion

  const isEditView = cardView.view === View.EDIT

  const fieldsToMap = {
    ...(!isEditView && { id: { value: pokemon.id, icon: <TagIcon /> } }),
    name: { value: fields.name, icon: <PermIdentityOutlinedIcon /> },
    type: { value: fields.type, icon: <CatchingPokemonTwoToneIcon /> },
    set: { value: fields.set, icon: <FeaturedPlayListOutlinedIcon /> },
    year: { value: fields.year, icon: <TagIcon /> },
    ...(!isEditView && {
      attribute: {
        value: pokemon.attribute,
        icon: <Brightness1OutlinedIcon />,
      },
    }),
    ...(isEditView && {
      quantity: { value: pokemon.quantity, icon: <PlaylistAddOutlinedIcon /> },
    }),
  }

  //#region styles

  const cardStyles = {
    minWidth: 275,
    backgroundColor: Theme.lightBg,
    borderRadius: "30px",
    height: "100%",
    transition: "all 1.5s !important",
    border: "8px solid white",
    ":hover": {
      boxShadow: `${pokemon.colour} 0px 2px 35px 0px, ${pokemon.colour} 0px 0px 40px 0px`,
      borderRadius: 25,
    },
  }

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
    setIsCardHovered(false)
    setCardView({ view: View.READ })
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  const handleEdit = () => {
    setCardView({ view: View.EDIT })
  }

  const handleDelete = async () => {
    await deleteDoc(doc(firestore, "cards", pokemon.cardId))
    isCardDeleted(true)
  }

  const handleClear = async () => {
    setCardView({ view: View.READ })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ attribute: (e.target as HTMLInputElement).value })
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
      fields.year || pokemon.year,
      fields.quantity || pokemon.quantity,
      fields.attribute || pokemon.attribute,
      typeColours[fields.type?.toLowerCase()] ?? pokemon.colour
    )

    setOpen(true)
    setEditAlert(`Fields for ${upperCaseFirst(pokemon.name)} have been updated`)

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
      editView={isEditView}
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
        <Details editView={isEditView} isCardHovered={isCardHovered}>
          {Object.entries(fieldsToMap).map(([k, v], index) => (
            <Row key={index}>
              <Icon isEditView={isEditView}>{v.icon ?? <></>}</Icon>
              {!isEditView ? (
                <Data>{pokemon[k] || ""}</Data>
              ) : (
                <TextField
                  id="standard"
                  value={v.value}
                  placeholder={upperCaseFirst(pokemon[k])}
                  variant="outlined"
                  color="warning"
                  style={{ width: "80%", margin: 5 }}
                  sx={{ borderRadius: 15 }}
                  onChange={(e) => setFields({ [k]: e.target.value })}
                  InputProps={{
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
                  }}
                />
              )}
            </Row>
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
                  sx={{ height: 35 }}
                />
              ))}
            </StyledRadioGroup>
          )}
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

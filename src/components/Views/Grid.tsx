import {
  Alert,
  Button,
  Card,
  Fade,
  FormControlLabel,
  Grow,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material"
import styled from "styled-components"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined"
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone"
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined"
import TagIcon from "@mui/icons-material/Tag"
import { useEffect, useRef, useState } from "react"
import StarOutlineIcon from "@mui/icons-material/StarOutline"
import StarIcon from "@mui/icons-material/Star"
import { deleteDoc, doc } from "firebase/firestore"
import { firestore } from "../../services/firebase"
import { UpdateCard } from "../../api/mutations/updateCard"
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined"
import ClearIcon from "@mui/icons-material/Clear"
import EditIcon from "@mui/icons-material/Edit"
import DoneIcon from "@mui/icons-material/Done"
import DeleteIcon from "@mui/icons-material/Delete"
import { editIconProps, readIconProps } from "./List"
import { Theme } from "../../Theme"
import { typeColours, upperCaseFirst } from "../helpers"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>
  isLoading: boolean
  isCardDeleted: (isDeleted: boolean) => void
}

enum View {
  READ = "read",
  EDIT = "edit",
}

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
  transition: all 1s ease;
`

const Image = styled.div<{
  attribute: boolean
  isCardHovered: boolean
  editView: boolean
}>`
  background: ${Theme.card};
  height: ${(props) =>
    !!props.isCardHovered && !!props.editView
      ? "30%"
      : props.isCardHovered
      ? "40%"
      : "45%"};
  width: 100%;
  display: flex;
  align-items: center;
  transition: all 1s ease;
  ${(props) =>
    !!props.attribute &&
    `
    flex-direction: column;
    `}
  justify-content: center;
  border-radius: 20px;

  & :hover {
    border-radius: 45px !important;
  }
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

const Row = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Icon = styled.div`
  display: flex;
  width: 15%;
  justify-content: flex-start;
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

const Attribute = styled.div`
  display: flex;
  color: ${Theme.lightBg};
  height: 75%;
  width: 25px;
  margin-right: -25px;
`

const CardWrapper = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
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

const Evolutions = styled.div`
  display: flex;
  justify-content: space-around;
`

export const GridView = ({
  pokemon,
  cardIndex,
  isLoading,
  isCardDeleted,
}: Props) => {
  const [isEvolutionsHovered, setIsEvolutionsHovered] = useState<boolean>(false)
  const [editAlert, setEditAlert] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false)
  const [fields, setFields] = useState<Record<string, any>>({
    name: "",
    type: "",
    set: "",
    year: "",
    quantity: "",
    attribute: "",
  })
  const [cardView, setCardView] = useState<Record<string, any>>({
    view: View.READ,
  })

  const ref = useRef(null)

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

  const onEdit = () => {
    setCardView({ view: View.EDIT })
  }

  const onDelete = async () => {
    await deleteDoc(doc(firestore, "cards", pokemon.cardId))
    isCardDeleted(true)
  }

  const onClear = async () => {
    setCardView({ view: View.READ })
  }

  const onSubmit = async () => {
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
      typeColours[fields.type.toLowerCase()] ?? pokemon.colour
    )

    setOpen(true)
    setEditAlert(`Fields for ${upperCaseFirst(pokemon.name)} have been updated`)

    setCardView({ view: View.READ })
    clearFields()
    // window.location.reload()
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ attribute: (event.target as HTMLInputElement).value })
  }

  const evolutions =
    [
      pokemon?.evolutionChain?.first?.image ?? pokemon.url.front,
      pokemon?.evolutionChain?.second?.image ?? null,
      pokemon?.evolutionChain?.third?.image ?? null,
    ] ?? pokemon.url.front

  return (
    <Wrapper
      isLoading={isLoading}
      editView={cardView.view === View.EDIT}
      isCardHovered={isCardHovered}
      key={`grid-${cardIndex}`}
    >
      <Grow
        in={true}
        style={{ transformOrigin: "1 1 1" }}
        {...(true ? { timeout: 1000 } : {})}
      >
        <Card
          sx={{
            minWidth: 275,
            backgroundColor: Theme.lightBg,
            borderRadius: "30px",
            height: "100%",
            transition: "all 1.5s !important",
            border: "8px solid white",
            ":hover": {
              boxShadow: `${pokemon.colour} 0px 2px 35px 0px, ${pokemon.colour} 0px 0px 40px 0px`,
              borderRadius: 50,
            },
          }}
          variant="elevation"
          raised
          onMouseEnter={() => onCardEnter()}
          onMouseLeave={() => onCardLeave()}
        >
          <Image
            ref={ref}
            editView={cardView.view === View.EDIT}
            isCardHovered={isCardHovered}
            attribute={pokemon.attribute === ("" || "standard")}
          >
            <CardWrapper>
              <Card
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: "100px !important",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: `${Theme.lightBg} !important`,
                  opacity: "revert",
                  transition: "all 0.8s !important",
                  boxShadow: `${Theme.lightBg} 0px 0px 20px 0px !important`,

                  ":hover": {
                    width: "360px !important",
                    height: "350px !important",
                    boxShadow: "none",
                  },
                }}
                className="card-image"
                onMouseEnter={() => mouseEnter()}
                onMouseLeave={() => mouseLeave()}
              >
                {!isEvolutionsHovered ? (
                  <Grow
                    in={true}
                    unmountOnExit
                    {...(true ? { timeout: 1000 } : {})}
                  >
                    <img
                      alt={`"${pokemon.name}"`}
                      src={pokemon.url.front ?? InsertPhotoOutlinedIcon}
                      style={{
                        width: 130,
                        height: 130,
                        zIndex: 100,
                        position: "absolute",
                      }}
                    />
                  </Grow>
                ) : (
                  <Evolutions>
                    {evolutions.map(
                      (image, index) =>
                        !!image && (
                          <Grow
                            in={true}
                            unmountOnExit
                            style={{ transformOrigin: "1 1 1" }}
                            {...(true ? { timeout: 1000 } : {})}
                          >
                            <img
                              key={index}
                              alt={`"${pokemon.name}"`}
                              src={image || null}
                              style={{
                                width: 100,
                                height: 100,
                                padding: 0,
                                zIndex: 100,
                              }}
                            />
                          </Grow>
                        )
                    )}
                  </Evolutions>
                )}
              </Card>
            </CardWrapper>
            {!!pokemon.attribute && (
              <Attribute>
                {pokemon.attribute === "holo" ? (
                  <Tooltip
                    title={"Holographic"}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                  >
                    <StarOutlineIcon />
                  </Tooltip>
                ) : pokemon.attribute === "special" ? (
                  <Tooltip
                    title={"Special"}
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                  >
                    <StarIcon />
                  </Tooltip>
                ) : (
                  <></>
                )}
              </Attribute>
            )}
          </Image>
          <Details
            editView={cardView.view === View.EDIT}
            isCardHovered={isCardHovered}
          >
            {cardView.view === View.READ && (
              <Row>
                <Icon>
                  <TagIcon />
                </Icon>
                <Data>{pokemon.id || ""}</Data>
              </Row>
            )}
            <Row>
              <Icon>
                <PermIdentityOutlinedIcon />
              </Icon>
              {cardView.view === View.READ ? (
                <Data>{pokemon.name || ""}</Data>
              ) : (
                <TextField
                  id="standard"
                  autoFocus
                  value={fields.name}
                  onChange={(e) => setFields({ name: e.target.value })}
                  placeholder={pokemon.name}
                  variant="outlined"
                  style={{ width: "80%", margin: 5 }}
                  sx={{ borderRadius: 15 }}
                  color="warning"
                  InputProps={{
                    sx: {
                      borderRadius: "15px !important",
                    },
                  }}
                />
              )}
            </Row>
            <Row>
              <Icon>
                <CatchingPokemonTwoToneIcon />
              </Icon>
              {cardView.view === View.READ ? (
                <Data>{pokemon.type || ""}</Data>
              ) : (
                <TextField
                  id="standard"
                  value={fields.type}
                  placeholder={pokemon.type}
                  variant="outlined"
                  style={{ width: "80%", margin: 5 }}
                  sx={{ borderRadius: 15 }}
                  color="warning"
                  onChange={(e) => setFields({ type: e.target.value })}
                  InputProps={{
                    sx: {
                      borderRadius: "15px !important",
                      borderColor: "red",
                    },
                  }}
                />
              )}
            </Row>
            <Row>
              <Icon>
                <FeaturedPlayListOutlinedIcon />
              </Icon>
              {cardView.view === View.READ ? (
                <Data>{pokemon.set || ""}</Data>
              ) : (
                <TextField
                  id="standard"
                  value={fields.set}
                  placeholder={pokemon.set}
                  variant="outlined"
                  style={{ width: "80%", margin: 5 }}
                  sx={{ borderRadius: 15 }}
                  color="warning"
                  onChange={(e) => setFields({ set: e.target.value })}
                  InputProps={{
                    sx: {
                      borderRadius: "15px !important",
                    },
                  }}
                />
              )}
            </Row>
            <Row>
              <Icon>
                <TagIcon />
              </Icon>
              {cardView.view === View.READ ? (
                <Data>{pokemon.year || ""}</Data>
              ) : (
                <TextField
                  id="standard"
                  value={fields.year}
                  placeholder={pokemon.year}
                  variant="outlined"
                  style={{ width: "80%", margin: 5 }}
                  sx={{ borderRadius: 15 }}
                  color="warning"
                  onChange={(e) => setFields({ year: e.target.value })}
                  InputProps={{
                    sx: {
                      borderRadius: "15px !important",
                    },
                  }}
                />
              )}
            </Row>
            {cardView.view === View.EDIT && (
              <>
                <Row>
                  <Icon>
                    <PlaylistAddOutlinedIcon />
                  </Icon>
                  <TextField
                    id="standard"
                    value={fields.quantity}
                    placeholder={pokemon.quantity}
                    variant="outlined"
                    type="number"
                    style={{ width: "80%", margin: 5 }}
                    color="warning"
                    onChange={(e) => setFields({ quantity: e.target.value })}
                    InputProps={{
                      sx: {
                        borderRadius: "15px !important",
                      },
                    }}
                  />
                </Row>
                <StyledRadioGroup
                  defaultValue={
                    pokemon.attribute ? pokemon.attribute : fields.attribute
                  }
                  row
                  onChange={handleChange}
                >
                  {["Normal", "Holo", "Special"].map((label, index) => (
                    <FormControlLabel
                      key={index}
                      value={label.toLowerCase()}
                      control={<Radio color="warning" />}
                      label={label}
                      sx={{ height: 35 }}
                    />
                  ))}
                </StyledRadioGroup>
              </>
            )}
          </Details>
          <Grow
            in={isCardHovered}
            style={{ transformOrigin: "1 1 1" }}
            {...(true ? { timeout: 1000 } : {})}
          >
            <ActionRow>
              <Button
                sx={{ borderRadius: 50 }}
                onClick={() =>
                  cardView.view === View.READ
                    ? onEdit()
                    : cardView.view === View.EDIT
                    ? onSubmit()
                    : null
                }
              >
                {cardView.view === View.READ ? (
                  <EditIcon sx={{ ...readIconProps }} />
                ) : (
                  <DoneIcon sx={{ ...readIconProps }} />
                )}
              </Button>
              <Button sx={{ borderRadius: 50 }}>
                {cardView.view === View.READ ? (
                  <DeleteIcon
                    sx={{ ...editIconProps }}
                    onClick={() => onDelete()}
                  />
                ) : (
                  <ClearIcon
                    sx={{ ...editIconProps }}
                    onClick={() => onClear()}
                  />
                )}
              </Button>
            </ActionRow>
          </Grow>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {editAlert}
            </Alert>
          </Snackbar>
        </Card>
      </Grow>
    </Wrapper>
  )
}

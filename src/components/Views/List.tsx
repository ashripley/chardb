import {
  Alert,
  Button,
  Card,
  Divider,
  Fade,
  FormControlLabel,
  Grow,
  Radio,
  RadioGroup,
  Skeleton,
  Slide,
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
import { useState } from "react"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import DoneIcon from "@mui/icons-material/Done"
import { deleteDoc, doc } from "firebase/firestore"
import { firestore } from "../../services/firebase"
import { UpdateCard } from "../../api/mutations/updateCard"
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined"
import ClearIcon from "@mui/icons-material/Clear"
import StarOutlineIcon from "@mui/icons-material/StarOutline"
import StarIcon from "@mui/icons-material/Star"
import { Theme } from "../../Theme"

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

const Wrapper = styled.div`
  width: 90%;
  padding: 20px 30px;
  height: 150px;
`

const Image = styled.div`
  height: 100%;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f1a1b;
  border-radius: 30px;

  & :hover {
    border-radius: 30px;
  }
`

const Details = styled.div<{ isHovered: boolean }>`
  width: ${(props) => (props.isHovered ? "75%" : "100%")};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  transition: 2s ease-out;
`

const Column = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const IdColumn = styled.div`
  width: 99%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const IdDivider = styled.div`
  width: 1%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const IconWrapper = styled.div`
  display: flex;
  width: 15%;
  justify-content: center;
  color: ${Theme.primaryText};
`

const Data = styled.div`
  display: flex;
  width: 100%;
  font-weight: 800;
  justify-content: center;
  align-items: center;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  text-transform: capitalize;
  padding: 10px 0px;
  color: ${Theme.primaryText};
`

const Id = styled.div`
  color: ${Theme.primaryText};
  display: flex;
  width: 10%;
  padding: 10px 0px;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
`

const ActionColumn = styled.div`
  width: 8%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  background: #0f1a1b;
  border-radius: 30px;
  transition: all 1s ease;
`

const StyledRadioGroup = styled(RadioGroup)`
  width: 50%;
  margin: 5px;
  font-weight: 300 !important;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
`

const Attribute = styled.div`
  display: flex;
  color: ${Theme.lightBg};
  height: 120px;
  width: 25px;
  margin-right: -25px;
`

const Evolutions = styled.div`
  display: flex;
  justify-content: space-around;
`

export const readIconProps = {
  height: 30,
  width: 30,
  borderRadius: 100,
  background: "transparent",
  color: Theme.lightBg,
  transition: "all 0.3s !important",
  ":hover": {
    padding: "0.5em",
    boxShadow: `0px 10px 30px ${Theme.primaryText}`,
  },
}

export const editIconProps = {
  borderRadius: 100,
  color: Theme.lightBg,
  transition: "all 0.3s !important",
  ":hover": {
    padding: "0.5em",
    boxShadow: `0px 10px 30px ${Theme.primaryText}`,
  },
}

export const ListView = ({
  pokemon,
  cardIndex,
  isLoading,
  isCardDeleted,
}: Props) => {
  const [cardView, setCardView] = useState<Record<string, any>>({
    view: View.READ,
  })
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [set, setSet] = useState("")
  const [year, setYear] = useState("")
  const [quantity, setQuantity] = useState("")
  const [attribute, setAttribute] = useState("")
  const [imageFace, setImageFace] = useState<string>("front")
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false)
  const [isCardLoading, setIsCardLoading] = useState<boolean>(false)
  const [alert, setAlert] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)

  const onImageEnter = () => {
    setImageFace("back")
  }

  const onImageLeave = () => {
    setImageFace("front")
  }

  const onCardEnter = () => {
    setIsCardHovered(true)
  }

  const onCardLeave = () => {
    setIsCardHovered(false)
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
    setIsCardLoading(true)

    await UpdateCard(
      pokemon.cardId,
      name.length ? name : pokemon.name,
      type.length ? type : pokemon.type,
      set.length ? set : pokemon.set,
      year.length ? year : pokemon.year,
      quantity.length ? quantity : pokemon.quantity ?? "",
      attribute.length ? attribute : pokemon.attribute ?? ""
    )

    setOpen(true)
    setAlert(`Fields for ${pokemon.name.toUpperCase()} have been updated`)

    setCardView({ view: View.READ })
    clearFields()
    setIsCardLoading(false)
  }

  const clearFields = () => {
    setName("")
    setType("")
    setSet("")
    setYear("")
    setQuantity("")
    setAttribute("")
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAttribute((event.target as HTMLInputElement).value)
  }

  const evolutions =
    [
      pokemon?.evolutionChain?.first?.image ?? pokemon.url.front,
      pokemon?.evolutionChain?.second?.image ?? null,
      pokemon?.evolutionChain?.third?.image ?? null,
    ] ?? pokemon.url.front

  return (
    <Wrapper key={`list-${cardIndex}`}>
      <Grow
        in={true}
        unmountOnExit
        style={{ transformOrigin: "1 1 1" }}
        {...(true ? { timeout: 1000 } : {})}
      >
        {isLoading ? (
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={150}
            sx={{ borderRadius: "30px" }}
          />
        ) : (
          <Card
            sx={{
              width: "100%",
              borderRadius: "30px",
              height: "100%",
              display: "flex",
              transition: "all 0.8s !important",
              backgroundColor: Theme.lightBg,
              ":hover": {
                boxShadow: `${pokemon.colour} 0px 2px 4px 0px, ${pokemon.colour} 0px 0px 26px 0px`,
                padding: "0.5em",
              },
            }}
            variant="elevation"
            raised
            onMouseEnter={() => onCardEnter()}
            onMouseLeave={() => onCardLeave()}
          >
            <Image>
              <Card
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "100px",
                  display: "flex",
                  backgroundColor: Theme.lightBg,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: "revert",
                  transition: "all 1.5s !important",
                  boxShadow: `${Theme.lightBg} 0px 0px 10px 0px`,
                  ":hover": {
                    width: 290,
                    height: "100%",
                    boxShadow: "none",
                    borderRadius: "10px",
                  },
                }}
                onMouseEnter={() => onImageEnter()}
                onMouseLeave={() => onImageLeave()}
              >
                {imageFace === "front" ? (
                  <Grow
                    in={true}
                    unmountOnExit
                    {...(true ? { timeout: 1500 } : {})}
                  >
                    <img
                      alt={`"${pokemon.name}"`}
                      src={pokemon.url.front ?? InsertPhotoOutlinedIcon}
                      style={{
                        width: 100,
                        height: 100,
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
                            {...(true ? { timeout: 1500 } : {})}
                          >
                            <img
                              key={index}
                              alt={`"${pokemon.name}"`}
                              src={image || null}
                              style={{
                                width: 100,
                                height: 100,
                                padding: 0,
                              }}
                            />
                          </Grow>
                        )
                    )}
                  </Evolutions>
                )}
              </Card>
              {!!pokemon.attribute && (
                <Attribute>
                  {pokemon.attribute === "holo" ? (
                    <Tooltip
                      title="Holographic"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                    >
                      <StarOutlineIcon />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Special"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                    >
                      <StarIcon />
                    </Tooltip>
                  )}
                </Attribute>
              )}
            </Image>
            <Details isHovered={isCardHovered}>
              <IdColumn>
                <IconWrapper>
                  <TagIcon />
                </IconWrapper>
                <Id>{pokemon.id || ""}</Id>
              </IdColumn>
              <IdDivider>
                <Divider sx={{ borderRightWidth: 2 }} orientation="vertical" />
              </IdDivider>
              <Column>
                <IconWrapper>
                  <PermIdentityOutlinedIcon />
                </IconWrapper>
                {cardView.view === View.READ ? (
                  <Data>{pokemon.name || ""}</Data>
                ) : (
                  <TextField
                    id="standard"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
              </Column>
              <Column>
                <IconWrapper>
                  <CatchingPokemonTwoToneIcon />
                </IconWrapper>
                {cardView.view === View.READ ? (
                  <Data>{pokemon.type || ""}</Data>
                ) : (
                  <TextField
                    id="standard"
                    value={type}
                    placeholder={pokemon.type}
                    variant="outlined"
                    style={{ width: "80%", margin: 5 }}
                    sx={{ borderRadius: 15 }}
                    color="warning"
                    onChange={(e) => setType(e.target.value)}
                    InputProps={{
                      sx: {
                        borderRadius: "15px !important",
                        borderColor: "red",
                      },
                    }}
                  />
                )}
              </Column>
              <Column>
                <IconWrapper>
                  <FeaturedPlayListOutlinedIcon />
                </IconWrapper>
                {cardView.view === View.READ ? (
                  <Data>{pokemon.set || ""}</Data>
                ) : (
                  <TextField
                    id="standard"
                    value={set}
                    placeholder={pokemon.set}
                    variant="outlined"
                    style={{ width: "80%", margin: 5 }}
                    sx={{ borderRadius: 15 }}
                    color="warning"
                    onChange={(e) => setSet(e.target.value)}
                    InputProps={{
                      sx: {
                        borderRadius: "15px !important",
                      },
                    }}
                  />
                )}
              </Column>
              <Column>
                <IconWrapper>
                  <TagIcon />
                </IconWrapper>
                {cardView.view === View.READ ? (
                  <Data>{pokemon.year || ""}</Data>
                ) : (
                  <TextField
                    id="standard"
                    value={year}
                    placeholder={pokemon.year}
                    variant="outlined"
                    style={{ width: "80%", margin: 5 }}
                    sx={{ borderRadius: 15 }}
                    color="warning"
                    onChange={(e) => setYear(e.target.value)}
                    InputProps={{
                      sx: {
                        borderRadius: "15px !important",
                      },
                    }}
                  />
                )}
              </Column>
              {cardView.view === View.EDIT && (
                <>
                  <Column>
                    <IconWrapper>
                      <PlaylistAddOutlinedIcon />
                    </IconWrapper>
                    <TextField
                      id="standard"
                      value={quantity}
                      placeholder={pokemon.quantity}
                      variant="outlined"
                      type="number"
                      style={{ width: "80%", margin: 5 }}
                      color="warning"
                      onChange={(e) => setQuantity(e.target.value)}
                      InputProps={{
                        sx: {
                          borderRadius: "15px !important",
                        },
                      }}
                    />
                  </Column>
                  <StyledRadioGroup
                    defaultValue={
                      pokemon.attribute ? pokemon.attribute : attribute
                    }
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
            <Slide
              in={isCardHovered}
              direction="left"
              style={{ transformOrigin: "1 1 1" }}
              {...(true ? { timeout: 1000 } : {})}
            >
              <ActionColumn>
                <Button
                  sx={{ borderRadius: "50px" }}
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
                <Button sx={{ borderRadius: "50px" }}>
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
              </ActionColumn>
            </Slide>
            <Snackbar open={open} autoHideDuration={2000} onClose={() => {}}>
              <Alert
                onClose={() => {}}
                severity="success"
                sx={{ width: "100%" }}
              >
                {alert}
              </Alert>
            </Snackbar>
          </Card>
        )}
      </Grow>
    </Wrapper>
  )
}

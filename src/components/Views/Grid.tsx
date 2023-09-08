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
import { Spinner } from "../Spinner"
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
  width: 22%;
  padding: 20px 20px;
  height: 600px;
`

const Image = styled.div<{ attribute: boolean }>`
  background: #0f1a1b;
  height: 60%;
  display: flex;
  align-items: center;
  ${(props) =>
    !!props.attribute &&
    `
    flex-direction: column;
    `}
  justify-content: center;
  border-radius: 50px;

  & :hover {
    border-radius: 45px;
  }
`

const Details = styled.div`
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
`

const Data = styled.div`
  display: flex;
  width: 60%;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  text-transform: capitalize;
`

// const Id = styled.div<{ attribute: boolean }>`
//   color: black;
//   font-weight: 800;
//   font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
//     Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
//     source-sans-pro, sans-serif;
//   font-size: 1.2rem;

//   ${(props) =>
//     !!props.attribute &&
//     `
//   justify-content: center;
//   display: flex;
//   `}
// `

const Attribute = styled.div`
  display: flex;
  color: white;
  height: 75%;
  width: 25px;
  margin-right: -25px;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ActionColumn = styled.div`
  margin-top: 280px;
  margin-left: -125px;
  width: 125px;
`

const StyledRadioGroup = styled(RadioGroup)`
  width: 50%;
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
  const [cardView, setCardView] = useState<Record<string, any>>({
    view: View.READ,
  })
  const [imageFace, setImageFace] = useState<string>("front")
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [set, setSet] = useState("")
  const [year, setYear] = useState("")
  const [quantity, setQuantity] = useState("")
  const [attribute, setAttribute] = useState("")
  const [alert, setAlert] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false)
  const [isCardLoading, setIsCardLoading] = useState<boolean>(false)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const mouseEnter = () => {
    setIsHovered(true)
    setImageFace("back")
  }

  const mouseLeave = () => {
    setIsHovered(false)
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
    <Wrapper key={`grid-${cardIndex}`}>
      <Grow
        in={true}
        style={{ transformOrigin: "1 1 1" }}
        {...(true ? { timeout: 1000 } : {})}
      >
        {isLoading ? (
          <Spinner />
        ) : cardView.view === View.READ ? (
          <Card
            sx={{
              minWidth: 275,
              backgroundColor: "white",
              borderRadius: 15,
              height: "100%",
              transition: "all 0.8s !important",
              ":hover": {
                padding: "0.5em",
                boxShadow: "0px 10px 30px dimGray",
              },
            }}
            variant="elevation"
            raised
            onMouseEnter={() => onCardEnter()}
            onMouseLeave={() => onCardLeave()}
          >
            <Image attribute={pokemon.attribute === ("" || "standard")}>
              <CardWrapper>
                <Card
                  sx={{
                    width: 200,
                    height: 200,
                    background: "white",
                    borderRadius: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: "revert",
                    transition: "all 1.8s !important",
                    ":hover": {
                      width: 400,
                      height: 400,
                      boxShadow: "none",
                    },
                  }}
                  onMouseEnter={() => mouseEnter()}
                  onMouseLeave={() => mouseLeave()}
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
                          width: 130,
                          height: 130,
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
                                  width: 120,
                                  height: 120,
                                  padding: 0,
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
              {/* <Grow
                in={isCardHovered}
                style={{ transformOrigin: "1 1 1" }}
                {...(true ? { timeout: 1000 } : {})}
              >
                <ActionColumn>
                  <Button
                    sx={{ borderRadius: 50, marginLeft: "-40px !important" }}
                    onClick={() =>
                      cardView.view === View.READ
                        ? onEdit()
                        : cardView.view === View.EDIT
                        ? onSubmit()
                        : null
                    }
                  >
                    {cardView.view === View.READ ? (
                      <EditIcon
                        sx={{
                          height: 30,
                          width: 30,
                          borderRadius: 100,
                          background: "transparent",
                          color: "white",
                          transition: "all 0.3s !important",
                          ":hover": {
                            padding: "0.5em",
                            boxShadow: "0px 10px 30px dimGray",
                          },
                        }}
                      />
                    ) : (
                      <DoneIcon
                        sx={{
                          height: 30,
                          width: 30,
                          borderRadius: 100,
                          background: "transparent",
                          color: "white",
                          transition: "all 0.3s !important",
                          ":hover": {
                            padding: "0.5em",
                            boxShadow: "0px 10px 30px dimGray",
                          },
                        }}
                      />
                    )}
                  </Button>
                  <Button sx={{ borderRadius: 50 }}>
                    {cardView.view === View.READ ? (
                      <DeleteIcon
                        sx={{
                          borderRadius: 100,
                          color: "white",
                          transition: "all 0.3s !important",
                          ":hover": {
                            padding: "0.5em",
                            boxShadow: "0px 10px 30px dimGray",
                          },
                        }}
                        onClick={() => onDelete()}
                      />
                    ) : (
                      <ClearIcon
                        sx={{
                          borderRadius: 100,
                          color: "white",
                          transition: "all 0.3s !important",
                          ":hover": {
                            padding: "0.5em",
                            boxShadow: "0px 10px 30px dimGray",
                          },
                        }}
                        onClick={() => onClear()}
                      />
                    )}
                  </Button>
                </ActionColumn>
              </Grow> */}
            </Image>
            <Details>
              <Row>
                <Icon>
                  <TagIcon />
                </Icon>
                <Data>{pokemon.id || ""}</Data>
              </Row>
              <Row>
                <Icon>
                  <PermIdentityOutlinedIcon />
                </Icon>
                {cardView.view === View.READ ? (
                  <Data>{pokemon.name || ""}</Data>
                ) : cardView.view === View.EDIT ? (
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
                ) : (
                  <></>
                )}
              </Row>
              <Row>
                <Icon>
                  <CatchingPokemonTwoToneIcon />
                </Icon>
                {cardView.view === View.READ ? (
                  <Data>{pokemon.type || ""}</Data>
                ) : cardView.view === View.EDIT ? (
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
                ) : (
                  <></>
                )}
              </Row>
              <Row>
                <Icon>
                  <FeaturedPlayListOutlinedIcon />
                </Icon>
                {cardView.view === View.READ ? (
                  <Data>{pokemon.set || ""}</Data>
                ) : cardView.view === View.EDIT ? (
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
                ) : (
                  <></>
                )}
              </Row>
              <Row>
                <Icon>
                  <TagIcon />
                </Icon>
                {cardView.view === View.READ ? (
                  <Data>{pokemon.year || ""}</Data>
                ) : cardView.view === View.EDIT ? (
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
                ) : (
                  <></>
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
                  </Row>
                  <StyledRadioGroup
                    defaultValue={
                      pokemon.attribute ? pokemon.attribute : attribute
                    }
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="normal"
                      control={<Radio color="warning" />}
                      label="Normal"
                      sx={{ height: 35 }}
                    />
                    <FormControlLabel
                      value="holo"
                      control={<Radio color="warning" />}
                      label="Holo"
                      sx={{ height: 35 }}
                    />
                    <FormControlLabel
                      value="special"
                      control={<Radio color="warning" />}
                      label="Special"
                      sx={{ height: 35 }}
                    />
                  </StyledRadioGroup>
                </>
              )}
            </Details>
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
        ) : (
          <></>
        )}
      </Grow>
    </Wrapper>
  )
}

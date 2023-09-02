import { Button, Card, Divider, Grow, Slide, TextField } from "@mui/material"
import styled from "styled-components"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined"
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone"
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined"
import TagIcon from "@mui/icons-material/Tag"
import { useEffect, useState } from "react"
import EditIcon from "@mui/icons-material/Edit"
import { Spinner } from "../Spinner"
import DeleteIcon from "@mui/icons-material/Delete"
import DoneIcon from "@mui/icons-material/Done"
import { collection, doc } from "firebase/firestore"
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentDeletion,
} from "@react-query-firebase/firestore"
import { firestore } from "../../services/firebase"
import { DeleteCard } from "../../api/mutations/deleteCard"

interface Props {
  cardIndex: number
  pokemon: Record<string, any>[]
  isLoading: boolean
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
  max-width: 20%;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f1a1b;
  border-radius: 50px;
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
`

const Data = styled.div`
  display: flex;
  width: 60%;
  font-weight: 800;
  justify-content: center;
  align-items: center;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  text-transform: capitalize;
  padding: 10px 0px;
`

const Id = styled.div`
  color: black;
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
  border-radius: 50px;
  transition: all 1s ease;
`

export const ListView = ({ pokemon, cardIndex, isLoading }: Props) => {
  const data = pokemon.find((p) => p.name.length)
  const cardId = data?.cardId
  const [cardView, setCardView] = useState<Record<string, any>>({
    view: View.READ,
  })
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [set, setSet] = useState("")
  const [year, setYear] = useState("")
  const [imageFace, setImageFace] = useState<string>("front")
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false)

  const updateRef = collection(firestore, "cards")
  const deleteRef = doc(collection(firestore, "cards"), cardId)

  const deleteMutation = useFirestoreDocumentDeletion(deleteRef)
  const updateMutation = useFirestoreCollectionMutation(updateRef)

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
    await deleteMutation.mutate()
    deleteMutation.isError && console.error(deleteMutation.error.message)
  }

  const onSubmit = async () => {
    await updateMutation.mutate({
      name: name.length ? name : data?.name,
      type: type.length ? type : data?.type,
      set: set.length ? set : data?.set,
      year: year.length ? year : data?.year,
    })

    !!updateMutation.isError && console.log(updateMutation.error.message)

    setCardView({ view: View.READ })
    clearFields()
  }

  const clearFields = () => {
    setName("")
    setType("")
    setSet("")
    setYear("")
  }

  return (
    <Wrapper key={`list-${cardIndex}`}>
      <Grow
        in={true}
        style={{ transformOrigin: "1 1 1" }}
        {...(true ? { timeout: 1000 } : {})}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Card
            sx={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 15,
              height: "100%",
              display: "flex",
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
            <Image>
              <Card
                sx={{
                  width: 120,
                  height: 120,
                  background: "white",
                  borderRadius: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: "revert",
                  transition: "all 0.8s !important",
                  ":hover": {
                    padding: "0.3em",
                    boxShadow: "0px 0px 30px gray",
                  },
                }}
                onMouseEnter={() => onImageEnter()}
                onMouseLeave={() => onImageLeave()}
              >
                <img
                  alt={`"${data?.name}"`}
                  src={
                    imageFace === "front"
                      ? data?.url.front
                      : data?.url.back || <InsertPhotoOutlinedIcon />
                  }
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              </Card>
            </Image>
            <Details isHovered={isCardHovered}>
              <IdColumn>
                <IconWrapper>
                  <TagIcon />
                </IconWrapper>
                <Id>{data?.id || ""}</Id>
              </IdColumn>
              <IdDivider>
                <Divider sx={{ borderRightWidth: 2 }} orientation="vertical" />
              </IdDivider>
              <Column>
                <IconWrapper>
                  <PermIdentityOutlinedIcon />
                </IconWrapper>
                {cardView.view === View.READ ? (
                  <Data>{data?.name || ""}</Data>
                ) : cardView.view === View.EDIT ? (
                  <TextField
                    id="standard"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={data?.name}
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
              </Column>
              <Column>
                <IconWrapper>
                  <CatchingPokemonTwoToneIcon />
                </IconWrapper>
                {cardView.view === View.READ ? (
                  <Data>{data?.type || ""}</Data>
                ) : cardView.view === View.EDIT ? (
                  <TextField
                    id="standard"
                    value={type}
                    placeholder={data?.type}
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
              </Column>
              <Column>
                <IconWrapper>
                  <FeaturedPlayListOutlinedIcon />
                </IconWrapper>
                {cardView.view === View.READ ? (
                  <Data>{data?.set || ""}</Data>
                ) : cardView.view === View.EDIT ? (
                  <TextField
                    id="standard"
                    value={set}
                    placeholder={data?.set}
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
              </Column>
              <Column>
                <IconWrapper>
                  <TagIcon />
                </IconWrapper>
                {cardView.view === View.READ ? (
                  <Data>{data?.year || ""}</Data>
                ) : cardView.view === View.EDIT ? (
                  <TextField
                    id="standard"
                    value={year}
                    placeholder={data?.year}
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
              </Column>
            </Details>
            <Slide
              in={isCardHovered}
              direction="left"
              style={{ transformOrigin: "1 1 1" }}
              {...(true ? { timeout: 1000 } : {})}
            >
              <ActionColumn>
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
                </Button>
              </ActionColumn>
            </Slide>
          </Card>
        )}
      </Grow>
    </Wrapper>
  )
}

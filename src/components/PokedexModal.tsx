import * as React from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import styled from "styled-components"
import { useState } from "react"
import { Theme } from "../Theme"

interface Props {
  pokemon: Record<string, any>
  openModal: boolean
  closeModal: (isClosed: boolean) => void
}

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background: white !important;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 100%;
  justify-content: space-between;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  align-items: center;
`

const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60%;
`

const Label = styled.div`
  display: flex;
  width: 100%;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  color: ${Theme.primaryText};
  font-size: 30px;
  justify-content: center;
  padding: 20px 0px;
  margin-bottom: 20px;
  padding-top: 0px;
  text-transform: capitalize;
  height: 20%;
}
`

const Key = styled.div`
  display: flex;
  width: 20%;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  color: ${Theme.primaryText};
  font-size: 18px;
  justify-content: center;
  padding: 10px 0px;
  text-transform: capitalize;
}
`

const Value = styled.div`
display: flex;
width: 20%;
font-weight: 800;
font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
  Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
  source-sans-pro, sans-serif;
color: ${Theme.primaryText};
font-size: 18px;
justify-content: center;
padding: 10px 0px;
text-transform: capitalize;
}
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

const Abilities = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  justify-content: center;
`

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "60%",
  bgcolor: "background.paper",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
  borderRadius: "15px",
  p: 4,
}

export const PokedexModal = ({ openModal, closeModal, pokemon }: Props) => {
  const [open, setOpen] = React.useState(false)
  const [attribute, setAttribute] = useState("")
  console.log("pokemon[1]", pokemon)

  const { name, sprites, id, height, weight } = pokemon[1] ?? ""
  const abilities: string[] = pokemon[1]?.abilities.map((a: string) => a[0])
  console.log(
    "abilities",
    pokemon[1]?.abilities.map((a: string) => a[0])
  )

  React.useEffect(() => {
    setOpen(openModal)
  }, [openModal])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAttribute((event.target as HTMLInputElement).value)
  }

  const handleClose = () => {
    setOpen(false)
    closeModal(false)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        style={{ backdropFilter: "blur(2px)" }}
        slotProps={{
          backdrop: {
            timeout: {
              appear: 1000,
              enter: 1000,
              exit: 1000,
            },
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Container>
              <Header>
                <Image>
                  <img
                    alt={`"${name}"`}
                    src={sprites?.front ?? ""}
                    style={{
                      width: 200,
                      height: 200,
                      zIndex: 100,
                      position: "absolute",
                    }}
                  />
                </Image>
                <Label>{name ?? ""}</Label>
              </Header>
              <Details>
                <Row>
                  <Key>id</Key>
                  <Value>{id}</Value>
                </Row>
                <Row>
                  <Key>Abilities</Key>
                  <Abilities>
                    {abilities.map((abilitiy, index) => (
                      <Value key={index}>{abilitiy}</Value>
                    ))}
                  </Abilities>
                </Row>
                <Row>
                  <Key>Height</Key>
                  <Value>{height}</Value>
                </Row>
                <Row>
                  <Key>Weight</Key>
                  <Value>{weight}</Value>
                </Row>
              </Details>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

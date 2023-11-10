import * as React from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import styled from "styled-components"
import { Theme, TypeColours } from "../Theme"
import { Divider, Grow } from "@mui/material"

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
  background: ${Theme.lightBg};
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  height: 30%;
  max-height: 50%;
  width: 100%;
  justify-content: space-between;
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
  padding-top: 0px;
  text-transform: capitalize;
  height: 20%;
}
`

const Details = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  max-height: auto;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: left;
  position: relative;
  left: 37%;
`

const Key = styled.div`
  display: flex;
  width: 20%;
  min-width: 20%;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
  Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
  source-sans-pro, sans-serif;
  color: ${Theme.primaryText};
  font-size: 18px;
  justify-content: flex-start;
  padding: 10px 0px;
  text-transform: capitalize;
  }
`

const Value = styled.div`
  display: flex;
  width: auto;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
  Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
  source-sans-pro, sans-serif;
  color: ${Theme.primaryText};
  font-size: 18px;
  justify-content: flex-start;
  padding: 10px 0px;
  text-transform: capitalize;
  }
`

const Descriptions = styled(Value)`
  display: flex;
  flex-direction: column;
  padding: 0px;
`

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "80%",
  bgcolor: Theme.lightBg,
  borderRadius: "15px",
  p: 4,
}

export const PokedexModal = ({ openModal, closeModal, pokemon }: Props) => {
  const [open, setOpen] = React.useState(false)

  const { name, image, types, abilities, id, height, weight } = pokemon ?? ""

  React.useEffect(() => {
    setOpen(openModal)
  }, [openModal])

  const handleClose = () => {
    setOpen(false)
    closeModal(false)
  }

  const evolutions = [
    pokemon?.evolutionChain?.first?.image,
    pokemon?.evolutionChain?.second?.image,
    pokemon?.evolutionChain?.third?.image,
  ]

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        style={{
          backdropFilter: "blur(2px)",
        }}
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
          <Box
            sx={{
              ...style,
              boxShadow: `0px 0px 10px 5px ${
                TypeColours[pokemon.types?.[0]]
              } , 0px 0px 0px 0px #ffffff !important`,
            }}
          >
            <Container>
              <Header>
                <Image>
                  <img
                    alt={`"${name}"`}
                    src={image ?? ""}
                    style={{
                      width: 250,
                      height: 250,
                      zIndex: 100,
                      position: "absolute",
                    }}
                  />
                </Image>
                <Label>{name ?? ""}</Label>
              </Header>
              <Divider orientation="horizontal" />
              <Details>
                <Row>
                  <Key>id:</Key>
                  <Value>{id}</Value>
                </Row>
                <Row>
                  <Key>Type:</Key>
                  <Descriptions>
                    {types?.map((type: [], index: number) => (
                      <Value key={index}>{type}</Value>
                    ))}
                  </Descriptions>
                </Row>
                <Row>
                  <Key>Abilities:</Key>
                  <Descriptions>
                    {abilities?.map((abilitiy: [], index: number) => (
                      <Value key={index}>{abilitiy}</Value>
                    ))}
                  </Descriptions>
                </Row>
                <Row>
                  <Key>Height:</Key>
                  <Value>{height}</Value>
                </Row>
                <Row>
                  <Key>Weight:</Key>
                  <Value>{weight}</Value>
                </Row>
              </Details>
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
                        src={image}
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
            </Container>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

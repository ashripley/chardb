import * as React from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import styled from "styled-components"
import { Theme, TypeColours } from "../Theme"
import { Button, Divider } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"
import { upperCaseFirst } from "./helpers"

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
  paddingBottom: 30px;
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

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  width: 40px;
  height: 60px;
`

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Evolutions = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
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

const closeIconProps = {
  width: 40,
  height: 40,
  color: Theme.primaryText,
  display: "flex",
  justifyContent: "flex-end",
}

export const PokedexModal = ({ openModal, closeModal, pokemon }: Props) => {
  console.log("pokemon", pokemon)
  const [open, setOpen] = React.useState(false)

  const { name, image, types, abilities, id, height, weight } = pokemon ?? ""

  React.useEffect(() => {
    setOpen(openModal)
  }, [openModal])

  const handleClose = () => {
    setOpen(false)
    closeModal(false)
  }

  const evolutions =
    [
      pokemon?.evolutionChain?.first?.image ?? pokemon.url?.front,
      pokemon?.evolutionChain?.second?.image ?? null,
      pokemon?.evolutionChain?.third?.image ?? null,
    ] ?? null

  const genericRow = (label: string, val: any) => (
    <Row>
      <Key>{upperCaseFirst(label)}:</Key>
      <Value>{val}</Value>
    </Row>
  )

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
              <Actions>
                <Evolutions>
                  {evolutions.map(
                    (image, index) =>
                      !!image && (
                        <img
                          key={index}
                          src={image || null}
                          style={{
                            width: 50,
                            height: 50,
                            padding: 0,
                          }}
                        />
                      )
                  )}
                </Evolutions>
                <StyledButton sx={{ borderRadius: 50 }}>
                  <ClearIcon sx={{ ...closeIconProps }} onClick={handleClose} />
                </StyledButton>
              </Actions>
              <Header>
                <Image>
                  <img
                    alt={`"${name}"`}
                    src={image ?? ""}
                    style={{
                      width: 200,
                      height: 200,
                      zIndex: 100,
                      position: "absolute",
                      paddingBottom: 20,
                    }}
                  />
                </Image>
                <Label>{name ?? ""}</Label>
              </Header>
              <Divider orientation="horizontal" />
              <Details>
                {genericRow("id", id)}
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
                {genericRow("height", height)}
                {genericRow("weight", weight)}
              </Details>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

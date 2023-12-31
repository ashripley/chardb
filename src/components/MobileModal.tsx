import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import styled from "styled-components"
import { theme } from "../theme"

const Wrapper = styled.div`
  height: 50%;
  width: 50%;
  display: flex;
  border: 1px solid ${theme.darkBg};
`

const Text = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: ${theme.lightBg};
  font-weight: 500;
  align-items: center;
  text-align: center;
`

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
`

const ImageWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

const PokemonImage = styled.img`
  width: 100px;
  height: 100px;
  position: relative;
  display: flex;
`

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "30%",
  border: "8px solid white",
  bgcolor: theme.lightBg,
  boxShadow: `${theme.lightBg} 0px 0px 2px 0px !important`,
  borderRadius: "25px",
  p: 4,
}

export const MobileModal = () => {
  return (
    <Wrapper>
      <Modal
        open={true}
        onClose={() => {}}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        style={{ backdropFilter: "blur(4px)" }}
      >
        <Box sx={style}>
          <Container>
            <ImageWrapper>
              <PokemonImage
                src="https://img.pokemondb.net/sprites/home/normal/snorlax.png"
                alt="snorlax"
              />
            </ImageWrapper>
            <Text>
              Oops! Mobile detected. This web app is only modified for Desktop.
            </Text>
          </Container>
        </Box>
      </Modal>
    </Wrapper>
  )
}

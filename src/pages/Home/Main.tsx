import { Button, Grow, StyledEngineProvider } from "@mui/material"
import styled from "styled-components"
import { Theme } from "../../Theme"

interface Props {
  menuOption: (label?: string) => void
}

const Root = styled.div`
  display: flex;
  max-width: 100%;
  max-height: 80%;
  height: 80%;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
`

const Wrapper = styled.div`
  max-height: 60%;
`

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8rem;
  max-width: 100%;
  width: 100%;
  height: 80%;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
`

const SubTitle = styled.h3`
  font-size: 1.5rem;
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 20%;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  font-weight: 100;
`

const ButtonWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  height: 30%;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
`

const StyledButton = styled(Button)`
  border-radius: 15px;
  background-color: #e3e4db;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  font-size: 16px;
  width: 14rem;
  padding: 15px;
  height: 25%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  transition: all 1s ease;

  &:hover {
    background-color: darkorange !important;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
    color: #e3e4db !important;
  }
`

export const Main = ({ menuOption }: Props) => {
  const onClick = () => {
    menuOption("Cards")
  }

  return (
    <>
      <Grow
        in={true}
        style={{ transformOrigin: "1 1 1" }}
        {...(true ? { timeout: 1000 } : { timeout: 1000 })}
      >
        <Root>
          <Wrapper>
            <Title>
              <span style={{ color: "darkorange", fontWeight: 800 }}>char</span>
              <a href="https://pokemondb.net/pokedex/charmander">
                <img
                  src="https://img.pokemondb.net/sprites/home/normal/charmander.png"
                  alt="Charmander"
                />
              </a>
              <span style={{ color: Theme.primaryText }}>db</span>
            </Title>
            <SubTitle>
              <span style={{ color: Theme.primaryText }}>
                a place to store your nostalgia
              </span>
            </SubTitle>
          </Wrapper>
          <ButtonWrapper>
            <StyledEngineProvider injectFirst>
              <StyledButton
                variant="contained"
                onClick={() => onClick()}
                sx={{ color: Theme.primaryText }}
              >
                View Cards
              </StyledButton>
            </StyledEngineProvider>
          </ButtonWrapper>
        </Root>
      </Grow>
    </>
  )
}

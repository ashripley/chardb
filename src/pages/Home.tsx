import { Button, Grow, StyledEngineProvider } from "@mui/material"
import { memo } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { theme } from "../theme"
import { setPage } from "../redux/root"

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  max-height: 80%;
  height: 80%;
`

const Wrapper = styled.div`
  max-height: 60%;
  height: 60vh;
`

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(24px + 6vw);
  max-width: 100%;
  width: 100%;
  height: 80%;
  font-family: ${theme.fontFamily};
`

const SubTitle = styled.h3`
  font-size: calc(12px + 0.8vw);
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 20%;
  font-family: ${theme.fontFamily};
  font-weight: 100;
`

const ButtonWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  height: auto;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
`

const StyledButton = styled(Button)`
  border-radius: 15px;
  background-color: ${theme.darkBg};
  font-family: ${theme.fontFamily};
  font-size: calc(12px + 0.2vw);
  width: 14rem;
  padding: 15px;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  transition: all 1s ease;

  &:hover {
    background-color: ${theme.charAccent} !important;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
    color: ${theme.darkBg} !important;
  }
`

const StyledImage = styled.img`
  width: calc(100px + 6vw);
`

export const Home = memo(() => {
  const dispatch = useDispatch()

  return (
    <>
      <Grow in={true} style={{ transformOrigin: "1 1 1" }} timeout={1000}>
        <Root>
          <Wrapper>
            <Title>
              <span style={{ color: theme.charAccent, fontWeight: 800 }}>
                char
              </span>
              <a href="https://pokemondb.net/pokedex/charmander">
                <StyledImage
                  src="https://img.pokemondb.net/sprites/home/normal/charmander.png"
                  alt="Charmander"
                />
              </a>
              <span style={{ color: theme.primaryText }}>db</span>
            </Title>
            <SubTitle>
              <span style={{ color: theme.primaryText }}>
                a place to store your nostalgia
              </span>
            </SubTitle>
          </Wrapper>
          <ButtonWrapper>
            <StyledEngineProvider injectFirst>
              <StyledButton
                variant="contained"
                onClick={() => dispatch(setPage("Cards"))}
                sx={{ color: theme.primaryText }}
              >
                View Cards
              </StyledButton>
            </StyledEngineProvider>
          </ButtonWrapper>
        </Root>
      </Grow>
    </>
  )
})

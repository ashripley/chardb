import { Button, CircularProgress, StyledEngineProvider } from "@mui/material"
import { useState } from "react"
import styled from "styled-components"

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

const Wrapper = styled.h1`
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
  background-color: transparent;
  border: 1px solid white;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  font-size: 16px;
  width: 10rem;
  padding: 15px;
  height: 20%;

  &:hover {
    background-color: darkorange !important;
  }
`

export const Body = () => {
  const [clicked, setClicked] = useState(false)

  return (
    <>
      <Root>
        <Wrapper>
          <Title>
            <span style={{ color: "darkorange", fontWeight: 800 }}>char</span>
            <span style={{ color: "white" }}>db</span>
          </Title>
          <SubTitle>
            <span style={{ color: "white" }}>
              a place to store your nostalgia
            </span>
          </SubTitle>
        </Wrapper>
        <ButtonWrapper>
          <StyledEngineProvider injectFirst>
            {clicked ? (
              <CircularProgress color="warning" />
            ) : (
              <StyledButton
                variant="contained"
                onClick={() => setClicked(true)}
              >
                browse
              </StyledButton>
            )}
          </StyledEngineProvider>
        </ButtonWrapper>
      </Root>
    </>
  )
}

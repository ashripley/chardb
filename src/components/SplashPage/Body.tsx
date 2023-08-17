import { Button } from "@mui/material"
import styled from "styled-components"

const Root = styled.div`
  display: flex;
  max-width: 100%;
  max-height: 100%;
  height: 80%;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8rem;
  max-width: 100%;
  width: 100%;
  height: 50%;
  font-family: Avenir, Montserrat, Corbel, "URW Gothic", source-sans-pro,
    sans-serif;
`

const SubTitle = styled.h3`
  font-size: 1.5rem;
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 10%;
  font-family: Avenir, Montserrat, Corbel, "URW Gothic", source-sans-pro,
    sans-serif;
  font-weight: 100;
`

const ButtonWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
`

export const Body = () => {
  return (
    <>
      <Root>
        <div style={{ height: "50%", paddingTop: "5%" }}>
          <Title>
            <span style={{ color: "darkorange", fontWeight: 800 }}>char</span>
            <span style={{ color: "white" }}>db</span>
          </Title>
          <SubTitle>
            <span style={{ color: "white" }}>
              a place to store your nostalgia
            </span>
          </SubTitle>
        </div>
        <ButtonWrapper>
          <Button
            style={{
              borderRadius: 15,
              backgroundColor: "darkorange",
              fontFamily:
                'Avenir, Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif',
              fontSize: 18,
              width: "10rem",
              padding: 15,
            }}
            variant="contained"
          >
            Search
          </Button>
        </ButtonWrapper>
        <div style={{ height: "10%" }}>test</div>
      </Root>
    </>
  )
}

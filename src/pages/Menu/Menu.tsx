import * as React from "react"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import styled from "styled-components"
import { Button, Card, IconButton } from "@mui/material"
import flame from "../../assets/icons/flame.png"
import CloseIcon from "@mui/icons-material/Close"

interface Props {
  isOpen: boolean
  isClosed: boolean
  menuOption: (label?: string) => void
  drawerToggle: (isOpen: boolean, isClosed: boolean) => void
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
`

const HeaderWrapper = styled.div`
  display: flex;
  height: 35%;
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  justify-content: space-around;
`

const TitleWrapper = styled.div`
  max-width: 40%;
  display: flex;
  height: 100%;
  width: 50%;
  justify-content: flex-start;
`

const IconWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`

const FlameWrapper = styled.div`
  height: 100%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FlameContainer = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: center;
  align-items: inherit;
  width: 80px;
  height: 80px;
`

const FlameCard = styled(Card)`
  border-radius: 15px !important;
  padding: 5px;
`

const HeaderText = styled.div`
  display: flex;
  font-size: 2.5rem;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  display: flex;
  margin: 0;
  padding: 10px;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
`

const Body = styled.div`
  display: flex;
  height: 60%;
  width: 100%;
  justify-content: center;
`

const StyledList = styled(List)`
  max-height: 60%;
  height: 60%;
  width: 60%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const StyledButton = styled(Button)`
  border-radius: 15px;
  background-color: transparent;
  border: 1px solid white;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  font-size: 16px;
  width: 60%;
  padding: 15px;
  height: 20%;

  &:hover {
    background-color: darkorange !important;
  }
`

export const Menu = ({ isOpen, isClosed, drawerToggle, menuOption }: Props) => {
  console.log("menu")
  const [state, setState] = React.useState(false)

  const onClose = () => {
    setState(false)
    drawerToggle(false, true)
  }

  React.useEffect(() => {
    setState(isOpen)
  }, [isOpen])

  const onClick = (label: string) => {
    menuOption(label)
    onClose()
  }

  return (
    <>
      <Drawer
        anchor={"bottom"}
        open={state}
        onClose={() => onClose()}
        variant="temporary"
        PaperProps={{
          sx: {
            width: "100%",
            height: "100%",
            background: "#0f1a1b",
            color: "white",
          },
        }}
      >
        <Container>
          <HeaderWrapper>
            <TitleWrapper>
              <FlameWrapper>
                <FlameContainer>
                  <FlameCard>
                    <img
                      src={flame}
                      alt="menu"
                      style={{ width: 50, height: 50, padding: 10 }}
                    />
                  </FlameCard>
                </FlameContainer>
              </FlameWrapper>
              <HeaderText>
                <span
                  className="char"
                  style={{ color: "darkorange", fontWeight: 800 }}
                >
                  char
                </span>
                <span className="db" style={{ color: "white" }}>
                  db
                </span>
              </HeaderText>
            </TitleWrapper>
            <IconWrapper>
              <IconButton onClick={() => onClose()} style={{ color: "white" }}>
                <CloseIcon fontSize="large" style={{ width: 50, height: 50 }} />
              </IconButton>
            </IconWrapper>
          </HeaderWrapper>
          <Body>
            <StyledList>
              {["Collections", "Info", "Pokedex", "Home"].map(
                (label, index) => (
                  <div style={{ maxWidth: "100%", width: "100%", padding: 20 }}>
                    <StyledButton
                      key={index}
                      variant="contained"
                      onClick={() => onClick(label)}
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "transparent",
                        padding: "20px",
                        border: "1px solid white",
                        borderRadius: "15px",
                        fontSize: 18,
                      }}
                    >
                      {label}
                    </StyledButton>
                  </div>
                )
              )}
            </StyledList>
          </Body>
        </Container>
      </Drawer>
    </>
  )
}

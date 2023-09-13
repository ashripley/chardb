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

// const StyledButton = styled(Button)`
//   font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
//     Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
//     source-sans-pro, sans-serif;
//   width: 60%;
//   height: 20%;
//   padding: 15px;
//   background-color: transparent;
//   padding: 20px;
//   border: 1px solid white;
//   border-radius: 15px;
//   font-size: 18;
//   transition: all 1s ease;

//   &:hover {
//     background-colour: darkorange !important;
//   },
// `

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
                  {/* <FlameCard> */}
                  <IconButton
                    sx={{
                      background: "white",
                      borderRadius: "35px",
                      padding: "10px",
                      transition: "all 1s !important",
                      ":hover": {
                        background: "white",
                        boxShadow: `0px 0px 20px 0px #ff8c00 , 0px 0px 20px 0px #ffffff`,
                      },
                    }}
                  >
                    <img
                      src={flame}
                      alt="menu"
                      style={{ width: 50, height: 50, padding: 10 }}
                    />
                  </IconButton>
                  {/* </FlameCard> */}
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
              <IconButton
                onClick={() => onClose()}
                style={{ color: "white" }}
                sx={{
                  transition: "all 1s !important",
                  ":hover": {
                    boxShadow: `0px 0px 10px 0px #ff8c00 , 0px 0px 10px 0px #ffffff`,
                  },
                }}
              >
                <CloseIcon fontSize="large" style={{ width: 50, height: 50 }} />
              </IconButton>
            </IconWrapper>
          </HeaderWrapper>
          <Body>
            <StyledList>
              {["Collections", "Info", "Pokedex", "Home"].map(
                (label, index) => (
                  <div style={{ maxWidth: "100%", width: "100%", padding: 20 }}>
                    <Button
                      key={index}
                      variant="contained"
                      onClick={() => onClick(label)}
                      sx={{
                        width: "100%",
                        height: "100%",
                        background: "transparent",
                        padding: "30px",
                        border: "1px solid white",
                        borderRadius: "35px",
                        fontSize: "18px",
                        transition: "all 1s ease",
                        fontFamily:
                          "ui-rounded, 'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, Manjari, 'Arial Rounded MT', 'Arial Rounded MT Bold', Calibri, source-sans-pro, sans-serif",
                        ":hover": {
                          background: "darkorange !important",
                        },
                      }}
                    >
                      {label}
                    </Button>
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

import { useState } from "react"
import styled from "styled-components"
import flame from "../../assets/flame.png"
import { AppBar, Box, Card, IconButton, Toolbar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

interface Props {
  isOpen: (isClicked: boolean) => void
  menuAction: string
}

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  height: 10% !important;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background: transparent;
  max-width: 100%;
  width: 100%;
`

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 0px;
  justify-content: space-around;
`

const IconWrapper = styled(Card)`
  border-radius: 15px !important;
  padding: 5px;
`

const MenuWrapper = styled.div`
  display: flex;
  max-width: 100%;
  width: 5%;
  justify-content: center;
  align-items: inherit;
`

const HeaderText = styled.div`
  display: flex;
  font-size: 1.5rem;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  display: flex;
  margin: 0;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
`

export const HomeHeader = ({ isOpen, menuAction }: Props) => {
  const [clicked, setClicked] = useState(false)

  const onClick = (isClicked: boolean) => {
    setClicked(isClicked)
    isOpen(clicked)
  }

  return (
    <>
      <div style={{ height: "15%" }}>
        <Box sx={{ height: "100%" }}>
          <AppBar
            position="static"
            variant="outlined"
            style={{
              background: `${
                menuAction === "Home" ? "transparent" : "#0f1a1b"
              }`,
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Toolbar style={{ padding: 0 }}>
              <Container>
                <StyledHeader
                  style={{ display: "flex", width: "100%", padding: 0 }}
                >
                  <MenuWrapper>
                    <IconWrapper>
                      <img
                        src={flame}
                        alt="menu"
                        style={{ width: 30, height: 30, padding: 5 }}
                      />
                    </IconWrapper>
                  </MenuWrapper>
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
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    style={{ width: 50, margin: 0 }}
                    onClick={() => {
                      console.log("onclick trigger")
                      onClick(!clicked)
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </StyledHeader>
              </Container>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    </>
  )
}

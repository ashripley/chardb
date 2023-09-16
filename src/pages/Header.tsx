import { useState } from "react"
import styled from "styled-components"
import flame from "../assets/icons/flame.png"
import { AppBar, Box, Card, IconButton, Toolbar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

interface Props {
  isOpen: (isClicked: boolean) => void
  menuAction: string
}

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 10% !important;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
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

export const Header = ({ isOpen, menuAction }: Props) => {
  const [isClicked, setIsClicked] = useState(false)

  const onClick = (clicked: boolean) => {
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
              background: "transparent",
              justifyContent: "center",
              height: "100%",
              borderBottom: "none",
            }}
          >
            <Toolbar style={{ padding: 0 }}>
              <Container>
                <StyledHeader
                  style={{ display: "flex", width: "100%", padding: 0 }}
                >
                  <MenuWrapper>
                    <IconWrapper
                      sx={{
                        backgroundColor: "#eeefeb",
                        transition: "all 0.5s !important",
                        ":hover": {
                          background: "#eeefeb",
                          boxShadow: `0px 0px 10px 0px #ff8c00 , 0px 0px 10px 0px #ffffff`,
                        },
                      }}
                    >
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
                    <span className="db" style={{ color: "dimGray" }}>
                      db
                    </span>
                  </HeaderText>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{
                      mr: 2,
                      transition: "all 0.5s !important",
                      ":hover": {
                        background: "#eeefeb",
                        boxShadow: `0px 0px 10px 0px #ff8c00 , 0px 0px 10px 0px #ffffff`,
                      },
                    }}
                    style={{ width: 50, height: 50, margin: 0 }}
                    onClick={() => onClick(!isClicked)}
                  >
                    <MenuIcon
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(36%) sepia(8%) saturate(8%) hue-rotate(332deg) brightness(90%) contrast(88%)",
                      }}
                    />
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

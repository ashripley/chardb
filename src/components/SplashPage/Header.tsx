import React from "react"
import styled from "styled-components"
import flame from "../../assets/flame.png"
import { AppBar, Box, Card, IconButton, Toolbar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  height: 10%;
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
  font-family: Avenir, Montserrat, Corbel, "URW Gothic", source-sans-pro,
    sans-serif;
`

export const Header = () => {
  return (
    <>
      <div style={{ height: "20%" }}>
        <Box>
          <AppBar
            position="static"
            variant="outlined"
            style={{ background: "transparent" }}
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

import MenuIcon from "@mui/icons-material/Menu"
import { AppBar, Box, Card, IconButton, Toolbar } from "@mui/material"
import { memo, useState } from "react"
import styled from "styled-components"
import { theme } from "../theme"
import flame from "../assets/icons/flame.png"
import { setMenuStatus, setPage } from "../redux/root"
import { useDispatch } from "react-redux"

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 15% !important;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`

const StyledAppBar = styled(AppBar)`
  background: transparent !important;
  justify-content: center;
  height: 100%;
  border-bottom: none !important;
`

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 0px;
  justify-content: space-between;
`

const LeftWrapper = styled.div`
  display: flex;
  width: 10%;
  justify-content: space-between;
`

const RightWrapper = styled.div`
  display: flex;
  width: 10%;
  justify-content: flex-end;
`

const IconWrapper = styled(Card)`
  border-top-left-radius: 45% 50% !important;
  border-top-right-radius: 95% 60% !important;
  border-bottom-left-radius: 45% 70% !important;
  border-bottom-right-radius: 95% 60% !important;
  padding: 5px;
`

const MenuWrapper = styled.div`
  display: flex;
  max-width: 100%;
  width: 30%;
  min-width: 100px;
  justify-content: center;
  align-items: inherit;
`

const HeaderText = styled.div`
  display: flex;
  font-size: 1.5rem;
  justify-content: flex-start;
  align-items: center;
  width: 60%;
  display: flex;
  margin: 0;
  font-family: ${theme.fontFamily};
`

export const Header = memo(() => {
  const dispatch = useDispatch()

  return (
    <>
      <div style={{ height: "15%" }}>
        <Box sx={{ height: "100%" }}>
          <StyledAppBar position="static" variant="outlined">
            <Toolbar style={{ padding: 0 }}>
              <Container>
                <StyledHeader>
                  <LeftWrapper>
                    <MenuWrapper>
                      <IconWrapper
                        sx={{
                          backgroundColor: theme.lightBg,
                          transition: "all 0.5s !important",
                          ":hover": {
                            background: theme.lightBg,
                            boxShadow: `0px 0px 10px 0px ${theme.charAccent} , 0px 0px 10px 0px #ffffff`,
                          },
                        }}
                      >
                        <img
                          src={flame}
                          alt="menu"
                          style={{ width: 30, height: 30, padding: 5 }}
                          onClick={() => dispatch(setPage("Home"))}
                        />
                      </IconWrapper>
                    </MenuWrapper>
                    <HeaderText>
                      <span
                        className="char"
                        style={{ color: theme.charAccent, fontWeight: 800 }}
                      >
                        char
                      </span>
                      <span className="db" style={{ color: theme.primaryText }}>
                        db
                      </span>
                    </HeaderText>
                  </LeftWrapper>
                  <RightWrapper>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{
                        mr: 2,
                        transition: "all 0.5s !important",
                        ":hover": {
                          background: theme.lightBg,
                          boxShadow: `0px 0px 10px 0px ${theme.charAccent} , 0px 0px 10px 0px #ffffff`,
                        },
                      }}
                      style={{ width: 50, height: 50, margin: 0 }}
                      onClick={() => dispatch(setMenuStatus(true))}
                    >
                      <MenuIcon
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(36%) sepia(8%) saturate(8%) hue-rotate(332deg) brightness(90%) contrast(88%)",
                        }}
                      />
                    </IconButton>
                  </RightWrapper>
                </StyledHeader>
              </Container>
            </Toolbar>
          </StyledAppBar>
        </Box>
      </div>
    </>
  )
})

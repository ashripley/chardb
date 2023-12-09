import CloseIcon from "@mui/icons-material/Close"
import { Button, IconButton } from "@mui/material"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { theme } from "../../theme"
import flame from "../../assets/icons/flame.png"

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
  background-color: ${theme.darkBg};
  z-index: 1;
`

const HeaderWrapper = styled.div`
  display: flex;
  height: 25%;
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  justify-content: space-around;
  background-color: ${theme.darkBg};
`

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 100%;
    height: 100%;
    color: white;
  }
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
  min-width: 150px;
`

const FlameContainer = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: center;
  align-items: inherit;
  width: 80px;
  height: 80px;
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
  font-family: ${theme.fontFamily};
`

const Body = styled.div`
  display: flex;
  height: 75%;
  width: 100%;
  justify-content: center;
  justify-items: center;
  align-items: center;
  justify-content: center;
  background-color: ${theme.lightBg};

  border-top-left-radius: 45% 50%;
  border-top-right-radius: 95% 60%;
  border-bottom-left-radius: 45% 70%;
  border-bottom-right-radius: 95% 60%;
  bottom: 0;
  z-index: -1;
  transition: all 2s ease;
`

const StyledList = styled(List)`
  max-height: 60%;
  height: 60%;
  width: 60%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const buttonStyles = {
  width: "100%",
  height: "100%",
  backgroundColor: theme.darkBg,
  color: theme.primaryText,
  padding: "30px",
  borderRadius: "35px",
  fontSize: "18px",
  boxShadow:
    "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
  transition: "all 1s ease",
  fontFamily: theme.fontFamily,
  ":hover": {
    backgroundColor: `${theme.charAccent} !important`,
    opacity: "0.8",
    boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px",
    color: `${theme.darkBg} !important`,
  },
}

const iconButtonStyles = {
  background: theme.lightBg,
  borderTopLeftRadius: "45% 50%",
  borderTopRightRadius: "95% 60%",
  borderBottomLeftRadius: "45% 70%",
  borderBottomRightRadius: "95% 60%",
  boxShadow:
    "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  padding: "10px",
  transition: "all 1s !important",
  ":hover": {
    background: "#fff",
    boxShadow: `0px 0px 20px 0px ${theme.charAccent} , 0px 0px 20px 0px #ffffff`,
  },
}

export const Menu = ({ isOpen, isClosed, drawerToggle, menuOption }: Props) => {
  const [state, setState] = useState(false)

  const onClose = useCallback(() => {
    setState(false)
    drawerToggle(false, true)
  }, [drawerToggle])

  const onClick = useCallback(
    (label: string) => {
      menuOption(label)
      onClose()
    },
    [menuOption, onClose]
  )

  useEffect(() => {
    setState(isOpen)
  }, [isOpen])

  return (
    <>
      <StyledDrawer
        anchor={"bottom"}
        open={state}
        onClose={onClose}
        variant="temporary"
      >
        <Container>
          <HeaderWrapper>
            <TitleWrapper>
              <FlameWrapper>
                <FlameContainer>
                  <IconButton sx={iconButtonStyles}>
                    <img
                      src={flame}
                      alt="menu"
                      style={{ width: 50, height: 50, padding: 10 }}
                    />
                  </IconButton>
                </FlameContainer>
              </FlameWrapper>
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
            </TitleWrapper>
            <IconWrapper>
              <IconButton
                onClick={() => onClose()}
                style={{ color: theme.primaryText }}
                sx={{
                  transition: "all 1s !important",
                  ":hover": {
                    background: theme.lightBg,
                    boxShadow: `0px 0px 10px 0px ${theme.charAccent} , 0px 0px 10px 0px #ffffff`,
                  },
                }}
              >
                <CloseIcon fontSize="large" style={{ width: 50, height: 50 }} />
              </IconButton>
            </IconWrapper>
          </HeaderWrapper>
          <Body>
            <StyledList>
              {["Cards", "Pokedex", "Info", "Home"].map((label, index) => (
                <div
                  key={index}
                  style={{ maxWidth: "100%", width: "100%", padding: 20 }}
                >
                  <Button
                    key={index}
                    variant="contained"
                    onClick={() => onClick(label)}
                    sx={buttonStyles}
                  >
                    {label}
                  </Button>
                </div>
              ))}
            </StyledList>
          </Body>
        </Container>
      </StyledDrawer>
    </>
  )
}

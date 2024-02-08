import CloseIcon from "@mui/icons-material/Close"
import { Button, IconButton, Toolbar } from "@mui/material"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import styled from "styled-components"
import { theme } from "../theme"
import { useDispatch, useSelector } from "react-redux"
import { setDbType, setMenuStatus, setPage } from "../redux/root"
import { RootState } from "../redux/store"
import { DbType, isMobile } from "../helpers/view"

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: space-between;
  flex-direction: column;
  background-color: ${theme.darkBg};
  z-index: 1;
`

const HeaderContainer = styled.div`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 15% !important;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 50px;
  height: auto;
`

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0px;
  justify-content: space-between;
`

const StyledDrawer = styled(Drawer)<{ isMobile: boolean }>`
  .MuiDrawer-paper {
    width: ${({ isMobile }) => (isMobile ? "100%" : "40%")};
    height: 100%;
    color: white;
    padding-top: env(safe-area-inset-top);
    padding-right: env(safe-area-inset-right);
    padding-bottom: env(safe-area-inset-bottom);

    ${({ isMobile }) =>
      !isMobile &&
      `
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    `}
  }
`

const Body = styled.div`
  height: auto;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  background-color: ${theme.lightBg};
  justify-content: space-evenly;

  border-top-left-radius: 45% 50%;
  border-top-right-radius: 95% 60%;
  border-bottom-left-radius: 45% 70%;
  border-bottom-right-radius: 95% 60%;
  bottom: 0;
  z-index: -1;
  transition: all 2s ease;
`

const StyledList = styled(List)`
  gap: 30px;
  width: 100%;
  justify-content: center;

  max-height: 60%;
  height: auto;
  display: flex;
  flex-direction: column;
`

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 0px;
  justify-content: flex-end;
`

const Anchor = styled.a<{ dbType: DbType }>`
  color: ${theme.primaryText};
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.15em;

  display: inline-block;
  padding: 15px 20px;
  position: relative;
  transition: all ease 0.5s;

  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: ${({ dbType }) => theme[`${dbType}Accent`]};
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }

  &:hover:after {
    width: 100%;
    left: 0;
  }

  &:hover {
    color: ${({ dbType }) => theme[`${dbType}Accent`]} !important;
  }
`

const Starters = styled.div<{ dbType: DbType }>`
  text-decoration: none;
  letter-spacing: 0.15em;
  display: inline-block;
  transition: all ease 0.5s;

  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: ${({ dbType }) => theme[`${dbType}Accent`]};
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }

  &:hover:after {
    width: 100%;
    left: 0;
  }

  &:hover {
    color: ${({ dbType }) => theme[`${dbType}Accent`]} !important;
  }
`

const HeaderText = styled.div`
  display: flex;
  font-size: calc(20px + 1vw);
  justify-content: center;
  align-items: center;
  width: auto;
  display: flex;
  margin: 0;
  gap: 20px;
  font-family: ${theme.fontFamily};
`

const StyledButton = styled(Button)`
  text-transform: lowercase !important;
  font-size: calc(16px + 0.5vw) !important;

  &:hover {
    background-color: transparent !important;
  }
`

const buttonStyles = {
  width: "20vw",
  height: "auto",
  minWidth: 200,
  color: theme.primaryText,
  padding: "20px",
  fontSize: "calc(12px + 0.5vw)",
  transition: "all 1s ease",
  fontFamily: theme.fontFamily,

  ":hover": {
    backgroundColor: theme.lightBg,
  },
}

const DbButton: React.FC<{ label: DbType; accent: string }> = ({
  label,
  accent,
}) => {
  const dispatch = useDispatch()
  return (
    <StyledButton
      onClick={() => {
        dispatch(setDbType(label))
        dispatch(setMenuStatus(false))
      }}
    >
      <Starters dbType={label}>
        <span
          className={label}
          style={{
            color: theme[accent],
            fontWeight: 800,
          }}
        >
          {label}
        </span>
        <span
          className="db"
          style={{
            color: theme.primaryText,
          }}
        >
          db
        </span>
      </Starters>
    </StyledButton>
  )
}

export const Menu = () => {
  const { isMenuOpen, dbType } = useSelector((state: RootState) => state.root)
  const dispatch = useDispatch()

  const onClose = () => {
    dispatch(setMenuStatus(false))
  }

  const onClick = (label: string) => {
    dispatch(setPage(label))
    dispatch(setMenuStatus(false))
  }

  return (
    <>
      <StyledDrawer
        isMobile={isMobile}
        anchor={"right"}
        open={isMenuOpen}
        onClose={onClose}
        variant="temporary"
      >
        <Container>
          <Toolbar style={{ padding: 0, minHeight: "10vh", height: "auto" }}>
            <HeaderContainer>
              <HeaderWrapper>
                <StyledHeader>
                  <IconButton
                    color="inherit"
                    sx={{
                      mr: 2,
                      transition: "all 0.5s !important",
                      ":hover": {
                        background: theme.lightBg,
                        boxShadow: `0px 0px 10px 0px ${
                          theme[`${dbType}Accent`]
                        } , 0px 0px 10px 0px #ffffff`,
                      },
                    }}
                    style={{ width: 50, height: 50, margin: 0 }}
                    onClick={() => onClose()}
                  >
                    <CloseIcon
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(36%) sepia(8%) saturate(8%) hue-rotate(332deg) brightness(90%) contrast(88%)",
                        width: "2rem",
                        height: "2rem",
                      }}
                    />
                  </IconButton>
                </StyledHeader>
              </HeaderWrapper>
            </HeaderContainer>
          </Toolbar>
          <Body>
            <StyledList>
              {["Cards", "Pokedex", "Info", "Home"].map((label, index) => (
                <Wrapper key={index}>
                  <Button
                    key={index}
                    variant="text"
                    onClick={() => onClick(label)}
                    sx={buttonStyles}
                  >
                    <Anchor dbType={dbType}>{label}</Anchor>
                  </Button>
                </Wrapper>
              ))}
            </StyledList>
            <HeaderText>
              <DbButton label="bulb" accent="bulbAccent" />
              <DbButton label="squir" accent="squirAccent" />
              <DbButton label="char" accent="charAccent" />
            </HeaderText>
          </Body>
        </Container>
      </StyledDrawer>
    </>
  )
}

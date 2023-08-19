import * as React from "react"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import styled from "styled-components"
import { Card, CircularProgress, IconButton } from "@mui/material"
import flame from "../../assets/flame.png"
import CloseIcon from "@mui/icons-material/Close"

interface Props {
  isOpen: boolean
  isClosed: boolean
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
  height: 30%;
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  justify-content: space-around;
`

const TitleWrapper = styled.div`
  max-width: 40%;
  display: flex;
  height: 100%;
  width: 40%;
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
`

export const MenuPanel = ({ isOpen, isClosed, drawerToggle }: Props) => {
  const [state, setState] = React.useState(false)

  const onClose = () => {
    setState(false)
    drawerToggle(false, true)
  }

  React.useEffect(() => {
    setState(isOpen)
  }, [isOpen])

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
            background: "#050a09",
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
            <List>
              {["Search", "Info", "Pokedex", "Home"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Body>
        </Container>
      </Drawer>
    </>
  )
}

// background colours:
// #050a09

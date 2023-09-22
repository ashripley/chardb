import styled from "styled-components"
import greyWallpaper from "../../assets/icons/greyWallpaper.jpg"
import { HomeBody } from "./Body"
import { Header } from "../Header"

interface Props {
  menuAction: string
  passMenuActionLabel: (label: string) => void
  isOpen: (isClicked: boolean) => void
}

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 100vh;
  width: 100vw;
  background: url(${greyWallpaper});
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
`
export const Home = ({ isOpen, menuAction, passMenuActionLabel }: Props) => {
  const onClick = (clicked: boolean) => {
    isOpen(clicked)
  }

  const MenuAction = (label?: string) => {
    passMenuActionLabel(label || "")
  }

  return (
    <Container>
      <Header menuAction={menuAction} isOpen={onClick} />
      <HomeBody menuOption={MenuAction} />
    </Container>
  )
}

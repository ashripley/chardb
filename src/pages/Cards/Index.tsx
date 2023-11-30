import styled from "styled-components"
import { Main } from "./Main"
import { Header } from "../Header"
import greyWallpaper from "../../assets/icons/greyWallpaper.jpg"

interface Props {
  menuAction: string
  passMenuActionLabel: (label: string) => void
  isOpen: (isClicked: boolean) => void
}

const Container = styled.div`
  background: url(${greyWallpaper});
  background-size: cover;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
`

export const Cards = ({ menuAction, isOpen }: Props) => {
  const onClick = (clicked: boolean) => {
    isOpen(clicked)
  }

  return (
    <Container>
      <Header menuAction={menuAction} isOpen={onClick} />
      <Main />
    </Container>
  )
}
import styled from "styled-components"
import greyWallpaper from "../../assets/icons/greyWallpaper.jpg"
import { Main } from "./Main"
import { Header } from "../Header"
import { useCallback } from "react"

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
  const onClick = useCallback(
    (clicked: boolean) => {
      isOpen(clicked)
    },
    [isOpen]
  )

  const MenuAction = (label?: string) => {
    passMenuActionLabel(label || "")
  }

  return (
    <Container>
      <Header menuAction={menuAction} isOpen={onClick} />
      <Main menuOption={MenuAction} />
    </Container>
  )
}

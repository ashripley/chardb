import { useCallback } from "react"
import styled from "styled-components"
import greyWallpaper from "../../assets/icons/greyWallpaper.jpg"
import { Header } from "../Header"
import { Main } from "./Main"

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
  const onClick = useCallback(
    (clicked: boolean) => {
      isOpen(clicked)
    },
    [isOpen]
  )

  return (
    <Container>
      <Header menuAction={menuAction} isOpen={onClick} />
      <Main />
    </Container>
  )
}

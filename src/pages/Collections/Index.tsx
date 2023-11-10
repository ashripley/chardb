import styled from "styled-components"
import { CollectionsBody } from "./Body"
import { Header } from "../Header"
import greyWallpaper from "../../assets/icons/greyWallpaper.jpg"
import { Particle } from "../../components/Particle"

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

export const Collections = ({ menuAction, isOpen }: Props) => {
  const onClick = (clicked: boolean) => {
    isOpen(clicked)
  }

  return (
    <Container>
      {/* <Particle /> */}
      <Header menuAction={menuAction} isOpen={onClick} />
      <CollectionsBody />
    </Container>
  )
}

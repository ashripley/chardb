import styled from "styled-components"
import { Header } from "../Header"
import { PokedexBody } from "./Body"
import greyWallpaper from "../../assets/icons/greyWallpaper.jpg"
import { PokedexParticle } from "../../components/PokedexParticle"

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
export const Pokedex = ({ menuAction, isOpen }: Props) => {
  const onClick = (clicked: boolean) => {
    isOpen(clicked)
  }

  return (
    <Container>
      {/* <PokedexParticle /> */}
      <Header menuAction={menuAction} isOpen={onClick} />
      <PokedexBody />
    </Container>
  )
}

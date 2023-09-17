import styled from "styled-components"
import { Header } from "../Header"
import { PokedexBody } from "./Body"
import { PokedexParticle } from "../../components/PokedexParticle"

interface Props {
  menuAction: string
  passMenuActionLabel: (label: string) => void
  isOpen: (isClicked: boolean) => void
}

const Container = styled.div`
  background: white;
  background-size: cover;
`
export const Pokedex = ({ menuAction, isOpen }: Props) => {
  const onClick = (clicked: boolean) => {
    isOpen(clicked)
  }

  return (
    <Container>
      <PokedexParticle />
      <Header menuAction={menuAction} isOpen={onClick} />
      <PokedexBody />
    </Container>
  )
}

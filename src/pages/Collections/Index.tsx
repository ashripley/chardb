import styled from "styled-components"
import { CollectionsBody } from "./Body"
import { Header } from "../Header"

interface Props {
  menuAction: string
  passMenuActionLabel: (label: string) => void
  isOpen: (isClicked: boolean) => void
}

const Container = styled.div`
  background: white;
  background-size: cover;
`
export const Collections = ({ menuAction, isOpen }: Props) => {
  const onClick = (clicked: boolean) => {
    isOpen(clicked)
  }

  return (
    <Container>
      <Header menuAction={menuAction} isOpen={onClick} />
      <CollectionsBody />
    </Container>
  )
}
import styled from "styled-components"
import { Header } from "../Header"
import { InfoBody } from "./Body"

interface Props {
  menuAction: string
  passMenuActionLabel: (label: string) => void
  isOpen: (isClicked: boolean) => void
}

const Container = styled.div`
  background: white;
  background-size: cover;
`
export const Info = ({ menuAction, isOpen }: Props) => {
  const onClick = (clicked: boolean) => {
    isOpen(clicked)
  }

  return (
    <Container>
      <Header menuAction={menuAction} isOpen={onClick} />
      <InfoBody />
    </Container>
  )
}

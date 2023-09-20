import styled from "styled-components"
import { Header } from "../Header"
import { InfoBody } from "./Body"
import { Theme } from "../../Theme"
import blob from "../../assets/icons/blob.svg"

interface Props {
  menuAction: string
  passMenuActionLabel: (label: string) => void
  isOpen: (isClicked: boolean) => void
}

const Container = styled.div`
  background-color: ${Theme.darkBg} !important;
  background: url(${blob});
  background-size: auto;
  min-height: 100vh;
  height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
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

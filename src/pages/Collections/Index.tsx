import styled from "styled-components"
import collections from "../../assets/icons/collections.jpg"
import { CollectionsBody } from "./Body"
import { useState } from "react"
import { Header } from "../Header"

interface Props {
  menuAction: string
  passMenuActionLabel: (label: string) => void
  isOpen: (isClicked: boolean) => void
}

const Container = styled.div`
  background: url(${collections});
  background-size: 100vw 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
`
export const Collections = ({
  menuAction,
  passMenuActionLabel,
  isOpen,
}: Props) => {
  const [menuActionLabel, setMenuActionLabel] = useState("Home")

  const onClick = (clicked: boolean) => {
    isOpen(clicked)
  }

  const MenuAction = (label?: string) => {
    setMenuActionLabel(label || "")
    passMenuActionLabel(menuActionLabel)
  }

  return (
    <Container>
      <Header menuAction={menuAction} isOpen={onClick} />
      <CollectionsBody />
    </Container>
  )
}

import styled from "styled-components"
import wallpaper from "../../assets/icons/wallpaper.jpg"
import { HomeBody } from "./Body"
import { useState } from "react"
import { Header } from "../Header"

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
  background: url(${wallpaper});
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
`
export const Home = ({ isOpen, menuAction, passMenuActionLabel }: Props) => {
  const onClick = (clicked: boolean) => {
    isOpen(clicked)
  }

  const MenuAction = (label?: string) => {
    console.log("label", label)
    passMenuActionLabel(label || "")
  }

  return (
    <Container>
      <Header menuAction={menuAction} isOpen={onClick} />
      <HomeBody menuOption={MenuAction} />
    </Container>
  )
}

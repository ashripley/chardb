import styled from "styled-components"
import { Header } from "./SplashPage/Header"
import wallpaper from "../assets/wallpaper.jpg"
import { Body } from "./SplashPage/Body"
import { MenuPanel } from "./SplashPage/MenuPanel"
import { useEffect, useState } from "react"

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 100vh;
  width: 100vw;
  background: url(${wallpaper});
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
`
export const Index = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  const drawerToggle = (isOpen: boolean, isClosed: boolean) => {
    setIsOpen(isOpen)
    setIsClosed(isClosed)
  }

  const MenuButtonClicked = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Container>
        <Header isOpen={MenuButtonClicked} />
        <Body />
        <MenuPanel
          isClosed={isClosed}
          isOpen={isOpen}
          drawerToggle={drawerToggle}
        />
      </Container>
    </>
  )
}

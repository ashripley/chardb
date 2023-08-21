import React, { useState } from "react"
import styled from "styled-components"
import { Body } from "./Body"
import { Header } from "../SplashPage/Header"
import { MenuPanel } from "../SplashPage/MenuPanel"

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: calc(100% - 90px);
  width: 100%;
  background: #101a1b;
`

export const Desktop = () => {
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

import styled from "styled-components"
import { HomeHeader } from "./Home/Header"
import wallpaper from "../assets/icons/wallpaper.jpg"
import { HomeBody } from "./Home/Body"
import { Menu } from "./Menu/Main"
import { useState } from "react"
import { CollectionsBody } from "./Collections/Body"

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
  const [menuAction, setMenuAction] = useState("Home")

  const drawerToggle = (isOpen: boolean, isClosed: boolean) => {
    setIsOpen(isOpen)
    setIsClosed(isClosed)
  }

  const MenuButtonClicked = () => {
    setIsOpen(!isOpen)
  }

  const MenuAction = (label?: string) => {
    setMenuAction(label || "")
  }

  return (
    <>
      <Container>
        <HomeHeader menuAction={menuAction} isOpen={MenuButtonClicked} />
        {menuAction === "Collections" ? (
          <CollectionsBody />
        ) : menuAction === "Home" ? (
          <HomeBody menuOption={MenuAction} />
        ) : (
          <HomeBody menuOption={MenuAction} />
        )}
        <Menu
          menuOption={MenuAction}
          isClosed={isClosed}
          isOpen={isOpen}
          drawerToggle={drawerToggle}
        />
      </Container>
    </>
  )
}

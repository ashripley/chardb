import styled from "styled-components"
import { HomeHeader } from "./Home/HomeHeader"
import wallpaper from "../assets/wallpaper.jpg"
import { HomeBody } from "./Home/HomeBody"
import { Menu } from "./Menu/Menu"
import { useState } from "react"
import { BrowseBody } from "./Browse/BrowseBody"

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
    console.log("menuAction", menuAction)
    console.log("### menu action")
  }

  return (
    <>
      <Container>
        <HomeHeader menuAction={menuAction} isOpen={MenuButtonClicked} />
        {menuAction === "Browse" ? (
          <BrowseBody />
        ) : menuAction === "Home" ? (
          <HomeBody />
        ) : (
          <HomeBody />
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

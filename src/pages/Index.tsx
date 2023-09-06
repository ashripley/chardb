import styled from "styled-components"
import { useState } from "react"
import { Home } from "./Home/Index"
import { Collections } from "./Collections/Index"
import { Menu } from "./Menu/Menu"

export const Index = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [page, setPage] = useState("Home")

  // "Collections", "Info", "Pokedex", "Home"

  const drawerToggle = (isOpen: boolean, isClosed: boolean) => {
    setIsOpen(isOpen)
    setIsClosed(isClosed)
  }

  const onClick = (clicked: boolean) => {
    setIsOpen(clicked)
    !!isOpen && setPage("Menu")
  }

  const MenuAction = (label?: string) => {
    setPage(label || "")
  }

  return (
    <>
      {page === "Home" ? (
        <Home
          menuAction={page}
          passMenuActionLabel={MenuAction}
          isOpen={onClick}
        />
      ) : (
        <Collections
          menuAction={page}
          passMenuActionLabel={MenuAction}
          isOpen={onClick}
        />
      )}
      <Menu
        menuOption={MenuAction}
        isClosed={isClosed}
        isOpen={isOpen}
        drawerToggle={drawerToggle}
      />
    </>
  )
}

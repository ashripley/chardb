import { useState } from "react"
import { Home } from "./Home/Index"
import { Collections } from "./Collections/Index"
import { Menu } from "./Menu/Menu"
import { Pokedex } from "./Pokedex/Index"
import { Info } from "./Info/Index"

export const Index = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [page, setPage] = useState("Home")

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
      ) : page === "Collections" ? (
        <Collections
          menuAction={page}
          passMenuActionLabel={MenuAction}
          isOpen={onClick}
        />
      ) : page === "Pokedex" ? (
        <Pokedex
          menuAction={page}
          passMenuActionLabel={MenuAction}
          isOpen={onClick}
        />
      ) : page === "Info" ? (
        <></>
      ) : (
        // <Info
        //   menuAction={page}
        //   passMenuActionLabel={MenuAction}
        //   isOpen={onClick}
        // />
        <></>
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

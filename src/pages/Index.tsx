import { useState } from "react"
import { Home } from "./Home/Index"
import { Cards } from "./Cards/Index"
import { Menu } from "./Menu/Menu"
import { Pokedex } from "./Pokedex/Index"
import { Info } from "./Info/Index"

const components: Record<string, any> = {
  Home,
  Cards,
  Pokedex,
  Info,
}

export const Index = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [page, setPage] = useState("Home")

  const drawerToggle = (isOpen: boolean, isClosed: boolean) => {
    setIsOpen((prevIsOpen) => isOpen ?? prevIsOpen)
    setIsClosed((prevIsClosed) => isClosed ?? prevIsClosed)
  }

  const onClick = (clicked: boolean) => {
    setIsOpen(clicked)
    !!isOpen && setPage("Menu")
  }

  const MenuAction = (label?: string) => {
    setPage(label || "")
  }

  const Component = components[page] || (() => <></>)

  return (
    <>
      <Component
        menuAction={page}
        passMenuActionLabel={MenuAction}
        isOpen={onClick}
      />
      <Menu
        menuOption={MenuAction}
        isClosed={isClosed}
        isOpen={isOpen}
        drawerToggle={drawerToggle}
      />
    </>
  )
}

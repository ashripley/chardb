import { useState } from "react"
import { Home } from "./Home/Index"
import { Cards } from "./Cards/Index"
import { Menu } from "./Menu/Menu"
import { Pokedex } from "./Pokedex/Index"
import { Info } from "./Info/Index"
import { useSelector } from "react-redux"

const components: Record<string, any> = {
  Home,
  Cards,
  Pokedex,
  Info,
}

export const Index = () => {
  const { page } = useSelector((state: any) => state.root)

  const Component = components[page] || (() => <></>)

  return (
    <>
      <Component />
      <Menu />
    </>
  )
}

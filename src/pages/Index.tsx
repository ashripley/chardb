import { Home } from "./Home/Index"
import { Cards } from "./Cards/Index"
import { Menu } from "./Menu/Menu"
import { Pokedex } from "./Pokedex/Index"
import { Info } from "./Info/Index"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const components: Record<string, any> = {
  Home,
  Cards,
  Pokedex,
  Info,
}

export const Index = () => {
  const { page } = useSelector((state: RootState) => state.root)

  const Component = components[page] || (() => <></>)

  return (
    <>
      <Component />
      <Menu />
    </>
  )
}

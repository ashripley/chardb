import { Menu } from "./Menu"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { Header } from "./Header"
import styled from "styled-components"
import greyWallpaper from "../assets/icons/greyWallpaper.jpg"
import settingsBackground from "../assets/icons/settingsBackground.svg"
import blob from "../assets/icons/blob.svg"
import { Settings } from "./Settings"
import { PokemonCards as Cards } from "./Cards"
import { theme } from "../theme"
import { Info } from "./Info"
import { Pokedex } from "./Pokedex"
import { Home } from "./Home"

const Container = styled.div<{ page: string }>`
  background: url(${({ page }) =>
    page === "Info"
      ? blob
      : page === "Settings"
      ? settingsBackground
      : greyWallpaper});
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-color: ${({ page }) =>
    page === "Info" && `${theme.darkBg} !important`};
`

const components: Record<string, any> = {
  Home,
  Settings,
  Cards,
  Pokedex,
  Info,
}

export const Index = () => {
  const { page } = useSelector((state: RootState) => state.root)

  const Component = components[page] || (() => <></>)

  return (
    <Container page={page}>
      <Header />
      <Component />
      <Menu />
    </Container>
  )
}

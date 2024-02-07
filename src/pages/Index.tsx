import { Menu } from "./Menu"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { Header } from "./Header"
import styled from "styled-components"
import greyWallpaper from "../assets/icons/greyWallpaper.jpg"
import blob from "../assets/icons/blob.svg"
import { Home } from "./Home"
import { PokemonCards as Cards } from "./Cards"
import { theme } from "../theme"
import { Info } from "./Info"
import { Pokedex } from "./Pokedex"

const Container = styled.div<{ isInfoPage: boolean }>`
  background: url(${({ isInfoPage }) => (isInfoPage ? blob : greyWallpaper)});
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-color: ${({ isInfoPage }) =>
    isInfoPage && `${theme.darkBg} !important`};
`

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
    <Container isInfoPage={page === "Info"}>
      <Header />
      <Component />
      <Menu />
    </Container>
  )
}

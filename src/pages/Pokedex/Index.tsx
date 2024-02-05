import styled from "styled-components"
import { Header } from "../Header"
import { Main } from "./Main"
import greyWallpaper from "../../assets/icons/greyWallpaper.jpg"

const Container = styled.div`
  background: url(${greyWallpaper});
  background-size: cover;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
`
export const Pokedex = () => {
  return (
    <Container>
      <Header />
      <Main />
    </Container>
  )
}

import styled from "styled-components"
import greyWallpaper from "../../assets/icons/greyWallpaper.jpg"
import { Header } from "../Header"
import { Main } from "./Main"

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 100vh;
  width: 100vw;
  background: url(${greyWallpaper});
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
`
export const Home = () => {
  return (
    <Container>
      <Header />
      <Main />
    </Container>
  )
}

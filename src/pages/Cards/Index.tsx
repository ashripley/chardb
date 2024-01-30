import { useCallback } from "react"
import styled from "styled-components"
import greyWallpaper from "../../assets/icons/greyWallpaper.jpg"
import { Header } from "../Header"
import { Main } from "./Main"

const Container = styled.div`
  background: url(${greyWallpaper});
  background-size: cover;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
`

export const Cards = () => {
  return (
    <Container>
      <Header />
      <Main />
    </Container>
  )
}

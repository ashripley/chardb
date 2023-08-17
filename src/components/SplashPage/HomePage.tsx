import React from "react"
import styled from "styled-components"
import wallpaper from "../../assets/wallpaper.jpg"
import { Body } from "./Body"
import { Header } from "./Header"

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 100vh;
  width: 100vw;
  background: url(${wallpaper});
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
`

export const HomePage = () => {
  return (
    <>
      <Container>
        <Header />
        <Body />
      </Container>
    </>
  )
}

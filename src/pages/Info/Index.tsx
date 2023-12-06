import styled from "styled-components"
import { Header } from "../Header"
import { Main } from "./Main"
import { Theme } from "../../Theme"
import blob from "../../assets/icons/blob.svg"
import React, { memo, useCallback } from "react"

interface Props {
  menuAction: string
  passMenuActionLabel: (label: string) => void
  isOpen: (isClicked: boolean) => void
}

const Container = styled.div`
  background-color: ${Theme.darkBg} !important;
  background: url(${blob});
  background-size: auto;
  min-height: 100vh;
  height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
`
export const Info = memo(({ menuAction, isOpen }: Props) => {
  const onClick = useCallback(
    (clicked: boolean) => {
      isOpen(clicked)
    },
    [isOpen]
  )

  return (
    <Container>
      <Header menuAction={menuAction} isOpen={onClick} />
      <Main />
    </Container>
  )
})

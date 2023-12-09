import { memo, useCallback } from "react"
import styled from "styled-components"
import { theme } from "../../theme"
import blob from "../../assets/icons/blob.svg"
import { Header } from "../Header"
import { Main } from "./Main"

interface Props {
  menuAction: string
  passMenuActionLabel: (label: string) => void
  isOpen: (isClicked: boolean) => void
}

const Container = styled.div`
  background-color: ${theme.darkBg} !important;
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

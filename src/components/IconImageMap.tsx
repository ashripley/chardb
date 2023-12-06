import styled from "styled-components"
import { Theme } from "../Theme"

const Icon = styled.div<{ isPokedex: boolean }>`
  display: flex;
  width: ${({ isPokedex }) => (isPokedex ? "100%" : "15%")};
  justify-content: ${({ isPokedex }) => (isPokedex ? "flex-end" : "center")};
  color: ${Theme.card};
`

export const IconImageMap = (src: string, isPokedex: boolean) => (
  <Icon isPokedex={isPokedex}>
    <img src={src} alt="menu" style={{ width: 25, height: 25 }} />
  </Icon>
)

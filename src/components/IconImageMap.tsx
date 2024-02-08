import styled from "styled-components"
import { theme } from "../theme"

const Icon = styled.div<{ isPokedex: boolean }>`
  display: flex;
  width: ${({ isPokedex }) => (isPokedex ? "100%" : "15%")};
  justify-content: ${({ isPokedex }) => (isPokedex ? "flex-end" : "center")};
  color: ${theme.card};
`

export const IconImageMap = (
  src: string,
  isPokedex: boolean,
  isTile?: boolean
) => (
  <Icon isPokedex={isPokedex}>
    <img
      src={src}
      alt="menu"
      style={{ width: isTile ? 15 : 25, height: isTile ? 15 : 25 }}
    />
  </Icon>
)

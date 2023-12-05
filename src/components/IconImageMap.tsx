import React from "react"
import styled from "styled-components"

const Icon = styled.div<{ isPokedex: boolean }>`
  display: flex;
  width: ${({ isPokedex }) => (isPokedex ? "100%" : "15%")};
  justify-content: ${({ isPokedex }) => (isPokedex ? "flex-end" : "center")};
  color: #333333;
`

export const IconImageMap = (src: string, isPokedex: boolean) => (
  <Icon isPokedex={isPokedex}>
    <img src={src} alt="menu" style={{ width: 25, height: 25 }} />
  </Icon>
)

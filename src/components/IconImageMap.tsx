import React from "react"
import styled from "styled-components"

interface Props {
  src: string
}

const Icon = styled.div`
  display: flex;
  width: 15%;
  justify-content: center;
  color: #333333;
`

export const IconImageMap = (src: string) => (
  <Icon>
    <img src={src} alt="menu" style={{ width: 25, height: 25 }} />
  </Icon>
)

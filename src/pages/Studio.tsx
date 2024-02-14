import { Paper } from "@mui/material"
import styled from "styled-components"
import { theme } from "../theme"

const Wrapper = styled.div`
  width: 90%;
  height: 75vh;
  display: flex;
  border-radius: 15px;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const LeftBox = styled(Paper)`
  width: 70%;
  height: 100%;
  background-color: ${theme.lightBg} !important;
  border-top-left-radius: 15px !important;
  border-bottom-left-radius: 15px !important;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  min-width: 300px;
`

const RightBox = styled(Paper)`
  width: 30%;
  height: 100%;
  background-color: ${theme.darkBg} !important;
  border-top-right-radius: 15px !important;
  border-bottom-right-radius: 15px !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
`

export const Studio = () => {
  return (
    <Wrapper>
      <LeftBox></LeftBox>
      <RightBox></RightBox>
    </Wrapper>
  )
}

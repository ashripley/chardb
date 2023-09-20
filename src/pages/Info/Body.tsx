import React from "react"
import styled from "styled-components"
import { Theme } from "../../Theme"

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 85%;
  justify-content: space-between;
`

const HeaderText = styled.div`
  display: flex;
  height: 20%;
  font-size: 3.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  margin: 0;
  padding: 10px;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
`

const Body = styled.div`
  display: flex;
  height: 50%;
  justify-content: center;
  width: 100%;
`

const Text = styled.span`
  color: ${Theme.primaryText};
  text-align: center;
  font-size: 1.5rem;
  display: flex;
  width: 60%;
  justify-content: center;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
`

export const InfoBody = () => {
  return (
    <Content>
      <HeaderText>
        <span
          className="char"
          style={{ color: Theme.charAccent, fontWeight: 800 }}
        >
          char
        </span>
        <span className="db" style={{ color: Theme.primaryText }}>
          db
        </span>
      </HeaderText>
      <Body>
        <Text>
          Welcome to {"char"}db! Chardb is a place to store your nostalgia.
          <br />
          <br />
          Here you can manage your db for your most precious pokemon cards in
          your collection!
        </Text>
      </Body>
    </Content>
  )
}

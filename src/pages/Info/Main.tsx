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
  font-size: 5.5rem;
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
  height: 70%;
  justify-content: center;
  width: 100%;
`

const Text = styled.span`
  color: ${Theme.primaryText};
  text-align: center;
  font-size: 1.3rem;
  display: flex;
  width: 60%;
  justify-content: center;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
`

const Dragonite = styled.img`
  position: relative;
  bottom: 15%;
  left: 75%;
  width: 150px;
  height: 150px;
`

const Squirtle = styled.img`
  position: relative;
  top: 60%;
  right: 35%;
  width: 150px;
  height: 150px;
`

export const Main = () => {
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
        <a href="https://pokemondb.net/pokedex/dragonite">
          <Dragonite
            src="https://img.pokemondb.net/sprites/home/normal/dragonite.png"
            alt="dragonite"
          />
        </a>
        <Text>
          Welcome to chardb! Chardb is a place to store your nostalgia.
          <br />
          <br />
          Here you can manage your Pokémon card collection! Your cards are
          stored in Firebase, with a wide array of data set against each card.
          <br />
          <br />
          The mutations write your cards to the database with information
          including: name, type, set, year, type-of-card, and some custom data
          that you may configure.
          <br />
          <br />
          From here, chardb does the rest! From the information that you
          provide, chardb will go and retrieve data from pokeapi to fill in
          things like images, id's, type colours, and other pokemon information
          points.
          <br />
          This is then concatenated into one object that represents your card.
          <br />
          <br />
          <br />
          So what are you waiting for? Add in your collection, and watch chardb
          bring your cards to life!
        </Text>
        <a href="https://pokemondb.net/pokedex/squirtle">
          <Squirtle
            src="https://img.pokemondb.net/sprites/home/normal/squirtle.png"
            alt="squirtle"
          />
        </a>
      </Body>
    </Content>
  )
}

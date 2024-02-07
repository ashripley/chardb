import styled from "styled-components"
import { theme } from "../theme"
import { isMobile } from "../helpers/view"

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 85vh;
  justify-content: space-between;
`

const HeaderText = styled.h1`
  display: flex;
  height: 20%;
  font-size: calc(24px + 2vw);
  justify-content: center;
  align-items: center;
  width: auto;
  display: flex;
  margin: 0;
  padding: 10px;
  font-family: ${theme.fontFamily};
  color: ${theme.charAccent};
  font-weight: 800;
`

const Body = styled.div`
  display: flex;
  height: 80%;
  justify-content: center;
  width: auto;
  align-items: center;
`

const Text = styled.span<{ isMobile: boolean }>`
  margin: 0px 50px;
  font-size: calc(12px + 0.4vw);
  height: ${({ isMobile }) => (isMobile ? "auto" : "100%")};
  color: ${theme.primaryText};
  text-align: center;
  display: flex;
  width: ${({ isMobile }) => (isMobile ? "auto" : "60%")};
  justify-content: center;
  font-family: ${theme.fontFamily};
`

const PokemonImage = styled.img`
  width: 150px;
  height: 150px;
`

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 20%;
`

export const Info = () => {
  return (
    <Content>
      <Header>
        <HeaderText>
          <span className="char">char</span>
          <span className="db" style={{ color: theme.primaryText }}>
            db
          </span>
        </HeaderText>
        <a href="https://pokemondb.net/pokedex/dragonite">
          <PokemonImage
            src="https://img.pokemondb.net/sprites/home/normal/dragonite.png"
            alt="dragonite"
          />
        </a>
      </Header>
      <Body>
        <Text isMobile={isMobile}>
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
      </Body>
    </Content>
  )
}

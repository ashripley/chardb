import styled from "styled-components"
import { theme } from "../theme"
import { isMobile } from "../helpers/view"

const Content = styled.div`
  display: block;
  height: 85vh;
`

const Body = styled.div`
  display: flex;
  height: 60%;
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
  width: ${({ isMobile }) => (isMobile ? "auto" : "90%")};
  justify-content: center;
  font-family: ${theme.fontFamily};
  align-items: center;
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
        <a href="https://pokemondb.net/pokedex/moltres">
          <PokemonImage
            src="https://img.pokemondb.net/sprites/home/normal/moltres.png"
            alt="moltres"
          />
        </a>
        <a href="https://pokemondb.net/pokedex/zapdos">
          <PokemonImage
            src="https://img.pokemondb.net/sprites/home/normal/zapdos.png"
            alt="zapdos"
          />
        </a>
        <a href="https://pokemondb.net/pokedex/articuno">
          <PokemonImage
            src="https://img.pokemondb.net/sprites/home/normal/articuno.png"
            alt="articuno"
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

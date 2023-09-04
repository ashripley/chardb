import { Paper, Slide } from "@mui/material"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { ViewSwitch } from "../ViewSwitch"
import { PokemonCard } from "./PokemonCard"

interface Props {
  pokemon: Record<string, any>[]
  mounted: boolean
  isLoading: boolean
}

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: block;
  justify-content: center;
  background: white !important;
`

const StyledPaper = styled(Paper)`
  background-color: white;
  display: flex;
  max-width: 100%;
  width: 100%;
  justify-content: center;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
`

const Switch = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-bottom: 20px;
`

export const Cards = ({ pokemon, mounted, isLoading }: Props) => {
  const [cards, setCards] = useState<Record<string, any>[]>([])
  const [gridView, setGridView] = useState(true)

  const viewChange = () => {
    setGridView(!gridView)
  }

  useEffect(() => {
    const cardIds = pokemon.map(({ cardId }) => cardId)
    const filteredCards = pokemon
      .filter(({ cardId }, index) => !cardIds.includes(cardId, index + 1))
      .filter((f) => f.cardId !== "")
      .sort((a, b) => a.id - b.id)

    setCards(filteredCards)
  }, [pokemon])

  return (
    <Slide direction="up" in={mounted} mountOnEnter unmountOnExit>
      <Container>
        <Switch>
          <ViewSwitch view={viewChange} />
        </Switch>
        <StyledPaper
          elevation={0}
          style={{ backgroundColor: "white", maxWidth: "100%", padding: 0 }}
        >
          {cards.map((poke, index) => (
            <PokemonCard
              pokemon={poke}
              cardIndex={index}
              view={gridView}
              isLoading={isLoading}
            />
          ))}
        </StyledPaper>
      </Container>
    </Slide>
  )
}

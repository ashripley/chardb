import { Pagination, Paper, Slide } from "@mui/material"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { PokemonCard } from "./PokemonCard"
import { Loading } from "../Skeleton"
import { Theme } from "../../Theme"

interface Props {
  pokemon: Record<string, any>[]
  mounted: boolean
  isLoading: boolean
  view: boolean
  isCardDeleted: (hasChanged: boolean, pokemon: Record<string, any>) => void
}

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: block;
  justify-content: center;
`

const StyledPaper = styled(Paper)`
  background-color: transparent;
  display: flex;
  max-width: 100%;
  width: 100%;
  justify-content: center;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
`

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const Cards = ({
  pokemon,
  mounted,
  isLoading,
  view,
  isCardDeleted,
}: Props) => {
  const [cards, setCards] = useState<Record<string, any>[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

  const itemsPerPage = 10

  const paginatedCards = cards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [currentPage])

  useEffect(() => {
    const cardIds = pokemon.map(({ cardId }) => cardId)
    const filteredCards = pokemon
      .filter(({ cardId }, index) => !cardIds.includes(cardId, index + 1))
      .filter((f) => f.cardId !== "")
      .sort((a, b) => a.id - b.id)

    setCards(filteredCards)
  }, [pokemon])

  const isDeleted = (hasChanged: boolean, pokemon: Record<string, any>) => {
    isCardDeleted(hasChanged, pokemon)
  }

  return (
    <Slide direction="up" in={mounted} mountOnEnter unmountOnExit>
      <Container>
        {isLoading ? (
          <Loading view={view} />
        ) : (
          <StyledPaper
            elevation={0}
            style={{
              backgroundColor: "transparent",
              maxWidth: "100%",
              padding: 0,
            }}
          >
            {(paginatedCards || cards).map((poke, index) => (
              <PokemonCard
                key={index}
                isCardDeleted={isDeleted}
                pokemon={poke}
                cardIndex={index}
                view={view}
                isLoading={isLoading}
              />
            ))}
          </StyledPaper>
        )}
        <PaginationWrapper>
          <Pagination
            count={Math.ceil(cards.length / itemsPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="standard"
            style={{ margin: 50 }}
          />
        </PaginationWrapper>
      </Container>
    </Slide>
  )
}

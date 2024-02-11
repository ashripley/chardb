import { Pagination, Paper, Slide } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { LoadingSkeleton } from "../Skeleton"
import { PokemonCard } from "./PokemonCard"
import { useSelector } from "react-redux"
import { CardState, RootState } from "../../redux/store"
import { isMobile } from "../../helpers/view"

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: block;
  justify-content: center;
`

const StyledPaper = styled(Paper)<{ isMobile: boolean }>`
  background-color: transparent;
  display: flex;
  max-width: 100%;
  width: 100%;
  justify-content: center;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  ${({ isMobile }) => !isMobile && `gap: 15px`};
`

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const Cards = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { filterView, isDataLoading, cardField, cardData } = useSelector(
    (state: RootState) => state.root
  )
  const { isCardOpen } = useSelector((state: CardState) => state.card)

  const itemsPerPage = 50

  const pokemon =
    cardField.value !== ""
      ? cardData.filter((p: Record<string, any>) =>
          p[cardField.key?.toLowerCase() || "name"]?.includes(
            cardField.value.toLowerCase()
          )
        )
      : cardData

  const filteredCards = useMemo(() => {
    const cardIds = new Set(pokemon.map(({ cardId }) => cardId))
    return pokemon
      .filter(({ cardId }) => cardId && cardIds.has(cardId))
      .sort((a, b) => {
        return a[filterView || "id"] < b[filterView || "id"]
          ? -1
          : a[filterView || "id"] > b[filterView || "id"]
          ? 1
          : 0
      })
  }, [pokemon, filterView])

  const paginatedCards = useMemo(
    () =>
      filteredCards.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [pokemon, currentPage, itemsPerPage, filterView]
  )

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [currentPage])

  return (
    <Slide direction="up" in={isCardOpen} mountOnEnter unmountOnExit>
      <Container>
        {isDataLoading ? (
          <LoadingSkeleton />
        ) : (
          <StyledPaper
            isMobile={isMobile}
            elevation={0}
            style={{
              backgroundColor: "transparent",
              maxWidth: "100%",
              padding: 0,
            }}
          >
            {paginatedCards.map((poke, index) => (
              <PokemonCard key={index} pokemon={poke} cardIndex={index} />
            ))}
          </StyledPaper>
        )}
        <PaginationWrapper>
          <Pagination
            count={Math.ceil(filteredCards.length / itemsPerPage)}
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

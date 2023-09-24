import { Paper, Slide, TablePagination } from "@mui/material"
import styled from "styled-components"
import { useEffect, useRef, useState } from "react"
import { PokemonCard } from "./PokemonCard"
import { Loading } from "../Skeleton"
import { Theme } from "../../Theme"

interface Props {
  pokemon: Record<string, any>[]
  mounted: boolean
  isLoading: boolean
  view: boolean
  isCardDeleted: (hasChanged: boolean) => void
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

export const Cards = ({
  pokemon,
  mounted,
  isLoading,
  view,
  isCardDeleted,
}: Props) => {
  const [cards, setCards] = useState<Record<string, any>[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [page])

  const handleChangePage = (
    //@ts-ignore
    event: MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(1)
  }

  useEffect(() => {
    const cardIds = pokemon.map(({ cardId }) => cardId)
    const filteredCards = pokemon
      .filter(({ cardId }, index) => !cardIds.includes(cardId, index + 1))
      .filter((f) => f.cardId !== "")
      .sort((a, b) => a.id - b.id)

    setCards(filteredCards)
  }, [pokemon])

  const isDeleted = (hasChanged: boolean) => {
    isCardDeleted(hasChanged)
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
            {(rowsPerPage > 1
              ? cards.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : cards
            ).map((poke, index) => (
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
        <TablePagination
          count={cards.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[25, 50, 100, 1000]}
          labelRowsPerPage={<span>Rows:</span>}
          backIconButtonProps={{
            color: "warning",
          }}
          nextIconButtonProps={{ color: "warning" }}
          sx={{
            height: 100,
            backgroundColor: Theme.darkBg,
            color: Theme.primaryText,
            borderBottom: "none",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            fontFamily:
              "ui-rounded,'Hiragino Maru Gothic ProN',Quicksand,Comfortaa,Manjari,'Arial Rounded MT','Arial Rounded MT Bold',Calibri,source-sans-pro,sans-serif",
          }}
          size="medium"
        />
      </Container>
    </Slide>
  )
}

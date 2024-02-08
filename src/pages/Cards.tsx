import { useCallback, useEffect } from "react"
import styled from "styled-components"
import { AllCards } from "../api/queries/allCards"
import { AddModal } from "../components/AddModal"
import { Cards } from "../components/Cards/Cards"
import { ConfirmationModal } from "../components/ConfirmationModal"
import { AnalyticsModal } from "../components/AnalyticsModal"
import { useDispatch, useSelector } from "react-redux"
import { setCardData, setIsDataLoading } from "../redux/root"
import { setHasCardError, setIsCardOpen } from "../redux/card"
import { CardState } from "../redux/store"
import { isMobile } from "../helpers/view"
import { DesktopSearch } from "../components/DesktopSearch"
import { MobileSearch } from "../components/MobileSearch"

const Wrap = styled.div``

export const PokemonCards = () => {
  const dispatch = useDispatch()
  const { isAddModalOpen, isCardOpen } = useSelector(
    (state: CardState) => state.card
  )

  // Function to fetch data
  const fetchData = useCallback(async () => {
    dispatch(setIsDataLoading(true))

    try {
      const cards = await AllCards()

      dispatch(setCardData(cards || []))
      dispatch(setIsCardOpen(true))
    } catch (error) {
      dispatch(setHasCardError(true))
    } finally {
      dispatch(setIsDataLoading(false))
    }
  }, [])

  // Callback function when AddModal is closed
  useEffect(() => {
    if (!isAddModalOpen) fetchData()
  }, [isAddModalOpen])

  // Initial data fetch on component mount
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Wrap>
      {isMobile ? <MobileSearch /> : <DesktopSearch />}
      <AddModal />
      <ConfirmationModal />
      <AnalyticsModal />
      <Wrap>{isCardOpen && <Cards />}</Wrap>
    </Wrap>
  )
}

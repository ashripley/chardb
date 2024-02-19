import { useCallback, useEffect } from "react"
import styled from "styled-components"
import { AllCards } from "../api/queries/allCards"
import { Cards } from "../components/Cards/Cards"
import { ConfirmationModal } from "../components/Modals/ConfirmationModal"
import { useDispatch, useSelector } from "react-redux"
import { setCardData, setIsDataLoading } from "../redux/root"
import { setHasCardError, setIsCardOpen } from "../redux/card"
import { CardState } from "../redux/store"
import { isMobile } from "../helpers/view"
import { DesktopSearch } from "../components/Search/DesktopSearch"
import { MobileSearch } from "../components/Search/MobileSearch"

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
  // useEffect(() => {
  //   console.log("useEffect cards add modal fetch data")
  //   if (!isAddModalOpen) fetchData()
  // }, [isAddModalOpen])

  // Initial data fetch on component mount
  // fetch cards when land on home screen instead!!
  // useEffect(() => {
  //   console.log("useEffect cards fetch data on load")
  //   fetchData()
  // }, [])

  return (
    <Wrap>
      {isMobile ? <MobileSearch /> : <DesktopSearch />}
      <ConfirmationModal />
      <Wrap>{isCardOpen && <Cards />}</Wrap>
    </Wrap>
  )
}

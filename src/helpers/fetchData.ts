import { useDispatch, useSelector } from "react-redux"
import { setCardData, setIsDataLoading } from "../redux/root"
import { AllCards } from "../api/queries/allCards"
import { setHasCardError, setIsCardOpen } from "../redux/card"

// Function to fetch data
const fetchData = async () => {
  const dispatch = useDispatch()

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
}

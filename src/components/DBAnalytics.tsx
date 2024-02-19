import { useCallback, useEffect } from "react"
import styled from "styled-components"
import { theme } from "../theme"
import { AllCards } from "../api/queries/allCards"
import { Divider } from "@mui/material"
import { setAnalyticsCardData, setIsAnalyticsLoading } from "../redux/card"
import { useDispatch, useSelector } from "react-redux"
import { CardState, RootState } from "../redux/store"

const BWrapper = styled.div`
  height: auto;
  width: auto;
  display: block;
  margin-top: 20px;
`

const TextWrapper = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: row;
  background: ${theme.lightBg};
  gap: 15px;
  margin: 20px 0px;
`

const Text = styled.h3`
  width: auto;
  min-width: 40px;
  display: flex;
  justify-content: flex-end;
  font-weight: 800;
  font-family: ${theme.fontFamily};
  color: ${theme.primaryText};
  font-size: 1rem;
`

const Data = styled.p`
  width: auto;
  display: flex;
  justify-content: flex-start;
  font-weight: 100;
  font-family: ${theme.fontFamily};
  font-size: 1rem;
  color: ${theme.primaryText};
`

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${theme.lightBg};
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
`

export const DBAnalytics = () => {
  const dispatch = useDispatch()
  const { analyticsCardData } = useSelector((state: CardState) => state.card)

  // Function to fetch data
  const fetchData = useCallback(async () => {
    dispatch(setIsAnalyticsLoading(true))

    try {
      const cards = await AllCards()

      dispatch(setAnalyticsCardData(cards || []))
    } catch (error) {
      console.error("Analytics cards error: ", error)
    } finally {
      dispatch(setIsAnalyticsLoading(false))
    }
  }, [])

  // Initial data fetch on component mount
  useEffect(() => {
    console.log("useEffect analytics modal")
    fetchData()
  }, [])

  const total = analyticsCardData
    ?.map((c: Record<string, any>) => c["quantity"])
    .filter((c) => c !== undefined)
    .map((num) => parseInt(num))
    .reduce((partialSum, a) => partialSum + a)

  const data = {
    cardCount: analyticsCardData?.length,
    totalCount:
      total && analyticsCardData ? total + analyticsCardData.length : 0,
    typeCount: new Set(
      analyticsCardData?.map((c: Record<string, any>) => c["type"])
    ).size,
    attributeCount: new Set(
      analyticsCardData?.map((c: Record<string, any>) => c["attribute"])
    ).size,
    setCount: new Set(
      analyticsCardData?.map((c: Record<string, any>) => c["set"])
    ).size,
    trainerCount: new Set(
      analyticsCardData?.filter(
        (c: Record<string, any>) => c["attribute"] === "trainer"
      )
    ).size,
    energyCount: new Set(
      analyticsCardData?.filter(
        (c: Record<string, any>) => c["attribute"] == "energy"
      )
    ).size,
  }

  return (
    <Container>
      <Divider orientation="horizontal" flexItem />
      <BWrapper>
        <TextWrapper>
          <Text>{data.totalCount}</Text>
          <Divider orientation="vertical" flexItem />
          <Data>{`total card${data.totalCount !== 1 ? "s" : ""}`}</Data>
        </TextWrapper>
        <TextWrapper>
          <Text>{data.cardCount}</Text>
          <Divider orientation="vertical" flexItem />
          <Data>{`unique card${data.cardCount !== 1 ? "s" : ""}`}</Data>
        </TextWrapper>
        <TextWrapper>
          <Text>{data.typeCount}</Text>
          <Divider orientation="vertical" flexItem />
          <Data>{`type${data.typeCount !== 1 ? "s" : ""}`}</Data>
        </TextWrapper>
        <TextWrapper>
          <Text>{data.attributeCount}</Text>
          <Divider orientation="vertical" flexItem />
          <Data>{`attribute${data.attributeCount !== 1 ? "s" : ""}`}</Data>
        </TextWrapper>
        <TextWrapper>
          <Text>{data.setCount}</Text>
          <Divider orientation="vertical" flexItem />
          <Data>{`set${data.setCount !== 1 ? "s" : ""}`}</Data>
        </TextWrapper>
        <TextWrapper>
          <Text>{data.trainerCount}</Text>
          <Divider orientation="vertical" flexItem />
          <Data>{`unique trainer card${
            data.trainerCount !== 1 ? "s" : ""
          }`}</Data>
        </TextWrapper>
        <TextWrapper>
          <Text>{data.energyCount}</Text>
          <Divider orientation="vertical" flexItem />
          <Data>{`unique energy card${
            data.energyCount !== 1 ? "s" : ""
          }`}</Data>
        </TextWrapper>
      </BWrapper>
    </Container>
  )
}

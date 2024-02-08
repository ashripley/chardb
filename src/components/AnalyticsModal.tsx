import CloseIcon from "@mui/icons-material/Close"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Fade from "@mui/material/Fade"
import Modal from "@mui/material/Modal"
import { useCallback, useEffect } from "react"
import styled from "styled-components"
import { theme } from "../theme"
import { AllCards } from "../api/queries/allCards"
import { Divider } from "@mui/material"
import {
  setAnalyticsCardData,
  setIsAnalyticsLoading,
  setIsAnalyticsOpen,
} from "../redux/card"
import { useDispatch, useSelector } from "react-redux"
import { CardState } from "../redux/store"
import Spinner from "./Spinner"
import { isMobile } from "../helpers/view"

const HWrapper = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  background: ${theme.lightBg};
`

const HTitle = styled.h2`
  height: 50px;
  width: 80%;
  display: flex;
  justify-content: flex-start;
  background: ${theme.lightBg};
  align-items: center;
  font-weight: 800;
  font-size: calc(12px + 0.8vw);
  font-family: ${theme.fontFamily};
  color: ${theme.primaryText};
  margin-bottom: 20px;
`

const Exit = styled.div`
  height: 50px;
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${theme.lightBg};
`

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
  font-size: calc(12px + 0.5vw);
`

const Data = styled.p`
  width: auto;
  display: flex;
  justify-content: flex-start;
  font-weight: 100;
  font-family: ${theme.fontFamily};
  font-size: calc(12px + 0.5vw);
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  minWidth: isMobile ? "60vw" : "30vw",
  minHeight: isMobile ? "60vw" : "30vw",
  height: "auto",
  border: "8px solid white",
  bgcolor: theme.lightBg,
  boxShadow: `${theme.lightBg} 0px 0px 2px 0px !important`,
  borderRadius: "35px",
  p: 4,
}

export const AnalyticsModal = () => {
  const dispatch = useDispatch()
  const { isAnalyticsOpen, analyticsCardData, isAnalyticsLoading } =
    useSelector((state: CardState) => state.card)

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

  const Header = () => (
    <HWrapper>
      <HTitle>Analytics</HTitle>
      <Exit>
        <CloseIcon
          fontSize="large"
          style={{
            width: isMobile ? 20 : 30,
            height: isMobile ? 20 : 30,
            borderRadius: 100,
            padding: 10,
            color: theme.primaryText,
          }}
          sx={{
            transition: "all 0.5s !important",
            ":hover": {
              background: theme.lightBg,
              boxShadow: `0px 0px 10px 0px #ff8c00 , 0px 0px 10px 0px #ffffff`,
              cursor: "pointer",
            },
          }}
          onClick={() => dispatch(setIsAnalyticsOpen(!isAnalyticsOpen))}
        />
      </Exit>
    </HWrapper>
  )

  const Body = () => (
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
        <Data>{`unique energy card${data.energyCount !== 1 ? "s" : ""}`}</Data>
      </TextWrapper>
    </BWrapper>
  )

  return (
    <div>
      {isAnalyticsLoading ? (
        <Spinner />
      ) : (
        <Modal
          open={isAnalyticsOpen}
          onClose={() => dispatch(setIsAnalyticsOpen(!isAnalyticsOpen))}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          style={{ backdropFilter: "blur(4px)" }}
          slotProps={{
            backdrop: {
              timeout: {
                appear: 1000,
                enter: 1000,
                exit: 1000,
              },
            },
          }}
        >
          <Fade in={isAnalyticsOpen}>
            <Box sx={style}>
              <Container>
                <Header />
                <Divider orientation="horizontal" flexItem />
                <Body />
              </Container>
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  )
}

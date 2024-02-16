import { Paper } from "@mui/material"
import styled from "styled-components"
import { theme } from "../theme"
import pokeball from "../assets/icons/pokeball.png"
import * as React from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { AddCardPanel } from "../components/Navigation/AddCardPanel"
import { useEffect } from "react"
import { DataFetcher } from "../helpers/fetchData"
import { useDispatch, useSelector } from "react-redux"
import { CardState } from "../redux/store"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const Panel = styled.div`
  width: 90%;
  height: 100%;

  & > div {
    height: 100%;
    padding: 0px;
  }

  & > div > p {
    height: 100%;
  }
`

const Wrapper = styled.div`
  width: 90%;
  height: 75vh;
  display: flex;
  border-radius: 35px;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px !important;
`

const LeftBox = styled(Paper)`
  width: 70%;
  height: 100%;
  background-color: ${theme.lightBg} !important;
  border-top-left-radius: 35px !important;
  border-bottom-left-radius: 35px !important;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  min-width: 300px;
  box-shadow: none !important;
  display: flex;
`

const RightBox = styled(Paper)`
  width: 30%;
  height: 100%;
  background-color: ${theme.darkBg} !important;
  border-top-right-radius: 35px !important;
  border-bottom-right-radius: 35px !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  box-shadow: none !important;
  min-width: 500px;
`

const StudioHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 10%;
  min-width: 400px;
`

const Heading = styled.h2`
  font-weight: 800;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
  width: auto;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
  min-width: 400px;
  gap: 30px;
`

const Card = styled.div`
  height: 85%;
  width: 80%;
  border: 1px solid ${theme.primaryText};
  border-radius: 15px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

const Image = styled.div`
  width: 80%;
  border: 1px solid ${theme.primaryText};
  border-radius: 15px;
  margin: auto;
  height: 35%;
`

const Details = styled.div`
  width: 80%;
  border: 1px dotted ${theme.primaryText};
  border-radius: 15px;
  margin: auto;
  height: 45%;
`

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StockImage = styled.img`
  width: 100px;
  height: 100px;
  filter: brightness(0) saturate(100%) invert(34%) sepia(10%) saturate(0%)
    hue-rotate(134deg) brightness(97%) contrast(92%);
  opacity: 0.8;
`

const tabSxStyles = {
  width: "10%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  minWidth: 120,

  "& > div": {
    marginRight: 0,
    justifyContent: "center !important",
    display: "flex !important",
    alignItems: "center !important",
  },
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <Panel
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "90%", height: "100%" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Panel>
  )
}

export const tabProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  }
}

export const Studio = () => {
  const { data } = useSelector((state: CardState) => state.card)

  const [value, setValue] = React.useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("fetch data on mount of studio")
    DataFetcher(dispatch)
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Wrapper>
      <LeftBox>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          textColor={theme.charAccent}
          TabIndicatorProps={{
            sx: {
              backgroundColor: theme.charAccent,
            },
          }}
          sx={{ borderRight: 1, borderColor: "divider", ...tabSxStyles }}
        >
          <Tab label="Add" {...tabProps(0)} />
          <Tab label="Update" {...tabProps(1)} />
          <Tab label="Delete" {...tabProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <AddCardPanel />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Update
        </TabPanel>
        <TabPanel value={value} index={2}>
          Delete
        </TabPanel>
      </LeftBox>
      <RightBox>
        <StudioHeader>
          <Heading>Simulator</Heading>
        </StudioHeader>
        <Body>
          <Card>
            <Image>
              <ImageContainer>
                <StockImage src={pokeball} />
              </ImageContainer>
            </Image>
            <Details>
              <p>{data.name ?? <></>}</p>
              <p>{data.set ?? <></>}</p>
              <p>{data.setNumber ?? <></>}</p>
              <p>{data.year ?? <></>}</p>
              <p>{data.quantity ?? <></>}</p>
              <p>{data.attribute ?? <></>}</p>
              <p>{data.rarity ?? <></>}</p>
            </Details>
          </Card>
        </Body>
      </RightBox>
    </Wrapper>
  )
}

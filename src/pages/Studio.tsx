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
import { useDispatch, useSelector } from "react-redux"
import { CardState } from "../redux/store"
import { AllDataQuery } from "../api/queries/allData"
import { CardPreview } from "../components/CardPreview"

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
  const [value, setValue] = React.useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("fetch data on mount of studio")
    AllDataQuery(dispatch)
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
          <Heading>Live View</Heading>
        </StudioHeader>
        <Body>
          <CardPreview />
        </Body>
      </RightBox>
    </Wrapper>
  )
}

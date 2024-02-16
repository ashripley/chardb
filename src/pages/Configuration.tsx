import { Button, Paper } from "@mui/material"
import styled from "styled-components"
import { theme } from "../theme"
import * as React from "react"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { useEffect, useState } from "react"
import { Sets } from "../components/ConfigurationTabs/Sets"
import { CardTypes } from "../components/ConfigurationTabs/CardTypes"
import { Rarities } from "../components/ConfigurationTabs/Rarities"
import { Pokemon } from "../components/ConfigurationTabs/Pokemon"
import { TabPanel, tabProps } from "./Studio"
import { useDispatch } from "react-redux"
import { AllDataQuery } from "../api/queries/allData"
import { PokemonTypes } from "../components/ConfigurationTabs/PokemonTypes"
import { Conditions } from "../components/ConfigurationTabs/Conditions"

const Wrapper = styled.div`
  width: 90%;
  height: 75vh;
  display: flex;
  border-radius: 35px;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const Container = styled(Paper)`
  width: 100%;
  height: 100%;
  background-color: ${theme.lightBg} !important;
  border-radius: 35px !important;
  min-width: 300px;
  box-shadow: none !important;
  display: flex;
`

const TabWrapper = styled.div`
  margin: 0px 25px !important;
  border-top-left-radius: 35px !important;
  border-bottom-left-radius: 35px !important;
`

const DB = () => {
  const [tab, setTab] = useState(0)

  const tabLabels = [
    "Sets",
    "Card Types",
    "Pokemon Types",
    "Rarities",
    "Conditions",
    "Pokemon",
  ]

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  const renderSwitch = (tab: number) => {
    switch (tab) {
      case 0:
        return <Sets />
      case 1:
        return <CardTypes />
      case 2:
        return <PokemonTypes />
      case 3:
        return <Rarities />
      case 4:
        return <Conditions />
      case 5:
        return <Pokemon />
      default:
        return <></>
    }
  }

  return (
    <TabWrapper>
      <Box
        sx={{
          width: "auto",
          bgcolor: theme.lightBg,
          color: theme.primaryText,
          padding: "15px",
          borderTopRightRadius: "15px !important",
          margin: "0px 25px !important",
        }}
      >
        <Tabs
          value={tab}
          onChange={handleChange}
          centered
          textColor={theme.primaryText}
          TabIndicatorProps={{
            sx: {
              backgroundColor: theme.charAccent,
            },
          }}
        >
          {tabLabels.map((label, index) => (
            <Tab label={label} key={index} />
          ))}
        </Tabs>
      </Box>

      {renderSwitch(tab)}
    </TabWrapper>
  )
}

const Theme = () => {
  return <></>
}

const Analytics = () => {
  return <></>
}

export const Configuration = () => {
  const [value, setValue] = React.useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("fetch data on mount of studio")
    AllDataQuery(dispatch)
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const tabSxStyles = {
    width: "10%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 250,
    backgroundColor: theme.darkBg,
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,

    "& > div": {
      marginRight: 0,
      justifyContent: "center !important",
      display: "flex !important",
      alignItems: "center !important",
    },
  }

  return (
    <Wrapper>
      <Container>
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
          <Tab label="DB" {...tabProps(0)} />
          <Tab label="Theme" {...tabProps(1)} />
          <Tab label="Analytics" {...tabProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <DB />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Theme />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Analytics />
        </TabPanel>
      </Container>
    </Wrapper>
  )
}

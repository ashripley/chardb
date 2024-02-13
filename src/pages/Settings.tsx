import { Button, Paper } from "@mui/material"
import styled from "styled-components"
import { theme } from "../theme"
import * as React from "react"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { useState } from "react"
import { Sets } from "../components/Settings/Sets"
import { Attributes } from "../components/Settings/Attributes"
import { Types } from "../components/Settings/Types"
import { Rarities } from "../components/Settings/Rarities"
import { Pokemon } from "../components/Settings/Pokemon"

const Wrapper = styled.div`
  width: 90%;
  height: 75vh;
  display: flex;
  border-radius: 15px;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

const SidePanel = styled.div``

const Header = styled.div`
  font-size: 1.5rem;
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin: 0;
  font-family: ${theme.fontFamily};
  min-height: 50px;
  padding: 15px;
  width: auto;
`

const HomeHeader = styled(Header)`
  justify-content: center;
  align-items: center;
  height: 10%;
`

const Options = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  gap: 20px;
`

const LeftBox = styled(Paper)`
  width: 20%;
  height: 100%;
  background-color: ${theme.darkBg} !important;
  border-top-left-radius: 15px !important;
  border-bottom-left-radius: 15px !important;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  min-width: 300px;
`

const RightBox = styled(Paper)`
  width: 80%;
  height: 100%;
  background-color: ${theme.lightBg} !important;
  border-top-right-radius: 15px !important;
  border-bottom-right-radius: 15px !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
`

const buttonStyles = {
  borderRadius: "15px",
  fontFamily: theme.fontFamily,
  color: theme.primaryText,
  fontSize: "calc(12px + 0.2vw)",
  width: "auto",
  justifyContent: "flex-start",
  minHeight: "40px",
  display: "flex",
  textTransform: "none",
}

const Configuration = () => {
  const [tab, setTab] = useState(0)

  const tabLabels = ["Sets", "Attributes", "Types", "Rarities", "Pokemon"]

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  const renderSwitch = (tab: number) => {
    switch (tab) {
      case 0:
        return <Sets />
      case 1:
        return <Attributes />
      case 2:
        return <Types />
      case 3:
        return <Rarities />
      case 4:
        return <Pokemon />
      default:
        return <></>
    }
  }

  return (
    <>
      <Box
        sx={{
          width: "auto",
          bgcolor: theme.lightBg,
          color: theme.primaryText,
          padding: "15px",
          borderTopRightRadius: "15px !important",
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
    </>
  )
}

const Theme = () => {
  return <></>
}

const Analytics = () => {
  return <></>
}

const Home = () => {
  return (
    <>
      <HomeHeader>Welcome!</HomeHeader>
    </>
  )
}

const componentMap: Record<string, any> = {
  Configuration,
  Theme,
  Analytics,
  Home,
}

export const Settings = () => {
  const [settingOption, setSettingOption] = useState<string>("Home")

  const Setting = componentMap[settingOption] || (() => <></>)

  return (
    <Wrapper>
      <LeftBox>
        <SidePanel>
          <Header>
            <>Settings</>
          </Header>
          <Options>
            {["Home", "Configuration", "Theme", "Analytics"].map(
              (label: string, index: number) => (
                <Button
                  sx={buttonStyles}
                  onClick={() => setSettingOption(label)}
                  key={index}
                >
                  {label}
                </Button>
              )
            )}
          </Options>
        </SidePanel>
      </LeftBox>
      <RightBox>
        <Setting />
      </RightBox>
    </Wrapper>
  )
}

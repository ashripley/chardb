import { Button, Grow, StyledEngineProvider } from "@mui/material"
import { memo } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { theme } from "../theme"
import { setDbType, setMenuStatus, setPage } from "../redux/root"
import { firestore } from "../services/firebase"
import { RootState } from "../redux/store"
import { DbType } from "../helpers/view"
import { Info } from "./Info"

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  max-height: 80%;
  height: 85vh;
  justify-content: flex-start;
  gap: 100px;
`

const Wrapper = styled.div`
  max-height: 60%;
  height: 60vh;
  align-items: center;
  display: grid;
`

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(24px + 6vw);
  max-width: 100%;
  width: 100%;
  height: 80%;
  font-family: ${theme.fontFamily};
`

const ThemeTitle = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(20px + 2vw);
  max-width: 100%;
  width: auto;
  font-family: ${theme.fontFamily};
  min-width: 300px;
  margin: 20px;
`

const SubTitle = styled.h3`
  font-size: calc(12px + 0.8vw);
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 20%;
  font-family: ${theme.fontFamily};
  font-weight: 100;
`

const ButtonWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  height: auto;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
`

const StyledButton = styled(Button)<{ dbType: DbType }>`
  border-radius: 15px;
  background-color: ${theme.darkBg};
  font-family: ${theme.fontFamily};
  font-size: calc(12px + 0.2vw);
  width: 14rem;
  padding: 15px;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  transition: all 1s ease;

  &:hover {
    background-color: ${({ dbType }) => theme[`${dbType}Accent`]} !important;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
    color: ${theme.darkBg} !important;
  }
`

const StyledImage = styled.img`
  width: calc(100px + 6vw);
`

const StyledThemeImage = styled.img`
  width: 100px;
`

const Theme = styled.div`
  display: block;
  font-size: calc(20px + 1vw);
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 0;
  gap: 100px;
  font-family: ${theme.fontFamily};
  width: auto;
  flex-wrap: wrap;
`

export const Home = memo(() => {
  console.log("home")
  const dispatch = useDispatch()
  const { dbType } = useSelector((state: RootState) => state.root)

  const nameMap: Record<string, any> = {
    bulb: "bulbasaur",
    squir: "squirtle",
    char: "charmander",
  }

  return (
    <>
      <Grow in={true} style={{ transformOrigin: "1 1 1" }} timeout={1000}>
        <div>
          <Root>
            <Wrapper>
              <Title>
                <span
                  style={{ color: theme[`${dbType}Accent`], fontWeight: 800 }}
                >
                  {dbType}
                </span>
                <a href={`https://pokemondb.net/pokedex/${nameMap[dbType]}`}>
                  <StyledImage
                    src={`https://img.pokemondb.net/sprites/home/normal/${nameMap[dbType]}.png`}
                    alt={nameMap[dbType]}
                  />
                </a>
                <span style={{ color: theme.primaryText }}>db</span>
              </Title>
              <SubTitle>
                <span style={{ color: theme.primaryText }}>
                  a place to store your nostalgia
                </span>
              </SubTitle>
            </Wrapper>
            <ButtonWrapper>
              <StyledEngineProvider injectFirst>
                <StyledButton
                  dbType={dbType}
                  variant="contained"
                  onClick={() => dispatch(setPage("Cards"))}
                  sx={{ color: theme.primaryText }}
                >
                  View Cards
                </StyledButton>
              </StyledEngineProvider>
            </ButtonWrapper>
          </Root>
          <Root>
            <Info />
          </Root>
          <Root>
            <Wrapper>
              <Theme>
                {Object.entries(nameMap).map(([shortName, label], index) => (
                  <ThemeTitle key={index}>
                    <span
                      style={{
                        color: theme[`${shortName}Accent`],
                        fontWeight: 800,
                      }}
                    >
                      {shortName}
                    </span>
                    <a href={`https://pokemondb.net/pokedex/${label}`}>
                      <StyledThemeImage
                        src={`https://img.pokemondb.net/sprites/home/normal/${label}.png`}
                        alt={label}
                      />
                    </a>
                    <span style={{ color: theme.primaryText }}>db</span>
                  </ThemeTitle>
                ))}
              </Theme>
            </Wrapper>
            <ButtonWrapper>
              <StyledEngineProvider injectFirst>
                <StyledButton
                  dbType={dbType}
                  variant="contained"
                  onClick={() => dispatch(setPage("Configuration"))}
                  sx={{ color: theme.primaryText }}
                  style={{ minWidth: 300 }}
                >
                  Choose Your Starter
                </StyledButton>
              </StyledEngineProvider>
            </ButtonWrapper>
          </Root>
        </div>
      </Grow>
    </>
  )
})

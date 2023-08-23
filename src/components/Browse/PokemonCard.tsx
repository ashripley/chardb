import { Card, Paper } from "@mui/material"
import styled from "styled-components"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined"
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone"
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined"
import TagIcon from "@mui/icons-material/Tag"
import { PokemonClient } from "pokenode-ts"
import { useEffect, useState } from "react"
import axios from "axios"

interface Props {
  query: Record<string, any>
}

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  background: white !important;
`

const StyledPaper = styled(Paper)`
  background-color: white;
  display: flex;
  max-width: 100%;
  width: 100%;
  justify-content: center;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
`

const CardWrapper = styled.div`
  width: 20%;
  padding: 20px 30px;
  height: 500px;
`

const Image = styled.div`
  background: #0f1a1b;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #0f1a1b;

  &:hover {
    background: rgba(14, 26, 27, 0.9);
  }
`

const Details = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const Row = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Icon = styled.div`
  display: flex;
  width: 15%;
  justify-content: flex-start;
`

const Data = styled.div`
  display: flex;
  width: 60%;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  text-transform: capitalize;
`

const Id = styled.div`
  color: white;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  padding-top: 30px;
  font-size: 1.5rem;
`

export const PokemonCard = (props: Props) => {
  const [data, setData] = useState<Record<string, any>>({})
  // const [edit, setEdit] = useState(false)

  // const iconTypes = {
  //   water: "primary",
  //   fire: "warning",
  //   grass: "success",
  //   normal: "action",
  //   psychic: "secondary",
  // }

  useEffect(() => {
    props.query.map(async (query: Record<string, any>) => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${query.name}`
        )
        const data = response.data
        console.log("### response: ", response)
        setData({
          img: data.sprites.front_default,
          name: data.name,
          id: data.id,
        })
      } catch (error) {
        console.error(error)
      }
    })
  }, [])

  console.log("### data: ", data?.img)

  // const fetchPokemon = async () => {
  //   const api = new PokemonClient()

  //   await api
  //     .getPokemonByName(props.query.name)
  //     .then((data) => console.log(data.name))
  //     .catch((error) => console.error(error))
  // }

  return (
    <Container>
      <StyledPaper
        elevation={0}
        style={{ backgroundColor: "white", maxWidth: "100%" }}
      >
        {props.query.map((query: Record<string, any>) => (
          <CardWrapper>
            <Card
              sx={{
                minWidth: 275,
                backgroundColor: "white",
                borderRadius: 15,
                height: "100%",
              }}
              variant="elevation"
              raised
            >
              <Image>
                <Card
                  sx={{
                    width: 150,
                    height: 150,
                    background: "white",
                    borderRadius: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: "revert",
                  }}
                >
                  <img
                    src={data.img}
                    style={{
                      width: 150,
                      height: 150,
                    }}
                  />
                </Card>
                <Id>{`# ${data.id}`}</Id>
              </Image>
              <Details>
                <Row>
                  <Icon>
                    <PermIdentityOutlinedIcon />
                  </Icon>
                  <Data>{query.name}</Data>
                </Row>
                <Row>
                  <Icon>
                    <CatchingPokemonTwoToneIcon />
                  </Icon>
                  <Data>{query.type}</Data>
                </Row>
                <Row>
                  <Icon>
                    <FeaturedPlayListOutlinedIcon />
                  </Icon>
                  <Data>{query.set}</Data>
                </Row>
                <Row>
                  <Icon>
                    <TagIcon />
                  </Icon>
                  <Data>{query.year}</Data>
                </Row>
              </Details>
            </Card>
          </CardWrapper>
        ))}
      </StyledPaper>
    </Container>
  )
}

import { Card } from "@mui/material"
import React from "react"
import styled from "styled-components"
import { Theme } from "../../Theme"

const Wrapper = styled.div`
  max-height: 100%;
  max-width: 100%;
  padding: 30px 30px;
  position: relative;
  z-index: 2;
`

const Images = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  height: auto;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const Image = styled.img`
  display: flex;
  height: 150px;
  width: 150px;
  padding: 20px;
`

const Header = styled.div`
  display: flex;
  width: 100%;
  font-weight: 800;
  font-family: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa,
    Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri,
    source-sans-pro, sans-serif;
  color: ${Theme.primaryText};
  font-size: 30px;
  justify-content: center;
  padding: 20px 0px;
  margin-bottom: 20px;
  padding-top: 0px;
}
`

export const PokedexBody = () => {
  let allPokemonImgs: string[] = []

  const getAllPokemonImgs = () => {
    // 802 Pokemon with images available
    for (var i = 1; i <= 802; i++) {
      allPokemonImgs.push(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`
      )
    }
  }
  getAllPokemonImgs()

  return (
    <Wrapper>
      <Header>Pokédex</Header>
      <Images>
        {allPokemonImgs.map((image, index) => (
          <Card
            sx={{
              height: 200,
              width: 200,
              padding: "2rem",
              margin: "1rem",
              backgroundColor: Theme.lightBg,
              borderRadius: "15px",
              // borderTopLeftRadius: "45% 50%",
              // borderTopRightRadius: "95% 60%",
              // borderBottomLeftRadius: "45% 70%",
              // borderBottomRightRadius: "95% 60%",
              boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px",
              transition: "all 0.8s !important",
              ":hover": {
                padding: "1.8em",
                boxShadow: `0px 0px 10px 5px #ff8c00 , 0px 0px 0px 0px #ffffff`,
              },
            }}
            variant="elevation"
            raised
          >
            <Image key={index} src={image} alt="image" />
          </Card>
        ))}
      </Images>
    </Wrapper>
  )
}

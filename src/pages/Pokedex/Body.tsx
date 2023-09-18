import { Card } from "@mui/material"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Theme } from "../../Theme"
import { PokedexModal } from "../../components/PokedexModal"

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pokedex, setPokedex] = useState([{}])
  const [images, setImages] = useState<string[]>([])

  const onClose = () => setIsModalOpen(!isModalOpen)

  const onOpen = async (index: number) => {
    setIsModalOpen(!isModalOpen)

    let pokedex: Record<string, any>[] = [{}]
    index++
    await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
      .then((response) => response.json())
      .then((data) => {
        pokedex.push({
          name: data.name,
          id: data.id,
          height: data.height,
          weight: data.weight,
          types: data.types.map((type: Record<string, any>) =>
            Object.values(type.type)
          ),
          abilities: data.abilities.map((ability: Record<string, any>) =>
            Object.values(ability.ability)
          ),
          sprites: {
            front: data.sprites.front_default,
            back: data.sprites.back_default,
          },
          data: { ...data },
        })
      })

    setPokedex(pokedex)
    return pokedex
  }

  useEffect(() => {
    const getAllPokemonImgs = () => {
      let allPokemonImgs: string[] = []
      // 802 Pokemon with images available
      for (var i = 1; i <= 802; i++) {
        allPokemonImgs.push(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`
        )
      }
      setImages(allPokemonImgs)
    }

    getAllPokemonImgs()
  }, [])

  // data we want
  /*
  
    abilities = data.abilities.map.name
    height = data.height
    height = data.weight
    id = data.id
    sprites = data.sprites.front_default && back_default
    types = data.types.map
  
  */

  return (
    <Wrapper>
      <Header>Pokédex</Header>
      <Images>
        {images.map((image, index) => (
          <Card
            sx={{
              height: 200,
              width: 200,
              padding: "2rem",
              margin: "1rem",
              backgroundColor: Theme.lightBg,
              borderRadius: "15px",
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
            <Image
              key={index}
              src={image}
              alt="image"
              onClick={() => onOpen(index)}
            />
          </Card>
        ))}
      </Images>
      <PokedexModal
        pokemon={pokedex}
        openModal={isModalOpen}
        closeModal={onClose}
      />
    </Wrapper>
  )
}

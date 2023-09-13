import { doc, setDoc } from "firebase/firestore"
import { firestore } from "../../services/firebase"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

export const AddCardMutation = async (
  name: string,
  type: string,
  set: string,
  year: string,
  quantity: string,
  attribute: string
) => {
  const uniqueId = uuidv4()

  // fetch pokemon blob from pokeapi
  const fetchPokemon = async (pokemon: string) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    )
    return response.data
  }

  const pokemon = await fetchPokemon(name)

  // fetch evolution chain url from pokeapi
  const fetchEvolutionChainUrl = async (pokemon: string) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
    )

    const chainUrl = await response.data.evolution_chain
    return chainUrl
  }

  const chainUrl = await fetchEvolutionChainUrl(name)

  // fetch evolution chain from pokeapi
  const fetchEvolutionChain = async () => {
    const response = await axios.get(`${chainUrl.url}`)

    return response.data
  }

  const chain = await fetchEvolutionChain()

  // Getting id for displaying evolved Pokemon url
  // INPUT 'str' example: 'https://pokeapi.co/api/v2/pokemon-species/121/'
  // OUTPUT: 'str' id example: '121'
  const getImageId = (urlStr?: string) => {
    if (!urlStr) return null

    let regex = /[^v]\d/ // looking for a number that doesn't with a 'v' before it,
    let searchIdx = urlStr.search(regex) // gives index position
    // grabbing the numbers inbetween the forward slashes
    let evoId = urlStr.slice(searchIdx + 1, -1)
    return evoId
  }

  const firstEvolution = chain.chain.species
  const secondEvolution = chain.chain.evolves_to?.[0]?.species
  const thirdEvolution = chain.chain.evolves_to?.[0]?.evolves_to?.[0]?.species

  const evolutionChainObj = {
    first: {
      id: getImageId(firstEvolution.url),
      name: firstEvolution.name ?? "",
      url: firstEvolution.url ?? "",
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getImageId(
        firstEvolution.url
      )}.png`,
    },
    second: {
      id: getImageId(secondEvolution?.url) ?? "",
      name: secondEvolution?.name ?? "",
      url: secondEvolution?.url ?? "",
      image: getImageId(secondEvolution?.url)
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getImageId(
            secondEvolution.url
          )}.png`
        : "",
    },
    third: {
      id: getImageId(thirdEvolution?.url) ?? "",
      name: thirdEvolution?.name ?? "",
      url: thirdEvolution?.url ?? "",
      image: getImageId(thirdEvolution?.url)
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getImageId(
            thirdEvolution.url
          )}.png`
        : "",
    },
  }

  const typeColours: Record<string, any> = {
    normal: "#a8a878",
    fire: "#f08030",
    water: "#6790f0",
    grass: "#78c84f",
    electric: "#f9cf30",
    ice: "#98d8d8",
    fighting: "#c03028",
    poison: "#9f40a0",
    ground: "#e0c068",
    flying: "#a890f0",
    psychic: "#f85888",
    bug: "#a8b720",
    rock: "#b8a039",
    ghost: "#705898",
    dragon: "#7038f8",
    dark: "#705848",
    steel: "#b8b8d0",
    fairy: "#f0b6bc",
  }

  const colour = typeColours[type] ?? "#a8a878"

  console.log("colour", colour)

  await setDoc(doc(firestore, "cards", uniqueId), {
    cardId: uniqueId,
    id: pokemon.id,
    chainId: chain.id,
    evolutionChain: { ...evolutionChainObj },
    name,
    type,
    set,
    year,
    colour,
    quantity,
    attribute,
    url: {
      front: pokemon.sprites.front_default,
      back: pokemon.sprites.back_default,
    },
  })
}

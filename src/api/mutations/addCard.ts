import { doc, setDoc } from "firebase/firestore"
import { firestore } from "../../services/firebase"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { Theme } from "../../Theme"

export const AddCardMutation = async (
  name: string,
  type: string,
  set: string,
  setNumber: string,
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
    const response = await axios.get(`${chainUrl?.url}`)

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
      image: firstEvolution.name
        ? `https://img.pokemondb.net/sprites/home/normal/${firstEvolution.name}.png`
        : "",
    },
    second: {
      id: getImageId(secondEvolution?.url) ?? "",
      name: secondEvolution?.name ?? "",
      url: secondEvolution?.url ?? "",
      image: secondEvolution?.name
        ? `https://img.pokemondb.net/sprites/home/normal/${secondEvolution.name}.png`
        : "",
    },
    third: {
      id: getImageId(thirdEvolution?.url) ?? "",
      name: thirdEvolution?.name ?? "",
      url: thirdEvolution?.url ?? "",
      image: thirdEvolution?.name
        ? `https://img.pokemondb.net/sprites/home/normal/${thirdEvolution.name}.png`
        : "",
    },
  }

  const colour = Theme.typeColours[type] ?? Theme.typeColours.normal

  await setDoc(doc(firestore, "cards", uniqueId), {
    cardId: uniqueId,
    id: pokemon.id,
    chainId: chain.id,
    evolutionChain: { ...evolutionChainObj },
    name,
    type,
    set,
    setNumber,
    year,
    colour,
    quantity,
    attribute,
    url: {
      front: `https://img.pokemondb.net/sprites/home/normal/${name}.png`,
      back: pokemon.sprites.back_default,
    },
  })
}

import axios from "axios"
import { doc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"
import { firestore } from "../../services/firebase"
import { AllPokemon } from "../queries/allPokemon"

export const AddPokemonMutation = async (name: string) => {
  const uuid = uuidv4()
  const currentPokemonDb = await AllPokemon()
  const pokemonRef = doc(firestore, "pokemon", "data")

  const hyphenatedPokemonNames = [
    "deoxys-normal",
    "shaymin-land",
    "giratina-altered",
    "wormadam-plant",
  ]

  // check if pokemon already exists in db
  if (currentPokemonDb && Object.keys(currentPokemonDb).includes(name)) return

  // check if pokemon name is in hyphenated array
  if (hyphenatedPokemonNames.includes(name)) return

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    )
    const { data } = response

    // fetch evolution chain url from pokeapi
    const chainUrl = await fetchEvolutionChainUrl(data.name)

    // fetch evolution chain from pokeapi
    const chain = await fetchEvolutionChain(chainUrl.url)

    const firstEvolution = chain.chain.species
    const secondEvolution = chain.chain.evolves_to?.[0]?.species
    const thirdEvolution = chain.chain.evolves_to?.[0]?.evolves_to?.[0]?.species

    const evolutionChainObj = {
      first: {
        name: firstEvolution.name ?? "",
        image: firstEvolution.name
          ? `https://img.pokemondb.net/sprites/home/normal/${firstEvolution.name}.png`
          : "",
      },
      second: {
        name: secondEvolution?.name ?? "",
        image: secondEvolution?.name
          ? `https://img.pokemondb.net/sprites/home/normal/${secondEvolution.name}.png`
          : "",
      },
      third: {
        name: thirdEvolution?.name ?? "",
        image: thirdEvolution?.name
          ? `https://img.pokemondb.net/sprites/home/normal/${thirdEvolution.name}.png`
          : "",
      },
    }

    // pokemon obj to write
    const pokemon = {
      pokemonId: uuid,
      name: data.name,
      id: data.id,
      type: data.types[0]?.type.name,
      image: `https://img.pokemondb.net/sprites/home/normal/${data.name}.png`,
      evolutions: { ...evolutionChainObj },
    }

    // write to db
    try {
      setDoc(pokemonRef, { [pokemon.name]: { ...pokemon } }, { merge: true })
    } catch (e) {
      console.error("Error adding the pokemon to the db: ", e)
    }
  } catch (error) {
    console.error("Error fetching pokemon data:", error)
  }
}

const fetchEvolutionChainUrl = async (name: string) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`
  )
  const chainUrl = await response.data.evolution_chain
  return chainUrl
}

const fetchEvolutionChain = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

import axios from "axios"
import { doc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"
import { firestore } from "../../services/firebase"
import { AllPokemon } from "../queries/allPokemon"

export const AddPokemonMutation = async () => {
  const uniqueId = uuidv4()

  const currentPokemonDb = await AllPokemon()

  const hyphenatedPokemonNames = [
    "deoxys-normal",
    "shaymin-land",
    "giratina-altered",
    "wormadam-plant",
  ]

  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=500"
    )
    const { results } = response.data
    const pokemonDetailsPromises = results.map((result: any) =>
      axios.get(result.url)
    )

    const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises)

    const allPokemon = pokemonDetailsResponses.map((response: any) => {
      const { data } = response
      const { name } = data

      if (hyphenatedPokemonNames.includes(data.name)) return {}

      return {
        name,
        image: `https://img.pokemondb.net/sprites/home/normal/${name}.png`,
      }
    })

    for (const pokemon of allPokemon) {
      if (!pokemon.name) continue

      // fetch pokemon blob from pokeapi
      const pokemonData = await fetchPokemon(pokemon.name)

      // fetch evolution chain url from pokeapi
      const chainUrl = await fetchEvolutionChainUrl(pokemon.name)

      // fetch evolution chain from pokeapi
      const chain = await fetchEvolutionChain(chainUrl.url)

      const firstEvolution = chain.chain.species
      const secondEvolution = chain.chain.evolves_to?.[0]?.species
      const thirdEvolution =
        chain.chain.evolves_to?.[0]?.evolves_to?.[0]?.species

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

      if (!currentPokemonDb.some((obj) => obj.name === pokemon.name)) {
        await setDoc(doc(firestore, "pokemon", uuidv4()), {
          pokemonId: uniqueId,
          id: pokemonData.id,
          evolutionChain: evolutionChainObj,
          name: pokemon.name,
          type: pokemonData.types[0]?.type.name,
          image: pokemon.image,
        })
      }
    }
  } catch (error) {
    console.error("Error fetching pokemon data:", error)
  }
}

const fetchPokemon = async (name: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  return response.data
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

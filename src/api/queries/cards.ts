import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../../services/firebase"
import axios from "axios"

export const Card = async (value?: string, category?: string) => {
  const ref = await collection(firestore, "cards")

  // return all cards with that category and value
  let tempSnapshots: Record<string, any>[] = []
  let snapshots: Record<string, any>[] = []

  const data =
    category && value
      ? await query(ref, where(category, "==", value))
      : await query(ref, where("name", "==", value))

  const res = await getDocs(data)
  console.log("res", res)

  await res?.forEach((doc: Record<string, any>) => {
    tempSnapshots.push({ cardId: doc.id, ...doc.data() })
  })

  console.log("tempSnapshots", tempSnapshots)
  await tempSnapshots.forEach((pokemon) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then((response) => {
        if (pokemon.name !== response.data.name) return null
        const pokemonData = {
          ...pokemon,
          cardId: pokemon.cardId,
          name: response.data.name,
          id: response.data.id,
          url: {
            front: response.data.sprites.front_default,
            back: response.data.sprites.back_default,
          },
        }

        console.log("pokemonData", pokemonData)
        snapshots.push({ ...pokemonData })
      })
  })

  console.log("snapshots card query", snapshots)

  return snapshots
}

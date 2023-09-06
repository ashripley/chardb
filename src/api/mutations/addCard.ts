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

  const axiosTest = async (pokemon: string) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    )
    return response.data
  }

  const pokemon = await axiosTest(name)

  await setDoc(doc(firestore, "cards", uniqueId), {
    cardId: uniqueId,
    id: pokemon.id,
    name,
    type,
    set,
    year,
    quantity,
    attribute,
    url: {
      front: pokemon.sprites.front_default,
      back: pokemon.sprites.back_default,
    },
  })
}

// also add fields for quantity, holo, special

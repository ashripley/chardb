import { doc, updateDoc, deleteField } from "firebase/firestore"
import { firestore } from "../../services/firebase"

export const DeletePokemonMutation = async (name: string) => {
  const pokemonRef = doc(firestore, "pokemon", "data")

  // remove data from db
  try {
    // Remove the field in the data document that matches the name passed in
    await updateDoc(pokemonRef, {
      [name]: deleteField(),
    })
  } catch (e) {
    console.error("Error removing the pokemon from the db: ", e)
  }
}

import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../../services/firebase"

export const AllPokemon = async () => {
  const docRef = doc(firestore, "pokemon", "data")
  const docSnap = await getDoc(docRef)

  const result = docSnap.data() || {}

  return result
}

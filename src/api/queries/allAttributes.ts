import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../../services/firebase"

export const AllAttributes = async () => {
  const docRef = doc(firestore, "attributes", "data")
  const docSnap = await getDoc(docRef)

  const result = docSnap.data() || {}

  return result
}

import { doc, updateDoc } from "firebase/firestore"
import { firestore } from "../../services/firebase"

export const UpdateCard = async (
  cardId: string,
  name: string,
  type: string,
  set: string,
  year: string
) => {
  const docRef = doc(firestore, "cards", cardId)

  let alertText = ""

  const data = {
    name,
    type,
    set,
    year,
  }

  updateDoc(docRef, data)
    .then((docRef) => {
      alertText = `Fields for ${name} have been updated`
      return alertText
    })
    .catch((error) => {
      return error
    })

  return
}

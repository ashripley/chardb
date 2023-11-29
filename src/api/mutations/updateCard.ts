import { doc, updateDoc } from "firebase/firestore"
import { firestore } from "../../services/firebase"

export const UpdateCard = async (
  cardId: string,
  name: string,
  type: string,
  set: string,
  setNumber: string,
  year: string,
  quantity: string,
  attribute: string,
  colour: string
) => {
  const docRef = doc(firestore, "cards", cardId)

  let alertText = ""

  const data = {
    name,
    type,
    set,
    setNumber,
    year,
    quantity,
    attribute,
    colour,
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

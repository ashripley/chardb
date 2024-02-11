import axios from "axios"
import { doc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"
import { theme } from "../../theme"
import { firestore } from "../../services/firebase"

export const AddSetMutation = async (name: string, totalCards: number) => {
  const uniqueId = uuidv4()

  await setDoc(doc(firestore, "sets", uniqueId), {
    setId: uniqueId,
    name,
    totalCards,
  })
}

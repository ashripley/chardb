import { doc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"
import { firestore } from "../../services/firebase"

export const AddTypeMutation = async (name: string, colour: string) => {
  const uniqueId = uuidv4()

  await setDoc(doc(firestore, "types", uniqueId), {
    typeId: uniqueId,
    name,
    colour,
  })
}

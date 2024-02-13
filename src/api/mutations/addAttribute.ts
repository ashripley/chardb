import { doc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"
import { firestore } from "../../services/firebase"

export const AddAttributeMutation = async (name: string) => {
  const uniqueId = uuidv4()

  await setDoc(doc(firestore, "attributes", uniqueId), {
    attributeId: uniqueId,
    name,
  })
}

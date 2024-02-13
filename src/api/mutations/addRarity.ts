import { doc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"
import { firestore } from "../../services/firebase"

export const AddRarityMutation = async (name: string) => {
  const uniqueId = uuidv4()

  await setDoc(doc(firestore, "rarities", uniqueId), {
    rarityId: uniqueId,
    name,
  })
}

import { doc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"
import { firestore } from "../../services/firebase"

export const AddAttributeMutation = async (
  attribute: string,
  attributeObj: Record<string, any>
) => {
  console.log("add att mutation")
  const uuid = uuidv4()
  const attributeRef = doc(firestore, "attributes", "data")

  try {
    // attribute obj to write
    const data = {
      attributeId: uuid,
      attribute,
      ...attributeObj,
    }

    // write to db
    setDoc(
      attributeRef,
      { [`${attribute}_${attributeObj.name}`]: { ...data } },
      { merge: true }
    )
  } catch (error) {
    console.error("Error adding attribute to db:", error)
  }
}

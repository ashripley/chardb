import { collection, doc } from "firebase/firestore"
import { useFirestoreDocumentDeletion } from "@react-query-firebase/firestore"
import { firestore } from "../../services/firebase"

export const DeleteCard = (cardId: string) => {
  console.log("id: ", cardId)
  const ref = doc(collection(firestore, "cards"), cardId)
  const mutation = useFirestoreDocumentDeletion(ref)

  mutation.mutate()

  mutation.isError && console.error(mutation.error.message)
}

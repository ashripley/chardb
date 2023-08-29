import { collection } from "firebase/firestore"
import React from "react"
import { firestore } from "../../services/firebase"
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore"

export const MutateCard = async (
  name: string,
  type: string,
  set: string,
  year?: string
) => {
  const ref = collection(firestore, "cards")
  const mutation = useFirestoreCollectionMutation(ref)

  await mutation.mutate({
    name,
    type,
    set,
    year,
  })

  mutation.isError && console.log(mutation.error.message)

  return
}

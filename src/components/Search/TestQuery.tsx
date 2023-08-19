import {
  useFirestoreQuery,
  useFirestoreQueryData,
} from "@react-query-firebase/firestore"
import { collection } from "firebase/firestore"
import React from "react"
import { firestore } from "../../services/firebase"

export const FetchQuery = () => {
  const collectionQuery = useFirestoreQuery(
    ["cards"],
    collection(firestore, "cards"),
    {
      subscribe: true,
    }
  )

  if (collectionQuery.isLoading) {
    return <div>Loading...</div>
  }

  console.log("### collectionQuery: ", collectionQuery)

  const snapshot = collectionQuery.data

  return (
    <>
      {snapshot!.docs.map((doc) => {
        const data = doc.data()

        return (
          <>
            <div key={doc.id}>{data.name}</div>
            <div key={doc.id}>{data.type}</div>
            <div key={doc.id}>{data.set}</div>
            <div key={doc.id}>{data.year}</div>
          </>
        )
      })}
    </>
  )
}

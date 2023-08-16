import { collection, getDocs, query, where } from "firebase/firestore"
import React from "react"
import { firestore } from "../services/firebase"

export const QueryName = async (name: string) => {
  const ref = await collection(firestore, "cards")

  const res = await query(ref, where("name", "==", name))

  const snapshot = await getDocs(res)

  return snapshot
}

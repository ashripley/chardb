import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../services/firebase"
import { useState } from "react"

export const QueryCard = async (name: string) => {
  const cardsRef = collection(firestore, "cards")
  const [error, setError] = useState(false)

  const q = query(cardsRef, where("name", "==", name))

  const querySnapshot = await getDocs(q)

  if (querySnapshot) {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data())
    })
  } else {
    setError(true)
  }
}

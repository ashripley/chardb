import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../services/firebase"
import { useState } from "react"

// export const QueryCard = async (name: string) => {
//   const cardsRef = collection(firestore, "cards")
//   const [error, setError] = useState(false)

//   const q = query(cardsRef, where("name", "==", name))

//   const querySnapshot = await getDocs(q)

//   if (querySnapshot) {
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data())
//     })
//   } else {
//     setError(true)
//   }
// }

// if category and value is false = return all cards
// if category is true and value is false = return all cards with that category
// if category is false and value is true = return all cards with that value (name)

export const QueryCards = async (value?: string, category?: string) => {
  const ref = await collection(firestore, "cards")

  if (!category && !value) {
    // return all cards
    const res = await query(ref)
    const snapshot = await getDocs(res)

    return snapshot
  }

  if (category && value) {
    // return all cards with that category and value
    const res = await query(ref, where(category, "==", value))

    const snapshot = await getDocs(res)

    return snapshot
  }

  if (!category && value) {
    // return all cards with that value
    const res = await query(ref, where("name", "==", value))

    const snapshot = await getDocs(res)

    return snapshot
  }
}

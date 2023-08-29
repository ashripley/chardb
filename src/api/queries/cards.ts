import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../../services/firebase"

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

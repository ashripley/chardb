import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../../services/firebase"

export const Card = async (value?: string, category?: string) => {
  console.log("value", value)
  console.log("category", category)
  let snapshots: Record<string, any>[] = []

  const ref = await collection(firestore, "cards")
  const data =
    category && value
      ? await query(ref, where(category.toLowerCase(), "==", value))
      : await query(ref, where("name", "==", value))

  console.log("data", data)
  const res = await getDocs(data)

  if (res.empty) return null

  console.log("res", res)

  await res?.forEach((doc: Record<string, any>) => {
    snapshots.push({ cardId: doc.id, ...doc.data() })
  })

  return snapshots
}

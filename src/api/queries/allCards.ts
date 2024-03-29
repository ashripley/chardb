import { collection, getDocs, query } from "firebase/firestore"
import { firestore } from "../../services/firebase"

export const AllCards = async () => {
  let snapshot: Record<string, any>[] = []

  const ref = await collection(firestore, "cards")
  const data = await query(ref)
  const res = await getDocs(data)

  await res?.forEach((doc: Record<string, any>) => {
    snapshot.push({ ...doc.data() })
  })

  return snapshot
}

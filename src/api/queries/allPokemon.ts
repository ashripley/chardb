import { collection, getDocs, query } from "firebase/firestore"
import { firestore } from "../../services/firebase"

export const AllPokemon = async () => {
  let snapshot: Record<string, any>[] = []

  const ref = await collection(firestore, "pokemon")
  const data = await query(ref)
  const res = await getDocs(data)

  await res?.forEach((doc: Record<string, any>) => {
    snapshot.push({ ...doc.data() })
  })

  return snapshot
}
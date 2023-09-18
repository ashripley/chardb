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

export const fetchKantoPokemon = async () => {
  let pokedex: Record<string, any>[] = []

  for (var i = 1; i <= 151; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((response) => response.json())
      .then((data) => {
        pokedex.push({
          name: data.name,
          id: data.id,
          height: data.height,
          weight: data.weight,
          types: data.types.map((type: Record<string, any>) =>
            Object.values(type.type)
          ),
          abilities: data.abilities.map((ability: Record<string, any>) =>
            Object.values(ability.ability)
          ),
          sprites: {
            front: data.sprites.front_default,
            back: data.sprites.back_default,
          },
          data: { ...data },
        })
      })

    return res
  }

  console.log("pokedex", pokedex)
  return pokedex
}

// let allPokemonImgs: Record<string, any>[] = []

// const getAllPokemonImgs = () => {
//   // 802 Pokemon with images available
//   for (var i = 1; i <= 802; i++) {
//     allPokemonImgs.push({
//       [i]: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
//     })
//   }
// }
// getAllPokemonImgs()

// console.log("allPokemonImgs", allPokemonImgs)

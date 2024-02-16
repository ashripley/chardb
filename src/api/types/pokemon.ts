export type Pokemon = {
  pokemonId: string
  name: string
  id: number
  type: string
  evolutionChain: {
    first: {
      name: string
      image: string
    }
    second?: {
      name: string
      image: string
    }
    third?: {
      name: string
      image: string
    }
  }
  image: string
}[]

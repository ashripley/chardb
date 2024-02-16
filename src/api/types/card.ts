export type Card = {
  cardId: string
  name: string
  id: number
  type: {
    name: string
    colour: string
  }
  typeOfCard: string
  set: {
    name: string
    totalCards: number
  }
  setNumber: number
  rarity: string
  grading: {
    isGraded: boolean
    grading: string | null
  }
  condition: string
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

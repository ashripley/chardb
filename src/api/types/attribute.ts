export type Attribute = {
  type: {
    typeId: string
    name: string
    colour: string
  }
  typeOfCard: {
    typeOfCardId: string
    name: string
  }
  set: {
    setId: string
    name: string
    totalCards: string
  }
  rarity: {
    rarityId: string
    name: string
  }
  condition: {
    conditionId: string
    name: string
  }
}[]

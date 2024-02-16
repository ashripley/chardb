import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  FilterViewType,
  CardViewType,
  PageType,
  isMobile,
  DbType,
} from "../helpers/view"
import { Card } from "../api/types/card"
import { Pokemon } from "../api/types/pokemon"
import { Attribute } from "../api/types/attribute"

interface StoreState {
  page: string
  isMenuOpen: boolean
  isDataLoading: boolean
  cardView: CardViewType
  cardField: Record<string, any>
  filterView: FilterViewType
  dbType: DbType

  pokemonData: Record<string, any>
  attributeData: Record<string, any>
  cardData: Record<string, any>

  tempSets: Record<string, any>
  tempPokemonTypes: Record<string, any>
  tempCardTypes: Record<string, any>
  tempRarities: Record<string, any>
  tempConditions: Record<string, any>
}

const initialState: StoreState = {
  page: "Home",
  isMenuOpen: false,
  isDataLoading: false,
  cardField: {
    key: "",
    value: "",
  },
  cardView: isMobile ? "Tile" : "Grid",
  filterView: "id",
  dbType: "char",

  cardData: {},
  pokemonData: {},
  attributeData: {},

  tempSets: {},
  tempPokemonTypes: {},
  tempCardTypes: {},
  tempRarities: {},
  tempConditions: {},
}

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<StoreState["page"]>) => {
      state.page = action.payload
    },
    setMenuStatus: (state, action: PayloadAction<StoreState["isMenuOpen"]>) => {
      state.isMenuOpen = action.payload
    },
    setIsDataLoading: (
      state,
      action: PayloadAction<StoreState["isDataLoading"]>
    ) => {
      state.isDataLoading = action.payload
    },
    setCardData: (state, action: PayloadAction<StoreState["cardData"]>) => {
      state.cardData = action.payload
    },
    setAttributeData: (
      state,
      action: PayloadAction<StoreState["attributeData"]>
    ) => {
      state.tempSets = Object.values(action.payload).filter(
        (val) => val.attribute == "set"
      )
      state.tempPokemonTypes = Object.values(action.payload).filter(
        (val) => val.attribute == "pokemonType"
      )
      state.tempCardTypes = Object.values(action.payload).filter(
        (val) => val.attribute == "cardType"
      )
      state.tempRarities = Object.values(action.payload).filter(
        (val) => val.attribute == "rarity"
      )
      state.tempConditions = Object.values(action.payload).filter(
        (val) => val.attribute == "condition"
      )
      state.attributeData = action.payload
    },
    setPokemonData: (
      state,
      action: PayloadAction<StoreState["pokemonData"]>
    ) => {
      if (action.payload) state.pokemonData = action.payload
    },
    setCardField: (state, action: PayloadAction<Record<string, any>>) => {
      state.cardField = action.payload
    },
    setCardView: (state, action: PayloadAction<StoreState["cardView"]>) => {
      state.cardView = action.payload
    },
    setFilterView: (state, action: PayloadAction<StoreState["filterView"]>) => {
      state.filterView = action.payload
    },
    setDbType: (state, action: PayloadAction<StoreState["dbType"]>) => {
      state.dbType = action.payload
    },
    updatePokemonData: (
      state,
      action: PayloadAction<StoreState["pokemonData"]>
    ) => {
      state.pokemonData = { ...state.pokemonData, ...action.payload }
    },
    updateSets: (state, action: PayloadAction<StoreState["tempSets"]>) => {
      state.tempSets.push(action.payload)
    },
    updateCardTypes: (
      state,
      action: PayloadAction<StoreState["tempCardTypes"]>
    ) => {
      state.tempCardTypes.push(action.payload)
    },
    updatePokemonTypes: (
      state,
      action: PayloadAction<StoreState["tempPokemonTypes"]>
    ) => {
      state.tempPokemonTypes.push(action.payload)
    },
    updateRarities: (
      state,
      action: PayloadAction<StoreState["tempRarities"]>
    ) => {
      state.tempRarities.push(action.payload)
    },
    updateConditions: (
      state,
      action: PayloadAction<StoreState["tempConditions"]>
    ) => {
      state.tempConditions.push(action.payload)
    },
    updateAttributeData: (
      state,
      action: PayloadAction<StoreState["attributeData"]>
    ) => {
      state.attributeData = { ...state.attributeData, ...action.payload }
    },
    updateCardData: (state, action: PayloadAction<StoreState["cardData"]>) => {
      state.cardData = { ...state.cardData, ...action.payload }
    },
  },
})

export const {
  setPage,
  setMenuStatus,
  setCardView,
  setFilterView,
  setIsDataLoading,
  setCardData,
  setAttributeData,
  setPokemonData,
  setCardField,
  setDbType,
  updateCardData,
  updatePokemonData,
  updateAttributeData,
  updateSets,
  updateCardTypes,
  updatePokemonTypes,
  updateRarities,
  updateConditions,
} = rootSlice.actions

export default rootSlice.reducer

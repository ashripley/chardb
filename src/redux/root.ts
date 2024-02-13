import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  FilterViewType,
  CardViewType,
  PageType,
  isMobile,
  DbType,
} from "../helpers/view"

interface StoreState {
  page: string
  isMenuOpen: boolean
  isDataLoading: boolean
  cardData: Record<string, any>[]
  setData: Record<string, any>[]
  attributeData: Record<string, any>[]
  typeData: Record<string, any>[]
  rarityData: Record<string, any>[]
  pokemonData: Record<string, any>[]
  cardView: CardViewType
  cardField: Record<string, any>
  filterView: FilterViewType
  dbType: DbType
}

const initialState: StoreState = {
  page: "Home",
  isMenuOpen: false,
  isDataLoading: false,
  cardData: [{}],
  setData: [{}],
  attributeData: [{}],
  typeData: [{}],
  rarityData: [{}],
  pokemonData: [{}],
  cardField: {
    key: "",
    value: "",
  },
  cardView: isMobile ? "Tile" : "Grid",
  filterView: "id",
  dbType: "char",
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
    setSetData: (state, action: PayloadAction<StoreState["setData"]>) => {
      state.setData = action.payload
    },
    setAttributeData: (
      state,
      action: PayloadAction<StoreState["attributeData"]>
    ) => {
      state.attributeData = action.payload
    },
    setTypeData: (state, action: PayloadAction<StoreState["typeData"]>) => {
      state.typeData = action.payload
    },
    setRarityData: (state, action: PayloadAction<StoreState["rarityData"]>) => {
      state.rarityData = action.payload
    },
    setPokemonData: (
      state,
      action: PayloadAction<StoreState["pokemonData"]>
    ) => {
      state.pokemonData = action.payload
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
  },
})

export const {
  setPage,
  setMenuStatus,
  setCardView,
  setFilterView,
  setIsDataLoading,
  setCardData,
  setSetData,
  setAttributeData,
  setTypeData,
  setRarityData,
  setPokemonData,
  setCardField,
  setDbType,
} = rootSlice.actions

export default rootSlice.reducer

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
      console.log("action.payload", action.payload)
      state.isMenuOpen = action.payload
      console.log("state.isMenuOpen", state.isMenuOpen)
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
  setCardField,
  setDbType,
} = rootSlice.actions

export default rootSlice.reducer

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FilterViewType, CardViewType } from "../helpers/view"

interface StoreState {
  page: string
  isMenuOpen: boolean
  isDataLoading: boolean
  cardData: Record<string, any>[]
  cardView: CardViewType
  cardField: Record<string, any>
  filterView: FilterViewType
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
  cardView: "Grid",
  filterView: "id",
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
      console.log("isDataLoading")
      console.log("action.payload", action.payload)
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
} = rootSlice.actions

export default rootSlice.reducer

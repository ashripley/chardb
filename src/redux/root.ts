import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface StoreState {
  page: string
  isMenuOpen: boolean
  view: "Tile" | "Grid" | "List"
}

const initialState: StoreState = {
  page: "Home",
  isMenuOpen: false,
  view: "Grid",
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
    setView: (state, action: PayloadAction<StoreState["view"]>) => {
      state.view = action.payload
    },
  },
})

export const { setPage, setMenuStatus, setView } = rootSlice.actions

export default rootSlice.reducer

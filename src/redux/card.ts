import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface StoreState {
  hasCardError: boolean
  isCardOpen: boolean
  isAddModalOpen: boolean
  isMainLoading: boolean
  isPokemonCardLoading: boolean
  isAnalyticsOpen: boolean
  isConfirmationModalOpen: boolean
  isReadyForDeletion: boolean
  isToastAddModalOpen: boolean
  confirmationModalAlert: string
  addModalAlert: string
  icon: string
  pokemonToBeDeleted: Record<string, any>
  data: Record<string, any>[]
  fields: Record<string, any>
}

const initialState: StoreState = {
  hasCardError: false,
  isCardOpen: false,
  isAddModalOpen: false,
  isMainLoading: false,
  isPokemonCardLoading: false,
  isAnalyticsOpen: false,
  isConfirmationModalOpen: false,
  isReadyForDeletion: false,
  isToastAddModalOpen: false,
  confirmationModalAlert: "",
  addModalAlert: "add",
  icon: "add",
  pokemonToBeDeleted: {},
  data: [{}],
  fields: {
    name: "",
    type: "",
    set: "",
    setNumber: "",
    year: "",
    attribute: "",
    quantity: "",
  },
}

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setHasCardError: (state, action: PayloadAction<boolean>) => {
      state.hasCardError = action.payload
    },
    setIsCardOpen: (state, action: PayloadAction<boolean>) => {
      state.isCardOpen = action.payload
    },
    setIsAddModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddModalOpen = action.payload
    },
    setIsMainLoading: (state, action: PayloadAction<boolean>) => {
      state.isMainLoading = action.payload
    },
    setIsPokemonCardLoading: (state, action: PayloadAction<boolean>) => {
      state.isPokemonCardLoading = action.payload
    },
    setIsAnalyticsOpen: (state, action: PayloadAction<boolean>) => {
      state.isAnalyticsOpen = action.payload
    },
    setIsConfirmationModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfirmationModalOpen = action.payload
    },
    setIsReadyForDeletion: (state, action: PayloadAction<boolean>) => {
      state.isReadyForDeletion = action.payload
    },
    setIsToastAddModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isToastAddModalOpen = action.payload
    },
    setConfirmationModalAlert: (state, action: PayloadAction<string>) => {
      state.confirmationModalAlert = action.payload
    },
    setAddModalAlert: (state, action: PayloadAction<string>) => {
      state.addModalAlert = action.payload
    },
    setIcon: (state, action: PayloadAction<string>) => {
      state.icon = action.payload
    },
    setPokemonToBeDeleted: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.pokemonToBeDeleted = action.payload
    },
    setData: (state, action: PayloadAction<Record<string, any>[]>) => {
      state.data = action.payload
    },
    setFields: (state, action: PayloadAction<Record<string, any>>) => {
      state.fields = action.payload
    },
  },
})

export const {
  setHasCardError,
  setIsCardOpen,
  setIsAddModalOpen,
  setIsMainLoading,
  setIsPokemonCardLoading,
  setIsAnalyticsOpen,
  setIsConfirmationModalOpen,
  setIsReadyForDeletion,
  setIsToastAddModalOpen,
  setConfirmationModalAlert,
  setAddModalAlert,
  setIcon,
  setPokemonToBeDeleted,
  setData,
  setFields,
} = cardSlice.actions

export default cardSlice.reducer

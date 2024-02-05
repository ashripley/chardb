import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./root"
import cardReducer from "./card"

const store = configureStore({
  reducer: {
    root: rootReducer,
    card: cardReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type CardState = ReturnType<typeof store.getState>

export default store

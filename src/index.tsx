import React from "react"
import ReactDOM from "react-dom/client"
import reportWebVitals from "./reportWebVitals"
import "./index.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { Index } from "./pages/Index"
import { MobileModal } from "./components/MobileModal"
import store from "./redux/store"
import { Provider } from "react-redux"

const queryClient = new QueryClient()

export const isMobile = window.matchMedia(
  "only screen and (max-width: 60px)"
).matches

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Provider store={store}>
        {isMobile ? <MobileModal /> : <Index />}
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

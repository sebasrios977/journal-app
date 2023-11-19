import { RouterProvider } from "react-router-dom"
import { appRouter } from "./router/AppRouter"
import AppTheme from "./theme/AppTheme"
import { Provider } from "react-redux"
import { store } from "./store/store"

const JournalApp = () => {
  return (
    <Provider store={store}>
      <AppTheme>
        <RouterProvider router={appRouter} />
      </AppTheme>
    </Provider>
  )
}

export default JournalApp

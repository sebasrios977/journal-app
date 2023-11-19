import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import theme from "./theme"

const AppTheme = ({children}: any) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default AppTheme

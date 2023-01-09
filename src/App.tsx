import { ThemeProvider } from 'styled-components'
import { TransactionsProvider } from './context/TransactionContext'
import { HomeTrasaction } from './pages/Home_Transactions/Home'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionsProvider>
        <HomeTrasaction />
      </TransactionsProvider>
    </ThemeProvider>
  )
}

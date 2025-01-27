import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppTheme } from './theme/AppTheme.jsx'
import { Provider } from 'react-redux'
import { store } from './store'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppTheme>
        <SnackbarProvider
          maxSnack={3} // Número máximo de snackbars visibles al mismo tiempo
          anchorOrigin={{
            vertical: 'bottom', 
            horizontal: 'right', 
          }}
        >
          <App />
        </SnackbarProvider>
      </AppTheme>
    </Provider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppProvider from './Context/AppContext.tsx'
import { ThemeProvider } from './Context/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
    <AppProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
    </ThemeProvider>
    </AppProvider>
)

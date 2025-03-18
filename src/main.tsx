
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from 'next-themes'
import { DatabaseProvider } from './contexts/DatabaseContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <DatabaseProvider>
        <App />
      </DatabaseProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

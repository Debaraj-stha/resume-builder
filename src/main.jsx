import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider } from './provider/themeProvider.jsx'
import LayoutProvider from './provider/layoutProvider.jsx'
import { PaginationProvider } from './provider/paginationProvider.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import SupabaseProvider from './provider/supabaseProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <SupabaseProvider>
            <LayoutProvider>
              <PaginationProvider>
                <App />
              </PaginationProvider>
            </LayoutProvider>
          </SupabaseProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>

  </StrictMode>,
)

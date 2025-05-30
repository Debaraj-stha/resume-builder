import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider } from './provider/themeProvider.jsx'
import LayoutProvider from './provider/layoutProvider.jsx'
import { PaginationProvider } from './provider/paginationProvider.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import SupabaseProvider from './provider/supabaseProvider.jsx'
import DirectPDFWriterProvider from './provider/DirectPDFWriter.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <SupabaseProvider>
            <DirectPDFWriterProvider>
              <LayoutProvider>
                <PaginationProvider>
                  <App />
                </PaginationProvider>
              </LayoutProvider>
            </DirectPDFWriterProvider>
          </SupabaseProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>

  </StrictMode>,
)

// Hide loader after app mounts
window.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
});
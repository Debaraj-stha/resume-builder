import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { UserProvider } from './provider/userProvider.jsx'
import { ThemeProvider } from './provider/themeProvider.jsx'
import LayoutProvider from './provider/layoutProvider.jsx'
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider>
        <Router>
          <UserProvider>
            <LayoutProvider>
              <App />
            </LayoutProvider>
          </UserProvider>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)

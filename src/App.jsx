import './css//App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import GlobalStyle from './theme/global_styles'
import ErrorBoundary from './components/ErrorBoundary'
import AppRoutes from './components/AppRoutes'
import SEO from './components/SEO'
import TestingAccessBanner from './components/TestingAccessBanner'
import Analytics from './components/Analytics'
import './css/navbar.css'
import './css/premium-experience.css'



function App() {
  
  return (
    <>
      <GlobalStyle />
      <ErrorBoundary>
      <SEO />
      <Analytics />
      <Header></Header>
        <TestingAccessBanner />
        <AppRoutes/>
        <Footer />
      </ErrorBoundary>
       
    </>
  )
}

export default App

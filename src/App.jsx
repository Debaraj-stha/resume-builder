import './css//App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import GlobalStyle from './theme/global_styles'
import ErrorBoundary from './components/ErrorBoundary'
import AppRoutes from './components/AppRoutes'



function App() {
  
  return (
    <>
      <GlobalStyle />
      <ErrorBoundary>
      <Header></Header>
        <AppRoutes/>
        <Footer />
      </ErrorBoundary>
       
    </>
  )
}

export default App

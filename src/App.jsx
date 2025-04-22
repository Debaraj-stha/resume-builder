import './App.css'
import MyRoutes from './components/MyRoutes'
import Footer from './components/Footer'
import Header from './components/Header'
import GlobalStyle from './theme/global_styles'
import ErrorBoundary from './components/ErrorBoundary'


function App() {
  return (
    <>
      <GlobalStyle />
      <ErrorBoundary>
      <Header></Header>
        <MyRoutes></MyRoutes>
        <Footer />
      </ErrorBoundary>
       
    </>
  )
}

export default App

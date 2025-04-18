import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyRoutes from './components/MyRoutes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Container from './components/Container'
import Header from './components/Header'
import { StarAtCenter } from './components/Divider/StarAtCenter'
import CircleAtCenter from './components/Divider/CircleAtCenter'
import TextAtCenter from './components/Divider/TextAtCenter'
import { ScallopUpDivider } from './components/Divider/ScallopDiviider'
import { DividerWithStarBorder } from './components/Divider/TransparentDividers'
import Modal from './components/Modal'
import LayoutProvider from './provider/layoutProvider'
import GlobalStyle from './theme/global_styles'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFoound'

function App() {
  return (
    <>
      <GlobalStyle />
      <LayoutProvider>
        <Header></Header>
        <MyRoutes></MyRoutes>
        <Footer />

      </LayoutProvider>
    </>
  )
}

export default App

// LayoutWrapper.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import LayoutProvider from '../provider/layoutProvider'
import InPageLayoutLinks from './InPageLayoutLinks'

const LayoutWrapper = () => {
  return (
    <LayoutProvider>
      <InPageLayoutLinks/>
      <Outlet />
    </LayoutProvider>
  )
}

export default LayoutWrapper

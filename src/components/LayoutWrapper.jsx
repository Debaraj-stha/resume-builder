// LayoutWrapper.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import LayoutProvider from '../provider/layoutProvider'

const LayoutWrapper = () => {
  return (
    <LayoutProvider>
      <Outlet />
    </LayoutProvider>
  )
}

export default LayoutWrapper

import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { HeroSection } from '../components/HeroSection'
import { HeaderBar } from '../components/menu/HeaderBar' // Import your modified HeaderBar component

export const Layout = ({ children }) => {
  const location = useLocation()
  const params = useParams()

  // Check if it's the home page (you can modify the logic based on your route structure)
  const isHomePage = location.pathname === '/' && Object.keys(params).length === 0

  return (
    <>
      <div className="bg-white min-h-screen font-inter transition duration-1000 ease-in-out">
        {!isHomePage ? <HeaderBar /> : <HeroSection />}
        <div className="max-w-8xl  mx-auto px-4 lg:px-8 lg:pt-4">
          {children}
          {/* <Footer /> */}
        </div>
      </div>
    </>
  )
}

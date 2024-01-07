import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { Footer } from '../components/Footer'
import { HeaderBar } from '../components/HeaderBar' // Import your modified HeaderBar component
import { HeroSection } from '../components/HeroSection'

export const Layout = ({ children }) => {
  const location = useLocation()
  const params = useParams()

  // Check if it's the home page (you can modify the logic based on your route structure)
  const isHomePage = location.pathname === '/' && Object.keys(params).length === 0

  return (
    <>
      <div className="bg-white min-h-screen font-inter transition duration-1000 ease-in-out">
        <div className="max-w-8xl w-11/12 mx-auto">
          {!isHomePage ? <HeaderBar /> : <HeroSection />}
          {children}
          <Footer />
        </div>
      </div>
    </>
  )
}

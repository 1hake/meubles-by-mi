import React from 'react'
import { Link } from 'react-router-dom'

export const HeaderBar = () => {
  return (
    <div id="header" className="bg-white">
      <div className="container mx-auto flex items-center justify-center">
        <Link to="/">
          <div alt="logo" className="h-24 bg-dark-logo bg-no-repeat bg-center bg-contain w-48"></div>
        </Link>
        {/* Add any additional header content or navigation here */}
      </div>
    </div>
  )
}

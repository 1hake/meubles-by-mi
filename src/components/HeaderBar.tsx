import { faBars, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useCartContext } from '../context/CartContext'
import { categories } from '../data/categories'
import CartBadge from './CartBadge'

export const HeaderBar = () => {
  const { cart } = useCartContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const menuStyle = {
    display: isMenuOpen ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: 1000
  }

  const overlayStyle = {
    position: 'fixed'
  }

  const closeIconStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer'
  }

  return (
    <div id="header" className="bg-white sticky top-0 z-50 w-screen mb-4">
      <div className=" flex items-center justify-between mt-4  w-full">
        <div className="lg:hidden">
          <FontAwesomeIcon icon={faBars} size="lg" className="ml-4 mt-3 cursor-pointer" onClick={toggleMenu} />
        </div>
        <Link to="/">
          <div alt="logo" className="h-24 bg-light-logo bg-no-repeat bg-center bg-contain w-48"></div>
        </Link>
        <Link to="/cart" className="relative mr-6">
          <FontAwesomeIcon icon={faShoppingCart} size="xl" className="mr-4 mt-3" />
          <CartBadge itemCount={cart.length} />
        </Link>
        {/* Hamburger Menu */}
      </div>

      {/* Full-Page Menu */}
      <div style={overlayStyle} onClick={closeMenu}></div>
      <div style={menuStyle}>
        <FontAwesomeIcon icon={faTimes} size="xl" style={closeIconStyle} onClick={closeMenu} />
        <div className="bg-white flex flex-col items-center justify-center h-full gap-y-5 font-bold">
          <Link to="/" onClick={closeMenu}>
            Acceuil
          </Link>
          <Link to="/cart" onClick={closeMenu}>
            Panier
          </Link>
          {Object.keys(categories).map((category, index) => (
            <Link key={index} to={`categories/${category}`} onClick={closeMenu}>
              {categories[category]}
            </Link>
          ))}
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
          {/* Add more navigation links as needed */}
        </div>
      </div>
    </div>
  )
}

import {
  faBars,
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
  faTimes,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext' // Import the useAuth hook
import { useCartContext } from '../context/CartContext'
import { categories } from '../data/categories'
import CartBadge from './CartBadge'

export const HeaderBar = () => {
  const { cart } = useCartContext()
  const { currentUser, logout } = useAuth() // Use currentUser and logout from AuthContext
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

  const handleLogout = async () => {
    try {
      await logout()
      closeMenu() // Close the menu after logging out
    } catch (error) {
      console.error('Failed to log out:', error)
    }
  }

  return (
    <div id="header" className="bg-white sticky top-0 z-50 w-screen mb-4 p-4">
      <div className="flex items-center justify-between w-full">
        <div className="lg:hidden">
          <FontAwesomeIcon icon={faBars} size="lg" className="ml-4 mt-3 cursor-pointer" onClick={toggleMenu} />
        </div>
        <Link to="/">
          <div alt="logo" className="h-24 bg-light-logo bg-no-repeat bg-center bg-contain w-48"></div>
        </Link>
        <div className="flex items-center">
          {currentUser ? (
            <>
              <span className="mr-6 font-medium">Bonjour, {currentUser.email}</span>
              <button onClick={handleLogout} className="flex items-center mr-6">
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-2 mt-3" />
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="relative mr-6">
                <FontAwesomeIcon icon={faSignInAlt} size="lg" className="mr-2 mt-3" />
                Connexion
              </Link>
              <Link to="/signup" className="relative mr-6">
                <FontAwesomeIcon icon={faUserPlus} size="lg" className="mr-2 mt-3" />
                Inscription
              </Link>
            </>
          )}
          <Link to="/cart" className="relative">
            <FontAwesomeIcon icon={faShoppingCart} size="xl" className="mr-4 mt-3" />
            <CartBadge itemCount={cart.length} />
          </Link>
        </div>
      </div>

      {/* Full-Page Menu */}
      <div style={overlayStyle} onClick={closeMenu}></div>
      <div style={menuStyle}>
        <FontAwesomeIcon icon={faTimes} size="xl" style={closeIconStyle} onClick={closeMenu} />
        <div className="bg-white flex flex-col items-center justify-center h-full gap-y-5 font-bold">
          <Link to="/" onClick={closeMenu}>
            Accueil
          </Link>
          {Object.keys(categories).map((category, index) => (
            <Link key={index} to={`categories/${category}`} onClick={closeMenu}>
              {categories[category]}
            </Link>
          ))}
          <Link to="/cart" onClick={closeMenu}>
            Panier
          </Link>
          {currentUser ? (
            <>
              <Link to="/profile" onClick={closeMenu}>
                Mon Profil
              </Link>
              <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-bold py-2 px-4">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" onClick={closeMenu}>
                Connexion
              </Link>
              <Link to="/signup" onClick={closeMenu}>
                Inscription
              </Link>
            </>
          )}
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
          {/* Add more navigation links as needed */}
        </div>
      </div>
    </div>
  )
}

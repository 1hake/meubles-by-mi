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

import { useAuth } from '../../context/AuthContext'
import { useCartContext } from '../../context/CartContext'
import { categories } from '../../data/categories'
import CartBadge from '../cart/CartBadge'

export const HeaderBar = () => {
  const { cart } = useCartContext()
  const { currentUser, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const menuStyle = `fixed top-0 left-0 w-full h-full bg-white z-50 ${isMenuOpen ? 'block' : 'hidden'}`

  const closeIconStyle = 'absolute top-4 right-4 cursor-pointer text-3xl'

  const handleLogout = async () => {
    try {
      await logout()
      closeMenu() // Close the menu after logging out
    } catch (error) {
      console.error('Failed to log out:', error)
    }
  }

  return (
    <div id="header" className="bg-white sticky top-0 z-50 w-screen mb-4 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="lg:hidden">
          <FontAwesomeIcon icon={faBars} size="lg" className="cursor-pointer" onClick={toggleMenu} />
        </div>
        <Link to="/">
          <div alt="logo" className="h-24 bg-light-logo bg-no-repeat bg-center bg-contain w-48"></div>
        </Link>
        <div className="flex items-center">
          {currentUser ? (
            <>
              <Link to="/profile" className="hidden lg:inline mr-6">
                Mon Profil
              </Link>
              <button onClick={handleLogout} className="hidden lg:flex items-center mr-6">
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-2" />
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="hidden lg:inline mr-6">
                <FontAwesomeIcon icon={faSignInAlt} size="lg" className="mr-2" />
                Connexion
              </Link>
              <Link to="/signup" className="hidden lg:inline mr-6">
                <FontAwesomeIcon icon={faUserPlus} size="lg" className="mr-2" />
                Inscription
              </Link>
            </>
          )}
          <Link to="/cart" className="relative">
            <FontAwesomeIcon icon={faShoppingCart} size="xl" className="mr-2" />
            <CartBadge itemCount={cart.length} />
          </Link>
        </div>
      </div>

      {/* Full-Page Menu */}
      <div className={menuStyle}>
        <FontAwesomeIcon icon={faTimes} className={closeIconStyle} onClick={closeMenu} />
        <div className="flex flex-col items-center justify-center h-full gap-y-5 font-bold">
          <Link to="/" onClick={closeMenu}>
            Accueil
          </Link>
          {Object.keys(categories).map((category, index) => (
            <Link key={index} to={`/categories/${category}`} onClick={closeMenu}>
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
        </div>
      </div>
    </div>
  )
}

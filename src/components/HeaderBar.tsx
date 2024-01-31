import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

import { useCartContext } from '../context/CartContext'
import CartBadge from './CartBadge'

export const HeaderBar = () => {
  const { cart } = useCartContext()

  return (
    <div id="header" className="bg-white sticky top-0 z-50 ">
      <div className="container flex items-center justify-center lg:justify-between mt-4">
        <Link to="/">
          <div alt="logo" className="h-24 bg-light-logo bg-no-repeat bg-center bg-contain w-48"></div>
        </Link>
        <Link to="/cart" className="relative mr-6">
          <FontAwesomeIcon icon={faShoppingCart} size="xl" className="mr-4 mt-3" />
          <CartBadge itemCount={cart.length} />
        </Link>
        {/* Add any additional header content or navigation here */}
      </div>
    </div>
  )
}

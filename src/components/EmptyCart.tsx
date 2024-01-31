import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const EmptyCard = () => {
  return (
    <div className="max-w-sm mx-auto my-10 p-5  flex flex-col items-center">
      <FontAwesomeIcon icon={faShoppingCart} size="3x" className="text-gray-400 mb-4" />
      <p className="text-gray-600 mb-4">Your cart is currently empty.</p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        Go to Homepage
      </Link>
    </div>
  )
}

export default EmptyCard

import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const EmptyCard = () => {
  return (
    <div className="max-w-sm mx-auto my-10 p-5  flex flex-col items-center justify-center h-96">
      <FontAwesomeIcon icon={faShoppingCart} size="3x" className="text-gray-400 mb-4" />
      <p className="text-gray-600 mb-4">Votre panier est vide</p>
      <Link to="/" className="px-4 py-2 bg-black text-white rounded hover:bg-blue-600 transition-colors">
        Retour à la boutique
      </Link>
    </div>
  )
}

export default EmptyCard

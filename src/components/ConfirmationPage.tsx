import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useCartContext } from '../context/CartContext'

export const ConfirmationPage = () => {
  const { cart } = useCartContext()

  const navigate = useNavigate()

  const backToHome = () => {
    // clear the cart
    localStorage.removeItem('cart')
    navigate('/')
  }

  return (
    <div className="container mx-auto my-10 p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">Merci pour votre achat!</h1>
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Récapitulatif de votre commande</h2>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img src={item.image} alt={item.name} className="h-16 w-16 rounded-full object-cover mr-4" />
              <div>
                <div className="text-xl font-medium">{item.name}</div>
                <div className="text-gray-500">Quantité: {item.quantity}</div>
              </div>
            </div>
            <div className="text-lg font-semibold">{(item.price * item.quantity).toFixed(2)}€</div>
          </div>
        ))}
        {/* Back to home button */}

        <button
          onClick={() => backToHome()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {' '}
          Retour à l'accueil
        </button>
      </div>
    </div>
  )
}

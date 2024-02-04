import React from 'react'

import { useCartContext } from '../context/CartContext'
import EmptyCart from './EmptyCart'

const Cart = () => {
  const { cart, removeItem } = useCartContext()
  console.log('🚀 ~ Cart ~ cart:', cart)

  if (cart.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="container mx-auto my-10 p-6 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-center">Votre Panier</h2>

      {cart.map((item, index) => (
        <div
          key={index}
          className="mb-4 p-4 border border-gray-200 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center"
        >
          <div className="flex items-center md:w-2/3">
            <div className="flex-shrink-0 h-16 w-16">
              <img className="h-16 w-16 rounded-full object-cover" src={item.image} alt={item.name} />
            </div>
            <div className="ml-4">
              <div className="text-xl font-medium text-gray-900">{item.name}</div>
              <div className="text-gray-500">Couleur : {item.color}</div>
              <div className="text-gray-500">Prix : {item.price.toFixed(2)}€</div>
              <div className="text-gray-500">Quantité : {item.quantity}</div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:w-1/3">
            <div className="text-xl font-medium text-gray-900">{(item.price * item.quantity).toFixed(2)}€</div>
            <button onClick={() => removeItem(item.id)} className="mt-2 text-red-600 hover:text-red-900 text-center">
              Retirer
            </button>
          </div>
        </div>
      ))}

      <div className="text-right mt-8">
        <span className="text-2xl font-bold">
          Total : {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}€
        </span>
      </div>
    </div>
  )
}

export default Cart

import React from 'react'

import { useCartContext } from '../context/CartContext'
import EmptyCard from './EmptyCart'

const Cart = () => {
  const { cart, removeItem } = useCartContext()

  if (cart.length === 0) {
    return <EmptyCard />
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-white  rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-center">Votre Panier</h2>
      <div className="flex flex-col divide-y divide-gray-200">
        {cart.map((item, index) => (
          <div key={index} className="flex items-center py-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">Color: {item.color}</p>
              <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg">Qty: {item.quantity}</span>
              <button
                className="text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => removeItem(item.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-right mt-8">
        <span className="text-2xl font-bold">
          Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </span>
      </div>
    </div>
  )
}

export default Cart

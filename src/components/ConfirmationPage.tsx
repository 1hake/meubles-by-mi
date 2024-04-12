import emailjs from '@emailjs/browser'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { useCartContext } from '../context/CartContext'

emailjs.init({
  publicKey: 'DsyslrqbT-Wcnl4Oe',
  // Do not allow headless browsers
  blockHeadless: true,
  limitRate: {
    // Set the limit rate for the application
    id: 'app',
    // Allow 1 request per 10s
    throttle: 10000
  }
})

export const ConfirmationPage = () => {
  const { cart } = useCartContext()
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  useEffect(() => {
    if (cart.length > 0) {
      sendConfirmationEmail()
    }
  }, [cart])

  const backToHome = () => {
    // Clear the cart
    localStorage.removeItem('cart')
    navigate('/')
  }

  const sendConfirmationEmail = () => {
    const templateParams = {
      user_email: currentUser.email,
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total_price: cart.reduce((total, current) => total + current.price * current.quantity, 0).toFixed(2)
    }

    emailjs
      .send('service_65xlyy8', 'order_confirmation', templateParams)
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text)
      })
      .catch((err) => {
        console.error('Failed to send email. Error:', err)
      })
  }

  return (
    <div className="container mx-auto p-6 mt-10 mb-20 max-w-4xl bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">Merci pour votre achat !</h1>
      <div className="p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Récapitulatif de votre commande</h2>
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center mb-4 p-4 border-b border-gray-300 last:border-b-0"
          >
            <div className="flex items-center">
              <img src={item.image} alt={item.name} className="h-16 w-16 rounded-full object-cover mr-4" />
              <div>
                <div className="text-xl font-medium">{item.name}</div>
                <div className="text-gray-800">Quantité: {item.quantity}</div>
              </div>
            </div>
            <div className="text-lg font-semibold">{(item.price * item.quantity).toFixed(2)}€</div>
          </div>
        ))}
        <div className="mt-10 text-center">
          <button
            onClick={backToHome}
            className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-150"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  )
}

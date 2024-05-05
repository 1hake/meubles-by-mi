import emailjs from '@emailjs/browser'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import CartItem from '../components/cart/CartItemBatchDisplay'
import { useAuth } from '../context/AuthContext'
import { useCartContext } from '../context/CartContext'

emailjs.init({
  publicKey: 'DsyslrqbT-Wcnl4Oe',
  blockHeadless: true,
  limitRate: {
    id: 'app',
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
    <div className="container mx-auto p-6 mt-10 mb-20 max-w-4xl bg-white shadow-lg rounded-lg border-2 border-black">
      <h1 className="text-3xl font-bold mb-8 text-center">Merci pour votre achat !</h1>
      <div className="p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Récapitulatif de votre commande</h2>
        {cart.map((item, index) => (
          <CartItem key={index} item={item} onRemove={() => {}} selectedCountry="Belgique" />
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

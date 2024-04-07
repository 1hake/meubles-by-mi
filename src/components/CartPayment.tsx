import { Elements } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'

import { useCartContext } from '../context/CartContext'
import useCreatePaymentIntent from '../hooks/useCreatePaymentIntent'
import { stripePromise } from '../router/Router'
import PaymentForm from './PaymentForm'

const CartPayment: React.FC = () => {
  const { calculateTotal } = useCartContext()
  const { createPaymentIntent, clientSecret } = useCreatePaymentIntent()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function initializePaymentIntent() {
      // Only initialize the payment intent if a clientSecret has not been set
      if (!clientSecret) {
        try {
          const totalAmountInCents = calculateTotal() * 100
          await createPaymentIntent(totalAmountInCents, 'eur')
        } catch (err) {
          setError('Failed to initialize payment. Please try again.')
          console.error(err) // It's a good practice to log the error for debugging
        }
      }
      setLoading(false)
    }

    initializePaymentIntent()
  }, [clientSecret, calculateTotal, createPaymentIntent]) // Add dependencies here

  if (loading) return <p>Loading payment details...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="container mx-auto my-10 p-6 rounded-lg flex flex-col md:flex-row">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm clientSecret={clientSecret} />
      </Elements>
    </div>
  )
}

export default CartPayment

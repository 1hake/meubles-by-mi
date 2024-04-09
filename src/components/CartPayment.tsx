import { Elements } from '@stripe/react-stripe-js'
import React, { useEffect } from 'react'

import useCreatePaymentIntent from '../hooks/useCreatePaymentIntent'
import { stripePromise } from '../router/Router'
import { Loader } from './Loader'
import PaymentForm from './PaymentForm'

const CartPayment: React.FC = ({ orderInfo, totalPrice }) => {
  console.log('🚀 ~ orderInfo:', orderInfo)
  const { createPaymentIntent, clientSecret } = useCreatePaymentIntent()

  useEffect(() => {
    createPaymentIntent(totalPrice, 'eur')
  }, [])

  if (!clientSecret) return <Loader />

  return (
    <div className="container my-10 p-6 rounded-lg flex flex-col md:flex-row">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm clientSecret={clientSecret} orderInfo={orderInfo} />
      </Elements>
    </div>
  )
}

export default CartPayment

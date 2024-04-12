import { Elements } from '@stripe/react-stripe-js'
import React, { useEffect } from 'react'

import useCreatePaymentIntent from '../hooks/useCreatePaymentIntent'
import { stripePromise } from '../router/Router'
import { Loader } from './Loader'
import PaymentForm from './PaymentForm'

const CartPayment: React.FC = ({ orderInfo, totalPrice }) => {
  const { createPaymentIntent, clientSecret } = useCreatePaymentIntent()

  useEffect(() => {
    createPaymentIntent(totalPrice, 'eur')
  }, [])

  if (!clientSecret) return <Loader />

  return (
    <div className="rounded-lg flex flex-col md:flex-row justify-center">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm clientSecret={clientSecret} orderInfo={orderInfo} />
      </Elements>
    </div>
  )
}

export default CartPayment

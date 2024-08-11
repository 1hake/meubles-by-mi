import { Elements } from '@stripe/react-stripe-js'
import React, { useEffect } from 'react'

import { useCartContext } from '../../context/CartContext'
import { useCreatePaymentIntent } from '../../hooks/useCreatePaymentIntent'
import { stripePromise } from '../../router/Router'
import { Loader } from '../common/Loader'
import { OrderInfo } from '../types/types'
import PaymentForm from './PaymentForm'

interface Props {
  orderInfo: OrderInfo
}

const CartPayment = ({ orderInfo }: Props) => {
  const { createPaymentIntent, clientSecret } = useCreatePaymentIntent()
  const { totalPrice } = useCartContext()

  useEffect(() => {
    createPaymentIntent(totalPrice * 100, 'eur')
  }, [])

  if (!clientSecret) return <Loader />

  return (
    <div className="rounded-lg flex flex-col md:flex-row justify-center w-full">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm clientSecret={clientSecret} orderInfo={orderInfo} />
      </Elements>
    </div>
  )
}

export default CartPayment

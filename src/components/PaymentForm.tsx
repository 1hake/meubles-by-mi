import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import useOrders from '../hooks/useOrders'

interface PaymentFormProps {
  clientSecret: string
  orderInfo: any
}

const PaymentForm: React.FC<PaymentFormProps> = ({ clientSecret, orderInfo }) => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const { addOrder } = useOrders()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet!')
      return
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: 'if_required'
    })
    console.log('🚀 ~ handleSubmit ~ result:', result)

    if (result.error) {
      console.log(result.error.message)
    } else {
      console.log('Payment successful:', result.paymentIntent, orderInfo)
      await addOrder({ ...orderInfo, orderDate: new Date() })
      navigate('/confirmation')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe} // Button is disabled if Stripe hasn't loaded or there's no active stripe instance
        className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Payer
      </button>
    </form>
  )
}

export default PaymentForm
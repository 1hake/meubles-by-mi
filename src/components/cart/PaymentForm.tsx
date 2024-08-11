import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useCartContext } from '../../context/CartContext'
import useOrders from '../../hooks/useOrders'

interface PaymentFormProps {
  clientSecret: string
  orderInfo: any
}

const PaymentForm: React.FC<PaymentFormProps> = ({ clientSecret }) => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const { addOrder } = useOrders()
  const { setCart, orderInfo, shippingAddress, totalPrice } = useCartContext()
  console.log('🚀 ~ totalPrice:', totalPrice)
  console.log('🚀 ~ shippingAddress:', shippingAddress)
  console.log('🚀 ~ orderInfo:', orderInfo)

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

    if (result.error) {
      console.log(result.error.message)
    } else {
      console.log('Payment successful:', result.paymentIntent, orderInfo)
      toast.success('Paiement effectué avec succès')
      await addOrder({ ...orderInfo, orderDate: new Date(), status: 'en attente', shippingAddress, price: totalPrice })
      navigate('/confirmation')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 w-full border-2 border-black rounded-md">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe} // Button is disabled if Stripe hasn't loaded or there's no active stripe instance
        className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
      >
        Payer
      </button>
    </form>
  )
}

export default PaymentForm

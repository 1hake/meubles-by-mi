import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'

interface PaymentFormProps {
  clientSecret: string
}

const PaymentForm: React.FC<PaymentFormProps> = ({ clientSecret }) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet!')
      return
    }

    // No need to specify the payment method details; PaymentElement handles it
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret).catch((error) => {
      console.error('Payment error:', error.message)
      alert(`Payment failed: ${error.message}`)
      return // Ensure function exits on error
    })

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      alert('Payment successful!')
      // Optionally handle navigation or state updates here
    }
  }

  return (
    <form onSubmit={handleSubmit} className="md:w-1/2 p-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe} // Button is disabled if Stripe hasn't loaded or there's no active stripe instance
        className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Pay Now
      </button>
    </form>
  )
}

export default PaymentForm

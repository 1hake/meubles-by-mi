import { useState } from 'react'

export function useCreatePaymentIntent() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [clientSecret, setClientSecret] = useState(null)

  const createPaymentIntent = async (amount, currency) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://createpaymentintent-k4ks6w6uwq-uc.a.run.app?amount=${amount}&currency=${currency}`,
        {
          method: 'GET',
          headers: {}
        }
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Error: ${errorData.message || 'Network response was not ok'}`)
      }
      const data = await response.json()
      setClientSecret(data.clientSecret)
    } catch (error) {
      setError(error.message)
      console.error('Error occurred while creating payment intent:', error)
    } finally {
      setLoading(false)
    }
  }

  return { createPaymentIntent, loading, error, clientSecret }
}

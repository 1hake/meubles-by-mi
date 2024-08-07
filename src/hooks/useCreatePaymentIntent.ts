import { useState } from 'react'

// Custom hook to call the createPaymentIntent Firebase function
function useCreatePaymentIntent() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [clientSecret, setClientSecret] = useState(null)

  const createPaymentIntent = async (amount, currency) => {
    setLoading(true)
    setError(null)

    try {
      // Update the URL to match your Firebase function's endpoint
      const response = await fetch(
        `https://createpaymentintent-k4ks6w6uwq-uc.a.run.app?amount=${amount}&currency=${currency}`,
        {
          method: 'GET',
          headers: {}
        }
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()

      setClientSecret(data.clientSecret)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { createPaymentIntent, loading, error, clientSecret }
}

export default useCreatePaymentIntent

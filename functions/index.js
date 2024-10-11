const { onRequest } = require('firebase-functions/v2/https')
const { defineSecret } = require('firebase-functions/params')
const stripeSecretName = 'STRIPE_TEST_SECRET'
const stripeSkTest = defineSecret(stripeSecretName)

exports.createPaymentIntent = onRequest(
  {
    secrets: [stripeSecretName],
    cors: {
      origin: true
    }
  },
  async (req, res) => {
    try {
      const { amount, currency } = req.query

      if (!amount || !currency) {
        res.status(400).json({ error: 'Amount and currency are required.' })
        return
      }

      if (isNaN(amount) || amount <= 0) {
        res.status(400).json({ error: 'Invalid amount provided. Amount must be a positive number.' })
        return
      }

      const stripe = require('stripe')(stripeSkTest.value())

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['card']
      })

      res.status(200).json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
      console.error('Error creating payment intent:', error)
      if (error.type === 'StripeCardError') {
        // Card errors are the most common type of errors from Stripe
        res.status(400).json({ error: `Card error: ${error.message}` })
      } else if (error.type === 'RateLimitError') {
        // Too many requests made to the API too quickly
        res.status(429).json({ error: 'Rate limit exceeded, please try again later.' })
      } else if (error.type === 'StripeInvalidRequestError') {
        // Invalid parameters were supplied to Stripe's API
        res.status(400).json({ error: `Invalid request: ${error.message}` })
      } else if (error.type === 'StripeAPIError') {
        // An error occurred internally with Stripe's API
        res.status(500).json({ error: 'Internal server error, please try again later.' })
      } else if (error.type === 'StripeConnectionError') {
        // Some kind of error occurred during the HTTPS communication
        res.status(502).json({ error: 'Network error, please try again later.' })
      } else if (error.type === 'StripeAuthenticationError') {
        // You probably used an incorrect API key
        res.status(401).json({ error: 'Authentication with Stripe API failed, please check your API key.' })
      } else {
        // Handle any other types of unexpected errors
        res.status(500).json({ error: 'An unexpected error occurred, please try again later.' })
      }
    }
  }
)

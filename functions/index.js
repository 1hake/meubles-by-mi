const { onRequest } = require('firebase-functions/v2/https')
const { defineSecret } = require('firebase-functions/params')
// const stripeSecretName = 'STRIPE_LIVE_SECRET'
const stripeSecretName = 'STRIPE_TEST_SECRET'
// const stripeSkTest = defineSecret(stripeSecretName)

const stripeLiveName = defineSecret(stripeSecretName)

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

      const stripe = require('stripe')(stripeLiveName.value())

      console.log('Stripe API Key:', stripeLiveName.value())

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['card']
      })

      res.status(200).json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
      console.error('Error creating payment intent:', error)
      if (error.type === 'StripeCardError') {
        res.status(400).json({ error: `Card error: ${error.message}` })
      } else if (error.type === 'RateLimitError') {
        res.status(429).json({ error: 'Rate limit exceeded, please try again later.' })
      } else if (error.type === 'StripeInvalidRequestError') {
        res.status(400).json({ error: `Invalid request: ${error.message}` })
      } else if (error.type === 'StripeAPIError') {
        res.status(500).json({ error: 'Internal server error, please try again later.' })
      } else if (error.type === 'StripeConnectionError') {
        res.status(502).json({ error: 'Network error, please try again later.' })
      } else if (error.type === 'StripeAuthenticationError') {
        res.status(401).json({ error: 'Authentication with Stripe API failed, please check your API key.' })
      } else {
        res.status(500).json({ error: 'An unexpected error occurred, please try again later.' })
      }
    }
  }
)

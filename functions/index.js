/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https')
const { defineSecret } = require('firebase-functions/params')

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

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
    const { amount, currency } = req.query

    const stripe = require('stripe')(stripeSkTest.value())

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card']
    })

    res.json({ clientSecret: paymentIntent.client_secret }).send('Payment Intent Created')
  }
)

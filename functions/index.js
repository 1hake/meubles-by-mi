/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest, HttpsError } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')
const { getFirestore } = require('firebase-admin/firestore')
const functions = require('firebase-functions')
const { defineSecret } = require('firebase-functions/params')

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const stripeSecretName = 'STRIPE_TEST_SECRET'

const stripeSkTest = defineSecret(stripeSecretName)

exports.helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

exports.addmessage = onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await getFirestore().collection('messages').add({ original })
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` })
})

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

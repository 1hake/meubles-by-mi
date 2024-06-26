import React, { useMemo, useState } from 'react'

import { useAuth } from '../context/AuthContext'
import { useCartContext } from '../context/CartContext'
import CartItem from './CartItem'
import CartPayment from './CartPayment'
import EmptyCart from './EmptyCart'
import { calculateCartPrice } from './priceCalcutaions/prices'
import { ShippingAddressForm } from './ShippingAddressForm'
import { Country } from './types/types'

interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const { cart, removeBatch, calculateTotal } = useCartContext()
  console.log('🚀 ~ cart:', cart)
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    postalCode: ''
  })
  const [selectedCountry, setSelectedCountry] = useState<Country>('France')
  const { currentUser } = useAuth()
  console.log('🚀 ~ currentUser:', currentUser)

  const [addressCompleted, setAddressCompleted] = useState(false)
  const [shippingError, setShippingError] = useState('')

  const allItemsShippable = useMemo(() => {
    return cart.every(
      (item) => item.shippingOptions[selectedCountry] !== null && item.shippingOptions[selectedCountry] !== undefined
    )
  }, [cart, selectedCountry])

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value)
  }

  const handleAddressSubmit = () => {
    if (!allItemsShippable) {
      setShippingError(
        'Un ou plusieurs articles dans votre panier ne peuvent pas être livrés dans votre pays sélectionné.'
      )
      return
    }

    const { fullName, address, city, postalCode } = shippingAddress
    if (fullName && address && city && postalCode) {
      setAddressCompleted(true)
      setShippingError('') // Clear the error message on successful validation
    }
  }

  const orderInfo = {
    userId: currentUser?.id,
    products: cart.map((item) => ({ productId: item.ref, quantity: item.quantity, color: item.color })),
    shippingAddress: {
      ...shippingAddress,
      country: selectedCountry
    },
    status: 'en attente'
  }

  const totalPrice = calculateCartPrice(cart, selectedCountry)
  console.log('🚀 ~ totalPrice:', totalPrice)

  if (cart.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white">
      <div className="md:grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Votre Panier</h2>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              selectedCountry={selectedCountry}
              onRemove={() => removeBatch(item.id)}
            />
          ))}
          <div>
            <label htmlFor="country" className="text-sm font-semibold text-gray-900">
              Choisissez votre pays:
            </label>
            <select
              id="country"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="mt-1 block w-full p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              {['France', 'Belgique', 'Luxembourg'].map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {!allItemsShippable && (
              <p className="text-red-600 font-semibold mt-2">Livraison: Non disponible dans votre pays</p>
            )}
            <p className="mt-4 mb-4 text-xl font-semibold">Prix Total: {totalPrice.toFixed(2)}€</p>
          </div>
        </div>
        {!currentUser ? (
          <div className="my-4 p-4 bg-gray-100 rounded-lg text-center shadow-md flex flex-col justify-center">
            <p className="font-semibold text-gray-800">
              Veuillez vous connecter pour finaliser votre commande. Si vous n'avez pas de compte, inscrivez-vous.
            </p>
            <a
              href="/signin/redirect"
              className="mt-2 inline-block text-white bg-black hover:bg-gray-800 font-bold py-2 px-4 rounded"
            >
              Se connecter
            </a>
            <a
              href="/signup/redirect"
              className="mt-2 inline-block text-black bg-white hover:bg-gray-300 font-bold py-2 px-4 rounded border border-black"
            >
              S'inscrire
            </a>
          </div>
        ) : addressCompleted ? (
          <CartPayment totalPrice={totalPrice} orderInfo={orderInfo} />
        ) : (
          <ShippingAddressForm
            fillAddressWithUser={() =>
              setShippingAddress({
                fullName: currentUser.fullName,
                address: currentUser.address,
                city: currentUser.city,
                postalCode: currentUser.postalCode
              })
            }
            handleAddressSubmit={handleAddressSubmit}
            shippingAddress={shippingAddress}
            handleAddressChange={handleAddressChange}
          />
        )}
      </div>
    </div>
  )
}

export default Cart

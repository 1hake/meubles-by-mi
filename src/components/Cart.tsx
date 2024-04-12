import React, { useMemo, useState } from 'react'

import { useAuth } from '../context/AuthContext'
import { useCartContext } from '../context/CartContext'
import CartItem from './CartItem'
import CartPayment from './CartPayment'
import EmptyCart from './EmptyCart'
import { ShippingAdressForm } from './ShippingAdressForm'

export interface ShippingAddress {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
}

interface CartProps {}

const shippingRates: Record<string, number> = {
  'Belgique, Luxembourg': 10,
  France: 10
}

export const Cart: React.FC<CartProps> = () => {
  const { cart, removeItem, calculateTotal } = useCartContext()

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  })
  const [selectedCountry, setSelectedCountry] = useState<string>('France')
  const { currentUser } = useAuth()
  console.log('🚀 ~ currentUser:', currentUser)

  const addressCompleted = Object.values(shippingAddress).every((value) => value !== '')

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
  }

  const shippingFee = useMemo(() => shippingRates[selectedCountry], [selectedCountry])

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value)
  }

  const orderInfo = {
    userId: currentUser?.uid,
    products: cart.map((item) => ({ productId: item.ref, color: item.color })),
    shippingAddress,
    status: 'en attente'
  }

  const totalPrice = calculateTotal() + shippingFee

  if (cart.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg">
      <div className="md:grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Votre Panier</h2>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} onRemove={() => removeItem(item.id)} />
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
              {Object.keys(shippingRates).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <p className="mt-4 text-xl font-semibold">Prix Total: {totalPrice.toFixed(2)}€</p>
          </div>
        </div>
        {!currentUser && (
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
        )}
        {currentUser &&
          (addressCompleted ? (
            <CartPayment totalPrice={totalPrice} orderInfo={orderInfo} />
          ) : (
            <ShippingAdressForm shippingAddress={shippingAddress} handleAddressChange={handleAddressChange} />
          ))}
      </div>
    </div>
  )
}

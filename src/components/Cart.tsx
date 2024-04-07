import React, { useState } from 'react'

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

// Cart component
export const Cart: React.FC<CartProps> = () => {
  const { cart, removeItem } = useCartContext()
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  })

  const adressCompleted = Object.values(shippingAddress).every((value) => value !== '')

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
  }

  const handleAddressSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  if (cart.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="container mx-auto my-10 shadow-lg rounded-lg overflow-hidden md:grid md:grid-cols-2">
      <div className="p-4 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} onRemove={() => removeItem(item.id)} />
        ))}
      </div>
      {adressCompleted ? (
        <CartPayment></CartPayment>
      ) : (
        <ShippingAdressForm
          shippingAddress={shippingAddress}
          handleAddressChange={handleAddressChange}
          handleAddressSubmit={handleAddressSubmit}
        />
      )}
    </div>
  )
}

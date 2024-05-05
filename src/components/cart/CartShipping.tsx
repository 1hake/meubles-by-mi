import React, { useState } from 'react'

import { useAuth } from '../../context/AuthContext'
import { useCartContext } from '../../context/CartContext'
import { OrderInfo } from '../types/types'
import CartPayment from './CartPayment'
import { ShippingAddressForm } from './ShippingAddressForm'

const CartShipping: React.FC = () => {
  const { currentUser } = useAuth()
  console.log('🚀 ~ currentUser:', currentUser)
  const { cart, setShippingAddress, shippingAddress } = useCartContext()

  const [addressCompleted, setAddressCompleted] = useState(false)
  const [shippingError, setShippingError] = useState('')

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
  }

  const handleAddressSubmit = () => {
    const { fullName, address, city, postalCode } = shippingAddress
    if (fullName && address && city && postalCode) {
      setAddressCompleted(true)
      setShippingError('')
    } else {
      setShippingError('Veuillez remplir tous les champs requis.')
    }
  }

  const orderInfo: OrderInfo = {
    userId: currentUser?.id,
    products: cart.map((item) => ({ productId: item.ref, variant: item.variants })),
    shippingAddress
  }

  if (addressCompleted) {
    return <CartPayment orderInfo={orderInfo} />
  }

  return (
    <ShippingAddressForm
      shippingAddress={shippingAddress}
      handleAddressChange={handleAddressChange}
      handleAddressSubmit={handleAddressSubmit}
      shippingError={shippingError}
      fillAddressWithUser={() => {
        if (currentUser) {
          setShippingAddress({
            fullName: currentUser.fullName,
            address: currentUser.address || '',
            city: currentUser.city || '',
            postalCode: currentUser.postalCode || ''
          })
        }
      }}
    />
  )
}

export default CartShipping

import React from 'react'

import { useAuth } from '../../context/AuthContext'
import { useCartContext } from '../../context/CartContext'
import CartPayment from './CartPayment'
import { ShippingAddressForm } from './ShippingAddressForm'

const CartShipping: React.FC = () => {
  const { currentUser } = useAuth()
  const {
    cart,
    setShippingAddress,
    shippingAddress,
    setAddressCompleted,
    addressCompleted,
    orderInfo,
    setUserInfoAsShippingAddress,
    shippingError,
    setShippingError
  } = useCartContext()
  console.log('🚀 ~ shippingAddress:', shippingAddress)

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
  }

  if (addressCompleted) {
    return <CartPayment orderInfo={orderInfo} />
  }

  return (
    <ShippingAddressForm
      shippingAddress={shippingAddress}
      handleAddressChange={handleAddressChange}
      shippingError={shippingError}
      fillAddressWithUser={() => setUserInfoAsShippingAddress()}
    />
  )
}

export default CartShipping

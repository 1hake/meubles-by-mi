import React from 'react'

import CartItemList from '../components/cart/CartItemList'
import CartShipping from '../components/cart/CartShipping'
import EmptyCart from '../components/cart/EmptyCart'
import UserAuthentication from '../components/users/UserAuthentication'
import { useAuth } from '../context/AuthContext'
import { useCartContext } from '../context/CartContext'

const Cart: React.FC = () => {
  const { cart } = useCartContext()
  const { currentUser } = useAuth()

  if (cart.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white">
      <div className="md:grid md:grid-cols-2 gap-6">
        <CartItemList />
        {!currentUser ? <UserAuthentication /> : <CartShipping />}
      </div>
    </div>
  )
}

export default Cart

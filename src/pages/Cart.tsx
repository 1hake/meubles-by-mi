import React from 'react'

import CartItemList from '../components/cart/CartItemList'
import CartShipping from '../components/cart/CartShipping'
import EmptyCart from '../components/cart/EmptyCart'
import PriceDisplay from '../components/cart/price/PriceDisplay'
import Button from '../components/common/Button'
import UserAuthentication from '../components/Users/UserAuthentication'
import { useAuth } from '../context/AuthContext'
import { useCartContext } from '../context/CartContext'

const Cart: React.FC = () => {
  const { cart, totalPrice, setAddressCompleted, validateAddress } = useCartContext()

  const { currentUser } = useAuth()

  if (cart.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg mt-4">
      <div className="md:grid md:grid-cols-2 gap-6 gap-y-10 mb-36">
        <CartItemList />
        {!currentUser ? <UserAuthentication /> : <CartShipping />}
      </div>
      <div className="fixed inset-x-0 bottom-0 bg-black text-white p-4 flex justify-between items-center shadow-lg z-50 mt-4 h-24 md:h-24">
        <PriceDisplay totalPrice={totalPrice} />
        <Button color="dark" onClick={() => validateAddress()}>
          Passer au paiment
        </Button>
      </div>
    </div>
  )
}

export default Cart

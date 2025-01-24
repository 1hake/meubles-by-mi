import React from 'react'

import { useCartContext } from '../../context/CartContext'
import CartItemBatchDisplay from './CartItemBatchDisplay'

const CartItemList: React.FC = () => {
  const { cart, removeBatch, selectedCountry, setSelectedCountry, totalPrice, allItemsShippable } = useCartContext()

  return (
    <div className="space-y-6 mb-4">
      <h2 className="text-3xl font-bold text-center">Votre Panier</h2>
      {cart.map((item) => (
        <CartItemBatchDisplay key={item.id} item={item} onRemove={() => removeBatch(item.id)} />
      ))}
    </div>
  )
}

export default CartItemList

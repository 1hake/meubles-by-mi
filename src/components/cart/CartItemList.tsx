import React, { useMemo } from 'react'

import { useCartContext } from '../../context/CartContext'
import CartItemBatchDisplay from './CartItemBatchDisplay'

const CartItemList: React.FC = () => {
  const { cart, removeBatch, selectedCountry, setSelectedCountry, totalPrice } = useCartContext()

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value)
  }

  const allItemsShippable = useMemo(() => {
    return cart.every(
      (item) => item.shippingOptions[selectedCountry] !== null && item.shippingOptions[selectedCountry] !== undefined
    )
  }, [cart, selectedCountry])

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">Votre Panier</h2>
      {cart.map((item) => (
        <CartItemBatchDisplay key={item.id} item={item} onRemove={() => removeBatch(item.id)} />
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
  )
}

export default CartItemList

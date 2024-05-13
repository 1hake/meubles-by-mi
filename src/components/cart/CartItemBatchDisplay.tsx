import React from 'react'

import { useCartContext } from '../../context/CartContext'
import { calculatePriceByColor, calculateStandardPrice, calculateTotalPrice } from '../../utils/prices'
import { CartItem, ColorImage } from '../types/types'
import PriceDisplay from './price/PriceDisplay'

interface CartItemProps {
  item: CartItem
  onRemove: (id: string) => void
}

const CartItemBatchDisplay = ({ item, onRemove }: CartItemProps) => {
  const { selectedCountry } = useCartContext()
  const { id, name, variants, shippingOptions, priceOption } = item
  console.log('🚀 ~ CartItemBatchDisplay ~ variants:', variants)

  // Determine if we need to calculate by color
  const hasColorPricing = variants.some((variant) => 'price' in variant)
  console.log('🚀 ~ CartItemBatchDisplay ~ hasColorPricing:', hasColorPricing)

  // Calculate total price based on whether we use color pricing or standard price options
  const totalPrice = hasColorPricing
    ? calculatePriceByColor(variants as ColorImage[], variants as ColorImage[])
    : calculateTotalPrice(variants, priceOption || [])
  console.log('🚀 ~ CartItemBatchDisplay ~ totalPrice:', totalPrice)

  // Standard price as a fallback when no specific pricing is provided
  const standardPrice = calculateStandardPrice(variants, priceOption || [])

  // Calculate shipping cost with a default fallback
  const shippingCost = shippingOptions[selectedCountry] ?? 10

  return (
    <div className="relative bg-white p-4 rounded-lg border-2 border-black mb-4 shadow-sm">
      <button onClick={() => onRemove(id)} className="absolute top-1 right-1 p-1 text-red-500 hover:text-red-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        {variants.map((variant, index) => (
          <div key={index} className="flex justify-between items-center p-2">
            {variant.image && (
              <img src={variant.image} alt={`${variant.color} color variant`} className="h-12 w-12 rounded-full" />
            )}
            <p className="text-sm text-gray-500">{`${variant.color}`}</p>
            <h3 className="text-md text-black">{`x${variant.quantity}`}</h3>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4">
          <PriceDisplay
            totalPrice={totalPrice + shippingCost}
            standardPrice={standardPrice}
            shippingPrice={shippingCost}
          />
        </div>
      </div>
    </div>
  )
}

export default CartItemBatchDisplay

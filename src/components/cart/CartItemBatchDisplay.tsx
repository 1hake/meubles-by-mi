import React from 'react'

import { useCartContext } from '../../context/CartContext'
import { calculatePriceByColor, calculateTotalPrice } from '../../utils/prices'
import Button from '../common/Button'
import { CartItem, ColorImage } from '../types/types'

interface CartItemProps {
  item: CartItem
  onRemove: (id: string) => void
  isDeletable: boolean
}

const CartItemBatchDisplay = ({ item, onRemove, isDeletable = true }: CartItemProps) => {
  const { selectedCountry } = useCartContext()
  const { id, name, variants, shippingOptions, priceOption, main_image } = item

  const hasColorPricing = variants.some((variant) => 'price' in variant)

  const totalPrice = hasColorPricing
    ? calculatePriceByColor(variants as ColorImage[], variants as ColorImage[])
    : calculateTotalPrice(variants, priceOption || [])

  const shippingCost = shippingOptions ? shippingOptions[selectedCountry] || 10 : 10

  return (
    <div className="relative bg-white p-4 rounded-lg border-2 border-black mb-4 shadow-sm">
      {isDeletable && (
        <Button size="small" onClick={() => onRemove(id)} className="absolute top-[-10px] right-[-10px]" color="light">
          Supprimer
        </Button>
      )}
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        {variants.map((variant, index) => (
          <div key={index} className="flex justify-between items-center p-2">
            {variant.image ? (
              <img
                src={variant.image}
                alt={`${variant.color} color variant`}
                className="h-24 w-24 object-cover rounded-md"
              />
            ) : (
              <img src={main_image || ''} alt={`${name} main image`} className="h-24 w-24 object-cover rounded-md" />
            )}
            <p className="text-sm text-black">{`${variant.color}`}</p>
            <h3 className="text-xl font-bold text-black">{`x${variant.quantity}`}</h3>
          </div>
        ))}
        <div className="flex justify-start flex-col items-end mt-12">
          {totalPrice !== null && (
            <p className="text-4xl font-bold">
              <span className="text-4xl whitespace-nowrap mr-2">{totalPrice.toFixed(2)} €</span>
            </p>
          )}
          {shippingCost && <p className="text-sm text-gray-500">Frais de port: {shippingCost.toFixed(2)} €</p>}
        </div>
      </div>
    </div>
  )
}

export default CartItemBatchDisplay

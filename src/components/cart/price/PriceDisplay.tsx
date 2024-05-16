import React from 'react'

interface PriceDisplayProps {
  totalPrice: number
  standardPrice?: number
  shippingPrice?: number
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ totalPrice, standardPrice, shippingPrice }) => {
  return (
    <div className="flex flex-col ">
      {totalPrice !== null && (
        <p className="text-4xl font-bold">
          <span className="text-4xl whitespace-nowrap mr-2">{totalPrice.toFixed(2)} €</span>
        </p>
      )}
      {standardPrice !== undefined && standardPrice > 0 && standardPrice < totalPrice && (
        <p className="text-xl font-bold">
          <span
            className="text-2xl whitespace-nowrap mr-2 text-red-500 line-through
"
          >
            {standardPrice.toFixed(2)} €
          </span>
        </p>
      )}
      {shippingPrice && <p className="text-sm text-gray-500">Frais de port: {shippingPrice.toFixed(2)} €</p>}
    </div>
  )
}

export default PriceDisplay

import React from 'react'

interface PriceDisplayProps {
  totalPrice: number
  shippingPrice?: number
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ totalPrice, shippingPrice }) => {
  return (
    <div className="flex flex-col ">
      {totalPrice !== null && (
        <p className="text-4xl font-bold">
          <span className="text-4xl whitespace-nowrap mr-2">{totalPrice.toFixed(2)} €</span>
        </p>
      )}
      {shippingPrice && <p className="text-sm text-gray-500">Frais de port: {shippingPrice.toFixed(2)} €</p>}
    </div>
  )
}

export default PriceDisplay

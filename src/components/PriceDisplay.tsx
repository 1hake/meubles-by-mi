import React from 'react'

interface PriceDisplayProps {
  totalPrice: number | null
  standardPrice: number
  shippingPrice?: number
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ totalPrice, standardPrice, shippingPrice }) => {
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-xl font-bold">
        Total:{' '}
        {totalPrice ? (
          <>
            <span className="text-2xl whitespace-nowrap mr-2">{totalPrice.toFixed(2)} €</span>
            <span className="text-lg line-through whitespace-nowrap  text-red-500">{standardPrice.toFixed(2)} €</span>
          </>
        ) : (
          <span className="text-2xl whitespace-nowrap mr-2">{standardPrice.toFixed(2)} €</span>
        )}
      </p>
      {shippingPrice && <span className="text-sm text-gray-500">Frais de port: {shippingPrice.toFixed(2)} €</span>}
    </div>
  )
}

export default PriceDisplay

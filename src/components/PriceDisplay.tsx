import React from 'react'

interface PriceDisplayProps {
  totalPrice: number | null
  standardPrice: number
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ totalPrice, standardPrice }) => {
  return (
    <p className="text-xl font-bold">
      Total:{' '}
      {totalPrice ? (
        <>
          <span className="text-2xl mr-2">{totalPrice.toFixed(2)} €</span>
          <span className="text-lg line-through text-gray-500">{standardPrice.toFixed(2)} €</span>
        </>
      ) : (
        <span className="text-lg line-through text-gray-500">{standardPrice.toFixed(2)} €</span>
      )}
    </p>
  )
}

export default PriceDisplay

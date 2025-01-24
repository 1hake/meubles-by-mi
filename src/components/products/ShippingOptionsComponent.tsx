import React from 'react'

interface ShippingOptions {
  [country: string]: number | null
}

interface ProductProps {
  shippingOptions: ShippingOptions
}

const ShippingOptionsComponent: React.FC<ProductProps> = ({ shippingOptions }) => {
  return (
    <div className="max-w-md mx-auto bg-white border-black border-2 rounded-xl overflow-hidden md:max-w-2xl mb-4 shadow">
      <div className="p-8">
        <h2 className="uppercase tracking-wide text-lg text-black font-bold mb-4">Options de Livraison</h2>
        <ul>
          {Object.entries(shippingOptions).map(([country, cost]) => (
            <li key={country} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <span className="text-gray-700">{country} :</span>
              {cost === null ? (
                <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm">Indisponible</span>
              ) : (
                <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm">{`${cost} €`}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ShippingOptionsComponent

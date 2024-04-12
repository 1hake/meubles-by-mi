import React from 'react'

interface ShippingOptions {
  [country: string]: number | null
}

interface ProductProps {
  shippingOptions: ShippingOptions
}

const ShippingOptionsComponent: React.FC<ProductProps> = ({ shippingOptions }) => {
  return (
    <div className="max-w-md mx-auto bg-white border-black border-2 rounded-xl  overflow-hidden md:max-w-2xl mb-4">
      <div className="md:flex justify-center">
        <div className="p-4">
          <div className="uppercase tracking-wide text-sm text-black font-semibold">Options de Livraison</div>
          <ul className="mt-2">
            {Object.entries(shippingOptions).map(([country, cost]) => (
              <li key={country} className="flex justify-between py-2">
                <span>{country} :</span>
                <span>{cost === null ? 'Indisponible' : `${cost} €`}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ShippingOptionsComponent

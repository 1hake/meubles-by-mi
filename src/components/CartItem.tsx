import React from 'react'

interface CartItemProps {
  item: {
    id: string
    name: string
    image: string
    price: number
    quantity: number
    color?: string
    shippingOptions: {
      Belgique?: number | null
      Luxembourg?: number | null
      France?: number | null
    }
  }
  onRemove: (id: string) => void
  selectedCountry: 'Belgique' | 'Luxembourg' | 'France'
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, selectedCountry }) => {
  const { id, name, image, price, quantity, color, shippingOptions } = item

  const shippingCost = shippingOptions[selectedCountry]
  const isShippable = shippingCost !== undefined && shippingCost !== null

  return (
    <div className="relative bg-white p-4 rounded-lg border-2 border-black mb-4 shadow-sm">
      <button
        onClick={() => onRemove(id)}
        className="absolute top-1 right-1 p-1 text-red-500 hover:text-red-700"
        aria-label="Close"
        style={{ outline: 'none' }} // Ensures that there is no focus outline that could disrupt the aesthetic
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4" // Smaller icon size for a more refined look
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={image} alt={name} className="h-20 w-20 rounded-full object-cover" />
          <div className="flex flex-col">
            <div className="text-lg font-medium text-gray-800">{name}</div>
            {color && <div className="text-sm text-gray-500">Couleur : {color}</div>}
            <div className="text-sm text-gray-500">Quantité : {quantity}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="text-lg font-semibold text-gray-900">{(price * quantity).toFixed(2)} €</div>
          {isShippable ? (
            <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm">
              Livraison : {shippingCost} €
            </span>
          ) : (
            <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm">Pas livrable</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartItem

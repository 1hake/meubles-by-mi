import React from 'react'

interface CartItemProps {
  item: {
    id: string
    name: string
    image: string
    price: number
    quantity: number
    color?: string // Optional color property
  }
  onRemove: (id: string) => void
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const { id, name, image, price, quantity, color } = item

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <img src={image} alt={name} className="h-20 w-20 rounded-full object-cover" />
          <div className="flex flex-col">
            <div className="text-lg font-medium text-gray-800">{name}</div>
            {color && <div className="text-sm text-gray-500">Couleur : {color}</div>} {/* Display color if available */}
            <div className="text-sm text-gray-500">Quantité : {quantity}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold text-gray-900">{(price * quantity).toFixed(2)} €</div>
          <button
            onClick={() => onRemove(id)}
            className="text-white bg-red-500 hover:bg-red-600 rounded-md px-4 py-2 transition duration-300 ease-in-out"
          >
            Retirer
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem

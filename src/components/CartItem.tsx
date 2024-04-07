import React from 'react'

interface CartItemProps {
  item: {
    id: string
    name: string
    image: string
    price: number
    quantity: number
  }
  onRemove: (id: string) => void
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const { id, name, image, price, quantity } = item

  return (
    <div className="flex justify-between items-center mb-4 bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center">
        <img src={image} alt={name} className="h-16 w-16 rounded-full object-cover mr-4" />
        <div>
          <div className="text-xl font-medium">{name}</div>
          <div className="text-gray-500">Quantity: {quantity}</div>
        </div>
      </div>
      <div className="text-lg font-semibold">{(price * quantity).toFixed(2)}€</div>
      <button onClick={() => onRemove(id)} className="ml-4 text-red-500 hover:text-red-700 font-semibold">
        Remove
      </button>
    </div>
  )
}

export default CartItem

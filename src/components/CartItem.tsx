import React from 'react'

interface PriceRow {
  quantity: string
  price: string
}

interface Variant {
  color: string
  image: string
  quantity: number
}

interface CartItemProps {
  item: {
    id: string
    name: string
    variants: Variant[]
    shippingOptions: {
      Belgique?: number | null
      Luxembourg?: number | null
      France?: number | null
    }
    priceOption: PriceRow[]
  }
  onRemove: (id: string) => void
  selectedCountry: 'Belgique' | 'Luxembourg' | 'France'
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, selectedCountry }) => {
  const { id, name, variants, shippingOptions, priceOption } = item

  const shippingCost = shippingOptions[selectedCountry] ?? 10 // Default shipping cost
  const totalQuantity = variants.reduce((sum, variant) => sum + variant.quantity, 0)
  const totalPrice = priceOption.reduce((acc, option) => {
    if (parseInt(option.quantity) <= totalQuantity) {
      return parseFloat(option.price) * totalQuantity // Calculate price based on the matched tier
    }
    return acc
  }, 0)

  const savings = parseFloat(priceOption[0].price) * totalQuantity - totalPrice // Calculate savings

  return (
    <div className="relative bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-sm">
      <button onClick={() => onRemove(id)} className="absolute top-1 right-1 p-1 text-red-500 hover:text-red-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        {variants.map((variant, index) => (
          <div key={index} className="flex justify-between items-center p-2">
            <div className="flex items-center space-x-3">
              <img src={variant.image} alt={`${variant.color} color variant`} className="h-12 w-12 rounded-full" />
              <div>
                <p className="text-sm text-gray-500">{`Couleur : ${variant.color}`}</p>
                <p className="text-sm text-gray-500">{`Quantité : ${variant.quantity}`}</p>
              </div>
            </div>
          </div>
        ))}
        <p className="text-right text-xl font-semibold">{`Prix Total : ${totalPrice.toFixed(2)} €`}</p>
        {savings > 0 && <p className="text-right text-green-500">{`Économies réalisées : ${savings.toFixed(2)} €`}</p>}
      </div>
    </div>
  )
}

export default CartItem

import React, { useEffect, useState } from 'react'

interface PromotionTagProps {
  percentage: number
}

const PromotionTag: React.FC<PromotionTagProps> = ({ percentage }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-red-500 text-white rounded-full px-2 py-1 text-xs uppercase font-semibold tracking-wide">
        <div className="text-white">PROMOTION</div>
      </div>
    </div>
  )
}

interface ProductCardProps {
  src: string
  name: string
  price: number
  description?: string // Make description optional
  promotion?: number
  new?: boolean
  onClick: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  src,
  name,
  price,
  description = '', // Default to an empty string if no description is provided
  promotion,
  new: isNew,
  onClick
}) => {
  const [truncatedDescription, setTruncatedDescription] = useState<string>(description)
  const maxDescriptionLength = 100 // Adjust as needed

  useEffect(() => {
    if (description && description.length > maxDescriptionLength) {
      setTruncatedDescription(description.slice(0, maxDescriptionLength) + '...')
    } else {
      setTruncatedDescription(description)
    }
  }, [description])

  return (
    <div
      onClick={() => onClick()}
      className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform ease-in-out duration-300 transform"
    >
      <img src={src} alt={name} className="w-full h-56 object-cover cursor-pointer mb-2" />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <div className="flex items-center space-x-2">
          {isNew && (
            <span className="bg-yellow-500 text-white rounded-full px-2 py-1 text-xs uppercase font-semibold tracking-wide">
              Nouveauté
            </span>
          )}
          {promotion && <PromotionTag percentage={promotion} />}
        </div>
        {truncatedDescription ? (
          <p className="text-gray-700 text-sm mb-2">{truncatedDescription}</p>
        ) : (
          <p className="text-gray-500 text-sm mb-2">No description available.</p> // Display a default message when there's no description
        )}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-gray-800 text-xl">{price}€</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

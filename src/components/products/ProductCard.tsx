import React, { useEffect, useState } from 'react'

interface PromotionTagProps {
  percentage: number
}

const PromotionTag: React.FC<PromotionTagProps> = ({ percentage }) => {
  return (
    <div className="bg-red-500 text-white rounded-full px-2 py-1 text-xs uppercase font-semibold tracking-wide">
      -{percentage}%
    </div>
  )
}

interface ProductCardProps {
  src: string
  name: string
  price: number
  description?: string
  promotion?: number
  new?: boolean
  onClick: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  src,
  name,
  price,
  description = '',
  promotion,
  new: isNew,
  onClick
}) => {
  const [truncatedDescription, setTruncatedDescription] = useState<string>(description)
  const maxDescriptionLength = 100

  useEffect(() => {
    if (description.length > maxDescriptionLength) {
      setTruncatedDescription(`${description.slice(0, maxDescriptionLength)}...`)
    } else {
      setTruncatedDescription(description)
    }
  }, [description])

  return (
    <div
      onClick={onClick}
      className="bg-white shadow-lg rounded-lg overflow-hidden border-2 border-black cursor-pointer flex flex-col justify-between"
    >
      <img src={src} alt={name} className="w-full h-auto object-cover mb-2" />
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
        <p className="text-gray-700 text-sm mb-2">{truncatedDescription || 'Aucune description disponible.'}</p>
      </div>
      <div className="p-4 mt-auto flex justify-end bg-black">
        <p className="text-white text-2xl font-bold">{`${price}€`}</p>
      </div>
    </div>
  )
}

export default ProductCard

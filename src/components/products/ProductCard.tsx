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
  colorNb: number
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
  colorNb,
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
      className="bg-white rounded-lg overflow-hidden border-2 border-gray-900 cursor-pointer flex flex-col justify-between"
    >
      <img src={src} alt={name} className="md:w-full md:h-48 h-full w-full object-cover mb-2" />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-3xl lg:text-lg uppercase  text-gray-700 font-bold mb-1">{name}</h3>
        <div className="flex items-center space-x-2">
          {isNew && (
            <span className="bg-yellow-500 text-white rounded-full px-2 py-1 text-xs uppercase font-semibold tracking-wide">
              Nouveauté
            </span>
          )}
          {promotion && <PromotionTag percentage={promotion} />}
        </div>
        {truncatedDescription && <p className="text-gray-700 text-sm mb-2">{truncatedDescription}</p>}
      </div>
      <div className="px-4 py-2 mt-auto flex justify-end gap-3 bg-gray-900">
        {colorNb > 0 && (
          <div className="bg-white flex justify-center items-center text-gray-700 px-2 py-1 text-xs tracking-wide rounded-3xl">
            {colorNb} autres...
          </div>
        )}
        <p className="text-white text-xl font-bold">{`${price}€`}</p>
      </div>
    </div>
  )
}

export default ProductCard

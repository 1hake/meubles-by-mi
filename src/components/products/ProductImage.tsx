import React from 'react'

import Button from '../common/Button'

interface ProductImageProps {
  mainImage: string
  productName: string
  onClick: () => void
}

const ProductImage: React.FC<ProductImageProps> = ({ mainImage, productName, onClick }) => {
  return (
    <div className="flex flex-col col-span-4 items-center relative">
      <img onClick={onClick} src={mainImage} alt={productName} className=" rounded-lg shadow-md" />
      <Button className="absolute bottom-4" color="light" onClick={onClick}>
        Voir en grand format
      </Button>
    </div>
  )
}

export default ProductImage

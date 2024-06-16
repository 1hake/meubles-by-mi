import React from 'react'

interface ProductDescriptionProps {
  description: string
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
  return (
    <>
      <h1 className="text-xl font-bold my-4">Description :</h1>
      <p className="text-gray-700 mb-4">{description}</p>
    </>
  )
}

export default ProductDescription

import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { NumberInput } from '../common/inputs/NumberInput'
import { BatchItem, Product } from '../types/types'
import ProductDescription from './ProductDescription'
import ProductOptions from './ProductOptions'

interface ProductInfoProps {
  product: Product
  productHasShippingOptions: boolean
  batchItems: BatchItem[]
  setOpenModal: (open: boolean) => void
  handleColorQuantityChange: (color: string, quantity: number) => void
  handleImageClick: (image?: string) => void
  defaultQuantity: number
  setDefaultQuantity: (quantity: number) => void
  isModalOpen: boolean
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  productHasShippingOptions,
  batchItems,
  setOpenModal,
  handleColorQuantityChange,
  handleImageClick,
  defaultQuantity,
  isModalOpen,
  setDefaultQuantity
}) => {
  return (
    <div className="col-span-4 lg:col-span-3">
      {!productHasShippingOptions && (
        <div className="flex justify-center  items-center  text-white w-full">
          <div className="-z-1 flex justify-center p-3 items-center bg-blue-500 text-white w-[90%] rounded-t-xl">
            <FontAwesomeIcon icon={faTruck} className="mr-2" size="1x" />
            <span className="font-bold">LIVRAISON GRATUITE</span>
          </div>
        </div>
      )}
      <div className="border-2 border-black p-4 rounded bg-gray-100 h-full">
        <div className="flex flex-col justify-center align-items p-4 bg-gray-100 rounded-md gap-y-2">
          <div className="flex justify-between w-full">
            <h1 className="text-3xl font-bold capitalize">{product.name}</h1>
          </div>
          {product.priceOptions && product.priceOptions.length > 0 && (
            <ProductOptions isModalOpen={isModalOpen} openModal={setOpenModal} priceOptions={product.priceOptions} />
          )}
        </div>
        {batchItems.length > 0 ? (
          <div>
            <h1 className="text-xl font-bold my-4">Choisissez vos couleurs/tailles :</h1>
            {batchItems.map((item, index) => (
              <div
                onClick={() => handleImageClick(item.image)}
                key={index}
                className="cursor-pointer flex items-center justify-between p-2 bg-gray-100 rounded"
              >
                <div className="flex items-center gap-2 cursor-pointer flex-col lg:flex-row md:flex-row">
                  {item.price && <span className="font-semibold text-xl text-black">{item.price} €</span>}
                  {item.image && (
                    <img src={item.image} alt={`Image of ${item.color}`} className="h-16 w-16 rounded-full shadow" />
                  )}
                  <span className="font-semibold">{item.color}</span>
                </div>
                <NumberInput value={item.quantity} onChange={(value) => handleColorQuantityChange(item.color, value)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="cursor-pointer flex flex-row items-center justify-between p-2 bg-gray-100 rounded">
            <img src={product.main_image} alt={`Image of ${product.name}`} className="h-16 w-16 rounded-full shadow" />
            <NumberInput value={defaultQuantity} onChange={setDefaultQuantity} />
          </div>
        )}
        {product.description && <ProductDescription description={product.description} />}
      </div>
    </div>
  )
}

export default ProductInfo

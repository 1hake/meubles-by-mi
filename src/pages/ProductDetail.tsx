import 'yet-another-react-lightbox/styles.css'

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Lightbox from 'yet-another-react-lightbox'

import PriceDisplay from '../components/cart/price/PriceDisplay'
import { PriceOptionModal } from '../components/cart/price/PriceOptionModal'
import { NumberInput } from '../components/common/inputs/NumberInput'
import { Loader } from '../components/common/Loader'
import { SectionTitle } from '../components/common/SectionTitle'
import { ColorImage, Product } from '../components/types/types'
import { useCartContext } from '../context/CartContext'
import useSingleDoc from '../hooks/useSingleDoc'
import { calculateStandardPrice, calculateTotalPrice } from '../utils/prices'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [batchItems, setBatchItems] = useState<ColorImage[]>([])
  const [openModal, setOpenModal] = useState(false)

  const { addBatch } = useCartContext()
  const product = useSingleDoc<Product>('products', id)
  console.log('🚀 ~ product:', product)

  useEffect(() => {
    if (product && product.color_images) {
      setBatchItems(product.color_images.map((ci) => ({ ...ci, quantity: 0 })))
    }
  }, [product])

  if (!product) {
    return <Loader />
  }

  const handleColorQuantityChange = (color: string, quantity: number) => {
    setBatchItems(batchItems.map((item) => (item.color === color ? { ...item, quantity } : item)))
  }

  const handleBuyClick = () => {
    if (totalPrice > 0 || standardPrice > 0) {
      const itemToAdd = {
        id: product.id,
        name: product.name,
        variants: batchItems
          .filter((item) => item.quantity > 0)
          .map((item) => ({
            color: item.color,
            image: item.image,
            quantity: item.quantity
          })),
        ref: product.ref,
        priceOption: product.priceOptions,
        shippingOptions: product.shippingOptions
      }
      addBatch([itemToAdd])
      setBatchItems(batchItems.map((item) => ({ ...item, quantity: 0 }))) // Reset quantities after adding to cart
    }
  }

  const totalPrice = calculateTotalPrice(batchItems, product.priceOptions)
  const standardPrice = calculateStandardPrice(batchItems, product.priceOptions)

  return (
    <div className="bg-white text-black relative pb-20">
      <SectionTitle>{product.name}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 p-4">
        <div className="flex flex-col col-span-3 items-center">
          <img
            src={product.main_image}
            alt={product.name}
            className="max-w-full h-auto object-cover rounded-lg shadow-md"
            onClick={() => setLightboxOpen(true)}
          />
          <button
            className="mt-4 bg-black text-white text-sm font-bold uppercase px-6 py-2 rounded shadow hover:bg-gray-900"
            onClick={() => setLightboxOpen(true)}
          >
            Voir en grand format
          </button>
        </div>
        <div className="col-span-3 lg:col-span-4 md:col-span-2">
          <div className="flex flex-col justify-center align-items p-4 bg-gray-100 rounded">
            <h2 className="text-2xl font-bold">Prix initial : {product.priceOptions[0].price} €</h2>
            <button
              className="bg-white text-black border-2 border-black font-medium uppercase px-6 py-3 rounded shadow hover:bg-gray-900 hover:text-white mt-4"
              onClick={() => setOpenModal(true)}
            >
              Voir les options de prix
            </button>
            <PriceOptionModal isOpen={openModal} setIsOpen={setOpenModal} productOption={product.priceOptions} />
          </div>
          {batchItems.map((item, index) => (
            <div key={index} className="flex flex-row items-center justify-between mb-4 p-2 bg-gray-100 rounded">
              <div className="flex items-center gap-2">
                <img src={item.image} alt={`Image of ${item.color}`} className="h-16 w-16 rounded-full shadow" />
                <span className="font-semibold">{item.color}</span>
              </div>
              <NumberInput value={item.quantity} onChange={(value) => handleColorQuantityChange(item.color, value)} />
            </div>
          ))}
          <p className="text-gray-700 mb-4">{product.description}</p>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 bg-black text-white p-4 flex justify-between items-center shadow-lg z-50 mt-4">
        <PriceDisplay totalPrice={totalPrice} standardPrice={standardPrice} />
        <button
          className="bg-white text-black font-medium uppercase px-6 py-3 rounded shadow hover:bg-gray-300"
          onClick={handleBuyClick}
        >
          Ajouter le lot au panier
        </button>
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={[
          { src: product.main_image },
          ...product.related_images.map((ri) => ({ src: ri })),
          ...product.color_images.map((ci) => ({ src: ci.image }))
        ]}
      />
    </div>
  )
}

export default ProductDetail

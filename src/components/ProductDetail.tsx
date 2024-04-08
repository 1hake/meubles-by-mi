import 'yet-another-react-lightbox/styles.css'

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Lightbox from 'yet-another-react-lightbox'

import { useCartContext } from '../context/CartContext'
import useSingleDoc from '../hooks/useSingleDoc'
import NumberInput from './NumberInput'
import { SectionTitle } from './SectionTitle'

interface ColorImage {
  color: string
  image: string
}

interface Product {
  id: string
  name: string
  price: number
  description: string
  color_images: ColorImage[]
  main_image: string
  related_images: string[]
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)
  const { addItem } = useCartContext()

  const product = useSingleDoc<Product>('products', id)
  if (!product) {
    return <p className="text-center text-lg">Loading...</p>
  }

  const { name, price, description, color_images, main_image, related_images } = product

  const images = [main_image, ...related_images, ...color_images.map((ci) => ci.image)]

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
    setLightboxOpen(true)
  }

  const handleQuantityChange = (value: number) => {
    setQuantity(value)
  }

  const handleBuyClick = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor || 'Default',
      quantity,
      image: selectedImage || main_image,
      ref: product.ref
    })
  }

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedColorImage = color_images.find((ci) => ci.color === event.target.value)
    setSelectedColor(event.target.value)
    setSelectedImage(selectedColorImage ? selectedColorImage.image : main_image)
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8">
      <SectionTitle className="text-3xl text-gray-800 font-bold mb-6">{name}</SectionTitle>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-start justify-items-center p-4 bg-white">
        <img
          src={selectedImage || main_image}
          alt={name}
          className="lg:col-span-2 w-full h-96 object-cover rounded-lg shadow-md cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        />
        <div className="lg:col-span-1 flex flex-row lg:flex-col overflow-auto md:overflow-x-auto lg:overflow-y-auto gap-3">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Related image ${index}`}
              className="w-full md:w-auto lg:w-full h-14 object-cover rounded-lg shadow-sm cursor-pointer"
              onClick={() => handleImageClick(img)}
            />
          ))}
        </div>
        <div className="lg:col-span-2 w-full">
          <p className="text-2xl font-bold ">{price.toFixed(2)} €</p>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">Quantité:</label>
              <NumberInput
                value={quantity}
                onChange={handleQuantityChange}
                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">Couleur:</label>
              <select
                className="bg-white border border-gray-300 rounded-lg p-2 cursor-pointer shadow-sm focus:border-blue-500 focus:outline-none"
                onChange={handleColorChange}
                value={selectedColor}
              >
                {color_images.map((ci, index) => (
                  <option key={index} value={ci.color}>
                    {ci.color}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="bg-blue-500 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 ease-in-out mt-4"
              onClick={handleBuyClick}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={[
            { src: selectedImage || main_image },
            ...related_images.map((ri) => ({ src: ri })),
            ...color_images.map((ci) => ({ src: ci.image }))
          ]}
        />
      </div>
    </div>
  )
}

export default ProductDetail

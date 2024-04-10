import 'yet-another-react-lightbox/styles.css'

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Lightbox from 'yet-another-react-lightbox'

import { useCartContext } from '../context/CartContext'
import useSingleDoc from '../hooks/useSingleDoc'
import { Loader } from './Loader'
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
    return <Loader />
  }

  const { name, price, description, color_images, main_image, related_images } = product

  const handleImageClick = (image: string, color?: string) => {
    setSelectedImage(image)
    if (color) {
      setSelectedColor(color)
    }
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
    <div className="  bg-white text-black">
      <SectionTitle className="text-2xl font-bold mb-6">{name}</SectionTitle>
      <div className="w-full h-full grid md:grid-cols-3 lg:grid-cols-7 gap-12 p-4">
        <div className="flex flex-col col-span-3 items-center">
          <img
            src={selectedImage || main_image}
            alt={name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            onClick={() => setLightboxOpen(true)}
          />
          <button
            className="mt-4 bg-black text-white text-sm font-bold uppercase px-6 py-2 rounded shadow hover:bg-gray-900"
            onClick={() => setLightboxOpen(true)}
          >
            Voir en grand format
          </button>
        </div>
        <div className="lg:col-span-1 col-span-3 flex lg:flex-col gap-3 overflow-auto">
          {color_images.map((ci, index) => (
            <img
              key={index}
              src={ci.image}
              alt={`Image of ${ci.color}`}
              className="h-24 w-full object-cover rounded shadow cursor-pointer"
              onClick={() => handleImageClick(ci.image, ci.color)}
            />
          ))}
        </div>
        <div className="col-span-3 gap-2">
          <p className="text-2xl font-bold">{price.toFixed(2)} €</p>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Quantité:</label>
              <NumberInput
                value={quantity}
                onChange={handleQuantityChange}
                className="border-2 border-black rounded px-3 py-1 outline-none focus:border-gray-800"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Couleur:</label>
              <select
                className="border-2 border-black rounded px-3 py-2 cursor-pointer shadow-sm focus:border-gray-800"
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
              className="bg-black text-white font-medium uppercase px-6 py-3 rounded shadow hover:bg-gray-900"
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

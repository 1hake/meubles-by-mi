import 'yet-another-react-lightbox/styles.css'

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Lightbox from 'yet-another-react-lightbox'

import { useCartContext } from '../context/CartContext'
import useSingleDoc from '../hooks/useSingleDoc'
import NumberInput from './NumberInput'
import { SectionTitle } from './SectionTitle'

const availableColors = ['red', 'green', 'blue', 'yellow'] // Add your array of colors

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCartContext()

  const singleElement = useSingleDoc('products', id)
  console.log('🚀 ~ ProductDetail ~ singleElement:', singleElement)

  const handleImageClick = () => {
    setLightboxOpen(true)
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(e)
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e)
  }

  const handleBuyClick = () => {
    // Add item to cart using useCart hook
    addItem({
      id: singleElement.id,
      name: singleElement.name,
      price: singleElement.price,
      color: selectedColor,
      quantity: quantity,
      image: singleElement.main_image,
      facebookProductUrl: singleElement.facebookProductUrl
    })
    console.log(`Added ${quantity} ${selectedColor} ${singleElement.name}(s) to cart`)
  }

  const navigateTo = (url: string) => {
    // go to facebook page
    window.location.href = url
  }

  if (!singleElement) {
    return null
  }

  const { name, main_image, related_images, description, price } = singleElement

  return (
    <div className="flex flex-col">
      <SectionTitle id="showcase">{name}</SectionTitle>
      <div className="container gap-10 mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-center">
        <div className="w-full lg:w-1/2 ">
          <div className="mb-4 lg:h-full">
            <img src={main_image} alt={name} className="w-full h-auto lg:h-full rounded-lg" />
          </div>
        </div>
        <div className="flex lg:flex-col gap-4 justify-start">
          {related_images.length > 0 &&
            related_images.map((relatedImage, index) => (
              <img
                key={index}
                src={relatedImage}
                alt={`Related Image ${index + 1}`}
                className="h-auto cursor-pointer rounded-lg max-w-[100px]"
                onClick={handleImageClick}
              />
            ))}
        </div>
        <div className="lg:border-2 border-black lg:h-80 mx-8"></div>

        {/* Related Images Section */}

        <div className="w-full lg:w-1/2">
          <div className="text-left mb-4">
            {/* <h1 className="text-3xl font-bold mb-2">{name}</h1> */}
            <p className="text-2xl font-bold mb-2">{price.toFixed(2)}€</p>
            <p className="text-base mb-4">{description}</p>

            <div className="flex flex-col lg:flex-row gap-4 mb-4 justify-center items-center">
              {/* Color Chooser Input */}
              {/* <div className="mb-4 lg:mb-0">
                <label className="block text-sm mb-2">Choissisez une couleur:</label>
                <ColorChooser
                  colors={availableColors}
                  selectedColor={selectedColor}
                  onColorChange={handleColorChange}
                />
              </div> */}

              {/* Quantity Input */}
              <div className="mb-4 lg:mb-0">
                <label className="block text-sm mb-2">Quantité:</label>
                <NumberInput value={quantity} onChange={handleQuantityChange} />
              </div>

              {/* Buy Button */}
            </div>
            <button
              disabled={!singleElement.facebookProductUrl}
              className="bg-blue-500 w-full mt-8 text-white px-8 py-4 rounded-lg"
              onClick={() => handleBuyClick()}
            >
              Acheter
            </button>
          </div>
        </div>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={[
            { src: main_image },
            ...related_images.map((image) => ({
              src: image
            }))
          ]}
        />
      </div>
    </div>
  )
}

export default ProductDetail

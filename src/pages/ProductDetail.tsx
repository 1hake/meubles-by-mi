import 'yet-another-react-lightbox/styles.css'

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Lightbox from 'yet-another-react-lightbox'

import PriceDisplay from '../components/cart/price/PriceDisplay'
import { PriceOptionModal } from '../components/cart/price/PriceOptionModal'
import { NumberInput } from '../components/common/inputs/NumberInput'
import { Loader } from '../components/common/Loader'
import { ColorImage, Product } from '../components/types/types'
import { useCartContext } from '../context/CartContext'
import useSingleDoc from '../hooks/useSingleDoc'
import { calculateStandardPrice, calculateTotalPrice } from '../utils/prices'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [batchItems, setBatchItems] = useState<ColorImage[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [mainImage, setMainImage] = useState<string>('')
  const [defaultQuantity, setDefaultQuantity] = useState<number>(0)
  const navigate = useNavigate()

  const { addBatch } = useCartContext()

  const product: Product = useSingleDoc('products', id)

  useEffect(() => {
    if (product) {
      setMainImage(product.main_image)
      if (product.color_images && product.color_images.length > 0) {
        setBatchItems(product.color_images.map((ci) => ({ ...ci, quantity: 0 })))
      }
    }
  }, [product])

  if (!product) {
    return <Loader />
  }

  const handleColorQuantityChange = (color: string, quantity: number) => {
    batchItems.forEach((item) => {
      if (item.color === color) {
        if (quantity > item.availableQuantity) {
          toast.error(`Il ne reste que ${item.availableQuantity} exemplaires de ${product.name} en ${color}`)
          return
        }
      }
    })
    setBatchItems(batchItems.map((item) => (item.color === color ? { ...item, quantity } : item)))
  }

  const handleBuyClick = () => {
    let quantitiesError = false

    batchItems.forEach((item) => {
      if (item.quantity > item.availableQuantity) {
        toast.error(`Il ne reste que ${item.availableQuantity} exemplaires de ${product.name} en ${item.color}`)
        quantitiesError = true
      }
    })

    if (quantitiesError) {
      return
    }

    const totalPrice = calculateTotalPrice(batchItems, product.priceOptions)
    const standardPrice = calculateStandardPrice(batchItems, product.priceOptions)

    if (batchItems.length === 0 && defaultQuantity <= 0) {
      toast.error("Veuillez spécifier une quantité avant d'ajouter au panier.")
      return
    }

    const itemToAdd = {
      id: product.id,
      name: product.name,
      variants:
        batchItems.length > 0
          ? batchItems
              .filter((item) => item.quantity > 0)
              .map((item) => ({
                color: item.color,
                image: item.image,
                quantity: item.quantity
              }))
          : [
              {
                color: 'Default',
                image: product.main_image,
                quantity: defaultQuantity
              }
            ],
      ref: product.ref,
      priceOption: product.priceOptions,
      shippingOptions: product.shippingOptions
    }
    addBatch([itemToAdd])
    setBatchItems(batchItems.map((item) => ({ ...item, quantity: 0 }))) // Reset quantities after adding to cart
    if (batchItems.length === 0) {
      setDefaultQuantity(0) // Reset default quantity
    }
    toast.success('Lot ajouté au panier')
    navigate('/')
  }

  const handleImageClick = (image: string) => {
    setMainImage(image)
  }

  const totalPrice =
    batchItems.length > 0
      ? calculateTotalPrice(batchItems, product.priceOptions)
      : calculateTotalPrice([{ ...product, quantity: defaultQuantity }], product.priceOptions)
  const standardPrice =
    batchItems.length > 0
      ? calculateStandardPrice(batchItems, product.priceOptions)
      : calculateStandardPrice([{ ...product, quantity: defaultQuantity }], product.priceOptions)

  return (
    <div className="bg-white text-black relative pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 p-4">
        <div className="flex flex-col col-span-4 items-center relative">
          <img
            onClick={() => setLightboxOpen(true)}
            src={mainImage}
            alt={product.name}
            className="h-full rounded-lg shadow-md"
          />
          <button
            className="absolute bottom-4 bg-black text-white text-sm font-bold uppercase px-6 py-2 rounded shadow hover:bg-gray-900"
            onClick={() => setLightboxOpen(true)}
          >
            Voir en grand format
          </button>
        </div>
        <div className="col-span-3 lg:col-span-3 md:col-span-2">
          <div className="border-2 border-black p-4 rounded bg-gray-100 h-full">
            <div className="flex flex-col justify-center align-items p-4 bg-gray-100 rounded-md">
              <div className="flex justify-between w-full">
                <h1 className="text-3xl font-bold capitalize">{product.name}</h1>
                <h2 className="text-2xl font-bold">{product.priceOptions[0].price} €</h2>
              </div>
              <button
                className="bg-white text-black border-2 border-black font-medium uppercase px-6 py-3 rounded shadow hover:bg-gray-900 hover:text-white mt-4"
                onClick={() => setOpenModal(true)}
              >
                Voir les options de prix
              </button>
              <PriceOptionModal isOpen={openModal} setIsOpen={setOpenModal} productOption={product.priceOptions} />
            </div>
            {batchItems.length > 0 ? (
              <div>
                <h1 className="text-xl font-bold my-4">Choisissez vos couleurs :</h1>
                {batchItems.map((item, index) => (
                  <div
                    onClick={() => handleImageClick(item.image)}
                    key={index}
                    className="cursor-pointer flex flex-row items-center justify-between p-2 bg-gray-100 rounded"
                  >
                    <div className="flex items-center gap-2 cursor-pointer">
                      <img src={item.image} alt={`Image of ${item.color}`} className="h-16 w-16 rounded-full shadow" />
                      <span className="font-semibold">{item.color}</span>
                    </div>
                    <NumberInput
                      value={item.quantity}
                      onChange={(value) => handleColorQuantityChange(item.color, value)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="cursor-pointer flex flex-row items-center justify-between p-2 bg-gray-100 rounded">
                <img
                  src={product.main_image}
                  alt={`Image of ${product.name}`}
                  className="h-16 w-16 rounded-full shadow"
                />
                <NumberInput value={defaultQuantity} onChange={setDefaultQuantity} />
              </div>
            )}
            {product.description && (
              <>
                <h1 className="text-xl font-bold my-4">Description :</h1>
                <p className="text-gray-700 mb-4">{product.description}</p>
              </>
            )}
          </div>
        </div>
      </div>
      {totalPrice > 0 && (
        <div className="fixed inset-x-0 bottom-0 bg-black text-white p-4 flex justify-between lg:justify-center lg:gap-2 items-center shadow-lg z-50 mt-8">
          <PriceDisplay totalPrice={totalPrice} standardPrice={standardPrice} />
          <button
            className="bg-white text-black font-medium uppercase px-2 py-3 rounded shadow hover:bg-gray-300"
            onClick={handleBuyClick}
          >
            Ajouter le lot au panier
          </button>
        </div>
      )}
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

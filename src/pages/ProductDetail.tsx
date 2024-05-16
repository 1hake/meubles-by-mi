import 'yet-another-react-lightbox/styles.css'

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Lightbox from 'yet-another-react-lightbox'

import PriceDisplay from '../components/cart/price/PriceDisplay'
import { PriceOptionModal } from '../components/cart/price/PriceOptionModal'
import Button from '../components/common/Button'
import { NumberInput } from '../components/common/inputs/NumberInput'
import { Loader } from '../components/common/Loader'
import { BatchItem, Product } from '../components/types/types'
import { useCartContext } from '../context/CartContext'
import useSingleDoc from '../hooks/useSingleDoc'
import { calculatePriceByColor, calculateStandardPrice, calculateTotalPrice } from '../utils/prices'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [batchItems, setBatchItems] = useState<BatchItem[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [mainImage, setMainImage] = useState<string>('')
  const [defaultQuantity, setDefaultQuantity] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [standardPrice, setStandardPrice] = useState<number>(0)
  const navigate = useNavigate()

  const { addBatch } = useCartContext()

  const product: Product = useSingleDoc('products', id)

  const productHasShippingOptions = product?.shippingOptions && product.shippingOptions.France > 0

  const productHasColorPrice =
    product?.color_images &&
    product.color_images.length > 0 &&
    product.color_images[0].price !== null &&
    product.color_images[0].price !== 0

  useEffect(() => {
    if (product) {
      if (productHasColorPrice) {
        setTotalPrice(calculatePriceByColor(batchItems, product.color_images))
      }
      if (product.priceOptions && product.priceOptions.length > 0) {
        setTotalPrice(calculateTotalPrice(batchItems, product.priceOptions || []))
      }
      setStandardPrice(calculateStandardPrice(batchItems, product.priceOptions || []))
    }
  }, [batchItems, product])

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
    setBatchItems(
      batchItems.map((item) => {
        if (item.color === color) {
          return { ...item, quantity }
        }
        return item
      })
    )
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

    if ((batchItems.length === 0 && defaultQuantity <= 0) || totalPrice <= 0) {
      toast.error("Veuillez spécifier une quantité avant d'ajouter au panier.")
      return
    }

    const itemToAdd = {
      id: product.id,
      name: product.name,
      variants: batchItems.filter((item) => item.quantity > 0),
      ref: product.ref,
      priceOption: product.priceOptions,
      color_images: product.color_images,
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

  const handleImageClick = (image?: string) => {
    if (!image) {
      return
    }
    setMainImage(image)
  }

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
          <Button className="absolute bottom-4" color="light" onClick={() => setLightboxOpen(true)}>
            Voir en grand format
          </Button>
        </div>
        <div className="col-span-4 lg:col-span-3 md:col-span-3">
          {!productHasShippingOptions && (
            <div className="flex justify-center  items-center  text-white w-full">
              <div className="-z-1 flex justify-center p-3 items-center bg-blue-500 text-white w-[90%] rounded-t-xl">
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
                <Button onClick={() => setOpenModal(true)}>Voir les options de prix</Button>
              )}
              {product.priceOptions && product.priceOptions.length > 0 && (
                <PriceOptionModal isOpen={openModal} setIsOpen={setOpenModal} productOption={product.priceOptions} />
              )}
            </div>
            {batchItems.length > 0 ? (
              <div>
                <h1 className="text-xl font-bold my-4">Choisissez vos couleurs :</h1>
                {batchItems.map((item, index) => (
                  <div
                    onClick={() => handleImageClick(item.image)}
                    key={index}
                    className="cursor-pointer flex items-center justify-between p-2 bg-gray-100 rounded"
                  >
                    <div className="flex items-center gap-2 cursor-pointer flex-col lg:flex-row md:flex-row">
                      {item.price && <span className="font-semibold text-xl text-black">{item.price} €</span>}
                      {item.image && (
                        <img
                          src={item.image}
                          alt={`Image of ${item.color}`}
                          className="h-16 w-16 rounded-full shadow"
                        />
                      )}
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
          <Button color="dark" onClick={handleBuyClick}>
            Ajouter le lot au panier
          </Button>
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

import 'yet-another-react-lightbox/styles.css'

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Lightbox from 'yet-another-react-lightbox'

import PriceDisplay from '../components/cart/price/PriceDisplay'
import Button from '../components/common/Button'
import { Loader } from '../components/common/Loader'
import ProductImage from '../components/products/ProductImage'
import ProductInfo from '../components/products/ProductInfo'
import { BatchItem, Product } from '../components/types/types'
import { useCartContext } from '../context/CartContext'
import useSingleDoc from '../hooks/useSingleDoc'
import { calculatePriceByColor, calculateTotalPrice } from '../utils/prices'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [batchItems, setBatchItems] = useState<BatchItem[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [mainImage, setMainImage] = useState<string>('')
  const [defaultQuantity, setDefaultQuantity] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const navigate = useNavigate()

  const { addBatch } = useCartContext()

  const product: Product = useSingleDoc('products', id)

  const productHasShippingOptions = product?.shippingOptions && product.shippingOptions.France > 0

  const productHasColorPrice =
    product?.color_images &&
    product.color_images.length > 0 &&
    product.color_images.some((ci) => ci.price && ci.price > 0)

  useEffect(() => {
    if (product) {
      if (productHasColorPrice) {
        setTotalPrice(calculatePriceByColor(batchItems, product.color_images))
      }
      if (product.priceOptions && product.priceOptions.length > 0) {
        setTotalPrice(calculateTotalPrice(batchItems, product.priceOptions || []))
      }
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
      main_image: product.main_image,
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 p-4 mb-8">
        <ProductImage mainImage={mainImage} productName={product.name} onClick={() => setLightboxOpen(true)} />
        <ProductInfo
          product={product}
          productHasShippingOptions={productHasShippingOptions}
          batchItems={batchItems}
          isModalOpen={openModal}
          setOpenModal={setOpenModal}
          handleColorQuantityChange={handleColorQuantityChange}
          handleImageClick={handleImageClick}
          defaultQuantity={defaultQuantity}
          setDefaultQuantity={setDefaultQuantity}
        />
      </div>
      {totalPrice > 0 && (
        <div className="h-32 md:h-24 fixed inset-x-0 bottom-0 bg-black text-white p-4 flex justify-between lg:justify-center lg:gap-2 items-center shadow-lg z-50 mt-8">
          <PriceDisplay totalPrice={totalPrice} />
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

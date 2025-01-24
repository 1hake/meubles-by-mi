import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { CartItem, Country, OrderInfo, ShippingAddress } from '../components/types/types'
import { calculatePriceByColor, calculateTotalPrice } from '../utils/prices'
import { useAuth } from './AuthContext'

interface CartContextType {
  cart: CartItem[]
  addBatch: (newItems: CartItem[]) => void
  removeBatch: (itemId: string) => void
  shippingAddress: ShippingAddress
  setShippingAddress: (address: ShippingAddress) => void
  selectedCountry: Country
  setSelectedCountry: (country: Country) => void
  totalPrice: number
  addressCompleted: boolean
  setAddressCompleted: (completed: boolean) => void
  orderInfo: OrderInfo | null
  setOrderInfo: (info: OrderInfo | null) => void
  allItemsShippable: boolean
  setUserInfoAsShippingAddress: () => void
  shippingError: string
  setShippingError: (error: string) => void
  validateAddress: () => boolean
  resetCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialCart = (): CartItem[] => {
    try {
      const storedCart = localStorage.getItem('cart')
      return storedCart ? JSON.parse(storedCart) : []
    } catch (error) {
      console.error('Failed to retrieve cart from localStorage:', error)
      return []
    }
  }

  const { currentUser } = useAuth()

  const [cart, setCart] = useState<CartItem[]>(getInitialCart)
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    postalCode: ''
  })
  const [selectedCountry, setSelectedCountry] = useState<Country>('France')
  const [totalPrice, setTotalPrice] = useState(0)
  const [addressCompleted, setAddressCompleted] = useState(false)
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null)
  const [shippingError, setShippingError] = useState('')

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))

    const totalPrice = cart.reduce((acc, item) => {
      if (item.priceOption?.length > 0) {
        return acc + calculateTotalPrice(item.variants, item.priceOption)
      }
      return acc + calculatePriceByColor(item.variants, item.color_images)
    }, 0)
    setTotalPrice(totalPrice)

    const orderInfo: OrderInfo = {
      userId: currentUser?.id,
      products: cart.map((item) => ({ productId: item.ref, variant: item.variants })),
      shippingAddress
    }
    setOrderInfo(orderInfo)
  }, [cart])

  const validateAddress = () => {
    if (
      shippingAddress.fullName === '' ||
      shippingAddress.address === '' ||
      shippingAddress.city === '' ||
      shippingAddress.postalCode === ''
    ) {
      setShippingError('Veuillez remplir tous les champs')
      toast.error('Veuillez remplir tous les champs')
      return false
    } else {
      setShippingError('')
      setAddressCompleted(true)
      return true
    }
  }

  const allItemsShippable = useMemo(() => {
    return cart.every(
      (item) =>
        item.shippingOptions &&
        item.shippingOptions[selectedCountry] !== null &&
        item.shippingOptions[selectedCountry] !== undefined
    )
  }, [cart, selectedCountry])

  const setUserInfoAsShippingAddress = () => {
    if (currentUser) {
      setShippingAddress({
        fullName: currentUser.fullName,
        address: currentUser.address || '',
        city: currentUser.city || '',
        postalCode: currentUser.postalCode || ''
      })
    }
  }

  const addBatch = (newItems: CartItem[]) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => ({ ...item }))
      newItems.forEach((newItem) => {
        const existingItemIndex = updatedCart.findIndex((item) => item.id === newItem.id)
        if (existingItemIndex !== -1) {
          // Merge variants
          const existingItem = updatedCart[existingItemIndex]
          newItem.variants.forEach((newVariant) => {
            const variantIndex = existingItem.variants.findIndex((v) => v.color === newVariant.color)
            if (variantIndex !== -1) {
              existingItem.variants[variantIndex].quantity += newVariant.quantity // Merge quantity
            } else {
              existingItem.variants.push(newVariant) // Add new variant
            }
          })
        } else {
          updatedCart.push(newItem) // New item
        }
      })
      return updatedCart
    })
  }

  const removeBatch = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const resetCart = () => {
    setCart([])
    setTotalPrice(0)
    setAddressCompleted(false)
    setOrderInfo(null)
    setShippingAddress({
      fullName: '',
      address: '',
      city: '',
      postalCode: ''
    })
    localStorage.removeItem('cart')
  }

  const contextValue = {
    setCart,
    cart,
    addBatch,
    removeBatch,
    shippingAddress,
    setShippingAddress,
    selectedCountry,
    setSelectedCountry,
    addressCompleted,
    setAddressCompleted,
    orderInfo,
    setOrderInfo,
    totalPrice,
    allItemsShippable,
    setUserInfoAsShippingAddress,
    shippingError,
    setShippingError,
    validateAddress,
    resetCart
  }

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export default CartProvider

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}

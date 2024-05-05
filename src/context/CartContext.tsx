import React, { createContext, useContext, useEffect, useState } from 'react'

import { CartItem, Country, ShippingAddress } from '../components/types/types'
import { calculateTotalPrice } from '../utils/prices'

interface CartContextType {
  cart: CartItem[]
  addBatch: (newItems: CartItem[]) => void
  removeBatch: (itemId: string) => void
  shippingAddress: ShippingAddress
  setShippingAddress: (address: ShippingAddress) => void
  selectedCountry: Country
  setSelectedCountry: (country: Country) => void
  totalPrice: number
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

  const [cart, setCart] = useState<CartItem[]>(getInitialCart)
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    postalCode: ''
  })
  const [selectedCountry, setSelectedCountry] = useState<Country>('France')
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
    const totalPrice = cart.reduce((acc, item) => acc + calculateTotalPrice(item.variants, item.priceOption), 0)
    setTotalPrice(totalPrice)
  }, [cart])

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

  const contextValue = {
    cart,
    addBatch,
    removeBatch,
    shippingAddress,
    setShippingAddress,
    selectedCountry,
    setSelectedCountry,
    totalPrice
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

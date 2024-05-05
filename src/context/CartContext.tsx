import React, { createContext, useContext, useEffect, useState } from 'react'

import { CartItem } from '../components/types/types'

interface CartContextType {
  cart: CartItem[]
  addBatch: (newItems: CartItem[]) => void
  removeBatch: (itemId: string) => void
  calculateTotal: () => number
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

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
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

  const calculateTotal = (): number => {
    return cart.reduce(
      (total, item) =>
        total + item.variants.reduce((subTotal, variant) => subTotal + variant.price * variant.quantity, 0),
      0
    )
  }

  const removeBatch = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const contextValue = { cart, addBatch, removeBatch, calculateTotal }

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

import React, { createContext, useContext, useEffect, useState } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  ref: {
    converter: any
    _key: {
      path: {
        segments: string[]
        offset: number
        len: number
      }
    }
    type: string
    firestore: any
  }
}

interface CartContextType {
  cart: CartItem[]
  addItem: (newItem: CartItem) => void
  updateItemQuantity: (itemId: string, newQuantity: number) => void
  removeItem: (itemId: string) => void
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

  const addItem = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === newItem.id)
      if (existingItemIndex !== -1) {
        // Update quantity and ensure ref is updated if necessary
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex] = {
          ...prevCart[existingItemIndex],
          quantity: prevCart[existingItemIndex].quantity + newItem.quantity,
          ref: newItem.ref // Make sure to update the ref if new data has a different ref
        }
        return updatedCart
      } else {
        // Item does not exist, add the new one
        return [...prevCart, newItem]
      }
    })
  }

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) => (cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem))
    )
  }

  const removeItem = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== itemId))
  }

  const calculateTotal = (): number => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }

  const contextValue = { cart, addItem, updateItemQuantity, removeItem, calculateTotal }

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

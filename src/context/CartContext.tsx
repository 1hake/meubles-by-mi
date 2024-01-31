import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

const CartProvider = ({ children }) => {
  const getInitialCart = () => {
    try {
      const storedCart = localStorage.getItem('cart')
      return storedCart ? JSON.parse(storedCart) : []
    } catch (error) {
      console.error('Failed to retrieve cart from localStorage:', error)
      return []
    }
  }

  const [cart, setCart] = useState(getInitialCart)

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
  }, [cart])

  const addItem = (newItem) => {
    setCart((prevCart) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevCart.findIndex((item) => item.id === newItem.id)
      if (existingItemIndex !== -1) {
        // Update quantity immutably
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex] = {
          ...prevCart[existingItemIndex],
          quantity: prevCart[existingItemIndex].quantity + 1
        }
        return updatedCart
      } else {
        // Item does not exist, add a new one
        return [...prevCart, { ...newItem, quantity: 1 }]
      }
    })
  }

  const updateItemQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      return removeItem(itemId) // Removes item if quantity is 0 or less
    }
    setCart((prevCart) => prevCart.map((cartItem) => (cartItem.id === itemId ? { ...cartItem, quantity } : cartItem)))
  }

  const removeItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== itemId))
  }
  const contextValue = { cart, addItem, updateItemQuantity, removeItem }

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export default CartProvider

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}

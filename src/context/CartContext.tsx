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
      const existingItemIndex = prevCart.findIndex((item) => item.id === newItem.id)
      if (existingItemIndex !== -1) {
        // Update quantity immutably by adding the newItem's quantity to the existing item's quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex] = {
          ...prevCart[existingItemIndex],
          quantity: prevCart[existingItemIndex].quantity + newItem.quantity
        }
        return updatedCart
      } else {
        // Item does not exist, add the new one with its quantity
        // Ensure newItem has a default quantity if not provided
        const itemToAdd = { ...newItem, quantity: newItem.quantity || 1 }
        return [...prevCart, itemToAdd]
      }
    })
  }

  const updateItemQuantity = (itemId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) => (cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem))
    )
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

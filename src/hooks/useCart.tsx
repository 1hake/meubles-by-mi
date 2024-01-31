import { useCallback, useEffect, useState } from 'react'

const useCart = () => {
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

  const addItem = (item) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id)
      if (itemIndex > -1) {
        return prevCart.map((cartItem, index) =>
          index === itemIndex ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const updateItemQuantity = useCallback((itemId, quantity) => {
    if (quantity <= 0) {
      return removeItem(itemId) // Removes item if quantity is 0 or less
    }
    setCart((prevCart) => prevCart.map((cartItem) => (cartItem.id === itemId ? { ...cartItem, quantity } : cartItem)))
  }, []) // removeItem is stable and doesn't need to be a dependency

  const removeItem = useCallback((itemId) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== itemId))
  }, [])

  return { cart, addItem, updateItemQuantity, removeItem }
}

export default useCart

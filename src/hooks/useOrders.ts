import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { FirestoreError } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { projectFirestore } from '../firebase-config'

interface Order {
  orderId?: string
  userId: string // Assuming this corresponds to 'customerId'
  products: Array<{
    productId: string
    quantity: number
  }>
  orderDate: Date
  shippingAddress: {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
  }
}

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAllOrders()
  }, [])

  const fetchAllOrders = async () => {
    setLoading(true)
    setError(null)

    try {
      const ordersCollectionRef = collection(projectFirestore, 'orders')
      const snapshot = await getDocs(query(ordersCollectionRef))
      const fetchedOrders = snapshot.docs.map((doc) => ({
        orderId: doc.id,
        ...(doc.data() as Order)
      }))

      setOrders(fetchedOrders)
    } catch (err) {
      const firestoreError = err as FirestoreError
      setError(`Error fetching orders: ${firestoreError.message}`)
    } finally {
      setLoading(false)
    }
  }

  const addOrder = async (newOrder: Omit<Order, 'orderId'>) => {
    setLoading(true)
    setError(null)
    try {
      const ordersCollectionRef = collection(projectFirestore, 'orders')
      const docRef = await addDoc(ordersCollectionRef, {
        ...newOrder,
        orderDate: newOrder.orderDate.toISOString() // Converting date to string for Firestore compatibility
      })

      setOrders((prev) => [...prev, { ...newOrder, orderId: docRef.id, orderDate: new Date(newOrder.orderDate) }])
    } catch (err) {
      const firestoreError = err as FirestoreError
      setError(`Error adding new order: ${firestoreError.message}`)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrdersByUserId = async (userId: string) => {
    setLoading(true)
    setError(null)

    try {
      const ordersCollectionRef = collection(projectFirestore, 'orders')
      const userQuery = query(ordersCollectionRef, where('userId', '==', userId))
      const snapshot = await getDocs(userQuery)
      const userOrders = snapshot.docs.map((doc) => ({
        orderId: doc.id,
        ...(doc.data() as Order)
      }))
      console.log('🚀 ~ userOrders ~ userOrders:', userOrders)

      setOrders(userOrders)
    } catch (err) {
      const firestoreError = err as FirestoreError
      setError(`Error fetching user's orders: ${firestoreError.message}`)
    } finally {
      setLoading(false)
    }
  }

  return { orders, loading, error, addOrder, fetchOrdersByUserId }
}

export default useOrders
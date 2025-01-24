import {
  FirestoreError,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

import { Order } from '../components/types/types'
import { projectFirestore } from '../firebase-config'

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAllOrders = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const ordersCollectionRef = collection(projectFirestore, 'orders')
      const snapshot = await getDocs(query(ordersCollectionRef))

      const fetchedOrders = snapshot.docs.map((doc) => {
        return {
          orderId: doc.id,
          ...(doc.data() as Order)
        }
      })
      setOrders(fetchedOrders)
    } catch (err) {
      const firestoreError = err as FirestoreError
      setError(`Error fetching orders: ${firestoreError.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAllOrders()
  }, [fetchAllOrders])

  const addOrder = async (newOrderInfo: {
    userId: string
    products: Array<{
      productId: string
      variant: Array<{
        quantity: number
        color: string
        image: string
      }>
    }>
    price: number
    shippingAddress: string
  }) => {
    setLoading(true)
    setError(null)

    try {
      const ordersCollectionRef = collection(projectFirestore, 'orders')

      const newOrder: Omit<Order, 'orderId'> = {
        userId: newOrderInfo.userId,
        products: newOrderInfo.products.map((p) => ({
          productId: p.productId,
          variants: p.variant.map((v) => ({
            quantity: v.quantity || 0,
            color: v.color,
            image: v.image
          }))
        })),
        price: newOrderInfo.price,
        orderDate: serverTimestamp() as any,
        shippingAddress: newOrderInfo.shippingAddress,
        status: 'en attente'
      }

      const docRef = await addDoc(ordersCollectionRef, newOrder)

      for (const productOrder of newOrder.products) {
        const productDocRef = doc(projectFirestore, 'products', productOrder.productId)
        const productDocSnap = await getDoc(productDocRef)

        if (productDocSnap.exists()) {
          const productData = productDocSnap.data() as any

          if (!Array.isArray(productData.color_images)) {
            continue
          }

          const updatedVariants = productData.color_images.map((variant: any) => {
            const matchingOrderVariant = productOrder.variants.find((v) => v.color === variant.color)
            if (matchingOrderVariant) {
              return {
                ...variant,
                availableQuantity: (variant.availableQuantity || 0) - matchingOrderVariant.quantity
              }
            }
            return variant
          })

          await updateDoc(productDocRef, {
            color_images: updatedVariants
          })
        }
      }

      setOrders((prev) => [
        ...prev,
        {
          ...newOrder,
          orderId: docRef.id,
          orderDate: new Date()
        }
      ])
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

      if (!snapshot.empty) {
        const userOrders = snapshot.docs.map((doc) => ({
          orderId: doc.id,
          ...(doc.data() as Order)
        }))
        setOrders(userOrders)
      } else {
        setOrders([])
        setError('No orders found for this user.')
      }
    } catch (err) {
      const firestoreError = err as FirestoreError
      setError(`Error fetching user's orders: ${firestoreError.message}`)
    } finally {
      setLoading(false)
    }
  }

  return {
    orders,
    loading,
    error,
    addOrder,
    fetchOrdersByUserId,
    fetchAllOrders
  }
}

export default useOrders

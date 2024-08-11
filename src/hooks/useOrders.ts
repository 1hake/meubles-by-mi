import { FirestoreError, addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { Order } from '../components/types/types'
import { projectFirestore } from '../firebase-config'

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
  const addOrder = async (newOrderInfo) => {
    console.log('🚀 ~ addOrder ~ newOrderInfo:', newOrderInfo)
    setLoading(true)
    setError(null)

    try {
      const ordersCollectionRef = collection(projectFirestore, 'orders')
      const newOrder = {
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
        orderDate: new Date(),
        shippingAddress: newOrderInfo.shippingAddress,
        status: 'en attente'
      }

      const docRef = await addDoc(ordersCollectionRef, {
        ...newOrder,
        orderDate: newOrder.orderDate.toISOString()
      })

      for (const productOrder of newOrder.products) {
        const productDocRef = doc(projectFirestore, 'products', productOrder.productId)
        const productDoc = await getDoc(productDocRef)
        if (productDoc.exists()) {
          const productData = productDoc.data()

          const updatedVariants = productData.color_images.map((variant) => {
            const matchingOrderVariant = productOrder.variants.find((v) => v.color === variant.color)
            if (matchingOrderVariant) {
              return {
                ...variant,
                availableQuantity: (variant.availableQuantity || 0) - matchingOrderVariant.quantity
              }
            }
            return variant
          })

          await updateDoc(productDocRef, { color_images: updatedVariants })
        }
      }

      setOrders((prev) => [...prev, { ...newOrder, orderId: docRef.id, orderDate: new Date(newOrder.orderDate) }])
    } catch (err) {
      const firestoreError = err
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

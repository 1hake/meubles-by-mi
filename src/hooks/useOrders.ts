import { DocumentData, addDoc, collection, getDocs, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { projectFirestore } from '../firebase-config'

interface OrderItem {
  productId: string
  quantity: number
  price: number
  customizations?: string
}

interface Order {
  orderId: string
  customerId: string
  orderDate: string
  deliveryDate: string | null
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  deliveryAddress: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  payment: {
    method: 'credit_card' | 'paypal' | 'bank_transfer'
    transactionId: string
    paidAmount: number
    currency: string
  }
  totalAmount: number
}

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      setError(null)

      try {
        const ordersCollection = collection(projectFirestore, 'orders')
        const querySnapshot = await getDocs(query(ordersCollection))
        const fetchedOrders: Order[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Order) }))

        setOrders(fetchedOrders)
      } catch (err) {
        setError('Error fetching orders')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const addOrder = async (newOrder: DocumentData) => {
    setLoading(true)
    try {
      const ordersCollection = collection(projectFirestore, 'orders')
      await addDoc(ordersCollection, newOrder)
      setOrders((prev) => [...prev, { ...newOrder, orderId: newOrder.orderId }])
    } catch (err) {
      setError('Error adding new order')
    } finally {
      setLoading(false)
    }
  }

  return { orders, loading, error, addOrder }
}

export default useOrders

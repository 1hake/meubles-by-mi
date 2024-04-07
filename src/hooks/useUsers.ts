import { DocumentData, addDoc, collection, getDocs, query, where } from 'firebase/firestore'
// src/hooks/useUsers.js
import { useEffect, useState } from 'react'

import { projectFirestore } from '../firebase-config'

interface User {
  userId: string
  name: string
  email: string
  orders: string[] // Array of order IDs
}

interface Order {
  orderId: string
  customerId: string
  orderDate: string
  deliveryDate: string | null
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  items: any[]
  deliveryAddress: any
  payment: any
  totalAmount: number
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const usersCollection = collection(projectFirestore, 'users')
        const querySnapshot = await getDocs(query(usersCollection))
        const fetchedUsers: User[] = querySnapshot.docs.map((doc) => ({
          userId: doc.id,
          ...(doc.data() as User)
        }))
        setUsers(fetchedUsers)
      } catch (err) {
        setError('Error fetching users: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const addUser = async (userData: DocumentData) => {
    setLoading(true)
    try {
      const docRef = await addDoc(collection(projectFirestore, 'users'), userData)
      const newUser: User = { ...userData, userId: docRef.id }
      setUsers((prev) => [...prev, newUser])
    } catch (err) {
      setError('Error adding new user: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserOrders = async (userId: string): Promise<Order[]> => {
    setLoading(true)
    try {
      const ordersCollection = collection(projectFirestore, 'orders')
      const q = query(ordersCollection, where('customerId', '==', userId))
      const querySnapshot = await getDocs(q)
      const orders: Order[] = querySnapshot.docs.map((doc) => ({
        orderId: doc.id,
        ...(doc.data() as Order)
      }))
      return orders
    } catch (err) {
      setError('Error fetching orders for user: ' + err.message)
    } finally {
      setLoading(false)
    }
    return []
  }

  return { users, addUser, fetchUserOrders, loading, error }
}

export default useUsers

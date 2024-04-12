import { DocumentReference, addDoc, collection, doc, getDoc, getDocs, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { projectFirestore } from '../firebase-config'

interface User {
  email: string
  passwordHash: string
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
  userId?: string
  ref?: DocumentReference
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
        const usersCollectionRef = collection(projectFirestore, 'users')
        const querySnapshot = await getDocs(query(usersCollectionRef))
        const fetchedUsers: User[] = querySnapshot.docs.map((doc) => ({
          ref: doc.ref,
          ...(doc.data() as User)
        }))
        setUsers(fetchedUsers)
      } catch (err) {
        setError('Erreur lors de la récupération des utilisateurs : ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const getUserById = async (id) => {
    setLoading(true)

    const docRef = doc(projectFirestore, 'users', id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      console.log('error to get user')
      return
    }
    setLoading(false)

    const user = { ...docSnap.data(), ref: docRef }
    return user
  }

  const addUser = async (userData: User) => {
    setLoading(true)
    try {
      const docRef = await addDoc(collection(projectFirestore, 'users'), userData)
      setLoading(false)
      return {
        ...userData,
        userId: docRef.id,
        ref: docRef
      }
    } catch (err) {
      setError("Erreur lors de l'ajout d'un nouvel utilisateur : " + err.message)
      setLoading(false)
      return null
    }
  }

  return { users, addUser, getUserById, loading, error }
}

export default useUsers

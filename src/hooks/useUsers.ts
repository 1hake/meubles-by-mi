import { DocumentReference, addDoc, collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore'
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

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const usersCollectionRef = collection(projectFirestore, 'users')
      const querySnapshot = await getDocs(query(usersCollectionRef))
      const fetchedUsers: User[] = querySnapshot.docs.map((snapshot) => ({
        ...snapshot.data(),
        userId: snapshot.id,
        ref: snapshot.ref
      })) as User[]
      setUsers(fetchedUsers)
    } catch (err: any) {
      setError('Erreur lors de la récupération des utilisateurs : ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const addUser = async (userData: Omit<User, 'userId' | 'ref'>) => {
    setLoading(true)
    setError(null)
    try {
      const docRef = await addDoc(collection(projectFirestore, 'users'), userData)
      const newUser: User = {
        ...userData,
        userId: docRef.id,
        ref: docRef
      }
      setUsers((prev) => [...prev, newUser])
      setLoading(false)
      return newUser
    } catch (err: any) {
      setError("Erreur lors de l'ajout d'un nouvel utilisateur : " + err.message)
      setLoading(false)
      return null
    }
  }

  const editUser = async (id: string, updatedData: Partial<User>) => {
    if (!id) {
      setError("L'identifiant utilisateur est invalide ou manquant.")
      console.error('ID is invalid:', id)
      return false
    }

    if (!updatedData || Object.keys(updatedData).length === 0) {
      setError('Les données mises à jour sont invalides ou manquantes.')
      console.error('Updated data is invalid:', updatedData)
      return false
    }

    setLoading(true)
    setError(null)
    try {
      const docRef = doc(projectFirestore, 'users', id)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        setError("L'utilisateur n'existe pas.")
        console.error('User does not exist:', id)
        setLoading(false)
        return false
      }

      await updateDoc(docRef, updatedData)

      const updatedSnap = await getDoc(docRef)
      const newUserData = updatedSnap.data() as User

      const updatedUser: User = {
        ...newUserData,
        userId: id,
        ref: docRef
      }

      setUsers((prev) => prev.map((user) => (user.userId === id ? updatedUser : user)))
      setLoading(false)
      return true
    } catch (err: any) {
      console.error('Error updating user:', err)
      setError("Erreur lors de la mise à jour de l'utilisateur : " + (err?.message || err))
      setLoading(false)
      return false
    }
  }

  return {
    users,
    addUser,
    editUser,
    loading,
    error
  }
}

export default useUsers

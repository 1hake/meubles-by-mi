import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { auth, projectFirestore } from '../firebase-config'
import useUsers from '../hooks/useUsers'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addUser } = useUsers()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(projectFirestore, 'users', user.uid)
        const userDoc = await getDoc(userRef)
        if (userDoc.exists()) {
          setCurrentUser({
            uid: user.uid,
            ...userDoc.data()
          })
        } else {
          setCurrentUser({
            uid: user.uid,
            email: user.email
          })
        }
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password)
    if (response.user) {
      const q = query(collection(projectFirestore, 'users'), where('id', '==', response.user.uid))

      const querySnapshot = await getDocs(q)
      const user = querySnapshot.forEach((doc) => {
        setCurrentUser({ ...doc.data() })
      })

      return response
    }
  }

  const logout = async () => {
    await signOut(auth)
    setCurrentUser(null)
  }

  const signup = async (userInfo) => {
    console.log('🚀 ~ signup ~ userInfo:', userInfo)
    const response = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
    console.log('🚀 ~ signup ~ response:', response)
    if (response.user) {
      const userData = {
        id: response.user.uid,
        ...userInfo
      }
      const newUser = await addUser(userData)
      setCurrentUser(userData)
    }
  }

  const value = {
    currentUser,
    login,
    logout,
    signup
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export default AuthProvider

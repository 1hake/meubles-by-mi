import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
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
            name: userDoc.data().name,
            email: user.email
          })
        } else {
          setCurrentUser({
            uid: user.uid,
            email: user.email
          }) // Minimal user info
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
      const userRef = doc(projectFirestore, 'users', response.user.uid)
      const userDoc = await getDoc(userRef)
      if (userDoc.exists()) {
        setCurrentUser({
          uid: response.user.uid,
          name: userDoc.data().name,
          email: response.user.email
        })
      }
      return response
    }
  }

  const logout = async () => {
    await signOut(auth)
    setCurrentUser(null)
  }

  const signup = async (email, password, name) => {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    if (response.user) {
      const userData = {
        email,
        name,
        orders: []
      }
      const newUser = await addUser(userData)
      setCurrentUser({
        uid: response.user.uid,
        name: newUser.name,
        email: response.user.email
      })
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

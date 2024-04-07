import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react'

import { auth } from '../firebase-config'
import useUsers from '../hooks/useUsers'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addUser } = useUsers() // Extract addUser from useUsers

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    return signOut(auth)
  }

  const signup = async (email, password, name) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      if (response.user) {
        await addUser({
          // Add the user to Firestore
          email: email,
          name: name,
          orders: []
        })
        setCurrentUser({
          ...currentUser,
          email,
          name
        })
      }
    } catch (error) {
      throw new Error('Signup failed: ' + error.message)
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

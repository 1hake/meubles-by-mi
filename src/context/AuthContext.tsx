import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { auth, projectFirestore } from '../firebase-config'
import useUsers from '../hooks/useUsers'

interface AuthContextType {
  currentUser: any
  login: (email: string, password: string) => Promise<any>
  logout: () => Promise<void>
  signup: (userInfo: any) => Promise<any>
  error: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const { addUser } = useUsers()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(projectFirestore, 'users'), where('userId', '==', user.uid)) // Ensure 'userId' is used

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          setCurrentUser({ ...doc.data(), userId: doc.id }) // Ensure userId is set
        })
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response.user) {
        const q = query(collection(projectFirestore, 'users'), where('id', '==', response.user.uid))

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          setCurrentUser({ ...doc.data() })
        })

        return response
      }
    } catch (err) {
      setError("Le nom d'utilisateur ou le mot de passe est incorrect")
      return null
    }
  }

  const logout = async () => {
    await signOut(auth)
    setCurrentUser(null)
  }

  const signup = async (userInfo: any) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      if (response.user) {
        const userData = {
          userId: response.user.uid, // Ensure 'userId' is used
          ...userInfo
        }
        await addUser(userData)
        setCurrentUser(userData)
      }
    } catch (err) {
      setError("L'email existe déjà")
      return null
    }
  }
  const value = {
    currentUser,
    login,
    logout,
    signup,
    error
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export default AuthProvider

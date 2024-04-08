import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useState } from 'react'

import { auth } from '../firebase-config' // Assuming auth is exported from firebase-config

interface SignUpData {
  email: string
  password: string
  displayName?: string
}

interface AuthResponse {
  user: null | object
  error: null | string
}

const useSignup = () => {
  const [response, setResponse] = useState<AuthResponse>({ user: null, error: null })

  const signup = async ({ email, password, displayName }: SignUpData) => {
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Update profile if displayName is provided
      if (displayName) {
        await updateProfile(user, {
          displayName: displayName
        })
      }

      setResponse({ ...response, user: user })
    } catch (error: any) {
      setResponse({ ...response, error: error.message })
    }
  }

  return { ...response, signup }
}

export default useSignup

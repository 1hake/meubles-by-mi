import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'

import { auth } from '../firebase-config' // Assuming auth is exported from firebase-config

interface SignInData {
  email: string
  password: string
}

interface AuthResponse {
  user: null | object
  error: null | string
}

const useSignin = () => {
  const [response, setResponse] = useState<AuthResponse>({ user: null, error: null })

  const signin = async ({ email, password }: SignInData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      const token = await user.getIdToken()

      localStorage.setItem('token', token)

      setResponse({ ...response, user: user })
    } catch (error: any) {
      setResponse({ ...response, error: error.message })
    }
  }

  return { ...response, signin }
}

export default useSignin

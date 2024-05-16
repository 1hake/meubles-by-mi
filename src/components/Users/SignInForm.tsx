import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import Button from '../common/Button'

export const SignInForm: React.FC = () => {
  const { login, currentUser, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await login(email, password)
    if (result && !error) {
      console.log('Login successful:', currentUser)
      if (params.redirect) {
        navigate('/cart')
        return
      }
      navigate('/')
    }
  }

  return (
    <div className="h-[60vh] flex items-center">
      <div className="container mx-auto px-4 py-8 border-2 border-black rounded-md shadow-light-large">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Connexion</h2>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border-2 border-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border-2 border-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

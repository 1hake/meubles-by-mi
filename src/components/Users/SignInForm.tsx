import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import Button from '../common/Button'
import Input from '../common/inputs/Input'

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
    <div className="h-[60vh] flex items-center justify-center">
      <div className="px-4 py-8 border-2 border-black rounded-md shadow-light-large">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Connexion</h2>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            required
          />
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Mot de passe"
            required
          />
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

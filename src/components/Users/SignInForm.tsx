import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuth } from '../../context/AuthContext'
import Button from '../common/Button'
import Input from '../common/inputs/Input'

export const SignInForm: React.FC = () => {
  const { login, currentUser, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const result = await login(email, password)
      if (result) {
        console.log('Login successful:', currentUser)
        if (params.redirect) {
          navigate('/cart')
          return
        }
        navigate('/')
      }
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="px-4 py-8 border-2 border-black rounded-md shadow-light-large">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Connexion</h2>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            required
          />
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Mot de passe"
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform translate-y-1 cursor-pointer"
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

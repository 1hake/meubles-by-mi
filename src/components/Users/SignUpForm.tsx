import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import Button from '../common/Button'
import UserFormFields from './UserFormFields'

interface ShippingAddress {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
}

interface UserProfile extends ShippingAddress {
  email: string
  userId: string
}

export const SignUpForm: React.FC = () => {
  const { signup, currentUser, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  })
  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const userInfo = {
      email,
      password,
      ...address
    }
    const result = await signup(userInfo)
    if (params.redirect) {
      navigate('/cart')
      return
    }
    navigate('/')
  }

  return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="px-4 py-8 border-2 border-black shadow-light-large rounded-md">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Inscription</h2>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <UserFormFields
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            address={address}
            setAddress={setAddress}
          />

          <div className="flex items-center justify-between">
            <Button type="submit" className="w-full">
              S'inscrire
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

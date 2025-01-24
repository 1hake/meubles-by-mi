import React, { useState } from 'react'

import Button from '../common/Button'
import Input from '../common/inputs/Input'

interface UserProfileFormProps {
  userData: any
  onEditUser: (updatedData: any) => Promise<void>
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ userData, onEditUser }) => {
  const [formData, setFormData] = useState(userData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onEditUser(formData)
    } catch (error) {
      console.error('Échec de la mise à jour des données utilisateur :', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" bg-white p-6 max-w-4xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 focus:outline-none"
    >
      <div>
        <Input
          type="text"
          name="fullName"
          id="fullName"
          label="Nom complet"
          value={formData.fullName || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="email"
          name="email"
          id="email"
          label="Email"
          value={formData.email || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="text"
          name="address"
          id="address"
          label="Adresse"
          value={formData.address || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="text"
          name="postalCode"
          id="postalCode"
          label="Code postal"
          value={formData.postalCode || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input type="text" name="city" id="city" label="Ville" value={formData.city || ''} onChange={handleChange} />
      </div>
      <div>
        <Input
          type="text"
          name="country"
          id="country"
          label="Pays"
          value={formData.country || ''}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-2">
        <Input
          type="password"
          name="password"
          id="password"
          label="Mot de passe"
          value={formData.password || ''}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-2">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Enregistrement...' : 'Sauvegarder les modifications'}
        </Button>
      </div>
    </form>
  )
}

export default UserProfileForm

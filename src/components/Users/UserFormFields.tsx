import React from 'react'

import Input from '../common/inputs/Input'

interface UserFormFieldsProps {
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  address: {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
  }
  setAddress: (address: any) => void
}

const UserFormFields: React.FC<UserFormFieldsProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  address,
  setAddress
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="lg:col-span-1">
        <Input
          id="fullName"
          name="fullName"
          type="text"
          value={address.fullName}
          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
          label="Nom Complet"
          required
        />
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
      </div>
      <div className="lg:col-span-1">
        <Input
          id="address"
          name="address"
          type="text"
          value={address.address}
          onChange={(e) => setAddress({ ...address, address: e.target.value })}
          label="Adresse"
          required
        />
        <Input
          id="city"
          name="city"
          type="text"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          label="Ville"
          required
        />
        <Input
          id="postalCode"
          name="postalCode"
          type="text"
          value={address.postalCode}
          onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
          label="Code Postal"
          required
        />
        <Input
          id="country"
          name="country"
          type="text"
          value={address.country}
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
          label="Pays"
          required
        />
      </div>
    </div>
  )
}

export default UserFormFields

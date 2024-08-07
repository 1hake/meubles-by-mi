import React from 'react'

import { useCartContext } from '../../context/CartContext'
import Button from '../common/Button'
import { Country, ShippingAddress } from '../types/types'

export const ShippingAddressForm = ({
  shippingAddress,
  handleAddressChange,
  fillAddressWithUser,
  shippingError
}: {
  shippingAddress: ShippingAddress
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  fillAddressWithUser: () => void
  shippingError: string
}) => {
  const { selectedCountry, setSelectedCountry } = useCartContext()
  return (
    <div className="p-4 bg-gray-50 border-2 border-black rounded-md ">
      <form className="space-y-4">
        <h3 className="text-lg font-medium mb-4">Adresse de Livraison</h3>
        <Button
          onClick={fillAddressWithUser}
          className="w-full bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-300 transition duration-150 ease-in-out"
        >
          Remplir avec mes informations
        </Button>
        <input
          type="text"
          name="fullName"
          placeholder="Nom complet"
          value={shippingAddress.fullName}
          onChange={handleAddressChange}
          className="input input-bordered w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Adresse"
          value={shippingAddress.address}
          onChange={handleAddressChange}
          className="input input-bordered w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="Ville"
          value={shippingAddress.city}
          onChange={handleAddressChange}
          className="input input-bordered w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Code Postal"
          value={shippingAddress.postalCode}
          onChange={handleAddressChange}
          className="input input-bordered w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          required
        />
        {shippingError && <p className="text-red-500">{shippingError}</p>}
        <p className="text-sm font-semibold text-gray-900">Choisissez votre pays:</p>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value as Country)}
          className="mt-1 block w-full p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          {['France', 'Belgique', 'Luxembourg'].map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </form>
    </div>
  )
}

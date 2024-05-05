import React from 'react'

import { ShippingAddress } from '../types/types'

export const ShippingAddressForm = ({
  shippingAddress,
  handleAddressChange,
  handleAddressSubmit,
  fillAddressWithUser,
  shippingError
}: {
  shippingAddress: ShippingAddress
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAddressSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  fillAddressWithUser: () => void
  shippingError: string
}) => {
  return (
    <div className="p-4 bg-gray-50">
      <form onSubmit={handleAddressSubmit} className="space-y-4">
        <h3 className="text-lg font-medium mb-4">Adresse de Livraison</h3>
        <button
          type="button"
          onClick={fillAddressWithUser}
          className="btn btn-secondary w-full bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-300 transition duration-150 ease-in-out"
        >
          Remplir avec mes informations
        </button>
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
        <button
          type="submit"
          className="btn btn-primary mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
        >
          Continuer vers le paiement
        </button>
      </form>
    </div>
  )
}

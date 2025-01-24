import React, { useEffect } from 'react'
import { FiCalendar, FiMapPin, FiPackage } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import useOrders from '../../hooks/useOrders'
import Button from '../common/Button'
import { Loader } from '../common/Loader'
import { StatusTag } from './StatusTag'

const UserOrdersPage: React.FC = () => {
  const { orders, loading, error, fetchOrdersByUserId } = useOrders()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      fetchOrdersByUserId(currentUser.uid)
    }
  }, [currentUser, fetchOrdersByUserId])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">Erreur : {error}</p>
  }

  if (orders.length === 0) {
    return (
      <div className="text-center h-full flex flex-col items-center justify-center">
        <p className="text-lg mt-24">Vous n'avez aucune commande pour le moment.</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Retour à l'accueil
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center">
      {orders.map((order) => {
        const formattedDate = new Date(order.orderDate.seconds * 1000).toLocaleDateString('fr-FR')
        const totalQuantity = order.products.reduce(
          (total, product) => total + product.variants.reduce((sum, variant) => sum + variant.quantity, 0),
          0
        )

        return (
          <div key={order.orderId} className="bg-white border-2 rounded-md border-black m-2 p-4 w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <FiCalendar className="text-xl" />
                <span className="font-medium">{formattedDate}</span>
              </div>
              <StatusTag status={order.status} />
            </div>

            <div className="mb-4">
              <h3 className="text-sm uppercase font-semibold text-gray-500 tracking-wide mb-2">Produits et détails</h3>
              <div className="space-y-2">
                {order.products.map((product) =>
                  product.variants.map((variant, index) => (
                    <div key={index} className="flex items-center bg-gray-50 p-2">
                      <img
                        src={variant.image || '/placeholder-image.png'}
                        alt="Product"
                        className="w-12 h-12 object-cover mr-2"
                      />
                      <div className="flex flex-col text-sm">
                        <span className="font-medium text-gray-700">Couleur: {variant.color}</span>
                        <span className="text-gray-500">Quantité: {variant.quantity}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm uppercase font-semibold text-gray-500 tracking-wide mb-2">Adresse de livraison</h3>
              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <FiMapPin className="mt-1" />
                <p>
                  {order.shippingAddress.fullName}, {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode}, {order.shippingAddress.country || 'FR'}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FiPackage className="text-lg" />
                <span className="font-medium">Total Quantités: {totalQuantity}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default UserOrdersPage

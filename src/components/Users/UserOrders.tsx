import React, { useEffect } from 'react'

import { useAuth } from '../../context/AuthContext'
import useOrders from '../../hooks/useOrders'
import { Loader } from '../common/Loader'

interface Variant {
  image: string
  quantity: number
  color: string
}

interface Product {
  productId: string
  variant: Variant[]
}

interface Order {
  orderId?: string
  userId: string
  products: Product[]
  orderDate: Date
  shippingAddress: {
    fullName: string
    address: string
    city: string
    postalCode: string
    country?: string // Optional if not always present
  }
}

const UserOrdersPage: React.FC = () => {
  const { orders, loading, error, fetchOrdersByUserId } = useOrders()
  console.log('🚀 ~ orders:', orders)
  const { currentUser } = useAuth()

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

  return (
    <div className="container mx-auto px-4">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Date de commande
              </th>
              <th scope="col" className="py-3 px-6">
                Produits et détails
              </th>
              <th scope="col" className="py-3 px-6">
                Adresse de livraison
              </th>
              <th scope="col" className="py-3 px-6">
                Total Quantités
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 px-6">{new Date(order.orderDate).toLocaleDateString('fr-FR')}</td>
                <td className="py-4 px-6">
                  {order.products.map((product) =>
                    product.variant.map((variant, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <img src={variant.image} alt="Product" className="w-10 h-10 object-cover rounded-full" />
                        <span>{`Couleur: ${variant.color}, Quantité: ${variant.quantity}`}</span>
                      </div>
                    ))
                  )}
                </td>
                <td className="py-4 px-6">
                  {`${order.shippingAddress.fullName}, ${order.shippingAddress.address}, ${
                    order.shippingAddress.city
                  }, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country || 'FR'}`}
                </td>
                <td className="py-4 px-6">
                  {order.products.reduce(
                    (total, product) => total + product.variant.reduce((sum, v) => sum + v.quantity, 0),
                    0
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserOrdersPage

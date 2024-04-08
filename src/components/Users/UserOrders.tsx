import React, { useEffect } from 'react'

import { useAuth } from '../../context/AuthContext'
import useOrders from '../../hooks/useOrders'

interface Product {
  productId: string
  quantity: number
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
    country: string
  }
}

const UserOrdersPage: React.FC = () => {
  const { orders, loading, error, fetchOrdersByUserId } = useOrders()
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      fetchOrdersByUserId(currentUser.uid)
    }
  }, []) // added currentUser and fetchOrdersByUserId as dependencies

  if (loading) {
    return <p className="text-center text-lg">Chargement en cours...</p>
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
                ID de commande
              </th>
              <th scope="col" className="py-3 px-6">
                Date de commande
              </th>
              <th scope="col" className="py-3 px-6">
                Produits et quantités
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 px-6">{order.orderId}</td>
                <td className="py-4 px-6">{new Date(order.orderDate).toLocaleDateString('fr-FR')}</td>
                <td className="py-4 px-6">
                  {order.products.map((product) => (
                    <div key={product.productId}>{`${product.productId} (Quantité : ${product.quantity})`}</div>
                  ))}
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

import React, { useEffect, useState } from 'react'

interface Order {
  id: string
  date: string
  total: number
  status: string
}

const UserOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Simulate fetching orders. Replace this with your actual fetch call.
    const fetchOrders = async () => {
      const mockOrders: Order[] = [
        { id: '123', date: '2023-01-01', total: 100, status: 'Shipped' },
        { id: '124', date: '2023-02-15', total: 150, status: 'Processing' }
        // Add more orders as needed for your mock
      ]
      setOrders(mockOrders)
    }

    fetchOrders()
  }, [])

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no previous orders.</p>
      ) : (
        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div key={order.id} className="py-4">
              <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
              <p>Date: {order.date}</p>
              <p>Total: €{order.total.toFixed(2)}</p>
              <p>Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserOrders

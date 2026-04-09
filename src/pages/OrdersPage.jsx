import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const customerId = localStorage.getItem('userId')

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await client.get(`/orders/customer/${customerId}`)
        setOrders(data || [])
      } catch (error) {
        console.error(error)
        setOrders([])
      } finally {
        setLoading(false)
      }
    }
    loadOrders()
  }, [customerId])

  return (
    <div className="page-wrap">
      <div className="page-header">
        <h2>My Orders</h2>
        <Link to="/products" className="text-link">Back to Products</Link>
      </div>

      {loading ? (
        <div className="plain-card">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="plain-card">No orders found.</div>
      ) : (
        <div className="stack-list">
          {orders.map((order) => (
            <div key={order.id} className="plain-card">
              <h3>Order #{order.id}</h3>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p>Status: {order.status}</p>
              <p>Order Date: {order.orderDate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

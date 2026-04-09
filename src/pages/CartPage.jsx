import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'

export default function CartPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const customerId = localStorage.getItem('userId')

  const loadCart = async () => {
    if (!customerId) {
      setItems([])
      setLoading(false)
      return
    }
    try {
      const { data } = await client.get(`/cart/${customerId}`)
      setItems(data || [])
    } catch (error) {
      console.error(error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  const removeItem = async (id) => {
    try {
      await client.delete(`/cart/${id}`)
      loadCart()
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to remove item')
    }
  }

  const placeOrder = async () => {
    try {
      await client.post(`/orders/place/${customerId}`)
      alert('Order placed successfully')
      loadCart()
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to place order')
    }
  }

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 0), 0),
    [items]
  )

  return (
    <div className="page-wrap">
      <div className="page-header">
        <h2>My Cart</h2>
        <Link to="/products" className="text-link">Back to Products</Link>
      </div>

      {loading ? (
        <div className="plain-card">Loading cart...</div>
      ) : items.length === 0 ? (
        <div className="plain-card">Your cart is empty.</div>
      ) : (
        <>
          <div className="stack-list">
            {items.map((item) => (
              <div key={item.id} className="cart-card">
                <img
                  src={item.product?.imageUrl?.trim() ? item.product.imageUrl : 'https://via.placeholder.com/120x100?text=No+Image'}
                  alt={item.product?.name || 'Product'}
                />
                <div className="cart-info">
                  <h3>{item.product?.name}</h3>
                  <p>Price: ₹{item.product?.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <strong>Total: ₹{(item.product?.price || 0) * (item.quantity || 0)}</strong>
                </div>
                <button className="btn btn-danger" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            ))}
          </div>

          <div className="summary-card">
            <h3>Total Amount: ₹{totalAmount}</h3>
            <button className="btn btn-primary" onClick={placeOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  )
}

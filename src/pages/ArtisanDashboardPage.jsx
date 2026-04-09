import { useState } from 'react'
import client from '../api/client'

const initialForm = {
  name: '',
  tribe: '',
  category: '',
  stateName: '',
  imageUrl: '',
  price: '',
  stock: '',
  customizable: false,
  description: '',
  materials: '',
  careInstructions: '',
}

function getErrorMessage(error, fallback) {
  const data = error?.response?.data
  if (typeof data === 'string' && data.trim()) return data
  if (data?.message) return data.message
  if (data?.error) return data.error
  return fallback
}

export default function ArtisanDashboardPage() {
  const artisanId = localStorage.getItem('userId')
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!artisanId || artisanId === 'null' || artisanId === 'undefined') {
      setMessageType('error')
      setMessage('Please login again as artisan')
      return
    }
    setLoading(true)
    try {
      await client.post(`/products/artisan/${artisanId}`, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      })
      setMessageType('success')
      setMessage('Product added successfully')
      setForm(initialForm)
    } catch (error) {
      setMessageType('error')
      setMessage(getErrorMessage(error, 'Failed to add product'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrap">
      <div className="form-card">
        <h2>Add Product</h2>
        <p className="muted">Enter product details</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Product Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Tribe</label>
          <input name="tribe" value={form.tribe} onChange={handleChange} />

          <label>Category</label>
          <input name="category" value={form.category} onChange={handleChange} />

          <label>State Name</label>
          <input name="stateName" value={form.stateName} onChange={handleChange} />

          <label>Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />

          <label>Price</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required />

          <label>Stock</label>
          <input type="number" name="stock" value={form.stock} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" rows="4" value={form.description} onChange={handleChange} />

          <label>Materials</label>
          <textarea name="materials" rows="3" value={form.materials} onChange={handleChange} />

          <label>Care Instructions</label>
          <textarea name="careInstructions" rows="3" value={form.careInstructions} onChange={handleChange} />

          <label className="check-row">
            <input type="checkbox" name="customizable" checked={form.customizable} onChange={handleChange} />
            <span>Customizable</span>
          </label>

          {message && <p className={`form-message ${messageType === 'success' ? 'form-success' : 'form-error'}`}>{message}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  )
}

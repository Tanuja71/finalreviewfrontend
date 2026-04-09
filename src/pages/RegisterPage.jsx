import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import client from '../api/client'

const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  location: '',
  role: 'ROLE_CUSTOMER',
}

function getErrorMessage(error, fallback) {
  const data = error?.response?.data
  if (typeof data === 'string' && data.trim()) return data
  if (data?.message) return data.message
  if (data?.error) return data.error
  return fallback
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      setMessageType('error')
      setMessage('Password and confirm password do not match')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone.trim(),
        location: form.location.trim(),
        role: form.role,
      }
      await client.post('/auth/register', payload)
      setMessageType('success')
      setMessage('Registered successfully')
      setTimeout(() => navigate('/login'), 1200)
    } catch (error) {
      setMessageType('error')
      setMessage(getErrorMessage(error, 'Registration failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-shell">
      <div className="auth-panel auth-panel-form register-form-panel">
        <span className="auth-badge">Create account</span>
        <h1>Register for TribalCraft</h1>
        <p className="muted left">Create your account and start exploring handcrafted products.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="split-inputs">
            <div>
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Enter name" required />
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" required />
            </div>
          </div>

          <div className="split-inputs">
            <div>
              <label>Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter password" required />
            </div>
            <div>
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" required />
            </div>
          </div>

          <div className="split-inputs">
            <div>
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone number" />
            </div>
            <div>
              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="Enter location" />
            </div>
          </div>

          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="ROLE_CUSTOMER">Customer</option>
            <option value="ROLE_ARTISAN">Artisan</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>

          {message && <p className={`form-message ${messageType === 'success' ? 'form-success' : 'form-error'}`}>{message}</p>}

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="switch-text left">Already have an account? <Link to="/login">Login</Link></p>
      </div>

      <div className="auth-panel auth-art-panel register-art-panel">
        <div className="tribal-art-card warm">
          <div className="motif-row motif-row-top">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div className="tribal-sun"></div>
          <div className="tribal-wave"></div>
          <div className="motif-row motif-row-bottom">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </section>
  )
}

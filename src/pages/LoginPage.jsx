import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function getErrorMessage(error, fallback) {
  const data = error?.response?.data
  if (typeof data === 'string' && data.trim()) return data
  if (data?.message) return data.message
  if (data?.error) return data.error
  return fallback
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const user = await login({ email: form.email.trim(), password: form.password })
      if (user?.role === 'ROLE_ARTISAN' || user?.role === 'ROLE_ADMIN') {
        navigate('/artisan')
      } else {
        navigate('/products')
      }
    } catch (error) {
      setMessage(getErrorMessage(error, 'Login failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-shell">
      <div className="auth-panel auth-panel-form">
        <span className="auth-badge">Welcome back</span>
        <h1>Login to TribalCraft</h1>
        <p className="muted left">Use your email and password to continue.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" required />

          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter password" required />

          {message && <p className="form-message form-error">{message}</p>}

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="switch-text left">Don't have an account? <Link to="/register">Register</Link></p>
      </div>

      <div className="auth-panel auth-art-panel">
        <div className="tribal-art-card">
          <div className="tribal-ring tribal-ring-one"></div>
          <div className="tribal-ring tribal-ring-two"></div>
          <div className="tribal-ring tribal-ring-three"></div>
          <div className="tribal-line tribal-line-top"></div>
          <div className="tribal-line tribal-line-bottom"></div>
          <div className="tribal-diamond tribal-diamond-center"></div>
          <div className="tribal-diamond tribal-diamond-small"></div>
        </div>
      </div>
    </section>
  )
}

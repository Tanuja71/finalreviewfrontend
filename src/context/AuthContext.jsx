import { createContext, useContext, useMemo, useState } from 'react'
import client from '../api/client'

const AuthContext = createContext(null)

function readStoredUser() {
  const raw = localStorage.getItem('user')
  if (raw) {
    try {
      return JSON.parse(raw)
    } catch {
      localStorage.removeItem('user')
    }
  }

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const name = localStorage.getItem('name')
  const role = localStorage.getItem('role')

  if (token && userId && userId !== 'null' && userId !== 'undefined') {
    return { token, userId, name, role }
  }

  return null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)

  const login = async (credentials) => {
    const { data } = await client.post('/auth/login', credentials)
    const normalized = {
      token: data.token || '',
      userId: String(data.userId ?? data.id ?? ''),
      name: data.name || '',
      role: data.role || '',
    }

    localStorage.setItem('token', normalized.token)
    localStorage.setItem('userId', normalized.userId)
    localStorage.setItem('name', normalized.name)
    localStorage.setItem('role', normalized.role)
    localStorage.setItem('user', JSON.stringify(normalized))
    setUser(normalized)
    return normalized
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('name')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const isAuthPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register'

  return (
    <header className={`navbar ${isAuthPage ? 'navbar-auth' : ''}`}>
      <Link to={user ? '/products' : '/login'} className="brand">TribalCraft</Link>
      {!isAuthPage && (
        <nav>
          <NavLink to="/products">Products</NavLink>
          {user && <NavLink to="/cart">Cart</NavLink>}
          {user && <NavLink to="/orders">Orders</NavLink>}
          {user?.role === 'ROLE_ARTISAN' && <NavLink to="/artisan">Artisan</NavLink>}
        </nav>
      )}
      {!isAuthPage && (
        <div className="nav-actions">
          {user ? (
            <>
              <span className="welcome">Hi, {user.name}</span>
              <button className="btn btn-outline" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}

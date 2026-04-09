import { Link, useNavigate } from 'react-router-dom'
import client from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const image = product.imageUrl || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80'

  const addToCart = async () => {
    if (!user?.userId) {
      alert('Please login first')
      navigate('/login')
      return
    }

    try {
      await client.post(`/cart/add?customerId=${user.userId}&productId=${product.id}&quantity=1&customizationText=`)
      alert('Added to cart successfully')
    } catch (error) {
      alert(error?.response?.data?.message || 'Could not add to cart')
    }
  }

  return (
    <article className="product-card">
      <img src={image} alt={product.name} className="product-image" />
      <div className="product-content">
        <div className="product-top">
          <h3>{product.name}</h3>
          <span className="price">₹{product.price}</span>
        </div>
        <p>{product.description || 'Handcrafted product with authentic artisan quality.'}</p>
        <div className="product-actions">
          <Link to={`/products/${product.id}`} className="btn btn-outline">View Details</Link>
          <button type="button" className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </article>
  )
}

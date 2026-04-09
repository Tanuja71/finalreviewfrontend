import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [message, setMessage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [customizationText, setCustomizationText] = useState('')

  useEffect(() => {
    fetchData()
  }, [id])

  async function fetchData() {
    const productRes = await api.get(`/products/${id}`)
    setProduct(productRes.data)
    try {
      const reviewRes = await api.get(`/reviews/product/${id}`)
      setReviews(reviewRes.data)
    } catch {
      setReviews([])
    }
  }

  async function addToCart() {
    if (!user) {
      setMessage('Please login first')
      return
    }

    try {
      await api.post(`/cart/add?customerId=${user.userId}&productId=${id}&quantity=${quantity}&customizationText=${encodeURIComponent(customizationText)}`)
      setMessage('Added to cart successfully')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Could not add to cart')
    }
  }

  if (!product) return <section className="section"><p>Loading product...</p></section>

  return (
    <section className="section product-details">
      <img
        src={product.imageUrl || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80'}
        alt={product.name}
        className="details-image"
      />
      <div>
        <span className="tag">Handmade item</span>
        <h2>{product.name}</h2>
        <p className="price big">₹{product.price}</p>
        <p>{product.description || 'No description available.'}</p>

        <div className="form-grid">
          <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <textarea
            placeholder="Customization text"
            value={customizationText}
            onChange={(e) => setCustomizationText(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
        {message && <p className="success">{message}</p>}

        <div className="review-box">
          <h3>Reviews</h3>
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <strong>{review.rating || 5} ★</strong>
              <p>{review.comment || review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

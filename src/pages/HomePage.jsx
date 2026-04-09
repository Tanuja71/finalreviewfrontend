import { Link } from 'react-router-dom'

const featured = [
  {
    title: 'Handwoven Baskets',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=80',
    text: 'Natural eco-friendly baskets for daily use and gifting.'
  },
  {
    title: 'Tribal Jewellery',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca6?auto=format&fit=crop&w=1000&q=80',
    text: 'Traditional jewellery made by skilled artisans.'
  },
  {
    title: 'Clay Decor',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1000&q=80',
    text: 'Beautiful handmade decor pieces to brighten your home.'
  }
]

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <div>
          <span className="tag">Authentic tribal marketplace</span>
          <h1>Showcase artisan products in a clean shopping app style</h1>
          <p>
            This frontend is designed for your Spring Boot backend with login, registration,
            product listing, cart, orders, reviews, and artisan product management.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">Shop Now</Link>
            <Link to="/register" className="btn btn-outline">Create Account</Link>
          </div>
        </div>
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80"
          alt="Handmade crafts"
        />
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Featured collections</h2>
          <p>Simple cards inspired by shopping apps, but focused on handmade products.</p>
        </div>
        <div className="feature-grid">
          {featured.map((item) => (
            <div key={item.title} className="feature-card">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

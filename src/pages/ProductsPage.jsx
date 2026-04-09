import { useEffect, useState } from 'react'
import api from '../api/client'
import ProductCard from '../components/ProductCard'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      setLoading(true)
      const { data } = await api.get('/products')
      setProducts(data)
      setFiltered(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load products')
    } finally {
      setLoading(false)
    }
  }

  async function searchProducts(e) {
    e.preventDefault()
    if (!keyword.trim()) {
      setFiltered(products)
      return
    }
    try {
      const { data } = await api.get(`/products/search/${keyword}`)
      setFiltered(data)
    } catch {
      setFiltered([])
    }
  }

  return (
    <section className="section">
      <div className="section-head">
        <h2>Products</h2>
        <p>Browse all artisan products from your backend API.</p>
      </div>

      <form className="search-bar" onSubmit={searchProducts}>
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search products" />
        <button className="btn btn-primary">Search</button>
      </form>

      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      <div className="product-grid">
        {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  )
}

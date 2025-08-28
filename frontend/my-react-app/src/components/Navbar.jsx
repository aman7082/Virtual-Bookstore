import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { cart } = useCart()
  const count = cart?.items?.length || 0
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to home with search query
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="navbar-icon">📚</span>
          <span className="navbar-title">Virtual Bookstore</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="navbar-search">
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar-search-input"
          />
          <button type="submit" className="navbar-search-btn">
            🔍
          </button>
        </form>

        <div className="navbar-menu">
          <Link to="/" className={`navbar-link ${isActive('/') ? 'active' : ''}`}>
            <span className="navbar-link-icon">🏠</span>
            <span>Home</span>
          </Link>
          <Link to="/cart" className={`navbar-link navbar-cart ${isActive('/cart') ? 'active' : ''}`}>
            <span className="navbar-link-icon">🛒</span>
            <span>Cart</span>
            {count > 0 && (
              <span className="cart-badge">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

import { useEffect, useState } from 'react'
import { getRecommendations, searchBooks } from '../api'
import BookCard from '../components/BookCard'

export default function Home() {
  const [q, setQ] = useState('')
  const [books, setBooks] = useState([])
  const [recs, setRecs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      searchBooks('').then(res => {
        console.log('Books loaded:', res.data.length)
        setBooks(res.data)
      }).catch(err => {
        console.error('Error loading books:', err)
        setBooks([]) // Set empty array on error
      }),
      getRecommendations(1).then(res => {
        console.log('Recommendations loaded:', res.data.length)
        setRecs(res.data)
      }).catch(err => {
        console.error('Error loading recommendations:', err)
        setRecs([]) // Set empty array on error
      })
    ]).finally(() => setLoading(false))
  }, [])

  const onSearch = async (e) => {
    e.preventDefault()
    const res = await searchBooks(q)
    setBooks(res.data)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 font-medium">Loading amazing books for you...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Your Next Great Read
          </h1>
          <p className="hero-subtitle">
            Explore thousands of books across all genres. Find your perfect match today!
          </p>

          {/* Search Section */}
          <div className="hero-search">
            <form onSubmit={onSearch} className="search-form-container">
              <div className="search-input-wrapper">
                <input
                  value={q}
                  onChange={e=>setQ(e.target.value)}
                  placeholder="Search books, authors, categories..."
                  className="hero-search-input"
                />
                <button type="submit" className="hero-search-button">
                  🔍 Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <section className="recommendations-section">
        <h2 className="section-title">
          <span className="section-icon">⭐</span>
          Recommended for You
        </h2>
        <div className="books-grid">
          {recs.length > 0 ? (
            recs.map(b => <BookCard key={b.id} book={b} />)
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🌟</div>
              <h3 className="empty-title">Discover Your Perfect Books</h3>
              <p className="empty-description">
                Our AI-powered recommendations will appear here once you start exploring our collection!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* All Books Section */}
      <section className="all-books-section">
        <h2 className="section-title">
          <span className="section-icon">�</span>
          All Books
        </h2>
        <div className="books-grid">
          {books.length > 0 ? (
            books.map(b => <BookCard key={b.id} book={b} />)
          ) : (
            <div className="empty-state">
              <div className="empty-icon">�</div>
              <h3 className="empty-title">No Books Available</h3>
              <p className="empty-description">
                Check back later for new arrivals and exciting reads!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

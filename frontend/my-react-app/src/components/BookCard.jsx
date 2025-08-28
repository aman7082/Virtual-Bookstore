import { Link } from 'react-router-dom'

// Function to generate book cover image URL based on book title
const getBookCoverUrl = (title) => {
  // Using a placeholder image service that generates book-like covers
  const encodedTitle = encodeURIComponent(title.substring(0, 20))
  return `https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=${encodedTitle}`
}

export default function BookCard({ book }) {
  return (
    <div className="modern-book-card">
      <div className="book-cover-container">
        <img
          src={book.imageUrl || getBookCoverUrl(book.title)}
          alt={book.title}
          className="book-cover-image"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x400/6366F1/FFFFFF?text=${encodeURIComponent(book.title.substring(0, 15))}`
          }}
        />
      </div>

      <div className="book-info">
        <h3 className="book-title">
          {book.title}
        </h3>

        <div className="book-author">
          <span className="author-icon">👤</span>
          <span className="author-name">{book.author}</span>
          <span className="category-icon">📚</span>
          <span className="category-name">{book.category}</span>
        </div>

        <div className="book-footer">
          <div className="book-price">
            ${book.price?.toFixed?.(2) ?? book.price}
          </div>

          <Link
            to={`/books/${book.id}`}
            className="view-details-btn"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

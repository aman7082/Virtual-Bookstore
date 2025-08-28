import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addReview, addToCart, getBook, getReviews } from '../api'
import { useCart } from '../context/CartContext'

export default function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const { USER_ID } = useCart()

  const load = async () => {
    const b = await getBook(id)
    setBook(b.data)
    const r = await getReviews(id)
    setReviews(r.data)
  }

  useEffect(() => { load() }, [id])

  const addCart = async () => {
    try {
      await addToCart(USER_ID, { bookId: Number(id), quantity: 1 })
      alert('Added to cart successfully!')
      // Refresh cart in context
      window.location.reload() // Simple way to refresh cart context
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Failed to add to cart. Please try again.')
    }
  }

  const submitReview = async (e) => {
    e.preventDefault()
    try {
      await addReview({ bookId: Number(id), userId: USER_ID, rating: Number(rating), comment })
      setRating(5); setComment('');
      alert('Review submitted successfully!')
      await load()
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Failed to submit review. Please try again.')
    }
  }

  if (!book) return (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-xl text-gray-600 font-medium">Loading book details...</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Book Cover */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={book.imageUrl || `https://via.placeholder.com/400x600/4F46E5/FFFFFF?text=${encodeURIComponent(book.title.substring(0, 20))}`}
              alt={book.title}
              className="w-80 h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/400x600/4F46E5/FFFFFF?text=${encodeURIComponent(book.title.substring(0, 20))}`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Book Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{book.title}</h1>
            <div className="flex items-center text-lg text-gray-600 mb-4">
              <span className="mr-2">👤</span>
              <span className="mr-6 font-medium">{book.author}</span>
              <span className="mr-2">📚</span>
              <span className="font-medium">{book.category}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-gray-700 leading-relaxed text-lg">{book.description}</p>
          </div>

          <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="text-4xl font-bold text-green-600">
              ${book.price?.toFixed?.(2) ?? book.price}
            </div>
            <button
              onClick={addCart}
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <span className="mr-3">💬</span>
          Customer Reviews
        </h3>

        <div className="space-y-6 mb-12">
          {reviews.length > 0 ? reviews.map(r => (
            <div key={r.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400 text-xl mr-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < r.rating ? '⭐' : '☆'}</span>
                  ))}
                </div>
                <span className="text-gray-600 font-medium">{r.rating}/5</span>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{r.comment}</p>
            </div>
          )) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">No reviews yet. Be the first to review this book!</p>
            </div>
          )}
        </div>

        {/* Review Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h4 className="text-2xl font-bold text-gray-800 mb-6">Write a Review</h4>
          <form onSubmit={submitReview} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rating
              </label>
              <select
                value={rating}
                onChange={e=>setRating(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
              >
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>
                    {n} Star{n !== 1 ? 's' : ''} {n === 5 ? '(Excellent)' : n === 4 ? '(Good)' : n === 3 ? '(Average)' : n === 2 ? '(Poor)' : '(Terrible)'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                placeholder="Share your thoughts about this book..."
                value={comment}
                onChange={e=>setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              📝 Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

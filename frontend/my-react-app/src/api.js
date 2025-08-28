import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
})

export const searchBooks = (q) => API.get('/books', { params: { q } })
export const getBook = (id) => API.get(`/books/${id}`)
export const getReviews = (bookId) => API.get(`/reviews/book/${bookId}`)
export const addReview = (payload) => API.post('/reviews', payload)
export const getCart = (userId) => API.get(`/cart/${userId}`)
export const addToCart = (userId, payload) => API.post(`/cart/${userId}`, payload)
export const removeFromCart = (userId, itemId) => API.delete(`/cart/${userId}/${itemId}`)
export const clearCart = (userId) => API.delete(`/cart/${userId}`)
export const checkout = (userId, payload) => API.post(`/orders/${userId}/checkout`, payload)
export const getRecommendations = (userId, limit=8) => API.get(`/recommendations/${userId}`, { params: { limit } })

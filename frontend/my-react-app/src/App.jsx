import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { CartProvider } from './context/CartContext'
import BookDetail from './pages/BookDetails'
import Cart from './pages/Cart'
import CheckoutDebug from './pages/CheckoutDebug'
import CheckoutFixed from './pages/CheckoutFixed'
import Home from './pages/Home'

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutFixed />} />
          <Route path="/checkout-debug" element={<CheckoutDebug />} />
          <Route path="/checkout-fixed" element={<CheckoutFixed />} />
        </Routes>
      </div>
    </CartProvider>
  )
}

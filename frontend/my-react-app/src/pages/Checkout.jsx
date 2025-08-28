import { useState } from 'react'
import { checkout, getCart } from '../api'
import UPIPayment from '../components/UPIPayment'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { USER_ID, setCart, cart } = useCart()
  const [status, setStatus] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [shippingAddress, setShippingAddress] = useState('123 Demo Street, Demo City')
  const [showUPIPayment, setShowUPIPayment] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('pending')

  // Debug logging
  console.log('Checkout render - paymentMethod:', paymentMethod, 'showUPIPayment:', showUPIPayment)

  // Calculate total amount
  const total = cart.items?.reduce((sum, item) => sum + (item.book?.price * item.quantity), 0) || 0

  const pay = async (method = paymentMethod, paymentDetails = null) => {
    try {
      const paymentData = {
        currency: method === 'upi' ? 'inr' : 'usd',
        shippingAddress: shippingAddress,
        paymentMethod: method,
        metadata: {
          orderNote: 'Bookstore purchase',
          paymentMethod: method,
          upiId: method === 'upi' ? 'amaubedwal@okaxis' : null,
          ...paymentDetails
        }
      }

      const res = await checkout(USER_ID, paymentData)
      setStatus(`${res.data.status} via ${res.data.paymentProvider} (${res.data.paymentReference})`)
      setPaymentStatus('success')

      // refresh cart
      const cart = await getCart(USER_ID)
      setCart({ items: cart.data || [] })

      // Close UPI payment modal if open
      setShowUPIPayment(false)
    } catch (error) {
      console.error('Checkout error:', error)
      setStatus('Payment failed. Please try again.')
      setPaymentStatus('failed')
    }
  }

  const handleUPIPayment = () => {
    console.log('UPI Payment button clicked, total:', total)
    console.log('Setting showUPIPayment to true')
    setShowUPIPayment(true)
  }

  const handleUPIPaymentComplete = (paymentDetails) => {
    pay('upi', paymentDetails)
  }

  const handleUPIPaymentCancel = () => {
    setShowUPIPayment(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center">
        <span className="mr-3">💳</span>
        Checkout
      </h1>

      {/* Order Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📦 Order Summary</h2>
        {cart.items?.map(item => (
          <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-200">
            <div>
              <span className="font-semibold">{item.book?.title}</span>
              <span className="text-gray-600 ml-2">x{item.quantity}</span>
            </div>
            <span className="font-bold">${(item.book?.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between items-center pt-4 text-xl font-bold">
          <span>Total:</span>
          <span className="text-green-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🏠 Shipping Address</h2>
        <textarea
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows="3"
          placeholder="Enter your shipping address"
        />
      </div>

      {/* Payment Method Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">💳 Payment Method</h2>

        {/* Current Selection Indicator */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Selected:</strong> {
              paymentMethod === 'card' ? '💳 Credit/Debit Card' :
              paymentMethod === 'upi' ? '📱 UPI Payment' :
              paymentMethod === 'cod' ? '💵 Cash on Delivery' : 'None'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Credit Card Option */}
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => {
              console.log('Card payment selected')
              setPaymentMethod('card')
            }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">💳</div>
              <div className="font-semibold">Credit/Debit Card</div>
              <div className="text-sm text-gray-600">Visa, MasterCard, etc.</div>
            </div>
          </div>

          {/* UPI Option */}
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              paymentMethod === 'upi' ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => {
              console.log('UPI payment selected')
              setPaymentMethod('upi')
            }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <div className="font-semibold">UPI Payment</div>
              <div className="text-sm text-gray-600">Scan QR Code</div>
            </div>
          </div>

          {/* Cash on Delivery Option */}
          <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => {
              console.log('COD payment selected')
              setPaymentMethod('cod')
            }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">💵</div>
              <div className="font-semibold">Cash on Delivery</div>
              <div className="text-sm text-gray-600">Pay when delivered</div>
            </div>
          </div>
        </div>



        {/* Payment Buttons */}
        <div className="flex gap-4">
          {paymentMethod === 'upi' ? (
            <button
              onClick={handleUPIPayment}
              disabled={total === 0}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📱 Pay with UPI
            </button>
          ) : (
            <button
              onClick={() => pay()}
              disabled={total === 0}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {paymentMethod === 'cod' ? '📦 Place Order (COD)' : '💳 Pay Now'}
            </button>
          )}
        </div>
      </div>

      {/* Payment Status */}
      {status && (
        <div className={`p-6 rounded-xl mb-8 ${
          paymentStatus === 'success' ? 'bg-green-50 border border-green-200' :
          paymentStatus === 'failed' ? 'bg-red-50 border border-red-200' :
          'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-center">
            <span className="text-2xl mr-3">
              {paymentStatus === 'success' ? '✅' : paymentStatus === 'failed' ? '❌' : '⏳'}
            </span>
            <div>
              <p className="font-bold text-lg">
                {paymentStatus === 'success' ? 'Payment Successful!' :
                 paymentStatus === 'failed' ? 'Payment Failed' : 'Processing Payment...'}
              </p>
              <p className="text-gray-700">{status}</p>
            </div>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
        <p className="flex items-center">
          <span className="mr-2">🔒</span>
          <strong>Secure Payment:</strong> All transactions are encrypted and secure.
          {paymentMethod === 'upi' && ' UPI payments are processed through secure banking channels.'}
        </p>
      </div>

      {/* UPI Payment Modal */}
      {showUPIPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full">
            <UPIPayment
              amount={total}
              onPaymentComplete={handleUPIPaymentComplete}
              onCancel={handleUPIPaymentCancel}
            />
          </div>
        </div>
      )}

      {/* Debug Info - Remove this after testing */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs">
          showUPIPayment: {showUPIPayment.toString()}, total: ${total}
        </div>
      )}
    </div>
  )
}

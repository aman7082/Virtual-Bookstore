import { useState } from 'react'
import { checkout, getCart } from '../api'
import { useCart } from '../context/CartContext'

export default function CheckoutFixed() {
  const { USER_ID, setCart, cart } = useCart()
  const [status, setStatus] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [shippingAddress, setShippingAddress] = useState('123 Demo Street, Demo City')
  const [showUPIPayment, setShowUPIPayment] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('pending')

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
    setShowUPIPayment(true)
  }

  const handleUPIPaymentComplete = (paymentDetails) => {
    pay('upi', paymentDetails)
  }

  const handleUPIPaymentCancel = () => {
    setShowUPIPayment(false)
  }

  const handlePaymentMethodChange = (method) => {
    console.log('Payment method changed to:', method)
    setPaymentMethod(method)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center">
        <span className="mr-3">💳</span>
        Checkout (Fixed Version)
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

        {/* Payment Method Options */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {/* Credit Card Option */}
          <button
            type="button"
            style={{
              padding: '16px',
              border: paymentMethod === 'card' ? '2px solid #3b82f6' : '2px solid #d1d5db',
              backgroundColor: paymentMethod === 'card' ? '#eff6ff' : 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s'
            }}
            onClick={() => handlePaymentMethodChange('card')}
          >
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💳</div>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>Credit/Debit Card</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Visa, MasterCard, etc.</div>
          </button>

          {/* UPI Option */}
          <button
            type="button"
            style={{
              padding: '16px',
              border: paymentMethod === 'upi' ? '2px solid #10b981' : '2px solid #d1d5db',
              backgroundColor: paymentMethod === 'upi' ? '#f0fdf4' : 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s'
            }}
            onClick={() => handlePaymentMethodChange('upi')}
          >
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📱</div>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>UPI Payment</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Scan QR Code</div>
          </button>

          {/* Cash on Delivery Option */}
          <button
            type="button"
            style={{
              padding: '16px',
              border: paymentMethod === 'cod' ? '2px solid #f59e0b' : '2px solid #d1d5db',
              backgroundColor: paymentMethod === 'cod' ? '#fffbeb' : 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s'
            }}
            onClick={() => handlePaymentMethodChange('cod')}
          >
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💵</div>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>Cash on Delivery</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Pay when delivered</div>
          </button>
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

      {/* UPI Payment Modal */}
      {showUPIPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h2 className="text-2xl font-bold">UPI Payment</h2>
              <p className="text-green-100">Scan to pay with any UPI app</p>
            </div>

            {/* Payment Content */}
            <div className="p-6">
              {/* QR Code */}
              <div className="text-center mb-6">
                <div className="bg-gray-50 p-4 rounded-xl inline-block">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=amaubedwal@okaxis&pn=Aman Verma&am=${(total * 83).toFixed(2)}&cu=INR&tn=Bookstore Payment`)}`}
                    alt="UPI Payment QR Code"
                    className="border border-gray-300 rounded-lg shadow-lg bg-white"
                    style={{width: '200px', height: '200px'}}
                  />
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl">👤</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800">Aman Verma</h3>
                  <p className="text-sm text-gray-600">UPI ID: amaubedwal@okaxis</p>
                </div>
                
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600 mb-2">₹{(total * 83).toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Bookstore Payment</p>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">📱 How to Pay:</h4>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. Open any UPI app (PhonePe, Google Pay, Paytm, etc.)</li>
                  <li>2. Tap on "Scan & Pay" or QR scanner</li>
                  <li>3. Point your camera at the QR code above</li>
                  <li>4. Verify amount and complete payment</li>
                  <li>5. Click "I've Paid" button below after payment</li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={handleUPIPaymentComplete}
                  className="flex-1 bg-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  ✅ I've Paid
                </button>
                <button 
                  onClick={handleUPIPaymentCancel}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Debug Info */}
      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 mt-8">
        <p><strong>Debug:</strong> paymentMethod="{paymentMethod}", showUPIPayment={showUPIPayment.toString()}, total=${total}</p>
      </div>
    </div>
  )
}

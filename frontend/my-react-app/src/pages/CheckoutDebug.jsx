import { useState } from 'react'

export default function CheckoutDebug() {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [showUPIPayment, setShowUPIPayment] = useState(false)
  const [debugInfo, setDebugInfo] = useState([])

  const addDebugInfo = (message) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const handlePaymentMethodChange = (method) => {
    addDebugInfo(`Payment method changed to: ${method}`)
    setPaymentMethod(method)
  }

  const handleUPIPayment = () => {
    addDebugInfo('UPI Payment button clicked')
    addDebugInfo(`showUPIPayment set to: true`)
    setShowUPIPayment(true)
  }

  const handleUPICancel = () => {
    addDebugInfo('UPI Payment cancelled')
    setShowUPIPayment(false)
  }

  const handleUPIComplete = () => {
    addDebugInfo('UPI Payment completed')
    setShowUPIPayment(false)
    alert('Payment completed successfully!')
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">🔧 Checkout Debug Page</h1>

      {/* Debug Info Panel */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <h3 className="font-bold text-yellow-800 mb-2">🐛 Debug Information:</h3>
        <div className="text-sm text-yellow-700 space-y-1 max-h-32 overflow-y-auto">
          {debugInfo.map((info, index) => (
            <div key={index}>{info}</div>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-yellow-300">
          <strong>Current State:</strong> paymentMethod="{paymentMethod}", showUPIPayment={showUPIPayment.toString()}
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">💳 Payment Method</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Credit Card Option */}
          <div 
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handlePaymentMethodChange('card')}
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
            onClick={() => handlePaymentMethodChange('upi')}
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
            onClick={() => handlePaymentMethodChange('cod')}
          >
            <div className="text-center">
              <div class="text-3xl mb-2">💵</div>
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
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              📱 Pay with UPI
            </button>
          ) : (
            <button
              onClick={() => addDebugInfo(`${paymentMethod} payment clicked`)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {paymentMethod === 'cod' ? '📦 Place Order (COD)' : '💳 Pay Now'}
            </button>
          )}
        </div>
      </div>

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
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=amaubedwal@okaxis&pn=Aman%20Verma&am=1245.00&cu=INR&tn=Bookstore%20Payment"
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
                  <p className="text-3xl font-bold text-green-600 mb-2">₹1,245.00</p>
                  <p className="text-sm text-gray-600">Bookstore Payment</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={handleUPIComplete}
                  className="flex-1 bg-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  ✅ I've Paid
                </button>
                <button 
                  onClick={handleUPICancel}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

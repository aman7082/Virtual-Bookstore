import { useEffect, useState } from 'react'
import SimpleQRCode from './SimpleQRCode'

export default function UPIPayment({ amount, onPaymentComplete, onCancel }) {
  const [paymentStatus, setPaymentStatus] = useState('pending') // pending, processing, success, failed
  const [countdown, setCountdown] = useState(300) // 5 minutes timeout
  
  // UPI payment details
  const upiId = 'amaubedwal@okaxis'
  const merchantName = 'Aman Verma'
  const amountInINR = (amount * 83).toFixed(2) // Convert USD to INR (approximate)
  
  // Generate UPI payment URL
  const upiPaymentUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amountInINR}&cu=INR&tn=${encodeURIComponent('Bookstore Payment')}`

  // Countdown timer
  useEffect(() => {
    if (paymentStatus === 'pending' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setPaymentStatus('failed')
    }
  }, [countdown, paymentStatus])

  // Simulate payment verification (in real app, this would be webhook-based)
  useEffect(() => {
    if (paymentStatus === 'processing') {
      const timer = setTimeout(() => {
        setPaymentStatus('success')
        onPaymentComplete({
          method: 'UPI',
          reference: `UPI-${Date.now()}`,
          amount: amountInINR,
          upiId: upiId
        })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [paymentStatus, amountInINR, upiId, onPaymentComplete])

  const handlePaymentConfirmation = () => {
    setPaymentStatus('processing')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
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
        {paymentStatus === 'pending' && (
          <>
            {/* QR Code */}
            <div className="text-center mb-6">
              <div className="bg-gray-50 p-4 rounded-xl inline-block">
                <SimpleQRCode data={upiPaymentUrl} size={200} />
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">👤</span>
                </div>
                <h3 className="font-bold text-lg text-gray-800">Aman Verma</h3>
                <p className="text-sm text-gray-600">UPI ID: {upiId}</p>
              </div>
              
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 mb-2">₹{amountInINR}</p>
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

            {/* Timer */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full">
                <span className="mr-2">⏰</span>
                Time remaining: {formatTime(countdown)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePaymentConfirmation}
                className="flex-1 bg-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors"
              >
                ✅ I've Paid
              </button>
              <button
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {paymentStatus === 'processing' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Verifying Payment...</h3>
            <p className="text-gray-600">Please wait while we confirm your payment</p>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Payment Successful!</h3>
            <p className="text-gray-600">Your order has been confirmed</p>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">❌</span>
            </div>
            <h3 className="text-xl font-bold text-red-800 mb-2">Payment Failed</h3>
            <p className="text-gray-600 mb-4">Payment was not completed within the time limit</p>
            <button
              onClick={onCancel}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

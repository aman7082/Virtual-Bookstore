import { useEffect, useState } from 'react'

export default function SimpleQRCode({ data, size = 200 }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (data) {
      // Use Google Charts API as a fallback for QR code generation
      const encodedData = encodeURIComponent(data)
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}`
      setQrCodeUrl(qrUrl)
      setLoading(false)
    }
  }, [data, size])

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <div 
          className="border border-gray-300 rounded-lg shadow-lg bg-gray-100 flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <img
        src={qrCodeUrl}
        alt="UPI Payment QR Code"
        className="border border-gray-300 rounded-lg shadow-lg bg-white"
        style={{ width: size, height: size }}
        onError={(e) => {
          // Fallback to a placeholder if image fails to load
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'flex'
        }}
      />
      <div 
        className="border border-gray-300 rounded-lg shadow-lg bg-gray-100 items-center justify-center text-gray-600 text-sm text-center p-4"
        style={{ width: size, height: size, display: 'none' }}
      >
        <div>
          <div className="text-2xl mb-2">📱</div>
          <div>UPI QR Code</div>
          <div className="text-xs mt-2">amaubedwal@okaxis</div>
        </div>
      </div>
      {data && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          Scan with any UPI app
        </div>
      )}
    </div>
  )
}

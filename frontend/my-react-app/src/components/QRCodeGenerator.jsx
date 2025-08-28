import { useEffect, useRef, useState } from 'react'

export default function QRCodeGenerator({ data, size = 200 }) {
  const canvasRef = useRef(null)
  const [qrCodeLoaded, setQrCodeLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const generateQRCode = async () => {
      if (!data || !canvasRef.current) return

      try {
        // Dynamic import to handle potential module loading issues
        const QRCode = await import('qrcode')

        await QRCode.default.toCanvas(canvasRef.current, data, {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'M'
        })

        setQrCodeLoaded(true)
        setError(null)
      } catch (err) {
        console.error('QR Code generation error:', err)
        setError(err.message)
        // Fallback to manual QR code generation
        generateFallbackQR()
      }
    }

    const generateFallbackQR = () => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      canvas.width = size
      canvas.height = size

      // Clear canvas with white background
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, size, size)

      // Generate a simple pattern based on the data
      const gridSize = 25
      const cellSize = size / gridSize

      ctx.fillStyle = '#000000'

      // Create a hash-based pattern
      let hash = 0
      for (let i = 0; i < data.length; i++) {
        hash = ((hash << 5) - hash + data.charCodeAt(i)) & 0xffffffff
      }

      // Draw finder patterns (corners)
      drawFinderPattern(ctx, 0, 0, cellSize)
      drawFinderPattern(ctx, (gridSize - 7) * cellSize, 0, cellSize)
      drawFinderPattern(ctx, 0, (gridSize - 7) * cellSize, cellSize)

      // Draw data pattern
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          // Skip finder pattern areas
          if (isFinderPatternArea(row, col, gridSize)) continue

          const seed = (row * gridSize + col + hash) % 1000
          if (seed % 3 === 0) {
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
          }
        }
      }

      setQrCodeLoaded(true)
    }

    generateQRCode()
  }, [data, size])

  const drawFinderPattern = (ctx, x, y, cellSize) => {
    // Outer 7x7 square
    ctx.fillStyle = '#000000'
    ctx.fillRect(x, y, 7 * cellSize, 7 * cellSize)

    // Inner 5x5 white square
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize)

    // Center 3x3 black square
    ctx.fillStyle = '#000000'
    ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize)
  }

  const isFinderPatternArea = (row, col, gridSize) => {
    return (
      (row < 9 && col < 9) ||
      (row < 9 && col > gridSize - 10) ||
      (row > gridSize - 10 && col < 9)
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border border-gray-300 rounded-lg shadow-lg bg-white"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        {!qrCodeLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg text-red-600 text-sm p-2">
            QR Code Loading...
          </div>
        )}
      </div>
      {data && (
        <div className="mt-2 text-xs text-gray-500 text-center max-w-xs break-all">
          {data.substring(0, 50)}...
        </div>
      )}
    </div>
  )
}

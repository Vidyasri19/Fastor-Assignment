import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRestaurantById } from '../api/apiService'

export default function RestaurantDetail() {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const canvasRef = useRef(null)
  const [logoPos, setLogoPos] = useState({ x: 0.5, y: 0.5 }) 
  const draggingRef = useRef(false)
  const logoSizePx = 120

  useEffect(() => {
    fetchRestaurantById(id)
      .then(res => setRestaurant(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  // Draw function
  const draw = async () => {
    const canvas = canvasRef.current
    if (!canvas || !restaurant) return

    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    canvas.width = Math.floor(rect.width)
    canvas.height = Math.floor(rect.height)

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Load restaurant image
    const baseImg = new Image()
    baseImg.crossOrigin = 'Anonymous'
    baseImg.src = restaurant.imageURL

    await new Promise((resolve, reject) => {
      baseImg.onload = resolve
      baseImg.onerror = reject
    })

    ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height)

    // Load logo
    const logo = new Image()
    logo.src = '/logo.png' 
    await new Promise((resolve, reject) => {
      logo.onload = resolve
      logo.onerror = reject
    })

    // Calculate logo position
    const x = logoPos.x * canvas.width - logoSizePx / 2
    const y = logoPos.y * canvas.height - logoSizePx / 2
    ctx.drawImage(logo, x, y, logoSizePx, logoSizePx)
  }

  // Redraw when restaurant or position changes
  useEffect(() => {
    draw()
  }, [restaurant, logoPos])

  // Mouse drag logic
  const handleMouseDown = () => (draggingRef.current = true)
  const handleMouseUp = () => (draggingRef.current = false)
  const handleMouseMove = e => {
    if (!draggingRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setLogoPos({ x, y })
  }

  // Web Share API
  const handleShare = () => {
    canvasRef.current.toBlob(blob => {
      const file = new File([blob], `${restaurant.name}.png`, { type: 'image/png' })
      if (navigator.share) {
        navigator.share({
          title: restaurant.name,
          text: 'Check out this restaurant!',
          files: [file],
        })
      } else {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${restaurant.name}.png`
        link.click()
      }
    })
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">{restaurant.name}</h2>

      <div className="relative max-w-3xl mx-auto">
        <canvas
          ref={canvasRef}
          className="w-full border rounded-xl shadow-md cursor-move"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleShare}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md"
        >
          Share
        </button>
      </div>
    </div>
  )
}
